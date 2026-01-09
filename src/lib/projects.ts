import { Post } from '../types/post';
import matter from 'gray-matter';

/**
 * Dynamically import all markdown files for a project
 */
export async function getPostsForProject(projectSlug: string): Promise<Post[]> {
  // Use Vite's glob import feature to load all markdown files
  const modules = import.meta.glob<string>('../content/projects/*/posts/*.md', {
    query: '?raw',
    import: 'default',
  });

  const posts: Post[] = [];

  for (const path in modules) {
    // Only process posts for the specified project
    if (path.includes(`/${projectSlug}/posts/`)) {
      try {
        const loadModule = modules[path];
        const rawContent = await loadModule();
        const { data, content } = matter(rawContent);

        // Extract slug from filename (remove path and .md extension)
        const filename = path.split('/').pop()!;
        const slug = filename.replace('.md', '');

        posts.push({
          slug,
          projectSlug,
          frontmatter: data as Post['frontmatter'],
          content,
          excerpt: data.description || content.slice(0, 160),
        });
      } catch (error) {
        console.error(`Error loading post from ${path}:`, error);
      }
    }
  }

  // Sort by date, newest first
  return posts.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date).getTime();
    const dateB = new Date(b.frontmatter.date).getTime();
    return dateB - dateA;
  });
}

/**
 * Get a specific post by slug
 */
export async function getPostBySlug(
  projectSlug: string,
  postSlug: string
): Promise<Post | null> {
  try {
    // Dynamically import the specific markdown file
    const rawContent = await import(
      `../content/projects/${projectSlug}/posts/${postSlug}.md?raw`
    );
    const { data, content } = matter(rawContent.default);

    return {
      slug: postSlug,
      projectSlug,
      frontmatter: data as Post['frontmatter'],
      content,
      excerpt: data.description || content.slice(0, 160),
    };
  } catch (error) {
    console.error(`Post not found: ${projectSlug}/${postSlug}`, error);
    return null;
  }
}

/**
 * Get all posts across all projects
 */
export async function getAllPosts(): Promise<Post[]> {
  const modules = import.meta.glob<string>('../content/projects/*/posts/*.md', {
    query: '?raw',
    import: 'default',
  });

  const posts: Post[] = [];

  for (const path in modules) {
    try {
      const loadModule = modules[path];
      const rawContent = await loadModule();
      const { data, content } = matter(rawContent);

      // Extract project slug and post slug from path
      const parts = path.split('/');
      const projectSlug = parts[parts.length - 3]; // ../content/projects/{projectSlug}/posts/filename.md
      const filename = parts[parts.length - 1];
      const postSlug = filename.replace('.md', '');

      posts.push({
        slug: postSlug,
        projectSlug,
        frontmatter: data as Post['frontmatter'],
        content,
        excerpt: data.description || content.slice(0, 160),
      });
    } catch (error) {
      console.error(`Error loading post from ${path}:`, error);
    }
  }

  // Sort by date, newest first
  return posts.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date).getTime();
    const dateB = new Date(b.frontmatter.date).getTime();
    return dateB - dateA;
  });
}
