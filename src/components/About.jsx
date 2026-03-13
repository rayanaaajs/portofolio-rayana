import { FiMonitor, FiCpu, FiCode, FiBookOpen } from "react-icons/fi";

const highlights = [
  { icon: FiMonitor, label: "UI/UX Design", desc: "Figma, Canva" },
  {
    icon: FiCpu,
    label: "System Architecture",
    desc: "Hardware & Software layers",
  },
  { icon: FiCode, label: "Web Dev", desc: "Frontend & Backend" },
  { icon: FiBookOpen, label: "2nd Semester", desc: "Informatics Engineering" },
];

export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-accent-teal font-mono text-sm tracking-widest uppercase">
            Get to know me
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-3">
            About <span className="text-accent-teal">Me</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Bio Card */}
          <div className="gradient-border p-8 rounded-2xl">
            <p className="text-text-secondary text-lg leading-relaxed mb-3">
              Hi, I'm{" "}
              <span className="text-text-primary font-semibold">
                Rayana Jaka Surya
              </span>{" "}
              a{" "}
              <span className="text-accent-teal font-semibold">
                Web Developer
              </span>{" "}
              and second semester college student dedicated to crafting engaging
              digital experiences. I specialize in WordPress, Woocoomerce, PHP,
              JavaScript, and CSS.
            </p>
            <p className="text-text-secondary text-lg leading-relaxed">
              Alongside building websites, I have a strong foundation in Java,
              database architecture, and operating systems. I am always looking
              forward to the next coding challenge and eager to turn complex
              ideas into seamless user experiences.
            </p>
          </div>

          {/* Highlight Cards Grid */}
          <div className="grid grid-cols-2 gap-4">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="gradient-border p-6 rounded-2xl group hover:bg-dark-card-hover transition-all duration-300 cursor-default"
              >
                <div className="w-12 h-12 rounded-xl bg-accent-teal/10 flex items-center justify-center mb-4 group-hover:bg-accent-teal/20 transition-colors duration-300">
                  <item.icon className="text-accent-teal text-xl" />
                </div>
                <h3 className="font-semibold text-text-primary mb-1">
                  {item.label}
                </h3>
                <p className="text-sm text-text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
