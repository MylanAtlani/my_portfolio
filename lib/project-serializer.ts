import { Project } from '@/types';

/** Serializable version of Technology — icon replaced by category string for client resolution */
export interface SerializedTechnology {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'mobile' | 'design' | 'other';
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  color?: string;
}

/** Serializable version of Project — LucideIcon fields stripped for server→client transfer */
export interface SerializedProject {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  companyWebsite?: string;
  role: string;
  description: string;
  fullDescription?: string;
  technologies: SerializedTechnology[];
  mainTechnology?: string;
  status: 'active' | 'completed' | 'paused';
  type: 'freelance' | 'cdi' | 'stage' | 'personnel';
  period: string;
  duration?: string;
  teamSize?: number;
  mission?: string[];
  challenges?: string[];
  achievements?: string[];
  learnings?: string[];
  demoUrl?: string;
  githubUrl?: string;
  caseStudyUrl?: string;
  gradient: string;
  featured?: boolean;
}

/** Strip non-serializable LucideIcon fields from a Project */
export function serializeProject(project: Project): SerializedProject {
  return {
    id: project.id,
    title: project.title,
    company: project.company,
    companyLogo: project.companyLogo,
    companyWebsite: project.companyWebsite,
    role: project.role,
    description: project.description,
    fullDescription: project.fullDescription,
    technologies: project.technologies.map((tech) => ({
      name: tech.name,
      category: tech.category,
      level: tech.level,
      color: tech.color,
    })),
    mainTechnology: project.mainTechnology,
    status: project.status,
    type: project.type,
    period: project.period,
    duration: project.duration,
    teamSize: project.teamSize,
    mission: project.mission,
    challenges: project.challenges,
    achievements: project.achievements,
    learnings: project.learnings,
    demoUrl: project.demoUrl,
    githubUrl: project.githubUrl,
    caseStudyUrl: project.caseStudyUrl,
    gradient: project.gradient,
    featured: project.featured,
  };
}
