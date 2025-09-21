import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Database } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-900/95 to-indigo-900/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <Brain className="h-8 w-8 text-blue-400 group-hover:text-blue-300 transition-colors" />
              <span className="text-xl font-bold text-white group-hover:text-blue-100 transition-colors">
                HealthAI Analytics
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <Link 
              to="/patient-data" 
              className="relative px-4 py-2 text-blue-100 hover:text-white transition-colors group"
            >
              <div className="flex items-center space-x-2">
                <Database className="h-5 w-5" />
                <span className="relative z-10">View Patient Data</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 
                            opacity-0 group-hover:opacity-100 -skew-x-12 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 
                            scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </Link>
            <Link 
              to="/doctor-login" 
              className="relative px-4 py-2 text-blue-100 hover:text-white transition-colors group"
            >
              <span className="relative z-10">Clinician Portal</span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/10 to-green-500/0 
                            opacity-0 group-hover:opacity-100 -skew-x-12 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-green-400 to-blue-400 
                            scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </Link>
            <Link 
              to="/researcher-login" 
              className="relative px-4 py-2 text-blue-100 hover:text-white transition-colors group"
            >
              <span className="relative z-10">Researcher Portal</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-purple-500/0 
                            opacity-0 group-hover:opacity-100 -skew-x-12 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 
                            scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;