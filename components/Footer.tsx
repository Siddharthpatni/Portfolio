import React from "react";
import { personalInfo } from "@/lib/data/personal";
import { Github, Linkedin, Mail, Rocket } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/5 bg-bg-dark/40 py-8 sm:py-12 relative overflow-hidden">
      {/* Background neon strip */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-spidey-red/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6 relative">
        <div className="flex flex-col items-center md:items-start font-mono text-center md:text-left">
          <div className="flex items-center gap-2 text-white font-semibold text-sm">
            <Rocket className="w-4 h-4 text-spidey-red" />
            SIDDHARTH_PVT_LTD
          </div>
          <p className="text-[10px] text-gray-500 mt-1 max-w-sm">
            Designed and built by Siddharth Patni. Powered by Next.js 15, Tailwind v4, and Siddharth Pvt Ltd technology.
          </p>
        </div>

        {/* Quote display */}
        <div className="text-center italic font-mono text-[10px] sm:text-xs text-spidey-red/60 max-w-xs px-4">
          &quot;{personalInfo.tagline}&quot;
        </div>

        {/* Social connections */}
        <div className="flex items-center gap-5">
          <a
            href={`mailto:${personalInfo.email}`}
            className="text-gray-500 hover:text-holo-cyan transition-colors"
            title="Email"
          >
            <Mail className="w-5 h-5 cursor-pointer" />
          </a>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-white transition-colors"
            title="GitHub"
          >
            <Github className="w-5 h-5 cursor-pointer" />
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-holo-cyan transition-colors"
            title="LinkedIn"
          >
            <Linkedin className="w-5 h-5 cursor-pointer" />
          </a>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/2.5 text-center font-mono text-[9px] text-gray-600">
        © {new Date().getFullYear()} SIDDHARTH_PATNI. ALL RIGHTS RESERVED. SIDDHARTH_PVT_LTD
      </div>
    </footer>
  );
};
