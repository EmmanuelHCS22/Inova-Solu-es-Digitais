import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { getWhatsAppUrl } from '../data/inovaData';
import { HeroPlaque3D } from './HeroPlaque3D';

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
      className="relative min-h-[92vh] flex items-center pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20 overflow-hidden bg-[#0A0F2E]"
    >
      {/* Luz ambiente e gradiente cinematográfico de profundidade */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_80%_60%_at_70%_50%,rgba(6,182,212,0.12)_0%,rgba(139,92,246,0.14)_40%,transparent_75%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none -z-10 opacity-20 [background-image:radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:32px_32px]"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-14 items-center">
          
          {/* LADO ESQUERDO: Tipografia Minimalista e Hierarquia Focada */}
          <div ref={leftColRef} className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center text-left">
            
            {/* Identificador / Kicker */}
            <div ref={kickerRef} className="flex items-center gap-2.5 mb-5">
              <span className="w-2 h-2 rounded-full bg-[#06B6D4] inline-block shadow-[0_0_10px_rgba(6,182,212,0.85)]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#06B6D4] font-bold font-mono">
                PLAQUINHAS NFC
              </span>
              <span className="text-white/20">·</span>
              <span className="text-xs text-white/50 font-medium">Inova Soluções Digitais</span>
            </div>

            {/* Título Principal */}
            <h1 className="text-[clamp(2.35rem,4.4vw,4.25rem)] font-extrabold text-white tracking-tight leading-[1.06] mb-6 font-display">
              <span className="block overflow-hidden pb-1">
                <span className="hero-line-reveal block will-change-transform">
                  Sua marca mais perto
                </span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="hero-line-reveal block will-change-transform bg-gradient-to-r from-white via-[#E0E7FF] to-[#8B5CF6] bg-clip-text text-transparent">
                  dos seus clientes.
                </span>
              </span>
            </h1>

            {/* Descrição Curta */}
            <p
              ref={subtitleRef}
              className="text-base sm:text-lg lg:text-xl text-white/75 leading-relaxed max-w-xl mb-8 font-normal"
            >
              Facilite avaliações no Google e conexões com apenas um toque.
            </p>

            {/* Grupo de Ações */}
            <div
              ref={ctaGroupRef}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-9"
            >
              {/* CTA Principal */}
              <a
                href={getWhatsAppUrl('Olá! Gostaria de encomendar minha plaquinha NFC de avaliação do Google.')}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 sm:py-4 text-base font-semibold rounded-lg text-white bg-gradient-to-r from-[#8B5CF6] to-[#7357E8] hover:from-[#7C3AED] hover:to-[#6D28D9] transition-all duration-200 shadow-lg shadow-[#8B5CF6]/30 hover:shadow-[#8B5CF6]/50 active:scale-98"
              >
                <span>Quero minha plaquinha</span>
                <ArrowUpRight className="w-4 h-4 text-white/90 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </a>

              {/* CTA Secundário */}
              <a
                href="#catalogo-padrao"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:py-4 text-base font-semibold rounded-lg text-white/90 bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/30 transition-all duration-200 active:scale-98"
              >
                <span>Conhecer o produto</span>
                <ArrowDown className="w-4 h-4 text-white/60" />
              </a>
            </div>

            {/* Linha Inferior com Pilares e Tecnologias */}
            <div
              ref={auxiliaryRef}
              className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-white/60 font-medium pt-5 border-t border-white/10"
            >
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4]" />
                Aproximação NFC sem bateria
              </span>
              <span className="text-white/20">•</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />
                Acrílico 10×15 cm base em L
              </span>
              <span className="text-white/20">•</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                QR Code sob medida
              </span>
            </div>
          </div>

          {/* LADO DIREITO: Protagonismo Total do Produto 3D Suspenso no Espaço */}
          <div
            ref={visualRef}
            className="lg:col-span-6 xl:col-span-6 relative flex flex-col items-center justify-center will-change-transform mt-6 lg:mt-0"
          >
            {/* Halo de luz cinematográfico ao redor da peça suspensa */}
            <div
              aria-hidden="true"
              className="absolute w-[320px] sm:w-[440px] lg:w-[480px] h-[320px] sm:h-[440px] lg:h-[480px] rounded-full pointer-events-none -z-10 blur-3xl opacity-35"
              style={{
                background: 'radial-gradient(circle, rgba(6, 182, 212, 0.35) 0%, rgba(139, 92, 246, 0.25) 45%, transparent 70%)',
              }}
            />

            {/* Modelo 3D da Plaquinha Suspenso sem Moldura ou Fundo Branco */}
            <div className="w-full max-w-[500px]">
              <HeroPlaque3D />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
