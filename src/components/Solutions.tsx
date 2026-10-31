import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Code2, Palette, Radio, Globe } from 'lucide-react';
import { SOLUTIONS_DATA } from '../data/inovaData';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ReactNode> = {
  Code: <Code2 className="w-5 h-5 text-[#8B5CF6]" />,
  Palette: <Palette className="w-5 h-5 text-[#8B5CF6]" />,
  Radio: <Radio className="w-5 h-5 text-[#8B5CF6]" />,
  Globe: <Globe className="w-5 h-5 text-[#8B5CF6]" />,
};

export const Solutions: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);

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

      if (rowsRef.current) {
        const rows = rowsRef.current.children;
        gsap.fromTo(
          rows,
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: rowsRef.current,
              start: 'top 85%',
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
      className="py-24 sm:py-32 relative bg-[#F5F4F0] border-t border-black/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Editorial */}
        <div ref={headerRef} className="max-w-3xl mb-14 sm:mb-20 will-change-transform">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
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
          <p className="text-base sm:text-lg text-[#171923]/75 leading-relaxed max-w-2xl font-normal">
            Projetamos e executamos soluções integradas entre design, plataformas web e tecnologia física de aproximação para transformar visitantes em clientes fiéis.
          </p>
        </div>

        {/* Diretório Editorial com Divisórias Horizontais (Zero caixas repetitivas) */}
        <div ref={rowsRef} className="border-t border-black/15">
          {SOLUTIONS_DATA.map((item, idx) => (
            <div
              key={item.id}
              className="group py-8 sm:py-10 border-b border-black/15 transition-colors duration-300 hover:bg-black/[0.015]"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                
                {/* Coluna 1: Número e Ícone */}
                <div className="lg:col-span-2 flex items-center lg:items-start gap-4">
                  <span className="text-sm font-mono text-[#171923]/40 tracking-wider">
                    0{idx + 1}
                  </span>
                  <div className="p-2 rounded-lg bg-black/5 text-[#8B5CF6] group-hover:bg-[#8B5CF6]/10 transition-colors">
                    {iconMap[item.iconName]}
                  </div>
                </div>

                {/* Coluna 2: Título e Descrição */}
                <div className="lg:col-span-5">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#171923] mb-3 group-hover:text-[#8B5CF6] transition-colors font-display tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#171923]/75 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                {/* Coluna 3: Tags Editoriais de Entregáveis */}
                <div className="lg:col-span-3">
                  <span className="block text-[11px] font-mono uppercase tracking-widest text-[#171923]/50 mb-2.5">
                    Entregáveis & Aplicações
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {item.services.map((srv, sIdx) => (
                      <span
                        key={sIdx}
                        className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-md bg-white border border-black/10 text-[#171923]/80"
                      >
                        {srv}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Coluna 4: Link de Ação */}
                <div className="lg:col-span-2 flex justify-start lg:justify-end pt-2 lg:pt-0">
                  <a
                    href={item.targetAnchor}
                    className="group/btn inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg bg-[#111321] text-white hover:bg-[#8B5CF6] transition-all duration-200 shadow-sm whitespace-nowrap active:scale-98"
                  >
                    <span>{item.buttonText}</span>
                    <ArrowUpRight className="w-4 h-4 text-white/80 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </a>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
