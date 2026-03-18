import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { Metadata } from 'next';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { getDetailedProjects } from '@/data/projects';
import { routing } from '@/i18n/routing';
import { Navbar } from '@/components/layout/navbar';
import { AnimatedNavigation } from '@/components/projects/animated-project-sections';
import { ProjectHero } from '@/components/projects/project-hero';
import { ProjectContent } from '@/components/projects/project-content';
import { ProjectSidebar } from '@/components/projects/project-sidebar';
import { serializeProject } from '@/lib/project-serializer';
import { ParticleField } from '@/components/ui/particle-field';

interface ProjectPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const resolvedParams = await params;

  if (!hasLocale(routing.locales, resolvedParams.locale)) {
    notFound();
  }

  setRequestLocale(resolvedParams.locale);

  const t = await getTranslations();
  const projects = getDetailedProjects(t);
  const project = projects.find((p) => p.id === resolvedParams.slug);

  if (!project) {
    return {
      title: 'Projet non trouvé',
      description: "Le projet demandé n'existe pas.",
    };
  }

  return {
    title: `${project.title} - ${project.company} | Mylan Atlani`,
    description: project.metaDescription || project.description,
    keywords: project.keywords?.join(', '),
    openGraph: {
      title: `${project.title} - ${project.company}`,
      description: project.metaDescription || project.description,
      type: 'article',
    },
  };
}

export function generateStaticParams() {
  const dummyT = (key: string) => key;
  const projects = getDetailedProjects(dummyT);

  const params = [];
  for (const locale of routing.locales) {
    for (const project of projects) {
      params.push({ locale, slug: project.id });
    }
  }
  return params;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const resolvedParams = await params;

  if (!hasLocale(routing.locales, resolvedParams.locale)) {
    notFound();
  }

  setRequestLocale(resolvedParams.locale);

  const t = await getTranslations();
  const projects = getDetailedProjects(t);
  const project = projects.find((p) => p.id === resolvedParams.slug);

  if (!project) {
    notFound();
  }

  // Find prev/next projects for navigation
  const currentIndex = projects.findIndex((p) => p.id === resolvedParams.slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  // Serialize project for client components (strip non-serializable LucideIcon fields)
  const serializedProject = serializeProject(project);

  // Project-specific glow colors based on gradient identity
  const projectGlowColors: Record<string, [string, string]> = {
    'ciffreo-secpay': ['96, 165, 250', '168, 85, 247'],       // blue → purple
    'petpalz-platform': ['74, 222, 128', '96, 165, 250'],     // green → blue
    'thales-sesam': ['248, 113, 113', '251, 146, 60'],        // red → orange
    'woman-luxury': ['251, 146, 60', '248, 113, 113'],        // orange → red
    'laplateforme-teacher': ['168, 85, 247', '236, 72, 153'], // purple → pink
    'kbrw-backend': ['129, 140, 248', '96, 165, 250'],        // indigo → blue
    'nexen-cloud': ['45, 212, 191', '74, 222, 128'],          // teal → green
  };
  const [glowA, glowB] = projectGlowColors[project.id] ?? ['55, 66, 250', '46, 213, 115'];

  // Pre-resolve translation keys for client components
  const translations: Record<string, string> = {
    'projects.active': t('projects.active'),
    'projects.completed': t('projects.completed'),
    'projects.paused': t('projects.paused'),
    'navigation.home': t('navigation.home'),
    'projects.title': t('projects.title'),
    'projects.freelance': t('projects.freelance'),
    'projects.cdi': t('projects.cdi'),
    'projects.stage': t('projects.stage'),
    'projects.personnel': t('projects.personnel'),
    'projects.visit': 'Visiter',
    'projects.viewDemo': t('projects.viewDemo'),
    'projects.period': t('projects.period'),
    'projects.duration': t('projects.duration'),
    'projects.people': t('projects.people'),
    'projects.mission': t('projects.mission'),
    'projects.challenges': t('projects.challenges'),
    'projects.achievements': t('projects.achievements'),
    'projects.learnings': t('projects.learnings'),
    'projects.technologies': t('projects.technologies'),
    'projects.links': t('projects.links'),
    'projects.sourceCode': t('projects.sourceCode'),
    'projects.caseStudy': t('projects.caseStudy'),
    'projects.viewCode': 'Voir le code',
    'projects.fullStudy': 'Étude complète',
  };

  return (
    <div className="min-h-screen">
      {/* Shared background from landing page */}
      <ParticleField />
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: [
            `radial-gradient(ellipse 80% 60% at 15% 20%, rgba(${glowA}, 0.08) 0%, transparent 70%)`,
            `radial-gradient(ellipse 70% 50% at 85% 75%, rgba(${glowB}, 0.06) 0%, transparent 70%)`,
            `radial-gradient(ellipse 60% 50% at 75% 15%, rgba(${glowA}, 0.05) 0%, transparent 65%)`,
            `radial-gradient(ellipse 70% 60% at 20% 80%, rgba(${glowB}, 0.05) 0%, transparent 65%)`,
            `radial-gradient(ellipse 50% 40% at 50% 50%, rgba(${glowA}, 0.03) 0%, transparent 60%)`,
          ].join(', '),
        }}
      />

      <Navbar simplified />

      <ProjectHero
        project={serializedProject}
        locale={resolvedParams.locale}
        t={translations}
      />

      {/* Mobile: horizontal tech strip */}
      <ProjectSidebar project={serializedProject} t={translations} />

      <div className="container mx-auto px-4 py-12 sm:py-16 max-w-7xl relative">
        <div className="grid lg:grid-cols-3 gap-8">
          <ProjectContent project={serializedProject} t={translations} />

          {/* Desktop: sticky sidebar */}
          <ProjectSidebar project={serializedProject} t={translations} desktop />
        </div>

        {/* Project Navigation - Prev/Next */}
        <AnimatedNavigation className="mt-16 sm:mt-24 pt-8 border-t border-white/10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {prevProject ? (
              <Link
                href={`/${resolvedParams.locale}/projects/${prevProject.id}`}
                className="nothing-card p-4 sm:p-6 group hover:scale-[1.02] transition-all duration-300 flex items-center gap-4"
              >
                <ArrowLeft className="w-5 h-5 opacity-60 group-hover:opacity-100 group-hover:-translate-x-1 transition-all duration-300" />
                <div className="min-w-0">
                  <div className="text-xs nothing-text opacity-50 mb-1">{t('projects.previous') || 'Précédent'}</div>
                  <div className="nothing-title text-sm sm:text-base font-light truncate">{prevProject.title}</div>
                  <div className="nothing-text text-xs opacity-60">{prevProject.company}</div>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {nextProject ? (
              <Link
                href={`/${resolvedParams.locale}/projects/${nextProject.id}`}
                className="nothing-card p-4 sm:p-6 group hover:scale-[1.02] transition-all duration-300 flex items-center gap-4 text-right justify-end"
              >
                <div className="min-w-0">
                  <div className="text-xs nothing-text opacity-50 mb-1">{t('projects.next') || 'Suivant'}</div>
                  <div className="nothing-title text-sm sm:text-base font-light truncate">{nextProject.title}</div>
                  <div className="nothing-text text-xs opacity-60">{nextProject.company}</div>
                </div>
                <ArrowRight className="w-5 h-5 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </AnimatedNavigation>
      </div>
    </div>
  );
}
