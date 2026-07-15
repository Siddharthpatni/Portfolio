"use client";
import React from "react";
import { skillGroups } from "@/lib/data/skills";
import { SectionHeader } from "../ui/SectionHeader";
import { GlassCard } from "../ui/GlassCard";
import { Terminal, Shield } from "lucide-react";

export const SkillsSection: React.FC = () => {
  return (
    <section id="skills" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          number="SEC_04"
          title="SKILLS MODULES // SUIT DIAGNOSTICS"
          subtitle="Real-time capacity, skill density index, and core technology layers."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          {skillGroups.map((group, idx) => (
            <GlassCard key={idx} glowColor="cyan" hoverEffect={false} className="p-6">
              <h3 className="text-base font-bold text-white font-mono flex items-center gap-2 border-b border-white/5 pb-3 mb-5">
                <Terminal className="w-4 h-4 text-holo-cyan" />
                {group.category.toUpperCase()}
              </h3>

              <div className="space-y-4">
                {group.items.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between font-mono text-[10px] text-gray-400 mb-1.5">
                      <span className="flex items-center gap-1.5">
                        <Shield className="w-3 h-3 text-spidey-red/60" />
                        {skill.name}
                      </span>
                      <span className="text-holo-cyan font-bold">{skill.level}%</span>
                    </div>

                    <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden relative">
                      {/* Animated Glow fill bar */}
                      <div
                        className="bg-holo-cyan h-full rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};
