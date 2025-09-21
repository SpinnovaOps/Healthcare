import React from 'react';
import { cn } from '../utils/cn';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
  background?: 'default' | 'doctor' | 'researcher' | 'patient';
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, className, background = 'default' }) => {
  const backgrounds = {
    default: 'bg-gradient-to-br from-blue-50 to-indigo-50',
    doctor: 'bg-gradient-to-br from-green-50 via-blue-50 to-green-100',
    researcher: 'bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-100',
    patient: 'bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100',
  };

  return (
    <div className={cn(
      'min-h-screen pt-16',
      backgrounds[background],
      className
    )}>
      {children}
    </div>
  );
};

export default PageLayout;