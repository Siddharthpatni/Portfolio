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
  
  // Engineering Case Study Fields
  problem?: string;
  architectureMermaid?: string;
  engineeringDecisions?: { decision: string; reason: string }[];
  challenges?: string;
  solution?: string;
  tradeoffs?: string;
  failures?: string;
  testing?: string[];
  deployment?: string[];
  
  // Matrix Capabilities
  capabilities?: {
    ai: boolean;
    robotics: boolean;
    fullstack: boolean;
    research: boolean;
    deployment: boolean;
  };
}

export const projects: Project[] = [
  {
    id: "vergabepilot-ai",
    name: "Vergabepilot.AI",
    description: "Autonomous agentic AI for public procurement document extraction across 30+ portal families globally.",
    extendedDescription: "Vergabepilot.AI automates the scraping and downloading of public-procurement tender documents across thousands of fragmented portals globally. It runs an intelligent Agentic Cascade Pipeline: a cost-tuned chain of 7 strategies (Cached → Deterministic → Adaptive Heuristics → LLM Code Gen → Learned Route → Computer Use Agent → Manual) that self-heals up to 3 times and learns from successful CUA interactions.",
    techStack: ["Python", "FastAPI", "Next.js", "TypeScript", "Celery", "Redis", "PostgreSQL", "MinIO", "Playwright", "Gemini", "Prometheus", "Docker"],
    tier: "flagship",
    category: "Agentic AI",
    isPrivate: true,
    orgName: "CORE Research Group",
    metrics: [
      { label: "Cascade Strategies", value: "7 Stages" },
      { label: "Portal Families", value: "30+" },
      { label: "Unit Tests", value: "262 Passing" },
      { label: "Concurrency", value: "~32 URLs" }
    ],
    highlights: [],
    problem: "Public procurement portals are highly fragmented, dynamic, and actively hostile to scraping (Cloudflare, captchas). Standard scrapers break constantly, requiring massive maintenance.",
    solution: "An Agentic Cascade Pipeline that attempts cheap, deterministic extraction first, falling back to an LLM-driven Computer Use Agent (CUA) only when deterministic methods fail. Successful CUA runs are compiled into deterministic routes for future runs.",
    architectureMermaid: `
graph TD
  Request[URL Request] --> Cache{Cached?}
  Cache -- Yes --> Return[Return Data]
  Cache -- No --> Det[Deterministic Parser]
  Det -- Success --> Compile[Compile & Return]
  Det -- Fail --> Heuristics[Adaptive Heuristics]
  Heuristics -- Fail --> LLM[LLM Code Gen]
  LLM -- Fail --> CUA[Computer Use Agent]
  CUA -- Success --> Learn[Learn Route]
  Learn --> Compile
    `,
    engineeringDecisions: [
      { decision: "Deterministic Parsing Before LLM", reason: "Cost and latency. Running a full CUA loop costs ~$0.05 and takes 40s. Regex/XPath takes 0.01s and $0." },
      { decision: "Celery + Redis", reason: "Required robust distributed task queues to handle massive horizontal fan-out of scraping jobs with retry logic and global rate limiting to avoid IP bans." }
    ],
    challenges: "Handling dynamic shadow DOMs and aggressive bot protection. The CUA model often hallucinated clicks on non-interactive elements.",
    tradeoffs: "We sacrificed raw speed on the worst-case URLs for massive cost savings on the best-case URLs. The pipeline is slow when it reaches the CUA stage, but 80% of jobs resolve in the deterministic stages.",
    failures: "Initial iterations tried to use LLMs for every page. Costs skyrocketed and context windows overflowed on large DOMs. We had to implement DOM minification and the cascade system to survive.",
    testing: ["Unit (pytest)", "Integration (Testcontainers)", "E2E (Playwright)"],
    deployment: ["Docker Compose", "GPU Instances", "Prometheus/Grafana Monitoring"],
    capabilities: { ai: true, robotics: false, fullstack: true, research: true, deployment: true }
  },
  {
    id: "shopmate-r",
    name: "ShopMate-R",
    description: "Multi-robot grocery shopping assistant using Pepper & Temi robots.",
    extendedDescription: "A multi-agent, multi-robot system designed for retail environments. A stationary Pepper humanoid robot welcomes the customer, conducts a speech-based dialog, and renders the current shopping cart on its mounted tablet. A mobile Temi robot receives coordinates from the central Flask orchestration server, plans an optimized route through the grocery aisles, and delivers the requested products.",
    techStack: ["Python", "Flask", "OpenAI", "SSH", "HTTP API", "M5Stack IoT", "WebSockets"],
    tier: "flagship",
    category: "Robotics & IoT",
    githubUrl: "https://github.com/Siddharthpatni/ShopMate-R",
    metrics: [
      { label: "Hardware Nodes", value: "2 Robots" },
      { label: "Shelf Sensors", value: "M5Stack IoT" },
      { label: "Latency", value: "< 2s API" }
    ],
    highlights: [],
    problem: "Navigating a complex grocery environment requires distinct physical capabilities: human interaction (Pepper) and payload delivery/navigation (Temi). A single robot cannot do both effectively.",
    solution: "A master orchestration server that delegates human-robot interaction to Pepper and SLAM/navigation tasks to Temi, bridging them via a shared knowledge graph and state machine.",
    architectureMermaid: `
graph TD
  Customer --> Pepper[Pepper Humanoid]
  Pepper --> Speech[Speech Recognition]
  Speech --> LLM[LLM Planner]
  LLM --> State[State Machine]
  State --> Tablet[Tablet UI]
  State --> Orchestrator[Flask Orchestrator]
  Orchestrator --> Temi[Temi Robot]
  Temi --> Nav[SLAM Navigation]
  Nav --> Delivery[Product Delivery]
    `,
    engineeringDecisions: [
      { decision: "Decoupled Master Architecture", reason: "Robots have proprietary closed OS ecosystems (Naoqi vs Android). A central Python orchestrator was the only way to synchronize them." },
      { decision: "M5Stack IoT Triggers", reason: "Need real-time weight changes to detect when a product is picked up. MQTT/WebSockets provided sub-second latency." }
    ],
    challenges: "Robot localization drift in highly reflective environments (glass fridges). Temi would occasionally lose map coordinates.",
    tradeoffs: "High dependency on stable Wi-Fi. We traded local autonomy for centralized intelligence to simplify state management across multiple agents.",
    failures: "Attempted to run local voice recognition on Pepper's outdated CPU. Latency was 8+ seconds. Shifted to streaming audio to a cloud endpoint for <1s response times.",
    testing: ["Simulation (Gazebo)", "Real Hardware", "Network Partition Tests"],
    deployment: ["Local Server", "Edge Compute", "Docker"],
    capabilities: { ai: true, robotics: true, fullstack: true, research: true, deployment: true }
  },
  {
    id: "sentinel",
    name: "Sentinel",
    description: "Open-source LLM observability and agent reliability proxy with Cost & EU AI Act auditing.",
    extendedDescription: "Sentinel is an open-source, self-hostable proxy that acts as a drop-in replacement for OpenAI/Anthropic SDKs. It records detailed span-tree waterfalls, performs judge-model output validation, executes failover routing, and logs every call inside a secure, SHA-256 chained audit ledger compliant with the EU AI Act.",
    techStack: ["Python", "FastAPI", "Celery", "Redis", "PostgreSQL", "Next.js", "Docker", "Fernet"],
    tier: "featured",
    category: "Agentic AI",
    githubUrl: "https://github.com/Siddharthpatni/Sentinel",
    metrics: [
      { label: "SDK Integration", value: "2 Lines" },
      { label: "Audit Log", value: "SHA-256 Chained" },
      { label: "Failover", value: "Max 3 Retries" }
    ],
    highlights: [],
    problem: "Production LLM applications lack standardization for auditing (especially EU AI Act compliance), debugging multi-step agent chains, and automatic failover during provider outages.",
    solution: "A drop-in proxy intercepting all HTTP requests. It builds a Gantt-style execution tree, hashes payloads for compliance, and falls back to secondary models on 5xx errors.",
    architectureMermaid: `
graph LR
  Client[Client App] --> SDK[OpenAI SDK]
  SDK --> Proxy[Sentinel Proxy]
  Proxy --> Cache{Redis Cache}
  Cache -- Hit --> Client
  Cache -- Miss --> Provider[LLM Provider]
  Provider --> Proxy
  Proxy --> DB[(PostgreSQL Ledger)]
  DB --> Hash[SHA-256 Chain]
    `,
    engineeringDecisions: [
      { decision: "Drop-in Proxy over Custom SDK", reason: "Zero friction adoption. Developers just change the base_url instead of learning a new library." },
      { decision: "SHA-256 Chained Ledger", reason: "Ensures compliance with EU AI Act non-repudiation requirements. Logs cannot be silently altered." }
    ],
    challenges: "Streaming responses. Intercepting and hashing SSE (Server-Sent Events) without introducing noticeable latency to the user.",
    tradeoffs: "Adds ~15ms of latency to every LLM call. This is acceptable for LLM interactions which already take seconds, but prevents use in ultra-low latency scenarios.",
    failures: "Initial implementation tried to buffer the entire stream before hashing. This ruined the streaming UX. Switched to a rolling hash algorithm.",
    testing: ["Unit", "Load Testing (Locust)", "Chaos Engineering (Simulated Outages)"],
    deployment: ["Docker", "CI/CD Pipeline"],
    capabilities: { ai: true, robotics: false, fullstack: true, research: false, deployment: true }
  },
  {
    id: "spidey",
    name: "Spidey",
    description: "Self-hostable autonomous AI agent with voice controls, live reasoning graphs, and offline capabilities.",
    extendedDescription: "Spidey is a self-hostable system featuring a live execution graph, offline voice integration, local LLM execution, and a two-stage SFT/DPO training pipeline. The platform is modular (17 core modules) and runs entirely locally. It allows users to design, visualize, and debug complex agentic workflows in real-time.",
    techStack: ["Python", "FastAPI", "React", "React Flow", "SQLite", "Vosk", "Ollama", "Unsloth"],
    tier: "featured",
    category: "Agentic AI",
    githubUrl: "https://github.com/Siddharthpatni/Spidey",
    metrics: [
      { label: "Architecture", value: "ReAct Loop" },
      { label: "Fine-Tuning", value: "SFT & DPO" },
      { label: "Voice", value: "Local/Offline" }
    ],
    highlights: [],
    capabilities: { ai: true, robotics: false, fullstack: true, research: true, deployment: false }
  },
  {
    id: "cereforge",
    name: "Cereforge",
    description: "Interactive learning and practice platform for AI & MLOps engineers.",
    extendedDescription: "Cereforge is a competitive AI engineering platform designed to bridge the gap between simple tutorials and complex production architectures. It provides 24 curated design tasks across LLMs, RAG, Vision, and Agents.",
    techStack: ["Python", "FastAPI", "PostgreSQL", "React", "Zustand", "Gemini API", "Docker"],
    tier: "standard",
    category: "AI & ML",
    githubUrl: "https://github.com/Siddharthpatni/Cereforge",
    metrics: [
      { label: "Tasks", value: "24 Challenges" },
      { label: "UI", value: "React + Tailwind" }
    ],
    highlights: [],
    capabilities: { ai: true, robotics: false, fullstack: true, research: false, deployment: true }
  },
  {
    id: "workflow-engine",
    name: "Workflow Engine",
    description: "Distributed, low-code workflow automation engine with sandboxed execution runtimes.",
    extendedDescription: "An open-source alternative to n8n built for high-throughput visual automation. Jobs are fanned out to Redis and consumed by out-of-process Bull workers.",
    techStack: ["Node.js", "Express", "React Flow", "PostgreSQL", "Redis", "Bull", "Docker"],
    tier: "standard",
    category: "Full-Stack",
    githubUrl: "https://github.com/Siddharthpatni/Workflow_Engine",
    metrics: [
      { label: "Runtimes", value: "JS vm & Python Docker" }
    ],
    highlights: [],
    capabilities: { ai: false, robotics: false, fullstack: true, research: false, deployment: true }
  }
];
