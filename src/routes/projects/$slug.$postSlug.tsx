import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { getProjectBySlug } from '../../content/projects';
import { getPostBySlug } from '../../lib/projects';
import { formatDate } from '../../lib/markdown';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';

export const Route = createFileRoute('/projects/$slug/$postSlug')({
  loader: async ({ params }) => {
    const project = getProjectBySlug(params.slug);
    if (!project) throw notFound();

    const post = await getPostBySlug(params.slug, params.postSlug);
    if (!post) throw notFound();

    return { project, post };
  },
  component: PostComponent,
  notFoundComponent: () => {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
        <p><Link to="/" className="text-blue-600 hover:underline">Back to Home</Link></p>
      </div>
    );
  },
});

function PostComponent() {
  const { project, post } = Route.useLoaderData();

  return (
    <div>
      <p className="mb-4">
        <Link to="/" className="text-blue-600 hover:underline">Home</Link> &gt;{' '}
        <Link to="/projects/$slug" params={{ slug: project.slug }} className="text-blue-600 hover:underline">
          {project.title}
        </Link> &gt; {post.frontmatter.title}
      </p>

      <hr className="my-4" />

      <h1 className="text-3xl font-bold mb-4">{post.frontmatter.title}</h1>

      <p className="text-sm text-gray-500 mb-4">{formatDate(post.frontmatter.date)}</p>

      <hr className="my-4" />

      <div className="prose prose-slate max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight, rehypeRaw]}
        >
          {post.content}
        </ReactMarkdown>
      </div>

      <hr className="my-4" />

      <p><Link to="/projects/$slug" params={{ slug: project.slug }} className="text-blue-600 hover:underline">Back to {project.title}</Link></p>
    </div>
  );
}
