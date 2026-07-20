"use client";
import React from "react";
import { personalInfo } from "@/lib/data/personal";
import { SpiderButton } from "../ui/SpiderButton";
import { TypeWriter } from "../ui/TypeWriter";
import { Rocket, Cpu, Activity, ArrowDown, Github, Linkedin, Mail, FileDown } from "lucide-react";

export const HeroSection: React.FC = () => {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center relative pt-20 px-4 sm:px-6 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        
        {/* Left column: Text Content */}
        <div className="lg:col-span-7 flex flex-col items-start">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-spidey-red/20 bg-spidey-red/5 font-mono text-[10px] text-spidey-red mb-6 tracking-widest uppercase">
            <Rocket className="w-3.5 h-3.5 animate-pulse" />
            INTELLIGENCE_SYSTEM_INITIATED
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-none">
            {personalInfo.name.toUpperCase()}
          </h1>
          
          <div className="mt-3 text-base sm:text-lg lg:text-xl font-mono text-gray-400 flex flex-wrap gap-x-2 gap-y-1 items-center">
            <span>&gt; DEVELOPING</span>
            <TypeWriter
              words={[
                "AUTONOMOUS AGENTIC AI",
                "VISUAL BROWSER AUTOMATION",
                "ROBOTICS & IoT NETWORKS",
                "RECON SCRAPER CASCADES"
              ]}
            />
          </div>

          <p className="mt-6 text-gray-400 text-sm sm:text-base max-w-lg leading-relaxed font-sans">
            {personalInfo.bio}
          </p>

          <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
            <a href="#projects">
              <SpiderButton variant="primary">
                VIEW_PROJECTS
              </SpiderButton>
            </a>
            <a href={personalInfo.resumeUrl} target="_blank" rel="noopener noreferrer">
              <SpiderButton variant="secondary">
                <FileDown className="w-4 h-4" />
                DOWNLOAD_RESUME
              </SpiderButton>
            </a>
            <a href="#contact">
              <SpiderButton variant="outline">
                CONTACT_ME
              </SpiderButton>
            </a>
          </div>

          {/* Social channel links */}
          <div className="mt-8 flex items-center gap-5 font-mono text-[10px] text-gray-500">
            <span className="tracking-widest uppercase hidden sm:inline">CONNECT:</span>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
              className="text-gray-400 hover:text-holo-cyan transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              title="Email"
              className="text-gray-400 hover:text-spidey-red transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Right column: HUD System Diagnostic Screen */}
        <div className="lg:col-span-5">
          <div className="border border-holo-cyan/20 bg-bg-card backdrop-blur-md rounded-xl p-4 sm:p-6 font-mono text-xs text-gray-400 shadow-[0_0_30px_rgba(0,243,255,0.05)] relative overflow-hidden holo-scan">
            {/* Corner Bracket decorations */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-holo-cyan" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-holo-cyan" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-holo-cyan" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-holo-cyan" />

            <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-holo-cyan animate-pulse" />
                <span className="font-bold text-white text-[11px]">LAB_DIAGNOSTICS_v1.08</span>
              </div>
              <span className="text-[10px] text-holo-cyan animate-pulse">● SECURE</span>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center bg-white/2.5 p-2 rounded border border-white/5">
                <span className="text-gray-500">USER_ALIAS:</span>
                <span className="text-spidey-red font-semibold">{personalInfo.alias}</span>
              </div>

              <div className="flex justify-between items-center bg-white/2.5 p-2 rounded border border-white/5">
                <span className="text-gray-500">GEO_COORDS:</span>
                <span className="text-white">{personalInfo.location}</span>
              </div>

              <div className="flex justify-between items-center bg-white/2.5 p-2 rounded border border-white/5">
                <span className="text-gray-500">QUOTE:</span>
                <span className="text-white text-right max-w-[200px] text-[10px] italic">
                  &quot;{personalInfo.tagline}&quot;
                </span>
              </div>

              <div className="pt-2">
                <div className="flex justify-between text-[10px] text-gray-500 mb-1">
                  <span>NEURAL_FLOW_DENSITY</span>
                  <span className="text-holo-cyan">94%</span>
                </div>
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-holo-cyan h-full rounded-full w-[94%] shadow-[0_0_10px_rgba(0,243,255,0.4)]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[10px] text-gray-500 mb-1">
                  <span>SYSTEM_ENERGY_RESERVE</span>
                  <span className="text-spidey-red">100%</span>
                </div>
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-spidey-red h-full rounded-full w-full shadow-[0_0_10px_rgba(226,54,54,0.4)]" />
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-[10px] text-gray-500 pt-2 border-t border-white/5">
                <Activity className="w-3.5 h-3.5 text-holo-cyan animate-pulse" />
                <span>CASCADE_PIPELINE: STANDBY_OK</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Centered scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 font-mono text-[9px] text-gray-500 animate-bounce">
        <span>SCROLL_DOWN</span>
        <ArrowDown className="w-4 h-4 text-spidey-red" />
      </div>
    </section>
  );
};
