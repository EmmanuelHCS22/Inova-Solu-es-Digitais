import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowUpRight,
  Radio,
  Smartphone,
  Globe,
  Calendar,
  MessageCircle,
  Layers,
} from 'lucide-react';
import { SOLUTIONS_DATA, getWhatsAppUrl } from '../data/inovaData';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ReactNode> = {
  Radio: <Radio className="w-4 h-4 sm:w-5 sm:h-5 text-[#8B5CF6]" />,
  Smartphone: <Smartphone className="w-4 h-4 sm:w-5 sm:h-5 text-[#8B5CF6]" />,
  Globe: <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-[#8B5CF6]" />,
  Calendar: <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-[#8B5CF6]" />,
};

const PILLAR_INSIGHTS: Record<string, { kicker: string; format: string; highlight: string }> = {
  'plaquinhas-nfc': {
    kicker: 'Plaquinhas NFC e QR Code',
    format: 'Acrílico com base em L e microchip integrado',
    highlight: 'Aproximação instantânea e QR Code para avaliações no Google, redes sociais, Pix e Wi-Fi no balcão.',
  },
  'chaveiros-cartoes': {
    kicker: 'Chaveiros 3D e Cartões NFC',
    format: 'Impressão 3D de alta precisão e cartões inteligentes',
    highlight: 'Chaveiros duráveis em manufatura aditiva 3D e cartões para compartilhar contatos e canais por aproximação.',
  },
  'presenca-digital': {
    kicker: 'Presença Digital',
    format: 'Google Meu Negócio, BioSite, Catálogo e Cardápio',
    highlight: 'Organização do perfil no Google, páginas unificadas para link da bio e catálogos interativos.',
  },
  'agendamento-sites': {
    kicker: 'Sites Profissionais & Agendamento',
    format: 'Barbearias, cabeleireiras, lash, nail e estética',
    highlight: 'Seus clientes agendam sozinhos pelo celular em poucos toques, reduzindo mensagens no WhatsApp e faltas.',
  },
};

export const Solutions: React.FC = () => {
  const [activePillar, setActivePillar] = useState<string>('plaquinhas-nfc');
  const [isFading, setIsFading] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
          },
        }
      );

      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 82%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handlePillarChange = (id: string) => {
    if (id === activePillar) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setActivePillar(id);
      return;
    }
    setIsFading(true);
    setTimeout(() => {
      setActivePillar(id);
      setIsFading(false);
    }, 120);
  };

  const selectedItem = SOLUTIONS_DATA.find((item) => item.id === activePillar) || SOLUTIONS_DATA[0];
  const selectedInsight = PILLAR_INSIGHTS[selectedItem.id] || PILLAR_INSIGHTS['plaquinhas-nfc'];

  return (
    <section
      id="solucoes"
      ref={sectionRef}
      className="py-20 sm:py-28 lg:py-32 relative bg-[#F5F4F0] border-t border-black/10 text-[#171923] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Editorial sem Eyebrows ou Badges Proibidos */}
        <div ref={headerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-12 sm:mb-16 lg:mb-20">
          <div className="lg:col-span-7">
            <h2
              className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#171923] tracking-tight leading-[1.12] font-display"
              style={{ textWrap: 'balance' }}
            >
              Tecnologia NFC e soluções digitais para o seu negócio.
            </h2>
          </div>

          <div className="lg:col-span-5 pb-1">
            <p className="text-sm sm:text-base lg:text-lg text-[#171923]/80 leading-relaxed font-normal mb-4">
              Conectamos o atendimento físico à presença digital através de produtos que facilitam a interação e ferramentas que organizam atendimentos e divulgação.
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#171923]/75 pt-3 border-t border-black/10 font-medium">
              <span>Plaquinhas & Chaveiros 3D</span>
              <span aria-hidden="true" className="text-black/30">·</span>
              <span>Presença Digital</span>
              <span aria-hidden="true" className="text-black/30">·</span>
              <span>Agendamento Online</span>
            </div>
          </div>
        </div>

        {/* Layout Editorial Assimétrico de Navegação entre Categorias */}
        <div ref={contentRef} className="border-t border-black/15 pt-6 sm:pt-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
            
            {/* Coluna de Seletores: 4 Categorias Oficiais */}
            <div className="lg:col-span-5">
              <div className="pb-3 mb-3 border-b border-black/10 flex items-center justify-between text-xs tracking-wider text-[#171923]/70 font-semibold uppercase">
                <span>Categorias de Soluções</span>
                <span className="hidden sm:inline">4 Áreas Principais</span>
              </div>

              <div className="grid grid-cols-1 gap-2.5 sm:gap-3">
                {SOLUTIONS_DATA.map((item, idx) => {
                  const isActive = item.id === activePillar;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handlePillarChange(item.id)}
                      className={`text-left p-4 sm:p-5 rounded-xl transition-all duration-200 border flex items-center justify-between group min-h-[72px] ${
                        isActive
                          ? 'bg-[#111321] text-white border-[#111321] shadow-md shadow-black/15'
                          : 'bg-white/80 hover:bg-white text-[#171923] border-black/10 hover:border-black/20'
                      }`}
                    >
                      <div className="flex items-center gap-3.5 pr-2">
                        <div
                          className={`p-2.5 rounded-lg shrink-0 transition-colors ${
                            isActive
                              ? 'bg-white/10 text-[#8B5CF6]'
                              : 'bg-black/5 text-[#171923]/60 group-hover:text-[#8B5CF6] group-hover:bg-[#8B5CF6]/10'
                          }`}
                        >
                          {iconMap[item.iconName]}
                        </div>
                        <div>
                          <h3 className="text-sm sm:text-base font-bold font-display tracking-tight leading-snug">
                            {item.title}
                          </h3>
                          <p
                            className={`text-xs mt-0.5 line-clamp-1 ${
                              isActive ? 'text-white/60' : 'text-[#171923]/60'
                            }`}
                          >
                            {PILLAR_INSIGHTS[item.id]?.format || item.description}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`text-xs font-semibold shrink-0 ${
                          isActive ? 'text-[#8B5CF6]' : 'text-[#171923]/40 group-hover:text-[#8B5CF6]'
                        }`}
                      >
                        {isActive ? '●' : '→'}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Informação prática */}
              <div className="p-4 rounded-xl bg-white/70 border border-black/10 text-xs text-[#171923]/75 flex items-start gap-3 mt-4">
                <Layers className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
                <p>
                  Atendemos pedidos individuais de produtos físicos ou pacotes completos com soluções digitais integradas.
                </p>
              </div>
            </div>

            {/* Coluna Direita: Detalhamento da Categoria Selecionada */}
            <div
              className="lg:col-span-7 bg-white rounded-2xl border border-black/10 p-5 sm:p-8 lg:p-10 shadow-sm transition-opacity duration-200"
              style={{ opacity: isFading ? 0.4 : 1 }}
            >
              {/* Header da Categoria */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-black/10">
                <div>
                  <span className="text-xs font-semibold text-[#8B5CF6] uppercase tracking-wider block mb-1">
                    {selectedInsight.kicker}
                  </span>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#171923] font-display tracking-tight">
                    {selectedItem.title}
                  </h3>
                </div>
                <div className="text-xs text-[#171923]/75 bg-[#F5F4F0] px-3 py-1.5 rounded-lg border border-black/5 shrink-0 self-start sm:self-auto font-medium">
                  {selectedInsight.format}
                </div>
              </div>

              {/* Descrição e Benefício */}
              <div className="py-5 space-y-2.5">
                <p className="text-sm sm:text-base text-[#171923]/80 leading-relaxed font-normal">
                  {selectedItem.description}
                </p>
                <p className="text-xs sm:text-sm text-[#7357E8] font-semibold leading-relaxed">
                  {selectedInsight.highlight}
                </p>
              </div>

              {/* Recursos Oficiais da Categoria */}
              <div className="pt-5 border-t border-black/10 mb-6">
                <div className="flex items-center justify-between mb-3.5">
                  <span className="text-xs uppercase tracking-wider text-[#171923]/60 font-semibold">
                    Recursos e Modelos Inclusos
                  </span>
                  <span className="text-xs text-[#171923]/50">
                    {selectedItem.services.length} itens oficiais
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedItem.services.map((srv, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-3 sm:p-3.5 rounded-lg bg-[#F5F4F0] border border-black/5 flex items-start gap-3 transition-colors hover:border-[#8B5CF6]/30"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] shrink-0 mt-1.5" />
                      <span className="text-xs sm:text-sm font-medium text-[#171923]/85 leading-snug">
                        {srv}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Barra de Ações */}
              <div className="pt-5 border-t border-black/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <a
                  href={selectedItem.targetAnchor}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#111321] text-white hover:bg-[#8B5CF6] transition-colors duration-200 text-xs sm:text-sm font-semibold shadow-sm active:scale-98 text-center min-h-[44px]"
                >
                  <span>{selectedItem.buttonText}</span>
                  <ArrowUpRight className="w-4 h-4 text-white/80 shrink-0" />
                </a>

                <a
                  href={getWhatsAppUrl(selectedItem.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-600/10 hover:bg-emerald-600/15 text-emerald-800 border border-emerald-600/20 transition-colors text-xs sm:text-sm font-semibold text-center min-h-[44px]"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Pedir orçamento no WhatsApp</span>
                </a>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
