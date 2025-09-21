import { useState, useEffect } from 'react';
import { clusteringService } from '../services/clusteringService';
import { Patient } from '../types/medical';

export function useClusterAnalysis() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [similarPatients, setSimilarPatients] = useState<Array<{ id: number; similarity: number }>>([]);

  const findSimilarPatients = async (patientId: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const similar = await clusteringService.getSimilarPatients(patientId);
      setSimilarPatients(similar);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const getPatientCluster = async (patient: Patient) => {
    setIsLoading(true);
    setError(null);
    try {
      return await clusteringService.getPatientCluster(patient);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return -1;
    } finally {
      setIsLoading(false);
    }
  };

  const conductCaseControlStudy = async (condition: string, matchingCriteria: Array<keyof Patient>) => {
    setIsLoading(true);
    setError(null);
    try {
      return await clusteringService.conductCaseControlStudy(condition, matchingCriteria);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return { cases: [], controls: [] };
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const initializeModel = async () => {
      setIsLoading(true);
      try {
        await clusteringService.trainModel();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    initializeModel();
  }, []);

  return {
    isLoading,
    error,
    similarPatients,
    findSimilarPatients,
    getPatientCluster,
    conductCaseControlStudy,
  };
}