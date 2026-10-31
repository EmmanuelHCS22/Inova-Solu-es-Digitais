import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ArrowDown, Sparkles } from 'lucide-react';
import { getWhatsAppUrl } from '../data/inovaData';

gsap.registerPlugin(ScrollTrigger);

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const kickerRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const auxiliaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set('.hero-line-reveal', { yPercent: 0, opacity: 1 });
        gsap.set(
          [kickerRef.current, subtitleRef.current, ctaGroupRef.current, auxiliaryRef.current, visualRef.current],
          { opacity: 1, y: 0 }
        );
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // 1. Kicker
      tl.fromTo(
        kickerRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.5 }
      )
      // 2. Headline: 3 linhas editoriais reveladas por máscara com curva expressiva
      .fromTo(
        '.hero-line-reveal',
        { yPercent: 115, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.1,
          ease: 'power4.out',
        },
        '-=0.3'
      )
      // 3. Subtítulo
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.55 },
        '-=0.45'
      )
      // 4. Botões de ação
      .fromTo(
        ctaGroupRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5 },
        '-=0.35'
      )
      // 5. Linha de pilares
      .fromTo(
        auxiliaryRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.45 },
        '-=0.25'
      )
      // 6. Vitrine de galeria de produto
      .fromTo(
        visualRef.current,
        { opacity: 0, y: 26, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out' },
        '-=0.6'
      );

      // Parallax controlado na rolagem da vitrine
      if (containerRef.current && visualRef.current) {
        gsap.to(visualRef.current, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
          yPercent: -5,
          ease: 'none',
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="inicio"
      ref={containerRef}
      className="relative min-h-[90vh] flex items-center pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20 overflow-hidden bg-[#F5F4F0]"
    >
      {/* Textura arquitetônica de fundo muito sutil */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none -z-10 opacity-25 [background-image:radial-gradient(rgba(23,25,35,0.08)_1px,transparent_1px)] [background-size:28px_28px]"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-14 items-center">
          
          {/* LADO ESQUERDO: Tipografia Editorial, Headline em 3 Linhas & Ações */}
          <div ref={leftColRef} className="lg:col-span-7 flex flex-col justify-center text-left">
            
            {/* Kicker Discreto */}
            <div ref={kickerRef} className="flex items-center gap-2.5 mb-4 sm:mb-5">
              <span className="w-2 h-2 rounded-full bg-[#8B5CF6] inline-block shadow-[0_0_8px_rgba(139,92,246,0.55)]" />
              <span className="text-xs uppercase tracking-[0.2em] text-[#171923] font-semibold">
                ESTÚDIO DE SOLUÇÕES DIGITAIS
              </span>
              <span className="text-[#171923]/30">·</span>
              <span className="text-xs text-[#171923]/60 font-medium">Design & Tecnologia</span>
            </div>

            {/* Headline com Distribuição Editorial Equilibrada em 3 Linhas */}
            <h1 className="text-[clamp(2.35rem,4.4vw,4.5rem)] font-extrabold text-[#171923] tracking-tight leading-[1.04] mb-6 font-display">
              <span className="block overflow-hidden pb-1">
                <span className="hero-line-reveal block will-change-transform">
                  Transformamos ideias
                </span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="hero-line-reveal block will-change-transform">
                  em experiências
                </span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="hero-line-reveal block will-change-transform text-[#8B5CF6]">
                  digitais.
                </span>
              </span>
            </h1>

            {/* Subtítulo com Largura Controlada e Proporção Equilibrada */}
            <p
              ref={subtitleRef}
              className="text-base sm:text-lg lg:text-xl text-[#171923]/75 leading-relaxed max-w-xl mb-8 font-normal"
            >
              Desenvolvemos sites, experiências digitais e soluções inteligentes que ajudam marcas e negócios a se posicionarem melhor e crescerem.
            </p>

            {/* Grupo de Ações (Botão Primário e Secundário) */}
            <div
              ref={ctaGroupRef}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-9"
            >
              {/* Botão Primário: #111321, hover para #8B5CF6 com microdeslocamento */}
              <a
                href={getWhatsAppUrl('Olá! Gostaria de solicitar um projeto com a Inova Soluções Digitais.')}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 text-sm sm:text-base font-semibold rounded-lg text-white bg-[#111321] hover:bg-[#8B5CF6] transition-all duration-200 shadow-sm active:scale-98 whitespace-nowrap"
              >
                <span>Solicitar um projeto</span>
                <ArrowUpRight className="w-4 h-4 text-white/80 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
              </a>

              {/* Botão Secundário: Transparente, borda discreta, hover neutro */}
              <a
                href="#portfolio"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 text-sm sm:text-base font-semibold rounded-lg text-[#171923] bg-transparent hover:bg-black/5 border border-black/15 hover:border-black/30 transition-all duration-200 active:scale-98 whitespace-nowrap"
              >
                <span>Explorar projetos</span>
                <ArrowDown className="w-4 h-4 text-[#171923]/60" />
              </a>
            </div>

            {/* Linha Inferior com os Pilares da Empresa */}
            <div
              ref={auxiliaryRef}
              className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-[#171923]/70 font-medium pt-5 border-t border-black/10"
            >
              <span className="uppercase tracking-[0.14em]">Design Estratégico</span>
              <span className="text-[#8B5CF6]">•</span>
              <span className="uppercase tracking-[0.14em]">Tecnologia Web</span>
              <span className="text-[#8B5CF6]">•</span>
              <span className="uppercase tracking-[0.14em]">Presença Digital</span>
            </div>
          </div>

          {/* LADO DIREITO: Vitrine Editorial de Galeria (Foco Total no Produto Real) */}
          <div
            ref={visualRef}
            className="lg:col-span-5 relative flex items-center justify-center will-change-transform mt-6 lg:mt-0"
          >
            <div className="relative w-full max-w-[500px]">
              
              {/* Moldura de Galeria de Estúdio — Sem painéis aninhados tipo dashboard */}
              <div className="relative rounded-2xl bg-[#111321] text-[#F7F8FC] p-5 sm:p-7 shadow-2xl border border-white/10 overflow-hidden">
                
                {/* Linha Editorial Superior de Curadoria */}
                <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
                    <span className="text-xs uppercase tracking-wider font-semibold text-white/90">
                      Peça em Exposição // Claudia Ateliê
                    </span>
                  </div>
                  <span className="text-[10px] font-mono tracking-widest text-white/50 uppercase">
                    NFC + QR Code
                  </span>
                </div>

                {/* Área Fotográfica com Máximo Protagonismo */}
                <div className="relative rounded-xl overflow-hidden bg-transparent mb-5 aspect-[4/3] flex items-center justify-center group">
                  <img
                    src="/assets/inova/personalizada-claudia.jpeg"
                    alt="Plaquinha NFC e QR Code personalizada desenvolvida pela Inova Soluções Digitais para Claudia Ateliê"
                    className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    loading="eager"
                  />
                </div>

                {/* Metadados Técnicos em Linha Editorial Dividida (Zero cartões dentro de cartões) */}
                <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 border-t border-white/10 text-left">
                  <div>
                    <span className="block text-[10px] font-mono tracking-widest uppercase text-white/45">
                      Tecnologia
                    </span>
                    <span className="block text-xs sm:text-sm font-semibold text-[#F7F8FC] mt-0.5 truncate">
                      NFC NTAG215
                    </span>
                  </div>
                  <div className="border-l border-white/10 pl-3 sm:pl-4">
                    <span className="block text-[10px] font-mono tracking-widest uppercase text-white/45">
                      Acabamento
                    </span>
                    <span className="block text-xs sm:text-sm font-semibold text-[#F7F8FC] mt-0.5 truncate">
                      Acrílico Cristal
                    </span>
                  </div>
                  <div className="border-l border-white/10 pl-3 sm:pl-4">
                    <span className="block text-[10px] font-mono tracking-widest uppercase text-white/45">
                      Integração
                    </span>
                    <span className="block text-xs sm:text-sm font-semibold text-[#F7F8FC] mt-0.5 truncate">
                      Multi-Canais
                    </span>
                  </div>
                </div>

                {/* Rodapé Editorial de Estúdio */}
                <div className="flex items-center justify-between pt-3 mt-4 text-[11px] text-white/50 border-t border-white/5 font-mono">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6]" />
                    <span>Aproximação instantânea sem aplicativo</span>
                  </div>
                  <span className="text-white/40">Inova 2026</span>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
