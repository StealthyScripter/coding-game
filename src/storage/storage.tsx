export interface UserInfo {
  id: string;
  name: string;
  email: string;
  avatar: string;
  level: number;
  currentXP: number;
  nextLevelXP: number;
  totalXP: number;
  joinDate: string;
  lastActive: string;
}

export interface LearningStreak {
  currentStreak: number;
  longestStreak: number;
  lastCompletedDate: string;
  streakStartDate: string;
}

export interface CompletedChallenge {
  id: string;
  technology: string;
  levelId: number;
  completedAt: string;
  xpEarned: number;
  timeSpent: number; // in seconds
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  emoji: string;
  unlocked: boolean;
  unlockedAt?: string;
  category: 'general' | 'sql' | 'css' | 'docker' | 'linux';
  xpReward: number;
}

export interface SkillProgress {
  technology: string;
  name: string;
  progress: number; // 0-100
  levelsCompleted: number;
  totalLevels: number;
  xpEarned: number;
}

export interface RecentActivity {
  id: string;
  icon: string;
  text: string;
  time: string;
  xpGained?: number;
  type: 'completion' | 'streak' | 'badge' | 'milestone';
}

export interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  technology: string;
  difficulty: 'easy' | 'medium' | 'hard';
  xpReward: number;
  bonusXP: number;
  deadline: string;
  completed: boolean;
}

export interface SupportedLanguage {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
  gradient: string;
  totalLevels: number;
  categories: string[];
}

// ==================== MOCK DATA ====================

export const mockUser: UserInfo = {
  id: 'user-001',
  name: 'Brian',
  email: 'brian@codequest.com',
  avatar: 'B',
  level: 12,
  currentXP: 2450,
  nextLevelXP: 3000,
  totalXP: 15450,
  joinDate: '2024-09-15',
  lastActive: '2024-11-12T14:30:00Z'
};

export const mockStreak: LearningStreak = {
  currentStreak: 7,
  longestStreak: 15,
  lastCompletedDate: '2024-11-12',
  streakStartDate: '2024-11-06'
};

export const mockCompletedChallenges: CompletedChallenge[] = [
  {
    id: 'cc-001',
    technology: 'sql',
    levelId: 1,
    completedAt: '2024-11-12T10:30:00Z',
    xpEarned: 100,
    timeSpent: 120
  },
  {
    id: 'cc-002',
    technology: 'sql',
    levelId: 2,
    completedAt: '2024-11-12T11:15:00Z',
    xpEarned: 100,
    timeSpent: 180
  },
  {
    id: 'cc-003',
    technology: 'sql',
    levelId: 3,
    completedAt: '2024-11-12T12:00:00Z',
    xpEarned: 100,
    timeSpent: 240
  },
  {
    id: 'cc-004',
    technology: 'css',
    levelId: 1,
    completedAt: '2024-11-10T14:20:00Z',
    xpEarned: 150,
    timeSpent: 300
  }
];

export const mockAchievements: Achievement[] = [
  {
    id: 'ach-001',
    name: 'First Query',
    description: 'Complete your first SQL challenge',
    emoji: '🥇',
    unlocked: true,
    unlockedAt: '2024-11-12T10:30:00Z',
    category: 'general',
    xpReward: 50
  },
  {
    id: 'ach-002',
    name: 'Week Streak',
    description: 'Maintain a 7-day learning streak',
    emoji: '🔥',
    unlocked: true,
    unlockedAt: '2024-11-12T08:00:00Z',
    category: 'general',
    xpReward: 500
  },
  {
    id: 'ach-003',
    name: 'Perfect Score',
    description: 'Complete a challenge on first try',
    emoji: '🎯',
    unlocked: true,
    unlockedAt: '2024-11-11T16:45:00Z',
    category: 'general',
    xpReward: 100
  },
  {
    id: 'ach-004',
    name: 'Speed Runner',
    description: 'Complete 3 challenges in under 10 minutes',
    emoji: '⚡',
    unlocked: false,
    category: 'general',
    xpReward: 200
  },
  {
    id: 'ach-005',
    name: 'Champion',
    description: 'Complete all challenges in a technology',
    emoji: '🏆',
    unlocked: false,
    category: 'general',
    xpReward: 1000
  },
  {
    id: 'ach-006',
    name: 'Master',
    description: 'Reach level 50',
    emoji: '🌟',
    unlocked: false,
    category: 'general',
    xpReward: 2000
  },
  {
    id: 'ach-007',
    name: 'SQL Novice',
    description: 'Complete 5 SQL challenges',
    emoji: '📊',
    unlocked: true,
    unlockedAt: '2024-11-12T12:00:00Z',
    category: 'sql',
    xpReward: 150
  },
  {
    id: 'ach-008',
    name: 'CSS Artist',
    description: 'Complete 5 CSS challenges',
    emoji: '🎨',
    unlocked: false,
    category: 'css',
    xpReward: 150
  }
];

export const mockSkillProgress: SkillProgress[] = [
  {
    technology: 'sql',
    name: 'SQL Mastery',
    progress: 45,
    levelsCompleted: 9,
    totalLevels: 20,
    xpEarned: 900
  },
  {
    technology: 'linux',
    name: 'Linux Command Line',
    progress: 30,
    levelsCompleted: 6,
    totalLevels: 20,
    xpEarned: 600
  },
  {
    technology: 'css',
    name: 'CSS Wizardry',
    progress: 60,
    levelsCompleted: 12,
    totalLevels: 20,
    xpEarned: 1200
  },
  {
    technology: 'docker',
    name: 'Docker Containers',
    progress: 25,
    levelsCompleted: 5,
    totalLevels: 20,
    xpEarned: 500
  }
];

export const mockRecentActivity: RecentActivity[] = [
  {
    id: 'ra-001',
    icon: '✅',
    text: 'Completed SQL Level 3',
    time: '2 hours ago',
    xpGained: 100,
    type: 'completion'
  },
  {
    id: 'ra-002',
    icon: '🔥',
    text: '7-day streak milestone!',
    time: '1 day ago',
    xpGained: 500,
    type: 'streak'
  },
  {
    id: 'ra-003',
    icon: '🎯',
    text: 'Finished CSS Challenge',
    time: '2 days ago',
    xpGained: 150,
    type: 'completion'
  },
  {
    id: 'ra-004',
    icon: '⭐',
    text: 'Unlocked SQL Master badge',
    time: '3 days ago',
    type: 'badge'
  },
  {
    id: 'ra-005',
    icon: '🚀',
    text: 'Reached Level 12',
    time: '4 days ago',
    xpGained: 200,
    type: 'milestone'
  }
];

export const mockDailyChallenges: DailyChallenge[] = [
  {
    id: 'dc-001',
    title: 'SQL Join Mastery',
    description: 'Master complex JOIN operations',
    technology: 'sql',
    difficulty: 'hard',
    xpReward: 200,
    bonusXP: 200,
    deadline: '2024-11-12T23:59:59Z',
    completed: false
  },
  {
    id: 'dc-002',
    title: 'Flexbox Layout Challenge',
    description: 'Create a responsive layout using Flexbox',
    technology: 'css',
    difficulty: 'medium',
    xpReward: 150,
    bonusXP: 150,
    deadline: '2024-11-12T23:59:59Z',
    completed: false
  }
];

export const mockSupportedLanguages: SupportedLanguage[] = [
  {
    id: 'sql',
    name: 'SQL Mastery',
    icon: '🗄️',
    description: 'Master database queries from basic SELECT to complex JOINs',
    color: '#7c3aed',
    gradient: 'linear-gradient(90deg, #7c3aed, #4f46e5)',
    totalLevels: 20,
    categories: ['SELECT', 'WHERE', 'JOIN', 'GROUP BY', 'Subqueries']
  },
  {
    id: 'linux',
    name: 'Linux Command Line',
    icon: '💻',
    description: 'Navigate the terminal like a pro',
    color: '#059669',
    gradient: 'linear-gradient(90deg, #059669, #14b8a6)',
    totalLevels: 20,
    categories: ['Navigation', 'File Ops', 'Permissions', 'Pipes', 'Scripting']
  },
  {
    id: 'css',
    name: 'CSS Wizardry',
    icon: '🎨',
    description: 'Create stunning designs with modern CSS',
    color: '#db2777',
    gradient: 'linear-gradient(90deg, #db2777, #f43f5e)',
    totalLevels: 20,
    categories: ['Flexbox', 'Grid', 'Animations', 'Responsive', 'Transforms']
  },
  {
    id: 'docker',
    name: 'Docker Containers',
    icon: '🐳',
    description: 'Build, ship, and run applications',
    color: '#0891b2',
    gradient: 'linear-gradient(90deg, #0891b2, #3b82f6)',
    totalLevels: 20,
    categories: ['Images', 'Containers', 'Networks', 'Volumes', 'Compose']
  }
];

// ==================== HELPER FUNCTIONS ====================

export const getTotalChallengesCompleted = (): number => {
  return mockCompletedChallenges.length;
};

export const getSkillsMastered = (): number => {
  return mockSkillProgress.filter(skill => skill.progress >= 100).length;
};

export const getUnlockedAchievements = (): Achievement[] => {
  return mockAchievements.filter(ach => ach.unlocked);
};

export const getChallengesByTechnology = (technology: string): CompletedChallenge[] => {
  return mockCompletedChallenges.filter(ch => ch.technology === technology);
};

export const getAchievementsByCategory = (category: string): Achievement[] => {
  return mockAchievements.filter(ach => ach.category === category);
};
