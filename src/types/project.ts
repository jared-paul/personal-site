export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  color?: string;
  icon?: string;
  image?: string;
  startDate: string;
  status: 'active' | 'completed' | 'archived';
  links?: {
    github?: string;
    demo?: string;
    website?: string;
  };
}
