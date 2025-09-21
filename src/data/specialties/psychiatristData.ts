import { SpecialtyData } from '../../types/medical';

export const psychiatristData: SpecialtyData = {
  conditions: [
    { id: 301, name: 'Major Depression', severity: 'severe' },
    { id: 302, name: 'Bipolar Disorder', severity: 'severe' },
    { id: 303, name: 'Anxiety Disorder', severity: 'moderate' },
    { id: 304, name: 'Schizophrenia', severity: 'severe' },
    { id: 305, name: 'PTSD', severity: 'severe' },
    { id: 306, name: 'OCD', severity: 'moderate' },
  ],
  metrics: {
    keyMetrics: [
      'Mental Status Examination',
      'Depression Scale Score',
      'Anxiety Level Assessment',
      'Sleep Pattern Analysis',
      'Medication Response',
    ],
    riskFactors: [
      'Family History of Mental Illness',
      'Trauma History',
      'Substance Use',
      'Social Support Status',
      'Environmental Stressors',
    ],
    treatments: [
      'Psychotherapy',
      'Medication Management',
      'Group Therapy',
      'Cognitive Behavioral Therapy',
      'Crisis Intervention',
    ],
  },
};