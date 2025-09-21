import React, { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

interface AlertProps {
  message: string;
  onClose: () => void;
  duration?: number;
}

const Alert = ({ message, onClose, duration = 3000 }: AlertProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className="fixed top-4 right-4 flex items-center bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded z-50">
      <CheckCircle className="h-5 w-5 mr-2" />
      <span className="font-medium">{message}</span>
    </div>
  );
};

export default Alert;