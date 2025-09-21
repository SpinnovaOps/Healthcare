import React from 'react';
import { Shield } from 'lucide-react';
import { getPrivacyLevelInfo } from '../utils/privacyLevels';
import { PrivacyToggle } from './privacy/PrivacyToggle';
import { PrivacySlider } from './privacy/PrivacySlider';

interface PrivacyControlsProps {
  isPrivacyEnabled: boolean;
  epsilon: number;
  onTogglePrivacy: () => void;
  onEpsilonChange: (value: number) => void;
}

const PrivacyControls: React.FC<PrivacyControlsProps> = ({
  isPrivacyEnabled,
  epsilon,
  onTogglePrivacy,
  onEpsilonChange,
}) => {
  const privacyLevel = getPrivacyLevelInfo(epsilon);

  return (
    <div className="relative group">
      {/* Highlight Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-lg blur-lg opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
      
      <div className="relative bg-white p-6 rounded-lg shadow-xl border-2 border-blue-100 hover:border-blue-200 transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
              <Shield className="h-6 w-6 text-blue-500 group-hover:text-blue-600 transition-colors" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Privacy Controls</h3>
          </div>
          <PrivacyToggle
            isEnabled={isPrivacyEnabled}
            onToggle={onTogglePrivacy}
          />
        </div>

        <PrivacySlider
          epsilon={epsilon}
          onEpsilonChange={onEpsilonChange}
          privacyLevel={privacyLevel}
        />
      </div>
    </div>
  );
};

export default PrivacyControls;