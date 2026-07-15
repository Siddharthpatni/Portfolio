export interface SkillGroup {
  category: string;
  items: { name: string; level: number }[]; // Level out of 100
}

export const skillGroups: SkillGroup[] = [
  {
    category: "Agentic AI & Automation",
    items: [
      { name: "browser-use (CUA)", level: 90 },
      { name: "Playwright Automation", level: 95 },
      { name: "Cascade Pipelines", level: 95 },
      { name: "Self-Healing Scrapers", level: 90 },
      { name: "Celery & Bull Queues", level: 88 },
      { name: "Live Reason Graphs", level: 85 }
    ]
  },
  {
    category: "AI, ML & Computer Vision",
    items: [
      { name: "PyTorch & TensorFlow", level: 85 },
      { name: "OpenAI / Gemini / OpenRouter", level: 92 },
      { name: "SFT & DPO Fine-tuning", level: 80 },
      { name: "OpenCV & dlib", level: 85 },
      { name: "HuggingFace Transformers", level: 82 }
    ]
  },
  {
    category: "Full-Stack Development",
    items: [
      { name: "TypeScript & JavaScript", level: 95 },
      { name: "FastAPI & Flask", level: 92 },
      { name: "Next.js & React 18/19", level: 90 },
      { name: "Node.js & Express", level: 88 },
      { name: "Tailwind CSS & CSS Grid", level: 90 }
    ]
  },
  {
    category: "Data & Infrastructure",
    items: [
      { name: "PostgreSQL & SQLite", level: 88 },
      { name: "Redis Caching/Queues", level: 90 },
      { name: "MinIO & S3 Storage", level: 85 },
      { name: "Docker & Compose", level: 92 },
      { name: "Prometheus Monitoring", level: 80 },
      { name: "GitHub Actions CI/CD", level: 85 }
    ]
  },
  {
    category: "Robotics & Hardware",
    items: [
      { name: "Pepper Humanoid", level: 85 },
      { name: "Temi Navigation", level: 80 },
      { name: "Arduino & MQ Sensors", level: 78 },
      { name: "OBD-II & Serial Comm", level: 75 }
    ]
  }
];
