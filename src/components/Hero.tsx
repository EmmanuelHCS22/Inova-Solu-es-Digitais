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
        gsap.set('.hero-word-reveal', { yPercent: 0, opacity: 1 });
        gsap.set([kickerRef.current, subtitleRef.current, ctaGroupRef.current, auxiliaryRef.current, visualRef.current], {
          opacity: 1,
          y: 0,
        });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // 1. Kicker
      tl.fromTo(
        kickerRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
      // 2. Headline word-by-word reveal
      .fromTo(
        '.hero-word-reveal',
        { yPercent: 120, rotateZ: 2, opacity: 0 },
        {
          yPercent: 0,
          rotateZ: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.05,
          ease: 'power4.out',
        },
        '-=0.4'
      )
      // 3. Subtitle
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.5'
      )
      // 4. Buttons
      .fromTo(
        ctaGroupRef.current,
        { opacity: 0, y: 20, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5 },
        '-=0.4'
      )
      // 5. Auxiliary text
      .fromTo(
        auxiliaryRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.5 },
        '-=0.3'
      )
      // 6. Right Visual Composition
      .fromTo(
        visualRef.current,
        { opacity: 0, y: 35, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out' },
        '-=0.6'
      );

      // Parallax scroll on visual side
      if (containerRef.current && visualRef.current) {
        gsap.to(visualRef.current, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
          yPercent: -8,
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
      className="relative min-h-[92vh] flex items-center pt-32 pb-20 overflow-hidden bg-[#F5F4F0]"
    >
      {/* Subtle architectural atmosphere grid */}
      <div className="absolute inset-0 pointer-events-none -z-10 opacity-30 [background-image:radial-gradient(rgba(23,25,35,0.08)_1px,transparent_1px)] [background-size:32px_32px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* LADO ESQUERDO: Tipografia Editorial & Mensagem Institucional */}
          <div ref={leftColRef} className="lg:col-span-7 flex flex-col justify-center text-left">
            {/* Kicker */}
            <div ref={kickerRef} className="flex items-center gap-2.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#7357E8]" />
              <span className="text-xs uppercase tracking-[0.2em] text-[#171923] font-semibold">
                ESTÚDIO DE SOLUÇÕES DIGITAIS
              </span>
              <span className="text-[#171923]/30">·</span>
              <span className="text-xs text-[#171923]/60 font-medium">Design & Tecnologia</span>
            </div>

            {/* Headline Principal: "Transformamos ideias em experiências digitais." */}
            <h1
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#171923] tracking-tight leading-[1.06] mb-7 font-display"
              style={{ textWrap: 'balance' }}
            >
              <span className="inline-block overflow-hidden mr-3 pb-1">
                <span className="hero-word-reveal inline-block will-change-transform">Transformamos</span>
              </span>
              <span className="inline-block overflow-hidden mr-3 pb-1">
                <span className="hero-word-reveal inline-block will-change-transform">ideias</span>
              </span>
              <span className="inline-block overflow-hidden mr-3 pb-1">
                <span className="hero-word-reveal inline-block will-change-transform">em</span>
              </span>
              <br className="hidden sm:inline" />
              <span className="inline-block overflow-hidden mr-3 pb-1">
                <span className="hero-word-reveal inline-block will-change-transform text-[#7357E8]">
                  experiências
                </span>
              </span>
              <span className="inline-block overflow-hidden pb-1">
                <span className="hero-word-reveal inline-block will-change-transform text-[#7357E8]">
                  digitais.
                </span>
              </span>
            </h1>

            {/* Subtítulo Solicitado */}
            <p
              ref={subtitleRef}
              className="text-base sm:text-lg text-[#171923]/75 leading-relaxed max-w-2xl mb-9 font-normal"
            >
              Desenvolvemos sites, experiências digitais e soluções inteligentes que ajudam marcas e negócios a se posicionarem melhor e crescerem.
            </p>

            {/* Grupo de Ações / Botões com cantos retangulares sutilmente arredondados */}
            <div
              ref={ctaGroupRef}
              className="flex flex-wrap items-center gap-3.5 mb-10"
            >
              {/* Botão Principal: Solicitar um projeto */}
              <a
                href={getWhatsAppUrl('Olá! Gostaria de solicitar um projeto com a Inova Soluções Digitais.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3.5 text-sm sm:text-base font-semibold rounded-lg text-white bg-[#111321] hover:bg-[#7357E8] transition-all duration-200 shadow-sm hover:shadow-md active:scale-98"
              >
                <span>Solicitar um projeto</span>
                <ArrowUpRight className="w-4 h-4 text-white/80" />
              </a>

              {/* Botão Secundário: Explorar projetos */}
              <a
                href="#portfolio"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold rounded-lg text-[#171923] bg-transparent hover:bg-black/5 border border-black/15 transition-all duration-200 active:scale-98"
              >
                <span>Explorar projetos</span>
                <ArrowDown className="w-4 h-4 text-[#171923]/60" />
              </a>
            </div>

            {/* Texto Auxiliar Editorial */}
            <div
              ref={auxiliaryRef}
              className="flex items-center gap-3 text-xs sm:text-sm text-[#171923]/65 font-medium pt-5 border-t border-black/8"
            >
              <span>Design estratégico</span>
              <span className="text-[#171923]/30">•</span>
              <span>Tecnologia</span>
              <span className="text-[#171923]/30">•</span>
              <span>Presença digital</span>
            </div>
          </div>

          {/* LADO DIREITO: Composição Editorial com Imagens Reais dos Projetos da Inova */}
          <div
            ref={visualRef}
            className="lg:col-span-5 relative flex items-center justify-center will-change-transform"
          >
            <div className="relative w-full max-w-[500px]">
              
              {/* Placa Studio Principal (Dark Contrast Element) */}
              <div className="relative rounded-2xl bg-[#111321] text-[#F7F7F5] p-5 sm:p-6 shadow-2xl border border-white/10 overflow-hidden">
                
                {/* Header da Placa Studio */}
                <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#7357E8]" />
                    <span className="text-xs uppercase tracking-wider font-semibold text-white/90">
                      Caso de Estudo & Soluções
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[#F7F7F5]/50">Inova 2026</span>
                </div>

                {/* Imagem Real de Projeto Web / BioSite Profissional */}
                <div className="relative rounded-xl overflow-hidden bg-black/40 border border-white/10 mb-4 aspect-[4/3] group">
                  <img
                    src="/assets/inova/biosite-mockup.jpeg"
                    alt="BioSite Profissional desenvolvido pela Inova Soluções Digitais"
                    className="w-full h-full object-contain bg-[#0E101D] transition-transform duration-500 group-hover:scale-105"
                    loading="eager"
                  />
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-[#111321]/90 backdrop-blur-md px-3 py-2 rounded-lg border border-white/10 flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-semibold text-white">BioSite & Presença Mobile</p>
                      <p className="text-[10px] text-white/60">Centralização ágil de canais</p>
                    </div>
                    <span className="text-[10px] text-[#22D3EE] font-medium">Design Exclusivo</span>
                  </div>
                </div>

                {/* Linha Editorial Inferior */}
                <div className="flex items-center justify-between pt-1 text-xs text-white/70">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#7357E8]" />
                    <span>Hardware NFC + Soluções Web</span>
                  </div>
                  <span className="text-white/40">Uberlândia • MG</span>
                </div>
              </div>

              {/* Card Flutuante Sobreposto 1: Plaquinha Personalizada Real (Claudia Ateliê) */}
              <div className="absolute -bottom-8 -left-5 sm:-left-8 w-44 sm:w-52 rounded-xl bg-white p-2.5 shadow-2xl border border-black/10 transition-transform duration-300 hover:-translate-y-1">
                <div className="relative rounded-lg overflow-hidden aspect-square bg-[#F5F4F0] mb-2 border border-black/5">
                  <img
                    src="/assets/inova/personalizada-claudia.jpeg"
                    alt="Plaquinha personalizada Claudia Ateliê por Inova Soluções"
                    className="w-full h-full object-contain"
                    loading="eager"
                  />
                </div>
                <div className="px-1">
                  <p className="text-[11px] font-bold text-[#171923] truncate">Claudia Ateliê</p>
                  <p className="text-[10px] text-[#171923]/60">Plaquinha NFC Personalizada</p>
                </div>
              </div>

              {/* Card Flutuante Sobreposto 2: Chaveiros NFC no Bolso */}
              <div className="hidden sm:block absolute -top-6 -right-6 w-40 rounded-xl bg-white p-2.5 shadow-2xl border border-black/10 transition-transform duration-300 hover:-translate-y-1">
                <div className="relative rounded-lg overflow-hidden aspect-square bg-[#F5F4F0] mb-1.5 border border-black/5">
                  <img
                    src="/assets/inova/chaveiros-nfc.jpeg"
                    alt="Chaveiro NFC Conectividade por Inova Soluções"
                    className="w-full h-full object-contain"
                    loading="eager"
                  />
                </div>
                <div className="px-1">
                  <p className="text-[10px] font-bold text-[#171923]">NFC no Bolso</p>
                  <p className="text-[9px] text-[#7357E8] font-medium">Toque & Compartilhe</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
