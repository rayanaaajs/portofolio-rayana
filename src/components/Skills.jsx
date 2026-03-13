import {
  SiJavascript, SiReact, SiTailwindcss, SiPhp,
  SiWordpress, SiHtml5, SiCss, SiGit,
} from 'react-icons/si';
import { FaJava, FaDatabase } from 'react-icons/fa';

const skills = [
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E', category: 'Language' },
  { name: 'React', icon: SiReact, color: '#61DAFB', category: 'Framework' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4', category: 'Styling' },
  { name: 'PHP', icon: SiPhp, color: '#777BB4', category: 'Language' },
  { name: 'Java', icon: FaJava, color: '#ED8B00', category: 'Language' },
  { name: 'WordPress', icon: SiWordpress, color: '#21759B', category: 'CMS' },
  { name: 'HTML5', icon: SiHtml5, color: '#E34F26', category: 'Markup' },
  { name: 'CSS3', icon: SiCss, color: '#1572B6', category: 'Styling' },
  { name: 'Database (ERD/CDM)', icon: FaDatabase, color: '#14B8A6', category: 'Database' },
  { name: 'Git', icon: SiGit, color: '#F05032', category: 'Tool' },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 bg-dark-secondary/30">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-accent-teal font-mono text-sm tracking-widest uppercase">What I work with</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-3">
            Tech <span className="text-accent-teal">Stack</span>
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="gradient-border group p-6 rounded-2xl flex flex-col items-center text-center
                         hover:bg-dark-card-hover transition-all duration-300 cursor-default
                         hover:-translate-y-1 hover:shadow-lg hover:shadow-black/20"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${skill.color}15` }}
              >
                <skill.icon
                  className="text-2xl transition-all duration-300 group-hover:drop-shadow-lg"
                  style={{ color: skill.color }}
                />
              </div>

              {/* Name */}
              <h3 className="font-semibold text-sm text-text-primary mb-1">{skill.name}</h3>

              {/* Category Tag */}
              <span
                className="text-xs px-2 py-0.5 rounded-full font-mono transition-all duration-300"
                style={{
                  color: skill.color,
                  backgroundColor: `${skill.color}10`,
                }}
              >
                {skill.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
