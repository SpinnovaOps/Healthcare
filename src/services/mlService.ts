import * as tf from '@tensorflow/tfjs';
import { Patient } from '../types/medical';
import { mockPatients } from '../data/mockPatientData';

class MLService {
  private model: tf.Sequential | null = null;
  private patientFeatures: number[][] = [];
  private normalizedFeatures: tf.Tensor2D | null = null;

  // Convert patient data to numerical features
  private patientToFeatures(patient: Patient): number[] {
    return [
      patient.age,
      patient.gender === 'male' ? 1 : 0,
      patient.conditions.length,
      patient.treatments.length,
      patient.vitalSigns.bloodPressure.systolic,
      patient.vitalSigns.bloodPressure.diastolic,
      patient.vitalSigns.heartRate,
      parseFloat(patient.vitalSigns.temperature),
      patient.vitalSigns.respiratoryRate,
      patient.vitalSigns.oxygenSaturation,
      parseFloat(patient.labResults.glucose),
      patient.labResults.cholesterol,
      parseFloat(patient.labResults.creatinine),
      parseFloat(patient.labResults.potassium),
      patient.labResults.sodium,
    ];
  }

  // Normalize features using min-max scaling
  private normalizeFeatures(features: number[][]): tf.Tensor2D {
    const featuresTensor = tf.tensor2d(features);
    const min = featuresTensor.min(0);
    const max = featuresTensor.max(0);
    return featuresTensor.sub(min).div(max.sub(min));
  }

  // Initialize and train the autoencoder model
  async trainModel() {
    // Convert patients to feature vectors
    this.patientFeatures = mockPatients.map(patient => 
      this.patientToFeatures(patient)
    );

    // Normalize features
    this.normalizedFeatures = this.normalizeFeatures(this.patientFeatures);

    // Create autoencoder model
    const inputDim = this.patientFeatures[0].length;
    const encodingDim = 8;

    this.model = tf.sequential();

    // Encoder
    this.model.add(tf.layers.dense({
      units: encodingDim,
      activation: 'relu',
      inputShape: [inputDim],
    }));

    // Decoder
    this.model.add(tf.layers.dense({
      units: inputDim,
      activation: 'sigmoid',
    }));

    // Compile model
    this.model.compile({
      optimizer: 'adam',
      loss: 'meanSquaredError',
    });

    // Train model
    await this.model.fit(this.normalizedFeatures, this.normalizedFeatures, {
      epochs: 50,
      batchSize: 32,
      shuffle: true,
      verbose: 0,
    });
  }

  // Get patient similarity scores
  async getSimilarityScores(patientId: number): Promise<{ id: number; score: number }[]> {
    if (!this.model || !this.normalizedFeatures) {
      throw new Error('Model not trained');
    }

    const patientIndex = mockPatients.findIndex(p => p.id === patientId);
    if (patientIndex === -1) {
      throw new Error('Patient not found');
    }

    // Get encoded features for all patients
    const encoded = this.model.predict(this.normalizedFeatures) as tf.Tensor2D;
    const encodedArray = await encoded.array();

    // Calculate cosine similarity
    const similarities = encodedArray.map((features, index) => {
      if (index === patientIndex) return { id: mockPatients[index].id, score: 1 };
      
      const similarity = tf.tensor1d(features)
        .dot(tf.tensor1d(encodedArray[patientIndex]))
        .div(
          tf.norm(tf.tensor1d(features))
            .mul(tf.norm(tf.tensor1d(encodedArray[patientIndex])))
        );

      return {
        id: mockPatients[index].id,
        score: similarity.dataSync()[0],
      };
    });

    // Sort by similarity score
    return similarities.sort((a, b) => b.score - a.score);
  }

  // Get patient clusters
  async getPatientClusters(numClusters: number = 5): Promise<number[]> {
    if (!this.model || !this.normalizedFeatures) {
      throw new Error('Model not trained');
    }

    // Get encoded features
    const encoded = this.model.predict(this.normalizedFeatures) as tf.Tensor2D;
    const encodedArray = await encoded.array();

    // Perform k-means clustering
    const points = tf.tensor2d(encodedArray);
    const centroids = points.gather(tf.randomUniform([numClusters], 0, points.shape[0], 'int32'));
    
    const assignments = Array(points.shape[0]).fill(0);
    
    // Simple k-means implementation
    for (let iter = 0; iter < 10; iter++) {
      // Assign points to nearest centroid
      for (let i = 0; i < points.shape[0]; i++) {
        const point = points.slice([i, 0], [1, -1]);
        const distances = centroids.sub(point).pow(2).sum(1);
        assignments[i] = distances.argMin().dataSync()[0];
      }
      
      // Update centroids
      for (let k = 0; k < numClusters; k++) {
        const clusterPoints = points.gather(
          tf.tensor1d(assignments.map((a, i) => a === k ? i : -1).filter(i => i !== -1), 'int32')
        );
        if (clusterPoints.shape[0] > 0) {
          const newCentroid = clusterPoints.mean(0);
          centroids.slice([k, 0], [1, -1]).assign(newCentroid);
        }
      }
    }

    return assignments;
  }
}

export const mlService = new MLService();