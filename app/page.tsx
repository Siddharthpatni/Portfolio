import React from "react";
import { Navbar } from "@/components/Navbar";
import { SpiderWebCanvas } from "@/components/SpiderWebCanvas";
import { SpiderAssistant } from "@/components/SpiderAssistant";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* Background Interactive Spider Webs */}
      <SpiderWebCanvas />

      {/* Floating Karen Assistant Widget */}
      <SpiderAssistant />

      {/* Navigation */}
      <Navbar />

      {/* Main Sections */}
      <main className="relative z-10 w-full">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <EducationSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
