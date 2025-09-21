import React from 'react';
import { cn } from '../../utils/cn';
import { PrivacyLevel } from '../../utils/privacyLevels';

interface PrivacySliderProps {
  epsilon: number;
  onEpsilonChange: (value: number) => void;
  privacyLevel: PrivacyLevel;
}

export const PrivacySlider: React.FC<PrivacySliderProps> = ({
  epsilon,
  onEpsilonChange,
  privacyLevel,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-gray-700">
          Privacy Level (ε): {epsilon.toFixed(2)}
        </label>
        <span className={cn(
          'px-3 py-1 rounded-full text-sm font-medium',
          privacyLevel.bgColor,
          privacyLevel.textColor
        )}>
          {privacyLevel.label}
        </span>
      </div>
      
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-green-200 via-blue-200 to-red-200 rounded-lg blur opacity-30"></div>
        <input
          type="range"
          min="0.1"
          max="2"
          step="0.1"
          value={epsilon}
          onChange={(e) => onEpsilonChange(parseFloat(e.target.value))}
          className="relative w-full h-2 bg-gradient-to-r from-green-500 via-blue-500 to-red-500 rounded-lg appearance-none cursor-pointer"
          style={{
            WebkitAppearance: 'none',
            appearance: 'none',
          }}
        />
      </div>

      <div className="flex justify-between text-xs text-gray-500">
        <span>High Privacy</span>
        <span>Balanced</span>
        <span>Low Privacy</span>
      </div>
    </div>
  );
};