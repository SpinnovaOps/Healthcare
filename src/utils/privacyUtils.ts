import { Patient, VitalSigns, LabResults } from '../types/medical';

// Laplace mechanism for differential privacy
const addLaplaceNoise = (value: number, sensitivity: number, epsilon: number): number => {
  const scale = sensitivity / epsilon;
  const u = Math.random() - 0.5;
  const noise = -scale * Math.sign(u) * Math.log(1 - 2 * Math.abs(u));
  return value + noise;
};

// Gaussian noise for data perturbation
const addGaussianNoise = (value: number, stdDev: number): number => {
  const u1 = Math.random();
  const u2 = Math.random();
  const noise = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2) * stdDev;
  return value + noise;
};

// Apply privacy to vital signs
const perturbVitalSigns = (vitalSigns: VitalSigns, epsilon: number): VitalSigns => {
  return {
    bloodPressure: {
      systolic: Math.round(addLaplaceNoise(vitalSigns.bloodPressure.systolic, 5, epsilon)),
      diastolic: Math.round(addLaplaceNoise(vitalSigns.bloodPressure.diastolic, 5, epsilon)),
    },
    heartRate: Math.round(addLaplaceNoise(vitalSigns.heartRate, 3, epsilon)),
    temperature: (addGaussianNoise(parseFloat(vitalSigns.temperature), 0.1)).toFixed(1),
    respiratoryRate: Math.round(addLaplaceNoise(vitalSigns.respiratoryRate, 2, epsilon)),
    oxygenSaturation: Math.round(addLaplaceNoise(vitalSigns.oxygenSaturation, 1, epsilon)),
  };
};

// Apply privacy to lab results
const perturbLabResults = (labResults: LabResults, epsilon: number): LabResults => {
  return {
    glucose: (addLaplaceNoise(parseFloat(labResults.glucose), 5, epsilon)).toFixed(1),
    cholesterol: Math.round(addLaplaceNoise(labResults.cholesterol, 10, epsilon)),
    creatinine: (addLaplaceNoise(parseFloat(labResults.creatinine), 0.2, epsilon)).toFixed(2),
    potassium: (addLaplaceNoise(parseFloat(labResults.potassium), 0.2, epsilon)).toFixed(1),
    sodium: Math.round(addLaplaceNoise(labResults.sodium, 2, epsilon)),
  };
};

// Apply privacy to patient data
export const applyPrivacy = (patient: Patient, epsilon: number): Patient => {
  return {
    ...patient,
    age: Math.round(addLaplaceNoise(patient.age, 2, epsilon)),
    vitalSigns: perturbVitalSigns(patient.vitalSigns, epsilon),
    labResults: perturbLabResults(patient.labResults, epsilon),
  };
};

export const applyBatchPrivacy = (patients: Patient[], epsilon: number): Patient[] => {
  return patients.map(patient => applyPrivacy(patient, epsilon));
};