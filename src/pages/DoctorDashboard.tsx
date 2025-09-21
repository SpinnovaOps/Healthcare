import React, { useMemo } from 'react';
import { Users, Activity, Stethoscope, Calendar, AlertTriangle } from 'lucide-react';
import DashboardCard from '../components/dashboard/DashboardCard';
import TrendChart from '../components/charts/TrendChart';
import PatientDistributionChart from '../components/charts/PatientDistributionChart';
import PageLayout from '../components/PageLayout';
import { mockPatients } from '../data/mockPatientData';
import { useAuthStore } from '../store/authStore';
import { isConditionRelevant, getSpecialtyMetrics } from '../utils/specialtyUtils';

const DoctorDashboard = () => {
  const user = useAuthStore((state) => state.user);
  const specialty = user?.specialization || 'General Practitioner';

  // Filter patients based on specialty
  const relevantPatients = useMemo(() => 
    mockPatients.filter(patient => 
      patient.conditions.some(condition => 
        isConditionRelevant(condition, specialty)
      )
    ),
  [specialty]);

  const specialtyMetrics = getSpecialtyMetrics(specialty);
  
  // Calculate metrics
  const totalPatients = relevantPatients.length;
  const activePatients = relevantPatients.filter(p => 
    new Date().getTime() - new Date(p.lastVisit).getTime() < 30 * 24 * 60 * 60 * 1000
  ).length;
  
  const criticalCases = relevantPatients.filter(p =>
    p.conditions.some(c => c.severity === 'severe')
  ).length;

  // Generate specialty-specific trend data
  const patientTrends = [
    { name: 'Jan', value: Math.floor(totalPatients * 0.65) },
    { name: 'Feb', value: Math.floor(totalPatients * 0.78) },
    { name: 'Mar', value: Math.floor(totalPatients * 0.82) },
    { name: 'Apr', value: Math.floor(totalPatients * 0.95) },
    { name: 'May', value: totalPatients },
    { name: 'Jun', value: Math.floor(totalPatients * 1.1) },
  ];

  // Calculate condition distribution for specialty
  const conditionDistribution = useMemo(() => {
    const distribution: Record<string, number> = {};
    relevantPatients.forEach(patient => {
      patient.conditions.forEach(condition => {
        if (isConditionRelevant(condition, specialty)) {
          distribution[condition.name] = (distribution[condition.name] || 0) + 1;
        }
      });
    });
    
    return Object.entries(distribution)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 4);
  }, [relevantPatients, specialty]);

  return (
    <PageLayout background="doctor">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">{specialty} Dashboard</h1>
          <p className="mt-2 text-gray-600">Monitor patient statistics and trends</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardCard
            title="Specialty Patients"
            value={totalPatients}
            icon={Users}
            trend={{ value: 12, isPositive: true }}
          />
          <DashboardCard
            title="Active Patients"
            value={activePatients}
            icon={Activity}
            trend={{ value: 8, isPositive: true }}
          />
          <DashboardCard
            title="Today's Appointments"
            value={Math.floor(activePatients * 0.15)}
            icon={Calendar}
            trend={{ value: 5, isPositive: true }}
          />
          <DashboardCard
            title="Critical Cases"
            value={criticalCases}
            icon={AlertTriangle}
            trend={{ value: 2, isPositive: false }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <TrendChart
            data={patientTrends}
            title={`${specialty} Patient Trend`}
            color="#10B981"
          />
          <PatientDistributionChart
            data={conditionDistribution}
            title="Condition Distribution"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Metrics</h3>
            <div className="space-y-4">
              {specialtyMetrics.keyMetrics.map((metric, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-700">{metric}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">Tracking</span>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Risk Factors</h3>
            <div className="space-y-4">
              {specialtyMetrics.riskFactors.map((factor, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-700">{factor}</span>
                    <div className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                      Monitor
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Patient Activity</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Age</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Condition</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Severity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Visit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {relevantPatients.slice(0, 5).map((patient) => (
                  <tr key={patient.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#{patient.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{patient.age}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {patient.conditions.find(c => isConditionRelevant(c, specialty))?.name || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium
                        ${patient.conditions[0]?.severity === 'severe' ? 'bg-red-100 text-red-800' :
                          patient.conditions[0]?.severity === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'}`}>
                        {patient.conditions[0]?.severity || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(patient.lastVisit).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default DoctorDashboard;