import { ReactNode } from 'react';
import { TechBadge } from './tech-badge';
import { StatusDot } from './status-dot';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  status: 'active' | 'warning' | 'error' | 'offline';
  image?: ReactNode;
  liveUrl?: string;
  githubUrl?: string;
  delay?: number;
  className?: string;
}

export function ProjectCard({ 
  title, 
  description, 
  technologies, 
  status,
  image,
  liveUrl,
  githubUrl,
  delay = 0,
  className = ''
}: ProjectCardProps) {
  return (
    <div 
      className={`nothing-glass rounded-3xl p-6 space-y-6 nothing-animate-slide-up hover:scale-105 transition-all duration-500 group ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Project Image/Preview */}
      <div className="relative overflow-hidden rounded-2xl h-48 bg-linear-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
        {image || (
          <div className="absolute inset-0 nothing-gradient opacity-60"></div>
        )}
        
        {/* Status indicator */}
        <div className="absolute top-4 right-4">
          <StatusDot status={status} size="sm" />
        </div>
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
          {liveUrl && (
            <button className="p-3 bg-white/20 backdrop-blur-sm rounded-xl text-white hover:bg-white/30 transition-colors">
              <ExternalLink className="w-5 h-5" />
            </button>
          )}
          {githubUrl && (
            <button className="p-3 bg-white/20 backdrop-blur-sm rounded-xl text-white hover:bg-white/30 transition-colors">
              <Github className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
      
      {/* Project Info */}
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="font-nothing text-lg font-medium text-gray-900 dark:text-white nothing-dot">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 font-light text-sm leading-relaxed">
            {description}
          </p>
        </div>
        
        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <TechBadge 
              key={tech} 
              tech={tech} 
              variant={index === 0 ? 'primary' : index === 1 ? 'secondary' : 'default'}
            />
          ))}
        </div>
        
        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
          <StatusDot status={status} label={status === 'active' ? 'En ligne' : 'Maintenance'} size="sm" />
          
          <div className="flex items-center space-x-2">
            {liveUrl && (
              <button className="text-xs text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors flex items-center space-x-1">
                <ExternalLink className="w-3 h-3" />
                <span>Live</span>
              </button>
            )}
            {githubUrl && (
              <button className="text-xs text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors flex items-center space-x-1">
                <Github className="w-3 h-3" />
                <span>Code</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 