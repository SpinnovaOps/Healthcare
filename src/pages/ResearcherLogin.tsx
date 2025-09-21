import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Microscope } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import Alert from '../components/Alert';

const ResearcherLogin = () => {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const [showAlert, setShowAlert] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    institution: '',
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
        id: '2',
        name: formData.name || 'Dr. Johnson',
        role: 'researcher',
      });
      navigate('/researcher-dashboard');
    }
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 py-12"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80')`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/90 via-purple-900/85 to-blue-900/90 backdrop-blur-sm"></div>
      
      {showAlert && (
        <Alert
          message="Registration successful! Please login with your credentials."
          onClose={() => setShowAlert(false)}
        />
      )}
      
      <div className="relative w-full max-w-md">
        <div className="relative bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-white/20">
          <div className="flex flex-col items-center mb-6">
            <div className="p-4 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full shadow-inner backdrop-blur-sm">
              <Microscope className="h-10 w-10 text-indigo-400" />
            </div>
            <h2 className="mt-4 text-2xl font-bold text-white">
              {formData.isRegistering ? 'Researcher Registration' : 'Researcher Login'}
            </h2>
            <p className="mt-2 text-indigo-200 text-center">
              {formData.isRegistering 
                ? 'Create your account to access research tools'
                : 'Welcome back! Please login to your account'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {formData.isRegistering && (
              <>
                <div>
                  <label className="block text-sm font-medium text-indigo-200">Full Name</label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-lg border-transparent bg-white/10 backdrop-blur-sm text-white placeholder-indigo-200/70 focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="Dr. Jane Smith"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-indigo-200">Institution</label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-lg border-transparent bg-white/10 backdrop-blur-sm text-white placeholder-indigo-200/70 focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    required
                    placeholder="Research Institute"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-indigo-200">Email</label>
              <input
                type="email"
                className="mt-1 block w-full rounded-lg border-transparent bg-white/10 backdrop-blur-sm text-white placeholder-indigo-200/70 focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                placeholder="researcher@institute.edu"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-indigo-200">Password</label>
              <input
                type="password"
                className="mt-1 block w-full rounded-lg border-transparent bg-white/10 backdrop-blur-sm text-white placeholder-indigo-200/70 focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-lg shadow-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
            >
              {formData.isRegistering ? 'Register' : 'Login'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              className="text-indigo-200 hover:text-white transition-colors"
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

export default ResearcherLogin;