import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_PROJECTS, getWhatsAppUrl } from '../data/inovaData';
import { PortfolioProject } from '../types';

gsap.registerPlugin(ScrollTrigger);

interface PortfolioProps {
  onOpenModal: (image: { src: string; name: string; category?: string; description?: string; alt: string }) => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ onOpenModal }) => {
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: 'todos', label: 'Todos os Projetos' },
    { id: 'plaquinhas', label: 'Plaquinhas NFC e QR Code' },
    { id: 'chaveiros-cartoes', label: 'Chaveiros 3D e Cartões' },
    { id: 'presenca-digital', label: 'BioSites e Presença Digital' },
    { id: 'agendamento-sites', label: 'Sites e Agendamento Online' },
  ];

  const filteredProjects = PORTFOLIO_PROJECTS.filter((proj) => {
    if (activeCategory === 'todos') return true;
    return proj.category === activeCategory;
  });

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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="py-20 sm:py-28 lg:py-32 relative bg-[#F5F4F0] border-t border-black/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div ref={headerRef} className="max-w-3xl mb-12 will-change-transform">
          <h2
            className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#171923] tracking-tight mb-4 font-display leading-[1.12]"
            style={{ textWrap: 'balance' }}
          >
            Projetos reais que conectam marcas a resultados.
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-[#171923]/75 leading-relaxed max-w-2xl font-normal">
            Conheça soluções desenvolvidas pela Inova: plaquinhas em acrílico, chaveiros por impressão 3D, cartões inteligentes, BioSites e sistemas de agendamento online.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-start overflow-x-auto pb-4 mb-10 gap-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shrink-0 min-h-[38px] ${
                activeCategory === cat.id
                  ? 'bg-[#111321] text-white shadow-sm'
                  : 'bg-white text-[#171923]/70 hover:text-[#171923] hover:bg-black/5 border border-black/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Portfolio Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project: PortfolioProject) => (
            <div
              key={project.id}
              className="group rounded-2xl bg-white border border-black/10 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-lg"
            >
              {/* Media Thumbnail */}
              <div
                className="relative bg-[#0E101D] aspect-[16/10] overflow-hidden cursor-pointer flex items-center justify-center p-4"
                onClick={() =>
                  onOpenModal({
                    src: project.image,
                    name: project.name,
                    category: `${project.categoryLabel} • ${project.segment}`,
                    description: `${project.description} Solução desenvolvida: ${project.solution}`,
                    alt: `Projeto ${project.name}`,
                  })
                }
              >
                <img
                  src={project.image}
                  alt={project.name}
                  loading="lazy"
                  className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute top-3 left-3 bg-[#111321]/90 px-2.5 py-1 rounded text-[10px] text-white/90 border border-white/10 font-medium">
                  {project.categoryLabel}
                </div>

                {project.isConceptual && (
                  <div className="absolute top-3 right-3 bg-[#111321]/90 px-2.5 py-1 rounded text-[10px] text-white/70 border border-white/10 font-medium">
                    Demonstração
                  </div>
                )}
              </div>

              {/* Content Body */}
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <span className="text-xs text-[#171923]/60 block mb-1 font-medium">
                    {project.segment}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-[#171923] mb-2 group-hover:text-[#7357E8] transition-colors font-display">
                    {project.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#171923]/70 leading-relaxed mb-4 font-normal">
                    {project.description}
                  </p>

                  <div className="p-3.5 rounded-xl bg-[#F5F4F0] border border-black/5 mb-6">
                    <p className="text-[11px] font-semibold text-[#7357E8] uppercase tracking-wider mb-1">
                      Solução Implementada
                    </p>
                    <p className="text-xs text-[#171923]/75 leading-relaxed font-normal">
                      {project.solution}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-black/10 flex items-center justify-between gap-3">
                  <a
                    href={getWhatsAppUrl(`Olá! Vi o projeto "${project.name}" no portfólio da Inova e gostaria de solicitar uma solução semelhante para o meu negócio.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#171923] hover:text-[#7357E8] transition-colors"
                  >
                    <span>Solicitar projeto semelhante</span>
                    <ArrowUpRight className="w-4 h-4 text-[#7357E8]" />
                  </a>

                  <button
                    type="button"
                    onClick={() =>
                      onOpenModal({
                        src: project.image,
                        name: project.name,
                        category: `${project.categoryLabel} • ${project.segment}`,
                        description: `${project.description} Solução desenvolvida: ${project.solution}`,
                        alt: `Projeto ${project.name}`,
                      })
                    }
                    className="text-xs text-[#171923]/50 hover:text-[#171923] transition-colors"
                  >
                    Ampliar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
