import React, { useState, useEffect } from 'react';
import { CheckCircle, Lightbulb, RefreshCw, Book, Palette } from 'lucide-react';

interface CSSLevel {
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
    htmlStructure: string;
    targetStyle: {
      [key: string]: string;
    };
    elements: Array<{
      id: string;
      type: string;
      content: string;
      currentStyle?: {
        [key: string]: string;
      };
    }>;
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

const CSSGame: React.FC = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showConcept, setShowConcept] = useState(false);
  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null);
  console.log("execute state: ", executionResult)
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  const [previewStyle, setPreviewStyle] = useState<string>('');

  const levels: CSSLevel[] = [
    {
      id: 1,
      title: "Change Text Color",
      description: "Make the heading text red",
      hint: "Use the color property",
      solution: "h1 { color: red; }",
      concept: {
        title: "Color Property",
        content: "The color property sets the text color. You can use color names (red, blue), hex codes (#FF0000), or RGB values (rgb(255, 0, 0))."
      },
      visualData: {
        htmlStructure: "<h1>Hello World</h1>",
        targetStyle: {
          color: "red"
        },
        elements: [
          { id: "heading", type: "h1", content: "Hello World" }
        ]
      }
    },
    {
      id: 2,
      title: "Background Color",
      description: "Give the div a blue background",
      hint: "Use the background-color property",
      solution: "div { background-color: blue; }",
      concept: {
        title: "Background Color",
        content: "The background-color property sets the background color of an element. It accepts the same color values as the color property."
      },
      visualData: {
        htmlStructure: '<div class="box">Box</div>',
        targetStyle: {
          backgroundColor: "blue"
        },
        elements: [
          { id: "box", type: "div", content: "Box", currentStyle: { width: "200px", height: "100px", border: "1px solid #ccc" } }
        ]
      }
    },
    {
      id: 3,
      title: "Flexbox Center",
      description: "Center the item both horizontally and vertically",
      hint: "Use display: flex with justify-content and align-items",
      solution: ".container { display: flex; justify-content: center; align-items: center; }",
      concept: {
        title: "Flexbox Centering",
        content: "Flexbox is a powerful layout method. Use display: flex on the container, then justify-content: center (horizontal) and align-items: center (vertical) to center items."
      },
      visualData: {
        htmlStructure: '<div class="container"><div class="item">Center Me</div></div>',
        targetStyle: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        },
        elements: [
          { 
            id: "container", 
            type: "div", 
            content: "", 
            currentStyle: { width: "300px", height: "200px", border: "2px solid #333" }
          },
          {
            id: "item",
            type: "div",
            content: "Center Me",
            currentStyle: { width: "100px", height: "50px", backgroundColor: "#4CAF50", color: "white" }
          }
        ]
      }
    },
    {
      id: 4,
      title: "Box Shadow",
      description: "Add a shadow to the card",
      hint: "Use the box-shadow property",
      solution: ".card { box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }",
      concept: {
        title: "Box Shadow",
        content: "box-shadow adds shadow effects. Syntax: offset-x offset-y blur-radius spread-radius color. Example: 0 4px 6px rgba(0,0,0,0.1)"
      },
      visualData: {
        htmlStructure: '<div class="card">Card Content</div>',
        targetStyle: {
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
        },
        elements: [
          { 
            id: "card", 
            type: "div", 
            content: "Card Content", 
            currentStyle: { width: "250px", padding: "20px", backgroundColor: "white", borderRadius: "8px" }
          }
        ]
      }
    },
    {
      id: 5,
      title: "Hover Effect",
      description: "Make the button change color on hover",
      hint: "Use the :hover pseudo-class",
      solution: "button:hover { background-color: #2196F3; }",
      concept: {
        title: "Hover Pseudo-class",
        content: "The :hover pseudo-class applies styles when the user hovers over an element. Common for interactive elements like buttons and links."
      },
      visualData: {
        htmlStructure: '<button class="btn">Hover Me</button>',
        targetStyle: {
          backgroundColor: "#2196F3"
        },
        elements: [
          { 
            id: "button", 
            type: "button", 
            content: "Hover Me", 
            currentStyle: { 
              padding: "10px 20px", 
              backgroundColor: "#4CAF50", 
              color: "white", 
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }
          }
        ]
      }
    }
  ];

  const currentLevelData = levels[currentLevel - 1];

  // Load progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('cssGameProgress');
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setCompletedLevels(progress.completedLevels || []);
    }
  }, []);

  // Save progress
  const saveProgress = () => {
    localStorage.setItem('cssGameProgress', JSON.stringify({
      completedLevels
    }));
  };

  const executeCommand = (command: string) => {
    // Simple CSS validation
    const normalizedCommand = command.trim().toLowerCase();
    const normalizedSolution = currentLevelData.solution.toLowerCase();
    
    if (normalizedCommand === normalizedSolution) {
      setFeedback({ type: 'success', message: 'Perfect! Your CSS is correct!' });
      setExecutionResult({ success: true, data: 'Styles applied successfully' });
      setPreviewStyle(command);
      
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
          setPreviewStyle('');
        }
      }, 2000);
    } else {
      setFeedback({ type: 'error', message: 'Not quite right. Check your CSS syntax!' });
      setExecutionResult({ success: false, error: 'Invalid CSS syntax' });
    }
  };

  const renderVisualElement = () => {
    const visualData = currentLevelData.visualData;
    
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4 text-gray-800">HTML Preview</h3>
        
        <div className="bg-gray-50 p-4 rounded mb-4">
          <pre className="text-sm text-gray-700 overflow-x-auto">
            {visualData.htmlStructure}
          </pre>
        </div>
        
        <div className="border-2 border-gray-300 rounded p-8 bg-white" style={{ minHeight: '250px' }}>
          {visualData.elements.map((element) => {
            const styles = { ...element.currentStyle };
            
            // Apply user styles for preview (simplified)
            if (previewStyle) {
              Object.assign(styles, visualData.targetStyle);
            }
            
            if (element.type === 'h1') {
              return <h1 key={element.id} style={styles}>{element.content}</h1>;
            } else if (element.type === 'div') {
              return <div key={element.id} style={styles}>{element.content}</div>;
            } else if (element.type === 'button') {
              return <button key={element.id} style={styles}>{element.content}</button>;
            }
            return null;
          })}
        </div>
      </div>
    );
  };

  const renderTargetStyle = () => {
    const visualData = currentLevelData.visualData;
    
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Target Style</h3>
        
        <div className="bg-pink-50 p-4 rounded">
          <p className="text-gray-700 mb-2">Your element should have these styles:</p>
          <div className="bg-white p-3 rounded font-mono text-sm">
            {Object.entries(visualData.targetStyle).map(([prop, value]) => (
              <div key={prop} className="text-pink-600">
                {prop}: {value};
              </div>
            ))}
          </div>
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
            className="h-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-500"
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
        {/* HTML Preview */}
        <div>{renderVisualElement()}</div>
        
        {/* Target Style */}
        <div>{renderTargetStyle()}</div>
      </div>

      {/* CSS Input */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex gap-4 items-center">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && executeCommand(userInput)}
            placeholder="Type your CSS rule here..."
            className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-pink-500 focus:outline-none text-lg font-mono"
          />
          <button
            onClick={() => executeCommand(userInput)}
            className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors flex items-center gap-2 font-semibold"
          >
            <Palette className="w-5 h-5" />
            Apply CSS
          </button>
          <button
            onClick={() => {
              setUserInput('');
              setFeedback(null);
              setExecutionResult(null);
              setPreviewStyle('');
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
                  ? 'bg-pink-600 text-white' 
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

export default CSSGame;