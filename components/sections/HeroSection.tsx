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
      aria-label="Introduction"
      className="min-h-screen flex flex-col justify-center relative pt-20 px-4 sm:px-6 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        
        {/* Left column: Text Content */}
        <div className="lg:col-span-7 flex flex-col items-start">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-spidey-red/20 bg-spidey-red/5 font-mono text-[10px] text-spidey-red mb-6 tracking-widest uppercase">
            <Rocket className="w-3.5 h-3.5 animate-pulse" aria-hidden="true" />
            ENGINEERING_SYSTEMS_ONLINE
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
            {personalInfo.name.toUpperCase()}
          </h1>
          
          <p className="mt-3 text-lg sm:text-xl lg:text-2xl font-semibold text-gray-300 leading-snug max-w-xl">
            Building production AI systems that{" "}
            <span className="text-spidey-red">reason</span>,{" "}
            <span className="text-holo-cyan">retrieve knowledge</span>, and{" "}
            <span className="text-stark-gold">control robots</span>.
          </p>
          
          <div className="mt-4 text-sm sm:text-base font-mono text-gray-400 flex flex-wrap gap-x-2 gap-y-1 items-center">
            <span>&gt; SPECIALIZING_IN</span>
            <TypeWriter
              words={[
                "AGENTIC CASCADE PIPELINES",
                "LLM OBSERVABILITY & AUDITING",
                "MULTI-ROBOT COORDINATION",
                "COMPUTER USE AGENTS",
              ]}
            />
          </div>

          <p className="mt-6 text-gray-400 text-sm sm:text-base max-w-lg leading-relaxed font-sans">
            Agentic AI Engineer with production experience shipping autonomous scraping systems, 
            LLM observability proxies, and multi-robot coordination platforms. 
            Currently pursuing M.Sc. Digital Technologies at TU Clausthal, Germany.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
            <a href="#projects">
              <SpiderButton variant="primary">
                CASE_STUDIES
              </SpiderButton>
            </a>
            <a href={personalInfo.resumeUrl} target="_blank" rel="noopener noreferrer">
              <SpiderButton variant="secondary">
                <FileDown className="w-4 h-4" aria-hidden="true" />
                RESUME
              </SpiderButton>
            </a>
            <a href="#contact">
              <SpiderButton variant="outline">
                CONTACT
              </SpiderButton>
            </a>
          </div>

          {/* Social channel links */}
          <nav aria-label="Social links" className="mt-8 flex items-center gap-5 font-mono text-[10px] text-gray-500">
            <span className="tracking-widest uppercase hidden sm:inline">CONNECT:</span>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="text-gray-400 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-spidey-red rounded"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="text-gray-400 hover:text-holo-cyan transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-holo-cyan rounded"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              aria-label="Send email"
              className="text-gray-400 hover:text-spidey-red transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-spidey-red rounded"
            >
              <Mail className="w-5 h-5" />
            </a>
          </nav>
        </div>

        {/* Right column: HUD System Diagnostic Screen */}
        <div className="lg:col-span-5">
          <div className="border border-holo-cyan/20 bg-bg-card backdrop-blur-md rounded-xl p-4 sm:p-6 font-mono text-xs text-gray-400 shadow-[0_0_30px_rgba(0,243,255,0.05)] relative overflow-hidden holo-scan">
            {/* Corner Bracket decorations */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-holo-cyan" aria-hidden="true" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-holo-cyan" aria-hidden="true" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-holo-cyan" aria-hidden="true" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-holo-cyan" aria-hidden="true" />

            <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-holo-cyan animate-pulse" aria-hidden="true" />
                <span className="font-bold text-white text-[11px]">ENGINEER_PROFILE_v2.0</span>
              </div>
              <span className="text-[10px] text-holo-cyan animate-pulse">● ACTIVE</span>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center bg-white/2.5 p-2 rounded border border-white/5">
                <span className="text-gray-500">SPECIALIZATION:</span>
                <span className="text-spidey-red font-semibold">Agentic AI Systems</span>
              </div>

              <div className="flex justify-between items-center bg-white/2.5 p-2 rounded border border-white/5">
                <span className="text-gray-500">FLAGSHIP:</span>
                <span className="text-white">Vergabepilot.AI</span>
              </div>

              <div className="flex justify-between items-center bg-white/2.5 p-2 rounded border border-white/5">
                <span className="text-gray-500">RESEARCH:</span>
                <span className="text-holo-cyan">2 IEEE Papers</span>
              </div>

              <div className="flex justify-between items-center bg-white/2.5 p-2 rounded border border-white/5">
                <span className="text-gray-500">TESTS_PASSING:</span>
                <span className="text-white">262+</span>
              </div>

              <div className="pt-2">
                <div className="flex justify-between text-[10px] text-gray-500 mb-1">
                  <span>CASCADE_PIPELINE_COVERAGE</span>
                  <span className="text-holo-cyan">7 Strategies</span>
                </div>
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-holo-cyan h-full rounded-full w-full shadow-[0_0_10px_rgba(0,243,255,0.4)]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[10px] text-gray-500 mb-1">
                  <span>SYSTEM_RELIABILITY</span>
                  <span className="text-spidey-red">Production</span>
                </div>
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-spidey-red h-full rounded-full w-full shadow-[0_0_10px_rgba(226,54,54,0.4)]" />
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-[10px] text-gray-500 pt-2 border-t border-white/5">
                <Activity className="w-3.5 h-3.5 text-holo-cyan animate-pulse" aria-hidden="true" />
                <span>PORTFOLIO_STATUS: READY_FOR_REVIEW</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Centered scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 font-mono text-[9px] text-gray-500 animate-bounce">
        <span>SCROLL_DOWN</span>
        <ArrowDown className="w-4 h-4 text-spidey-red" aria-hidden="true" />
      </div>
    </section>
  );
};

