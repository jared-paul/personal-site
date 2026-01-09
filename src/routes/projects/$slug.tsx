import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { getProjectBySlug } from '../../content/projects';
import { getPostsForProject } from '../../lib/projects';
import { formatDate } from '../../lib/markdown';

export const Route = createFileRoute('/projects/$slug')({
  loader: async ({ params }) => {
    const project = getProjectBySlug(params.slug);
    if (!project) throw notFound();

    const posts = await getPostsForProject(params.slug);
    return { project, posts };
  },
  component: ProjectComponent,
  notFoundComponent: () => {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
        <p><Link to="/" className="text-blue-600 hover:underline">Back to Home</Link></p>
      </div>
    );
  },
});

function ProjectComponent() {
  const { project, posts } = Route.useLoaderData();

  return (
    <div>
      <p className="mb-4">
        <Link to="/" className="text-blue-600 hover:underline">Home</Link> &gt; {project.title}
      </p>

      <hr className="my-4" />

      <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
      <p className="mb-4">{project.description}</p>

      {project.longDescription && <p className="mb-4">{project.longDescription}</p>}

      {project.links && Object.keys(project.links).length > 0 && (
        <>
          <h2 className="text-2xl font-bold mb-2">Links</h2>
          <ul className="list-disc list-inside mb-4">
            {project.links.github && (
              <li><a href={project.links.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">GitHub Repository</a></li>
            )}
            {project.links.demo && (
              <li><a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Live Demo</a></li>
            )}
            {project.links.website && (
              <li><a href={project.links.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Website</a></li>
            )}
          </ul>
        </>
      )}

      <hr className="my-4" />

      <h2 className="text-2xl font-bold mb-2">Posts</h2>

      {posts.length > 0 ? (
        <ul className="list-disc list-inside mb-4">
          {posts.map((post) => (
            <li key={post.slug} className="mb-1">
              <Link to="/projects/$slug/$postSlug" params={{ slug: project.slug, postSlug: post.slug }} className="text-blue-600 hover:underline">
                {post.frontmatter.title}
              </Link>
              {' '}- {formatDate(post.frontmatter.date)}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mb-4">No posts yet.</p>
      )}

      <hr className="my-4" />

      <p><Link to="/" className="text-blue-600 hover:underline">Back to Home</Link></p>
    </div>
  );
}
