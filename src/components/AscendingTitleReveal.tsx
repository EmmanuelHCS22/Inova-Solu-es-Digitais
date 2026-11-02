import React, { useState, useEffect, useRef } from 'react';

interface AscendingTitleRevealProps {
  lines: string[];
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'div';
  className?: string;
  duration?: number; // ms (default: 950ms)
  staggerDelay?: number; // ms (default: 130ms)
  threshold?: number; // (default: 0.2)
}

export const AscendingTitleReveal: React.FC<AscendingTitleRevealProps> = ({
  lines,
  as: Component = 'h2',
  className = '',
  duration = 950,
  staggerDelay = 130,
  threshold = 0.2,
}) => {
  const containerRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for prefers-reduced-motion
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // IntersectionObserver to trigger once when scrolled into view
  useEffect(() => {
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const currentEl = containerRef.current;
    if (!currentEl) return;

    // Check if element is already within the viewport (or arrived via anchor #sobre)
    const rect = currentEl.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Runs only once per page load
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(currentEl);
    return () => observer.disconnect();
  }, [threshold, prefersReducedMotion]);

  const fullText = lines.join(' ');

  // Instant display for users preferring reduced motion
  if (prefersReducedMotion) {
    return (
      <Component ref={containerRef as any} className={className}>
        {lines.map((line, idx) => (
          <span key={idx} className="block">
            {line}
          </span>
        ))}
      </Component>
    );
  }

  return (
    <Component ref={containerRef as any} className={className}>
      {/* Accessible single-string text for screen readers */}
      <span className="sr-only">{fullText}</span>

      {/* Visual ascending mask reveal per line */}
      <span aria-hidden="true" className="block">
        {lines.map((line, idx) => {
          const delay = idx * staggerDelay;

          return (
            <span
              key={idx}
              className="block overflow-hidden pb-2 -mb-2 pt-1 -mt-1"
            >
              <span
                className="block transition-[transform,opacity] will-change-transform"
                style={{
                  transform: isVisible ? 'translateY(0%)' : 'translateY(115%)',
                  opacity: isVisible ? 1 : 0.05,
                  transitionDuration: `${duration}ms`,
                  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)', // Smooth power3.out easing
                  transitionDelay: `${delay}ms`,
                }}
              >
                {line}
              </span>
            </span>
          );
        })}
      </span>
    </Component>
  );
};
