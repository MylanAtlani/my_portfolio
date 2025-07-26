import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { Metadata } from 'next';
import { ArrowLeft, ExternalLink, Github, Calendar, Users, Building, Sparkles, Play, CheckCircle, Clock } from 'lucide-react';
import Link from 'next/link';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { getDetailedProjects } from '@/data/projects';
import { routing } from '@/i18n/routing';
import { Navbar } from '@/components/layout/navbar';
import { LogoSwitch } from '@/components/ui/logo-switch';
import { SectionHeader } from '@/components/ui/section-header';
import { ListItem } from '@/components/ui/list-item';

interface ProjectPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

// Génération des métadonnées dynamiques
export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  
  if (!hasLocale(routing.locales, resolvedParams.locale)) {
    notFound();
  }
  
  setRequestLocale(resolvedParams.locale);
  
  const t = await getTranslations();
  const projects = getDetailedProjects(t);
  const project = projects.find(p => p.id === resolvedParams.slug);

  if (!project) {
    return {
      title: 'Projet non trouvé',
      description: 'Le projet demandé n\'existe pas.'
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

// Génération des chemins statiques
export function generateStaticParams() {
  const dummyT = (key: string) => key;
  const projects = getDetailedProjects(dummyT);
  
  const params = [];
  for (const locale of routing.locales) {
    for (const project of projects) {
      params.push({
        locale,
        slug: project.id,
      });
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
  const project = projects.find(p => p.id === resolvedParams.slug);

  if (!project) {
    notFound();
  }

  const statusConfig = {
    active: { 
      label: t('projects.active'), 
      icon: Play,
      color: 'text-green-500',
      bg: 'bg-green-500/20 dark:bg-green-400/20',
      border: 'border-green-500/20'
    },
    completed: { 
      label: t('projects.completed'), 
      icon: CheckCircle,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10 dark:bg-blue-400/10',
      border: 'border-blue-500/20'
    },
    paused: { 
      label: t('projects.paused'), 
      icon: Clock,
      color: 'text-orange-500',
      bg: 'bg-orange-500/10 dark:bg-orange-400/10',
      border: 'border-orange-500/20'
    },
  };

  const StatusIcon = statusConfig[project.status].icon;

  return (
    <div className="min-h-screen">
      {/* Navbar simplifiée */}
      <Navbar simplified />
      
      {/* Hero Section Dynamique */}
      <div className="relative overflow-hidden">
        {/* Background Pattern Enhanced */}
        <div className="absolute inset-0">
          <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-30`}></div>
          
          {/* Floating geometric elements */}
          <div className="absolute inset-0" >
            {[...Array(30)].map((_, i) => {
              const size = Math.random() * 4 + 1;
              const isCircle = Math.random() > 0.5;
              return (
                <div
                  key={i}
                  className={`absolute ${isCircle ? 'rounded-full' : 'rounded-sm'} nothing-animate-float opacity-40`}
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    background: `linear-gradient(45deg, rgba(255,255,255,0.6), rgba(255,255,255,0.2))`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${4 + Math.random() * 4}s`
                  }}
                />
              );
            })}
          </div>

          {/* Sparkles Pattern */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={`sparkle-${i}`}
                className="absolute w-1 h-1 rounded-full nothing-animate-pulse"
                style={{
                  background: 'rgba(255,255,255,0.8)',
                  boxShadow: '0 0 6px rgba(255,255,255,0.6)',
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${1.5 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-8 sm:py-12 lg:py-24">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-6 sm:mb-8 text-xs sm:text-sm nothing-animate-slide-up overflow-x-auto">
            <Link href={`/${resolvedParams.locale}`} className="nothing-text opacity-70 hover:opacity-100 transition-all duration-300 whitespace-nowrap">
              {t('navigation.home')}
            </Link>
            <span className="nothing-text opacity-40">/</span>
            <Link href={`/${resolvedParams.locale}#projects`} className="nothing-text opacity-70 hover:opacity-100 transition-all duration-300 whitespace-nowrap">
              {t('projects.title')}
            </Link>
            <span className="nothing-text opacity-40">/</span>
            <span className="nothing-text font-medium truncate">{project.title}</span>
          </nav>

          {/* Hero Content */}
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-16 items-start">
            {/* Left: Project Info */}
            <div className="lg:col-span-8 sm:col-span-12">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-6">
                <div className="relative self-start sm:self-center">
                  <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-40 lg:h-40 nothing-card p-3 sm:p-4 lg:p-6 flex items-center justify-center">
                    <LogoSwitch 
                      src={project.companyLogo}
                      alt={`${project.company} logo`}
                    />
                  </div>
                  <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3">
                    <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full ${statusConfig[project.status].bg} ${statusConfig[project.status].border} border flex items-center justify-center shadow-lg`}>
                      <StatusIcon className={`w-3 h-3 sm:w-4 sm:h-4 ${statusConfig[project.status].color}`} />
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 sm:flex-3 min-w-0">
                  <h1 className="nothing-title text-2xl sm:text-3xl lg:text-5xl xl:text-6xl font-light mb-2 nothing-animate-slide-up leading-tight">
                    {project.title}
                  </h1>
                  <p className="nothing-text text-base sm:text-lg lg:text-sm xl:text-base font-light opacity-80 nothing-animate-slide-up leading-relaxed hidden sm:block" style={{ animationDelay: '200ms' }}>
                    {project.role} chez {project.company}
                  </p>
                </div>
              </div>

              {/* Status & Type Tags */}
              <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8 nothing-animate-slide-up" style={{ animationDelay: '300ms' }}>
                <span className={`inline-flex items-center justify-center px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-medium ${statusConfig[project.status].bg} ${statusConfig[project.status].color} ${statusConfig[project.status].border} border backdrop-blur-sm hover:scale-105 transition-all duration-300`}>
                  <StatusIcon className={`w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 ${statusConfig[project.status].color}`} />
                  {statusConfig[project.status].label}
                </span>
                <span className="inline-flex items-center justify-center px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-medium nothing-glass border backdrop-blur-sm hover:scale-105 transition-all duration-300">
                  {project.type === 'freelance' ? t('projects.freelance') : 
                   project.type === 'cdi' ? t('projects.cdi') : 
                   project.type === 'stage' ? t('projects.stage') : 
                   t('projects.personnel')}
                </span>
                <span className="inline-flex items-center justify-center px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-medium nothing-glass border backdrop-blur-sm hover:scale-105 transition-all duration-300">
                  {project.mainTechnology || project.technologies[0]?.name}
                </span>
              </div>

              {/* Project Description */}
              <p className="nothing-text text-base sm:text-lg lg:text-xl leading-relaxed mb-6 sm:mb-8 max-w-3xl opacity-80 dark:opacity-90 nothing-animate-slide-up" style={{ animationDelay: '400ms' }}>
                {project.fullDescription || project.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 nothing-animate-slide-up" style={{ animationDelay: '500ms' }}>
                {project.companyWebsite && (
                  <a
                    href={project.companyWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 nothing-glass rounded-xl font-medium hover:scale-105 transition-all duration-300 group text-sm sm:text-base"
                    style={{ backgroundColor: 'var(--nothing-orange)', color: 'white' }}
                  >
                    <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span className="truncate">Visiter {project.company}</span>
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 nothing-card hover:scale-105 transition-all duration-300 group text-sm sm:text-base"
                  >
                    <Play className="w-4 h-4 group-hover:scale-110 transition-transform" style={{ color: 'var(--nothing-blue)' }} />
                    <span className="nothing-text">{t('projects.viewDemo')}</span>
                  </a>
                )}
              </div>
            </div>

            {/* Right: Key Stats */}
            <div className="lg:col-span-4 md:col-span-12 nothing-animate-slide-up lg:order-last" style={{ animationDelay: '300ms' }}>
              <div className="grid grid-cols-2 gap-2 sm:gap-4">
                <div className="nothing-card p-3 sm:p-4 lg:p-6 hover:scale-105 transition-all duration-300 group">
                  <div className="flex items-center gap-3 sm:flex-col sm:items-center sm:gap-2 lg:gap-3">
                    <Calendar className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 flex-shrink-0 group-hover:scale-110 transition-transform" style={{ color: 'var(--nothing-blue)' }} />
                    <div className="flex-1 sm:text-center">
                      <div className="text-sm sm:text-lg lg:text-2xl font-light nothing-title mb-0.5 sm:mb-1">
                        {project.period.split(' - ')[1] || project.period}
                      </div>
                      <div className="text-xs sm:text-sm nothing-text opacity-70">{t('projects.period')}</div>
                    </div>
                  </div>
                </div>

                {project.duration && (
                  <div className="nothing-card p-3 sm:p-4 lg:p-6 hover:scale-105 transition-all duration-300 group">
                    <div className="flex items-center gap-3 sm:flex-col sm:items-center sm:gap-2 lg:gap-3">
                      <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 flex-shrink-0 group-hover:scale-110 transition-transform" style={{ color: 'var(--nothing-green)' }} />
                      <div className="flex-1 sm:text-center">
                        <div className="text-sm sm:text-lg lg:text-2xl font-light nothing-title mb-0.5 sm:mb-1">
                          {project.duration}
                        </div>
                        <div className="text-xs sm:text-sm nothing-text opacity-70">{t('projects.duration')}</div>
                      </div>
                    </div>
                  </div>
                )}

                {project.teamSize && (
                  <div className="nothing-card p-3 sm:p-4 lg:p-6 hover:scale-105 transition-all duration-300 group">
                    <div className="flex items-center gap-3 sm:flex-col sm:items-center sm:gap-2 lg:gap-3">
                      <Users className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 flex-shrink-0 group-hover:scale-110 transition-transform" style={{ color: 'var(--nothing-orange)' }} />
                      <div className="flex-1 sm:text-center">
                        <div className="text-sm sm:text-lg lg:text-2xl font-light nothing-title mb-0.5 sm:mb-1">
                          {project.teamSize}
                        </div>
                        <div className="text-xs sm:text-sm nothing-text opacity-70">{t('projects.people')}</div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="nothing-card p-3 sm:p-4 lg:p-6 hover:scale-105 transition-all duration-300 group">
                  <div className="flex items-center gap-3 sm:flex-col sm:items-center sm:gap-2 lg:gap-3">
                    <Building className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 flex-shrink-0 group-hover:scale-110 transition-transform" style={{ color: 'var(--nothing-red)' }} />
                    <div className="flex-1 sm:text-center">
                      <div className="text-sm sm:text-base lg:text-lg font-light nothing-title mb-0.5 sm:mb-1">
                        {project.technologies.length}
                      </div>
                      <div className="text-xs sm:text-sm nothing-text opacity-70">Technologies</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Mission */}
            {project.mission && (
              <section className="nothing-animate-slide-up" style={{ animationDelay: '600ms' }}>
                <SectionHeader
                  title={t('projects.mission')}
                  icon={null}
                  iconColor="var(--nothing-blue)"
                  size="lg"
                  className="mb-8"
                />
                <div className="space-y-4">
                  {project.mission.map((item, index) => (
                    <ListItem
                      key={index}
                      dotColor="var(--nothing-blue)"
                      dotSize="md"
                      cardStyle={true}
                      hoverEffect="scale"
                    >
                      <p className="nothing-text leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity text-sm">
                        {item}
                      </p>
                    </ListItem>
                  ))}
                </div>
              </section>
            )}

            {/* Challenges & Achievements */}
            <div className="grid md:grid-cols-2 gap-8">
              {project.challenges && (
                <section className="nothing-animate-slide-up" style={{ animationDelay: '700ms' }}>
                  <SectionHeader
                    title={t('projects.challenges')}
                    icon={null}
                    iconColor="var(--nothing-orange)"
                    size="md"
                    className="mb-6"
                  />
                  <div className="space-y-3">
                    {project.challenges.map((item, index) => (
                      <ListItem
                        key={index}
                        dotColor="var(--nothing-orange)"
                        dotSize="md"
                        hoverEffect="translate"
                      >
                        <p className="text-sm nothing-text opacity-80 group-hover:opacity-100 transition-opacity">
                          {item}
                        </p>
                      </ListItem>
                    ))}
                  </div>
                </section>
              )}

              {project.achievements && (
                <section className="nothing-animate-slide-up" style={{ animationDelay: '800ms' }}>
                  <SectionHeader
                    title={t('projects.achievements')}
                    icon={null}
                    iconColor="var(--nothing-green)"
                    size="md"
                    className="mb-6"
                  />
                  <div className="space-y-3">
                    {project.achievements.map((item, index) => (
                      <ListItem
                        key={index}
                        dotColor="var(--nothing-green)"
                        dotSize="md"
                        hoverEffect="translate"
                      >
                        <p className="text-sm nothing-text opacity-80 group-hover:opacity-100 transition-opacity">
                          {item}
                        </p>
                      </ListItem>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Learnings */}
            {project.learnings && (
              <section className="nothing-animate-slide-up" style={{ animationDelay: '900ms' }}>
                <SectionHeader
                  title={t('projects.learnings')}
                  icon={null}
                  iconColor="var(--nothing-red)"
                  size="lg"
                  className="mb-8"
                />
                <div className="grid sm:grid-cols-2 gap-4">
                  {project.learnings.map((item, index) => (
                    <ListItem
                      key={index}
                      dotColor="var(--nothing-red)"
                      dotSize="md"
                      hoverEffect="scale"
                    >
                      <p className="nothing-text opacity-80 group-hover:opacity-100 transition-opacity">
                        {item}
                      </p>
                    </ListItem>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Technologies */}
            <section className="nothing-animate-slide-up" style={{ animationDelay: '600ms' }}>
              <SectionHeader
                title={t('projects.technologies')}
                icon={null}
                iconColor="var(--nothing-green)"
                size="lg"
                className="mb-8"
              />
              <div className="space-y-3">
                {project.technologies.map((tech, index) => (
                  <div key={tech.name} className="nothing-card p-4 hover:scale-105 transition-all duration-300 group">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl nothing-glass flex items-center justify-center ${tech.color} group-hover:scale-110 transition-transform duration-300`}>
                        {tech.icon && <tech.icon className="w-6 h-6" />}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium nothing-text">{tech.name}</div>
                        <div className="text-sm nothing-text opacity-70 capitalize">{tech.category}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Links */}
            {(project.demoUrl || project.githubUrl || project.caseStudyUrl) && (
              <section className="nothing-animate-slide-up" style={{ animationDelay: '1000ms' }}>
                <SectionHeader
                  title={t('projects.links')}
                  icon={null}
                  iconColor="var(--nothing-orange)"
                  size="lg"
                  className="mb-8"
                />
                <div className="space-y-3">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 nothing-card hover:scale-105 transition-all duration-300 group"
                    >
                      <div className="w-12 h-12 rounded-xl nothing-glass flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Github className="w-6 h-6 nothing-text" />
                      </div>
                      <div>
                        <div className="font-medium nothing-text">{t('projects.sourceCode')}</div>
                        <div className="text-sm nothing-text opacity-70">Voir le code</div>
                      </div>
                    </a>
                  )}
                  {project.caseStudyUrl && (
                    <a
                      href={project.caseStudyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 nothing-card hover:scale-105 transition-all duration-300 group"
                    >
                      <div className="w-12 h-12 rounded-xl nothing-glass flex items-center justify-center group-hover:scale-110 transition-transform">
                        <ExternalLink className="w-6 h-6" style={{ color: 'var(--nothing-red)' }} />
                      </div>
                      <div>
                        <div className="font-medium nothing-text">{t('projects.caseStudy')}</div>
                        <div className="text-sm nothing-text opacity-70">Étude complète</div>
                      </div>
                    </a>
                  )}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 