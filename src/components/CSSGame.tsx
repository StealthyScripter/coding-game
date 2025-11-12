// FILE: src/components/CSSGame.tsx
import React, { useState } from 'react';
import {
  Palette, Target, Lightbulb, BookOpen, Play,
  RefreshCw, CheckCircle, XCircle, ChevronLeft, Award
} from 'lucide-react';

interface Level {
  id: number;
  title: string;
  task: string;
  hint: string;
  concept: string;
  solution: string;
  preview: React.ReactNode;
}

interface CSSGameProps {
  onBack: () => void;
  onComplete: (xp: number) => void;
}

const CSSGame: React.FC<CSSGameProps> = ({ onBack, onComplete }) => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showConcept, setShowConcept] = useState(false);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  const [applyStyle, setApplyStyle] = useState(false);

  const levels: Level[] = [
    {
      id: 1,
      title: "Change Text Color",
      task: "Make the heading text purple",
      hint: "Use 'color: purple;' inside the h1 selector",
      concept: "The color property changes text color. Use color names, hex codes (#9333EA), or rgb values.",
      solution: "h1 { color: purple; }",
      preview: <h1 style={{ color: applyStyle ? 'purple' : 'white' }} className="text-3xl font-bold">Hello CodeQuest!</h1>
    },
    {
      id: 2,
      title: "Add Background Color",
      task: "Give the box a gradient blue background",
      hint: "Use 'background: linear-gradient(to right, #3b82f6, #1e40af);'",
      concept: "Backgrounds can be solid colors or gradients. Gradients blend multiple colors smoothly.",
      solution: ".box { background: linear-gradient(to right, #3b82f6, #1e40af); }",
      preview: (
        <div
          style={{
            background: applyStyle ? 'linear-gradient(to right, #3b82f6, #1e40af)' : '#374151',
            padding: '2rem',
            borderRadius: '1rem'
          }}
          className="text-center font-bold"
        >
          Styled Box
        </div>
      )
    },
    {
      id: 3,
      title: "Center with Flexbox",
      task: "Center the item both horizontally and vertically",
      hint: "Use 'display: flex; justify-content: center; align-items: center;'",
      concept: "Flexbox is powerful for layouts. justify-content aligns horizontally, align-items vertically.",
      solution: ".container { display: flex; justify-content: center; align-items: center; }",
      preview: (
        <div
          style={{
            display: applyStyle ? 'flex' : 'block',
            justifyContent: applyStyle ? 'center' : 'flex-start',
            alignItems: applyStyle ? 'center' : 'flex-start',
            height: '200px',
            border: '2px solid #6366f1',
            borderRadius: '1rem'
          }}
        >
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 rounded-xl font-bold">
            Center Me!
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: "Add Border Radius",
      task: "Make the card have rounded corners (2rem)",
      hint: "Use 'border-radius: 2rem;'",
      concept: "border-radius rounds corners. Use px, rem, or % values. 50% creates a circle.",
      solution: ".card { border-radius: 2rem; }",
      preview: (
        <div
          style={{
            borderRadius: applyStyle ? '2rem' : '0',
            background: 'linear-gradient(135deg, #ec4899, #f43f5e)',
            padding: '2rem'
          }}
          className="font-bold text-center"
        >
          Card with Rounded Corners
        </div>
      )
    },
    {
      id: 5,
      title: "Add Box Shadow",
      task: "Add a purple shadow to the button",
      hint: "Use 'box-shadow: 0 10px 30px rgba(147, 51, 234, 0.5);'",
      concept: "box-shadow adds depth. Format: x-offset y-offset blur spread color.",
      solution: "button { box-shadow: 0 10px 30px rgba(147, 51, 234, 0.5); }",
      preview: (
        <div className="flex justify-center">
          <button
            style={{
              boxShadow: applyStyle ? '0 10px 30px rgba(147, 51, 234, 0.5)' : 'none'
            }}
            className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 rounded-xl font-bold text-lg"
          >
            Click Me!
          </button>
        </div>
      )
    }
  ];

  const level = levels[currentLevel - 1];

  const handleSubmit = () => {
    const normalized = userInput.trim().toLowerCase().replace(/\s+/g, ' ');
    const solutionNormalized = level.solution.toLowerCase().replace(/\s+/g, ' ');

    if (normalized === solutionNormalized) {
      setFeedback({ type: 'success', message: '🎉 Perfect! +100 XP' });
      setApplyStyle(true);

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
          setApplyStyle(false);
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
            <Palette className="w-8 h-8 text-pink-500" />
            CSS Level {currentLevel}: {level.title}
          </h2>
          <p className="text-gray-400 mt-2">Create beautiful designs with CSS!</p>
        </div>
        <div className="flex gap-2">
          {levels.map((l) => (
            <div
              key={l.id}
              className={`w-3 h-3 rounded-full transition-all ${
                completedLevels.includes(l.id) ? 'bg-green-500' :
                l.id === currentLevel ? 'bg-gradient-to-r from-pink-500 to-rose-500 animate-pulse scale-125' :
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
            <Target className="w-5 h-5 text-pink-500" />
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
                <p className="text-sm text-gray-300 font-mono">{level.hint}</p>
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

        {/* Live Preview */}
        <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Palette className="w-5 h-5 text-pink-500" />
            <h3 className="text-xl font-bold">Live Preview</h3>
          </div>
          <div className="bg-gray-900 rounded-2xl p-8 min-h-[250px] flex items-center justify-center">
            {level.preview}
          </div>
          <p className="text-sm text-gray-400 mt-4 text-center">
            {applyStyle ? '✓ Style applied successfully!' : 'Write CSS to see changes'}
          </p>
        </div>
      </div>

      {/* Code Editor */}
      <div className="rounded-3xl bg-[#1e1e2e] border border-white/10 overflow-hidden mb-6">
        <div className="bg-[#2a2a3e] px-4 py-3 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="ml-auto text-gray-400 text-sm font-mono">style.css</span>
        </div>
        <div className="p-6">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="selector { property: value; }"
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
            setApplyStyle(false);
          }}
          className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 font-semibold flex items-center gap-2 transition-all hover:scale-105"
        >
          <RefreshCw className="w-4 h-4" />
          Reset
        </button>
        <button
          onClick={handleSubmit}
          className="px-8 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 font-semibold flex items-center gap-2 transform hover:scale-105 transition-all shadow-lg shadow-pink-500/50"
        >
          <Play className="w-4 h-4" />
          Apply Style
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

export default CSSGame;
