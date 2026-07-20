"use client";
import React, { useState } from "react";
import { projects, Project } from "@/lib/data/projects";
import { SectionHeader } from "../ui/SectionHeader";
import { GlassCard } from "../ui/GlassCard";
import { TechTag } from "../ui/TechTag";
import { SpiderButton } from "../ui/SpiderButton";
import { Github, FolderGit2, AlertCircle, BarChart3, Star, Sparkles, X, CheckSquare } from "lucide-react";

export const ProjectsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filters = ["All", "Agentic AI", "AI & ML", "Full-Stack", "Robotics & IoT"];

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === "All") return true;
    return project.category === activeFilter;
  });

  return (
    <section id="projects" className="py-16 sm:py-24 px-4 sm:px-6 relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          number="SEC_03"
          title="PROJECTS // INTEL GALLERY"
          subtitle="Interactive registry of agentic frameworks, computer-use systems, and deep learning platforms."
        />

        {/* Filter Tabs — horizontally scrollable on mobile */}
        <div className="flex gap-2 mb-8 sm:mb-10 font-mono text-xs overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap scrollbar-none">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 sm:px-4 py-2 border rounded-md transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
                activeFilter === filter
                  ? "bg-spidey-red/20 border-spidey-red text-white shadow-[0_0_15px_rgba(226,54,54,0.15)]"
                  : "border-white/5 bg-white/2.5 text-gray-400 hover:text-white hover:border-white/10"
              }`}
            >
              {filter.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Flagship Projects - Large Full Width Layout */}
        <div className="space-y-6 sm:space-y-8 mb-8 sm:mb-12">
          {filteredProjects
            .filter((p) => p.tier === "flagship")
            .map((project) => (
              <GlassCard
                key={project.id}
                glowColor="red"
                className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 p-4 sm:p-8 border border-spidey-red/20 shadow-[0_0_30px_rgba(226,54,54,0.05)] cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                {/* Visual Details Overlay */}
                <div className="absolute top-0 right-0 p-3 sm:p-4 font-mono text-[9px] text-spidey-red/40 flex items-center gap-1">
                  <Star className="w-3 h-3 fill-spidey-red text-spidey-red" />
                  FLAGSHIP
                </div>

                <div className="lg:col-span-8 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="px-2 py-0.5 border border-spidey-red/30 bg-spidey-red/5 rounded font-mono text-[9px] text-spidey-red uppercase font-bold tracking-widest">
                        {project.category}
                      </span>
                      {project.isPrivate && (
                        <span className="px-2 py-0.5 border border-amber-500/30 bg-amber-500/5 rounded font-mono text-[9px] text-amber-500 uppercase font-bold tracking-widest">
                          Private Research
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black text-white hover:text-spidey-red transition-colors font-sans">
                      {project.name}
                    </h3>
                    
                    {project.orgName && (
                      <div className="text-[10px] text-holo-cyan font-mono mt-1 break-words">
                        ORGANIZATION: {project.orgName}
                      </div>
                    )}

                    <p className="text-gray-300 text-xs sm:text-sm mt-3 sm:mt-4 leading-relaxed max-w-2xl font-sans">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-4 sm:mt-6">
                      {project.techStack.slice(0, 8).map((tech) => (
                        <TechTag key={tech} name={tech} />
                      ))}
                      {project.techStack.length > 8 && (
                        <span className="text-[10px] text-gray-500 font-mono self-center px-1">
                          +{project.techStack.length - 8} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 sm:mt-8 flex items-center gap-4">
                    <SpiderButton variant="secondary" onClick={() => setSelectedProject(project)}>
                      VIEW_DETAILS
                    </SpiderButton>
                    
                    {!project.isPrivate && project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-gray-400 hover:text-white transition-colors">
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Right Column: Mini Metric Dashboard */}
                <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-white/5 pt-4 lg:pt-0 lg:pl-6 flex flex-col justify-center">
                  <div className="space-y-4">
                    <div className="text-[10px] text-gray-500 font-mono uppercase tracking-widest flex items-center gap-1.5">
                      <BarChart3 className="w-3.5 h-3.5 text-holo-cyan" />
                      CORE_METRICS
                    </div>
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      {project.metrics.map((metric, idx) => (
                        <div key={idx} className="bg-white/2.5 p-2 sm:p-3 rounded border border-white/5 font-mono text-center">
                          <div className="text-holo-cyan font-bold text-sm leading-none">
                            {metric.value}
                          </div>
                          <div className="text-[8px] sm:text-[9px] text-gray-500 mt-1 uppercase tracking-wider">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
        </div>

        {/* Featured and Standard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {filteredProjects
            .filter((p) => p.tier !== "flagship")
            .map((project) => (
              <GlassCard
                key={project.id}
                glowColor={project.tier === "featured" ? "cyan" : "none"}
                className="flex flex-col justify-between p-4 sm:p-6 cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                {/* Visual Details Overlay */}
                <div className="absolute top-0 right-0 p-3 sm:p-4 font-mono text-[8px] text-gray-600 flex items-center gap-1">
                  {project.tier === "featured" ? (
                    <>
                      <Sparkles className="w-2.5 h-2.5 text-holo-cyan" />
                      FEATURED
                    </>
                  ) : (
                    <>
                      <FolderGit2 className="w-2.5 h-2.5" />
                      STANDARD
                    </>
                  )}
                </div>

                <div>
                  <span className="px-2 py-0.5 border border-white/10 bg-white/2.5 rounded font-mono text-[8px] text-gray-400 uppercase tracking-widest">
                    {project.category}
                  </span>

                  <h3 className="text-lg sm:text-xl font-bold text-white mt-3 hover:text-holo-cyan transition-colors">
                    {project.name}
                  </h3>

                  <p className="text-gray-400 text-xs mt-3 leading-relaxed font-sans">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-4 sm:mt-5">
                    {project.techStack.slice(0, 5).map((tech) => (
                      <TechTag key={tech} name={tech} />
                    ))}
                    {project.techStack.length > 5 && (
                      <span className="text-[9px] text-gray-500 font-mono self-center px-1">
                        +{project.techStack.length - 5}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-5 sm:mt-6 pt-3 sm:pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-holo-cyan hover:underline" onClick={() => setSelectedProject(project)}>
                    VIEW_DETAILS &gt;
                  </span>

                  {!project.isPrivate && project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-gray-500 hover:text-white transition-colors">
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </GlassCard>
            ))}
        </div>
      </div>

      {/* Dynamic Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-bg-dark/80 backdrop-blur-sm">
          <GlassCard
            glowColor={selectedProject.tier === "flagship" ? "red" : "cyan"}
            hoverEffect={false}
            className="w-full sm:max-w-3xl max-h-[90dvh] sm:max-h-[85dvh] overflow-y-auto border border-white/10 shadow-2xl p-4 sm:p-6 relative flex flex-col rounded-t-2xl sm:rounded-xl"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-white transition-colors cursor-pointer p-1"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header info */}
            <div className="border-b border-white/5 pb-3 sm:pb-4 mb-3 sm:mb-4 pr-8">
              <span className="px-2 py-0.5 border border-spidey-red/20 bg-spidey-red/5 rounded font-mono text-[9px] text-spidey-red uppercase tracking-widest font-bold">
                {selectedProject.category}
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-2">
                {selectedProject.name}
              </h3>
              {selectedProject.orgName && (
                <div className="text-[10px] text-holo-cyan font-mono mt-1 break-words">
                  ORGANIZATION: {selectedProject.orgName}
                </div>
              )}
            </div>

            {/* Content body */}
            <div className="space-y-5 sm:space-y-6">
              <div>
                <h4 className="text-[10px] text-gray-500 font-mono uppercase tracking-widest mb-2 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 text-spidey-red" />
                  PROJECT_OVERVIEW
                </h4>
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                  {selectedProject.extendedDescription}
                </p>
              </div>

              {/* Highlights Bullet List */}
              <div>
                <h4 className="text-[10px] text-gray-500 font-mono uppercase tracking-widest mb-2 flex items-center gap-1">
                  <CheckSquare className="w-3.5 h-3.5 text-holo-cyan" />
                  KEY_HIGHLIGHTS
                </h4>
                <ul className="space-y-2">
                  {selectedProject.highlights.map((bullet, idx) => (
                    <li key={idx} className="text-gray-300 text-xs flex items-start gap-2">
                      <span className="text-spidey-red font-mono font-bold shrink-0">→</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Grid: Tech Stack and Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <h4 className="text-[10px] text-gray-500 font-mono uppercase tracking-widest mb-3">
                    DEPLOYED_TECH_STACK
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.techStack.map((tech) => (
                      <TechTag key={tech} name={tech} />
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] text-gray-500 font-mono uppercase tracking-widest mb-3">
                    DIAGNOSTIC_METRICS
                  </h4>
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    {selectedProject.metrics.map((metric, idx) => (
                      <div key={idx} className="bg-white/2.5 p-2 sm:p-3 rounded border border-white/5 font-mono text-center">
                        <div className="text-holo-cyan font-bold text-xs sm:text-sm">
                          {metric.value}
                        </div>
                        <div className="text-[8px] text-gray-500 mt-1 uppercase tracking-wider">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-6 sm:mt-8 pt-3 sm:pt-4 border-t border-white/5 flex items-center justify-between">
              <SpiderButton variant="outline" onClick={() => setSelectedProject(null)}>
                CLOSE
              </SpiderButton>

              {!selectedProject.isPrivate && selectedProject.githubUrl && (
                <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                  <SpiderButton variant="primary" className="flex items-center gap-2">
                    <Github className="w-4 h-4" />
                    VIEW_CODE
                  </SpiderButton>
                </a>
              )}
            </div>
          </GlassCard>
        </div>
      )}
    </section>
  );
};
