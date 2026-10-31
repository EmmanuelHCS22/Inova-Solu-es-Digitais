import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Star,
  QrCode,
  CreditCard,
  Share2,
  Wifi,
  Radio,
  AlertCircle,
  ArrowUpRight,
  Zap,
  Check,
} from 'lucide-react';
import { NFC_FEATURES, getWhatsAppUrl } from '../data/inovaData';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ReactNode> = {
  Star: <Star className="w-5 h-5 text-[#8B5CF6]" />,
  QrCode: <QrCode className="w-5 h-5 text-[#8B5CF6]" />,
  CreditCard: <CreditCard className="w-5 h-5 text-[#8B5CF6]" />,
  Share2: <Share2 className="w-5 h-5 text-[#8B5CF6]" />,
  Wifi: <Wifi className="w-5 h-5 text-[#8B5CF6]" />,
  Radio: <Radio className="w-5 h-5 text-[#8B5CF6]" />,
};

export const NFCProducts: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftColRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: leftColRef.current,
            start: 'top 85%',
          },
        }
      );

      if (listRef.current) {
        gsap.fromTo(
          listRef.current.children,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: listRef.current,
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
      id="produtos-nfc"
      ref={sectionRef}
      className="py-20 sm:py-28 lg:py-32 relative bg-[#F5F4F0] border-t border-black/10 text-[#171923] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Layout Assimétrico Split-Screen */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-16">
          
          {/* Coluna Esquerda: Narrativa & Posicionamento */}
          <div ref={leftColRef} className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#7357E8] font-semibold block mb-3">
                03 / TECNOLOGIA DE BALCÃO & CONECTIVIDADE
              </span>

              <h2
                className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#171923] tracking-tight mb-4 font-display leading-[1.12]"
                style={{ textWrap: 'balance' }}
              >
                Mais praticidade. Conexão instantânea no balcão.
              </h2>

              <p className="text-sm sm:text-base text-[#171923]/80 leading-relaxed mb-6 font-normal">
                Materiais táteis desenvolvidos para balcões, mesas, vitrines e recepções que aproximam os clientes da sua empresa em apenas um toque de celular, sem burocracia ou digitação.
              </p>

              {/* Bloco de Engenharia Tátil: Card Escuro de Contraste */}
              <div className="rounded-2xl bg-[#111321] text-white p-5 sm:p-7 mb-8 border border-white/10 shadow-xl">
                <div className="flex items-center gap-2.5 mb-2.5">
                  <Zap className="w-4 h-4 text-[#8B5CF6]" />
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-white/90">
                    Aproximação Sem Aplicativo
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-white/75 leading-relaxed font-normal mb-4">
                  Compatível nativamente com iPhone e Android. A tecnologia NFC direciona o cliente imediatamente ao destino configurado, complementada pelo QR Code de alta precisão.
                </p>

                <div className="pt-3 border-t border-white/10 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono text-white/60">
                  <span className="flex items-center gap-1.5 text-white/80">
                    <Check className="w-3.5 h-3.5 text-[#8B5CF6]" /> Sem necessidade de app
                  </span>
                  <span className="flex items-center gap-1.5 text-white/80">
                    <Check className="w-3.5 h-3.5 text-[#8B5CF6]" /> Leitura em 1 segundo
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href={getWhatsAppUrl('Olá! Gostaria de consultar detalhes e valores de plaquinhas NFC e QR Code.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#111321] hover:bg-[#8B5CF6] transition-all duration-200 shadow-sm active:scale-98 text-center min-h-[44px]"
              >
                <span>Consultar Plaquinhas NFC</span>
                <ArrowUpRight className="w-4 h-4 text-white/80 shrink-0" />
              </a>

              <a
                href="#catalogo-padrao"
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl text-xs sm:text-sm font-semibold text-[#171923] hover:text-[#8B5CF6] hover:bg-black/5 transition-colors text-center min-h-[44px]"
              >
                <span>Explorar Modelos ↓</span>
              </a>
            </div>
          </div>

          {/* Coluna Direita: Lista Editorial de Aplicações (Zero grades repetitivas) */}
          <div ref={listRef} className="lg:col-span-7 divide-y divide-black/10 border-t border-b border-black/10">
            {NFC_FEATURES.map((item, index) => (
              <div
                key={index}
                className="py-4 sm:py-5 flex items-start gap-4 sm:gap-5 group transition-colors duration-200 hover:bg-black/[0.015]"
              >
                <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center shrink-0 mt-0.5 text-[#8B5CF6] group-hover:bg-[#8B5CF6]/10 transition-colors">
                  {iconMap[item.icon]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="text-sm sm:text-base font-bold text-[#171923] group-hover:text-[#8B5CF6] transition-colors font-display">
                      {item.title}
                    </h3>
                    <span className="text-xs font-mono tabular-nums text-[#171923]/40">
                      0{index + 1}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#171923]/70 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Esclarecimento Técnico com Tipografia Editorial */}
        <div className="pt-6 border-t border-black/10 flex items-start gap-3 text-xs sm:text-sm text-[#171923]/75 bg-white/60 p-4 rounded-xl border border-black/5">
          <AlertCircle className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
          <p>
            <strong className="text-[#171923] font-semibold">Esclarecimento de compatibilidade:</strong> A tecnologia por aproximação (NFC) depende do leitor nativo do smartphone do cliente. Dispositivos sem NFC efetuam a leitura normalmente através do QR Code integrado em alta nitidez.
          </p>
        </div>

      </div>
    </section>
  );
};
