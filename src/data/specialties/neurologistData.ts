import { SpecialtyData } from '../../types/medical';

export const neurologistData: SpecialtyData = {
  conditions: [
    { id: 101, name: 'Multiple Sclerosis', severity: 'severe' },
    { id: 102, name: 'Epilepsy', severity: 'moderate' },
    { id: 103, name: 'Stroke', severity: 'severe' },
    { id: 104, name: 'Parkinson\'s Disease', severity: 'severe' },
    { id: 105, name: 'Migraine', severity: 'moderate' },
    { id: 106, name: 'Alzheimer\'s Disease', severity: 'severe' },
  ],
  metrics: {
    keyMetrics: [
      'Cognitive Function Score',
      'Motor Function Assessment',
      'Neurological Reflexes',
      'Brain Activity Patterns',
      'Balance Assessment',
    ],
    riskFactors: [
      'Family History of Neurological Disorders',
      'Previous Stroke/TIA',
      'Vascular Risk Factors',
      'Age-Related Degeneration',
      'Traumatic Brain Injury History',
    ],
    treatments: [
      'Neurological Medication',
      'Physical Therapy',
      'Cognitive Rehabilitation',
      'Preventive Treatment',
      'Surgery Consultation',
    ],
  },
};