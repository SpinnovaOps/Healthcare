import React from 'react';
import { SortAsc, SortDesc } from 'lucide-react';
import { Patient } from '../../types/medical';
import { cn } from '../../utils/cn';

interface PatientTableProps {
  patients: Patient[];
  sortField: 'id' | 'age' | 'gender';
  sortDirection: 'asc' | 'desc';
  onSort: (field: 'id' | 'age' | 'gender') => void;
}

const PatientTable: React.FC<PatientTableProps> = ({
  patients,
  sortField,
  sortDirection,
  onSort,
}) => {
  const TableHeader: React.FC<{ field: 'id' | 'age' | 'gender'; label: string }> = ({ field, label }) => (
    <th 
      className="px-6 py-3 text-left cursor-pointer group"
      onClick={() => onSort(field)}
    >
      <div className="flex items-center space-x-1">
        <span className="text-xs font-medium text-gray-600 uppercase tracking-wider group-hover:text-blue-600 transition-colors">
          {label}
        </span>
        {sortField === field && (
          sortDirection === 'asc' ? 
            <SortAsc className="h-4 w-4 text-blue-500" /> :
            <SortDesc className="h-4 w-4 text-blue-500" />
        )}
      </div>
    </th>
  );

  return (
    <div className="relative group">
      {/* Highlight Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
      
      <div className="relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-lg shadow-xl border-2 border-blue-100 group-hover:border-blue-200 transition-all duration-300">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <tr>
                <TableHeader field="id" label="ID" />
                <TableHeader field="age" label="Age" />
                <TableHeader field="gender" label="Gender" />
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Conditions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Vital Signs
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Lab Results
                </th>
              </tr>
            </thead>
            <tbody className="bg-white/70 divide-y divide-gray-200">
              {patients.map((patient) => (
                <tr key={patient.id} className="hover:bg-blue-50/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    #{patient.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {patient.age}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {patient.gender}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {patient.conditions.map((condition) => (
                        <span
                          key={condition.id}
                          className={cn(
                            'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium',
                            condition.severity === 'severe' ? 'bg-red-100 text-red-800 border border-red-200' :
                            condition.severity === 'moderate' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                            'bg-green-100 text-green-800 border border-green-200'
                          )}
                        >
                          {condition.name}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1 text-sm">
                      <p className="text-gray-900">BP: {patient.vitalSigns.bloodPressure.systolic}/{patient.vitalSigns.bloodPressure.diastolic}</p>
                      <p className="text-gray-900">HR: {patient.vitalSigns.heartRate}</p>
                      <p className="text-gray-900">Temp: {patient.vitalSigns.temperature}°C</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1 text-sm">
                      <p className="text-gray-900">Glucose: {patient.labResults.glucose}</p>
                      <p className="text-gray-900">Chol: {patient.labResults.cholesterol}</p>
                      <p className="text-gray-900">Creat: {patient.labResults.creatinine}</p>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PatientTable;