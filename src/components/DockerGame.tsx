import React, { useState } from 'react';
import {
  Package, Target, Lightbulb, BookOpen, Play,
  RefreshCw, CheckCircle, XCircle, ChevronLeft, Award,
  Box, Container
} from 'lucide-react';

interface Level {
  id: number;
  title: string;
  task: string;
  hint: string;
  concept: string;
  solution: string[];
  containers: Array<{
    name: string;
    image: string;
    status: string;
    ports?: string;
  }>;
  images: Array<{
    name: string;
    tag: string;
    size: string;
  }>;
}

interface DockerGameProps {
  onBack: () => void;
  onComplete: (xp: number) => void;
}

const DockerGame: React.FC<DockerGameProps> = ({ onBack, onComplete }) => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showConcept, setShowConcept] = useState(false);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);

  const levels: Level[] = [
    {
      id: 1,
      title: "Pull an Image",
      task: "Pull the nginx image from Docker Hub",
      hint: "Use 'docker pull nginx'",
      concept: "Images are templates for containers. Pull downloads them from Docker Hub registry.",
      solution: ["docker pull nginx", "docker pull nginx:latest"],
      containers: [],
      images: [
        { name: "ubuntu", tag: "20.04", size: "72.8MB" },
        { name: "node", tag: "18", size: "910MB" }
      ]
    },
    {
      id: 2,
      title: "Run a Container",
      task: "Run nginx container named 'web' on port 8080",
      hint: "Use 'docker run -d --name web -p 8080:80 nginx'",
      concept: "-d runs detached, --name gives it a name, -p maps ports host:container",
      solution: [
        "docker run -d --name web -p 8080:80 nginx",
        "docker run --name web -d -p 8080:80 nginx"
      ],
      containers: [
        { name: "database", image: "postgres:13", status: "running", ports: "5432/tcp" }
      ],
      images: [
        { name: "nginx", tag: "latest", size: "133MB" },
        { name: "postgres", tag: "13", size: "314MB" }
      ]
    },
    {
      id: 3,
      title: "List Containers",
      task: "Show all running containers",
      hint: "Use 'docker ps'",
      concept: "'docker ps' shows running containers. Use 'docker ps -a' to see all containers.",
      solution: ["docker ps", "docker container ls"],
      containers: [
        { name: "web", image: "nginx:latest", status: "running", ports: "8080:80" },
        { name: "database", image: "postgres:13", status: "running", ports: "5432/tcp" },
        { name: "redis", image: "redis:alpine", status: "running", ports: "6379/tcp" }
      ],
      images: [
        { name: "nginx", tag: "latest", size: "133MB" },
        { name: "postgres", tag: "13", size: "314MB" },
        { name: "redis", tag: "alpine", size: "28MB" }
      ]
    },
    {
      id: 4,
      title: "Stop a Container",
      task: "Stop the container named 'web'",
      hint: "Use 'docker stop web'",
      concept: "'docker stop' gracefully stops a container. Use 'docker kill' for immediate stop.",
      solution: ["docker stop web", "docker container stop web"],
      containers: [
        { name: "web", image: "nginx:latest", status: "running", ports: "8080:80" },
        { name: "database", image: "postgres:13", status: "running", ports: "5432/tcp" }
      ],
      images: [
        { name: "nginx", tag: "latest", size: "133MB" },
        { name: "postgres", tag: "13", size: "314MB" }
      ]
    },
    {
      id: 5,
      title: "Build an Image",
      task: "Build an image from Dockerfile, tag it as 'myapp:v1'",
      hint: "Use 'docker build -t myapp:v1 .'",
      concept: "-t tags the image. The dot (.) specifies build context (current directory).",
      solution: ["docker build -t myapp:v1 .", "docker build -t myapp:v1 ./"],
      containers: [],
      images: [
        { name: "node", tag: "18", size: "910MB" },
        { name: "nginx", tag: "latest", size: "133MB" }
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
            <Package className="w-8 h-8 text-cyan-500" />
            Docker Level {currentLevel}: {level.title}
          </h2>
          <p className="text-gray-400 mt-2">Master container orchestration!</p>
        </div>
        <div className="flex gap-2">
          {levels.map((l) => (
            <div
              key={l.id}
              className={`w-3 h-3 rounded-full transition-all ${
                completedLevels.includes(l.id) ? 'bg-green-500' :
                l.id === currentLevel ? 'bg-gradient-to-r from-cyan-500 to-blue-500 animate-pulse scale-125' :
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
            <Target className="w-5 h-5 text-cyan-500" />
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
                  <p className="text-sm text-gray-300 mt-2 font-mono">{level.concept}</p>
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

        {/* Docker State View */}
        <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6">
          <div className="space-y-6">
            {/* Containers */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Container className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-bold">Running Containers</h3>
              </div>
              {level.containers.length > 0 ? (
                <div className="space-y-2">
                  {level.containers.map((container, idx) => (
                    <div
                      key={idx}
                      className="bg-black/30 rounded-xl p-3 font-mono text-sm"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-cyan-400">{container.name}</span>
                        <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                          {container.status}
                        </span>
                      </div>
                      <div className="text-gray-400 text-xs">
                        {container.image}
                      </div>
                      {container.ports && (
                        <div className="text-purple-400 text-xs mt-1">
                          Ports: {container.ports}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500 italic text-sm">No containers running</div>
              )}
            </div>

            {/* Images */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Box className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-bold">Available Images</h3>
              </div>
              <div className="space-y-2">
                {level.images.map((image, idx) => (
                  <div
                    key={idx}
                    className="bg-black/30 rounded-xl p-3 font-mono text-sm"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-purple-400">{image.name}</span>
                        <span className="text-gray-400">:{image.tag}</span>
                      </div>
                      <span className="text-xs text-gray-400">{image.size}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Terminal */}
      <div className="rounded-3xl bg-[#1a1a2e] border border-white/10 overflow-hidden mb-6">
        <div className="bg-[#252538] px-4 py-3 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="ml-auto text-gray-400 text-sm font-mono">Docker CLI</span>
        </div>
        <div className="p-6 flex items-center gap-2">
          <span className="text-cyan-400 font-mono">$</span>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="docker command..."
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
          className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 font-semibold flex items-center gap-2 transform hover:scale-105 transition-all shadow-lg shadow-cyan-500/50"
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

export default DockerGame;