import { createFileRoute, Link } from '@tanstack/react-router';
import { projects } from '../content/projects';

export const Route = createFileRoute('/')({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Jared Paul</h1>
      <img src="/pfp.webp" alt="Jared Paul" className="w-[270px] h-[270px] mb-4 rounded" />
      <p>
        <strong>Software Developer @ Amazon</strong><br />
        Vancouver, Canada
      </p>

      <hr className="my-4" />

      <nav className="flex gap-4 mb-4">
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#resume">Resume</a>
        <a href="#links">Links</a>
        <a href="#contact">Contact</a>
      </nav>

      <hr className="my-4" />

      <h2 id="about" className="text-2xl font-bold mb-2">About Me</h2>
      <p className="mb-4">
        Welcome! I am a software engineer working at Amazon in Prime Payments, and no, I do not get Prime for free haha :(. I started developing as a kid writing Minecraft plugins, some of which you can still find on my <a href="https://github.com/jared-paul/Skookum" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">GitHub</a>. I then went on to study computer engineering at UBC, graduating in 2023.
      </p>
      <p className="mb-4">
        These days I usually find something that piques my interest, anywhere from making <a href="#roblox">roblox games</a> to <Link to="/projects/$slug" params={{ slug: 'pop' }} className="text-blue-600 hover:underline">karaoke machines</Link>.
        When I'm not at a keyboard you can probably find me counting calories, embroidering, or recording covers.
      </p>
      <p className="mb-4">
        I'm always down to chat - whether you want to collab, vent, or just talk about the weather, feel free to reach out.
      </p>

      <h2 id="projects" className="text-2xl font-bold mb-2 mt-8">Projects</h2>
      <p className="mb-2">I own <a href="https://cereal.box" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">cereal.box</a> — you can find most of my projects there.</p>
      <p className="mb-4">But here is a quick list:</p>

      <div className="mb-4"></div>

      <ul className="list-disc list-inside mb-4">
        {projects.map((project) => (
          <li key={project.slug} id={project.slug === 'pop' ? 'karaoke' : undefined} className="mb-1">
            <Link to="/projects/$slug" params={{ slug: project.slug }} className="text-blue-600 hover:underline font-semibold">
              {project.title}
            </Link>
            {' '}- {project.description}
          </li>
        ))}
      </ul>

      {projects.length === 0 && (
        <p>No projects yet.</p>
      )}

      <hr className="my-4" />

      <h2 id="resume" className="text-2xl font-bold mb-2">Resume / CV</h2>
      <p className="mb-4"><a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View Resume / CV</a></p>

      <hr className="my-4" />

      <h2 id="links" className="text-2xl font-bold mb-2">Links</h2>
      <ul className="list-disc list-inside mb-4">
        <li><a href="https://github.com/jared-paul/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">GitHub</a></li>
        <li><a href="https://www.linkedin.com/in/jared-p/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">LinkedIn</a></li>
      </ul>

      <hr className="my-4" />

      <h2 id="contact" className="text-2xl font-bold mb-2">Contact</h2>
      <p className="mb-4"><a href="mailto:jared@cereal.box" className="text-blue-600 hover:underline">jared@cereal.box</a></p>

      <hr className="my-4" />

      <footer>
        <p className="text-sm text-gray-500">Last updated: January 2026</p>
      </footer>
    </div>
  );
}
