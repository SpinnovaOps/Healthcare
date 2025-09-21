import React, { useState } from 'react';
import { Patient } from '../../types/medical';
import { useClusterAnalysis } from '../../hooks/useClusterAnalysis';

const matchingCriteria: Array<{ key: keyof Patient; label: string }> = [
  { key: 'age', label: 'Age' },
  { key: 'gender', label: 'Gender' },
];

const CaseControlStudy: React.FC = () => {
  const [condition, setCondition] = useState('');
  const [selectedCriteria, setSelectedCriteria] = useState<Array<keyof Patient>>([]);
  const [results, setResults] = useState<{ cases: Patient[]; controls: Patient[] } | null>(null);
  
  const { conductCaseControlStudy, isLoading, error } = useClusterAnalysis();

  const handleStudy = async () => {
    if (condition && selectedCriteria.length > 0) {
      const studyResults = await conductCaseControlStudy(condition, selectedCriteria);
      setResults(studyResults);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Case-Control Study</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Condition</label>
          <input
            type="text"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Enter condition name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Matching Criteria</label>
          <div className="mt-2 space-y-2">
            {matchingCriteria.map(({ key, label }) => (
              <label key={key} className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  checked={selectedCriteria.includes(key)}
                  onChange={(e) => {
                    setSelectedCriteria(prev =>
                      e.target.checked
                        ? [...prev, key]
                        : prev.filter(k => k !== key)
                    );
                  }}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-700">{label}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          onClick={handleStudy}
          disabled={isLoading || !condition || selectedCriteria.length === 0}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isLoading ? 'Processing...' : 'Conduct Study'}
        </button>

        {error && (
          <div className="text-red-600 text-sm mt-2">{error}</div>
        )}

        {results && (
          <div className="mt-6">
            <h4 className="text-md font-medium text-gray-900 mb-3">Study Results</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-2">Cases ({results.cases.length})</h5>
                <div className="bg-gray-50 p-3 rounded-md">
                  {results.cases.map(patient => (
                    <div key={patient.id} className="text-sm text-gray-600">
                      Patient #{patient.id} - {patient.age} years, {patient.gender}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-2">Controls ({results.controls.length})</h5>
                <div className="bg-gray-50 p-3 rounded-md">
                  {results.controls.map(patient => (
                    <div key={patient.id} className="text-sm text-gray-600">
                      Patient #{patient.id} - {patient.age} years, {patient.gender}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CaseControlStudy;