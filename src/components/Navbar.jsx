import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import {
  FiMenu,
  FiX,
  FiHome,
  FiUser,
  FiCode,
  FiFolder,
  FiMail,
} from "react-icons/fi";

const navLinks = [
  { label: "Home", href: "#home", icon: FiHome },
  { label: "About", href: "#about", icon: FiUser },
  { label: "Skills", href: "#skills", icon: FiCode },
  { label: "Projects", href: "#projects", icon: FiFolder },
  { label: "Contact", href: "#contact", icon: FiMail },
];

// Spring config for fluid Dynamic Island morphing
const springTransition = {
  type: "spring",
  stiffness: 400,
  damping: 35,
  mass: 0.8,
};

const capsuleVariants = {
  full: {
    width: "100%",
    maxWidth: "100%",
    borderRadius: "0px",
    y: 0,
    transition: springTransition,
  },
  capsule: {
    width: "auto",
    maxWidth: "600px",
    borderRadius: "9999px",
    y: 8,
    transition: springTransition,
  },
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [activeSection, setActiveSection] = useState("home");
  const { scrollY } = useScroll();

  // Detect scroll position for morph trigger
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  // Track the active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace("#", ""));
    const observers = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.35, rootMargin: "-80px 0px -40% 0px" },
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const activeLink = navLinks.find((l) => l.href === `#${activeSection}`);
  const ActiveIcon = activeLink?.icon || FiHome;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <motion.div
        layout
        variants={capsuleVariants}
        animate={isScrolled ? "capsule" : "full"}
        initial="full"
        className={`pointer-events-auto ${
          isScrolled
            ? "liquid-glass mt-2 mx-4"
            : "bg-dark-primary/80 backdrop-blur-xl border-b border-dark-border/50"
        }`}
        style={{ willChange: "width, border-radius, transform" }}
      >
        {/* ---------- DESKTOP NAV ---------- */}
        <div className="hidden md:flex items-center justify-between px-6 py-3">
          {/* Logo — only at top */}
          <AnimatePresence mode="wait">
            {!isScrolled && (
              <motion.a
                key="logo"
                href="#home"
                onClick={(e) => handleClick(e, "#home")}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ ...springTransition, stiffness: 300 }}
                className="text-xl font-display font-bold tracking-tight mr-auto"
              >
                <span className="text-accent-teal">&lt;</span>
                RayanaJS
                <span className="text-accent-teal">/&gt;</span>
              </motion.a>
            )}
          </AnimatePresence>

          {/* Nav Links */}
          <div
            className={`flex items-center gap-1 ${isScrolled ? "mx-auto" : ""}`}
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  onMouseEnter={() => setHoveredLink(link.label)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className="relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-full z-10"
                  style={{
                    color: isActive
                      ? "#14b8a6"
                      : hoveredLink === link.label
                        ? "#f1f5f9"
                        : "#94a3b8",
                  }}
                >
                  {/* Hover pill indicator */}
                  {hoveredLink === link.label && (
                    <motion.span
                      layoutId="nav-hover-pill"
                      className="absolute inset-0 bg-white/[0.07] rounded-full"
                      transition={springTransition}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                  {/* Active dot */}
                  {isActive && isScrolled && (
                    <motion.span
                      layoutId="nav-active-dot"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent-teal"
                      transition={springTransition}
                    />
                  )}
                </a>
              );
            })}
          </div>
        </div>

        {/* ---------- MOBILE NAV ---------- */}
        <div className="md:hidden">
          {/* Compact capsule header */}
          <div className="flex items-center justify-between px-5 py-3">
            <motion.div
              className="flex items-center gap-2 text-accent-teal"
              layout
              transition={springTransition}
            >
              <ActiveIcon size={18} />
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeSection}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="text-sm font-semibold capitalize"
                >
                  {activeLink?.label || "Home"}
                </motion.span>
              </AnimatePresence>
            </motion.div>

            {/* Animated hamburger / close */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative w-8 h-8 flex items-center justify-center text-text-secondary hover:text-accent-teal transition-colors"
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

          {/* Expanded mobile menu — fluid expand downwards */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                key="mobile-menu"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  height: { ...springTransition, stiffness: 300 },
                  opacity: { duration: 0.2 },
                }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-4 space-y-1">
                  {navLinks.map((link, i) => {
                    const Icon = link.icon;
                    const isActive =
                      activeSection === link.href.replace("#", "");
                    return (
                      <motion.a
                        key={link.label}
                        href={link.href}
                        onClick={(e) => handleClick(e, link.href)}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: i * 0.05,
                          ...springTransition,
                          stiffness: 300,
                        }}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200 ${
                          isActive
                            ? "text-accent-teal bg-accent-teal/10"
                            : "text-text-secondary hover:text-accent-teal hover:bg-white/4"
                        }`}
                      >
                        <Icon size={18} />
                        {link.label}
                      </motion.a>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </nav>
  );
}
