export interface Project {
  id: string;
  name: string;
  description: string;
  extendedDescription: string;
  techStack: string[];
  tier: "flagship" | "featured" | "standard";
  category: "Agentic AI" | "AI & ML" | "Full-Stack" | "Robotics & IoT";
  githubUrl?: string;
  orgName?: string;
  isPrivate?: boolean;
  metrics: { label: string; value: string }[];
  highlights: string[];
}

export const projects: Project[] = [
  {
    id: "vergabepilot-ai",
    name: "Vergabepilot.AI",
    description: "Autonomous agentic AI for public procurement document extraction across 30+ portal families globally.",
    extendedDescription: "Vergabepilot.AI automates the scraping and downloading of public-procurement tender documents across thousands of fragmented portals globally. It runs an intelligent Agentic Cascade Pipeline: a cost-tuned chain of 7 strategies (Cached → Deterministic → Adaptive Heuristics → LLM Code Gen → Learned Route → Computer Use Agent → Manual) that self-heals up to 3 times and learns from successful CUA interactions. Integrates Redis circuit breakers, domain rate limiters, global semaphores, and deep 32-field extraction.",
    techStack: [
      "Python 3.11",
      "FastAPI",
      "Next.js 14",
      "TypeScript",
      "Tailwind CSS",
      "Celery",
      "Redis",
      "PostgreSQL",
      "MinIO",
      "Playwright",
      "browser-use",
      "Gemini 2.5 Flash",
      "Prometheus",
      "Docker"
    ],
    tier: "flagship",
    category: "Agentic AI",
    isPrivate: true,
    orgName: "CORE Research Group · Ciconia Systems GmbH",
    metrics: [
      { label: "Cascade Strategies", value: "7 Stages" },
      { label: "Portal Families", value: "30+" },
      { label: "Unit/Integration Tests", value: "262 Passing" },
      { label: "Concurrency Target", value: "~32 URLs" }
    ],
    highlights: [
      "7-Strategy Cascade tries cheapest-first options to minimize API costs.",
      "Self-learning loop distills successful CUA navigation steps into replayable JSON routes.",
      "Deep document extraction module parses PDFs/DOCXs into 32 structured fields.",
      "Redis circuit breakers & token-bucket rate limiters prevent API bans."
    ]
  },
  {
    id: "spidey",
    name: "Spidey",
    description: "Self-hostable autonomous AI agent with voice controls, live reasoning graphs, and offline capabilities.",
    extendedDescription: "Spidey is Siddharth's flagship autonomous AI agent platform: a self-hostable system featuring a live execution graph, offline voice integration, local LLM execution, and a two-stage SFT/DPO training pipeline. The platform is modular (17 core modules) and runs entirely locally. It allows users to design, visualize, and debug complex agentic workflows in real-time.",
    techStack: [
      "Python",
      "FastAPI",
      "React",
      "Vite",
      "Tailwind CSS",
      "React Flow",
      "SQLite",
      "Vosk Voice",
      "Ollama",
      "Unsloth",
      "TRL",
      "WebSockets"
    ],
    tier: "flagship",
    category: "Agentic AI",
    githubUrl: "https://github.com/Siddharthpatni/Spidey",
    metrics: [
      { label: "Architecture", value: "ReAct Loop" },
      { label: "Core Modules", value: "17 Elements" },
      { label: "Fine-Tuning", value: "SFT & DPO" },
      { label: "Voice", value: "Local/Offline" }
    ],
    highlights: [
      "Live interactive reasoning loop built using React Flow visual canvas.",
      "Full offline operation utilizing Vosk local speech recognition and local Ollama model layers.",
      "Optimized two-stage training pipeline (SFT + DPO) using Unsloth for high throughput.",
      "Robust safety filtering layer to validate instructions and output actions."
    ]
  },
  {
    id: "sentinel",
    name: "Sentinel",
    description: "Open-source LLM observability and agent reliability proxy with Cost & EU AI Act auditing.",
    extendedDescription: "Sentinel is an open-source, self-hostable proxy that acts as a drop-in replacement for OpenAI/Anthropic SDKs. It records detailed span-tree waterfalls (Gantt style), performs judge-model output validation, executes failover routing, and logs every call inside a secure, SHA-256 chained audit ledger compliant with the EU AI Act. Includes an annotation queue for human feedback and cost rollups.",
    techStack: [
      "Python",
      "FastAPI",
      "Celery",
      "Redis",
      "PostgreSQL",
      "Next.js",
      "TypeScript",
      "Docker",
      "Fernet Encryption"
    ],
    tier: "featured",
    category: "Agentic AI",
    githubUrl: "https://github.com/Siddharthpatni/Sentinel",
    metrics: [
      { label: "SDK Integration", value: "2 Lines" },
      { label: "Audit Log", value: "SHA-256 Chained" },
      { label: "Routing Failover", value: "Max 3 Retries" },
      { label: "Cost Tracking", value: "Real-time Sparklines" }
    ],
    highlights: [
      "Drop-in proxy: just change the base URL in your OpenAI/Anthropic client.",
      "Gantt-style span tree renderer on the Next.js dashboard for agent executions.",
      "Declarative async evaluation rules evaluated on judge models.",
      "EU AI Act audit trail tagging calls with risk tiers in a verifiable ledger."
    ]
  },
  {
    id: "cereforge",
    name: "Cereforge",
    description: "Interactive learning and practice platform for AI & MLOps engineers.",
    extendedDescription: "Cereforge is a competitive AI engineering platform designed to bridge the gap between simple tutorials and complex production architectures. It provides 24 curated design tasks across LLMs, RAG, Vision, and Agents. Users build solutions inside Colab notebooks, submit them to a Gemini-based evaluator, and earn XP. Includes a StackOverflow-style Q&A forum, a global leaderboard, and an interactive AI mentor.",
    techStack: [
      "Python",
      "FastAPI",
      "SQLAlchemy 2.0",
      "PostgreSQL",
      "Redis",
      "React 18",
      "Vite",
      "Zustand",
      "Google Gemini API",
      "Docker"
    ],
    tier: "featured",
    category: "AI & ML",
    githubUrl: "https://github.com/Siddharthpatni/Cereforge",
    metrics: [
      { label: "Curated Tasks", value: "24 Challenges" },
      { label: "Practice Tracks", value: "4 Specialized" },
      { label: "Unit Tests", value: "43 Passing" },
      { label: "UI Library", value: "React + Tailwind" }
    ],
    highlights: [
      "Gemini-based evaluation engine providing progressive hints based on student level.",
      "StackOverflow-style community forum featuring XP rewards and accepted answers.",
      "Full admin portal to manage user credentials, XP allocations, and platform state.",
      "Integrated CI/CD pipeline evaluating code formatting (Ruff) and backend assertions (pytest)."
    ]
  },
  {
    id: "workflow-engine",
    name: "Workflow Engine",
    description: "Distributed, low-code workflow automation engine with sandboxed execution runtimes.",
    extendedDescription: "An open-source alternative to n8n built for high-throughput visual automation. The platform features an interactive React Flow canvas where users drag, drop, and configure execution nodes. Jobs are fanned out to Redis and consumed by out-of-process Bull workers. To prevent security vulnerabilities, JavaScript nodes execute inside node's native vm module, while Python nodes execute inside isolated containers.",
    techStack: [
      "Node.js",
      "Express",
      "React Flow",
      "React 18",
      "Tailwind CSS",
      "PostgreSQL",
      "Redis",
      "Bull Queue",
      "Docker"
    ],
    tier: "featured",
    category: "Full-Stack",
    githubUrl: "https://github.com/Siddharthpatni/Workflow_Engine",
    metrics: [
      { label: "Runtimes", value: "JS vm & Python Docker" },
      { label: "Canvas Engine", value: "React Flow" },
      { label: "Queue System", value: "Distributed Bull" },
      { label: "Communication", value: "WebSockets Live" }
    ],
    highlights: [
      "Fully responsive drag-and-drop workflow designer with live execution tracking.",
      "Distributed task execution using a master-worker architecture backed by Redis and Bull.",
      "Isolated sandboxing: JavaScript executed inside Node VMs, Python inside Docker.",
      "Live status streams and terminal logging piped directly to the UI via WebSockets."
    ]
  },
  {
    id: "shopmate-r",
    name: "ShopMate-R",
    description: "Multi-robot grocery shopping assistant using Pepper & Temi robots.",
    extendedDescription: "A multi-agent, multi-robot system designed for retail environments. A stationary Pepper humanoid robot welcomes the customer, conducts a speech-based dialog, and renders the current shopping cart on its mounted tablet. A mobile Temi robot receives coordinates from the central Flask orchestration server, plans an optimized route through the grocery aisles, and delivers the requested products.",
    techStack: [
      "Python",
      "Flask",
      "SSH (Pepper Driver)",
      "HTTP API (Temi Navigation)",
      "OpenAI API",
      "M5Stack IoT",
      "WebSockets"
    ],
    tier: "featured",
    category: "Robotics & IoT",
    githubUrl: "https://github.com/Siddharthpatni/ShopMate-R",
    metrics: [
      { label: "Hardware Nodes", value: "2 Physical Robots" },
      { label: "Shelf Sensors", value: "M5Stack IoT" },
      { label: "Aisle Routing", value: "Multi-Stop Optimal" },
      { label: "Interface", value: "Voice + Tablet UI" }
    ],
    highlights: [
      "Speech-based customer interaction with dynamic hand gestures on Pepper.",
      "Multi-stop path planning and aisle routing executed on Temi.",
      "Real-time weight and stock sensing using M5Stack shelf sensors posting to a REST API.",
      "HTML5 tablet interface with dynamic product preview and checkout animations."
    ]
  },
  {
    id: "ai-driver-safety",
    name: "AI Driver Safety",
    description: "Advanced Driver Assistance System (ADAS) with CNNs, YOLOv4, and IoT braking integration.",
    extendedDescription: "An integrated computer vision and hardware-in-the-loop safety system. It runs 4 concurrent processing tracks: CNN-based traffic sign recognition (classification of STOP, speed limits, etc.), YOLOv4-based real-time pedestrian detection, dlib facial point monitoring for drowsiness tracking, and Arduino speed limits + OBD-II communication. The system can issue audio alerts and trigger auto-braking on potential collision.",
    techStack: [
      "Python",
      "TensorFlow",
      "Keras",
      "OpenCV",
      "YOLOv4",
      "dlib",
      "Arduino",
      "OBD-II Interface",
      "Serial Comm"
    ],
    tier: "standard",
    category: "Robotics & IoT",
    githubUrl: "https://github.com/Siddharthpatni/ai-driver-safety",
    metrics: [
      { label: "Vision Subsystems", value: "3 Neural Models" },
      { label: "Hardware Link", value: "Arduino + OBD-II" },
      { label: "Speed Tracking", value: "Real-time GPS/Serial" },
      { label: "Evaluation", value: "Real-time Video Feed" }
    ],
    highlights: [
      "Real-time pedestrian tracking via YOLOv4 with dynamic braking distance mapping.",
      "Drowsiness tracking using eye-aspect-ratio (EAR) and mouth-aspect-ratio (MAR) via dlib.",
      "Hardware integration with Arduino and alcohol vapor sensors (MQ-3) for vehicle lockout.",
      "Real-time traffic sign classification built with a custom CNN in TensorFlow."
    ]
  },
  {
    id: "digital-inventory",
    name: "Digital Inventory",
    description: "Full-stack SaaS inventory platform with QR codes, audits, and pitch deck metrics.",
    extendedDescription: "A production-ready retail SaaS inventory application for micro-merchants. Features live stock tracking, automated low-stock warnings, barcode/QR lookup, audit logs for compliance, and session locking. The repo includes full business documentation: a business plan, financial projection model (Excel), and an investor pitch deck to demonstrate commercial feasibility.",
    techStack: [
      "Node.js",
      "Express",
      "SQLite",
      "PostgreSQL",
      "Redis",
      "HTML5/CSS3",
      "JavaScript",
      "Chart.js",
      "bcrypt",
      "Helmet.js"
    ],
    tier: "standard",
    category: "Full-Stack",
    githubUrl: "https://github.com/Siddharthpatni/Digital_Inventory",
    metrics: [
      { label: "Security Compliance", value: "CSRF & Rate Limiting" },
      { label: "Business Assets", value: "Pitch Deck + Financials" },
      { label: "Alert Trigger", value: "Custom Thresholds" },
      { label: "Session Store", value: "Redis Caching" }
    ],
    highlights: [
      "Professional dashboard featuring real-time charts powered by Chart.js.",
      "Hardened security: Helmet headers, bcrypt password hashing, CSRF tokens, and rate-limiting.",
      "Audit trail logs for all inventory adjustments, user logins, and settings updates.",
      "Includes complete startup documentation and PowerPoint export guide."
    ]
  },
  {
    id: "llm-chatbot",
    name: "LLM Chatbot",
    description: "Self-hosted Microsoft DialoGPT conversational agent optimized for Apple Silicon MPS.",
    extendedDescription: "A self-hosted conversational AI interface utilizing Microsoft's DialoGPT model. The backend is optimized for macOS GPU acceleration using PyTorch's Metal Performance Shaders (MPS). The React client coordinates speech-to-text / text-to-speech loops, and the entire setup is containerized using Docker for seamless distribution.",
    techStack: [
      "Python",
      "Flask",
      "PyTorch",
      "HuggingFace",
      "React",
      "Vite",
      "Tailwind CSS",
      "Docker",
      "MPS (macOS Acceleration)"
    ],
    tier: "standard",
    category: "AI & ML",
    githubUrl: "https://github.com/Siddharthpatni/LLM_chatbot",
    metrics: [
      { label: "Model", value: "DialoGPT" },
      { label: "Optimization", value: "Apple Silicon MPS" },
      { label: "Frontend Bundle", value: "React + Vite" },
      { label: "Deployment", value: "Docker Compose" }
    ],
    highlights: [
      "GPU-accelerated local execution using Metal Performance Shaders (MPS).",
      "Lightweight React client talking to PyTorch backend via high-speed REST endpoints.",
      "Self-contained Docker config optimizing ARM64 processor instruction sets.",
      "Clean UI with futuristic terminal-style diagnostics."
    ]
  },
  {
    id: "smartbot",
    name: "SmartBot (Chatbot)",
    description: "Offline-first FAQ assistant matching questions with CSV knowledge bases.",
    extendedDescription: "A lightweight, zero-dependency, offline-first FAQ assistant built with Flask and React. It indexes Q&A pairs directly from editable CSV files, making it completely private, free to run, and highly performant on low-resource machines. Ideal for IT helpdesks, local FAQs, and quick-lookup systems.",
    techStack: [
      "Python",
      "Flask",
      "React",
      "JavaScript",
      "CSS3",
      "CSV Storage"
    ],
    tier: "standard",
    category: "Full-Stack",
    githubUrl: "https://github.com/Siddharthpatni/Chatbot",
    metrics: [
      { label: "Cost", value: "$0 API Fees" },
      { label: "Storage", value: "Flat CSV Files" },
      { label: "Backend Latency", value: "< 2ms p99" },
      { label: "Deployment", value: "Local / Cloud" }
    ],
    highlights: [
      "Works completely offline without sending data to external APIs.",
      "Easily configurable knowledge base via editing standard CSV spreadsheets.",
      "Modular python structure designed for quick customization and deployment.",
      "Time-aware responses for greeting state modifications."
    ]
  },
  {
    id: "multi-disease-diagnostic",
    name: "Multi-Disease Diagnostic Web App",
    description: "End-to-end medical diagnostic image classification web pipeline at ~85% accuracy.",
    extendedDescription: "A machine learning based diagnostic processing application that automates medical image classification and disease parameter identification. Powered by scikit-learn for regression and SVM classification, and OpenCV for visual preprocessing of medical imagery. It provides immediate diagnostic indicators on a Flask web dashboard.",
    techStack: [
      "Python",
      "Flask",
      "OpenCV",
      "scikit-learn",
      "HTML5",
      "CSS3",
      "JavaScript"
    ],
    tier: "standard",
    category: "AI & ML",
    metrics: [
      { label: "Accuracy", value: "~85%" },
      { label: "Speed", value: "10 seconds" },
      { label: "Framework", value: "scikit-learn" },
      { label: "Server", value: "Flask" }
    ],
    highlights: [
      "End-to-end diagnostic pipeline achieving ~85% accuracy across multiple conditions.",
      "Drastically reduced case classification processing times from 30 minutes to 10 seconds.",
      "Integrates OpenCV filters for image segmentation and feature maps.",
      "Fully functional web preview on a custom Flask interface."
    ]
  }
];
