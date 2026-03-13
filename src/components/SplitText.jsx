import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function SplitText({ text, className = '', delay = 0 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const chars = containerRef.current.querySelectorAll('.split-char');
    gsap.fromTo(
      chars,
      {
        y: 80,
        opacity: 0,
        rotateX: -90,
      },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        stagger: 0.04,
        duration: 0.8,
        ease: 'back.out(1.7)',
        delay: delay,
      }
    );
  }, [delay]);

  const words = text.split(' ');

  return (
    <span ref={containerRef} className={`inline-flex flex-wrap gap-x-3 ${className}`} style={{ perspective: '1000px' }}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-flex overflow-hidden">
          {word.split('').map((char, ci) => (
            <span
              key={ci}
              className="split-char inline-block"
              style={{ transformOrigin: 'bottom center', opacity: 0 }}
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </span>
  );
}
