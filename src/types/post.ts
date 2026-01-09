export interface PostFrontmatter {
  title: string;
  date: string;
  author?: string;
  description?: string;
  tags?: string[];
  image?: string;
  draft?: boolean;
}

export interface Post {
  slug: string;
  projectSlug: string;
  frontmatter: PostFrontmatter;
  content: string;
  excerpt?: string;
}
