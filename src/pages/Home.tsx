import React from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, Microscope, Brain, Shield, Network, LineChart } from 'lucide-react';

const Home = () => {
  return (
    <div className="relative min-h-screen">
      {/* Hero Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/95 via-blue-900/90 to-indigo-900/95"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="min-h-screen flex flex-col justify-center">
          <div className="text-center py-20">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
              Advanced Healthcare Analytics
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 text-transparent bg-clip-text">
                Powered by AI
              </span>
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-12">
              Empowering healthcare professionals with cutting-edge AI-driven insights 
              for better patient care and research outcomes
            </p>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
              <Link to="/doctor-login" 
                className="group relative p-8 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 shadow-xl hover:shadow-2xl hover:bg-white/20 transition-all duration-300">
                <div className="relative flex flex-col items-center text-center">
                  <div className="p-4 bg-green-400/20 rounded-full mb-4 group-hover:bg-green-400/30 transition-colors">
                    <Stethoscope className="h-12 w-12 text-green-400" />
                  </div>
                  <h2 className="text-2xl font-semibold text-white mb-4">Clinician Portal</h2>
                  <p className="text-blue-100">
                    Access patient clustering analysis, similarity scores, and AI-powered treatment recommendations
                  </p>
                </div>
              </Link>

              <Link to="/researcher-login"
                className="group relative p-8 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 shadow-xl hover:shadow-2xl hover:bg-white/20 transition-all duration-300">
                <div className="relative flex flex-col items-center text-center">
                  <div className="p-4 bg-purple-400/20 rounded-full mb-4 group-hover:bg-purple-400/30 transition-colors">
                    <Microscope className="h-12 w-12 text-purple-400" />
                  </div>
                  <h2 className="text-2xl font-semibold text-white mb-4">Researcher Portal</h2>
                  <p className="text-blue-100">
                    Conduct advanced case-control studies and access comprehensive research analytics
                  </p>
                </div>
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="relative p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-blue-400/20 rounded-full mr-4">
                    <Brain className="h-6 w-6 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">AI-Powered Analysis</h3>
                </div>
                <p className="text-blue-100">
                  Advanced machine learning algorithms for accurate patient clustering and predictions
                </p>
              </div>

              <div className="relative p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-purple-400/20 rounded-full mr-4">
                    <Shield className="h-6 w-6 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Secure Platform</h3>
                </div>
                <p className="text-blue-100">
                  Enterprise-grade security ensuring complete protection of sensitive medical data
                </p>
              </div>

              <div className="relative p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-green-400/20 rounded-full mr-4">
                    <Network className="h-6 w-6 text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Real-time Insights</h3>
                </div>
                <p className="text-blue-100">
                  Instant access to patient analytics and research findings for informed decisions
                </p>
              </div>
            </div>

            <div className="mt-16">
              <div className="inline-flex items-center space-x-2 text-blue-300 text-sm">
                <LineChart className="h-4 w-4" />
                <span>Trusted by leading healthcare institutions worldwide</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;