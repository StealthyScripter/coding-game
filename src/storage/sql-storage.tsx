export interface SQLLevel {
  id: number;
  title: string;
  task: string;
  hint: string;
  concept: string;
  solution: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  xpReward: number;
  table: Array<Record<string, string | number>>;
}

export interface SQLLearningMaterial {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  prerequisites: string[];
}

export interface SQLAchievement {
  id: string;
  name: string;
  description: string;
  emoji: string;
  requirement: string;
  xpReward: number;
}

// ==================== SQL LEVELS ====================

export const sqlLevels: SQLLevel[] = [
  {
    id: 1,
    title: "Select All Employees",
    task: "Retrieve all columns from the employees table",
    hint: "Use SELECT * to get all columns",
    concept: "SELECT * retrieves all columns from a table. This is useful for exploring data.",
    solution: "SELECT * FROM employees",
    difficulty: 'beginner',
    category: 'SELECT',
    xpReward: 100,
    table: [
      { id: 1, name: "Alice Johnson", department: "Engineering", salary: 75000, age: 28 },
      { id: 2, name: "Bob Smith", department: "Sales", salary: 65000, age: 32 },
      { id: 3, name: "Charlie Davis", department: "Engineering", salary: 80000, age: 35 }
    ]
  },
  {
    id: 2,
    title: "Filter by Department",
    task: "Get all employees in the Engineering department",
    hint: "Use WHERE to filter rows",
    concept: "WHERE clause filters rows based on conditions. Syntax: WHERE column = 'value'",
    solution: "SELECT * FROM employees WHERE department = 'Engineering'",
    difficulty: 'beginner',
    category: 'WHERE',
    xpReward: 100,
    table: [
      { id: 1, name: "Alice Johnson", department: "Engineering", salary: 75000, age: 28 },
      { id: 2, name: "Bob Smith", department: "Sales", salary: 65000, age: 32 },
      { id: 3, name: "Charlie Davis", department: "Engineering", salary: 80000, age: 35 }
    ]
  },
  {
    id: 3,
    title: "Filter by Salary",
    task: "Retrieve all employees with salary greater than $70,000",
    hint: "Use comparison operators: >, <, >=, <=, =, !=",
    concept: "Comparison operators filter numeric data. Example: WHERE salary > 70000",
    solution: "SELECT * FROM employees WHERE salary > 70000",
    difficulty: 'beginner',
    category: 'WHERE',
    xpReward: 100,
    table: [
      { id: 1, name: "Alice Johnson", department: "Engineering", salary: 75000, age: 28 },
      { id: 2, name: "Bob Smith", department: "Sales", salary: 65000, age: 32 },
      { id: 3, name: "Charlie Davis", department: "Engineering", salary: 80000, age: 35 },
      { id: 4, name: "Diana Wilson", department: "Marketing", salary: 72000, age: 30 }
    ]
  },
  {
    id: 4,
    title: "Multiple Conditions",
    task: "Get Engineering employees with salary > $70,000",
    hint: "Combine conditions with AND",
    concept: "AND combines conditions (all must be true). OR requires at least one to be true.",
    solution: "SELECT * FROM employees WHERE department = 'Engineering' AND salary > 70000",
    difficulty: 'intermediate',
    category: 'WHERE',
    xpReward: 150,
    table: [
      { id: 1, name: "Alice Johnson", department: "Engineering", salary: 75000, age: 28 },
      { id: 2, name: "Bob Smith", department: "Sales", salary: 65000, age: 32 },
      { id: 3, name: "Charlie Davis", department: "Engineering", salary: 80000, age: 35 },
      { id: 4, name: "Frank Brown", department: "Engineering", salary: 68000, age: 26 }
    ]
  },
  {
    id: 5,
    title: "Select Specific Columns",
    task: "Get only the name and salary of all employees",
    hint: "List column names separated by commas after SELECT",
    concept: "SELECT name, salary FROM table retrieves only specified columns.",
    solution: "SELECT name, salary FROM employees",
    difficulty: 'beginner',
    category: 'SELECT',
    xpReward: 100,
    table: [
      { id: 1, name: "Alice Johnson", department: "Engineering", salary: 75000, age: 28 },
      { id: 2, name: "Bob Smith", department: "Sales", salary: 65000, age: 32 },
      { id: 3, name: "Charlie Davis", department: "Marketing", salary: 70000, age: 29 }
    ]
  },
  {
    id: 6,
    title: "Order Results",
    task: "List all employees ordered by salary (highest first)",
    hint: "Use ORDER BY column DESC for descending order",
    concept: "ORDER BY sorts results. Use DESC for descending, ASC for ascending (default).",
    solution: "SELECT * FROM employees ORDER BY salary DESC",
    difficulty: 'beginner',
    category: 'ORDER BY',
    xpReward: 100,
    table: [
      { id: 1, name: "Alice Johnson", department: "Engineering", salary: 75000, age: 28 },
      { id: 2, name: "Bob Smith", department: "Sales", salary: 65000, age: 32 },
      { id: 3, name: "Charlie Davis", department: "Engineering", salary: 80000, age: 35 },
      { id: 4, name: "Diana Wilson", department: "Marketing", salary: 72000, age: 30 }
    ]
  },
  {
    id: 7,
    title: "Count Records",
    task: "Count the total number of employees",
    hint: "Use COUNT(*) to count all rows",
    concept: "COUNT(*) returns the number of rows. COUNT(column) counts non-null values.",
    solution: "SELECT COUNT(*) FROM employees",
    difficulty: 'beginner',
    category: 'AGGREGATE',
    xpReward: 150,
    table: [
      { id: 1, name: "Alice Johnson", department: "Engineering", salary: 75000, age: 28 },
      { id: 2, name: "Bob Smith", department: "Sales", salary: 65000, age: 32 },
      { id: 3, name: "Charlie Davis", department: "Engineering", salary: 80000, age: 35 }
    ]
  },
  {
    id: 8,
    title: "Average Salary",
    task: "Calculate the average salary of all employees",
    hint: "Use AVG(column) to calculate average",
    concept: "AVG() calculates the average of numeric values. Also try SUM(), MIN(), MAX().",
    solution: "SELECT AVG(salary) FROM employees",
    difficulty: 'intermediate',
    category: 'AGGREGATE',
    xpReward: 150,
    table: [
      { id: 1, name: "Alice Johnson", department: "Engineering", salary: 75000, age: 28 },
      { id: 2, name: "Bob Smith", department: "Sales", salary: 65000, age: 32 },
      { id: 3, name: "Charlie Davis", department: "Engineering", salary: 80000, age: 35 },
      { id: 4, name: "Diana Wilson", department: "Marketing", salary: 70000, age: 30 }
    ]
  },
  {
    id: 9,
    title: "Group By Department",
    task: "Count employees in each department",
    hint: "Use GROUP BY department with COUNT(*)",
    concept: "GROUP BY groups rows with same values. Often used with aggregate functions.",
    solution: "SELECT department, COUNT(*) FROM employees GROUP BY department",
    difficulty: 'intermediate',
    category: 'GROUP BY',
    xpReward: 200,
    table: [
      { id: 1, name: "Alice Johnson", department: "Engineering", salary: 75000, age: 28 },
      { id: 2, name: "Bob Smith", department: "Sales", salary: 65000, age: 32 },
      { id: 3, name: "Charlie Davis", department: "Engineering", salary: 80000, age: 35 },
      { id: 4, name: "Diana Wilson", department: "Sales", salary: 70000, age: 30 },
      { id: 5, name: "Eve Martinez", department: "Engineering", salary: 82000, age: 31 }
    ]
  },
  {
    id: 10,
    title: "LIKE Pattern Matching",
    task: "Find all employees whose name starts with 'A'",
    hint: "Use LIKE 'A%' for names starting with A",
    concept: "LIKE matches patterns. % matches any characters, _ matches single character.",
    solution: "SELECT * FROM employees WHERE name LIKE 'A%'",
    difficulty: 'intermediate',
    category: 'WHERE',
    xpReward: 150,
    table: [
      { id: 1, name: "Alice Johnson", department: "Engineering", salary: 75000, age: 28 },
      { id: 2, name: "Bob Smith", department: "Sales", salary: 65000, age: 32 },
      { id: 3, name: "Anna Williams", department: "Marketing", salary: 70000, age: 29 },
      { id: 4, name: "Andrew Davis", department: "Engineering", salary: 80000, age: 35 }
    ]
  }
];

// ==================== LEARNING MATERIALS ====================

export const sqlLearningMaterials: SQLLearningMaterial[] = [
  {
    id: 'sql-learn-001',
    title: 'Introduction to SELECT',
    description: 'Learn the basics of retrieving data from databases',
    content: 'The SELECT statement is used to query data from a database. SELECT * retrieves all columns, while you can specify individual columns like SELECT name, age.',
    category: 'SELECT',
    level: 'beginner',
    prerequisites: []
  },
  {
    id: 'sql-learn-002',
    title: 'Filtering with WHERE',
    description: 'Master conditional data retrieval',
    content: 'The WHERE clause filters rows based on conditions. You can use operators like =, !=, >, <, >=, <= to compare values. Combine conditions with AND, OR.',
    category: 'WHERE',
    level: 'beginner',
    prerequisites: ['sql-learn-001']
  },
  {
    id: 'sql-learn-003',
    title: 'Sorting with ORDER BY',
    description: 'Learn to sort query results',
    content: 'ORDER BY sorts results by one or more columns. Use DESC for descending order, ASC (default) for ascending. Example: ORDER BY salary DESC, name ASC',
    category: 'ORDER BY',
    level: 'beginner',
    prerequisites: ['sql-learn-001']
  },
  {
    id: 'sql-learn-004',
    title: 'Aggregate Functions',
    description: 'Calculate summaries with COUNT, SUM, AVG, MIN, MAX',
    content: 'Aggregate functions perform calculations on sets of values. COUNT(*) counts rows, AVG() calculates average, SUM() adds values, MIN/MAX find extremes.',
    category: 'AGGREGATE',
    level: 'intermediate',
    prerequisites: ['sql-learn-001', 'sql-learn-002']
  },
  {
    id: 'sql-learn-005',
    title: 'Grouping Data',
    description: 'Use GROUP BY to organize data into groups',
    content: 'GROUP BY groups rows with the same values in specified columns. Often combined with aggregate functions to calculate per-group statistics.',
    category: 'GROUP BY',
    level: 'intermediate',
    prerequisites: ['sql-learn-004']
  },
  {
    id: 'sql-learn-006',
    title: 'INNER JOIN',
    description: 'Combine data from multiple tables',
    content: 'INNER JOIN combines rows from two tables based on a related column. Returns only matching rows from both tables.',
    category: 'JOIN',
    level: 'advanced',
    prerequisites: ['sql-learn-001', 'sql-learn-002']
  }
];

// ==================== SQL ACHIEVEMENTS ====================

export const sqlAchievements: SQLAchievement[] = [
  {
    id: 'sql-ach-001',
    name: 'SQL Beginner',
    description: 'Complete your first SQL query',
    emoji: '🌱',
    requirement: 'Complete 1 SQL level',
    xpReward: 50
  },
  {
    id: 'sql-ach-002',
    name: 'Query Master',
    description: 'Complete 5 SQL challenges',
    emoji: '📊',
    requirement: 'Complete 5 SQL levels',
    xpReward: 150
  },
  {
    id: 'sql-ach-003',
    name: 'Filter Expert',
    description: 'Master WHERE clause challenges',
    emoji: '🔍',
    requirement: 'Complete all WHERE category levels',
    xpReward: 200
  },
  {
    id: 'sql-ach-004',
    name: 'Aggregate Pro',
    description: 'Master aggregate functions',
    emoji: '📈',
    requirement: 'Complete all AGGREGATE category levels',
    xpReward: 250
  },
  {
    id: 'sql-ach-005',
    name: 'Join Specialist',
    description: 'Complete all JOIN challenges',
    emoji: '🔗',
    requirement: 'Complete all JOIN category levels',
    xpReward: 300
  },
  {
    id: 'sql-ach-006',
    name: 'SQL Master',
    description: 'Complete all SQL challenges',
    emoji: '🏆',
    requirement: 'Complete all 20 SQL levels',
    xpReward: 1000
  }
];

// ==================== HELPER FUNCTIONS ====================

export const getSQLLevelById = (id: number): SQLLevel | undefined => {
  return sqlLevels.find(level => level.id === id);
};

export const getSQLLevelsByCategory = (category: string): SQLLevel[] => {
  return sqlLevels.filter(level => level.category === category);
};

export const getSQLLevelsByDifficulty = (difficulty: string): SQLLevel[] => {
  return sqlLevels.filter(level => level.difficulty === difficulty);
};

export const getTotalSQLXP = (): number => {
  return sqlLevels.reduce((total, level) => total + level.xpReward, 0);
};
