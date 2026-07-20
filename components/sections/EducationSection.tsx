"use client";
import React from "react";
import { educations } from "@/lib/data/education";
import { SectionHeader } from "../ui/SectionHeader";
import { GlassCard } from "../ui/GlassCard";
import { GraduationCap, Award, Calendar } from "lucide-react";

export const EducationSection: React.FC = () => {
  return (
    <section id="education" className="py-16 sm:py-24 px-4 sm:px-6 relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          number="SEC_06"
          title="ACADEMIC RECORDS // EDUCATION"
          subtitle="Decrypting study profiles, research coursework, and academic credentials."
        />

        <div className="mt-10 sm:mt-12 max-w-4xl mx-auto space-y-4 sm:space-y-6">
          {educations.map((edu, idx) => (
            <GlassCard key={idx} glowColor="gold" hoverEffect className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3 sm:pb-4 mb-3 sm:mb-4">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="p-2 rounded bg-stark-gold/10 border border-stark-gold/20 text-stark-gold mt-0.5 shrink-0">
                    <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                      {edu.degree}
                    </h3>
                    <div className="text-stark-gold font-mono text-[10px] sm:text-xs mt-1 break-words">
                      {edu.institution}
                    </div>
                  </div>
                </div>

                <span className="flex items-center gap-1.5 font-mono text-[10px] sm:text-xs text-gray-500 self-start sm:self-center shrink-0 ml-11 sm:ml-0">
                  <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  {edu.period}
                </span>
              </div>

              <div className="space-y-2.5 sm:space-y-3 font-sans">
                {edu.details.map((detail, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-2 sm:gap-2.5 text-gray-300 text-xs sm:text-sm">
                    <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-spidey-red shrink-0 mt-0.5" />
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
