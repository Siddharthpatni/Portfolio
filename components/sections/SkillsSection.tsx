"use client";
import React from "react";
import { skillGroups } from "@/lib/data/skills";
import { SectionHeader } from "../ui/SectionHeader";
import { GlassCard } from "../ui/GlassCard";
import { Terminal, Zap, Layers } from "lucide-react";

const tierConfig = {
  primary: { label: "PRIMARY", icon: Zap, color: "text-spidey-red", border: "border-spidey-red/20" },
  supporting: { label: "SUPPORTING", icon: Layers, color: "text-holo-cyan", border: "border-holo-cyan/20" },
  learning: { label: "LEARNING", icon: Terminal, color: "text-stark-gold", border: "border-stark-gold/20" },
};

export const SkillsSection: React.FC = () => {
  return (
    <section id="skills" aria-label="Technical skills" className="py-16 sm:py-24 px-4 sm:px-6 relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          number="SEC_04"
          title="ENGINEERING STACK // CAPABILITIES"
          subtitle="Technologies used in production across agentic AI, robotics, and full-stack systems."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-10 sm:mt-12">
          {skillGroups.map((group, idx) => {
            const config = tierConfig[group.tier];
            const TierIcon = config.icon;
            return (
              <GlassCard
                key={idx}
                glowColor={group.tier === "primary" ? "red" : group.tier === "supporting" ? "cyan" : "gold"}
                hoverEffect={false}
                className="p-4 sm:p-6"
              >
                {/* Category Header */}
                <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
                  <h3 className="text-xs sm:text-sm font-bold text-white font-mono flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-holo-cyan shrink-0" aria-hidden="true" />
                    <span className="break-words">{group.category.toUpperCase()}</span>
                  </h3>
                  <span className={`flex items-center gap-1 font-mono text-[8px] ${config.color} tracking-widest`}>
                    <TierIcon className="w-3 h-3" aria-hidden="true" />
                    {config.label}
                  </span>
                </div>

                {/* Skills as clean tags instead of progress bars */}
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className={`px-2.5 py-1.5 rounded-md font-mono text-[10px] sm:text-[11px] border bg-white/2.5 text-gray-300 ${config.border} hover:text-white hover:bg-white/5 transition-colors`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};
