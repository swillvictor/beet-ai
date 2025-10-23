
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <h1 className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
          <span role="img" aria-label="microphone" className="mr-2">🎤</span> Audio Ad Script Generator
        </h1>
      </div>
    </header>
  );
};
