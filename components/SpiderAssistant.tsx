"use client";
import React, { useState, useEffect, useRef } from "react";
import { X, Send, Bot, Shield } from "lucide-react";
import { GlassCard } from "./ui/GlassCard";
import { personalInfo } from "@/lib/data/personal";

interface Message {
  sender: "user" | "karen";
  text: string;
}

// Keyword-matched knowledge base. First topic whose keywords hit the query wins.
// Hook for the future: swap answerFor() with a fetch to an LLM API route.
const knowledgeBase: { keys: string[]; answer: string }[] = [
  {
    keys: ["vergabepilot", "procurement", "tender", "ciconia", "core research", "flagship"],
    answer:
      "Vergabepilot.AI is Siddharth's flagship research project for CORE Research Group / Ciconia Systems. It uses a 7-strategy cascade pipeline (including Playwright and visual Computer Use Agents) to fetch public-procurement documents across 30+ portal families. It features rate limiters, circuit breakers, 262 passing tests, and extracts 32 structured fields per document.",
  },
  {
    keys: ["spidey", "voice", "reasoning graph", "offline agent", "dpo", "sft"],
    answer:
      "Spidey is an autonomous laboratory assistant agent built with a live React Flow reasoning graph, offline Vosk voice controls, and local model execution via Ollama. It has a two-stage SFT/DPO training pipeline and is designed to run completely offline for ultimate privacy.",
  },
  {
    keys: ["sentinel", "observability", "audit", "eu ai act", "proxy"],
    answer:
      "Sentinel is an open-source LLM observability proxy — a drop-in replacement for OpenAI/Anthropic SDK base URLs. It records span-tree waterfalls, runs judge-model validation, handles failover routing, and keeps a SHA-256 chained audit ledger aligned with the EU AI Act.",
  },
  {
    keys: ["cereforge", "learning platform", "practice", "leaderboard"],
    answer:
      "Cereforge is a competitive AI engineering platform with 24 curated design tasks across LLMs, RAG, Vision, and Agents. Solutions are evaluated by a Gemini-based engine with progressive hints, XP, a leaderboard, and a StackOverflow-style forum.",
  },
  {
    keys: ["workflow", "n8n", "automation engine", "low-code", "bull"],
    answer:
      "Workflow Engine is an open-source n8n alternative: a drag-and-drop React Flow canvas where jobs fan out to distributed Bull workers over Redis. JavaScript nodes run in sandboxed Node VMs and Python nodes in isolated Docker containers.",
  },
  {
    keys: ["shopmate", "robot", "pepper", "temi", "robotics", "grocery"],
    answer:
      "ShopMate-R is a multi-robot shopping assistant: a Pepper humanoid handles speech dialog and cart display while a Temi robot navigates aisles and delivers products, all orchestrated by a central Flask server with M5Stack IoT shelf sensors.",
  },
  {
    keys: ["driver", "adas", "yolo", "safety", "vision", "cnn"],
    answer:
      "AI Driver Safety is an ADAS prototype running four concurrent tracks: CNN traffic-sign recognition, YOLOv4 pedestrian detection, dlib drowsiness monitoring, and Arduino/OBD-II hardware integration for alerts and auto-braking.",
  },
  {
    keys: ["project", "portfolio", "built", "work on", "showcase"],
    answer:
      "The Spider Lab holds 11 projects. Flagships: Vergabepilot.AI (agentic procurement extraction) and Spidey (self-hostable autonomous agent). Featured: Sentinel, Cereforge, Workflow Engine, and ShopMate-R. Ask me about any of them by name!",
  },
  {
    keys: ["stack", "tech", "technolog", "skill", "language", "framework", "tools"],
    answer:
      "Siddharth's core stack covers Agentic AI (browser-use, Playwright, Celery), Machine Learning (PyTorch, TensorFlow, Transformers, LLM fine-tuning), Full-Stack Systems (Next.js, FastAPI, Node.js, PostgreSQL, Redis), DevOps (Docker, GitHub Actions, Prometheus), and Robotics (Pepper, Temi, Arduino).",
  },
  {
    keys: ["experience", "job", "intern", "career", "worked", "employer"],
    answer:
      "Mission log: AI Software Engineer at Ciconia Systems / CORE Research Group (SoSe 2026, building Vergabepilot.AI), Software Developer Intern at L&T Technology Services (Dec 2023 – Apr 2024), and Data Analyst Intern at Snapfix Ltd. (2023). Plus continuous open-source lab work on Spidey, Sentinel, Cereforge, and Workflow Engine.",
  },
  {
    keys: ["education", "study", "degree", "master", "university", "msc"],
    answer:
      "Training academy: M.Sc. Digital Technologies at TU Clausthal & Ostfalia University, Germany (2025–present); B.Tech Computer Engineering at CHARUSAT (CGPA 7.6); Diploma in Computer Engineering at GTU (CGPA 8.92, High Distinction).",
  },
  {
    keys: ["contact", "email", "reach", "hire", "linkedin", "github", "phone", "call"],
    answer: `You can reach Siddharth at ${personalInfo.email} or ${personalInfo.phone}. He's also on LinkedIn (${personalInfo.linkedin}) and GitHub (${personalInfo.github}). Base of operations: ${personalInfo.location}.`,
  },
  {
    keys: ["hello", "hi ", "hey", "who are you", "karen"],
    answer:
      "Hey there! I'm Karen, the Spider Intelligence assistant for this lab. Ask me about Siddharth's projects (try \"Vergabepilot\" or \"Spidey\"), his tech stack, experience, education, or how to contact him.",
  },
];

const fallbackAnswer =
  "Hmm, my spider-sense isn't tingling on that one. Try asking about a project (Vergabepilot, Spidey, Sentinel, Cereforge...), the tech stack, experience, education, or contact details.";

const answerFor = (query: string): string => {
  const q = query.toLowerCase();
  const hit = knowledgeBase.find((topic) => topic.keys.some((k) => q.includes(k)));
  return hit ? hit.answer : fallbackAnswer;
};

export const SpiderAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "karen",
      text: "System initialized. Welcome to Peter Parker's Lab. I am Karen, your Spider Intelligence assistant. How can I help you audit Siddharth's projects today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing]);

  const presetQuestions = [
    "What is Vergabepilot.AI?",
    "Tell me about Spidey.",
    "What is his tech stack?",
    "How can I contact him?",
  ];

  const ask = (question: string) => {
    const trimmed = question.trim();
    if (!trimmed || typing) return;

    setMessages((prev) => [...prev, { sender: "user", text: trimmed }]);
    setInput("");
    setTyping(true);

    const answer = answerFor(trimmed);
    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "karen", text: answer }]);
      setTyping(false);
    }, 900);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-mono">
      {/* Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open Spider Intelligence assistant"
          className="w-14 h-14 rounded-full bg-bg-card border border-spidey-red/40 hover:border-holo-cyan/50 text-white flex items-center justify-center shadow-[0_0_20px_rgba(226,54,54,0.2)] hover:shadow-[0_0_30px_rgba(0,243,255,0.4)] transition-all duration-300 group cursor-pointer"
        >
          <Shield className="w-6 h-6 text-spidey-red group-hover:text-holo-cyan transition-colors duration-300 animate-pulse" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-holo-cyan opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-holo-cyan"></span>
          </span>
        </button>
      )}

      {/* dialogue panel */}
      {isOpen && (
        <GlassCard
          glowColor="cyan"
          hoverEffect={false}
          className="w-[min(380px,calc(100vw-3rem))] h-[520px] max-h-[calc(100dvh-6rem)] flex flex-col p-4 border border-holo-cyan/20 shadow-2xl relative"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-holo-cyan animate-pulse" />
              <div>
                <div className="text-white font-bold text-xs">SPIDER_INTEL_KAREN</div>
                <div className="text-[9px] text-holo-cyan">STATUS: LAB_ONLINE</div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close assistant"
              className="text-gray-500 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages feed */}
          <div
            ref={scrollRef}
            className="flex-grow overflow-y-auto my-3 space-y-3 pr-1 text-xs"
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${
                  msg.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <span className="text-[9px] text-gray-500 mb-0.5">
                  {msg.sender === "user" ? "// YOU" : "// KAREN"}
                </span>
                <div
                  className={`p-2.5 rounded-lg max-w-[85%] leading-relaxed break-words ${
                    msg.sender === "user"
                      ? "bg-spidey-red/10 border border-spidey-red/20 text-white"
                      : "bg-white/5 border border-white/10 text-gray-300"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {typing && (
              <div className="flex flex-col items-start">
                <span className="text-[9px] text-gray-500 mb-0.5">// KAREN</span>
                <div className="bg-white/5 border border-white/10 p-2.5 rounded-lg text-holo-cyan flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-holo-cyan rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-holo-cyan rounded-full animate-bounce delay-100" />
                  <span className="w-1.5 h-1.5 bg-holo-cyan rounded-full animate-bounce delay-200" />
                </div>
              </div>
            )}
          </div>

          {/* Preset options */}
          <div className="border-t border-white/5 pt-3">
            <div className="text-[9px] text-gray-500 mb-2">// QUICK SUGGESTIONS</div>
            <div className="grid grid-cols-2 gap-2">
              {presetQuestions.map((q) => (
                <button
                  key={q}
                  disabled={typing}
                  onClick={() => ask(q)}
                  className="p-2 border border-white/5 bg-white/2.5 text-left rounded-md text-[10px] text-gray-400 hover:text-holo-cyan hover:border-holo-cyan/30 hover:bg-holo-cyan/5 transition-all duration-200 cursor-pointer disabled:opacity-50"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Free-text query input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                ask(input);
              }}
              className="mt-3 flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Karen anything..."
                aria-label="Ask the assistant a question"
                className="flex-grow bg-white/5 border border-white/10 rounded-md px-3 py-2 text-[11px] text-white placeholder:text-gray-600 focus:outline-none focus:border-holo-cyan/50 transition-colors"
              />
              <button
                type="submit"
                disabled={typing || !input.trim()}
                aria-label="Send question"
                className="p-2 rounded-md border border-holo-cyan/30 bg-holo-cyan/10 text-holo-cyan hover:bg-holo-cyan/20 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </GlassCard>
      )}
    </div>
  );
};
