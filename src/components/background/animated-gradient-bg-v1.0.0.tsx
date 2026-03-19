import React from 'react';

interface Props {
  children: React.ReactNode;
}

const AnimatedGradientBackground: React.FC<Props> = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-[#050A15] overflow-hidden">
      {/* Static Subdued Grid line overlay */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]" 
        style={{ backgroundImage: 'linear-gradient(#4f46e5 1px, transparent 1px), linear-gradient(90deg, #4f46e5 1px, transparent 1px)', backgroundSize: '64px 64px' }}
      />
      {/* Static subtle corner glows - strictly native CSS layers without blend mode calculation penalties */}
      <div className="absolute -top-[20%] right-[10%] w-[800px] h-[800px] bg-[#0ea5e9]/10 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="absolute -bottom-[20%] left-[10%] w-[600px] h-[600px] bg-[#4f46e5]/10 rounded-full blur-[150px] pointer-events-none z-0" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default AnimatedGradientBackground;
