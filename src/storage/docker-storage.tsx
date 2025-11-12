export interface DockerLevel {
  id: number;
  title: string;
  task: string;
  hint: string;
  concept: string;
  solution: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  xpReward: number;
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

export interface DockerLearningMaterial {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  prerequisites: string[];
}

export interface DockerAchievement {
  id: string;
  name: string;
  description: string;
  emoji: string;
  requirement: string;
  xpReward: number;
}

// ==================== DOCKER LEVELS ====================

export const dockerLevels: DockerLevel[] = [
  {
    id: 1,
    title: "Pull an Image",
    task: "Pull the nginx image from Docker Hub",
    hint: "Use 'docker pull nginx'",
    concept: "Images are templates for containers. Pull downloads them from Docker Hub registry.",
    solution: ["docker pull nginx", "docker pull nginx:latest"],
    difficulty: 'beginner',
    category: 'Images',
    xpReward: 100,
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
    difficulty: 'intermediate',
    category: 'Containers',
    xpReward: 150,
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
    difficulty: 'beginner',
    category: 'Containers',
    xpReward: 100,
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
    difficulty: 'beginner',
    category: 'Containers',
    xpReward: 100,
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
    difficulty: 'intermediate',
    category: 'Images',
    xpReward: 150,
    containers: [],
    images: [
      { name: "node", tag: "18", size: "910MB" },
      { name: "nginx", tag: "latest", size: "133MB" }
    ]
  },
  {
    id: 6,
    title: "Remove a Container",
    task: "Remove the stopped container named 'web'",
    hint: "Use 'docker rm web'",
    concept: "'docker rm' removes stopped containers. Use 'docker rm -f' to force remove running ones.",
    solution: ["docker rm web", "docker container rm web"],
    difficulty: 'beginner',
    category: 'Containers',
    xpReward: 100,
    containers: [
      { name: "web", image: "nginx:latest", status: "exited", ports: "" },
      { name: "database", image: "postgres:13", status: "running", ports: "5432/tcp" }
    ],
    images: [
      { name: "nginx", tag: "latest", size: "133MB" },
      { name: "postgres", tag: "13", size: "314MB" }
    ]
  },
  {
    id: 7,
    title: "View Container Logs",
    task: "View logs of the 'web' container",
    hint: "Use 'docker logs web'",
    concept: "'docker logs' shows container output. Use -f to follow logs in real-time.",
    solution: ["docker logs web", "docker container logs web"],
    difficulty: 'beginner',
    category: 'Containers',
    xpReward: 100,
    containers: [
      { name: "web", image: "nginx:latest", status: "running", ports: "8080:80" }
    ],
    images: [
      { name: "nginx", tag: "latest", size: "133MB" }
    ]
  },
  {
    id: 8,
    title: "Execute Command in Container",
    task: "Execute bash shell in running 'web' container",
    hint: "Use 'docker exec -it web bash'",
    concept: "'docker exec' runs commands in running containers. -it provides interactive terminal.",
    solution: ["docker exec -it web bash", "docker exec -it web /bin/bash"],
    difficulty: 'intermediate',
    category: 'Containers',
    xpReward: 150,
    containers: [
      { name: "web", image: "nginx:latest", status: "running", ports: "8080:80" }
    ],
    images: [
      { name: "nginx", tag: "latest", size: "133MB" }
    ]
  },
  {
    id: 9,
    title: "Create a Volume",
    task: "Create a volume named 'mydata'",
    hint: "Use 'docker volume create mydata'",
    concept: "Volumes persist data outside containers. They survive container deletion.",
    solution: ["docker volume create mydata"],
    difficulty: 'intermediate',
    category: 'Volumes',
    xpReward: 150,
    containers: [],
    images: []
  },
  {
    id: 10,
    title: "Run with Volume Mount",
    task: "Run nginx with volume 'mydata' mounted to /usr/share/nginx/html",
    hint: "Use 'docker run -d -v mydata:/usr/share/nginx/html nginx'",
    concept: "-v or --volume mounts volumes to container paths. Syntax: volume:container_path",
    solution: [
      "docker run -d -v mydata:/usr/share/nginx/html nginx",
      "docker run -d --volume mydata:/usr/share/nginx/html nginx"
    ],
    difficulty: 'advanced',
    category: 'Volumes',
    xpReward: 200,
    containers: [],
    images: [
      { name: "nginx", tag: "latest", size: "133MB" }
    ]
  },
  {
    id: 11,
    title: "List Images",
    task: "Show all Docker images on your system",
    hint: "Use 'docker images'",
    concept: "'docker images' or 'docker image ls' lists all downloaded images with size and tags.",
    solution: ["docker images", "docker image ls"],
    difficulty: 'beginner',
    category: 'Images',
    xpReward: 100,
    containers: [],
    images: [
      { name: "nginx", tag: "latest", size: "133MB" },
      { name: "postgres", tag: "13", size: "314MB" },
      { name: "redis", tag: "alpine", size: "28MB" },
      { name: "node", tag: "18", size: "910MB" }
    ]
  },
  {
    id: 12,
    title: "Remove an Image",
    task: "Remove the nginx:latest image",
    hint: "Use 'docker rmi nginx:latest'",
    concept: "'docker rmi' removes images. Must stop/remove containers using it first.",
    solution: ["docker rmi nginx:latest", "docker image rm nginx:latest"],
    difficulty: 'beginner',
    category: 'Images',
    xpReward: 100,
    containers: [],
    images: [
      { name: "nginx", tag: "latest", size: "133MB" },
      { name: "postgres", tag: "13", size: "314MB" }
    ]
  },
  {
    id: 13,
    title: "Docker Compose Up",
    task: "Start services defined in docker-compose.yml",
    hint: "Use 'docker-compose up -d'",
    concept: "Docker Compose manages multi-container apps. -d runs in detached mode.",
    solution: ["docker-compose up -d", "docker compose up -d"],
    difficulty: 'advanced',
    category: 'Compose',
    xpReward: 200,
    containers: [],
    images: []
  },
  {
    id: 14,
    title: "Inspect Container",
    task: "Show detailed information about 'web' container",
    hint: "Use 'docker inspect web'",
    concept: "'docker inspect' returns low-level information in JSON format about containers, images, volumes.",
    solution: ["docker inspect web", "docker container inspect web"],
    difficulty: 'intermediate',
    category: 'Containers',
    xpReward: 150,
    containers: [
      { name: "web", image: "nginx:latest", status: "running", ports: "8080:80" }
    ],
    images: [
      { name: "nginx", tag: "latest", size: "133MB" }
    ]
  },
  {
    id: 15,
    title: "Tag an Image",
    task: "Tag nginx:latest as myregistry.com/nginx:v1",
    hint: "Use 'docker tag nginx:latest myregistry.com/nginx:v1'",
    concept: "Tagging creates aliases for images. Useful for versioning and pushing to registries.",
    solution: ["docker tag nginx:latest myregistry.com/nginx:v1"],
    difficulty: 'intermediate',
    category: 'Images',
    xpReward: 150,
    containers: [],
    images: [
      { name: "nginx", tag: "latest", size: "133MB" }
    ]
  }
];

// ==================== LEARNING MATERIALS ====================

export const dockerLearningMaterials: DockerLearningMaterial[] = [
  {
    id: 'docker-learn-001',
    title: 'Docker Basics',
    description: 'Introduction to containerization',
    content: 'Docker packages applications and dependencies into containers. Containers are lightweight, portable, and isolated.',
    category: 'Basics',
    level: 'beginner',
    prerequisites: []
  },
  {
    id: 'docker-learn-002',
    title: 'Images vs Containers',
    description: 'Understand the difference',
    content: 'Images are read-only templates. Containers are running instances of images. One image can create many containers.',
    category: 'Images',
    level: 'beginner',
    prerequisites: ['docker-learn-001']
  },
  {
    id: 'docker-learn-003',
    title: 'Container Lifecycle',
    description: 'Create, start, stop, remove containers',
    content: 'Containers go through states: created, running, paused, stopped. Use docker run, stop, start, rm to manage.',
    category: 'Containers',
    level: 'beginner',
    prerequisites: ['docker-learn-002']
  },
  {
    id: 'docker-learn-004',
    title: 'Volumes and Data Persistence',
    description: 'Manage data in containers',
    content: 'Volumes store data outside containers. Data persists even after container deletion. Better than bind mounts for production.',
    category: 'Volumes',
    level: 'intermediate',
    prerequisites: ['docker-learn-003']
  },
  {
    id: 'docker-learn-005',
    title: 'Docker Networking',
    description: 'Connect containers together',
    content: 'Docker creates virtual networks. Containers on same network can communicate. Use bridge, host, or custom networks.',
    category: 'Networks',
    level: 'intermediate',
    prerequisites: ['docker-learn-003']
  },
  {
    id: 'docker-learn-006',
    title: 'Docker Compose',
    description: 'Multi-container applications',
    content: 'Compose defines multi-container apps in YAML. Single command to start all services. Great for development environments.',
    category: 'Compose',
    level: 'advanced',
    prerequisites: ['docker-learn-003', 'docker-learn-004', 'docker-learn-005']
  },
  {
    id: 'docker-learn-007',
    title: 'Dockerfile Best Practices',
    description: 'Build efficient images',
    content: 'Use multi-stage builds, minimize layers, leverage cache, use .dockerignore, run as non-root user.',
    category: 'Images',
    level: 'advanced',
    prerequisites: ['docker-learn-002']
  }
];

// ==================== DOCKER ACHIEVEMENTS ====================

export const dockerAchievements: DockerAchievement[] = [
  {
    id: 'docker-ach-001',
    name: 'Container Novice',
    description: 'Run your first container',
    emoji: '🐳',
    requirement: 'Complete 1 Docker level',
    xpReward: 50
  },
  {
    id: 'docker-ach-002',
    name: 'Image Master',
    description: 'Master Docker images',
    emoji: '📦',
    requirement: 'Complete all Images category levels',
    xpReward: 200
  },
  {
    id: 'docker-ach-003',
    name: 'Container Expert',
    description: 'Master container management',
    emoji: '🎯',
    requirement: 'Complete all Containers category levels',
    xpReward: 250
  },
  {
    id: 'docker-ach-004',
    name: 'Volume Virtuoso',
    description: 'Master data persistence',
    emoji: '💾',
    requirement: 'Complete all Volumes category levels',
    xpReward: 200
  },
  {
    id: 'docker-ach-005',
    name: 'Compose Conductor',
    description: 'Master Docker Compose',
    emoji: '🎼',
    requirement: 'Complete all Compose category levels',
    xpReward: 300
  },
  {
    id: 'docker-ach-006',
    name: 'Docker Master',
    description: 'Complete all Docker challenges',
    emoji: '🏆',
    requirement: 'Complete all 15 Docker levels',
    xpReward: 1000
  }
];

// ==================== HELPER FUNCTIONS ====================

export const getDockerLevelById = (id: number): DockerLevel | undefined => {
  return dockerLevels.find(level => level.id === id);
};

export const getDockerLevelsByCategory = (category: string): DockerLevel[] => {
  return dockerLevels.filter(level => level.category === category);
};

export const getDockerLevelsByDifficulty = (difficulty: string): DockerLevel[] => {
  return dockerLevels.filter(level => level.difficulty === difficulty);
};

export const getTotalDockerXP = (): number => {
  return dockerLevels.reduce((total, level) => total + level.xpReward, 0);
};
