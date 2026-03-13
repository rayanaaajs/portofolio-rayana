import TiltCard from './TiltCard';
import { FiExternalLink, FiGithub } from 'react-icons/fi';

const projects = [
  {
    title: 'Campus Event Portal',
    description:
      'A responsive web application for managing and discovering campus events. Features event listings, RSVP functionality, and an admin dashboard for organizers.',
    tags: ['React', 'Tailwind CSS', 'PHP', 'MySQL'],
    github: 'https://github.com',
    color: '#14B8A6',
  },
  {
    title: 'Student Database System',
    description:
      'An academic project implementing a relational database with proper ERD/CDM design. Includes CRUD operations, reporting, and data validation for student records.',
    tags: ['Java', 'MySQL', 'ERD/CDM', 'JDBC'],
    github: 'https://github.com',
    color: '#10B981',
  },
  {
    title: 'Personal Blog Platform',
    description:
      'A WordPress-based blog platform customized with a bespoke theme. Features optimized SEO, responsive design, and a custom content management workflow.',
    tags: ['WordPress', 'PHP', 'CSS', 'JavaScript'],
    github: 'https://github.com',
    color: '#06B6D4',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-accent-teal font-mono text-sm tracking-widest uppercase">What I've built</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-3">
            Featured <span className="text-accent-teal">Projects</span>
          </h2>
        </div>

        {/* Project Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <TiltCard key={index} glowColor={`${project.color}20`}>
              <div className="gradient-border rounded-2xl p-8 h-full flex flex-col group cursor-default">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${project.color}15` }}
                  >
                    <span className="text-2xl" style={{ color: project.color }}>
                      &#123;&#125;
                    </span>
                  </div>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-muted hover:text-accent-teal transition-colors duration-300 relative z-10"
                    aria-label="View source on GitHub"
                  >
                    <FiGithub size={20} />
                  </a>
                </div>

                {/* Title */}
                <h3 className="text-xl font-display font-bold text-text-primary mb-3 group-hover:text-accent-teal transition-colors duration-300">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-text-secondary text-sm leading-relaxed mb-6 flex-grow">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, ti) => (
                    <span
                      key={ti}
                      className="text-xs font-mono px-3 py-1 rounded-full bg-dark-primary/50 text-text-muted border border-dark-border/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* View Source Link */}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-accent-teal hover:text-accent-emerald transition-colors duration-300 relative z-10 group/link"
                >
                  View Source
                  <FiExternalLink className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-300" />
                </a>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
