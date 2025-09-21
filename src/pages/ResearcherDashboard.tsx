import React from 'react';
import { FileSearch, Brain, TrendingUp, Users } from 'lucide-react';
import DashboardCard from '../components/dashboard/DashboardCard';
import TrendChart from '../components/charts/TrendChart';
import PatientDistributionChart from '../components/charts/PatientDistributionChart';
import PageLayout from '../components/PageLayout';
import { mockPatients } from '../data/mockPatientData';

const researchTrends = [
  { name: 'Jan', value: 42 },
  { name: 'Feb', value: 55 },
  { name: 'Mar', value: 68 },
  { name: 'Apr', value: 75 },
  { name: 'May', value: 85 },
  { name: 'Jun', value: 92 },
];

const ageDistribution = [
  { name: '18-30', value: 20 },
  { name: '31-50', value: 35 },
  { name: '51-70', value: 30 },
  { name: '70+', value: 15 },
];

const ResearcherDashboard = () => {
  const totalPatients = mockPatients.length;
  const completedStudies = 24;

  return (
    <PageLayout background="researcher">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Research Dashboard</h1>
          <p className="mt-2 text-gray-600">Analytics and research insights</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardCard
            title="Study Participants"
            value={totalPatients}
            icon={Users}
            trend={{ value: 15, isPositive: true }}
          />
          <DashboardCard
            title="Completed Studies"
            value={completedStudies}
            icon={FileSearch}
            trend={{ value: 8, isPositive: true }}
          />
          <DashboardCard
            title="Active Studies"
            value={12}
            icon={Brain}
            trend={{ value: 3, isPositive: true }}
          />
          <DashboardCard
            title="Success Rate"
            value="92%"
            icon={TrendingUp}
            trend={{ value: 5, isPositive: true }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <TrendChart
            data={researchTrends}
            title="Research Progress Trend"
            color="#8B5CF6"
          />
          <PatientDistributionChart
            data={ageDistribution}
            title="Study Participant Age Distribution"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Studies</h3>
            <div className="space-y-4">
              {[
                { title: 'Cardiovascular Risk Factors', progress: 75 },
                { title: 'Diabetes Management', progress: 60 },
                { title: 'Mental Health Patterns', progress: 45 },
                { title: 'Respiratory Conditions', progress: 90 },
              ].map((study, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-700">{study.title}</span>
                    <span className="text-sm text-gray-500">{study.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full"
                      style={{ width: `${study.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Findings</h3>
            <div className="space-y-4">
              {[
                {
                  title: 'Treatment Efficacy',
                  description: 'Significant improvement in patient outcomes with new protocol',
                  change: '+28%',
                  positive: true,
                },
                {
                  title: 'Recovery Time',
                  description: 'Reduced hospital stay duration across age groups',
                  change: '-15%',
                  positive: true,
                },
                {
                  title: 'Side Effects',
                  description: 'Decreased adverse reactions in trial group',
                  change: '-32%',
                  positive: true,
                },
                {
                  title: 'Patient Satisfaction',
                  description: 'Improved satisfaction scores with new approach',
                  change: '+18%',
                  positive: true,
                },
              ].map((finding, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className={`mt-1 p-1.5 rounded-full ${finding.positive ? 'bg-green-100' : 'bg-red-100'}`}>
                    <TrendingUp className={`h-4 w-4 ${finding.positive ? 'text-green-600' : 'text-red-600'}`} />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900">{finding.title}</span>
                      <span className={`text-sm ${finding.positive ? 'text-green-600' : 'text-red-600'}`}>
                        {finding.change}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{finding.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ResearcherDashboard;