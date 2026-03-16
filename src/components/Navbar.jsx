import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import GlassSurface from "./GlassSurface";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

// Spring config for buttery smooth morphing
const springTransition = {
  type: "spring",
  stiffness: 200,
  damping: 30,
  mass: 1,
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [activeSection, setActiveSection] = useState("home");
  const [isMobile, setIsMobile] = useState(false);
  const { scrollY } = useScroll();

  // Detect scroll
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 0);
  });

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace("#", ""));
    const observers = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.3, rootMargin: "-80px 0px -40% 0px" },
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Detect mobile and close mobile menu on desktop resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setIsOpen(false);
    };
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const shouldBeCapsule = isMobile || isScrolled;

  const getContainerStyle = () => {
    if (isMobile) {
      return {
        width: "100%",
        maxWidth: "calc(100% - 2rem)",
        marginTop: "16px",
      };
    }
    return {
      width: isScrolled ? "auto" : "100%",
      maxWidth: isScrolled ? "90%" : "100%",
      marginTop: isScrolled ? "16px" : "0px",
    };
  };

  // ---- The inner content (logo + links) — ALWAYS visible, never hidden ----
  const navContent = (
    <div className="flex items-center justify-between w-full px-4 sm:px-6 py-3 gap-x-4 md:gap-x-6">
      {/* Logo — always visible */}
      <a
        href="#home"
        onClick={(e) => handleClick(e, "#home")}
        className="text-lg md:text-xl font-display font-bold tracking-tight whitespace-nowrap shrink-0"
      >
        <span className="text-accent-teal">&lt;</span>
        RayanaJS
        <span className="text-accent-teal">/&gt;</span>
      </a>

      {/* Desktop Links — always visible on md+ */}
      <div className="hidden md:flex items-center gap-x-1 lg:gap-x-2">
        {navLinks.map((link) => {
          const isActive = activeSection === link.href.replace("#", "");
          return (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              onMouseEnter={() => setHoveredLink(link.label)}
              onMouseLeave={() => setHoveredLink(null)}
              className="relative px-3 lg:px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 z-10"
              style={{
                color: isActive
                  ? "#14b8a6"
                  : hoveredLink === link.label
                    ? "#f1f5f9"
                    : "#94a3b8",
              }}
            >
              {/* Hover pill */}
              {hoveredLink === link.label && (
                <motion.span
                  layoutId="nav-hover-pill"
                  className="absolute inset-0 rounded-full"
                  style={{ background: "rgba(255,255,255,0.07)" }}
                  transition={springTransition}
                />
              )}
              <span className="relative z-10">{link.label}</span>
              {/* Active dot */}
              {isActive && isScrolled && (
                <motion.span
                  layoutId="nav-active-dot"
                  className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent-teal"
                  transition={springTransition}
                />
              )}
            </a>
          );
        })}
      </div>

      {/* Mobile hamburger — always visible on <md */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden relative w-8 h-8 flex items-center justify-center text-text-secondary hover:text-accent-teal transition-colors shrink-0"
        aria-label="Toggle menu"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FiX size={22} />
            </motion.span>
          ) : (
            <motion.span
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FiMenu size={22} />
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  );

  // ---- Mobile expanded menu ----
  const mobileMenu = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="mobile-menu"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{
            height: { ...springTransition, stiffness: 250 },
            opacity: { duration: 0.2 },
          }}
          className="md:hidden overflow-hidden w-full"
        >
          <div className="px-4 pb-4 pt-1 space-y-1 border-t border-white/10 w-full">
            {navLinks.map((link, i) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, ...springTransition }}
                  className={`block py-2.5 px-4 rounded-xl text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-accent-teal bg-accent-teal/10"
                      : "text-text-secondary hover:text-accent-teal hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none w-full px-1.5">
      <motion.div
        layout
        transition={springTransition}
        className="pointer-events-auto mx-auto flex flex-col items-center"
        style={{
          ...getContainerStyle(),
          willChange: "max-width, margin-top",
        }}
      >
        {shouldBeCapsule ? (
          /* ── SCROLLED OR MOBILE: Capsule wrapped in GlassSurface ── */
          <GlassSurface
            width="100%"
            height="auto"
            borderRadius={isOpen ? 20 : 9999}
            borderWidth={0.06}
            brightness={0}
            opacity={0.94}
            blur={15}
            backgroundOpacity={0}
            saturation={1.2}
            className="navbar-glass-capsule"
            style={{
              maxWidth: "100%",
              width: "100%",
              transition: "border-radius 0.5s cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            <div className="flex flex-col w-full">
              {navContent}
              {mobileMenu}
            </div>
          </GlassSurface>
        ) : (
          /* ── TOP DESKTOP: Full-width transparent ── */
          <div className="bg-transparent w-full">
            <div className="flex flex-col w-full">
              {navContent}
              {mobileMenu}
            </div>
          </div>
        )}
      </motion.div>
    </nav>
  );
}
