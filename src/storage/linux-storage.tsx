export interface LinuxLevel {
  id: number;
  title: string;
  task: string;
  hint: string;
  concept: string;
  solution: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  xpReward: number;
  fileSystem: Array<{
    name: string;
    type: 'file' | 'folder';
    permissions?: string;
    size?: string;
  }>;
  currentPath: string;
}

export interface LinuxLearningMaterial {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  prerequisites: string[];
}

export interface LinuxAchievement {
  id: string;
  name: string;
  description: string;
  emoji: string;
  requirement: string;
  xpReward: number;
}

// ==================== LINUX LEVELS ====================

export const linuxLevels: LinuxLevel[] = [
  {
    id: 1,
    title: "List Directory Contents",
    task: "List all files and folders in the current directory",
    hint: "Use the 'ls' command",
    concept: "ls lists directory contents. Use 'ls -l' for detailed view, 'ls -a' to show hidden files.",
    solution: ["ls", "ls -l", "ls -a", "ls -la"],
    difficulty: 'beginner',
    category: 'Navigation',
    xpReward: 100,
    currentPath: "/home/user",
    fileSystem: [
      { name: "Documents", type: "folder", permissions: "drwxr-xr-x", size: "4096" },
      { name: "Downloads", type: "folder", permissions: "drwxr-xr-x", size: "4096" },
      { name: "Pictures", type: "folder", permissions: "drwxr-xr-x", size: "4096" },
      { name: "notes.txt", type: "file", permissions: "-rw-r--r--", size: "2048" },
      { name: "script.sh", type: "file", permissions: "-rwxr-xr-x", size: "1024" }
    ]
  },
  {
    id: 2,
    title: "Change Directory",
    task: "Navigate to the Documents folder",
    hint: "Use 'cd' followed by the directory name",
    concept: "cd changes directory. 'cd ..' moves up one level, 'cd ~' goes to home.",
    solution: ["cd Documents", "cd ./Documents"],
    difficulty: 'beginner',
    category: 'Navigation',
    xpReward: 100,
    currentPath: "/home/user",
    fileSystem: [
      { name: "Documents", type: "folder", permissions: "drwxr-xr-x", size: "4096" },
      { name: "Downloads", type: "folder", permissions: "drwxr-xr-x", size: "4096" },
      { name: "Pictures", type: "folder", permissions: "drwxr-xr-x", size: "4096" }
    ]
  },
  {
    id: 3,
    title: "Create a Directory",
    task: "Create a new folder called 'projects'",
    hint: "Use 'mkdir' command",
    concept: "mkdir creates directories. Use 'mkdir -p' to create parent directories if needed.",
    solution: ["mkdir projects", "mkdir ./projects"],
    difficulty: 'beginner',
    category: 'File Operations',
    xpReward: 100,
    currentPath: "/home/user",
    fileSystem: [
      { name: "Documents", type: "folder", permissions: "drwxr-xr-x", size: "4096" },
      { name: "Downloads", type: "folder", permissions: "drwxr-xr-x", size: "4096" }
    ]
  },
  {
    id: 4,
    title: "Copy Files",
    task: "Copy 'config.txt' to 'config_backup.txt'",
    hint: "Use 'cp source destination'",
    concept: "cp copies files. Use 'cp -r' for directories. Syntax: cp source destination",
    solution: ["cp config.txt config_backup.txt", "cp ./config.txt ./config_backup.txt"],
    difficulty: 'beginner',
    category: 'File Operations',
    xpReward: 100,
    currentPath: "/home/user",
    fileSystem: [
      { name: "config.txt", type: "file", permissions: "-rw-r--r--", size: "512" },
      { name: "data.json", type: "file", permissions: "-rw-r--r--", size: "1024" },
      { name: "README.md", type: "file", permissions: "-rw-r--r--", size: "2048" }
    ]
  },
  {
    id: 5,
    title: "Change Permissions",
    task: "Make 'deploy.sh' executable",
    hint: "Use 'chmod +x filename'",
    concept: "chmod changes file permissions. +x adds execute, -x removes it. Use 'chmod 755' for rwxr-xr-x",
    solution: ["chmod +x deploy.sh", "chmod u+x deploy.sh"],
    difficulty: 'intermediate',
    category: 'Permissions',
    xpReward: 150,
    currentPath: "/home/user/scripts",
    fileSystem: [
      { name: "deploy.sh", type: "file", permissions: "-rw-r--r--", size: "2048" },
      { name: "backup.sh", type: "file", permissions: "-rwxr-xr-x", size: "1536" },
      { name: "setup.sh", type: "file", permissions: "-rw-r--r--", size: "3072" }
    ]
  },
  {
    id: 6,
    title: "Move/Rename Files",
    task: "Rename 'old_file.txt' to 'new_file.txt'",
    hint: "Use 'mv' command",
    concept: "mv moves or renames files. Syntax: mv source destination",
    solution: ["mv old_file.txt new_file.txt", "mv ./old_file.txt ./new_file.txt"],
    difficulty: 'beginner',
    category: 'File Operations',
    xpReward: 100,
    currentPath: "/home/user",
    fileSystem: [
      { name: "old_file.txt", type: "file", permissions: "-rw-r--r--", size: "1024" },
      { name: "data.txt", type: "file", permissions: "-rw-r--r--", size: "2048" }
    ]
  },
  {
    id: 7,
    title: "Remove Files",
    task: "Delete the file 'temp.txt'",
    hint: "Use 'rm' command",
    concept: "rm removes files. Use 'rm -r' for directories. Be careful, it's permanent!",
    solution: ["rm temp.txt", "rm ./temp.txt"],
    difficulty: 'beginner',
    category: 'File Operations',
    xpReward: 100,
    currentPath: "/home/user",
    fileSystem: [
      { name: "temp.txt", type: "file", permissions: "-rw-r--r--", size: "512" },
      { name: "important.txt", type: "file", permissions: "-rw-r--r--", size: "1024" },
      { name: "notes.txt", type: "file", permissions: "-rw-r--r--", size: "2048" }
    ]
  },
  {
    id: 8,
    title: "View File Contents",
    task: "Display the contents of 'readme.txt'",
    hint: "Use 'cat' command",
    concept: "cat displays file contents. Use 'less' or 'more' for large files, 'head' or 'tail' for partial views.",
    solution: ["cat readme.txt", "cat ./readme.txt"],
    difficulty: 'beginner',
    category: 'File Operations',
    xpReward: 100,
    currentPath: "/home/user",
    fileSystem: [
      { name: "readme.txt", type: "file", permissions: "-rw-r--r--", size: "1024" },
      { name: "notes.txt", type: "file", permissions: "-rw-r--r--", size: "2048" }
    ]
  },
  {
    id: 9,
    title: "Search File Contents",
    task: "Search for 'error' in log.txt",
    hint: "Use 'grep error log.txt'",
    concept: "grep searches text. Syntax: grep pattern file. Use -i for case-insensitive, -r for recursive.",
    solution: ["grep error log.txt", "grep 'error' log.txt"],
    difficulty: 'intermediate',
    category: 'Text Processing',
    xpReward: 150,
    currentPath: "/home/user/logs",
    fileSystem: [
      { name: "log.txt", type: "file", permissions: "-rw-r--r--", size: "5120" },
      { name: "access.log", type: "file", permissions: "-rw-r--r--", size: "10240" }
    ]
  },
  {
    id: 10,
    title: "Pipe Commands",
    task: "List files and count them using pipe",
    hint: "Use 'ls | wc -l'",
    concept: "Pipes (|) connect commands. Output of first becomes input of second. Great for chaining operations.",
    solution: ["ls | wc -l", "ls -1 | wc -l"],
    difficulty: 'intermediate',
    category: 'Pipes',
    xpReward: 150,
    currentPath: "/home/user",
    fileSystem: [
      { name: "file1.txt", type: "file", permissions: "-rw-r--r--", size: "1024" },
      { name: "file2.txt", type: "file", permissions: "-rw-r--r--", size: "2048" },
      { name: "file3.txt", type: "file", permissions: "-rw-r--r--", size: "512" }
    ]
  },
  {
    id: 11,
    title: "Find Files",
    task: "Find all .txt files in current directory",
    hint: "Use 'find . -name \"*.txt\"'",
    concept: "find searches for files by name, type, size, date. Very powerful for locating files.",
    solution: ["find . -name \"*.txt\"", "find . -name '*.txt'"],
    difficulty: 'intermediate',
    category: 'File Operations',
    xpReward: 150,
    currentPath: "/home/user",
    fileSystem: [
      { name: "notes.txt", type: "file", permissions: "-rw-r--r--", size: "1024" },
      { name: "data.json", type: "file", permissions: "-rw-r--r--", size: "2048" },
      { name: "readme.txt", type: "file", permissions: "-rw-r--r--", size: "512" }
    ]
  },
  {
    id: 12,
    title: "Redirect Output",
    task: "Save ls output to files.txt",
    hint: "Use 'ls > files.txt'",
    concept: "> redirects output to file (overwrites). >> appends. 2> redirects errors.",
    solution: ["ls > files.txt", "ls -1 > files.txt"],
    difficulty: 'intermediate',
    category: 'Redirection',
    xpReward: 150,
    currentPath: "/home/user",
    fileSystem: [
      { name: "file1.txt", type: "file", permissions: "-rw-r--r--", size: "1024" },
      { name: "file2.txt", type: "file", permissions: "-rw-r--r--", size: "2048" }
    ]
  },
  {
    id: 13,
    title: "Change Ownership",
    task: "Change owner of file.txt to user 'john'",
    hint: "Use 'chown john file.txt'",
    concept: "chown changes file ownership. Format: chown user:group file. Often requires sudo.",
    solution: ["chown john file.txt", "sudo chown john file.txt"],
    difficulty: 'advanced',
    category: 'Permissions',
    xpReward: 200,
    currentPath: "/home/user",
    fileSystem: [
      { name: "file.txt", type: "file", permissions: "-rw-r--r--", size: "1024" }
    ]
  },
  {
    id: 14,
    title: "Process Management",
    task: "Show all running processes",
    hint: "Use 'ps aux' or just 'ps'",
    concept: "ps shows processes. aux shows all processes with details. Use 'top' for real-time monitoring.",
    solution: ["ps aux", "ps", "ps -ef"],
    difficulty: 'intermediate',
    category: 'Processes',
    xpReward: 150,
    currentPath: "/home/user",
    fileSystem: []
  },
  {
    id: 15,
    title: "Disk Usage",
    task: "Show disk usage of current directory in human-readable format",
    hint: "Use 'du -h'",
    concept: "du shows disk usage. -h makes it human-readable (KB, MB, GB). df shows filesystem disk space.",
    solution: ["du -h", "du -h ."],
    difficulty: 'intermediate',
    category: 'System Info',
    xpReward: 150,
    currentPath: "/home/user",
    fileSystem: [
      { name: "Documents", type: "folder", permissions: "drwxr-xr-x", size: "4096" },
      { name: "Downloads", type: "folder", permissions: "drwxr-xr-x", size: "8192" },
      { name: "large_file.dat", type: "file", permissions: "-rw-r--r--", size: "102400" }
    ]
  }
];

// ==================== LEARNING MATERIALS ====================

export const linuxLearningMaterials: LinuxLearningMaterial[] = [
  {
    id: 'linux-learn-001',
    title: 'Linux Basics',
    description: 'Introduction to the Linux operating system',
    content: 'Linux is a Unix-like operating system. The terminal (shell) lets you control the system with text commands.',
    category: 'Basics',
    level: 'beginner',
    prerequisites: []
  },
  {
    id: 'linux-learn-002',
    title: 'File System Navigation',
    description: 'Moving around the directory structure',
    content: 'Use pwd (print working directory), cd (change directory), and ls (list) to navigate. / is root, ~ is home.',
    category: 'Navigation',
    level: 'beginner',
    prerequisites: ['linux-learn-001']
  },
  {
    id: 'linux-learn-003',
    title: 'File Operations',
    description: 'Create, copy, move, and delete files',
    content: 'mkdir creates directories, touch creates files, cp copies, mv moves/renames, rm deletes. Use -r for recursive operations.',
    category: 'File Operations',
    level: 'beginner',
    prerequisites: ['linux-learn-002']
  },
  {
    id: 'linux-learn-004',
    title: 'File Permissions',
    description: 'Understanding and changing permissions',
    content: 'Permissions: r (read), w (write), x (execute) for user, group, others. chmod changes permissions, chown changes ownership.',
    category: 'Permissions',
    level: 'intermediate',
    prerequisites: ['linux-learn-003']
  },
  {
    id: 'linux-learn-005',
    title: 'Text Processing',
    description: 'Work with text files',
    content: 'cat, less, more view files. grep searches text. sed edits streams. awk processes columns. head/tail show file parts.',
    category: 'Text Processing',
    level: 'intermediate',
    prerequisites: ['linux-learn-003']
  },
  {
    id: 'linux-learn-006',
    title: 'Pipes and Redirection',
    description: 'Connect and redirect commands',
    content: 'Pipes (|) chain commands. > redirects output (overwrites), >> appends. < reads input. 2> redirects errors.',
    category: 'Pipes',
    level: 'intermediate',
    prerequisites: ['linux-learn-003', 'linux-learn-005']
  },
  {
    id: 'linux-learn-007',
    title: 'Process Management',
    description: 'Monitor and control processes',
    content: 'ps lists processes, top monitors real-time, kill terminates processes. Use & to run in background, fg/bg to switch.',
    category: 'Processes',
    level: 'advanced',
    prerequisites: ['linux-learn-001']
  },
  {
    id: 'linux-learn-008',
    title: 'Shell Scripting',
    description: 'Automate tasks with scripts',
    content: 'Shell scripts (.sh) automate commands. Use variables, loops, conditionals. Start with #!/bin/bash shebang.',
    category: 'Scripting',
    level: 'advanced',
    prerequisites: ['linux-learn-003', 'linux-learn-006']
  }
];

// ==================== LINUX ACHIEVEMENTS ====================

export const linuxAchievements: LinuxAchievement[] = [
  {
    id: 'linux-ach-001',
    name: 'Terminal Newbie',
    description: 'Execute your first Linux command',
    emoji: '💻',
    requirement: 'Complete 1 Linux level',
    xpReward: 50
  },
  {
    id: 'linux-ach-002',
    name: 'Navigator',
    description: 'Master directory navigation',
    emoji: '🧭',
    requirement: 'Complete all Navigation category levels',
    xpReward: 200
  },
  {
    id: 'linux-ach-003',
    name: 'File Master',
    description: 'Master file operations',
    emoji: '📁',
    requirement: 'Complete all File Operations category levels',
    xpReward: 250
  },
  {
    id: 'linux-ach-004',
    name: 'Permission Pro',
    description: 'Master file permissions',
    emoji: '🔐',
    requirement: 'Complete all Permissions category levels',
    xpReward: 200
  },
  {
    id: 'linux-ach-005',
    name: 'Text Wizard',
    description: 'Master text processing',
    emoji: '📝',
    requirement: 'Complete all Text Processing category levels',
    xpReward: 250
  },
  {
    id: 'linux-ach-006',
    name: 'Pipe Dream',
    description: 'Master pipes and redirection',
    emoji: '🔀',
    requirement: 'Complete all Pipes category levels',
    xpReward: 300
  },
  {
    id: 'linux-ach-007',
    name: 'Linux Master',
    description: 'Complete all Linux challenges',
    emoji: '🏆',
    requirement: 'Complete all 15 Linux levels',
    xpReward: 1000
  }
];

// ==================== HELPER FUNCTIONS ====================

export const getLinuxLevelById = (id: number): LinuxLevel | undefined => {
  return linuxLevels.find(level => level.id === id);
};

export const getLinuxLevelsByCategory = (category: string): LinuxLevel[] => {
  return linuxLevels.filter(level => level.category === category);
};

export const getLinuxLevelsByDifficulty = (difficulty: string): LinuxLevel[] => {
  return linuxLevels.filter(level => level.difficulty === difficulty);
};

export const getTotalLinuxXP = (): number => {
  return linuxLevels.reduce((total, level) => total + level.xpReward, 0);
};
