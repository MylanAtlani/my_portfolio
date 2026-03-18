'use client';

import { useTranslations } from 'next-intl';
import { getDetailedProjects } from '@/data/projects';
import { adaptProjectsForLegacy } from '@/lib/project-adapter';
import { OptimizedImage } from '@/components/ui/optimized-image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, sectionHeader, viewportOnce } from '@/lib/motion';

export function ProjectsSection() {
  const t = useTranslations();
  const params = useParams();
  const locale = (params?.locale as string) || 'fr';
  const detailedProjects = getDetailedProjects(t);
  const projects = adaptProjectsForLegacy(detailedProjects);

  return (
    <section id="projects" className="py-10 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-8 sm:mb-16 lg:mb-20"
          variants={sectionHeader}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <h2 className="nothing-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light mb-4 sm:mb-6">
            {t('projects.title')}
          </h2>
          <motion.div
            className="w-16 sm:w-20 lg:w-24 h-0.5 sm:h-1 bg-white/20 mx-auto rounded-full mb-6 sm:mb-8"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
          />
          <p className="nothing-text text-sm sm:text-lg md:text-xl max-w-xs sm:max-w-2xl lg:max-w-3xl mx-auto opacity-70 px-4 sm:px-0">
            {t('projects.subtitle')}
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 sm:gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {projects.map((project) => {
            const IconComponent = project.icon;
            return (
              <motion.div
                key={`${project.title}-${project.period}`}
                variants={fadeInUp}
                whileHover={{ scale: 1.04, y: -8, transition: { duration: 0.3 } }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href={`/${locale}/projects/${project.id}`}
                  className="nothing-card group overflow-hidden p-0 block"
                >
                  {/* Project Header */}
                  <div className={`h-48 sm:h-56 lg:h-64 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300"></div>

                    {/* Company Logo */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center p-3 sm:p-4 group-hover:scale-110 transition-transform duration-300 relative overflow-hidden">
                        <OptimizedImage
                          src={project.logo}
                          alt={`${project.title} logo`}
                          fill
                          preset="logo"
                          className="object-contain filter brightness-0 invert p-2"
                        />
                      </div>
                    </div>

                    {/* Link indicator */}
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                      <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <ExternalLink className="w-4 h-4 text-white" />
                      </div>
                    </div>

                    {/* Status & Type */}
                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4 flex items-center space-x-1.5 sm:space-x-2">
                      <div className={`nothing-status scale-75 sm:scale-100 ${project.status === 'active' ? 'bg-(--nothing-green)' : 'bg-(--nothing-blue)'}`}></div>
                      <span className="text-white text-xs font-medium">
                        {project.status === 'active' ? t('projects.active') : t('projects.completed')}
                      </span>
                    </div>

                    {/* Period */}
                    <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 flex items-center">
                      <span className="text-white/80 text-xs font-medium px-3 py-1 nothing-glass rounded-full">
                        {project.period}
                      </span>
                    </div>

                    {/* Type Badge */}
                    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 flex items-center space-x-2">
                      <span className={`text-xs font-medium px-3 py-1 rounded-full flex items-center space-x-1 ${
                        project.freelance
                          ? 'bg-[var(--nothing-orange)] text-black'
                          : 'text-white nothing-glass'
                      }`}>
                        <IconComponent className="w-3 h-3" />
                        <span>{t(`projects.${project.type.toLowerCase()}`)}</span>
                      </span>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-4 sm:p-6 lg:p-8">
                    <div className="mb-2">
                      <h3 className="nothing-title text-lg sm:text-xl font-light">{project.title}</h3>
                      <p className="nothing-text text-sm opacity-60">{project.role}</p>
                    </div>
                    <p className="nothing-text text-xs sm:text-sm opacity-70 mb-4 sm:mb-6 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {project.technologies.map((tech) => (
                        <span className="nothing-tech-tag" key={tech}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
