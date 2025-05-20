import React, { useState, useEffect } from 'react';
import { Database, Terminal, Palette, Package, Info, ChevronRight, Moon, Sun, Menu, X, CheckCircle, Book, Zap } from 'lucide-react';
import SQLGame from './components/SQLGame';
import LinuxGame from './components/LinuxGame';
import CSSGame from './components/CSSGame';
import DockerGame from './components/DockerGame';

export type Technology = 'sql' | 'linux' | 'css' | 'docker' | 'home';

const TechLearningGame: React.FC = () => {
  const [currentTech, setCurrentTech] = useState<Technology>('home');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Load last selected tech from localStorage
  useEffect(() => {
    const savedTech = localStorage.getItem('techLearningGameCurrentTech');
    if (savedTech) {
      setCurrentTech(savedTech as Technology);
    }
    
    // Check user theme preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);

  // Save selected tech to localStorage
  useEffect(() => {
    localStorage.setItem('techLearningGameCurrentTech', currentTech);
  }, [currentTech]);

  // Apply theme class to document
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleTechChange = (tech: Technology) => {
    setCurrentTech(tech);
    setIsMobileMenuOpen(false); // Close mobile menu when changing tech
  };

  const renderContent = () => {
    switch (currentTech) {
      case 'sql':
        return <SQLGame />;
      case 'linux':
        return <LinuxGame />;
      case 'css':
        return <CSSGame />;
      case 'docker':
        return <DockerGame />;
      case 'home':
      default:
        return renderHomePage();
    }
  };

  const renderHomePage = () => {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100">
            Welcome to Tech Learning Game
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            An interactive platform to learn technology concepts through hands-on practice. 
            Choose a technology path below to start your learning journey.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div 
            className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 shadow-lg rounded-xl p-6 hover:shadow-xl transition-all cursor-pointer"
            onClick={() => handleTechChange('sql')}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-600 text-white rounded-lg">
                <Database className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300">SQL</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Learn database queries and operations. Master SELECT statements, filtering with WHERE, 
              joining tables, and aggregating data.
            </p>
            <div className="flex justify-end">
              <button className="text-blue-600 dark:text-blue-300 font-medium flex items-center gap-1">
                Start Learning <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div 
            className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/30 dark:to-teal-900/30 shadow-lg rounded-xl p-6 hover:shadow-xl transition-all cursor-pointer"
            onClick={() => handleTechChange('linux')}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-green-600 text-white rounded-lg">
                <Terminal className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-bold text-green-700 dark:text-green-300">Linux</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Master command-line operations and file system management. Learn navigation, file manipulation, 
              permissions, and advanced file operations.
            </p>
            <div className="flex justify-end">
              <button className="text-green-600 dark:text-green-300 font-medium flex items-center gap-1">
                Start Learning <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div 
            className="bg-gradient-to-br from-pink-50 to-red-50 dark:from-pink-900/30 dark:to-red-900/30 shadow-lg rounded-xl p-6 hover:shadow-xl transition-all cursor-pointer"
            onClick={() => handleTechChange('css')}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-pink-600 text-white rounded-lg">
                <Palette className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-bold text-pink-700 dark:text-pink-300">CSS</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Explore styling and layout techniques. Learn basic styling, flexbox, responsive design, 
              animations, and advanced selectors.
            </p>
            <div className="flex justify-end">
              <button className="text-pink-600 dark:text-pink-300 font-medium flex items-center gap-1">
                Start Learning <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div 
            className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/30 dark:to-blue-900/30 shadow-lg rounded-xl p-6 hover:shadow-xl transition-all cursor-pointer"
            onClick={() => handleTechChange('docker')}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-cyan-600 text-white rounded-lg">
                <Package className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-bold text-cyan-700 dark:text-cyan-300">Docker</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Learn container management and orchestration. Master images, containers, networks,
              volumes, and multi-container setups.
            </p>
            <div className="flex justify-end">
              <button className="text-cyan-600 dark:text-cyan-300 font-medium flex items-center gap-1">
                Start Learning <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-12 bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow">
          <div className="flex items-start gap-4">
            <div className="bg-yellow-100 dark:bg-yellow-900/40 p-2 rounded-lg">
              <Info className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                About this Platform
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                The Tech Learning Game platform is designed to provide an interactive, hands-on approach 
                to learning technical concepts. Each module features progressive levels that build on 
                previous knowledge, with immediate feedback and visual representations to reinforce learning.
              </p>
              <div className="mt-4 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Hands-on practice</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Book className="w-5 h-5 text-blue-500" />
                  <span>Concept explanations</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  <span>Real-time feedback</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => handleTechChange('home')}
                className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2"
                aria-label="Go to home page"
              >
                <Terminal className="text-purple-600 w-7 h-7" />
                <span className="hidden sm:inline">Tech Learning Game</span>
              </button>
            </div>
            
            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
              >
                {isMobileMenuOpen ? 
                  <X className="w-6 h-6" aria-hidden="true" /> : 
                  <Menu className="w-6 h-6" aria-hidden="true" />
                }
              </button>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2">
              <button
                onClick={() => handleTechChange('sql')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  currentTech === 'sql' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
                aria-current={currentTech === 'sql' ? 'true' : 'false'}
              >
                <Database className="inline w-4 h-4 mr-2" />
                SQL
              </button>
              <button
                onClick={() => handleTechChange('linux')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  currentTech === 'linux' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
                aria-current={currentTech === 'linux' ? 'true' : 'false'}
              >
                <Terminal className="inline w-4 h-4 mr-2" />
                Linux
              </button>
              <button
                onClick={() => handleTechChange('css')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  currentTech === 'css' 
                    ? 'bg-pink-600 text-white' 
                    : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
                aria-current={currentTech === 'css' ? 'true' : 'false'}
              >
                <Palette className="inline w-4 h-4 mr-2" />
                CSS
              </button>
              <button
                onClick={() => handleTechChange('docker')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  currentTech === 'docker' 
                    ? 'bg-cyan-600 text-white' 
                    : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
                aria-current={currentTech === 'docker' ? 'true' : 'false'}
              >
                <Package className="inline w-4 h-4 mr-2" />
                Docker
              </button>
              
              <button
                onClick={toggleTheme}
                className="ml-2 p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? 
                  <Moon className="w-5 h-5" /> : 
                  <Sun className="w-5 h-5" />
                }
              </button>
            </div>
          </div>
          
          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <div id="mobile-menu" className="mt-4 lg:hidden">
              <div className="flex flex-col gap-2 pt-2 pb-3 border-t dark:border-gray-700">
                <button
                  onClick={() => handleTechChange('sql')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    currentTech === 'sql' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                  }`}
                >
                  <Database className="inline w-4 h-4 mr-2" />
                  SQL
                </button>
                <button
                  onClick={() => handleTechChange('linux')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    currentTech === 'linux' 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                  }`}
                >
                  <Terminal className="inline w-4 h-4 mr-2" />
                  Linux
                </button>
                <button
                  onClick={() => handleTechChange('css')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    currentTech === 'css' 
                      ? 'bg-pink-600 text-white' 
                      : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                  }`}
                >
                  <Palette className="inline w-4 h-4 mr-2" />
                  CSS
                </button>
                <button
                  onClick={() => handleTechChange('docker')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    currentTech === 'docker' 
                      ? 'bg-cyan-600 text-white' 
                      : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                  }`}
                >
                  <Package className="inline w-4 h-4 mr-2" />
                  Docker
                </button>
                
                <button
                  onClick={toggleTheme}
                  className="mt-2 px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 flex items-center"
                >
                  {theme === 'light' ? 
                    <><Moon className="w-4 h-4 mr-2" /> Dark Mode</> : 
                    <><Sun className="w-4 h-4 mr-2" /> Light Mode</>
                  }
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Render the selected game */}
      {renderContent()}
      
      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 shadow-inner mt-8 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-600 dark:text-gray-300 text-sm">
              © 2025 Tech Learning Games | All rights reserved
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => handleTechChange('home')}
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm"
              >
                Home
              </button>
              <button className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm">
                About
              </button>
              <button className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm">
                Privacy
              </button>
              <button className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm">
                Terms
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TechLearningGame;