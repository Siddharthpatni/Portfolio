"use client";
import React from "react";
import { educations } from "@/lib/data/education";
import { SectionHeader } from "../ui/SectionHeader";
import { GlassCard } from "../ui/GlassCard";
import { GraduationCap, Award, Calendar } from "lucide-react";

export const EducationSection: React.FC = () => {
  return (
    <section id="education" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          number="SEC_05"
          title="ACADEMIC RECORDS // EDUCATIONAL NODES"
          subtitle="Decrypting study profiles, research coursework, and academic credentials."
        />

        <div className="mt-12 max-w-4xl mx-auto space-y-6">
          {educations.map((edu, idx) => (
            <GlassCard key={idx} glowColor="gold" hoverEffect className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-4 mb-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded bg-stark-gold/10 border border-stark-gold/20 text-stark-gold mt-1">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white leading-tight">
                      {edu.degree}
                    </h3>
                    <div className="text-stark-gold font-mono text-xs mt-1">
                      {edu.institution}
                    </div>
                  </div>
                </div>

                <span className="flex items-center gap-1.5 font-mono text-xs text-gray-500 self-start sm:self-center">
                  <Calendar className="w-3.5 h-3.5" />
                  {edu.period}
                </span>
              </div>

              <div className="space-y-3 font-sans">
                {edu.details.map((detail, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-2.5 text-gray-300 text-xs sm:text-sm">
                    <Award className="w-4 h-4 text-spidey-red shrink-0 mt-0.5" />
                    <span>{detail}</span>
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
