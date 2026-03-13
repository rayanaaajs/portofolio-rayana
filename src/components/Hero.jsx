import SplitText from './SplitText';
import ShinyText from './ShinyText';
import { FiDownload, FiArrowDown } from 'react-icons/fi';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-grid"
    >
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent-teal/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent-emerald/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-cyan/5 rounded-full blur-3xl" />

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-dark-secondary/80 border border-dark-border/50 mb-8 animate-fade-in-up">
          <span className="w-2 h-2 rounded-full bg-accent-teal animate-pulse" />
          <span className="text-sm text-text-secondary font-medium">Open to Collaborations</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6">
          <SplitText text="Web Developer" className="block" delay={0.3} />
          <span className="block mt-2">
            <SplitText text="Enthusiast" className="text-accent-teal" delay={0.8} />
          </span>
        </h1>

        {/* Subtitle */}

        <p className="text-text-secondary text-lg max-w-2xl mx-auto mb-10 animate-fade-in-up leading-relaxed" style={{ animationDelay: '1.5s' }}>
          Crafting digital experiences through code. Passionate about building
          beautiful, functional web applications and exploring the depths of
          software engineering.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '1.8s' }}>
          <a
            href="/cv.pdf"
            download
            className="group flex items-center gap-2 px-8 py-4 bg-accent-teal text-dark-primary font-semibold rounded-xl hover:bg-accent-emerald transition-all duration-300 hover:shadow-lg hover:shadow-accent-teal/25 hover:-translate-y-0.5"
          >
            <FiDownload className="group-hover:animate-bounce" />
            Download CV
          </a>
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-2 px-8 py-4 border border-dark-border text-text-secondary rounded-xl hover:border-accent-teal hover:text-accent-teal transition-all duration-300 hover:-translate-y-0.5"
          >
            Learn More
            <FiArrowDown />
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-text-muted rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-accent-teal rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
