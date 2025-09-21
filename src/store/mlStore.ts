import { create } from 'zustand';
import { mlService } from '../services/mlService';
import { Patient } from '../types/medical';
import { mockPatients } from '../data/mockPatientData';

interface MLState {
  isModelTrained: boolean;
  similarPatients: { id: number; score: number }[];
  patientClusters: number[];
  selectedPatient: Patient | null;
  trainModel: () => Promise<void>;
  getSimilarPatients: (patientId: number) => Promise<void>;
  getPatientClusters: () => Promise<void>;
  setSelectedPatient: (patient: Patient | null) => void;
  getPatientById: (id: number) => Patient | undefined;
}

export const useMLStore = create<MLState>((set, get) => ({
  isModelTrained: false,
  similarPatients: [],
  patientClusters: [],
  selectedPatient: null,

  trainModel: async () => {
    await mlService.trainModel();
    set({ isModelTrained: true });
  },

  getSimilarPatients: async (patientId: number) => {
    if (!get().isModelTrained) {
      await get().trainModel();
    }
    const similarities = await mlService.getSimilarityScores(patientId);
    set({ similarPatients: similarities });
  },

  getPatientClusters: async () => {
    if (!get().isModelTrained) {
      await get().trainModel();
    }
    const clusters = await mlService.getPatientClusters();
    set({ patientClusters: clusters });
  },

  setSelectedPatient: (patient: Patient | null) => {
    set({ selectedPatient: patient });
  },

  getPatientById: (id: number) => {
    return mockPatients.find(p => p.id === id);
  },
}));