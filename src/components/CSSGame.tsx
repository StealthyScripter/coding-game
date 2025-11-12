import React, { useState } from 'react';
import {
  Palette, Target, Lightbulb, BookOpen, Play,
  RefreshCw, CheckCircle, XCircle, ChevronLeft, Award
} from 'lucide-react';
import { cssLevels } from '../storage/css-storage';

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

  const level = cssLevels[currentLevel - 1];

  const getPreview = () => {
    switch (level.id) {
      case 1:
        return <h1 style={{ color: applyStyle ? 'purple' : 'white', fontSize: '1.875rem', fontWeight: 'bold' }}>Hello CodeQuest!</h1>;
      case 2:
        return (
          <div
            style={{
              background: applyStyle ? 'linear-gradient(to right, #3b82f6, #1e40af)' : '#374151',
              padding: '2rem',
              borderRadius: '1rem',
              textAlign: 'center',
              fontWeight: 'bold'
            }}
          >
            Styled Box
          </div>
        );
      case 3:
        return (
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
            <div style={{ background: 'linear-gradient(90deg, #7c3aed, #6366f1)', padding: '0.75rem 1.5rem', borderRadius: '0.75rem', fontWeight: 'bold' }}>
              Center Me!
            </div>
          </div>
        );
      case 4:
        return (
          <div
            style={{
              borderRadius: applyStyle ? '2rem' : '0',
              background: 'linear-gradient(135deg, #ec4899, #f43f5e)',
              padding: '2rem',
              fontWeight: 'bold',
              textAlign: 'center'
            }}
          >
            Card with Rounded Corners
          </div>
        );
      case 5:
        return (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              style={{
                boxShadow: applyStyle ? '0 10px 30px rgba(147, 51, 234, 0.5)' : 'none',
                background: 'linear-gradient(90deg, #7c3aed, #6366f1)',
                padding: '1rem 2rem',
                borderRadius: '0.75rem',
                fontWeight: 'bold',
                fontSize: '1.125rem',
                border: 'none',
                color: 'white'
              }}
            >
              Click Me!
            </button>
          </div>
        );
      default:
        return <div>Preview for level {level.id}</div>;
    }
  };

  const handleSubmit = () => {
    const normalized = userInput.trim().toLowerCase().replace(/\s+/g, ' ');
    const solutionNormalized = level.solution.toLowerCase().replace(/\s+/g, ' ');

    if (normalized === solutionNormalized) {
      setFeedback({ type: 'success', message: `🎉 Perfect! +${level.xpReward} XP` });
      setApplyStyle(true);

      if (!completedLevels.includes(currentLevel)) {
        setCompletedLevels([...completedLevels, currentLevel]);
      }

      setTimeout(() => {
        onComplete(level.xpReward);
        if (currentLevel < cssLevels.length) {
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
        style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', fontSize: '1rem' }}
      >
        <ChevronLeft style={{ width: '1rem', height: '1rem' }} />
        Back to Home
      </button>

      {/* Level Progress */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Palette style={{ width: '2rem', height: '2rem', color: '#ec4899' }} />
            CSS Level {currentLevel}: {level.title}
          </h2>
          <p style={{ color: '#9ca3af', marginTop: '0.5rem' }}>Create beautiful designs with CSS!</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {cssLevels.map((l) => (
            <div
              key={l.id}
              style={{
                width: '0.75rem',
                height: '0.75rem',
                borderRadius: '50%',
                transition: 'all 0.3s',
                backgroundColor: completedLevels.includes(l.id) ? '#22c55e' :
                  l.id === currentLevel ? '#ec4899' : 'rgba(255, 255, 255, 0.2)',
                transform: l.id === currentLevel ? 'scale(1.25)' : 'scale(1)'
              }}
            />
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
        {/* Task Panel */}
        <div style={{ borderRadius: '1.5rem', background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Target style={{ width: '1.25rem', height: '1.25rem', color: '#ec4899' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Your Mission</h3>
          </div>
          <p style={{ color: '#d1d5db', fontSize: '1.125rem', marginBottom: '1.5rem' }}>{level.task}</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button
              onClick={() => setShowConcept(!showConcept)}
              style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >
              <div style={{ borderRadius: '1rem', background: 'rgba(6, 182, 212, 0.1)', border: '1px solid rgba(6, 182, 212, 0.3)', padding: '1rem', transition: 'all 0.3s' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <BookOpen style={{ width: '1rem', height: '1rem', color: '#06b6d4' }} />
                  <span style={{ fontWeight: 600, color: '#06b6d4' }}>Key Concept</span>
                </div>
                {showConcept && (
                  <p style={{ fontSize: '0.875rem', color: '#d1d5db', marginTop: '0.5rem' }}>{level.concept}</p>
                )}
              </div>
            </button>

            {showHint && (
              <div style={{ borderRadius: '1rem', background: 'rgba(234, 179, 8, 0.1)', border: '1px solid rgba(234, 179, 8, 0.3)', padding: '1rem', animation: 'slideDown 0.3s ease-out' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <Lightbulb style={{ width: '1rem', height: '1rem', color: '#eab308' }} />
                  <span style={{ fontWeight: 600, color: '#eab308' }}>Hint</span>
                </div>
                <p style={{ fontSize: '0.875rem', color: '#d1d5db', fontFamily: 'monospace' }}>{level.hint}</p>
              </div>
            )}
          </div>

          {completedLevels.length > 0 && (
            <div style={{ marginTop: '1.5rem', borderRadius: '1rem', background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)', padding: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Award style={{ width: '1.25rem', height: '1.25rem', color: '#22c55e' }} />
                <span style={{ fontWeight: 600, color: '#22c55e' }}>
                  {completedLevels.length} Level{completedLevels.length > 1 ? 's' : ''} Completed!
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Live Preview */}
        <div style={{ borderRadius: '1.5rem', background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Palette style={{ width: '1.25rem', height: '1.25rem', color: '#ec4899' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Live Preview</h3>
          </div>
          <div style={{ background: '#0f0f23', borderRadius: '1rem', padding: '2rem', minHeight: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {getPreview()}
          </div>
          <p style={{ fontSize: '0.875rem', color: '#9ca3af', marginTop: '1rem', textAlign: 'center' }}>
            {applyStyle ? '✓ Style applied successfully!' : 'Write CSS to see changes'}
          </p>
        </div>
      </div>

      {/* Code Editor */}
      <div style={{ borderRadius: '1.5rem', background: '#1e1e2e', border: '1px solid rgba(255, 255, 255, 0.1)', overflow: 'hidden', marginBottom: '1.5rem' }}>
        <div style={{ background: '#2a2a3e', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '0.75rem', height: '0.75rem', borderRadius: '50%', backgroundColor: '#ef4444' }} />
          <div style={{ width: '0.75rem', height: '0.75rem', borderRadius: '50%', backgroundColor: '#eab308' }} />
          <div style={{ width: '0.75rem', height: '0.75rem', borderRadius: '50%', backgroundColor: '#22c55e' }} />
          <span style={{ marginLeft: 'auto', fontSize: '0.875rem', color: '#9ca3af', fontFamily: 'monospace' }}>style.css</span>
        </div>
        <div style={{ padding: '1.5rem' }}>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="selector { property: value; }"
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontSize: '1.125rem',
              fontFamily: 'monospace',
              color: '#fff'
            }}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <button
          onClick={() => setShowHint(!showHint)}
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: '0.75rem',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer',
            color: '#fff',
            transition: 'all 0.3s'
          }}
        >
          <Lightbulb style={{ width: '1rem', height: '1rem', color: '#eab308' }} />
          {showHint ? 'Hide Hint' : 'Show Hint'}
        </button>
        <button
          onClick={() => {
            setUserInput('');
            setFeedback(null);
            setApplyStyle(false);
          }}
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: '0.75rem',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer',
            color: '#fff',
            transition: 'all 0.3s'
          }}
        >
          <RefreshCw style={{ width: '1rem', height: '1rem' }} />
          Reset
        </button>
        <button
          onClick={handleSubmit}
          style={{
            padding: '0.75rem 2rem',
            borderRadius: '0.75rem',
            background: 'linear-gradient(90deg, #ec4899, #f43f5e)',
            border: 'none',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer',
            color: '#fff',
            boxShadow: '0 10px 30px rgba(236, 72, 153, 0.5)',
            transition: 'all 0.3s'
          }}
        >
          <Play style={{ width: '1rem', height: '1rem' }} />
          Apply Style
        </button>
      </div>

      {/* Feedback */}
      {feedback && (
        <div style={{
          padding: '1rem',
          borderRadius: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.75rem',
          animation: 'slideDown 0.3s ease-out',
          background: feedback.type === 'success' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
          border: feedback.type === 'success' ? '1px solid rgba(34, 197, 94, 0.5)' : '1px solid rgba(239, 68, 68, 0.5)'
        }}>
          {feedback.type === 'success' ? (
            <CheckCircle style={{ width: '1.25rem', height: '1.25rem', color: '#22c55e' }} />
          ) : (
            <XCircle style={{ width: '1.25rem', height: '1.25rem', color: '#ef4444' }} />
          )}
          <span style={{ fontWeight: 600, fontSize: '1.125rem' }}>{feedback.message}</span>
        </div>
      )}

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default CSSGame;
