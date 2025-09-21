import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import Alert from '../components/Alert';

const specializations = [
  'Cardiologist',
  'Neurologist',
  'Oncologist',
  'Pediatrician',
  'Psychiatrist',
  'General Practitioner',
];

const DoctorLogin = () => {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const [showAlert, setShowAlert] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    specialization: '',
    name: '',
    isRegistering: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.isRegistering) {
      setShowAlert(true);
      setTimeout(() => {
        setFormData({ ...formData, isRegistering: false });
        setShowAlert(false);
      }, 3000);
    } else {
      setUser({
        id: '1',
        name: formData.name || 'Dr. Smith',
        role: 'doctor',
        specialization: formData.specialization,
      });
      navigate('/doctor-dashboard');
    }
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 py-12"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80')`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/90 via-blue-900/85 to-green-900/90 backdrop-blur-sm"></div>
      
      {showAlert && (
        <Alert
          message="Registration successful! Please login with your credentials."
          onClose={() => setShowAlert(false)}
        />
      )}
      
      <div className="relative w-full max-w-md">
        <div className="relative bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-white/20">
          <div className="flex flex-col items-center mb-6">
            <div className="p-4 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full shadow-inner backdrop-blur-sm">
              <Stethoscope className="h-10 w-10 text-green-400" />
            </div>
            <h2 className="mt-4 text-2xl font-bold text-white">
              {formData.isRegistering ? 'Doctor Registration' : 'Doctor Login'}
            </h2>
            <p className="mt-2 text-blue-200 text-center">
              {formData.isRegistering 
                ? 'Create your account to access the clinical portal'
                : 'Welcome back! Please login to your account'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {formData.isRegistering && (
              <div>
                <label className="block text-sm font-medium text-blue-200">Full Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-lg border-transparent bg-white/10 backdrop-blur-sm text-white placeholder-blue-200/70 focus:border-green-500 focus:ring-green-500 transition-colors"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder="Dr. John Smith"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-blue-200">Email</label>
              <input
                type="email"
                className="mt-1 block w-full rounded-lg border-transparent bg-white/10 backdrop-blur-sm text-white placeholder-blue-200/70 focus:border-green-500 focus:ring-green-500 transition-colors"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                placeholder="doctor@hospital.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-200">Password</label>
              <input
                type="password"
                className="mt-1 block w-full rounded-lg border-transparent bg-white/10 backdrop-blur-sm text-white placeholder-blue-200/70 focus:border-green-500 focus:ring-green-500 transition-colors"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                placeholder="••••••••"
              />
            </div>

            {formData.isRegistering && (
              <div>
                <label className="block text-sm font-medium text-blue-200">Specialization</label>
                <select
                  className="mt-1 block w-full rounded-lg border-transparent bg-white/10 backdrop-blur-sm text-white focus:border-green-500 focus:ring-green-500 transition-colors"
                  value={formData.specialization}
                  onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                  required
                >
                  <option value="" className="bg-gray-800">Select Specialization</option>
                  {specializations.map((spec) => (
                    <option key={spec} value={spec} className="bg-gray-800">
                      {spec}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-lg shadow-sm text-white bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300"
            >
              {formData.isRegistering ? 'Register' : 'Login'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              className="text-blue-200 hover:text-white transition-colors"
              onClick={() => setFormData({ ...formData, isRegistering: !formData.isRegistering })}
            >
              {formData.isRegistering
                ? 'Already have an account? Login'
                : "Don't have an account? Register"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorLogin;