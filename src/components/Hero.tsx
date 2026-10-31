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
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const auxiliaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set('.hero-line-reveal', { yPercent: 0, opacity: 1 });
        gsap.set(
          [subtitleRef.current, ctaGroupRef.current, auxiliaryRef.current, visualRef.current],
          { opacity: 1, y: 0 }
        );
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // 1. Headline: 2 linhas sólidas reveladas
      tl.fromTo(
        '.hero-line-reveal',
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.12,
          ease: 'power4.out',
        }
      )
      // 2. Subtítulo contextual oficial
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.55 },
        '-=0.4'
      )
      // 3. Grupo de CTAs
      .fromTo(
        ctaGroupRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5 },
        '-=0.35'
      )
      // 4. Síntese do ecossistema físico-digital
      .fromTo(
        auxiliaryRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.45 },
        '-=0.25'
      )
      // 5. Entrada da vitrine do modelo 3D
      .fromTo(
        visualRef.current,
        { opacity: 0, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 0.9, ease: 'power3.out' },
        '-=0.6'
      );

      // Parallax sutil na rolagem da vitrine 3D
      if (containerRef.current && visualRef.current) {
        gsap.to(visualRef.current, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
          yPercent: -4,
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
      className="relative min-h-[92vh] lg:min-h-[94vh] flex items-center pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20 lg:pb-24 overflow-hidden bg-[#0A0F2E] text-white"
    >
      {/* Iluminação cinematográfica controlada com a paleta oficial */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_75%_55%_at_65%_45%,rgba(34,211,238,0.08)_0%,rgba(139,92,246,0.11)_40%,transparent_72%)]"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none -z-10 bg-gradient-to-b from-transparent to-[#0A0F2E]/80"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-center">
          
          {/* LADO ESQUERDO: Tipografia e Mensagem Oficial */}
          <div ref={leftColRef} className="lg:col-span-7 xl:col-span-6 flex flex-col justify-center text-left">
            
            {/* Título Principal Oficial — 2 Linhas */}
            <h1 className="text-[clamp(2.35rem,4.4vw,4.25rem)] font-extrabold text-white tracking-tight leading-[1.08] mb-6 font-display">
              <span className="block overflow-hidden pb-1">
                <span className="hero-line-reveal block will-change-transform">
                  Conectamos seu negócio
                </span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="hero-line-reveal block will-change-transform text-[#F7F8FC]">
                  ao mundo digital.
                </span>
              </span>
            </h1>

            {/* Subtítulo Oficial da Inova */}
            <p
              ref={subtitleRef}
              className="text-base sm:text-lg lg:text-xl text-[#F7F8FC]/80 leading-relaxed max-w-xl mb-8 font-normal"
            >
              Plaquinhas NFC, produtos personalizados e soluções digitais que facilitam a conexão com seus clientes e fortalecem a presença do seu negócio.
            </p>

            {/* Grupo de Ações (CTAs) */}
            <div
              ref={ctaGroupRef}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8 sm:mb-10"
            >
              {/* CTA Principal: Solicitar Orçamento */}
              <a
                href={getWhatsAppUrl('Olá! Estou no site da Inova Soluções Digitais e gostaria de solicitar um orçamento.')}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 sm:py-4 text-base font-semibold rounded-xl text-white bg-[#8B5CF6] hover:bg-[#7C3AED] transition-[background-color,transform,box-shadow] duration-200 shadow-md shadow-[#8B5CF6]/25 hover:shadow-lg hover:shadow-[#8B5CF6]/40 active:scale-98"
              >
                <span>Solicitar orçamento</span>
                <ArrowUpRight className="w-4 h-4 text-white/90 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </a>

              {/* CTA Secundário: Conhecer nossas soluções */}
              <a
                href="#solucoes"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:py-4 text-base font-semibold rounded-xl text-white/90 bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/30 transition-[background-color,border-color,transform] duration-200 active:scale-98"
              >
                <span>Conhecer nossas soluções</span>
                <ArrowDown className="w-4 h-4 text-white/60" />
              </a>
            </div>

            {/* Síntese do Ecossistema Integrado */}
            <div
              ref={auxiliaryRef}
              className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm text-white/65 font-medium pt-3"
            >
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />
                Plaquinhas NFC & QR Code
              </span>
              <span className="text-white/20 hidden sm:inline">·</span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE]" />
                Chaveiros 3D & Cartões NFC
              </span>
              <span className="text-white/20 hidden sm:inline">·</span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                Presença Digital & Agendamento
              </span>
            </div>
          </div>

          {/* LADO DIREITO: Protagonismo Total do Modelo 3D Real da Plaquinha Google */}
          <div
            ref={visualRef}
            className="lg:col-span-5 xl:col-span-6 relative flex flex-col items-center justify-center will-change-transform mt-4 lg:mt-0"
          >
            {/* Brilho de profundidade cinematográfico suave atrás do produto */}
            <div
              aria-hidden="true"
              className="absolute w-[280px] sm:w-[380px] lg:w-[440px] h-[280px] sm:h-[380px] lg:h-[440px] rounded-full pointer-events-none -z-10 blur-2xl opacity-30"
              style={{
                background: 'radial-gradient(circle, rgba(34, 211, 238, 0.28) 0%, rgba(139, 92, 246, 0.20) 45%, transparent 70%)',
              }}
            />

            {/* Modelo 3D Autêntico Three.js com o arquivo GLB real */}
            <div className="w-full max-w-[460px] lg:max-w-[500px]">
              <HeroPlaque3D />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
