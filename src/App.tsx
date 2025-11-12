import { useState } from 'react';
import {
  Trophy, Flame, Star, Zap, Clock
} from 'lucide-react';
import SQLGame from './components/SQLGame';
import CSSGame from './components/CSSGame';
import DockerGame from './components/DockerGame';
import LinuxGame from './components/LinuxGame';
import {
  mockUser,
  mockStreak,
  mockRecentActivity,
  mockAchievements,
  mockDailyChallenges,
  mockSupportedLanguages,
  getTotalChallengesCompleted,
  getSkillsMastered,
  mockSkillProgress
} from './storage/storage';

type Technology = 'sql' | 'linux' | 'css' | 'docker' | 'home';

const CodeQuest = () => {
  const [currentView, setCurrentView] = useState<Technology>('home');
  const [totalXP, setTotalXP] = useState(mockUser.currentXP);

  const handleChallengeComplete = (xp: number) => {
    setTotalXP(prev => prev + xp);
  };

  const styles = {
    bgPrimary: { backgroundColor: '#1a1a2e' },
    bgCard: { background: 'linear-gradient(135deg, #2d2d52 0%, #1f1f3a 100%)' },
    bgCardDark: { backgroundColor: '#1a1a2e' },
    borderLight: { border: '1px solid rgba(255, 255, 255, 0.1)' },
    borderPurple: { border: '1px solid rgba(167, 139, 250, 0.3)' },
    gradientPurple: { background: 'linear-gradient(90deg, #a78bfa 0%, #7c3aed 50%, #6366f1 100%)' },
    gradientXP: { background: 'linear-gradient(90deg, #06b6d4 0%, #a855f7 50%, #ec4899 100%)' },
    textGradient: { background: 'linear-gradient(90deg, #a78bfa 0%, #c084fc 50%, #e879f9 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' },
  };

  return (
    <div style={{ minHeight: '100vh', ...styles.bgPrimary, color: '#fff' }}>
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
                <span style={{ fontWeight: 600 }}>{mockStreak.currentStreak}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '9999px', ...styles.bgCardDark, ...styles.borderLight }}>
                <Star style={{ width: '20px', height: '20px', color: '#eab308' }} />
                <span>Level {mockUser.level}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 1rem', borderRadius: '9999px', ...styles.bgCardDark, ...styles.borderLight }}>
                <div style={{ width: '128px', height: '8px', backgroundColor: '#16213e', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${(totalXP / mockUser.nextLevelXP) * 100}%`, ...styles.gradientXP }} />
                </div>
                <span style={{ fontSize: '0.875rem' }}>{totalXP.toLocaleString()} XP</span>
              </div>

              <div style={{ width: '40px', height: '40px', borderRadius: '50%', ...styles.gradientPurple, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                {mockUser.avatar}
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
                  { icon: '🎯', label: 'Challenges Completed', value: getTotalChallengesCompleted().toString(), color: '#a78bfa' },
                  { icon: '⚡', label: 'Current Streak', value: `${mockStreak.currentStreak} days`, color: '#fbbf24' },
                  { icon: '🏆', label: 'Total XP', value: totalXP.toLocaleString(), color: '#22c55e' },
                  { icon: '📚', label: 'Skills Mastered', value: getSkillsMastered().toString(), color: '#3b82f6' }
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
                  { icon: '🏅', title: 'Achievements', desc: 'View your progress', action: `${mockAchievements.filter(a => a.unlocked).length} Unlocked` }
                ].map((action, idx) => (
                  <div key={idx} style={{ borderRadius: '20px', ...styles.bgCard, ...styles.borderLight, padding: '1.5rem', cursor: 'pointer' }}>
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
                    <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold' }}>{mockDailyChallenges[0]?.title || 'Daily Challenge'}</h2>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '9999px', ...styles.bgCardDark, ...styles.borderLight }}>
                    <Clock style={{ width: '16px', height: '16px', color: '#ef4444' }} />
                    <span>12:34:56</span>
                  </div>
                </div>
                <p style={{ color: '#9ca3af', fontSize: '1.125rem', marginBottom: '1.5rem' }}>
                  {mockDailyChallenges[0]?.description || 'Complete today\'s challenge to maintain your streak and earn 2x XP bonus!'}
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
              {mockSupportedLanguages.map((lang) => {
                const progress = mockSkillProgress.find(s => s.technology === lang.id);
                return (
                  <div
                    key={lang.id}
                    onClick={() => setCurrentView(lang.id as Technology)}
                    style={{ borderRadius: '24px', ...styles.bgCard, ...styles.borderLight, padding: '1.5rem', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
                  >
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: lang.gradient }} />

                    <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: lang.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', marginBottom: '1rem' }}>
                      {lang.icon}
                    </div>

                    <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{lang.name}</h3>
                    <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '1rem' }}>{lang.description}</p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      <div style={{ flex: 1, height: '8px', backgroundColor: '#16213e', borderRadius: '9999px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${progress?.progress || 0}%`, background: lang.gradient }} />
                      </div>
                      <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{progress?.progress || 0}%</span>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {lang.categories.slice(0, 3).map((badge) => (
                        <span key={badge} style={{ padding: '0.25rem 0.75rem', borderRadius: '9999px', ...styles.bgCardDark, ...styles.borderLight, fontSize: '0.75rem' }}>
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
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
                  {mockRecentActivity.map((activity) => (
                    <div key={activity.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: '16px', ...styles.bgCardDark }}>
                      <div style={{ fontSize: '1.5rem' }}>{activity.icon}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{activity.text}</div>
                        <div style={{ fontSize: '0.875rem', color: '#9ca3af' }}>{activity.time}</div>
                      </div>
                      {activity.xpGained && (
                        <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#22c55e' }}>+{activity.xpGained} XP</div>
                      )}
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
                  {mockAchievements.slice(0, 6).map((badge) => (
                    <div key={badge.id} style={{
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
          <SQLGame onBack={() => setCurrentView('home')} onComplete={handleChallengeComplete} />
        ) : currentView === 'css' ? (
          <CSSGame onBack={() => setCurrentView('home')} onComplete={handleChallengeComplete} />
        ) : currentView === 'docker' ? (
          <DockerGame onBack={() => setCurrentView('home')} onComplete={handleChallengeComplete} />
        ) : currentView === 'linux' ? (
          <LinuxGame onBack={() => setCurrentView('home')} onComplete={handleChallengeComplete} />
        ) : null}
      </div>
    </div>
  );
};

export default CodeQuest;
