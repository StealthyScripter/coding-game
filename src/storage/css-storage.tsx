export interface CSSLevel {
  id: number;
  title: string;
  task: string;
  hint: string;
  concept: string;
  solution: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  xpReward: number;
}

export interface CSSLearningMaterial {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  prerequisites: string[];
}

export interface CSSAchievement {
  id: string;
  name: string;
  description: string;
  emoji: string;
  requirement: string;
  xpReward: number;
}

// ==================== CSS LEVELS ====================

export const cssLevels: CSSLevel[] = [
  {
    id: 1,
    title: "Change Text Color",
    task: "Make the heading text purple",
    hint: "Use 'color: purple;' inside the h1 selector",
    concept: "The color property changes text color. Use color names, hex codes (#9333EA), or rgb values.",
    solution: "h1 { color: purple; }",
    difficulty: 'beginner',
    category: 'Colors',
    xpReward: 100
  },
  {
    id: 2,
    title: "Add Background Color",
    task: "Give the box a gradient blue background",
    hint: "Use 'background: linear-gradient(to right, #3b82f6, #1e40af);'",
    concept: "Backgrounds can be solid colors or gradients. Gradients blend multiple colors smoothly.",
    solution: ".box { background: linear-gradient(to right, #3b82f6, #1e40af); }",
    difficulty: 'beginner',
    category: 'Colors',
    xpReward: 100
  },
  {
    id: 3,
    title: "Center with Flexbox",
    task: "Center the item both horizontally and vertically",
    hint: "Use 'display: flex; justify-content: center; align-items: center;'",
    concept: "Flexbox is powerful for layouts. justify-content aligns horizontally, align-items vertically.",
    solution: ".container { display: flex; justify-content: center; align-items: center; }",
    difficulty: 'intermediate',
    category: 'Flexbox',
    xpReward: 150
  },
  {
    id: 4,
    title: "Add Border Radius",
    task: "Make the card have rounded corners (2rem)",
    hint: "Use 'border-radius: 2rem;'",
    concept: "border-radius rounds corners. Use px, rem, or % values. 50% creates a circle.",
    solution: ".card { border-radius: 2rem; }",
    difficulty: 'beginner',
    category: 'Styling',
    xpReward: 100
  },
  {
    id: 5,
    title: "Add Box Shadow",
    task: "Add a purple shadow to the button",
    hint: "Use 'box-shadow: 0 10px 30px rgba(147, 51, 234, 0.5);'",
    concept: "box-shadow adds depth. Format: x-offset y-offset blur spread color.",
    solution: "button { box-shadow: 0 10px 30px rgba(147, 51, 234, 0.5); }",
    difficulty: 'intermediate',
    category: 'Styling',
    xpReward: 150
  },
  {
    id: 6,
    title: "Flexbox Row Layout",
    task: "Create a horizontal row with space between items",
    hint: "Use 'display: flex; justify-content: space-between;'",
    concept: "Flexbox layouts can be row (default) or column. space-between adds equal space between items.",
    solution: ".container { display: flex; justify-content: space-between; }",
    difficulty: 'intermediate',
    category: 'Flexbox',
    xpReward: 150
  },
  {
    id: 7,
    title: "CSS Grid Layout",
    task: "Create a 3-column grid",
    hint: "Use 'display: grid; grid-template-columns: repeat(3, 1fr);'",
    concept: "CSS Grid creates two-dimensional layouts. 1fr means one fraction of available space.",
    solution: ".grid { display: grid; grid-template-columns: repeat(3, 1fr); }",
    difficulty: 'advanced',
    category: 'Grid',
    xpReward: 200
  },
  {
    id: 8,
    title: "Hover Effect",
    task: "Change button color on hover",
    hint: "Use ':hover' pseudo-class with background color",
    concept: "Pseudo-classes like :hover style elements in specific states. Add transitions for smooth effects.",
    solution: "button:hover { background-color: #7c3aed; }",
    difficulty: 'beginner',
    category: 'Interactivity',
    xpReward: 100
  },
  {
    id: 9,
    title: "Transition Animation",
    task: "Add a smooth 0.3s transition to all properties",
    hint: "Use 'transition: all 0.3s ease;'",
    concept: "Transitions create smooth changes between states. Specify property, duration, and timing function.",
    solution: ".element { transition: all 0.3s ease; }",
    difficulty: 'intermediate',
    category: 'Animations',
    xpReward: 150
  },
  {
    id: 10,
    title: "Transform Scale",
    task: "Scale element to 1.1x on hover",
    hint: "Use 'transform: scale(1.1);' in hover state",
    concept: "Transform property modifies elements without affecting layout. Scale, rotate, translate, skew.",
    solution: ".element:hover { transform: scale(1.1); }",
    difficulty: 'intermediate',
    category: 'Animations',
    xpReward: 150
  },
  {
    id: 11,
    title: "Responsive Typography",
    task: "Set font size to be responsive using viewport units",
    hint: "Use 'font-size: 4vw;' for viewport-based sizing",
    concept: "Viewport units (vw, vh) scale with browser size. 1vw = 1% of viewport width.",
    solution: "h1 { font-size: 4vw; }",
    difficulty: 'advanced',
    category: 'Responsive',
    xpReward: 200
  },
  {
    id: 12,
    title: "Media Query",
    task: "Hide element on screens smaller than 768px",
    hint: "Use '@media (max-width: 768px) { .element { display: none; } }'",
    concept: "Media queries apply styles based on device characteristics like screen width.",
    solution: "@media (max-width: 768px) { .element { display: none; } }",
    difficulty: 'advanced',
    category: 'Responsive',
    xpReward: 200
  },
  {
    id: 13,
    title: "Z-Index Layering",
    task: "Make modal appear above other content with z-index",
    hint: "Use 'z-index: 1000;' with position property",
    concept: "Z-index controls stacking order. Higher values appear on top. Requires position property.",
    solution: ".modal { position: fixed; z-index: 1000; }",
    difficulty: 'intermediate',
    category: 'Layout',
    xpReward: 150
  },
  {
    id: 14,
    title: "CSS Variables",
    task: "Create and use a custom color variable",
    hint: "Use '--primary-color: #7c3aed;' in :root, then 'color: var(--primary-color);'",
    concept: "CSS variables (custom properties) store reusable values. Define in :root, use with var().",
    solution: ":root { --primary-color: #7c3aed; } .element { color: var(--primary-color); }",
    difficulty: 'advanced',
    category: 'Advanced',
    xpReward: 200
  },
  {
    id: 15,
    title: "Keyframe Animation",
    task: "Create a fade-in animation",
    hint: "Use @keyframes with opacity change from 0 to 1",
    concept: "Keyframes define animation sequences. Specify styles at different percentages of animation duration.",
    solution: "@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } } .element { animation: fadeIn 1s; }",
    difficulty: 'advanced',
    category: 'Animations',
    xpReward: 250
  }
];

// ==================== LEARNING MATERIALS ====================

export const cssLearningMaterials: CSSLearningMaterial[] = [
  {
    id: 'css-learn-001',
    title: 'CSS Basics',
    description: 'Introduction to Cascading Style Sheets',
    content: 'CSS styles HTML elements. Syntax: selector { property: value; }. Use classes (.class) and IDs (#id) as selectors.',
    category: 'Basics',
    level: 'beginner',
    prerequisites: []
  },
  {
    id: 'css-learn-002',
    title: 'Colors and Backgrounds',
    description: 'Master color properties and backgrounds',
    content: 'Colors can be named (red), hex (#ff0000), rgb(255,0,0), or hsl. Backgrounds support colors, gradients, and images.',
    category: 'Colors',
    level: 'beginner',
    prerequisites: ['css-learn-001']
  },
  {
    id: 'css-learn-003',
    title: 'Flexbox Fundamentals',
    description: 'Learn flexible box layouts',
    content: 'Flexbox creates flexible, responsive layouts. Main axis (justify-content) and cross axis (align-items) control alignment.',
    category: 'Flexbox',
    level: 'intermediate',
    prerequisites: ['css-learn-001']
  },
  {
    id: 'css-learn-004',
    title: 'CSS Grid Mastery',
    description: 'Two-dimensional layout system',
    content: 'Grid creates complex layouts with rows and columns. Use grid-template-columns, grid-template-rows, and grid-gap.',
    category: 'Grid',
    level: 'advanced',
    prerequisites: ['css-learn-003']
  },
  {
    id: 'css-learn-005',
    title: 'Animations and Transitions',
    description: 'Bring your designs to life',
    content: 'Transitions smooth state changes. Animations use keyframes for complex sequences. Control with duration, timing, delay.',
    category: 'Animations',
    level: 'intermediate',
    prerequisites: ['css-learn-001']
  },
  {
    id: 'css-learn-006',
    title: 'Responsive Design',
    description: 'Create designs that work on all devices',
    content: 'Media queries adapt styles to screen sizes. Use viewport units, flexible grids, and mobile-first approach.',
    category: 'Responsive',
    level: 'advanced',
    prerequisites: ['css-learn-003', 'css-learn-004']
  }
];

// ==================== CSS ACHIEVEMENTS ====================

export const cssAchievements: CSSAchievement[] = [
  {
    id: 'css-ach-001',
    name: 'Style Beginner',
    description: 'Complete your first CSS challenge',
    emoji: '🎨',
    requirement: 'Complete 1 CSS level',
    xpReward: 50
  },
  {
    id: 'css-ach-002',
    name: 'Color Master',
    description: 'Master color and background challenges',
    emoji: '🌈',
    requirement: 'Complete all Colors category levels',
    xpReward: 200
  },
  {
    id: 'css-ach-003',
    name: 'Flexbox Expert',
    description: 'Complete all Flexbox challenges',
    emoji: '📦',
    requirement: 'Complete all Flexbox category levels',
    xpReward: 250
  },
  {
    id: 'css-ach-004',
    name: 'Grid Guru',
    description: 'Master CSS Grid layouts',
    emoji: '🔲',
    requirement: 'Complete all Grid category levels',
    xpReward: 300
  },
  {
    id: 'css-ach-005',
    name: 'Animation Artist',
    description: 'Master animations and transitions',
    emoji: '✨',
    requirement: 'Complete all Animations category levels',
    xpReward: 300
  },
  {
    id: 'css-ach-006',
    name: 'CSS Master',
    description: 'Complete all CSS challenges',
    emoji: '🏆',
    requirement: 'Complete all 15 CSS levels',
    xpReward: 1000
  },
  {
    id: 'css-ach-007',
    name: 'Responsive Designer',
    description: 'Master responsive design techniques',
    emoji: '📱',
    requirement: 'Complete all Responsive category levels',
    xpReward: 350
  }
];

// ==================== HELPER FUNCTIONS ====================

export const getCSSLevelById = (id: number): CSSLevel | undefined => {
  return cssLevels.find(level => level.id === id);
};

export const getCSSLevelsByCategory = (category: string): CSSLevel[] => {
  return cssLevels.filter(level => level.category === category);
};

export const getCSSLevelsByDifficulty = (difficulty: string): CSSLevel[] => {
  return cssLevels.filter(level => level.difficulty === difficulty);
};

export const getTotalCSSXP = (): number => {
  return cssLevels.reduce((total, level) => total + level.xpReward, 0);
};
