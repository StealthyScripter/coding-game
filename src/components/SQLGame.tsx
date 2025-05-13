import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Lightbulb, RefreshCw, Play, Book } from 'lucide-react';

interface SQLLevel {
  id: number;
  title: string;
  description: string;
  hint: string;
  solution: string;
  concept: {
    title: string;
    content: string;
  };
  visualData: {
    tables: {
      [key: string]: Array<{
        id: number;
        name?: string;
        department?: string;
        salary?: number;
        color?: string;
        project_name?: string;
        employee_id?: number;
      }>;
    };
  };
}

interface Feedback {
  type: 'success' | 'error';
  message: string;
}

interface ExecutionResult {
  success: boolean;
  data?: string;
  error?: string;
}

const SQLGame: React.FC = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showConcept, setShowConcept] = useState(false);
  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);

  const levels: SQLLevel[] = [
    {
      id: 1,
      title: "SELECT All Employees",
      description: "Retrieve all employees from the company database",
      hint: "Use SELECT * FROM to get all columns",
      solution: "SELECT * FROM employees",
      concept: {
        title: "SELECT Statement Basics",
        content: "The SELECT statement retrieves data from a database. Use SELECT * to get all columns, or specify column names. Example: SELECT name, age FROM employees"
      },
      visualData: {
        tables: {
          employees: [
            { id: 1, name: "Alice", department: "Engineering", salary: 75000, color: "#FF6B6B" },
            { id: 2, name: "Bob", department: "Sales", salary: 65000, color: "#4ECDC4" },
            { id: 3, name: "Charlie", department: "Marketing", salary: 70000, color: "#45B7D1" }
          ]
        }
      }
    },
    {
      id: 2,
      title: "Filter Engineers",
      description: "Find all employees in the Engineering department",
      hint: "Use WHERE clause to filter results",
      solution: "SELECT * FROM employees WHERE department = 'Engineering'",
      concept: {
        title: "WHERE Clause",
        content: "WHERE filters rows based on conditions. Use = for exact matches, > < for comparisons, and LIKE for patterns. Example: WHERE salary > 50000"
      },
      visualData: {
        tables: {
          employees: [
            { id: 1, name: "Alice", department: "Engineering", salary: 75000, color: "#FF6B6B" },
            { id: 2, name: "Bob", department: "Sales", salary: 65000, color: "#4ECDC4" },
            { id: 3, name: "Charlie", department: "Marketing", salary: 70000, color: "#45B7D1" },
            { id: 4, name: "David", department: "Engineering", salary: 80000, color: "#96CEB4" }
          ]
        }
      }
    },
    {
      id: 3,
      title: "Join Tables",
      description: "Show employees with their project names",
      hint: "Use INNER JOIN to connect employees and projects tables",
      solution: "SELECT e.name, p.project_name FROM employees e INNER JOIN projects p ON e.id = p.employee_id",
      concept: {
        title: "JOIN Operations",
        content: "JOINs combine rows from multiple tables. INNER JOIN returns only matching rows, LEFT JOIN includes all from left table, RIGHT JOIN from right table."
      },
      visualData: {
        tables: {
          employees: [
            { id: 1, name: "Alice", department: "Engineering", color: "#FF6B6B" },
            { id: 2, name: "Bob", department: "Sales", color: "#4ECDC4" }
          ],
          projects: [
            { id: 1, project_name: "Web App", employee_id: 1, color: "#DDA0DD" },
            { id: 2, project_name: "Mobile App", employee_id: 1, color: "#98FB98" },
            { id: 3, project_name: "CRM System", employee_id: 2, color: "#F0E68C" }
          ]
        }
      }
    }
  ];

  const currentLevelData = levels[currentLevel - 1];

  // Load progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('sqlGameProgress');
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setCompletedLevels(progress.completedLevels || []);
    }
  }, []);

  // Save progress
  const saveProgress = () => {
    localStorage.setItem('sqlGameProgress', JSON.stringify({
      completedLevels
    }));
  };

  const executeCommand = (command: string) => {
    const normalizedCommand = command.trim().toLowerCase();
    const normalizedSolution = currentLevelData.solution.toLowerCase();
    
    if (normalizedCommand === normalizedSolution) {
      setFeedback({ type: 'success', message: 'Correct! Great job!' });
      setExecutionResult({ success: true, data: 'Command executed successfully' });
      
      // Mark level as completed
      if (!completedLevels.includes(currentLevel)) {
        const newCompletedLevels = [...completedLevels, currentLevel];
        setCompletedLevels(newCompletedLevels);
        saveProgress();
      }
      
      // Auto advance after 2 seconds
      setTimeout(() => {
        if (currentLevel < levels.length) {
          setCurrentLevel(currentLevel + 1);
          setUserInput('');
          setFeedback(null);
          setExecutionResult(null);
          setShowHint(false);
        }
      }, 2000);
    } else {
      setFeedback({ type: 'error', message: 'Not quite right. Try again!' });
      setExecutionResult({ success: false, error: 'Invalid command syntax' });
    }
  };

  const renderTables = () => {
    const visualData = currentLevelData.visualData;
    
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Database Tables</h3>
        
        {Object.entries(visualData.tables).map(([tableName, rows]) => (
          <div key={tableName} className="mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-t-lg font-bold">
              {tableName}
            </div>
            <div className="bg-gray-50 rounded-b-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-200">
                    {Object.keys(rows[0]).filter(key => key !== 'color').map(col => (
                      <th key={col} className="px-4 py-2 text-left font-semibold text-gray-700">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, idx) => (
                    <tr key={idx} className="border-b hover:bg-gray-100 transition-colors">
                      {Object.entries(row).filter(([key]) => key !== 'color').map(([key, value]) => (
                        <td key={key} className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            {key === 'name' && row.color && (
                              <div 
                                className="w-3 h-3 rounded-full" 
                                style={{ backgroundColor: row.color }}
                              />
                            )}
                            <span className="text-gray-700">{value}</span>
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center gap-4 mb-6">
        <span className="text-gray-600 font-semibold">Progress:</span>
        <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
            style={{ width: `${(currentLevel / levels.length) * 100}%` }}
          />
        </div>
        <span className="text-gray-600 font-semibold">
          Level {currentLevel}/{levels.length}
        </span>
      </div>

      {/* Level Info */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {currentLevelData.title}
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => setShowConcept(!showConcept)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
            >
              <Book className="w-4 h-4" />
              Concept
            </button>
            <button
              onClick={() => setShowHint(!showHint)}
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors flex items-center gap-2"
            >
              <Lightbulb className="w-4 h-4" />
              Hint
            </button>
          </div>
        </div>
        
        <p className="text-gray-700 text-lg mb-4">{currentLevelData.description}</p>
        
        {showHint && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
            <p className="text-yellow-800">{currentLevelData.hint}</p>
          </div>
        )}
        
        {showConcept && (
          <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 mb-4">
            <h3 className="font-bold text-indigo-800 mb-2">{currentLevelData.concept.title}</h3>
            <p className="text-indigo-700">{currentLevelData.concept.content}</p>
          </div>
        )}
      </div>

      {/* Visual Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Database Tables */}
        <div>{renderTables()}</div>
        
        {/* Result Area */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Query Result</h3>
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono min-h-[200px]">
            {executionResult ? (
              <div>
                {executionResult.success ? (
                  <div>
                    <CheckCircle className="inline w-5 h-5 mr-2" />
                    {executionResult.data}
                  </div>
                ) : (
                  <div className="text-red-400">
                    <XCircle className="inline w-5 h-5 mr-2" />
                    {executionResult.error}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-gray-600">Run a query to see results...</div>
            )}
          </div>
        </div>
      </div>

      {/* Command Input */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex gap-4 items-center">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && executeCommand(userInput)}
            placeholder="Type your SQL query here..."
            className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-lg font-mono"
          />
          <button
            onClick={() => executeCommand(userInput)}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 font-semibold"
          >
            <Play className="w-5 h-5" />
            Execute
          </button>
          <button
            onClick={() => {
              setUserInput('');
              setFeedback(null);
              setExecutionResult(null);
            }}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2 font-semibold"
          >
            <RefreshCw className="w-5 h-5" />
            Reset
          </button>
        </div>
        
        {feedback && (
          <div className={`mt-4 p-4 rounded-lg ${
            feedback.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {feedback.message}
          </div>
        )}
      </div>

      {/* Level Selector */}
      <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Level Selection</h3>
        <div className="flex gap-3 flex-wrap">
          {levels.map((level) => (
            <button
              key={level.id}
              onClick={() => setCurrentLevel(level.id)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                currentLevel === level.id 
                  ? 'bg-blue-600 text-white' 
                  : completedLevels.includes(level.id)
                  ? 'bg-green-100 text-green-800 hover:bg-green-200'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {completedLevels.includes(level.id) && (
                <CheckCircle className="inline w-4 h-4 mr-1" />
              )}
              Level {level.id}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SQLGame;