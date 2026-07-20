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
import { CertificationsSection } from "@/components/sections/CertificationsSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* Boot sequence */}
      <LoadingScreen />

      {/* Desktop cursor trail */}
      <WebCursor />

      {/* Background Interactive Canvas */}
      <SpiderWebCanvas />

      {/* Floating AI Assistant Widget */}
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
          <CertificationsSection />
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
