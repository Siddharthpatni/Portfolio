"use client";
import React from "react";
import { certifications } from "@/lib/data/certifications";
import { SectionHeader } from "../ui/SectionHeader";
import { GlassCard } from "../ui/GlassCard";
import { Award, BookOpen, Trophy, Calendar, ExternalLink } from "lucide-react";

const typeConfig = {
  certification: { icon: Award, color: "text-holo-cyan", borderColor: "border-holo-cyan/20", bgColor: "bg-holo-cyan/10" },
  achievement: { icon: Trophy, color: "text-stark-gold", borderColor: "border-stark-gold/20", bgColor: "bg-stark-gold/10" },
  coursework: { icon: BookOpen, color: "text-spidey-red", borderColor: "border-spidey-red/20", bgColor: "bg-spidey-red/10" },
};

export const CertificationsSection: React.FC = () => {
  return (
    <section id="certifications" className="py-16 sm:py-24 px-4 sm:px-6 relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          number="SEC_05"
          title="CERTIFICATIONS // ACHIEVEMENTS"
          subtitle="Professional certifications, research achievements, and notable coursework."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mt-10 sm:mt-12">
          {certifications.map((cert, idx) => {
            const config = typeConfig[cert.type];
            const Icon = config.icon;

            return (
              <GlassCard
                key={idx}
                glowColor={cert.type === "certification" ? "cyan" : cert.type === "achievement" ? "gold" : "red"}
                hoverEffect
                className="p-4 sm:p-5 flex flex-col gap-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className={`p-2 rounded ${config.bgColor} border ${config.borderColor} shrink-0`}>
                    <Icon className={`w-4 h-4 ${config.color}`} />
                  </div>
                  <span className="text-[8px] sm:text-[9px] font-mono text-gray-500 uppercase tracking-wider mt-1">
                    {cert.type}
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-white text-xs sm:text-sm leading-snug">
                    {cert.title}
                  </h4>
                  <div className="text-[10px] sm:text-xs text-gray-400 font-mono mt-1.5 break-words">
                    {cert.issuer}
                  </div>
                </div>

                {cert.credentialId && (
                  <div className="text-[9px] font-mono text-gray-500">
                    ID: {cert.credentialId}
                  </div>
                )}

                <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/5">
                  <div className="flex items-center gap-1.5 font-mono text-[10px] text-gray-500">
                    <Calendar className="w-3 h-3 shrink-0" />
                    {cert.date}
                  </div>
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-[9px] font-mono text-holo-cyan hover:text-white transition-colors"
                    >
                      VERIFY
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};
