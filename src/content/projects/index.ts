import { Project } from '../../types/project';
import { crunchProject } from './crunch';
import { popProject } from './pop';

export const projects: Project[] = [
  crunchProject,
  popProject,
];

/**
 * Get a project by its slug
 */
export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find(p => p.slug === slug);
};
