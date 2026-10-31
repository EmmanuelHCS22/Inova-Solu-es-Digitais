import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Palette, Radio, Globe, ArrowRight, Check } from 'lucide-react';
import { SOLUTIONS_DATA } from '../data/inovaData';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ReactNode> = {
  Code: <Code2 className="w-5 h-5 text-[#7357E8]" />,
  Palette: <Palette className="w-5 h-5 text-[#7357E8]" />,
  Radio: <Radio className="w-5 h-5 text-[#7357E8]" />,
  Globe: <Globe className="w-5 h-5 text-[#7357E8]" />,
};

export const Solutions: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
          },
        }
      );

      if (cardsRef.current) {
        const cards = cardsRef.current.children;
        gsap.fromTo(
          cards,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 82%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="solucoes"
      ref={sectionRef}
      className="py-28 relative bg-[#F5F4F0] border-t border-black/8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="max-w-3xl mb-16 will-change-transform">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7357E8]" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#171923]/70">
              ÁREAS DE ATUAÇÃO
            </span>
          </div>
          <h2
            className="text-3xl sm:text-5xl font-extrabold text-[#171923] tracking-tight mb-5 font-display"
            style={{ textWrap: 'balance' }}
          >
            Soluções completas para posicionar sua marca.
          </h2>
          <p className="text-base sm:text-lg text-[#171923]/70 leading-relaxed max-w-2xl">
            Projetamos e executamos soluções integradas entre design, plataformas web e tecnologia física de aproximação para transformar visitantes em clientes fiéis.
          </p>
        </div>

        {/* 4 Cards Grid - Crisp Studio Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SOLUTIONS_DATA.map((item, idx) => (
            <div
              key={item.id}
              className="group relative rounded-xl bg-white p-6 sm:p-7 border border-black/8 hover:border-[#7357E8]/40 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between shadow-sm hover:shadow-lg hover:shadow-black/5"
            >
              <div>
                {/* Header card with minimal number */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-black/6">
                  <div className="w-10 h-10 rounded-lg bg-[#F5F4F0] flex items-center justify-center group-hover:bg-[#7357E8]/10 transition-colors">
                    {iconMap[item.iconName]}
                  </div>
                  <span className="text-xs font-mono text-[#171923]/40">0{idx + 1}</span>
                </div>

                <h3 className="text-xl font-bold text-[#171923] mb-3 group-hover:text-[#7357E8] transition-colors font-display">
                  {item.title}
                </h3>
                <p className="text-sm text-[#171923]/70 leading-relaxed mb-6 font-normal">
                  {item.description}
                </p>

                {/* Services checklist */}
                <div className="space-y-2 mb-8 pt-4 border-t border-black/6">
                  {item.services.map((srv, sIdx) => (
                    <div key={sIdx} className="flex items-start gap-2 text-xs sm:text-sm text-[#171923]/75">
                      <Check className="w-4 h-4 text-[#7357E8] shrink-0 mt-0.5" />
                      <span>{srv}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Link */}
              <a
                href={item.targetAnchor}
                className="inline-flex items-center justify-between w-full pt-4 border-t border-black/6 text-xs sm:text-sm font-semibold text-[#171923] group-hover:text-[#7357E8] transition-colors"
              >
                <span>{item.buttonText}</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform text-[#171923]/60 group-hover:text-[#7357E8]" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
