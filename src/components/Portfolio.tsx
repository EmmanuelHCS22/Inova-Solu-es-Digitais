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
    { id: 'sites', label: 'Sites' },
    { id: 'landing-pages', label: 'Landing Pages' },
    { id: 'identidade-visual', label: 'Identidade Visual' },
    { id: 'plaquinhas', label: 'Plaquinhas' },
    { id: 'nfc', label: 'NFC' },
    { id: 'biosites', label: 'BioSites' },
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
      className="py-28 relative bg-[#F5F4F0] border-t border-black/8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div ref={headerRef} className="max-w-3xl mb-12 will-change-transform">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7357E8]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#171923]/70 font-semibold">
              PORTFÓLIO & CASOS
            </span>
          </div>
          <h2
            className="text-3xl sm:text-5xl font-extrabold text-[#171923] tracking-tight mb-4 font-display"
            style={{ textWrap: 'balance' }}
          >
            Projetos reais que conectam marcas a resultados.
          </h2>
          <p className="text-base sm:text-lg text-[#171923]/70 leading-relaxed max-w-2xl">
            Conheça criações desenvolvidas pela Inova Soluções Digitais para negócios físicos e digitais que exigem diferenciação visual e funcional.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-start overflow-x-auto pb-4 mb-12 gap-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap shrink-0 ${
                activeCategory === cat.id
                  ? 'bg-[#111321] text-white font-semibold shadow-sm'
                  : 'bg-white text-[#171923]/70 hover:text-[#171923] hover:bg-black/5 border border-black/8'
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
              className="group rounded-xl bg-white border border-black/8 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-lg"
            >
              {/* Media Thumbnail */}
              <div
                className="relative bg-[#F0EFEA] aspect-[16/10] overflow-hidden cursor-pointer"
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
                  className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono text-[#171923] border border-black/10">
                  {project.categoryLabel}
                </div>

                {project.isConceptual && (
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono text-[#171923]/70 border border-black/10">
                    Conceito Visual
                  </div>
                )}
              </div>

              {/* Content Body */}
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <span className="text-[11px] font-mono text-[#171923]/50 block mb-1">
                    {project.segment}
                  </span>
                  <h3 className="text-xl font-bold text-[#171923] mb-2 group-hover:text-[#7357E8] transition-colors font-display">
                    {project.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#171923]/70 leading-relaxed mb-4">
                    {project.description}
                  </p>

                  <div className="p-3 rounded-lg bg-[#F5F4F0] border border-black/5 mb-6">
                    <p className="text-[10px] font-semibold text-[#7357E8] uppercase tracking-wider mb-1">
                      Solução Desenvolvida
                    </p>
                    <p className="text-xs text-[#171923]/75 leading-relaxed">
                      {project.solution}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-black/8 flex items-center justify-between gap-3">
                  <a
                    href={getWhatsAppUrl(`Olá! Vi o projeto "${project.name}" no portfólio da Inova e gostaria de solicitar uma solução semelhante para minha empresa.`)}
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
                    Ver detalhes
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
