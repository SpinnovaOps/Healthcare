export interface MedicalCondition {
  id: number;
  name: string;
  severity: 'mild' | 'moderate' | 'severe';
}

export interface Treatment {
  id: number;
  name: string;
  type: 'medication' | 'therapy' | 'lifestyle';
}

export interface VitalSigns {
  bloodPressure: {
    systolic: number;
    diastolic: number;
  };
  heartRate: number;
  temperature: string;
  respiratoryRate: number;
  oxygenSaturation: number;
}

export interface LabResults {
  glucose: string;
  cholesterol: number;
  creatinine: string;
  potassium: string;
  sodium: number;
}

export interface Patient {
  id: number;
  age: number;
  gender: 'male' | 'female';
  conditions: MedicalCondition[];
  treatments: Treatment[];
  vitalSigns: VitalSigns;
  labResults: LabResults;
  lastVisit: Date;
}

export interface SpecialtyMetrics {
  keyMetrics: string[];
  riskFactors: string[];
  treatments: string[];
}

export interface SpecialtyData {
  conditions: MedicalCondition[];
  metrics: SpecialtyMetrics;
}