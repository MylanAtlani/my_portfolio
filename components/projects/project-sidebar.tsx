'use client';

import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { SectionHeader } from '@/components/ui/section-header';
import {
  AnimatedSection,
  AnimatedGrid,
  AnimatedCard,
} from '@/components/projects/animated-project-sections';
import { SerializedProject } from '@/lib/project-serializer';
import { getTechIcon } from '@/lib/tech-icons';

interface ProjectSidebarProps {
  project: SerializedProject;
  t: Record<string, string>;
  desktop?: boolean;
}

export function ProjectSidebar({ project, t, desktop }: ProjectSidebarProps) {
  // Mobile: horizontal scroll strip
  if (!desktop) {
    return (
      <div className="lg:hidden container mx-auto px-4 -mt-4 mb-8">
        <motion.div
          className="overflow-x-auto flex gap-3 pb-4 -mx-4 px-4 scrollbar-hide"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {project.technologies.map((tech) => {
            const TechIcon = getTechIcon(tech.category);
            return (
              <div
                key={tech.name}
                className="flex-shrink-0 nothing-glass px-4 py-2 rounded-xl flex items-center gap-2 border"
              >
                <TechIcon className={`w-4 h-4 ${tech.color}`} />
                <span className="text-sm whitespace-nowrap nothing-text">{tech.name}</span>
              </div>
            );
          })}
        </motion.div>
      </div>
    );
  }

  // Desktop: sticky sidebar
  return (
    <div className="hidden lg:block">
      <div className="sticky top-24 space-y-8">
        {/* Technologies */}
        <AnimatedSection variant="fadeUp">
          <SectionHeader title={t['projects.technologies']} icon={null} iconColor="var(--nothing-green)" size="lg" className="mb-8" />
          <AnimatedGrid className="space-y-3">
            {project.technologies.map((tech) => {
              const TechIcon = getTechIcon(tech.category);
              return (
                <AnimatedCard key={tech.name} className="nothing-card p-4 hover:scale-105 transition-all duration-300 group">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl nothing-glass flex items-center justify-center ${tech.color} group-hover:scale-110 transition-transform duration-300`}>
                      <TechIcon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium nothing-text">{tech.name}</div>
                      <div className="text-sm nothing-text opacity-70 capitalize">{tech.category}</div>
                    </div>
                  </div>
                </AnimatedCard>
              );
            })}
          </AnimatedGrid>
        </AnimatedSection>

        {/* Links */}
        {(project.demoUrl || project.githubUrl || project.caseStudyUrl) && (
          <AnimatedSection variant="fadeUp" delay={0.2}>
            <SectionHeader title={t['projects.links']} icon={null} iconColor="var(--nothing-orange)" size="lg" className="mb-8" />
            <div className="space-y-3">
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 nothing-card hover:scale-105 transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-xl nothing-glass flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Github className="w-6 h-6 nothing-text" />
                  </div>
                  <div>
                    <div className="font-medium nothing-text">{t['projects.sourceCode']}</div>
                    <div className="text-sm nothing-text opacity-70">{t['projects.viewCode']}</div>
                  </div>
                </a>
              )}
              {project.caseStudyUrl && (
                <a href={project.caseStudyUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 nothing-card hover:scale-105 transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-xl nothing-glass flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ExternalLink className="w-6 h-6" style={{ color: 'var(--nothing-red)' }} />
                  </div>
                  <div>
                    <div className="font-medium nothing-text">{t['projects.caseStudy']}</div>
                    <div className="text-sm nothing-text opacity-70">{t['projects.fullStudy']}</div>
                  </div>
                </a>
              )}
            </div>
          </AnimatedSection>
        )}
      </div>
    </div>
  );
}
