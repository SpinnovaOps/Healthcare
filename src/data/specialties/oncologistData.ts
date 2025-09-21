import { SpecialtyData } from '../../types/medical';

export const oncologistData: SpecialtyData = {
  conditions: [
    { id: 201, name: 'Breast Cancer', severity: 'severe' },
    { id: 202, name: 'Lung Cancer', severity: 'severe' },
    { id: 203, name: 'Leukemia', severity: 'severe' },
    { id: 204, name: 'Lymphoma', severity: 'severe' },
    { id: 205, name: 'Colorectal Cancer', severity: 'severe' },
    { id: 206, name: 'Melanoma', severity: 'severe' },
  ],
  metrics: {
    keyMetrics: [
      'Tumor Markers',
      'Blood Cell Counts',
      'Imaging Results',
      'Treatment Response',
      'Survival Rate',
    ],
    riskFactors: [
      'Genetic Mutations',
      'Family History',
      'Environmental Exposure',
      'Lifestyle Factors',
      'Previous Cancer History',
    ],
    treatments: [
      'Chemotherapy',
      'Radiation Therapy',
      'Immunotherapy',
      'Targeted Therapy',
      'Surgery Options',
    ],
  },
};