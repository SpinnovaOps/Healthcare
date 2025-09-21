import React, { useState } from 'react';
import { Database } from 'lucide-react';
import { mockPatients } from '../data/mockPatientData';
import PrivacyControls from '../components/PrivacyControls';
import { applyBatchPrivacy } from '../utils/privacyUtils';
import PageLayout from '../components/PageLayout';
import PatientTable from '../components/patient/PatientTable';
import SearchBar from '../components/patient/SearchBar';
import Pagination from '../components/patient/Pagination';

const PatientDataViewer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<'id' | 'age' | 'gender'>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [isPrivacyEnabled, setIsPrivacyEnabled] = useState(true);
  const [epsilon, setEpsilon] = useState(1.0);
  
  const patientsPerPage = 10;

  // Apply privacy to the dataset
  const processedPatients = isPrivacyEnabled 
    ? applyBatchPrivacy(mockPatients, epsilon)
    : mockPatients;

  // Filter and sort patients
  const filteredPatients = processedPatients
    .filter(patient => 
      patient.id.toString().includes(searchTerm) ||
      patient.age.toString().includes(searchTerm) ||
      patient.gender.includes(searchTerm.toLowerCase()) ||
      patient.conditions.some(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      return sortDirection === 'asc' 
        ? (aValue > bValue ? 1 : -1)
        : (aValue < bValue ? 1 : -1);
    });

  // Pagination
  const totalPages = Math.ceil(filteredPatients.length / patientsPerPage);
  const startIndex = (currentPage - 1) * patientsPerPage;
  const displayedPatients = filteredPatients.slice(startIndex, startIndex + patientsPerPage);

  const handleSort = (field: 'id' | 'age' | 'gender') => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80')`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-white/50 to-blue-900/10 backdrop-blur-[2px]"></div>
      
      <PageLayout background="patient">
        <div className="relative max-w-7xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Patient Dataset</h1>
            <div className="flex items-center space-x-2 mb-4">
              <Database className="h-5 w-5 text-blue-500" />
              <span className="text-gray-600">Total Patients: {mockPatients.length}</span>
            </div>

            <PrivacyControls
              isPrivacyEnabled={isPrivacyEnabled}
              epsilon={epsilon}
              onTogglePrivacy={() => setIsPrivacyEnabled(!isPrivacyEnabled)}
              onEpsilonChange={setEpsilon}
            />
            
            <SearchBar value={searchTerm} onChange={setSearchTerm} />

            <PatientTable
              patients={displayedPatients}
              sortField={sortField}
              sortDirection={sortDirection}
              onSort={handleSort}
            />

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              startIndex={startIndex}
              endIndex={startIndex + patientsPerPage}
              totalItems={filteredPatients.length}
            />
          </div>
        </div>
      </PageLayout>
    </div>
  );
};

export default PatientDataViewer;