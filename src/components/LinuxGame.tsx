import React, { useState, useEffect} from 'react';
import type { JSX } from 'react';
import { 
  Terminal, Folder, File, Home, CheckCircle, 
  XCircle, Lightbulb, RefreshCw, Play, Book, FolderOpen,
  FileText, Image, Code, Archive, HardDrive
} from 'lucide-react';

interface FileSystemItem {
  name: string;
  type: 'file' | 'folder';
  size: string;
  permissions: string;
  owner: string;
  modified: string;
  icon: JSX.Element;
  color: string;
  children?: FileSystemItem[];
  isHidden?: boolean;
  isNew?: boolean;
  isHighlighted?: boolean;
}

interface LinuxLevel {
  id: number;
  title: string;
  description: string;
  hint: string;
  solution: string | string[];
  concept: {
    title: string;
    content: string;
  };
  visualData: {
    currentPath: string;
    fileSystem: FileSystemItem[];
    terminalHistory?: string[];
    expectedResult?: {
      type: 'navigation' | 'creation' | 'deletion' | 'modification' | 'listing';
      target: string;
    };
  };
}

interface Feedback {
  type: 'success' | 'error' | 'warning';
  message: string;
}

interface TerminalOutput {
  command: string;
  output: string;
  type: 'command' | 'result' | 'error';
  timestamp: Date;
}

const LinuxGame: React.FC = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showConcept, setShowConcept] = useState(false);
  const [terminalHistory, setTerminalHistory] = useState<TerminalOutput[]>([]);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  const [currentPath, setCurrentPath] = useState('/home/user');
  const [fileSystemState, setFileSystemState] = useState<FileSystemItem[]>([]);

  const levels: LinuxLevel[] = [
    {
      id: 1,
      title: "Navigate to Home",
      description: "Use the cd command to navigate to your home directory",
      hint: "Use cd ~ or cd /home/user",
      solution: ["cd ~", "cd /home/user", "cd"],
      concept: {
        title: "Navigation with cd",
        content: "The cd (change directory) command is used to navigate the filesystem. 'cd ~' or just 'cd' takes you to your home directory. 'cd ..' moves up one level, and 'cd /' goes to the root directory."
      },
      visualData: {
        currentPath: "/var/www",
        fileSystem: [
          {
            name: "home",
            type: "folder",
            size: "4.0K",
            permissions: "drwxr-xr-x",
            owner: "root",
            modified: "Dec 1 10:00",
            icon: <Home className="w-5 h-5" />,
            color: "#10B981",
            isHighlighted: true,
            children: [
              {
                name: "user",
                type: "folder",
                size: "4.0K",
                permissions: "drwxr-xr-x",
                owner: "user",
                modified: "Dec 1 10:00",
                icon: <Folder className="w-5 h-5" />,
                color: "#3B82F6"
              }
            ]
          },
          {
            name: "var",
            type: "folder",
            size: "4.0K",
            permissions: "drwxr-xr-x",
            owner: "root",
            modified: "Dec 1 09:00",
            icon: <Folder className="w-5 h-5" />,
            color: "#8B5CF6",
            children: [
              {
                name: "www",
                type: "folder",
                size: "4.0K",
                permissions: "drwxr-xr-x",
                owner: "www-data",
                modified: "Dec 1 09:30",
                icon: <FolderOpen className="w-5 h-5" />,
                color: "#EF4444"
              }
            ]
          }
        ],
        expectedResult: {
          type: "navigation",
          target: "/home/user"
        }
      }
    },
    {
      id: 2,
      title: "List Hidden Files",
      description: "Display all files including hidden ones in the current directory",
      hint: "Use ls with the -a flag",
      solution: ["ls -a", "ls -la", "ls -al"],
      concept: {
        title: "Listing Files with ls",
        content: "The ls command lists directory contents. Use -a to show hidden files (those starting with .), -l for detailed view, and combine them with -la or -al for both features."
      },
      visualData: {
        currentPath: "/home/user",
        fileSystem: [
          {
            name: ".bashrc",
            type: "file",
            size: "3.7K",
            permissions: "-rw-r--r--",
            owner: "user",
            modified: "Nov 28 14:22",
            icon: <FileText className="w-5 h-5" />,
            color: "#059669",
            isHidden: true
          },
          {
            name: ".ssh",
            type: "folder",
            size: "4.0K",
            permissions: "drwx------",
            owner: "user",
            modified: "Nov 25 09:15",
            icon: <Folder className="w-5 h-5" />,
            color: "#DC2626",
            isHidden: true
          },
          {
            name: "Documents",
            type: "folder",
            size: "4.0K",
            permissions: "drwxr-xr-x",
            owner: "user",
            modified: "Dec 1 11:00",
            icon: <Folder className="w-5 h-5" />,
            color: "#2563EB"
          },
          {
            name: "Pictures",
            type: "folder",
            size: "4.0K",
            permissions: "drwxr-xr-x",
            owner: "user",
            modified: "Nov 30 16:45",
            icon: <Image className="w-5 h-5" />,
            color: "#7C3AED"
          }
        ],
        expectedResult: {
          type: "listing",
          target: "hidden"
        }
      }
    },
    {
      id: 3,
      title: "Create Project Directory",
      description: "Create a new directory called 'my-project' in the current directory",
      hint: "Use mkdir command",
      solution: ["mkdir my-project", "mkdir ./my-project"],
      concept: {
        title: "Creating Directories",
        content: "mkdir creates new directories. Use mkdir -p to create parent directories as needed. You can create multiple directories at once: mkdir dir1 dir2 dir3"
      },
      visualData: {
        currentPath: "/home/user/Documents",
        fileSystem: [
          {
            name: "work",
            type: "folder",
            size: "4.0K",
            permissions: "drwxr-xr-x",
            owner: "user",
            modified: "Dec 1 09:00",
            icon: <Folder className="w-5 h-5" />,
            color: "#16A34A"
          },
          {
            name: "notes.txt",
            type: "file",
            size: "2.1K",
            permissions: "-rw-r--r--",
            owner: "user",
            modified: "Nov 30 15:30",
            icon: <FileText className="w-5 h-5" />,
            color: "#0891B2"
          }
        ],
        expectedResult: {
          type: "creation",
          target: "my-project"
        }
      }
    },
    {
      id: 4,
      title: "Copy Configuration File",
      description: "Copy the config.json file to backup-config.json",
      hint: "Use cp command",
      solution: ["cp config.json backup-config.json", "cp ./config.json ./backup-config.json"],
      concept: {
        title: "Copying Files",
        content: "cp copies files and directories. Use cp -r for directories (recursive), cp -i for interactive mode (asks before overwriting), and cp -p to preserve attributes."
      },
      visualData: {
        currentPath: "/home/user/project",
        fileSystem: [
          {
            name: "config.json",
            type: "file",
            size: "1.5K",
            permissions: "-rw-r--r--",
            owner: "user",
            modified: "Dec 1 10:30",
            icon: <Code className="w-5 h-5" />,
            color: "#EA580C",
            isHighlighted: true
          },
          {
            name: "src",
            type: "folder",
            size: "4.0K",
            permissions: "drwxr-xr-x",
            owner: "user",
            modified: "Dec 1 11:00",
            icon: <Folder className="w-5 h-5" />,
            color: "#3730A3"
          },
          {
            name: "package.json",
            type: "file",
            size: "2.3K",
            permissions: "-rw-r--r--",
            owner: "user",
            modified: "Nov 30 14:20",
            icon: <FileText className="w-5 h-5" />,
            color: "#059669"
          }
        ],
        expectedResult: {
          type: "creation",
          target: "backup-config.json"
        }
      }
    },
    {
      id: 5,
      title: "Change File Permissions",
      description: "Make the script.sh file executable for the owner",
      hint: "Use chmod with +x flag",
      solution: ["chmod +x script.sh", "chmod u+x script.sh", "chmod 755 script.sh"],
      concept: {
        title: "File Permissions",
        content: "chmod changes file permissions. Use +x to add execute permission, u+x for user only. Numeric mode: 7=rwx, 5=r-x, 4=r--. Example: chmod 755 file gives rwxr-xr-x"
      },
      visualData: {
        currentPath: "/home/user/scripts",
        fileSystem: [
          {
            name: "script.sh",
            type: "file",
            size: "856",
            permissions: "-rw-r--r--",
            owner: "user",
            modified: "Dec 1 12:00",
            icon: <FileText className="w-5 h-5" />,
            color: "#DC2626",
            isHighlighted: true
          },
          {
            name: "backup.sh",
            type: "file",
            size: "1.2K",
            permissions: "-rwxr-xr-x",
            owner: "user",
            modified: "Nov 29 10:00",
            icon: <FileText className="w-5 h-5" />,
            color: "#059669"
          }
        ],
        expectedResult: {
          type: "modification",
          target: "script.sh"
        }
      }
    },
    {
      id: 6,
      title: "Find Large Files",
      description: "Find all files larger than 10MB in the current directory and subdirectories",
      hint: "Use find command with -size option",
      solution: ["find . -size +10M", "find . -size +10M -type f"],
      concept: {
        title: "Finding Files",
        content: "The find command searches for files and directories. Use -size for file size (+10M = larger than 10MB), -name for filename patterns, -type f for files only, -type d for directories only."
      },
      visualData: {
        currentPath: "/home/user/Downloads",
        fileSystem: [
          {
            name: "video.mp4",
            type: "file",
            size: "45.2M",
            permissions: "-rw-r--r--",
            owner: "user",
            modified: "Dec 1 08:30",
            icon: <File className="w-5 h-5" />,
            color: "#7C3AED",
            isHighlighted: true
          },
          {
            name: "document.pdf",
            type: "file",
            size: "2.3M",
            permissions: "-rw-r--r--",
            owner: "user",
            modified: "Nov 30 14:15",
            icon: <FileText className="w-5 h-5" />,
            color: "#DC2626"
          },
          {
            name: "backup.tar.gz",
            type: "file",
            size: "128.5M",
            permissions: "-rw-r--r--",
            owner: "user",
            modified: "Nov 28 22:00",
            icon: <Archive className="w-5 h-5" />,
            color: "#EA580C",
            isHighlighted: true
          },
          {
            name: "images",
            type: "folder",
            size: "4.0K",
            permissions: "drwxr-xr-x",
            owner: "user",
            modified: "Dec 1 10:00",
            icon: <Folder className="w-5 h-5" />,
            color: "#3B82F6",
            children: [
              {
                name: "wallpaper.jpg",
                type: "file",
                size: "15.8M",
                permissions: "-rw-r--r--",
                owner: "user",
                modified: "Nov 29 16:00",
                icon: <Image className="w-5 h-5" />,
                color: "#10B981",
                isHighlighted: true
              }
            ]
          }
        ],
        expectedResult: {
          type: "listing",
          target: "large-files"
        }
      }
    }
  ];

  const currentLevelData = levels[currentLevel - 1];

  // Initialize file system state
  useEffect(() => {
    setFileSystemState(currentLevelData.visualData.fileSystem);
    setCurrentPath(currentLevelData.visualData.currentPath);
  }, [currentLevel]);

  // Load progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('linuxGameProgress');
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setCompletedLevels(progress.completedLevels || []);
    }
  }, []);

  // Save progress
  const saveProgress = () => {
    localStorage.setItem('linuxGameProgress', JSON.stringify({
      completedLevels
    }));
  };

  const simulateCommand = (command: string): string => {
    const cmd = command.trim();
    const expectedResult = currentLevelData.visualData.expectedResult;
    console.log("Linuxgame 432", expectedResult)
    
    // Basic command simulation
    if (cmd.startsWith('ls')) {
      if (cmd.includes('-a') || cmd.includes('-la') || cmd.includes('-al')) {
        const allFiles = fileSystemState.map(item => 
          `${item.permissions} ${item.owner} ${item.size} ${item.modified} ${item.name}`
        ).join('\n');
        return `total ${fileSystemState.length}\n${allFiles}`;
      }
      const visibleFiles = fileSystemState
        .filter(item => !item.isHidden)
        .map(item => item.name)
        .join('  ');
      return visibleFiles;
    }
    
    if (cmd.startsWith('cd')) {
      const target = cmd.split(' ')[1] || '~';
      if (target === '~' || target === '/home/user') {
        setCurrentPath('/home/user');
        return '';
      }
      if (target === '..') {
        const newPath = currentPath.split('/').slice(0, -1).join('/') || '/';
        setCurrentPath(newPath);
        return '';
      }
      return `cd: ${target}: No such file or directory`;
    }
    
    if (cmd.startsWith('mkdir')) {
      const dirName = cmd.split(' ')[1];
      if (dirName) {
        setFileSystemState([...fileSystemState, {
          name: dirName,
          type: "folder",
          size: "4.0K",
          permissions: "drwxr-xr-x",
          owner: "user",
          modified: "Just now",
          icon: <Folder className="w-5 h-5" />,
          color: "#10B981",
          isNew: true
        }]);
        return '';
      }
      return 'mkdir: missing operand';
    }
    
    if (cmd.startsWith('cp')) {
      const parts = cmd.split(' ');
      if (parts.length === 3) {
        const source = parts[1];
        const dest = parts[2];
        const sourceFile = fileSystemState.find(item => item.name === source);
        if (sourceFile && sourceFile.type === 'file') {
          setFileSystemState([...fileSystemState, {
            ...sourceFile,
            name: dest,
            isNew: true,
            color: "#10B981"
          }]);
          return '';
        }
        return `cp: cannot stat '${source}': No such file or directory`;
      }
      return 'cp: missing file operand';
    }
    
    if (cmd.startsWith('find')) {
      if (cmd.includes('-size +10M')) {
        const largeFiles = fileSystemState
          .filter(item => {
            const sizeNum = parseFloat(item.size);
            const sizeUnit = item.size.slice(-1);
            return sizeUnit === 'M' && sizeNum > 10;
          })
          .map(item => `./${item.name}`)
          .join('\n');
        return largeFiles || 'No files found';
      }
    }
    
    return `${cmd}: command not found`;
  };

  const executeCommand = (command: string) => {
    const output = simulateCommand(command);
    const newHistoryItem: TerminalOutput = {
      command,
      output,
      type: output.includes('command not found') || output.includes('No such file') ? 'error' : 'result',
      timestamp: new Date()
    };
    
    setTerminalHistory([...terminalHistory, newHistoryItem]);
    
    // Check if command is correct
    const solutions = Array.isArray(currentLevelData.solution) 
      ? currentLevelData.solution 
      : [currentLevelData.solution];
    
    const isCorrect = solutions.some(solution => 
      command.trim().toLowerCase() === solution.toLowerCase()
    );
    
    if (isCorrect) {
      setFeedback({ type: 'success', message: 'Excellent! Command executed successfully!' });
      
      if (!completedLevels.includes(currentLevel)) {
        const newCompletedLevels = [...completedLevels, currentLevel];
        setCompletedLevels(newCompletedLevels);
        saveProgress();
      }
      
      setTimeout(() => {
        if (currentLevel < levels.length) {
          setCurrentLevel(currentLevel + 1);
          setUserInput('');
          setFeedback(null);
          setTerminalHistory([]);
          setShowHint(false);
        }
      }, 2500);
    } else {
      setFeedback({ type: 'error', message: 'Not quite right. Try again!' });
    }
  };

  const renderFileSystem = () => {
    return (
      <div className="bg-gray-900 text-gray-100 rounded-xl p-6 font-mono">
        <div className="flex items-center gap-2 mb-4 text-green-400">
          <Terminal className="w-5 h-5" />
          <span>{currentPath}</span>
        </div>
        
        <div className="space-y-2">
          {fileSystemState.map((item, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-3 p-2 rounded transition-all ${
                item.isHighlighted ? 'bg-yellow-900/30 border border-yellow-600' : ''
              } ${item.isNew ? 'bg-green-900/30 animate-pulse' : ''} hover:bg-gray-800`}
            >
              <div style={{ color: item.color }}>{item.icon}</div>
              <div className="flex-1 grid grid-cols-5 gap-4 text-sm">
                <span className="text-blue-400">{item.permissions}</span>
                <span className="text-green-400">{item.owner}</span>
                <span className="text-yellow-400">{item.size}</span>
                <span className="text-gray-400">{item.modified}</span>
                <span className={`${item.isHidden ? 'text-gray-500' : 'text-gray-100'}`}>
                  {item.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderTerminal = () => {
    return (
      <div className="bg-black text-gray-100 rounded-xl p-6 font-mono h-full">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-gray-400 text-sm">Terminal</span>
        </div>
        
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {terminalHistory.map((item, idx) => (
            <div key={idx}>
              <div className="text-green-400">
                {currentPath}$ {item.command}
              </div>
              {item.output && (
                <div className={item.type === 'error' ? 'text-red-400' : 'text-gray-300'}>
                  {item.output.split('\n').map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="flex items-center gap-2">
            <span className="text-green-400">{currentPath}$</span>
            <span className="animate-pulse">_</span>
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
            className="h-full bg-gradient-to-r from-emerald-500 to-green-600 transition-all duration-500"
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
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Terminal className="w-6 h-6 text-green-600" />
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
        {/* File System View */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
            <HardDrive className="w-5 h-5" />
            File System
          </h3>
          {renderFileSystem()}
        </div>
        
        {/* Terminal */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
            <Terminal className="w-5 h-5" />
            Terminal Output
          </h3>
          {renderTerminal()}
        </div>
      </div>

      {/* Command Input */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex gap-4 items-center">
          <div className="flex-1 bg-black rounded-lg px-4 py-3 flex items-center gap-2 font-mono">
            <span className="text-green-400">{currentPath}$</span>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && executeCommand(userInput)}
              placeholder="Type your command here..."
              className="flex-1 bg-transparent text-gray-100 outline-none"
            />
          </div>
          <button
            onClick={() => executeCommand(userInput)}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 font-semibold"
          >
            <Play className="w-5 h-5" />
            Execute
          </button>
          <button
            onClick={() => {
              setUserInput('');
              setFeedback(null);
              setTerminalHistory([]);
            }}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2 font-semibold"
          >
            <RefreshCw className="w-5 h-5" />
            Clear
          </button>
        </div>
        
        {feedback && (
          <div className={`mt-4 p-4 rounded-lg flex items-center gap-2 ${
            feedback.type === 'success' ? 'bg-green-100 text-green-800' : 
            feedback.type === 'error' ? 'bg-red-100 text-red-800' :
            'bg-yellow-100 text-yellow-800'
          }`}>
            {feedback.type === 'success' && <CheckCircle className="w-5 h-5" />}
            {feedback.type === 'error' && <XCircle className="w-5 h-5" />}
            {feedback.message}
          </div>
        )}
      </div>

      {/* Level Selector */}
      <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Level Selection</h3>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {levels.map((level) => (
            <button
              key={level.id}
              onClick={() => {
                setCurrentLevel(level.id);
                setUserInput('');
                setFeedback(null);
                setTerminalHistory([]);
              }}
              className={`p-4 rounded-lg font-semibold transition-all ${
                currentLevel === level.id 
                  ? 'bg-green-600 text-white shadow-lg transform scale-105' 
                  : completedLevels.includes(level.id)
                  ? 'bg-green-100 text-green-800 hover:bg-green-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {completedLevels.includes(level.id) && (
                <CheckCircle className="w-5 h-5 mx-auto mb-1" />
              )}
              <div>Level {level.id}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LinuxGame;