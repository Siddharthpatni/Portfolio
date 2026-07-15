"use client";
import React, { useState, useEffect } from "react";
import { personalInfo } from "@/lib/data/personal";
import { Menu, X, Github, Linkedin, Shield } from "lucide-react";
import { SpiderButton } from "./ui/SpiderButton";

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          : "bg-transparent border-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand / Logo */}
        <a href="#hero" className="flex items-center gap-2 group font-mono">
          <Shield className="w-5 h-5 text-spidey-red group-hover:rotate-12 transition-transform duration-300" />
          <div className="flex flex-col">
            <span className="text-white font-extrabold tracking-widest text-sm leading-none">
              SPIDEY_LABS
            </span>
            <span className="text-[10px] text-holo-cyan tracking-wider mt-0.5 leading-none">
              v1.0.0_STARK_TECH
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8 font-mono text-xs">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-gray-400 hover:text-white tracking-widest transition-colors duration-200 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-holo-cyan hover:after:w-full after:transition-all after:duration-300"
            >
              // {link.label}
            </a>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-3 border border-white/5 bg-white/2.5 px-3 py-1.5 rounded-md font-mono text-[10px] text-holo-cyan">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            SYS_SECURE: 200
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
          className="md:hidden text-gray-400 hover:text-white p-1 cursor-pointer"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden fixed top-[60px] left-0 w-full bg-bg-dark/95 border-b border-spidey-red/10 backdrop-blur-lg px-6 py-8 flex flex-col gap-6 font-mono text-sm transition-all duration-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white tracking-widest transition-colors duration-200"
            >
              // {link.label}
            </a>
          ))}
          <div className="h-[1px] bg-white/5 my-2" />
          <div className="flex items-center gap-4">
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-white text-xs">
              <Github className="w-4 h-4" /> GitHub
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-white text-xs">
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};
