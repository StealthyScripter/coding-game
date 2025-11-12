import React, { useState } from 'react';
import {
  Terminal, Target, Lightbulb, BookOpen, Play,
  RefreshCw, CheckCircle, XCircle, ChevronLeft, Award,
  Folder, File
} from 'lucide-react';

interface Level {
  id: number;
  title: string;
  task: string;
  hint: string;
  concept: string;
  solution: string[];
  fileSystem: Array<{
    name: string;
    type: 'file' | 'folder';
    permissions?: string;
    size?: string;
  }>;
  currentPath: string;
}

interface LinuxGameProps {
  onBack: () => void;
  onComplete: (xp: number) => void;
}

const LinuxGame: React.FC<LinuxGameProps> = ({ onBack, onComplete }) => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showConcept, setShowConcept] = useState(false);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);

  const levels: Level[] = [
    {
      id: 1,
      title: "List Directory Contents",
      task: "List all files and folders in the current directory",
      hint: "Use the 'ls' command",
      concept: "ls lists directory contents. Use 'ls -l' for detailed view, 'ls -a' to show hidden files.",
      solution: ["ls", "ls -l", "ls -a", "ls -la"],
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
      currentPath: "/home/user/scripts",
      fileSystem: [
        { name: "deploy.sh", type: "file", permissions: "-rw-r--r--", size: "2048" },
        { name: "backup.sh", type: "file", permissions: "-rwxr-xr-x", size: "1536" },
        { name: "setup.sh", type: "file", permissions: "-rw-r--r--", size: "3072" }
      ]
    }
  ];

  const level = levels[currentLevel - 1];

  const handleSubmit = () => {
    const normalized = userInput.trim().toLowerCase();
    const isCorrect = level.solution.some(sol => normalized === sol.toLowerCase());

    if (isCorrect) {
      setFeedback({ type: 'success', message: '🎉 Perfect! +100 XP' });

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
            <Terminal className="w-8 h-8 text-emerald-500" />
            Linux Level {currentLevel}: {level.title}
          </h2>
          <p className="text-gray-400 mt-2">Master the command line one step at a time!</p>
        </div>
        <div className="flex gap-2">
          {levels.map((l) => (
            <div
              key={l.id}
              className={`w-3 h-3 rounded-full transition-all ${
                completedLevels.includes(l.id) ? 'bg-green-500' :
                l.id === currentLevel ? 'bg-gradient-to-r from-emerald-500 to-teal-500 animate-pulse scale-125' :
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
            <Target className="w-5 h-5 text-emerald-500" />
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
                <p className="text-sm text-gray-300">{level.hint}</p>
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

        {/* File System View */}
        <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Terminal className="w-5 h-5 text-green-500" />
            <h3 className="text-xl font-bold text-emerald-400 font-mono">{level.currentPath}</h3>
          </div>
          <div className="space-y-2 bg-black/30 rounded-xl p-4">
            {level.fileSystem.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-2 rounded hover:bg-white/5 transition-colors font-mono text-sm"
              >
                {item.type === 'folder' ? (
                  <Folder className="w-5 h-5 text-blue-400" />
                ) : (
                  <File className="w-5 h-5 text-gray-400" />
                )}
                <span className="text-yellow-400 w-24">{item.permissions || 'drwxr-xr-x'}</span>
                <span className="text-cyan-400 w-16">{item.size || '4096'}</span>
                <span className="text-white">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Terminal */}
      <div className="rounded-3xl bg-[#1a1a2e] border border-white/10 overflow-hidden mb-6">
        <div className="bg-[#252538] px-4 py-3 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="ml-auto text-gray-400 text-sm font-mono">Terminal</span>
        </div>
        <div className="p-6 flex items-center gap-2">
          <span className="text-green-400 font-mono">user@codequest:{level.currentPath}$</span>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="type command here..."
            className="flex-1 bg-transparent border-none outline-none text-lg font-mono text-gray-100 placeholder-gray-600"
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
          }}
          className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 font-semibold flex items-center gap-2 transition-all hover:scale-105"
        >
          <RefreshCw className="w-4 h-4" />
          Reset
        </button>
        <button
          onClick={handleSubmit}
          className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 font-semibold flex items-center gap-2 transform hover:scale-105 transition-all shadow-lg shadow-emerald-500/50"
        >
          <Play className="w-4 h-4" />
          Execute
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

export default LinuxGame;
