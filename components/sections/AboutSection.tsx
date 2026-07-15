"use client";
import React from "react";
import Image from "next/image";
import { personalInfo } from "@/lib/data/personal";
import { GlassCard } from "../ui/GlassCard";
import { SectionHeader } from "../ui/SectionHeader";
import { Terminal, ShieldCheck, Database, Award } from "lucide-react";

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          number="SEC_01"
          title="LABORATORY SPECS // PETER PARKER PROFILE"
          subtitle="Decrypting profile, bio metrics, and core research directives."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12 items-center">
          
          {/* Profile Photo Display Frame */}
          <div className="lg:col-span-4 flex justify-center relative">
            {/* Circular Hologram Tech Rings */}
            <div className="absolute inset-0 border border-holo-cyan/15 rounded-full scale-110 animate-spin [animation-duration:20s] pointer-events-none" />
            <div className="absolute inset-0 border border-dashed border-spidey-red/20 rounded-full scale-105 animate-spin [animation-duration:15s] pointer-events-none" />
            
            <div className="relative w-64 h-64 rounded-full overflow-hidden border-2 border-spidey-red/40 shadow-[0_0_30px_rgba(226,54,54,0.3)]">
              {/* Photo component */}
              <Image
                src="/profile-photo.jpg"
                alt={personalInfo.name}
                fill
                sizes="(max-width: 768px) 100vw, 300px"
                className="object-cover grayscale hover:grayscale-0 transition-all duration-500 scale-105 hover:scale-100"
              />
              <div className="absolute inset-0 bg-spidey-red/10 mix-blend-color pointer-events-none" />
              {/* Scanline layer overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.03] to-transparent animate-[scan_3s_linear_infinite] pointer-events-none" />
            </div>
          </div>

          {/* Biography and Directives */}
          <div className="lg:col-span-8 space-y-6">
            <h3 className="text-xl font-bold text-white font-mono flex items-center gap-2">
              <Terminal className="w-5 h-5 text-spidey-red" />
              // CORE_DIRECTIVES: INTEL_AUDIT
            </h3>
            
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
              Welcome to the interface. I coordinate AI agents, design visual workflow orchestrators, and integrate MLOps pipelines. My developmental approach centers around building <strong className="text-white">highly resilient systems</strong> designed to solve complex data challenges at massive scale, mirroring Stark technology principles.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <GlassCard glowColor="red" hoverEffect={false} className="p-4 flex flex-col gap-2">
                <ShieldCheck className="w-6 h-6 text-spidey-red" />
                <h4 className="font-bold text-white text-xs font-mono">AGENTIC SECURITY</h4>
                <p className="text-[10px] text-gray-400">Implementing strict sandbox wrappers, circuit breakers, and rate limiters to guarantee runtime safety.</p>
              </GlassCard>

              <GlassCard glowColor="cyan" hoverEffect={false} className="p-4 flex flex-col gap-2">
                <Database className="w-6 h-6 text-holo-cyan" />
                <h4 className="font-bold text-white text-xs font-mono">SCALABLE MLOPS</h4>
                <p className="text-[10px] text-gray-400">Fanning out massive extraction pipelines with Redis, Celery, and parallel asyncio chunk workers.</p>
              </GlassCard>

              <GlassCard glowColor="gold" hoverEffect={false} className="p-4 flex flex-col gap-2">
                <Award className="w-6 h-6 text-stark-gold" />
                <h4 className="font-bold text-white text-xs font-mono">ROBOTIC LOGISTICS</h4>
                <p className="text-[10px] text-gray-400">Coordinating multi-robot networks (Pepper + Temi) with speech capabilities and weight sensor networks.</p>
              </GlassCard>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
