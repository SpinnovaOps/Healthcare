import { MedicalCondition, SpecialtyData } from '../types/medical';
import { neurologistData } from '../data/specialties/neurologistData';
import { oncologistData } from '../data/specialties/oncologistData';
import { psychiatristData } from '../data/specialties/psychiatristData';

const specialtyDataMap: Record<string, SpecialtyData> = {
  'Neurologist': neurologistData,
  'Oncologist': oncologistData,
  'Psychiatrist': psychiatristData,
};

export const getSpecialtyData = (specialty: string): SpecialtyData => {
  return specialtyDataMap[specialty] || {
    conditions: [],
    metrics: {
      keyMetrics: [],
      riskFactors: [],
      treatments: [],
    },
  };
};

export const isConditionRelevant = (condition: MedicalCondition, specialty: string): boolean => {
  const specialtyData = getSpecialtyData(specialty);
  return specialtyData.conditions.some(c => c.name === condition.name);
};

export const getSpecialtyMetrics = (specialty: string) => {
  const specialtyData = getSpecialtyData(specialty);
  return {
    keyMetrics: specialtyData.metrics.keyMetrics,
    riskFactors: specialtyData.metrics.riskFactors,
    treatments: specialtyData.metrics.treatments,
  };
};