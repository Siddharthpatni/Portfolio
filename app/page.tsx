import React from "react";
import { Navbar } from "@/components/Navbar";
import { SpiderWebCanvas } from "@/components/SpiderWebCanvas";
import { SpiderAssistant } from "@/components/SpiderAssistant";
import { LoadingScreen } from "@/components/effects/LoadingScreen";
import { WebCursor } from "@/components/effects/WebCursor";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
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
      {/* Spider Sense boot sequence */}
      <LoadingScreen />

      {/* Desktop web-crosshair cursor trail */}
      <WebCursor />

      {/* Background Interactive Spider Webs */}
      <SpiderWebCanvas />

      {/* Floating Karen Assistant Widget */}
      <SpiderAssistant />

      {/* Navigation */}
      <Navbar />

      {/* Main Sections */}
      <main className="relative z-10 w-full">
        <HeroSection />
        <ScrollReveal>
          <AboutSection />
        </ScrollReveal>
        <ScrollReveal>
          <ExperienceSection />
        </ScrollReveal>
        <ScrollReveal>
          <ProjectsSection />
        </ScrollReveal>
        <ScrollReveal>
          <SkillsSection />
        </ScrollReveal>
        <ScrollReveal>
          <EducationSection />
        </ScrollReveal>
        <ScrollReveal>
          <ContactSection />
        </ScrollReveal>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
