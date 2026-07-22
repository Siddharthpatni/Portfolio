export interface SkillGroup {
  category: string;
  tier: "primary" | "supporting" | "learning";
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: "Agentic AI & Automation",
    tier: "primary",
    items: [
      "browser-use (CUA)",
      "Playwright Automation",
      "Cascade Pipelines",
      "Self-Healing Scrapers",
      "Celery & Bull Queues",
      "Live Reason Graphs",
    ],
  },
  {
    category: "AI, ML & Computer Vision",
    tier: "primary",
    items: [
      "PyTorch & TensorFlow",
      "OpenAI / Gemini / OpenRouter",
      "SFT & DPO Fine-tuning",
      "OpenCV & dlib",
      "HuggingFace Transformers",
    ],
  },
  {
    category: "Full-Stack Development",
    tier: "primary",
    items: [
      "TypeScript & JavaScript",
      "FastAPI & Flask",
      "Next.js & React 18/19",
      "Node.js & Express",
      "Tailwind CSS & CSS Grid",
    ],
  },
  {
    category: "Data & Infrastructure",
    tier: "supporting",
    items: [
      "PostgreSQL & SQLite",
      "Redis Caching/Queues",
      "MinIO & S3 Storage",
      "Docker & Compose",
      "Prometheus Monitoring",
      "GitHub Actions CI/CD",
    ],
  },
  {
    category: "Robotics & Hardware",
    tier: "supporting",
    items: [
      "Pepper Humanoid",
      "Temi Navigation",
      "Arduino & MQ Sensors",
      "OBD-II & Serial Comm",
    ],
  },
];
