import React from "react";
import { personalInfo } from "@/lib/data/personal";
import { Github, Linkedin, Mail, ShieldAlert } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/5 bg-bg-dark/40 py-12 relative overflow-hidden">
      {/* Background neon strip */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-spidey-red/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 relative">
        <div className="flex flex-col items-center md:items-start font-mono text-center md:text-left">
          <div className="flex items-center gap-2 text-white font-semibold text-sm">
            <ShieldAlert className="w-4 h-4 text-spidey-red" />
            STARK_LABS_INTERFACE
          </div>
          <p className="text-[10px] text-gray-500 mt-1 max-w-sm">
            Designed and built by Siddharth Patni. Powered by Next.js 15, Tailwind v4, and Stark technology specifications.
          </p>
        </div>

        {/* Quote display: "With great power comes great responsibility" */}
        <div className="text-center italic font-mono text-xs text-spidey-red/60 max-w-xs px-4">
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
      
      <div className="max-w-7xl mx-auto px-6 mt-8 pt-6 border-t border-white/2.5 text-center font-mono text-[9px] text-gray-600">
        © {new Date().getFullYear()} SIDDHARTH_PATNI. ALL RIGHTS RESERVED. PROTOCOL_IDENTIFIER: 0x8F4A
      </div>
    </footer>
  );
};
