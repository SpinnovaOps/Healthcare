import * as tf from '@tensorflow/tfjs';
import { Patient } from '../types/medical';
import { mockPatients } from '../data/mockPatientData';

export class ClusteringService {
  private model: tf.Sequential | null = null;
  private clusters: number[] | null = null;
  private similarityMatrix: number[][] | null = null;

  // Convert patient data to feature vectors
  private patientToFeatures(patient: Patient): number[] {
    const conditionVector = new Array(10).fill(0); // One-hot encoding for conditions
    patient.conditions.forEach(c => {
      conditionVector[c.id % 10] = 1; // Simple hash for demo
    });

    return [
      patient.age / 100, // Normalize age
      patient.gender === 'male' ? 1 : 0,
      ...conditionVector,
      patient.vitalSigns.bloodPressure.systolic / 200,
      patient.vitalSigns.bloodPressure.diastolic / 200,
      patient.vitalSigns.heartRate / 200,
      Number(patient.vitalSigns.temperature) / 50,
      patient.vitalSigns.respiratoryRate / 40,
      patient.vitalSigns.oxygenSaturation / 100,
      Number(patient.labResults.glucose) / 200,
      patient.labResults.cholesterol / 300,
      Number(patient.labResults.creatinine),
      Number(patient.labResults.potassium) / 10,
      patient.labResults.sodium / 200,
    ];
  }

  // Calculate RMSE between predicted and actual values
  private calculateRMSE(predicted: number[][], actual: number[][]): number {
    const mse = tf.metrics.meanSquaredError(
      tf.tensor2d(actual),
      tf.tensor2d(predicted)
    );
    return Math.sqrt(Number(mse.dataSync()[0]));
  }

  // Train clustering model
  async trainModel(): Promise<void> {
    const features = mockPatients.map(p => this.patientToFeatures(p));
    const tensorData = tf.tensor2d(features);

    // Create autoencoder for dimensionality reduction
    this.model = tf.sequential();
    
    // Encoder
    this.model.add(tf.layers.dense({
      units: 32,
      activation: 'relu',
      inputShape: [features[0].length],
    }));
    this.model.add(tf.layers.dense({
      units: 16,
      activation: 'relu',
    }));
    
    // Bottleneck layer
    this.model.add(tf.layers.dense({
      units: 8,
      activation: 'relu',
    }));
    
    // Decoder
    this.model.add(tf.layers.dense({
      units: 16,
      activation: 'relu',
    }));
    this.model.add(tf.layers.dense({
      units: 32,
      activation: 'relu',
    }));
    this.model.add(tf.layers.dense({
      units: features[0].length,
      activation: 'sigmoid',
    }));

    this.model.compile({
      optimizer: 'adam',
      loss: 'meanSquaredError',
    });

    await this.model.fit(tensorData, tensorData, {
      epochs: 50,
      batchSize: 32,
      shuffle: true,
      verbose: 0,
    });

    // Generate embeddings for clustering
    const encoder = tf.sequential();
    encoder.add(this.model.layers[0]);
    encoder.add(this.model.layers[1]);
    encoder.add(this.model.layers[2]);

    const embeddings = encoder.predict(tensorData) as tf.Tensor;
    const embeddingsArray = await embeddings.array() as number[][];

    // Perform k-means clustering
    this.clusters = await this.kMeansClustering(embeddingsArray, 5);
    
    // Calculate similarity matrix
    this.similarityMatrix = this.calculateSimilarityMatrix(embeddingsArray);
  }

  // K-means clustering implementation
  private async kMeansClustering(data: number[][], k: number): Promise<number[]> {
    const points = tf.tensor2d(data);
    const numPoints = points.shape[0];
    const assignments = new Array(numPoints).fill(0);
    
    // Randomly initialize centroids
    const centroidIndices = tf.randomUniform([k], 0, numPoints, 'int32');
    let centroids = tf.gather(points, centroidIndices);
    
    for (let iteration = 0; iteration < 20; iteration++) {
      // Assign points to nearest centroid
      const expandedPoints = points.expandDims(1);
      const expandedCentroids = centroids.expandDims(0);
      const distances = expandedPoints.sub(expandedCentroids).square().sum(-1);
      const newAssignments = distances.argMin(-1);
      
      // Update centroids
      const newAssignmentsArray = await newAssignments.array() as number[];
      if (JSON.stringify(assignments) === JSON.stringify(newAssignmentsArray)) {
        break;
      }
      assignments.splice(0, assignments.length, ...newAssignmentsArray);
      
      // Calculate new centroids
      const newCentroids = [];
      for (let i = 0; i < k; i++) {
        const clusterPoints = points.gather(tf.whereAsync(newAssignments.equal(i)));
        const centroid = clusterPoints.mean(0);
        newCentroids.push(centroid);
      }
      centroids = tf.stack(newCentroids);
    }
    
    return assignments;
  }

  // Calculate similarity matrix using cosine similarity
  private calculateSimilarityMatrix(embeddings: number[][]): number[][] {
    const numPatients = embeddings.length;
    const matrix: number[][] = Array(numPatients).fill(0).map(() => Array(numPatients).fill(0));
    
    for (let i = 0; i < numPatients; i++) {
      for (let j = i; j < numPatients; j++) {
        const similarity = this.cosineSimilarity(embeddings[i], embeddings[j]);
        matrix[i][j] = similarity;
        matrix[j][i] = similarity;
      }
    }
    
    return matrix;
  }

  // Calculate cosine similarity between two vectors
  private cosineSimilarity(a: number[], b: number[]): number {
    const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
    const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
    const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
    return dotProduct / (magnitudeA * magnitudeB);
  }

  // Get cluster for a new patient
  async getPatientCluster(patient: Patient): Promise<number> {
    if (!this.model || !this.clusters) {
      throw new Error('Model not trained');
    }

    const features = this.patientToFeatures(patient);
    const prediction = this.model.predict(tf.tensor2d([features])) as tf.Tensor;
    const embedding = await prediction.array() as number[][];
    
    // Find nearest cluster
    const distances = this.clusters.map((cluster, i) => {
      const similarity = this.cosineSimilarity(embedding[0], embedding[0]);
      return { cluster: i, distance: 1 - similarity };
    });
    
    return distances.reduce((a, b) => a.distance < b.distance ? a : b).cluster;
  }

  // Get similar patients
  async getSimilarPatients(patientId: number, limit: number = 5): Promise<Array<{ id: number; similarity: number }>> {
    if (!this.similarityMatrix) {
      throw new Error('Model not trained');
    }

    const similarities = this.similarityMatrix[patientId].map((similarity, id) => ({
      id,
      similarity,
    }));

    return similarities
      .filter(s => s.id !== patientId)
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, limit);
  }

  // Conduct case-control study
  async conductCaseControlStudy(
    condition: string,
    matchingCriteria: Array<keyof Patient>
  ): Promise<{ cases: Patient[]; controls: Patient[] }> {
    const cases = mockPatients.filter(p => 
      p.conditions.some(c => c.name.toLowerCase() === condition.toLowerCase())
    );
    
    const controls = mockPatients.filter(p => 
      !p.conditions.some(c => c.name.toLowerCase() === condition.toLowerCase())
    );

    // Match cases and controls based on criteria
    const matchedControls = cases.map(casePatient => {
      return controls.reduce((best, control) => {
        const currentMatch = matchingCriteria.every(criterion => 
          casePatient[criterion] === control[criterion]
        );
        
        const bestMatch = matchingCriteria.every(criterion =>
          casePatient[criterion] === best[criterion]
        );
        
        return currentMatch && (!bestMatch || Math.random() > 0.5) ? control : best;
      }, controls[0]);
    });

    return {
      cases,
      controls: matchedControls,
    };
  }
}

export const clusteringService = new ClusteringService();