import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, QrCode, CreditCard, Share2, Wifi, Radio, AlertCircle, ArrowUpRight } from 'lucide-react';
import { NFC_FEATURES, getWhatsAppUrl } from '../data/inovaData';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ReactNode> = {
  Star: <Star className="w-5 h-5 text-[#7357E8]" />,
  QrCode: <QrCode className="w-5 h-5 text-[#7357E8]" />,
  CreditCard: <CreditCard className="w-5 h-5 text-[#7357E8]" />,
  Share2: <Share2 className="w-5 h-5 text-[#7357E8]" />,
  Wifi: <Wifi className="w-5 h-5 text-[#7357E8]" />,
  Radio: <Radio className="w-5 h-5 text-[#7357E8]" />,
};

export const NFCProducts: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

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

      if (featuresRef.current) {
        gsap.fromTo(
          featuresRef.current.children,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: featuresRef.current,
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
      id="produtos-nfc"
      ref={sectionRef}
      className="py-28 relative bg-[#F5F4F0] border-t border-black/8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div ref={headerRef} className="max-w-3xl mb-16 will-change-transform">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7357E8]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#171923]/70 font-semibold">
              TECNOLOGIA DE PONTO DE ATENDIMENTO
            </span>
          </div>
          <h2
            className="text-3xl sm:text-5xl font-extrabold text-[#171923] tracking-tight mb-5 font-display"
            style={{ textWrap: 'balance' }}
          >
            Mais praticidade. Conexão instantânea no balcão.
          </h2>
          <p className="text-base sm:text-lg text-[#171923]/70 leading-relaxed max-w-2xl">
            Materiais táteis desenvolvidos para balcões, mesas, vitrines e recepções que aproximam os clientes da sua empresa em apenas um toque de celular.
          </p>
        </div>

        {/* 6 Features Grid */}
        <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {NFC_FEATURES.map((item, index) => (
            <div
              key={index}
              className="group rounded-xl bg-white border border-black/8 p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md"
            >
              <div className="w-10 h-10 rounded-lg bg-[#F5F4F0] flex items-center justify-center mb-5 group-hover:bg-[#7357E8]/10 transition-colors">
                {iconMap[item.icon]}
              </div>
              <h3 className="text-lg font-bold text-[#171923] mb-2 group-hover:text-[#7357E8] transition-colors font-display">
                {item.title}
              </h3>
              <p className="text-sm text-[#171923]/70 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Objective Transparency Notice Box */}
        <div className="rounded-xl bg-white border border-black/8 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#7357E8] shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-[#171923]/80">
              <span className="font-semibold text-[#171923]">Esclarecimento de compatibilidade:</span> A tecnologia por aproximação (NFC) depende da compatibilidade nativa do smartphone do cliente. Dispositivos sem leitor NFC efetuam a leitura normalmente através do QR Code integrado em alta nitidez.
            </div>
          </div>
          <a
            href={getWhatsAppUrl('Olá! Gostaria de consultar detalhes e valores de plaquinhas NFC e QR Code.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold text-white bg-[#111321] hover:bg-[#7357E8] shadow-sm whitespace-nowrap active:scale-98 transition-all shrink-0 self-end sm:self-auto"
          >
            <span>Consultar Plaquinhas NFC</span>
            <ArrowUpRight className="w-4 h-4 text-white/80" />
          </a>
        </div>

      </div>
    </section>
  );
};
