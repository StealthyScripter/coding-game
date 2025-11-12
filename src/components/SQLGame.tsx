import React, { useState } from 'react';
import {
  Database, Target, Lightbulb, BookOpen, Play,
  RefreshCw, CheckCircle, XCircle, ChevronLeft, Award
} from 'lucide-react';

interface Level {
  id: number;
  title: string;
  task: string;
  hint: string;
  concept: string;
  solution: string;
  table: Array<{
    id: number;
    name?: string;
    department?: string;
    salary?: number;
    age?: number;
    city?: string;
    product?: string;
    price?: number;
    quantity?: number;
  }>;
}

interface SQLGameProps {
  onBack: () => void;
  onComplete: (xp: number) => void;
}

const SQLGame: React.FC<SQLGameProps> = ({ onBack, onComplete }) => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showConcept, setShowConcept] = useState(false);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);

  const levels: Level[] = [
    {
      id: 1,
      title: "Select All Employees",
      task: "Retrieve all columns from the employees table",
      hint: "Use SELECT * to get all columns",
      concept: "SELECT * retrieves all columns. Use SELECT column1, column2 for specific columns.",
      solution: "SELECT * FROM employees",
      table: [
        { id: 1, name: "Alice Johnson", department: "Engineering", salary: 75000, age: 28 },
        { id: 2, name: "Bob Smith", department: "Sales", salary: 65000, age: 32 },
        { id: 3, name: "Charlie Davis", department: "Marketing", salary: 70000, age: 29 },
        { id: 4, name: "Diana Wilson", department: "Engineering", salary: 80000, age: 35 }
      ]
    },
    {
      id: 2,
      title: "Filter by Department",
      task: "Get all employees in the Engineering department",
      hint: "Use WHERE to filter rows based on a condition",
      concept: "WHERE clause filters rows. Syntax: WHERE column = 'value'",
      solution: "SELECT * FROM employees WHERE department = 'Engineering'",
      table: [
        { id: 1, name: "Alice Johnson", department: "Engineering", salary: 75000, age: 28 },
        { id: 2, name: "Bob Smith", department: "Sales", salary: 65000, age: 32 },
        { id: 3, name: "Charlie Davis", department: "Marketing", salary: 70000, age: 29 },
        { id: 4, name: "Diana Wilson", department: "Engineering", salary: 80000, age: 35 },
        { id: 5, name: "Eve Martinez", department: "Engineering", salary: 82000, age: 31 }
      ]
    },
    {
      id: 3,
      title: "Filter by Salary",
      task: "Find all employees with salary greater than $70,000",
      hint: "Use comparison operators: >, <, >=, <=, =, !=",
      concept: "Comparison operators filter numeric data. Example: WHERE salary > 70000",
      solution: "SELECT * FROM employees WHERE salary > 70000",
      table: [
        { id: 1, name: "Alice Johnson", department: "Engineering", salary: 75000, age: 28 },
        { id: 2, name: "Bob Smith", department: "Sales", salary: 65000, age: 32 },
        { id: 3, name: "Charlie Davis", department: "Marketing", salary: 70000, age: 29 },
        { id: 4, name: "Diana Wilson", department: "Engineering", salary: 80000, age: 35 },
        { id: 5, name: "Eve Martinez", department: "Sales", salary: 82000, age: 31 }
      ]
    },
    {
      id: 4,
      title: "Multiple Conditions",
      task: "Get Engineering employees with salary > $70,000",
      hint: "Combine conditions with AND",
      concept: "AND combines conditions (all must be true). OR requires at least one to be true.",
      solution: "SELECT * FROM employees WHERE department = 'Engineering' AND salary > 70000",
      table: [
        { id: 1, name: "Alice Johnson", department: "Engineering", salary: 75000, age: 28 },
        { id: 2, name: "Bob Smith", department: "Sales", salary: 65000, age: 32 },
        { id: 3, name: "Charlie Davis", department: "Marketing", salary: 78000, age: 29 },
        { id: 4, name: "Diana Wilson", department: "Engineering", salary: 80000, age: 35 },
        { id: 5, name: "Frank Brown", department: "Engineering", salary: 68000, age: 26 }
      ]
    },
    {
      id: 5,
      title: "Select Specific Columns",
      task: "Get only the name and salary of all employees",
      hint: "List column names separated by commas after SELECT",
      concept: "SELECT name, salary FROM table retrieves only specified columns.",
      solution: "SELECT name, salary FROM employees",
      table: [
        { id: 1, name: "Alice Johnson", department: "Engineering", salary: 75000, age: 28 },
        { id: 2, name: "Bob Smith", department: "Sales", salary: 65000, age: 32 },
        { id: 3, name: "Charlie Davis", department: "Marketing", salary: 70000, age: 29 }
      ]
    }
  ];

  const level = levels[currentLevel - 1];

  const handleSubmit = () => {
    const normalized = userInput.trim().toLowerCase().replace(/\s+/g, ' ');
    const solutionNormalized = level.solution.toLowerCase().replace(/\s+/g, ' ');

    if (normalized === solutionNormalized) {
      setFeedback({ type: 'success', message: '🎉 Perfect! +100 XP' });

      if (!completedLevels.includes(currentLevel)) {
        setCompletedLevels([...completedLevels, currentLevel]);
      }

      setTimeout(() => {
        onComplete(100);
        if (currentLevel < levels.length) {
          setCurrentLevel(currentLevel + 1);
          setUserInput('');
          setFeedback(null);
          setShowHint(false);
          setShowConcept(false);
        }
      }, 2000);
    } else {
      setFeedback({ type: 'error', message: '❌ Not quite right. Try again!' });
    }
  };

  return (
    <div>
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Home
      </button>

      {/* Level Progress */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-3">
            <Database className="w-8 h-8 text-purple-500" />
            SQL Level {currentLevel}: {level.title}
          </h2>
          <p className="text-gray-400 mt-2">Complete all levels to become a SQL Master!</p>
        </div>
        <div className="flex gap-2">
          {levels.map((l) => (
            <div
              key={l.id}
              className={`w-3 h-3 rounded-full transition-all ${
                completedLevels.includes(l.id) ? 'bg-green-500' :
                l.id === currentLevel ? 'bg-gradient-to-r from-purple-500 to-blue-500 animate-pulse scale-125' :
                'bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Task Panel */}
        <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-purple-500" />
            <h3 className="text-xl font-bold">Your Mission</h3>
          </div>
          <p className="text-gray-300 text-lg mb-6">{level.task}</p>

          <div className="space-y-4">
            <button
              onClick={() => setShowConcept(!showConcept)}
              className="w-full text-left"
            >
              <div className="rounded-2xl bg-cyan-500/10 border border-cyan-500/30 p-4 hover:bg-cyan-500/20 transition-all cursor-pointer">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="w-4 h-4 text-cyan-500" />
                  <span className="font-semibold text-cyan-500">Key Concept</span>
                </div>
                {showConcept && (
                  <p className="text-sm text-gray-300 mt-2">{level.concept}</p>
                )}
              </div>
            </button>

            {showHint && (
              <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/30 p-4 animate-slide-down">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="w-4 h-4 text-yellow-500" />
                  <span className="font-semibold text-yellow-500">Hint</span>
                </div>
                <p className="text-sm text-gray-300">{level.hint}</p>
              </div>
            )}
          </div>

          {completedLevels.length > 0 && (
            <div className="mt-6 rounded-2xl bg-green-500/10 border border-green-500/30 p-4">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-green-500" />
                <span className="font-semibold text-green-500">
                  {completedLevels.length} Level{completedLevels.length > 1 ? 's' : ''} Completed!
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Visual Table */}
        <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Database className="w-5 h-5 text-green-500" />
            <h3 className="text-xl font-bold">employees table</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-purple-500/50">
                  {Object.keys(level.table[0]).map((key) => (
                    <th key={key} className="px-3 py-2 text-left font-semibold text-purple-400">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {level.table.map((row, idx) => (
                  <tr key={idx} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                    {Object.values(row).map((val, i) => (
                      <td key={i} className="px-3 py-3 text-gray-300">
                        {typeof val === 'number' && val > 1000 ? `$${val.toLocaleString()}` : val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Code Editor */}
      <div className="rounded-3xl bg-[#1e1e2e] border border-white/10 overflow-hidden mb-6">
        <div className="bg-[#2a2a3e] px-4 py-3 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="ml-auto text-gray-400 text-sm font-mono">SQL Editor</span>
        </div>
        <div className="p-6">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="Type your SQL query here..."
            className="w-full bg-transparent border-none outline-none text-lg font-mono text-gray-100 placeholder-gray-600"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setShowHint(!showHint)}
          className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 font-semibold flex items-center gap-2 transition-all hover:scale-105"
        >
          <Lightbulb className="w-4 h-4 text-yellow-500" />
          {showHint ? 'Hide Hint' : 'Show Hint'}
        </button>
        <button
          onClick={() => {
            setUserInput('');
            setFeedback(null);
          }}
          className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 font-semibold flex items-center gap-2 transition-all hover:scale-105"
        >
          <RefreshCw className="w-4 h-4" />
          Reset
        </button>
        <button
          onClick={handleSubmit}
          className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 font-semibold flex items-center gap-2 transform hover:scale-105 transition-all shadow-lg shadow-purple-500/50"
        >
          <Play className="w-4 h-4" />
          Run Query
        </button>
      </div>

      {/* Feedback */}
      {feedback && (
        <div className={`p-4 rounded-2xl flex items-center justify-center gap-3 animate-slide-down ${
          feedback.type === 'success'
            ? 'bg-green-500/20 border border-green-500/50'
            : 'bg-red-500/20 border border-red-500/50'
        }`}>
          {feedback.type === 'success' ? (
            <CheckCircle className="w-5 h-5 text-green-500" />
          ) : (
            <XCircle className="w-5 h-5 text-red-500" />
          )}
          <span className="font-semibold text-lg">{feedback.message}</span>
        </div>
      )}

      <style>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default SQLGame;
