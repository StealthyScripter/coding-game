import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Lightbulb, RefreshCw, Play, Book, Database, ArrowRight } from 'lucide-react';

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

interface QueryResultRow {
  id?: number;
  name?: string;
  department?: string;
  salary?: number;
  project_name?: string;
  employee_id?: number;
  [key: string]: unknown;
}

interface ExecutionResult {
  success: boolean;
  data?: QueryResultRow[];
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
    if (!command.trim()) {
      setFeedback({ type: 'error', message: 'Please enter a SQL query' });
      return;
    }
    
    const normalizedCommand = command.trim().toLowerCase();
    const normalizedSolution = currentLevelData.solution.toLowerCase();
    
    if (normalizedCommand === normalizedSolution) {
      // Simulate query execution
      const result = executeQuery(command);
      
      setFeedback({ type: 'success', message: 'Correct! Query executed successfully!' });
      setExecutionResult({ success: true, data: result });
      
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
      setExecutionResult({ 
        success: false, 
        error: 'Error: Syntax error or query does not match the expected solution' 
      });
    }
  };

  // Simple query executor
  const executeQuery = (_query: string): QueryResultRow[] => {
    const tables = currentLevelData.visualData.tables;
    console.log("SQL game line 190: ", _query)
    
    // Level 1: SELECT * FROM employees
    if (currentLevel === 1) {
      return tables.employees;
    }
    
    // Level 2: SELECT * FROM employees WHERE department = 'Engineering'
    if (currentLevel === 2) {
      return tables.employees.filter(emp => emp.department === 'Engineering');
    }
    
    // Level 3: SELECT e.name, p.project_name FROM employees e INNER JOIN projects p ON e.id = p.employee_id
    if (currentLevel === 3) {
      return tables.projects.map(project => {
        const employee = tables.employees.find(emp => emp.id === project.employee_id);
        return {
          name: employee?.name,
          project_name: project.project_name
        };
      });
    }
    
    return [];
  };

  const renderTables = () => {
    const visualData = currentLevelData.visualData;
    
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
          <Database className="w-5 h-5 text-blue-500" />
          Database Tables
        </h3>
        
        {Object.entries(visualData.tables).map(([tableName, rows]) => (
          <div key={tableName} className="mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-t-lg font-bold">
              {tableName}
            </div>
            <div className="bg-gray-50 rounded-b-lg overflow-x-auto">
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
                                aria-hidden="true"
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

  const renderQueryResult = () => {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
          <ArrowRight className="w-5 h-5 text-green-500" />
          Query Result
        </h3>
        
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono min-h-[200px] overflow-x-auto relative">
          {executionResult ? (
            executionResult.success ? (
              <div>
                <div className="flex items-center gap-2 mb-3 text-emerald-400">
                  <CheckCircle className="w-5 h-5" />
                  <span>Query executed successfully</span>
                </div>
                {executionResult.data && executionResult.data.length > 0 ? (
                  <div>
                    <div className="text-gray-400 mb-2">{executionResult.data.length} row(s) returned</div>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-700">
                          {Object.keys(executionResult.data[0]).map(col => (
                            <th key={col} className="px-3 py-2 text-left text-gray-300">
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {executionResult.data.map((row: QueryResultRow, idx: number) => (
                          <tr key={idx} className="border-b border-gray-800">
                            {Object.values(row).map((value: unknown, i: number) => (
                              <td key={i} className="px-3 py-2 text-gray-200">
                                {value?.toString() || ''}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-gray-400">0 rows returned</div>
                )}
              </div>
            ) : (
              <div className="text-red-400">
                <div className="flex items-center gap-2 mb-2">
                  <XCircle className="w-5 h-5" />
                  <span>Error executing query</span>
                </div>
                <div className="text-sm ml-7">{executionResult.error}</div>
              </div>
            )
          ) : (
            <div className="text-gray-600 absolute inset-0 flex items-center justify-center">
              Run a query to see results...
            </div>
          )}
        </div>
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
            aria-label={`Progress: ${Math.round((currentLevel / levels.length) * 100)}%`}
          />
        </div>
        <span className="text-gray-600 font-semibold">
          Level {currentLevel}/{levels.length}
        </span>
      </div>

      {/* Level Info */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Database className="w-6 h-6 text-blue-600" />
            {currentLevelData.title}
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => setShowConcept(!showConcept)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
              aria-expanded={showConcept}
              aria-controls="concept-panel"
            >
              <Book className="w-4 h-4" />
              Concept
            </button>
            <button
              onClick={() => setShowHint(!showHint)}
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors flex items-center gap-2"
              aria-expanded={showHint}
              aria-controls="hint-panel"
            >
              <Lightbulb className="w-4 h-4" />
              Hint
            </button>
          </div>
        </div>
        
        <p className="text-gray-700 text-lg mb-4">{currentLevelData.description}</p>
        
        {showHint && (
          <div 
            id="hint-panel"
            className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4 animate-fadeIn"
          >
            <p className="text-yellow-800">{currentLevelData.hint}</p>
          </div>
        )}
        
        {showConcept && (
          <div 
            id="concept-panel"
            className="bg-indigo-50 border-l-4 border-indigo-400 p-4 mb-4 animate-fadeIn"
          >
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
        <div>{renderQueryResult()}</div>
      </div>

      {/* Command Input */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <div className="absolute top-3 left-3 text-gray-400">
              <Database className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && executeCommand(userInput)}
              placeholder="Type your SQL query here..."
              className="w-full px-10 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-lg font-mono"
              aria-label="SQL query input"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => executeCommand(userInput)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-semibold"
              aria-label="Execute SQL query"
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
              aria-label="Reset query"
            >
              <RefreshCw className="w-5 h-5" />
              Reset
            </button>
          </div>
        </div>
        
        {feedback && (
          <div 
            className={`mt-4 p-4 rounded-lg flex items-center gap-2 ${
              feedback.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}
            role="alert"
          >
            {feedback.type === 'success' ? 
              <CheckCircle className="w-5 h-5" /> : 
              <XCircle className="w-5 h-5" />
            }
            {feedback.message}
          </div>
        )}
      </div>

      {/* Level Selector */}
      <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Level Selection</h3>
        <div className="flex flex-wrap gap-3">
          {levels.map((level) => (
            <button
              key={level.id}
              onClick={() => {
                setCurrentLevel(level.id);
                setUserInput('');
                setFeedback(null);
                setExecutionResult(null);
                setShowHint(false);
                setShowConcept(false);
              }}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                currentLevel === level.id 
                  ? 'bg-blue-600 text-white shadow transform scale-105' 
                  : completedLevels.includes(level.id)
                  ? 'bg-green-100 text-green-800 hover:bg-green-200'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              aria-label={`Select Level ${level.id}${completedLevels.includes(level.id) ? ' (completed)' : ''}`}
              aria-current={currentLevel === level.id ? 'true' : 'false'}
            >
              {completedLevels.includes(level.id) && (
                <CheckCircle className="inline w-4 h-4 mr-1" aria-hidden="true" />
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