import React, { useState } from 'react';
import { Database, Terminal, Palette, Package } from 'lucide-react';
import SQLGame from './components/SQLGame';
import LinuxGame from './components/LinuxGame';
import CSSGame from './components/CSSGame';

export type Technology = 'sql' | 'linux' | 'css' | 'docker';

const TechLearningGame: React.FC = () => {
  const [currentTech, setCurrentTech] = useState<Technology>('sql');

  const renderGame = () => {
    switch (currentTech) {
      case 'sql':
        return <SQLGame />;
      case 'linux':
        return <LinuxGame />;
      case 'css':
        return <CSSGame />;
      default:
        return <SQLGame />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Terminal className="text-purple-600" />
              Tech Learning Game
            </h1>
            
            {/* Technology Selector */}
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentTech('sql')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  currentTech === 'sql' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <Database className="inline w-4 h-4 mr-2" />
                SQL
              </button>
              <button
                onClick={() => setCurrentTech('linux')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  currentTech === 'linux' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <Terminal className="inline w-4 h-4 mr-2" />
                Linux
              </button>
              <button
                onClick={() => setCurrentTech('css')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  currentTech === 'css' 
                    ? 'bg-pink-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <Palette className="inline w-4 h-4 mr-2" />
                CSS
              </button>
              <button
                onClick={() => setCurrentTech('docker')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  currentTech === 'docker' 
                    ? 'bg-cyan-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <Package className="inline w-4 h-4 mr-2" />
                Docker
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Render the selected game */}
      {renderGame()}
    </div>
  );
};

export default TechLearningGame;