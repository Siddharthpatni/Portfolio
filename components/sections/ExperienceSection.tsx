"use client";
import React from "react";
import { experiences } from "@/lib/data/experience";
import { SectionHeader } from "../ui/SectionHeader";
import { GlassCard } from "../ui/GlassCard";
import { TechTag } from "../ui/TechTag";
import { Calendar, Briefcase, MapPin } from "lucide-react";

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          number="SEC_02"
          title="RESEARCH LOGS // PROFESSIONAL TIMELINE"
          subtitle="Decrypting career data nodes, research posts, and core accomplishments."
        />

        <div className="mt-12 relative border-l border-white/5 pl-6 ml-4 space-y-12">
          {experiences.map((exp) => (
            <div key={exp.id} className="relative group">
              {/* Pulsing timeline bullet */}
              <span className="absolute -left-[31px] top-1.5 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-spidey-red/40 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-spidey-red border-2 border-bg-dark"></span>
              </span>

              <GlassCard glowColor="red" hoverEffect className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-white/5 pb-4 mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-spidey-red" />
                      {exp.role}
                    </h3>
                    <div className="text-holo-cyan font-mono text-xs mt-1">
                      {exp.company}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                <ul className="space-y-2 mb-6">
                  {exp.description.map((bullet, idx) => (
                    <li key={idx} className="text-gray-300 text-xs sm:text-sm leading-relaxed flex items-start gap-2">
                      <span className="text-spidey-red font-mono font-bold mt-0.5">→</span>
                      {bullet}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill) => (
                    <TechTag key={skill} name={skill} />
                  ))}
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
