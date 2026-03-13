import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiHeart,
  FiArrowUp,
} from "react-icons/fi";

const socials = [
  { icon: FiGithub, href: "https://github.com", label: "GitHub" },
  { icon: FiLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: FiMail, href: "mailto:rayana@email.com", label: "Email" },
];

export default function Footer() {
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="contact"
      className="relative py-16 px-6 border-t border-dark-border/30"
    >
      {/* Gradient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-accent-teal/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <span className="text-accent-teal font-mono text-sm tracking-widest uppercase">
            Let's connect
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-3 mb-4">
            Get In <span className="text-accent-teal">Touch</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-lg mx-auto">
            I'm always excited to connect with fellow developers, collaborate on
            projects, or just chat about tech!
          </p>
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {socials.map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="group gradient-border w-14 h-14 rounded-xl flex items-center justify-center
                         hover:bg-accent-teal/10 transition-all duration-300 hover:-translate-y-1
                         hover:shadow-lg hover:shadow-accent-teal/10"
            >
              <social.icon className="text-xl text-text-secondary group-hover:text-accent-teal transition-colors duration-300" />
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-dark-border to-transparent mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-sm flex items-center gap-1">
            <span className=""></span>© {new Date().getFullYear()} Rayana Jaka Surya
          </p>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-sm text-text-muted hover:text-accent-teal transition-colors duration-300"
          >
            Back to top
            <FiArrowUp className="group-hover:-translate-y-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </footer>
  );
}
