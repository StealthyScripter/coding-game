import { useState } from 'react';
import {
  Trophy, Flame, Star, Zap, Clock, Target,
  Lightbulb, BookOpen, Play, RefreshCw, CheckCircle, XCircle,
  ChevronLeft, Database, Terminal, Palette, Package
} from 'lucide-react';

type Technology = 'sql' | 'linux' | 'css' | 'docker' | 'home';

const CodeQuest = () => {
  const [currentView, setCurrentView] = useState<Technology>('home');
  const [currentLevel, setCurrentLevel] = useState(1);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);

  const sqlLevels = [
    {
      id: 1,
      title: "Select All Employees",
      task: "Retrieve all columns from the employees table",
      hint: "Use SELECT * to get all columns",
      concept: "SELECT * retrieves all columns from a table",
      solution: "SELECT * FROM employees",
      table: [
        { id: 1, name: "Alice", department: "Engineering", salary: 75000 },
        { id: 2, name: "Bob", department: "Sales", salary: 65000 },
        { id: 3, name: "Charlie", department: "Engineering", salary: 80000 }
      ]
    },
    {
      id: 2,
      title: "Filter by Department",
      task: "Get all employees in the Engineering department",
      hint: "Use WHERE to filter rows",
      concept: "WHERE clause filters rows based on conditions",
      solution: "SELECT * FROM employees WHERE department = 'Engineering'",
      table: [
        { id: 1, name: "Alice", department: "Engineering", salary: 75000 },
        { id: 2, name: "Bob", department: "Sales", salary: 65000 },
        { id: 3, name: "Charlie", department: "Engineering", salary: 80000 }
      ]
    },
    {
      id: 3,
      title: "Filter by Salary",
      task: "Retrieve all employees from the Engineering department with a salary greater than $70,000",
      hint: "Use the WHERE clause with multiple conditions",
      concept: "Combine conditions using AND/OR operators for complex filtering",
      solution: "SELECT * FROM employees WHERE department = 'Engineering' AND salary > 70000",
      table: [
        { id: 1, name: "Alice", department: "Engineering", salary: 75000 },
        { id: 2, name: "Bob", department: "Sales", salary: 65000 },
        { id: 3, name: "Charlie", department: "Engineering", salary: 80000 }
      ]
    }
  ];

  const level = sqlLevels[currentLevel - 1];

  const handleSubmit = () => {
    const normalized = userInput.trim().toLowerCase().replace(/\s+/g, ' ');
    const solutionNormalized = level.solution.toLowerCase().replace(/\s+/g, ' ');

    if (normalized === solutionNormalized) {
      setFeedback({ type: 'success', message: '🎉 Perfect! +100 XP' });
      if (!completedLevels.includes(currentLevel)) {
        setCompletedLevels([...completedLevels, currentLevel]);
      }
      setTimeout(() => {
        if (currentLevel < sqlLevels.length) {
          setCurrentLevel(currentLevel + 1);
          setUserInput('');
          setFeedback(null);
          setShowHint(false);
        }
      }, 2000);
    } else {
      setFeedback({ type: 'error', message: '❌ Not quite right. Try again!' });
    }
  };

  const styles = {
    bgPrimary: { backgroundColor: '#1a1a2e' },
    bgCard: { background: 'linear-gradient(135deg, #2d2d52 0%, #1f1f3a 100%)' },
    bgCardDark: { backgroundColor: '#1a1a2e' },
    bgEditor: { backgroundColor: '#16213e' },
    borderLight: { border: '1px solid rgba(255, 255, 255, 0.1)' },
    borderPurple: { border: '1px solid rgba(167, 139, 250, 0.3)' },
    gradientPurple: { background: 'linear-gradient(90deg, #a78bfa 0%, #7c3aed 50%, #6366f1 100%)' },
    gradientXP: { background: 'linear-gradient(90deg, #06b6d4 0%, #a855f7 50%, #ec4899 100%)' },
    textGradient: { background: 'linear-gradient(90deg, #a78bfa 0%, #c084fc 50%, #e879f9 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' },
  };

  const TechPage = ({ tech }: { tech: Exclude<Technology, 'home' | 'sql'> }) => {
    const meta = {
      linux: {
        title: 'Linux Command Line',
        icon: <Terminal style={{ width: 24, height: 24, color: '#10b981' }} />,
        blurb: 'Navigate the terminal, manage files, and master permissions.',
        bullets: ['Navigation basics', 'File operations', 'Permissions & ownership', 'Pipes & redirection', 'Shell scripting (intro)']
      },
      css: {
        title: 'CSS Wizardry',
        icon: <Palette style={{ width: 24, height: 24, color: '#f472b6' }} />,
        blurb: 'Modern layouts and animations with Flexbox and Grid.',
        bullets: ['Selectors & specificity', 'Flexbox essentials', 'CSS Grid patterns', 'Transitions & keyframes', 'Responsive design']
      },
      docker: {
        title: 'Docker Containers',
        icon: <Package style={{ width: 24, height: 24, color: '#06b6d4' }} />,
        blurb: 'Build, ship, and run portable apps with Docker.',
        bullets: ['Images vs containers', 'Dockerfiles', 'Volumes & networks', 'Compose basics', 'Best practices']
      }
    }[tech];

    return (
      <>
        <button
          onClick={() => setCurrentView('home')}
          style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', fontSize: '1rem' }}
        >
          <ChevronLeft style={{ width: '16px', height: '16px' }} />
          Back to Home
        </button>

        <div style={{ borderRadius: '24px', ...styles.bgCard, ...styles.borderLight, padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            {meta.icon}
            <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold' }}>{meta.title}</h2>
          </div>
          <p style={{ color: '#9ca3af', fontSize: '1.125rem', marginBottom: '1.5rem' }}>{meta.blurb}</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            {meta.bullets.map((b, i) => (
              <div key={i} style={{ borderRadius: '16px', ...styles.bgCardDark, ...styles.borderLight, padding: '1rem' }}>
                <div style={{ fontWeight: 600, color: '#a78bfa', marginBottom: '0.25rem' }}>Module {i + 1}</div>
                <div style={{ color: '#d1d5db' }}>{b}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={() => setCurrentView('home')}
              style={{ padding: '0.75rem 1.5rem', borderRadius: '12px', ...styles.bgCardDark, ...styles.borderLight, fontWeight: 600, color: '#fff', cursor: 'pointer' }}
            >
              Back
            </button>
            <button
              onClick={() => setCurrentView('sql')}
              style={{ padding: '0.75rem 1.5rem', borderRadius: '12px', ...styles.gradientPurple, border: 'none', fontWeight: 600, color: '#fff', cursor: 'pointer' }}
            >
              Try a SQL Challenge →
            </button>
          </div>
        </div>
      </>
    );
  };

  return (
    <div style={{ minHeight: '100vh', ...styles.bgPrimary, color: '#fff' }}>
      <style>
        {`
          .sql-input::placeholder {
            color: #6b7280;
            opacity: 1;
          }
          .hover-zoom {
            transition: transform 0.2s;
          }
          .hover-zoom:hover {
            transform: scale(1.02);
          }
        `}
      </style>
      {/* Navigation */}
      <nav style={{ ...styles.borderLight, borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '1rem 1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button
              onClick={() => setCurrentView('home')}
              style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <div style={{ width: '48px', height: '48px', borderRadius: '16px', ...styles.gradientPurple, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                📱
              </div>
              <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#a78bfa' }}>CodeQuest</span>
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '9999px', ...styles.bgCardDark, ...styles.borderLight }}>
                <Flame style={{ width: '20px', height: '20px', color: '#f97316' }} />
                <span style={{ fontWeight: 600 }}>7</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '9999px', ...styles.bgCardDark, ...styles.borderLight }}>
                <Star style={{ width: '20px', height: '20px', color: '#eab308' }} />
                <span>Level 12</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 1rem', borderRadius: '9999px', ...styles.bgCardDark, ...styles.borderLight }}>
                <div style={{ width: '128px', height: '8px', backgroundColor: '#16213e', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: '65%', ...styles.gradientXP }} />
                </div>
                <span style={{ fontSize: '0.875rem' }}>2,450 XP</span>
              </div>

              <div style={{ width: '40px', height: '40px', borderRadius: '50%', ...styles.gradientPurple, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                B
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        {currentView === 'home' ? (
          <>
            {/* Hero */}
            <div style={{ marginBottom: '3rem' }}>
              <div style={{ textAlign: 'center', padding: '3rem 0 2rem', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '4.5rem', fontWeight: 900, marginBottom: '1rem', ...styles.textGradient }}>
                  Master Code Through Play
                </h1>
                <p style={{ fontSize: '1.25rem', color: '#9ca3af', marginBottom: '2rem' }}>
                  Interactive challenges, real-time feedback, and gamified learning paths
                </p>
              </div>

              {/* Stats Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                {[
                  { icon: '🎯', label: 'Challenges Completed', value: '24', color: '#a78bfa' },
                  { icon: '⚡', label: 'Current Streak', value: '7 days', color: '#fbbf24' },
                  { icon: '🏆', label: 'Total XP', value: '2,450', color: '#22c55e' },
                  { icon: '📚', label: 'Skills Mastered', value: '3', color: '#3b82f6' }
                ].map((stat, idx) => (
                  <div key={idx} style={{ borderRadius: '24px', ...styles.bgCard, ...styles.borderLight, padding: '1.5rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: stat.color, marginBottom: '0.25rem' }}>
                      {stat.value}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#9ca3af' }}>{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                {[
                  { icon: '🎓', title: 'Continue Learning', desc: 'Pick up where you left off', action: 'SQL Level 4' },
                  { icon: '🎯', title: 'Practice Mode', desc: 'Sharpen your skills', action: 'Random Challenge' },
                  { icon: '🏅', title: 'Achievements', desc: 'View your progress', action: '8 Unlocked' }
                ].map((action, idx) => (
                  <div key={idx}
                  className="hover-zoom"
                    style={{
                      borderRadius: '20px',
                      ...styles.bgCard,
                      ...styles.borderLight,
                      padding: '1.5rem',
                      cursor: 'pointer'
                    }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{action.icon}</div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{action.title}</h3>
                    <p style={{ fontSize: '0.875rem', color: '#9ca3af', marginBottom: '1rem' }}>{action.desc}</p>
                    <div style={{ fontSize: '0.875rem', color: '#a78bfa', fontWeight: 600 }}>{action.action} →</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Daily Challenge */}
            <div style={{ marginBottom: '3rem', borderRadius: '24px', ...styles.bgCard, ...styles.borderPurple, padding: '2rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, right: 0, fontSize: '200px', opacity: 0.05 }}>⚡</div>
              <div style={{ position: 'relative', zIndex: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Zap style={{ width: '28px', height: '28px', color: '#fbbf24' }} />
                    <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold' }}>Daily Challenge: SQL Join Mastery</h2>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '9999px', ...styles.bgCardDark, ...styles.borderLight }}>
                    <Clock style={{ width: '16px', height: '16px', color: '#ef4444' }} />
                    <span>12:34:56</span>
                  </div>
                </div>
                <p style={{ color: '#9ca3af', fontSize: '1.125rem', marginBottom: '1.5rem' }}>
                  Complete today's challenge to maintain your streak and earn 2x XP bonus!
                </p>
                <button
                  onClick={() => setCurrentView('sql')}
                  style={{ padding: '0.75rem 2rem', borderRadius: '12px', ...styles.gradientPurple, border: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: '#fff' }}
                >
                  Start Challenge →
                </button>
              </div>
            </div>

            {/* Learning Paths */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
              {[
                { id: 'sql', icon: '🗄️', title: 'SQL Mastery', desc: 'Master database queries from basic SELECT to complex JOINs', gradient: 'linear-gradient(90deg, #7c3aed, #4f46e5)', progress: 45, badges: ['SELECT', 'WHERE', 'JOIN'] },
                { id: 'linux', icon: '💻', title: 'Linux Command Line', desc: 'Navigate the terminal like a pro', gradient: 'linear-gradient(90deg, #059669, #14b8a6)', progress: 30, badges: ['Navigation', 'File Ops', 'Permissions'] },
                { id: 'css', icon: '🎨', title: 'CSS Wizardry', desc: 'Create stunning designs with modern CSS', gradient: 'linear-gradient(90deg, #db2777, #f43f5e)', progress: 60, badges: ['Flexbox', 'Grid', 'Animations'] },
                { id: 'docker', icon: '🐳', title: 'Docker Containers', desc: 'Build, ship, and run applications', gradient: 'linear-gradient(90deg, #0891b2, #3b82f6)', progress: 25, badges: ['Images', 'Containers', 'Networks'] }
              ].map((path) => (
                <div
                  key={path.id}
                  onClick={() => setCurrentView(path.id as Technology)}
                  style={{ borderRadius: '24px', ...styles.bgCard, ...styles.borderLight, padding: '1.5rem', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
                >
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: path.gradient }} />

                  <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: path.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', marginBottom: '1rem' }}>
                    {path.icon}
                  </div>

                  <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{path.title}</h3>
                  <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '1rem' }}>{path.desc}</p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <div style={{ flex: 1, height: '8px', backgroundColor: '#16213e', borderRadius: '9999px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${path.progress}%`, background: path.gradient }} />
                    </div>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{path.progress}%</span>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {path.badges.map((badge) => (
                      <span key={badge} style={{ padding: '0.25rem 0.75rem', borderRadius: '9999px', ...styles.bgCardDark, ...styles.borderLight, fontSize: '0.75rem' }}>
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activity & Achievements */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
              {/* Recent Activity */}
              <div style={{ borderRadius: '24px', ...styles.bgCard, ...styles.borderLight, padding: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <Clock style={{ width: '28px', height: '28px', color: '#3b82f6' }} />
                  <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold' }}>Recent Activity</h2>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {[
                    { icon: '✅', text: 'Completed SQL Level 3', time: '2 hours ago', xp: '+100 XP' },
                    { icon: '🔥', text: '7-day streak milestone!', time: '1 day ago', xp: '+500 XP' },
                    { icon: '🎯', text: 'Finished CSS Challenge', time: '2 days ago', xp: '+150 XP' },
                    { icon: '⭐', text: 'Unlocked SQL Master badge', time: '3 days ago', xp: 'Badge' }
                  ].map((activity, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: '16px', ...styles.bgCardDark }}>
                      <div style={{ fontSize: '1.5rem' }}>{activity.icon}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{activity.text}</div>
                        <div style={{ fontSize: '0.875rem', color: '#9ca3af' }}>{activity.time}</div>
                      </div>
                      <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#22c55e' }}>{activity.xp}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div style={{ borderRadius: '24px', ...styles.bgCard, ...styles.borderLight, padding: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <Trophy style={{ width: '28px', height: '28px', color: '#eab308' }} />
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Achievements</h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                  {[
                    { emoji: '🥇', name: 'First Query', unlocked: true },
                    { emoji: '🔥', name: 'Week Streak', unlocked: true },
                    { emoji: '🎯', name: 'Perfect Score', unlocked: true },
                    { emoji: '⚡', name: 'Speed Runner', unlocked: false },
                    { emoji: '🏆', name: 'Champion', unlocked: false },
                    { emoji: '🌟', name: 'Master', unlocked: false }
                  ].map((badge, idx) => (
                    <div key={idx} style={{
                      borderRadius: '16px',
                      ...styles.bgCardDark,
                      padding: '1rem',
                      textAlign: 'center',
                      opacity: badge.unlocked ? 1 : 0.4,
                      border: badge.unlocked ? '2px solid #eab308' : '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                      <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{badge.emoji}</div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 600 }}>{badge.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : currentView === 'sql' ? (
          <>
            <button
              onClick={() => setCurrentView('home')}
              style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', fontSize: '1rem' }}
            >
              <ChevronLeft style={{ width: '16px', height: '16px' }} />
              Back to Home
            </button>

            <div style={{ borderRadius: '24px', ...styles.bgCard, ...styles.borderLight, padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold' }}>Current Challenge: SQL Level {currentLevel}</h2>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {sqlLevels.map((l) => (
                    <div
                      key={l.id}
                      style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        backgroundColor: completedLevels.includes(l.id) ? '#22c55e' : l.id === currentLevel ? '#a855f7' : '#4b5563'
                      }}
                    />
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                {/* Left Panel */}
                <div>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                      <Target style={{ width: '20px', height: '20px', color: '#ec4899' }} />
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#ec4899' }}>Your Mission</h3>
                    </div>
                    <p style={{ color: '#d1d5db', fontSize: '1.125rem' }}>{level.task}</p>
                  </div>

                  <div style={{ borderRadius: '16px', ...styles.bgCardDark, border: '1px solid rgba(234, 179, 8, 0.3)', padding: '1rem', marginBottom: '1rem' }}>
                    <button
                      onClick={() => setShowHint(!showHint)}
                      style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', width: '100%', background: 'none', border: 'none', color: '#fbbf24', cursor: 'pointer', fontSize: '1rem', padding: 0 }}
                    >
                      <Lightbulb style={{ width: '16px', height: '16px' }} />
                      <span style={{ fontWeight: 600 }}>Hint</span>
                    </button>
                    {showHint && <p style={{ fontSize: '0.875rem', color: '#9ca3af' }}>{level.hint}</p>}
                  </div>

                  <div style={{ borderRadius: '16px', ...styles.bgCardDark, border: '1px solid rgba(59, 130, 246, 0.3)', padding: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <BookOpen style={{ width: '16px', height: '16px', color: '#3b82f6' }} />
                      <span style={{ fontWeight: 600, color: '#3b82f6' }}>Concept</span>
                    </div>
                    <p style={{ fontSize: '0.875rem', color: '#9ca3af' }}>{level.concept}</p>
                  </div>
                </div>

                {/* Right Panel */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                    <Database style={{ width: '20px', height: '20px', color: '#22c55e' }} />
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#22c55e' }}>Database Table</h3>
                  </div>
                  <div style={{ borderRadius: '16px', ...styles.bgCardDark, padding: '1rem', overflowX: 'auto' }}>
                    <table style={{ width: '100%', fontSize: '0.875rem', fontFamily: 'monospace' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid rgba(139, 92, 246, 0.5)' }}>
                          {Object.keys(level.table[0]).map((key) => (
                            <th key={key} style={{ padding: '0.5rem 1rem', textAlign: 'left', fontWeight: 600, color: '#a78bfa' }}>
                              {key.charAt(0).toUpperCase() + key.slice(1)}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {level.table.map((row, idx) => (
                          <tr key={idx} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                            {Object.values(row).map((val, i) => (
                              <td key={i} style={{ padding: '0.75rem 1rem', color: '#d1d5db' }}>
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

              {/* SQL Editor */}
              <div style={{ borderRadius: '16px', ...styles.bgEditor, ...styles.borderLight, overflow: 'hidden', marginBottom: '1.5rem' }}>
                <div style={{ ...styles.bgCardDark, padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#eab308' }} />
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#22c55e' }} />
                  </div>
                  <span style={{ fontSize: '0.875rem', color: '#9ca3af', fontFamily: 'monospace' }}>SQL Editor</span>
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                    placeholder="SELECT * FROM employees WHERE ..."
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
                  style={{ padding: '0.75rem 1.5rem', borderRadius: '12px', ...styles.bgCardDark, ...styles.borderLight, border: '1px solid rgba(255, 255, 255, 0.1)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: '#fff' }}
                >
                  <Lightbulb style={{ width: '16px', height: '16px' }} />
                  Hint
                </button>
                <button
                  onClick={() => { setUserInput(''); setFeedback(null); }}
                  style={{ padding: '0.75rem 1.5rem', borderRadius: '12px', ...styles.bgCardDark, ...styles.borderLight, border: '1px solid rgba(255, 255, 255, 0.1)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: '#fff' }}
                >
                  <RefreshCw style={{ width: '16px', height: '16px' }} />
                  Reset
                </button>
                <button
                  onClick={handleSubmit}
                  style={{ padding: '0.75rem 2rem', borderRadius: '12px', ...styles.gradientPurple, border: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: '#fff' }}
                >
                  <Play style={{ width: '16px', height: '16px' }} />
                  Run Query
                </button>
              </div>

              {feedback && (
                <div style={{
                  padding: '1rem',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem',
                  ...(feedback.type === 'success'
                    ? { backgroundColor: 'rgba(34, 197, 94, 0.2)', border: '1px solid rgba(34, 197, 94, 0.5)' }
                    : { backgroundColor: 'rgba(239, 68, 68, 0.2)', border: '1px solid rgba(239, 68, 68, 0.5)' })
                }}>
                  {feedback.type === 'success' ?
                    <CheckCircle style={{ width: '20px', height: '20px', color: '#22c55e' }} /> :
                    <XCircle style={{ width: '20px', height: '20px', color: '#ef4444' }} />
                  }
                  <span style={{ fontWeight: 600, fontSize: '1.125rem' }}>{feedback.message}</span>
                </div>
              )}
            </div>
          </>
        ) : currentView === 'linux' ? (
          <TechPage tech="linux" />
        ) : currentView === 'css' ? (
          <TechPage tech="css" />
        ) : (
          <TechPage tech="docker" />
        )}
      </div>
    </div>
  );
};

export default CodeQuest;