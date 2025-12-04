import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const progress = Math.min(100, (currentStep / totalSteps) * 100);

  return (
    <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden mb-8">
      <div 
        className="bg-white h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_white]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};