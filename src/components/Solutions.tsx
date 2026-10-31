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

// Strategic studio commentary for each pillar to enhance editorial value
const PILLAR_INSIGHTS: Record<string, { kicker: string; leadTime: string; highlight: string }> = {
  'plaquinhas-nfc': {
    kicker: 'Hardware de Balcão & NFC',
    leadTime: 'Acrílico com base em L e chip integrado',
    highlight: 'Plaquinhas que facilitam avaliações no Google, pagamentos Pix e contato no balcão.',
  },
  'chaveiros-cartoes': {
    kicker: 'Impressão 3D & Cartões NFC',
    leadTime: 'Fabricação aditiva 3D e microchip NFC',
    highlight: 'Chaveiros duráveis e cartões inteligentes para compartilhar dados comerciais em 1 toque.',
  },
  'presenca-digital': {
    kicker: 'Centralização de Canais & Google',
    leadTime: 'BioSite mobile e perfil comercial estruturado',
    highlight: 'BioSite com todos os seus links e otimização para atrair clientes locais no Google.',
  },
  'agendamento-sites': {
    kicker: 'Agendamento Online & Serviços',
    leadTime: 'Especial para barbearias, lash, nail e estética',
    highlight: 'Cliente agenda pelo celular em 3 cliques, reduzindo tempo no WhatsApp e diminuindo faltas.',
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
        
        {/* Header Editorial Assimétrico com Visão de Estúdio */}
        <div ref={headerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-12 sm:mb-16 lg:mb-20">
          <div className="lg:col-span-7">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#7357E8] font-semibold block mb-3">
              01 / PILARES DE ATUAÇÃO
            </span>
            <h2
              className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#171923] tracking-tight leading-[1.12] font-display"
              style={{ textWrap: 'balance' }}
            >
              Tecnologia NFC e soluções digitais integradas.
            </h2>
          </div>

          <div className="lg:col-span-5 pb-1">
            <p className="text-sm sm:text-base lg:text-lg text-[#171923]/80 leading-relaxed font-normal mb-4">
              Soluções práticas que conectam o atendimento presencial ao mundo online, facilitando conexões, pagamentos e agendamentos para o seu negócio.
            </p>
            {/* Metadados institucionais com legibilidade elevada para ~75% de opacidade */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono text-[#171923]/75 pt-3 border-t border-black/10">
              <span className="font-semibold text-[#171923]/85">Metodologia Inova</span>
              <span aria-hidden="true" className="text-black/30">·</span>
              <span>Uberlândia, MG & Todo o Brasil</span>
              <span aria-hidden="true" className="text-black/30">·</span>
              <span>Atendimento Consultivo</span>
            </div>
          </div>
        </div>

        {/* Layout Editorial Assimétrico */}
        <div ref={contentRef} className="border-t border-black/15 pt-6 sm:pt-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
            
            {/* Coluna de Seletores: 2x2 compacta em telas pequenas / lista vertical em desktop (lg) */}
            <div className="lg:col-span-5">
              <div className="pb-3 mb-3 border-b border-black/10 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#171923]/60">
                <span>Diretório de Serviços</span>
                <span className="hidden sm:inline">04 Áreas Estratégicas</span>
              </div>

              {/* Grade 2x2 responsiva para mobile/tablet (reduz altura pela metade) e vertical no desktop */}
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-2.5 sm:gap-3">
                {SOLUTIONS_DATA.map((item, idx) => {
                  const isActive = item.id === activePillar;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handlePillarChange(item.id)}
                      className={`text-left p-3 sm:p-4 lg:p-5 rounded-xl transition-all duration-200 border flex flex-col lg:flex-row lg:items-center justify-between group min-h-[72px] lg:min-h-0 ${
                        isActive
                          ? 'bg-[#111321] text-white border-[#111321] shadow-md shadow-black/15'
                          : 'bg-white/80 hover:bg-white text-[#171923] border-black/10 hover:border-black/20'
                      }`}
                    >
                      <div className="flex items-start lg:items-center gap-2.5 sm:gap-4 pr-1 lg:pr-3">
                        <span
                          className={`text-[11px] sm:text-xs font-mono tabular-nums tracking-wider ${
                            isActive ? 'text-[#8B5CF6] font-bold' : 'text-[#171923]/50 group-hover:text-[#8B5CF6]'
                          }`}
                        >
                          0{idx + 1}
                        </span>
                        <div>
                          <h3 className="text-xs sm:text-sm lg:text-base font-bold font-display tracking-tight leading-snug">
                            {item.title}
                          </h3>
                          <p
                            className={`hidden lg:block text-xs mt-0.5 line-clamp-1 ${
                              isActive ? 'text-white/60' : 'text-[#171923]/60'
                            }`}
                          >
                            {PILLAR_INSIGHTS[item.id]?.kicker || item.description}
                          </p>
                        </div>
                      </div>

                      <div
                        className={`hidden lg:flex p-2 rounded-lg shrink-0 transition-colors ${
                          isActive
                            ? 'bg-white/10 text-[#8B5CF6]'
                            : 'bg-black/5 text-[#171923]/60 group-hover:text-[#8B5CF6] group-hover:bg-[#8B5CF6]/10'
                        }`}
                      >
                        {iconMap[item.iconName]}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Nota de rodapé da coluna de navegação */}
              <div className="hidden lg:flex p-4 rounded-xl bg-white/70 border border-black/10 text-xs text-[#171923]/75 items-start gap-3 mt-4">
                <Layers className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
                <p>
                  Projetos modulares: você pode contratar serviços pontuais ou pacotes unificados de presença e tecnologia.
                </p>
              </div>
            </div>

            {/* Coluna Direita (Canvas de Detalhes da Solução Ativa com Transição Suave) */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-black/10 p-5 sm:p-8 lg:p-10 shadow-sm transition-opacity duration-200" style={{ opacity: isFading ? 0.4 : 1 }}>
              
              {/* Header da Solução */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-black/10">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#7357E8] font-semibold block mb-1">
                    {selectedInsight.kicker}
                  </span>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#171923] font-display tracking-tight">
                    {selectedItem.title}
                  </h3>
                </div>
                <div className="text-xs font-mono text-[#171923]/75 bg-[#F5F4F0] px-3 py-1.5 rounded-lg border border-black/5 shrink-0 self-start sm:self-auto">
                  {selectedInsight.leadTime}
                </div>
              </div>

              {/* Descrição Principal e Destaque Editorial */}
              <div className="py-5 space-y-2.5">
                <p className="text-sm sm:text-base text-[#171923]/80 leading-relaxed font-normal">
                  {selectedItem.description}
                </p>
                <p className="text-xs sm:text-sm text-[#7357E8] font-semibold leading-relaxed">
                  {selectedInsight.highlight}
                </p>
              </div>

              {/* Entregáveis & Aplicações: Formatação Editorial Limpa (Zero Pills) */}
              <div className="pt-5 border-t border-black/10 mb-6">
                <div className="flex items-center justify-between mb-3.5">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#171923]/60">
                    O que está incluso nesta entrega
                  </span>
                  <span className="text-xs font-mono text-[#171923]/50">
                    {selectedItem.services.length} entregáveis
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedItem.services.map((srv, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-3 sm:p-3.5 rounded-lg bg-[#F5F4F0] border border-black/5 flex items-start gap-3 transition-colors hover:border-[#8B5CF6]/30"
                    >
                      <span className="text-xs font-mono font-bold text-[#8B5CF6] shrink-0 mt-0.5">
                        0{sIdx + 1}
                      </span>
                      <span className="text-xs sm:text-sm font-medium text-[#171923]/85 leading-snug">
                        {srv}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Barra de Ações Responsiva (Sem quebras rígidas no mobile) */}
              <div className="pt-5 border-t border-black/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <a
                  href={selectedItem.targetAnchor}
                  className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3 rounded-xl bg-[#111321] text-white hover:bg-[#8B5CF6] transition-colors duration-200 text-xs sm:text-sm font-semibold shadow-sm active:scale-98 text-center min-h-[44px]"
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
