import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Stethoscope, Microscope, Brain } from 'lucide-react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import DoctorLogin from './pages/DoctorLogin';
import ResearcherLogin from './pages/ResearcherLogin';
import DoctorDashboard from './pages/DoctorDashboard';
import ResearcherDashboard from './pages/ResearcherDashboard';
import PatientDataViewer from './pages/PatientDataViewer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctor-login" element={<DoctorLogin />} />
          <Route path="/researcher-login" element={<ResearcherLogin />} />
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/researcher-dashboard" element={<ResearcherDashboard />} />
          <Route path="/patient-data" element={<PatientDataViewer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;