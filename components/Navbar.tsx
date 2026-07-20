"use client";
import React, { useState, useEffect } from "react";
import { personalInfo } from "@/lib/data/personal";
import { Menu, X, Github, Linkedin, Rocket, FileDown } from "lucide-react";

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
    return () => document.body.classList.remove("menu-open");
  }, [isOpen]);

  const navLinks = [
    { label: "ABOUT", href: "#about" },
    { label: "EXPERIENCE", href: "#experience" },
    { label: "PROJECTS", href: "#projects" },
    { label: "SKILLS", href: "#skills" },
    { label: "EDUCATION", href: "#education" },
    { label: "CONTACT", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
        scrolled
          ? "bg-bg-dark/80 backdrop-blur-md border-spidey-red/10 py-3"
          : "bg-transparent border-transparent py-4 md:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand / Logo */}
        <a href="#hero" className="flex items-center gap-2 group font-mono">
          <Rocket className="w-5 h-5 text-spidey-red group-hover:rotate-12 transition-transform duration-300" />
          <div className="flex flex-col">
            <span className="text-white font-extrabold tracking-widest text-xs sm:text-sm leading-none">
              SIDDHARTH_PVT_LTD
            </span>
            <span className="text-[10px] text-holo-cyan tracking-wider mt-0.5 leading-none">
              v1.0.0_TECH
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8 font-mono text-xs">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-gray-400 hover:text-white tracking-widest transition-colors duration-200 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-holo-cyan hover:after:w-full after:transition-all after:duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href={personalInfo.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 border border-spidey-red/30 bg-spidey-red/10 rounded-md font-mono text-[10px] text-spidey-red hover:bg-spidey-red/20 hover:border-spidey-red/50 transition-all"
          >
            <FileDown className="w-3.5 h-3.5" />
            RESUME
          </a>
          <div className="flex items-center gap-3 border border-white/5 bg-white/2.5 px-3 py-1.5 rounded-md font-mono text-[10px] text-holo-cyan">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            SYS_ONLINE
          </div>
          
          <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" title="GitHub">
            <Github className="w-5 h-5 text-gray-400 hover:text-white transition-colors cursor-pointer" />
          </a>
          <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn">
            <Linkedin className="w-5 h-5 text-gray-400 hover:text-white transition-colors cursor-pointer" />
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-400 hover:text-white p-2 cursor-pointer"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Scroll progress line */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-spidey-red via-spidey-red to-holo-cyan shadow-[0_0_8px_rgba(226,54,54,0.5)] transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Mobile Menu Panel */}
      <div
        className={`md:hidden fixed inset-x-0 top-[56px] bottom-0 bg-bg-dark/98 backdrop-blur-lg transition-all duration-300 ease-out font-mono ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="px-6 py-8 flex flex-col gap-5 border-b border-spidey-red/10">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-gray-300 hover:text-white tracking-widest transition-colors duration-200 text-sm py-1"
            >
              {link.label}
            </a>
          ))}
          
          <div className="h-[1px] bg-white/5 my-1" />
          
          <a
            href={personalInfo.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 text-spidey-red hover:text-white text-sm py-1"
          >
            <FileDown className="w-4 h-4" />
            DOWNLOAD RESUME
          </a>

          <div className="flex items-center gap-5 pt-2">
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-white text-xs">
              <Github className="w-4 h-4" /> GitHub
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-white text-xs">
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};
