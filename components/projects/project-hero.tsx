'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Play, Calendar, Users, Building, Sparkles, CheckCircle, Clock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { LogoSwitch } from '@/components/ui/logo-switch';
import { charReveal, fadeInUp, staggerContainer } from '@/lib/motion';
import {
  AnimatedHero,
  AnimatedStagger,
  AnimatedStaggerItem,
  AnimatedTags,
} from '@/components/projects/animated-project-sections';
import { SerializedProject } from '@/lib/project-serializer';

const STATUS_CONFIG = {
  active: {
    icon: Play,
    color: 'text-green-500',
    bg: 'bg-green-500/20 dark:bg-green-400/20',
    border: 'border-green-500/20',
  },
  completed: {
    icon: CheckCircle,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10 dark:bg-blue-400/10',
    border: 'border-blue-500/20',
  },
  paused: {
    icon: Clock,
    color: 'text-orange-500',
    bg: 'bg-orange-500/10 dark:bg-orange-400/10',
    border: 'border-orange-500/20',
  },
};

interface ProjectHeroProps {
  project: SerializedProject;
  locale: string;
  t: Record<string, string>;
}

export function ProjectHero({ project, locale, t }: ProjectHeroProps) {
  const status = STATUS_CONFIG[project.status];
  const StatusIcon = status.icon;
  const titleChars = project.title.split('');

  return (
    <div className="relative pt-[var(--nav-h)]">
      {/* Subtle top gradient accent using project color */}
      <div className={`absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r ${project.gradient} opacity-40`} />

      <AnimatedHero className="container mx-auto px-4 py-8 sm:py-12 lg:py-16">
        {/* Back + Breadcrumb */}
        <motion.nav
          className="flex items-center gap-3 mb-8 sm:mb-10"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href={`/${locale}#projects`}
            className="inline-flex items-center gap-2 nothing-glass px-3 py-1.5 rounded-full text-xs sm:text-sm nothing-text opacity-70 hover:opacity-100 transition-all duration-300 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span className="hidden sm:inline">{t['projects.title']}</span>
          </Link>
          <span className="nothing-text opacity-30 text-xs">/</span>
          <span className="nothing-text text-xs sm:text-sm font-medium truncate">{project.title}</span>
        </motion.nav>

        {/* Main hero grid */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left: Project Info */}
          <div className="lg:col-span-8">
            {/* Logo + Status inline */}
            <AnimatedStagger className="flex items-start gap-5 sm:gap-6 mb-6">
              <AnimatedStaggerItem className="relative flex-shrink-0">
                <div className="w-16 h-16 sm:w-20 sm:h-20 nothing-card p-2.5 sm:p-3 flex items-center justify-center">
                  <LogoSwitch src={project.companyLogo} alt={`${project.company} logo`} />
                </div>
                <div className="absolute -top-1.5 -right-1.5">
                  <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full ${status.bg} ${status.border} border flex items-center justify-center`}>
                    <StatusIcon className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${status.color}`} />
                  </div>
                </div>
              </AnimatedStaggerItem>

              <AnimatedStaggerItem className="flex-1 min-w-0 pt-1">
                <p className="nothing-text text-xs sm:text-sm font-light opacity-60 mb-1">
                  {project.role} · {project.company}
                </p>
                {/* Character stagger title */}
                <motion.h1
                  className="nothing-title text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-light leading-tight"
                  initial="hidden"
                  animate="visible"
                >
                  {titleChars.map((char, i) => (
                    <motion.span key={i} custom={i} variants={charReveal} className="inline-block" style={{ whiteSpace: char === ' ' ? 'pre' : undefined }}>
                      {char}
                    </motion.span>
                  ))}
                </motion.h1>
              </AnimatedStaggerItem>
            </AnimatedStagger>

            {/* Tags row */}
            <AnimatedTags className="flex flex-wrap gap-2 mb-6">
              <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium ${status.bg} ${status.color} ${status.border} border`}>
                <StatusIcon className={`w-3 h-3 mr-1.5 ${status.color}`} />
                {t[`projects.${project.status}`]}
              </span>
              <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium nothing-glass border">
                {project.type === 'freelance'
                  ? t['projects.freelance']
                  : project.type === 'cdi'
                    ? t['projects.cdi']
                    : project.type === 'stage'
                      ? t['projects.stage']
                      : t['projects.personnel']}
              </span>
              <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium nothing-glass border">
                {project.mainTechnology || project.technologies[0]?.name}
              </span>
            </AnimatedTags>

            {/* Description */}
            <motion.p
              className="nothing-text text-sm sm:text-base lg:text-lg leading-relaxed mb-6 max-w-3xl opacity-80"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
            >
              {project.fullDescription || project.description}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-wrap gap-3"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {project.companyWebsite && (
                <motion.a
                  href={project.companyWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 group"
                  style={{ backgroundColor: 'var(--nothing-orange)', color: 'white' }}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>{t['projects.visit']} {project.company}</span>
                </motion.a>
              )}
              {project.demoUrl && (
                <motion.a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 nothing-glass rounded-xl text-sm font-medium border transition-all duration-300 group"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Play className="w-4 h-4" style={{ color: 'var(--nothing-blue)' }} />
                  <span className="nothing-text">{t['projects.viewDemo']}</span>
                </motion.a>
              )}
            </motion.div>
          </div>

          {/* Right: Compact stats */}
          <motion.div
            className="lg:col-span-4"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            transition={{ delayChildren: 0.4 }}
          >
            <div className="grid grid-cols-2 gap-3">
              <motion.div className="nothing-card p-4 group hover:scale-[1.02] transition-all duration-300" variants={fadeInUp}>
                <Calendar className="w-5 h-5 mb-2 opacity-60 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--nothing-blue)' }} />
                <div className="text-sm sm:text-base font-light nothing-title leading-tight">
                  {project.period.split(' - ')[1] || project.period}
                </div>
                <div className="text-[10px] sm:text-xs nothing-text opacity-50 mt-0.5">{t['projects.period']}</div>
              </motion.div>

              {project.duration && (
                <motion.div className="nothing-card p-4 group hover:scale-[1.02] transition-all duration-300" variants={fadeInUp}>
                  <Sparkles className="w-5 h-5 mb-2 opacity-60 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--nothing-green)' }} />
                  <div className="text-sm sm:text-base font-light nothing-title leading-tight">{project.duration}</div>
                  <div className="text-[10px] sm:text-xs nothing-text opacity-50 mt-0.5">{t['projects.duration']}</div>
                </motion.div>
              )}

              {project.teamSize && (
                <motion.div className="nothing-card p-4 group hover:scale-[1.02] transition-all duration-300" variants={fadeInUp}>
                  <Users className="w-5 h-5 mb-2 opacity-60 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--nothing-orange)' }} />
                  <div className="text-sm sm:text-base font-light nothing-title leading-tight">{project.teamSize}</div>
                  <div className="text-[10px] sm:text-xs nothing-text opacity-50 mt-0.5">{t['projects.people']}</div>
                </motion.div>
              )}

              <motion.div className="nothing-card p-4 group hover:scale-[1.02] transition-all duration-300" variants={fadeInUp}>
                <Building className="w-5 h-5 mb-2 opacity-60 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--nothing-red)' }} />
                <div className="text-sm sm:text-base font-light nothing-title leading-tight">{project.technologies.length}</div>
                <div className="text-[10px] sm:text-xs nothing-text opacity-50 mt-0.5">Technologies</div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Thin separator */}
        <motion.div
          className="mt-10 sm:mt-12 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </AnimatedHero>
    </div>
  );
}
