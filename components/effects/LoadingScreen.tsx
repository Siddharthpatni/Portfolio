"use client";
import React, { useEffect, useState } from "react";

export const LoadingScreen: React.FC = () => {
  const [phase, setPhase] = useState<"loading" | "fading" | "done">("loading");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("done");
      return;
    }
    const fadeTimer = setTimeout(() => setPhase("fading"), 1300);
    const doneTimer = setTimeout(() => setPhase("done"), 1900);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[100] bg-bg-dark flex flex-col items-center justify-center gap-6 font-mono transition-opacity duration-600 ${
        phase === "fading" ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Spider emblem pulse */}
      <div className="relative">
        <div className="absolute inset-0 rounded-full border border-spidey-red/30 animate-ping" />
        <div className="w-20 h-20 rounded-full border-2 border-spidey-red/50 bg-spidey-red/5 flex items-center justify-center text-4xl shadow-[0_0_40px_rgba(226,54,54,0.3)]">
          🕷️
        </div>
      </div>

      <div className="text-xs text-gray-400 tracking-widest uppercase">
        Initializing Spider Sense<span className="animate-pulse">...</span>
      </div>

      {/* Boot progress bar */}
      <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-spidey-red to-holo-cyan rounded-full animate-[loadbar_1.3s_ease-out_forwards]" />
      </div>
    </div>
  );
};
