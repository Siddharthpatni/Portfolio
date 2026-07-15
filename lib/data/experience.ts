export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  skills: string[];
}

export const experiences: Experience[] = [
  {
    id: "ciconia-core",
    role: "AI Software Engineer (Research & Dev)",
    company: "Ciconia Systems GmbH · CORE Research Group",
    location: "Düsseldorf, Germany",
    period: "SoSe 2026",
    description: [
      "Designed and implemented Vergabepilot.AI, an autonomous agentic AI platform to scrape and download public-procurement documents globally.",
      "Developed a 7-strategy cascade pipeline utilizing Playwright, LLM code-generation, and visual Computer Use Agents (browser-use).",
      "Created a self-learning route system that records agent clicks and replays them, reducing LLM costs by over 95% on repeat visits.",
      "Architected a fanned-out chunk processing system using Celery, Redis, and asyncio to process up to 10,000 URLs per job run.",
      "Configured Prometheus metric exports and Grafana dashboards for real-time scraper performance and cost tracking."
    ],
    skills: ["Python", "FastAPI", "Playwright", "browser-use", "Celery", "Redis", "MinIO", "Prometheus", "Docker"]
  },
  {
    id: "ltts",
    role: "Software Developer Intern",
    company: "L&T Technology Services",
    location: "India",
    period: "Dec 2023 – Apr 2024",
    description: [
      "Refactored React components and Flask API layers, reducing perceived page load latencies by ~30% through bundle tuning and response caches.",
      "Dockerized microservices and integrated them into a Linux-based CI/CD pipeline, reducing environment-specific integration issues.",
      "Standardized API-UI interface contracts and added schema validation checks to prevent runtime errors."
    ],
    skills: ["React", "Flask", "Python", "TypeScript", "Docker", "CI/CD", "Linux"]
  },
  {
    id: "snapfix",
    role: "Data Analyst Intern",
    company: "Snapfix Ltd.",
    location: "Remote",
    period: "Jun 2023 – Jul 2023",
    description: [
      "Analyzed property maintenance logs and spatial data arrays to support core product performance reviews.",
      "Generated SQL queries and automated reports to isolate task workflow delays and bottlenecks.",
      "Built visual reporting sheets and spreadsheets to track team ticket completion metrics."
    ],
    skills: ["SQL", "Data Analysis", "Reporting", "Excel", "Workflow Auditing"]
  },
  {
    id: "personal-labs",
    role: "Open Source AI & Systems Creator",
    company: "Stark-Tech & Spidey Labs (Personal Projects)",
    location: "Remote",
    period: "2025 - Present",
    description: [
      "Engineered Spidey, an autonomous agent loop with custom React Flow diagrams, offline voice assistant (Vosk), and SFT/DPO fine-tuning.",
      "Built Sentinel, a security proxy providing EU AI Act audit ledgers (SHA-256 chained), span-tree Gantt charts, and model routing.",
      "Designed Cereforge, an AI/ML practice platform featuring LLM task evaluation, progressive hints, and an interactive AI mentor.",
      "Created Workflow Engine, a low-code distributed Bull queue task orchestrator with sandboxed Node VM and Python runtimes."
    ],
    skills: ["PyTorch", "HuggingFace", "TypeScript", "Next.js", "Zustand", "Bull Queue", "Node VM", "React Flow"]
  },
  {
    id: "academic-robotics",
    role: "Robotics & Embedded Systems Developer",
    company: "Academic Labs & IoT Prototyping",
    location: "University Projects",
    period: "2024 - 2025",
    description: [
      "Co-developed ShopMate-R, connecting Pepper and Temi robots to a central Flask orchestrator for grocery routing and checkout.",
      "Implemented a real-time weight sensor network using M5Stack IoT microcontrollers transmitting to Flask backend APIs.",
      "Built AI Driver Safety, integrating a traffic sign classifier (CNN), eye/drowsiness tracking (dlib), and speed tracking (OBD-II)."
    ],
    skills: ["Python", "TensorFlow", "Keras", "OpenCV", "dlib", "Arduino", "Flask", "Serial Comm"]
  }
];

