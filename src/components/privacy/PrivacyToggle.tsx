import React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '../../utils/cn';

interface PrivacyToggleProps {
  isEnabled: boolean;
  onToggle: () => void;
}

export const PrivacyToggle: React.FC<PrivacyToggleProps> = ({ isEnabled, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={cn(
        'flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300',
        'border-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5',
        isEnabled
          ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 hover:border-green-300'
          : 'bg-gradient-to-r from-red-50 to-rose-50 border-red-200 hover:border-red-300'
      )}
    >
      {isEnabled ? (
        <>
          <Eye className="h-4 w-4 text-green-600" />
          <span className="text-green-700 font-medium">Privacy Enabled</span>
        </>
      ) : (
        <>
          <EyeOff className="h-4 w-4 text-red-600" />
          <span className="text-red-700 font-medium">Privacy Disabled</span>
        </>
      )}
    </button>
  );
};