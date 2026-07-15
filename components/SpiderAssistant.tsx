"use client";
import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Bot, Shield } from "lucide-react";
import { GlassCard } from "./ui/GlassCard";
import { personalInfo } from "@/lib/data/personal";

interface Message {
  sender: "user" | "karen";
  text: string;
}

export const SpiderAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "karen",
      text: "System initialized. Welcome to Peter Parker's Lab. I am Karen, your Spider Intelligence assistant. How can I help you audit Siddharth's projects today?"
    }
  ]);
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing]);

  const presetQuestions = [
    { q: "What is Vergabepilot.AI?", key: "vergabepilot" },
    { q: "Tell me about Spidey agent.", key: "spidey" },
    { q: "What is his core tech stack?", key: "stack" },
    { q: "How can I contact him?", key: "contact" }
  ];

  const handleQuestionSelect = (question: string, key: string) => {
    if (typing) return;
    
    // Add user question
    setMessages((prev) => [...prev, { sender: "user", text: question }]);
    setTyping(true);

    let answer = "";
    switch (key) {
      case "vergabepilot":
        answer = "Vergabepilot.AI is Siddharth's flagship research project for CORE Research Group / Ciconia Systems. It uses a 7-strategy cascade pipeline (including Playwright and visual Computer Use Agents) to fetch public-procurement documents. It is fully resilient, features rate limiters and circuit breakers, and extracts 32 structured fields.";
        break;
      case "spidey":
        answer = "Spidey is an autonomous laboratory assistant agent built with a live React Flow reasoning graph, offline Vosk voice controls, and local model execution via Ollama. It has a two-stage SFT/DPO training pipeline and is designed to run completely offline for ultimate privacy.";
        break;
      case "stack":
        answer = "Siddharth's core stack covers Agentic AI (browser-use, Playwright, Celery), Machine Learning (PyTorch, TensorFlow, Transformers, LLM fine-tuning), Full-Stack Systems (Next.js, FastAPI, Node.js, Express, PostgreSQL, Redis), and Robotics (Pepper, Temi, Arduino).";
        break;
      case "contact":
        answer = `You can reach out to Siddharth directly at ${personalInfo.email}. He is also available on LinkedIn (${personalInfo.linkedin}) and shares open-source intelligence on GitHub (${personalInfo.github}).`;
        break;
      default:
        answer = "Inquiry registered. System is currently analyzing the request.";
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "karen", text: answer }]);
      setTyping(false);
    }, 1200);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-mono">
      {/* Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-bg-card border border-spidey-red/40 hover:border-holo-cyan/50 text-white flex items-center justify-center shadow-[0_0_20px_rgba(226,54,54,0.2)] hover:shadow-[0_0_30px_rgba(0,243,255,0.4)] transition-all duration-300 group cursor-pointer"
        >
          {/* Glowing suit spider indicator */}
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
          className="w-[340px] sm:w-[380px] h-[450px] flex flex-col p-4 border border-holo-cyan/20 shadow-2xl relative"
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
                  className={`p-2.5 rounded-lg max-w-[85%] leading-relaxed ${
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
                  key={q.key}
                  disabled={typing}
                  onClick={() => handleQuestionSelect(q.q, q.key)}
                  className="p-2 border border-white/5 bg-white/2.5 text-left rounded-md text-[10px] text-gray-400 hover:text-holo-cyan hover:border-holo-cyan/30 hover:bg-holo-cyan/5 transition-all duration-200 cursor-pointer disabled:opacity-50"
                >
                  {q.q}
                </button>
              ))}
            </div>
          </div>
        </GlassCard>
      )}
    </div>
  );
};
