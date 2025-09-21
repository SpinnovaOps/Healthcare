import { Patient, MedicalCondition, Treatment } from '../types/medical';
import { neurologistData } from './specialties/neurologistData';
import { oncologistData } from './specialties/oncologistData';
import { psychiatristData } from './specialties/psychiatristData';

// Combine all specialty conditions
const allConditions: MedicalCondition[] = [
  ...neurologistData.conditions,
  ...oncologistData.conditions,
  ...psychiatristData.conditions,
];

// Generate random age between min and max
const randomAge = (min: number, max: number) => 
  Math.floor(Math.random() * (max - min + 1)) + min;

// Generate random value between 0 and 1
const random = () => Math.random();

// Generate random blood pressure
const randomBP = () => ({
  systolic: Math.floor(random() * (180 - 90) + 90),
  diastolic: Math.floor(random() * (110 - 60) + 60),
});

// Generate a random set of conditions
const getRandomConditions = () => {
  const numConditions = Math.floor(random() * 3) + 1;
  return [...allConditions]
    .sort(() => 0.5 - random())
    .slice(0, numConditions);
};

// Generate mock vital signs
const generateVitalSigns = (age: number) => ({
  bloodPressure: randomBP(),
  heartRate: Math.floor(random() * (100 - 60) + 60),
  temperature: (random() * (0.8) + 36.5).toFixed(1),
  respiratoryRate: Math.floor(random() * (20 - 12) + 12),
  oxygenSaturation: Math.floor(random() * (100 - 95) + 95),
});

// Generate mock lab results
const generateLabResults = () => ({
  glucose: (random() * (180 - 70) + 70).toFixed(1),
  cholesterol: Math.floor(random() * (240 - 150) + 150),
  creatinine: (random() * (1.2 - 0.6) + 0.6).toFixed(2),
  potassium: (random() * (5.0 - 3.5) + 3.5).toFixed(1),
  sodium: Math.floor(random() * (145 - 135) + 135),
});

// Generate treatments based on conditions
const generateTreatments = (conditions: MedicalCondition[]): Treatment[] => {
  const treatments: Treatment[] = [];
  let treatmentId = 1;

  conditions.forEach(condition => {
    const specialtyData = [neurologistData, oncologistData, psychiatristData].find(
      data => data.conditions.some(c => c.name === condition.name)
    );

    if (specialtyData) {
      const randomTreatments = specialtyData.metrics.treatments
        .slice(0, Math.floor(random() * 3) + 1)
        .map(name => ({
          id: treatmentId++,
          name,
          type: random() > 0.5 ? 'medication' : 'therapy',
        }));
      treatments.push(...randomTreatments);
    }
  });

  return treatments;
};

// Generate a single mock patient
const generatePatient = (id: number): Patient => {
  const conditions = getRandomConditions();
  
  return {
    id,
    age: randomAge(25, 85),
    gender: random() > 0.5 ? 'male' : 'female',
    conditions,
    treatments: generateTreatments(conditions),
    vitalSigns: generateVitalSigns(randomAge(25, 85)),
    labResults: generateLabResults(),
    lastVisit: new Date(Date.now() - Math.floor(random() * 30 * 24 * 60 * 60 * 1000)),
  };
};

// Generate mock patient dataset
export const generatePatientDataset = (count: number): Patient[] => {
  return Array.from({ length: count }, (_, i) => generatePatient(i + 1));
};

// Export a fixed dataset for consistency
export const mockPatients = generatePatientDataset(1000);