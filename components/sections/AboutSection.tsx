"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { personalInfo } from "@/lib/data/personal";
import { GlassCard } from "../ui/GlassCard";
import { SectionHeader } from "../ui/SectionHeader";
import { Terminal, ShieldCheck, Database, Award, Languages, MapPin } from "lucide-react";

const StatCounter: React.FC<{ target: number; suffix?: string; label: string }> = ({
  target,
  suffix = "",
  label,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const duration = 1200;
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          setValue(Math.round(target * (1 - Math.pow(1 - progress, 3))));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="bg-white/2.5 border border-white/5 rounded-lg p-3 sm:p-4 text-center font-mono">
      <div className="text-xl sm:text-2xl md:text-3xl font-black text-spidey-red leading-none">
        {value}
        {suffix}
      </div>
      <div className="text-[8px] sm:text-[9px] text-gray-500 mt-2 uppercase tracking-widest">{label}</div>
    </div>
  );
};

export const AboutSection: React.FC = () => {
  return (
    <section id="about" aria-label="About Siddharth Patni" className="py-16 sm:py-24 px-4 sm:px-6 relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          number="SEC_01"
          title="ABOUT // EXECUTIVE SUMMARY"
          subtitle="Who I am, what I build, and what problems I solve."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-10 sm:mt-12 items-center">
          
          {/* Profile Photo Display Frame */}
          <div className="lg:col-span-4 flex justify-center relative">
            {/* Circular Tech Rings */}
            <div className="absolute w-[280px] h-[280px] border border-holo-cyan/15 rounded-full animate-spin [animation-duration:20s] pointer-events-none" aria-hidden="true" />
            <div className="absolute w-[268px] h-[268px] border border-dashed border-spidey-red/20 rounded-full animate-spin [animation-duration:15s] pointer-events-none" aria-hidden="true" />
            
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-full overflow-hidden border-2 border-spidey-red/40 shadow-[0_0_30px_rgba(226,54,54,0.3)]">
              {/* Photo component */}
              <Image
                src="/profile-photo.jpg"
                alt={personalInfo.name}
                fill
                sizes="(max-width: 768px) 192px, 256px"
                className="object-cover grayscale hover:grayscale-0 transition-all duration-500 scale-105 hover:scale-100"
              />
              <div className="absolute inset-0 bg-spidey-red/10 mix-blend-color pointer-events-none" aria-hidden="true" />
              {/* Scanline layer overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.03] to-transparent animate-[scan_3s_linear_infinite] pointer-events-none" aria-hidden="true" />
            </div>
          </div>

          {/* Biography and Directives */}
          <div className="lg:col-span-8 space-y-5 sm:space-y-6">
            <h3 className="text-lg sm:text-xl font-bold text-white font-mono flex items-center gap-2">
              <Terminal className="w-5 h-5 text-spidey-red shrink-0" aria-hidden="true" />
              EXECUTIVE_SUMMARY
            </h3>
            
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
              I build <strong className="text-white">production-grade AI systems</strong> spanning agentic workflows, robotics software, retrieval-augmented generation, and autonomous decision-making. My work combines <strong className="text-white">software engineering, machine learning, and robotics</strong> to solve real-world automation problems — with experience across both research and industry.
            </p>

            <p className="text-gray-400 leading-relaxed text-sm">
              Currently pursuing M.Sc. Digital Technologies at TU Clausthal &amp; Ostfalia University, Germany. 
              Previously shipped production systems at Ciconia Systems GmbH (CORE Research Group) and L&amp;T Technology Services.
            </p>

            {/* Language protocols + base location */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 font-mono text-[10px]">
              <span className="flex items-center gap-1.5 text-gray-500 uppercase tracking-widest">
                <Languages className="w-3.5 h-3.5 text-holo-cyan" aria-hidden="true" />
                LANG:
              </span>
              <span className="px-2 py-1 border border-holo-cyan/20 bg-holo-cyan/5 rounded text-holo-cyan">
                ENGLISH — C1
              </span>
              <span className="px-2 py-1 border border-stark-gold/20 bg-stark-gold/5 rounded text-stark-gold">
                GERMAN — A2–B1
              </span>
              <span className="flex items-center gap-1 px-2 py-1 border border-white/10 bg-white/2.5 rounded text-gray-400">
                <MapPin className="w-3 h-3 text-spidey-red" aria-hidden="true" />
                {personalInfo.location}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-2 sm:pt-4">
              <GlassCard glowColor="red" hoverEffect={false} className="p-3 sm:p-4 flex flex-col gap-2">
                <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-spidey-red" aria-hidden="true" />
                <h4 className="font-bold text-white text-xs font-mono">AGENTIC AI</h4>
                <p className="text-[10px] text-gray-400">Cascade pipelines, Computer Use Agents, self-learning route systems, and production LLM infrastructure.</p>
              </GlassCard>

              <GlassCard glowColor="cyan" hoverEffect={false} className="p-3 sm:p-4 flex flex-col gap-2">
                <Database className="w-5 h-5 sm:w-6 sm:h-6 text-holo-cyan" aria-hidden="true" />
                <h4 className="font-bold text-white text-xs font-mono">SYSTEMS ENGINEERING</h4>
                <p className="text-[10px] text-gray-400">Distributed task queues, observability proxies, EU AI Act compliance, and MLOps pipelines.</p>
              </GlassCard>

              <GlassCard glowColor="gold" hoverEffect={false} className="p-3 sm:p-4 flex flex-col gap-2">
                <Award className="w-5 h-5 sm:w-6 sm:h-6 text-stark-gold" aria-hidden="true" />
                <h4 className="font-bold text-white text-xs font-mono">ROBOTICS</h4>
                <p className="text-[10px] text-gray-400">Multi-robot coordination (Pepper + Temi), SLAM navigation, and IoT sensor networks.</p>
              </GlassCard>
            </div>
          </div>

        </div>

        {/* Animated field statistics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-12 sm:mt-16">
          <StatCounter target={10} suffix="+" label="Projects_Shipped" />
          <StatCounter target={262} suffix="+" label="Tests_Passing" />
          <StatCounter target={2} label="IEEE_Papers" />
          <StatCounter target={7} label="Cascade_Strategies" />
        </div>
      </div>
    </section>
  );
};
