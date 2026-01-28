import React from 'react';

export const Ripple = () => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none overflow-hidden z-0">
      <div className="absolute top-1/2 left-1/2 w-[200px] h-[200px] bg-teal-500/20 rounded-full animate-ripple" style={{ animationDelay: '0s' }}></div>
      <div className="absolute top-1/2 left-1/2 w-[200px] h-[200px] bg-teal-500/15 rounded-full animate-ripple" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 w-[200px] h-[200px] bg-teal-500/10 rounded-full animate-ripple" style={{ animationDelay: '2s' }}></div>
      <style>{`
        @keyframes ripple {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(4); opacity: 0; }
        }
        .animate-ripple {
          animation: ripple 3s infinite linear;
        }
      `}</style>
    </div>
  );
};