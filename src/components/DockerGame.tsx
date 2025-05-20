import React, { useState, useEffect } from 'react';
import { 
  Play, RefreshCw, Lightbulb, Book, Package, 
  CheckCircle, XCircle, Layers, Monitor, Server
} from 'lucide-react';

interface DockerLevel {
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
    containers?: Array<{
      id: string;
      name: string;
      image: string;
      status: 'running' | 'stopped' | 'created';
      ports?: string;
      color?: string;
    }>;
    images?: Array<{
      id: string;
      repository: string;
      tag: string;
      size: string;
      color?: string;
    }>;
    networks?: Array<{
      id: string;
      name: string;
      driver: string;
      scope: string;
      color?: string;
    }>;
    volumes?: Array<{
      id: string;
      name: string;
      mountpoint: string;
      color?: string;
    }>;
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

const DockerGame: React.FC = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showConcept, setShowConcept] = useState(false);
  const [terminalHistory, setTerminalHistory] = useState<TerminalOutput[]>([]);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  const [dockerState, setDockerState] = useState<DockerLevel['visualData']>({});

  const levels: DockerLevel[] = [
    {
      id: 1,
      title: "Pull Your First Image",
      description: "Pull the nginx image from Docker Hub",
      hint: "Use docker pull nginx",
      solution: ["docker pull nginx", "docker pull nginx:latest"],
      concept: {
        title: "Docker Images",
        content: "Docker images are read-only templates used to create containers. They contain the application code, libraries, dependencies, tools, and other files needed for an application to run."
      },
      visualData: {
        images: [
          { id: "sha256:a2abf6c1d04a", repository: "ubuntu", tag: "latest", size: "72.8MB", color: "#E95420" },
          { id: "sha256:c8ae7e8351a", repository: "alpine", tag: "3.14", size: "5.6MB", color: "#0D597F" }
        ]
      }
    },
    {
      id: 2,
      title: "Run a Container",
      description: "Run an nginx container named 'webserver' on port 8080",
      hint: "Map port 80 inside the container to port 8080 on the host",
      solution: ["docker run -d --name webserver -p 8080:80 nginx", "docker run --name webserver -d -p 8080:80 nginx"],
      concept: {
        title: "Container Ports",
        content: "Docker containers can expose ports to communicate with the host machine or other containers. The -p flag maps a container's port to a port on the host machine in the format: -p host_port:container_port"
      },
      visualData: {
        images: [
          { id: "sha256:a2abf6c1d04a", repository: "ubuntu", tag: "latest", size: "72.8MB", color: "#E95420" },
          { id: "sha256:c8ae7e8351a", repository: "alpine", tag: "3.14", size: "5.6MB", color: "#0D597F" },
          { id: "sha256:f652ca386fe1", repository: "nginx", tag: "latest", size: "133MB", color: "#269539" }
        ],
        containers: [
          { id: "b3d9af829c3a", name: "database", image: "mysql:5.7", status: "running", ports: "3306/tcp", color: "#00758F" }
        ]
      }
    },
    {
      id: 3,
      title: "Create a Volume",
      description: "Create a new volume named 'data-volume'",
      hint: "Use docker volume create",
      solution: ["docker volume create data-volume"],
      concept: {
        title: "Docker Volumes",
        content: "Volumes provide persistent storage for containers. They are stored outside the container's filesystem and can be mounted to multiple containers. Volumes persist after a container is deleted."
      },
      visualData: {
        containers: [
          { id: "b3d9af829c3a", name: "database", image: "mysql:5.7", status: "running", ports: "3306/tcp", color: "#00758F" },
          { id: "f87a32bc0a12", name: "webserver", image: "nginx:latest", status: "running", ports: "8080:80/tcp", color: "#269539" }
        ],
        volumes: [
          { id: "d84fb2c32a1d", name: "mysql-data", mountpoint: "/var/lib/docker/volumes/mysql-data", color: "#F29111" }
        ]
      }
    },
    {
      id: 4,
      title: "Create a Network",
      description: "Create a bridge network named 'app-network'",
      hint: "Use docker network create",
      solution: ["docker network create app-network", "docker network create -d bridge app-network"],
      concept: {
        title: "Docker Networks",
        content: "Docker networks enable containers to communicate with each other. The default bridge network allows containers on the same host to communicate. Custom networks provide better isolation and service discovery."
      },
      visualData: {
        containers: [
          { id: "b3d9af829c3a", name: "database", image: "mysql:5.7", status: "running", ports: "3306/tcp", color: "#00758F" },
          { id: "f87a32bc0a12", name: "webserver", image: "nginx:latest", status: "running", ports: "8080:80/tcp", color: "#269539" }
        ],
        networks: [
          { id: "a74b1cf9e9e3", name: "bridge", driver: "bridge", scope: "local", color: "#0db7ed" }
        ]
      }
    },
    {
      id: 5,
      title: "Stop a Container",
      description: "Stop the running container named 'webserver'",
      hint: "Use docker stop",
      solution: ["docker stop webserver"],
      concept: {
        title: "Container Lifecycle",
        content: "Containers can be in different states: running, stopped, or paused. Use docker stop to gracefully stop a running container, docker start to start a stopped container, and docker rm to remove a container."
      },
      visualData: {
        containers: [
          { id: "b3d9af829c3a", name: "database", image: "mysql:5.7", status: "running", ports: "3306/tcp", color: "#00758F" },
          { id: "f87a32bc0a12", name: "webserver", image: "nginx:latest", status: "running", ports: "8080:80/tcp", color: "#269539" }
        ]
      }
    }
  ];

  const currentLevelData = levels[currentLevel - 1];

  // Initialize Docker state
  useEffect(() => {
    setDockerState(currentLevelData.visualData);
    setTerminalHistory([]);
  }, [currentLevel]);

  // Load progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('dockerGameProgress');
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setCompletedLevels(progress.completedLevels || []);
    }
  }, []);

  // Save progress
  const saveProgress = () => {
    localStorage.setItem('dockerGameProgress', JSON.stringify({
      completedLevels
    }));
  };

  const simulateCommand = (command: string): string => {
    const cmd = command.trim().toLowerCase();
    
    // Basic command simulation
    if (cmd.startsWith('docker pull nginx')) {
      setDockerState(prev => ({
        ...prev,
        images: [
          ...(prev.images || []),
          { id: "sha256:f652ca386fe1", repository: "nginx", tag: "latest", size: "133MB", color: "#269539" }
        ]
      }));
      return 'Using default tag: latest\nlatest: Pulling from library/nginx\nDigest: sha256:4f354a06a18e25aaec3c735024f52c1e8e284a5f5a14c128429a22e9d69b8f7a\nStatus: Downloaded newer image for nginx:latest\ndocker.io/library/nginx:latest';
    }
    
    if (cmd.startsWith('docker run -d --name webserver -p 8080:80 nginx') || 
        cmd.startsWith('docker run --name webserver -d -p 8080:80 nginx')) {
      setDockerState(prev => ({
        ...prev,
        containers: [
          ...(prev.containers || []),
          { id: "f87a32bc0a12", name: "webserver", image: "nginx:latest", status: "running", ports: "8080:80/tcp", color: "#269539" }
        ]
      }));
      return 'f87a32bc0a12d42e4556c1923d09f9e3c3ec560c6eb76c1929d13b11b3c4f234';
    }
    
    if (cmd === 'docker volume create data-volume') {
      setDockerState(prev => ({
        ...prev,
        volumes: [
          ...(prev.volumes || []),
          { id: "3a1b4ef2c58d", name: "data-volume", mountpoint: "/var/lib/docker/volumes/data-volume", color: "#F29111" }
        ]
      }));
      return 'data-volume';
    }
    
    if (cmd === 'docker network create app-network' || cmd === 'docker network create -d bridge app-network') {
      setDockerState(prev => ({
        ...prev,
        networks: [
          ...(prev.networks || []),
          { id: "b9c2d41f6a7e", name: "app-network", driver: "bridge", scope: "local", color: "#0db7ed" }
        ]
      }));
      return 'b9c2d41f6a7e32f5d7b81e8dca908cd35668c456713e1295ee89e61c95b0208d';
    }
    
    if (cmd === 'docker stop webserver') {
      setDockerState(prev => ({
        ...prev,
        containers: (prev.containers || []).map(container => 
          container.name === 'webserver' 
            ? { ...container, status: 'stopped' } 
            : container
        )
      }));
      return 'webserver';
    }
    
    return `Error: '${cmd}' is not a valid Docker command.`;
  };

  const executeCommand = (command: string) => {
    const output = simulateCommand(command);
    const newHistoryItem: TerminalOutput = {
      command,
      output,
      type: output.includes('Error') ? 'error' : 'result',
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
      setFeedback({ type: 'success', message: 'Great job! Command executed successfully!' });
      
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
          setShowHint(false);
        }
      }, 2500);
    } else {
      setFeedback({ type: 'error', message: 'Not quite right. Try again!' });
    }
  };

  const renderContainers = () => {
    const containers = dockerState.containers || [];
    if (containers.length === 0) return <div className="text-gray-500 italic">No containers running</div>;
    
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">CONTAINER ID</th>
              <th className="px-4 py-2">NAME</th>
              <th className="px-4 py-2">IMAGE</th>
              <th className="px-4 py-2">STATUS</th>
              <th className="px-4 py-2">PORTS</th>
            </tr>
          </thead>
          <tbody>
            {containers.map(container => (
              <tr key={container.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-mono">{container.id.substring(0, 12)}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: container.color }} />
                    {container.name}
                  </div>
                </td>
                <td className="px-4 py-3">{container.image}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    container.status === 'running' 
                      ? 'bg-green-100 text-green-800' 
                      : container.status === 'stopped'
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {container.status}
                  </span>
                </td>
                <td className="px-4 py-3 font-mono">{container.ports || ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderImages = () => {
    const images = dockerState.images || [];
    if (images.length === 0) return <div className="text-gray-500 italic">No images found</div>;
    
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">REPOSITORY</th>
              <th className="px-4 py-2">TAG</th>
              <th className="px-4 py-2">IMAGE ID</th>
              <th className="px-4 py-2">SIZE</th>
            </tr>
          </thead>
          <tbody>
            {images.map(image => (
              <tr key={image.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: image.color }} />
                    {image.repository}
                  </div>
                </td>
                <td className="px-4 py-3">{image.tag}</td>
                <td className="px-4 py-3 font-mono">{image.id.substring(0, 12)}</td>
                <td className="px-4 py-3">{image.size}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderNetworks = () => {
    const networks = dockerState.networks || [];
    if (networks.length === 0) return null;
    
    return (
      <div className="mt-6">
        <h4 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <Layers className="w-5 h-5 text-blue-500" />
          Networks
        </h4>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">NETWORK ID</th>
                <th className="px-4 py-2">NAME</th>
                <th className="px-4 py-2">DRIVER</th>
                <th className="px-4 py-2">SCOPE</th>
              </tr>
            </thead>
            <tbody>
              {networks.map(network => (
                <tr key={network.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono">{network.id.substring(0, 12)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: network.color }} />
                      {network.name}
                    </div>
                  </td>
                  <td className="px-4 py-3">{network.driver}</td>
                  <td className="px-4 py-3">{network.scope}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderVolumes = () => {
    const volumes = dockerState.volumes || [];
    if (volumes.length === 0) return null;
    
    return (
      <div className="mt-6">
        <h4 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <Server className="w-5 h-5 text-orange-500" />
          Volumes
        </h4>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">VOLUME NAME</th>
                <th className="px-4 py-2">MOUNTPOINT</th>
              </tr>
            </thead>
            <tbody>
              {volumes.map(volume => (
                <tr key={volume.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: volume.color }} />
                      {volume.name}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">{volume.mountpoint}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderVisualArea = () => {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <Monitor className="w-5 h-5 text-cyan-500" />
              Containers
            </h3>
            {renderContainers()}
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <Layers className="w-5 h-5 text-purple-500" />
              Images
            </h3>
            {renderImages()}
          </div>
          
          {renderNetworks()}
          {renderVolumes()}
        </div>
      </div>
    );
  };

  const renderTerminal = () => {
    return (
      <div className="bg-black text-gray-100 rounded-xl p-4 font-mono h-full min-h-[300px] relative">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-gray-400 text-sm">Docker Terminal</span>
        </div>
        
        <div className="space-y-2 max-h-[300px] overflow-y-auto pb-10">
          {terminalHistory.map((item, idx) => (
            <div key={idx}>
              <div className="text-cyan-400 flex items-center gap-2">
                <span className="text-green-400">$</span> 
                <span className="text-white">{item.command}</span>
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
          <div className="text-white absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-2">
              <span className="text-green-400">$</span>
              <span className="animate-pulse">_</span>
            </div>
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
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-500"
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
            <Package className="w-6 h-6 text-blue-600" />
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
        {/* Docker State Visualization */}
        <div>{renderVisualArea()}</div>
        
        {/* Terminal */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Terminal Output</h3>
          {renderTerminal()}
        </div>
      </div>

      {/* Command Input */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex gap-4 items-center">
          <div className="flex-1 bg-black rounded-lg px-4 py-3 flex items-center gap-2 font-mono">
            <span className="text-green-400">$</span>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && executeCommand(userInput)}
              placeholder="Type your Docker command here..."
              className="flex-1 bg-transparent text-gray-100 outline-none"
              aria-label="Docker command input"
            />
          </div>
          <button
            onClick={() => executeCommand(userInput)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-semibold"
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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
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
                  ? 'bg-blue-600 text-white shadow-lg transform scale-105' 
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

export default DockerGame;