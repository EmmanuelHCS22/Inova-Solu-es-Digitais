import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowUpRight,
  Calendar,
  Check,
  Maximize2,
  Search,
  Smartphone,
  Store,
  Sparkles,
  Monitor,
  Tablet,
  Clock,
  Layers,
  ChevronRight,
} from 'lucide-react';
import {
  PRODUCT_EXPERIENCE_CATALOG,
  CATALOG_CATEGORIES,
  ProductExperienceItem,
  getWhatsAppUrl,
} from '../data/inovaData';
import { CoverflowCarousel } from './CoverflowCarousel';

gsap.registerPlugin(ScrollTrigger);

interface SolutionsProps {
  onOpenModal: (image: {
    src: string;
    name: string;
    category?: string;
    description?: string;
    alt: string;
  }) => void;
}

type SolutionCategory = 'plaquinhas' | 'chaveiros-cartoes' | 'presenca-digital' | 'sites-agendamento';

interface SchedulingNiche {
  id: string;
  name: string;
  tagline: string;
  focus: string;
  benefit: string;
}

const SCHEDULING_NICHES: SchedulingNiche[] = [
  {
    id: 'barbearias',
    name: 'Barbearias',
    tagline: 'Corte, barba e escolha de barbeiro',
    focus: 'Sem filas no balcão e sem interromper os cortes para responder mensagens.',
    benefit: 'Agendamento rápido em 3 cliques',
  },
  {
    id: 'cabeleireiras',
    name: 'Cabeleireiras & Salões',
    tagline: 'Mechas, tratamentos e escovas',
    focus: 'Duração estimada por procedimento para evitar atrasos e sobreposição de horários.',
    benefit: 'Agenda ativa 24 horas',
  },
  {
    id: 'lash-designer',
    name: 'Lash Designers',
    tagline: 'Extensão de cílios e manutenção',
    focus: 'Apresentação de resultados e horários disponíveis sem parar o atendimento.',
    benefit: 'Zero interrupções na aplicação',
  },
  {
    id: 'nail-designer',
    name: 'Nail Designers',
    tagline: 'Alongamento em fibra e esmaltação',
    focus: 'Catálogo de procedimentos com tabela de valores clara e horários transparentes.',
    benefit: 'Fim da troca infinita de mensagens',
  },
  {
    id: 'estetica-beleza',
    name: 'Profissionais da Estética',
    tagline: 'Facial, corporal e protocolos',
    focus: 'Gestão pontual para clínicas e biomédicas com confirmação de presença.',
    benefit: 'Redução expressiva de faltas',
  },
];

const KEYCHAIN_MODELS = [
  {
    id: 'instagram',
    name: 'Chaveiro Instagram',
    description: 'Aproximação instantânea para abrir seu perfil comercial no Instagram com 1 toque.',
  },
  {
    id: 'whatsapp',
    name: 'Chaveiro WhatsApp',
    description: 'Inicia uma conversa direta com seu número de atendimento sem precisar salvar contato.',
  },
  {
    id: 'google',
    name: 'Chaveiro Google Avaliações',
    description: 'Leva o cliente direto para a tela de avaliação 5 estrelas do seu negócio.',
  },
  {
    id: 'nfc-symbol',
    name: 'Chaveiro com Símbolo NFC',
    description: 'Design minimalista universal com ícone de onda de aproximação gravado em relevo sólido.',
  },
  {
    id: 'personalizado',
    name: 'Chaveiros com Logotipo Personalizado',
    description: 'Produzido em manufatura aditiva 3D com a geometria ou emblema da sua marca.',
  },
  {
    id: 'cartao-nfc',
    name: 'Cartão de Visita NFC Inteligente',
    description: 'Cartão executivo com aproximação NFC e QR Code para networking moderno e trocas comerciais.',
  },
];

export const Solutions: React.FC<SolutionsProps> = ({ onOpenModal }) => {
  const [activeCategory, setActiveCategory] = useState<SolutionCategory>('plaquinhas');

  // Plaquinhas state
  const [plaquesCollectionTab, setPlaquesCollectionTab] = useState<'todos' | 'padrao' | 'personalizada'>('todos');
  const [plaquesSubCategory, setPlaquesSubCategory] = useState<string>('todos');
  const [currentPlaqueIndex, setCurrentPlaqueIndex] = useState<number>(0);

  // Chaveiros state
  const [selectedKeychainModel, setSelectedKeychainModel] = useState<string>('instagram');

  // Presença Digital state (Apenas Google e BioSite - Cartão Virtual unificado ao BioSite)
  const [digitalTab, setDigitalTab] = useState<'google' | 'biosite'>('google');

  // DOM Refs
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const navTabsRef = useRef<HTMLDivElement>(null);
  const contentAreaRef = useRef<HTMLDivElement>(null);

  // Plaquinhas filtered catalog
  const filteredPlaques = PRODUCT_EXPERIENCE_CATALOG.filter((item) => {
    if (plaquesCollectionTab !== 'todos' && item.type !== plaquesCollectionTab) {
      return false;
    }
    if (plaquesSubCategory === 'todos') {
      return true;
    }
    return item.categories.includes(plaquesSubCategory);
  });

  const activePlaqueItem = filteredPlaques[currentPlaqueIndex] || filteredPlaques[0];

  useEffect(() => {
    if (currentPlaqueIndex >= filteredPlaques.length && filteredPlaques.length > 0) {
      setCurrentPlaqueIndex(0);
    }
  }, [filteredPlaques.length, currentPlaqueIndex]);

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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Sincroniza abas com âncoras na URL (ex: ao clicar nos links do rodapé)
  useEffect(() => {
    const syncHashWithCategory = () => {
      const hash = window.location.hash;
      if (hash === '#chaveiros-nfc') {
        setActiveCategory('chaveiros-cartoes');
      } else if (hash === '#presenca-digital') {
        setActiveCategory('presenca-digital');
      } else if (hash === '#agendamento-online') {
        setActiveCategory('sites-agendamento');
      } else if (hash === '#catalogo-padrao' || hash === '#produtos-nfc' || hash === '#solucoes') {
        setActiveCategory('plaquinhas');
      }
    };

    syncHashWithCategory();
    window.addEventListener('hashchange', syncHashWithCategory);
    return () => window.removeEventListener('hashchange', syncHashWithCategory);
  }, []);

  const handleCategoryChange = (cat: SolutionCategory) => {
    if (cat === activeCategory) return;
    setActiveCategory(cat);

    // No mobile, se o usuário estiver rolando ou navegando,
    // mantém a transição suave e o viewport alinhado aos botões sem salto
    if (typeof window !== 'undefined' && window.innerWidth < 640 && navTabsRef.current) {
      const rect = navTabsRef.current.getBoundingClientRect();
      if (rect.top < 20) {
        navTabsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const solutionTabs: { id: SolutionCategory; label: string; subtitle: string }[] = [
    {
      id: 'plaquinhas',
      label: 'Plaquinhas NFC & QR',
      subtitle: 'Balcão & Atendimento',
    },
    {
      id: 'chaveiros-cartoes',
      label: 'Chaveiros & Cartões',
      subtitle: 'Impressão 3D & NFC',
    },
    {
      id: 'presenca-digital',
      label: 'Presença Digital',
      subtitle: 'Google & BioSite',
    },
    {
      id: 'sites-agendamento',
      label: 'Sites & Agendamento',
      subtitle: 'Horários & Serviços',
    },
  ];

  return (
    <section
      id="solucoes"
      ref={sectionRef}
      className="py-20 sm:py-28 lg:py-32 relative bg-[#0A0F2E] text-[#F7F8FC] border-t border-white/[0.08] overflow-hidden"
    >
      {/* Âncoras legadas para compatibilidade de links antigos */}
      <div id="produtos-nfc" className="relative -top-24 pointer-events-none" aria-hidden="true" />
      <div id="catalogo-padrao" className="relative -top-24 pointer-events-none" aria-hidden="true" />
      <div id="chaveiros-nfc" className="relative -top-24 pointer-events-none" aria-hidden="true" />
      <div id="presenca-digital" className="relative -top-24 pointer-events-none" aria-hidden="true" />
      <div id="agendamento-online" className="relative -top-24 pointer-events-none" aria-hidden="true" />
      <div id="desenvolvimento-web" className="relative -top-24 pointer-events-none" aria-hidden="true" />

      {/* Iluminação de fundo sutil */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#8B5CF6]/5 rounded-full blur-[140px] pointer-events-none -z-10"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-10 left-0 w-[400px] h-[400px] bg-[#00C2FF]/5 rounded-full blur-[120px] pointer-events-none -z-10"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Central Oficial da Seção Soluções Inova */}
        <div ref={headerRef} className="max-w-3xl mb-8 sm:mb-14">
          <span className="inline-block text-xs font-semibold text-[#8B5CF6] uppercase tracking-wider mb-2">
            Soluções Inova
          </span>
          <h2
            className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.12] mb-4 font-display"
            style={{ textWrap: 'balance' }}
          >
            Encontre a solução certa para o seu negócio.
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-[#F7F8FC]/75 leading-relaxed font-normal">
            Produtos NFC e soluções digitais para aproximar sua marca dos clientes, facilitar atendimentos e fortalecer sua presença online.
          </p>
        </div>

        {/* Navegação Principal das 4 Categorias (Mobile: Grade 2x2 sem rolagem; Desktop: Grade 4 colunas) */}
        <div ref={navTabsRef} className="mb-6 sm:mb-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
            {solutionTabs.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`group relative flex flex-col justify-between p-3 sm:p-4 rounded-xl text-left transition-all duration-200 cursor-pointer select-none w-full min-h-[64px] sm:min-h-[72px] border ${
                    isSelected
                      ? 'bg-[#161E4E] border-[#8B5CF6] text-white shadow-md shadow-[#8B5CF6]/15 ring-1 ring-[#8B5CF6]/40'
                      : 'bg-[#12183F]/70 border-white/[0.08] text-[#F7F8FC]/70 hover:text-white hover:bg-[#141C48] hover:border-white/20 active:scale-[0.98]'
                  }`}
                  aria-pressed={isSelected}
                >
                  <div className="flex items-center justify-between mb-1 w-full">
                    <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#F7F8FC]/50 group-hover:text-[#F7F8FC]/70 transition-colors truncate pr-1">
                      {cat.subtitle}
                    </span>
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 transition-all duration-200 ${
                        isSelected
                          ? 'bg-[#8B5CF6] scale-110 shadow-[0_0_8px_rgba(139,92,246,0.8)]'
                          : 'bg-white/20'
                      }`}
                    />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-white tracking-tight leading-snug font-display">
                    {cat.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ÁREA PRINCIPAL DINÂMICA DE CONTEÚDO */}
        <div ref={contentAreaRef} className="transition-all duration-300">
          
          {/* ======================================================== */}
          {/* CATEGORIA 01: PLAQUINHAS NFC E QR CODE                   */}
          {/* ======================================================== */}
          {activeCategory === 'plaquinhas' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              {/* Descritivo da Categoria */}
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-white/10">
                <div className="max-w-2xl">
                  <span className="text-xs font-semibold text-[#8B5CF6] uppercase tracking-wider block mb-1">
                    Categoria 01 • Balcão & Atendimento Físico
                  </span>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white font-display">
                    Plaquinhas NFC e QR Code
                  </h3>
                  <p className="text-xs sm:text-sm lg:text-base text-[#F7F8FC]/75 mt-2 leading-relaxed">
                    Facilite o acesso dos seus clientes aos seus canais digitais com plaquinhas NFC e QR Code. Escolha entre nossos modelos padrão ou personalize a apresentação com a identidade do seu negócio.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <a
                    href={getWhatsAppUrl('Olá! Gostaria de solicitar um orçamento para Plaquinhas NFC e QR Code.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-semibold bg-[#8B5CF6] hover:bg-[#6366F1] text-white transition-all shadow-lg shadow-[#8B5CF6]/20 active:scale-98 min-h-[44px]"
                  >
                    <span>Solicitar plaquinha</span>
                    <ArrowUpRight className="w-4 h-4 text-white shrink-0" />
                  </a>
                </div>
              </div>

              {/* Controles de Filtro das Plaquinhas */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                {/* Abas de Coleção: Todas / Padrão / Personalizada */}
                <div className="flex items-center gap-1 bg-[#12183F] p-1 rounded-xl border border-white/[0.08] overflow-x-auto max-w-full scrollbar-none mobile-touch-scroll shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      setPlaquesCollectionTab('todos');
                      setCurrentPlaqueIndex(0);
                    }}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all min-h-[36px] shrink-0 ${
                      plaquesCollectionTab === 'todos'
                        ? 'bg-[#8B5CF6] text-white shadow-sm'
                        : 'text-[#F7F8FC]/60 hover:text-white'
                    }`}
                  >
                    Todas as artes
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPlaquesCollectionTab('padrao');
                      setCurrentPlaqueIndex(0);
                    }}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all min-h-[36px] shrink-0 ${
                      plaquesCollectionTab === 'padrao'
                        ? 'bg-[#8B5CF6] text-white shadow-sm'
                        : 'text-[#F7F8FC]/60 hover:text-white'
                    }`}
                  >
                    Artes padrão
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPlaquesCollectionTab('personalizada');
                      setCurrentPlaqueIndex(0);
                    }}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all min-h-[36px] shrink-0 ${
                      plaquesCollectionTab === 'personalizada'
                        ? 'bg-[#8B5CF6] text-white shadow-sm'
                        : 'text-[#F7F8FC]/60 hover:text-white'
                    }`}
                  >
                    Artes personalizadas
                  </button>
                </div>

                {/* Chips de Destino / Categoria */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto scrollbar-none text-xs mobile-touch-scroll">
                  {CATALOG_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        setPlaquesSubCategory(cat.id);
                        setCurrentPlaqueIndex(0);
                      }}
                      className={`px-3 py-1.5 rounded-lg font-medium transition-all shrink-0 min-h-[34px] ${
                        plaquesSubCategory === cat.id
                          ? 'bg-white/15 text-white border border-white/30'
                          : 'bg-white/[0.03] text-[#F7F8FC]/60 hover:text-white border border-white/5'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Coverflow Carousel Integrado de Plaquinhas Reais */}
              <div className="relative rounded-2xl bg-[#12183F] border border-white/[0.08] p-2.5 sm:p-6 lg:p-8 overflow-hidden shadow-2xl">
                <CoverflowCarousel
                  items={filteredPlaques}
                  activeIndex={currentPlaqueIndex}
                  onSelectIndex={(idx) => setCurrentPlaqueIndex(idx)}
                  onOpenModal={onOpenModal}
                />

                {/* 4. Identificação e Descrição da Arte em Destaque */}
                {activePlaqueItem && (
                  <div className="mt-3 sm:mt-6 pt-3 sm:pt-5 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#8B5CF6]/20 border border-[#8B5CF6]/30 text-[11px] font-semibold text-[#8B5CF6] uppercase tracking-wide">
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: activePlaqueItem.primaryColor }}
                          />
                          {activePlaqueItem.type === 'padrao' ? 'Arte Padrão Oficial' : 'Arte Personalizada da Empresa'}
                        </span>
                        <span className="text-white/40 hidden xs:inline">·</span>
                        <span className="text-xs text-white/70">
                          {activePlaqueItem.badgeText}
                        </span>
                      </div>
                      <h4 className="text-base sm:text-lg font-bold text-white mt-0.5">
                        {activePlaqueItem.name}
                      </h4>
                      <p className="text-xs text-[#F7F8FC]/70 mt-1 max-w-xl leading-relaxed">
                        {activePlaqueItem.description}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 shrink-0 w-full md:w-auto">
                      <button
                        type="button"
                        onClick={() =>
                          onOpenModal({
                            src: activePlaqueItem.image,
                            name: activePlaqueItem.name,
                            category: activePlaqueItem.type === 'padrao' ? 'Arte Padrão' : 'Arte Personalizada',
                            description: activePlaqueItem.description,
                            alt: activePlaqueItem.name,
                          })
                        }
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors w-full sm:w-auto min-h-[44px] active:scale-98 cursor-pointer"
                      >
                        <Maximize2 className="w-3.5 h-3.5 text-white/70" />
                        <span>Ver foto ampliada</span>
                      </button>

                      <a
                        href={getWhatsAppUrl(`Olá! Gostaria de consultar o modelo de plaquinha: ${activePlaqueItem.name}.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#8B5CF6] hover:bg-[#6366F1] text-white transition-all shadow-md active:scale-98 w-full sm:w-auto min-h-[44px]"
                      >
                        <span>Pedir este modelo</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Destaques de Fabricação das Plaquinhas */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="bg-[#12183F] p-4 rounded-xl border border-white/[0.08]">
                  <span className="block text-xs font-bold text-white mb-1">
                    Acrílico com Base em L
                  </span>
                  <p className="text-xs text-[#F7F8FC]/65">
                    Design estável para balcões, mesas e caixas, com inclinação ergonômica de leitura.
                  </p>
                </div>
                <div className="bg-[#12183F] p-4 rounded-xl border border-white/[0.08]">
                  <span className="block text-xs font-bold text-white mb-1">
                    NFC de Curto Alcance Integrado
                  </span>
                  <p className="text-xs text-[#F7F8FC]/65">
                    Microchip de alta resposta. O cliente aproxima a traseira do celular e acessa seu link na hora.
                  </p>
                </div>
                <div className="bg-[#12183F] p-4 rounded-xl border border-white/[0.08]">
                  <span className="block text-xs font-bold text-white mb-1">
                    QR Code Vetorial Complementar
                  </span>
                  <p className="text-xs text-[#F7F8FC]/65">
                    Compatibilidade universal para qualquer aparelho com câmera, mesmo sem leitor NFC ativo.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* CATEGORIA 02: CHAVEIROS E CARTÕES NFC                    */}
          {/* ======================================================== */}
          {activeCategory === 'chaveiros-cartoes' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              {/* Descritivo da Categoria */}
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-white/10">
                <div className="max-w-2xl">
                  <span className="text-xs font-semibold text-[#8B5CF6] uppercase tracking-wider block mb-1">
                    Categoria 02 • Manufatura Aditiva & Aproximação Móvel
                  </span>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white font-display">
                    Chaveiros e Cartões NFC
                  </h3>
                  <p className="text-xs sm:text-sm lg:text-base text-[#F7F8FC]/75 mt-2 leading-relaxed">
                    Leve a tecnologia de aproximação para o dia a dia. Chaveiros produzidos por impressão 3D e cartões NFC para compartilhar informações de forma prática.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <a
                    href={getWhatsAppUrl('Olá! Gostaria de um orçamento para Chaveiros em Impressão 3D e Cartões NFC da Inova.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-semibold bg-[#8B5CF6] hover:bg-[#6366F1] text-white transition-all shadow-lg shadow-[#8B5CF6]/20 active:scale-98 min-h-[44px]"
                  >
                    <span>Solicitar chaveiros e cartões</span>
                    <ArrowUpRight className="w-4 h-4 text-white shrink-0" />
                  </a>
                </div>
              </div>

              {/* Composição Editorial: Foto Real vs Modelos */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                
                {/* Lado Esquerdo: Fotografia Real dos Chaveiros em Impressão 3D */}
                <div className="lg:col-span-5 bg-[#12183F] rounded-2xl border border-white/[0.08] p-5 sm:p-7 shadow-2xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.08] text-xs">
                      <span className="font-semibold text-[#8B5CF6] uppercase tracking-wider">
                        Impressão 3D de Precisão
                      </span>
                      <span className="text-white/50 text-[11px]">
                        Fotografia Real do Produto
                      </span>
                    </div>

                    <div className="relative rounded-xl overflow-hidden aspect-square bg-[#0A0F2E] flex items-center justify-center p-3 mb-5 group">
                      <img
                        src="/assets/inova/chaveiros-nfc.jpeg"
                        alt="Chaveiros NFC fabricados por tecnologia de impressão 3D da Inova Soluções Digitais"
                        loading="lazy"
                        className="w-full h-full object-contain rounded-lg transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          onOpenModal({
                            src: '/assets/inova/chaveiros-nfc.jpeg',
                            name: 'Chaveiros NFC em Impressão 3D',
                            category: 'Chaveiros 3D & Cartões',
                            description: 'Chaveiros com microchip NFC interno produzidos por tecnologia de impressão 3D resistente.',
                            alt: 'Chaveiros NFC fabricados por impressão 3D da Inova',
                          })
                        }
                        className="absolute bottom-3 right-3 p-2 rounded-lg bg-[#0A0F2E]/80 backdrop-blur-sm text-white/80 hover:text-white border border-white/10 transition-colors"
                        aria-label="Ampliar imagem dos chaveiros"
                      >
                        <Maximize2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-xs text-[#F7F8FC]/80 leading-relaxed">
                      <strong className="text-white block mb-1">Atenção ao acabamento:</strong>
                      Nossos chaveiros não são feitos de acrílico. São fabricados por manufatura aditiva 3D com termoplásticos resistentes para uso contínuo em chaveiros e bolsas.
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-4 mt-5 border-t border-white/[0.08] text-center text-xs">
                    <div>
                      <span className="text-[10px] uppercase text-white/40 block">Processo</span>
                      <span className="font-semibold text-white">Impressão 3D</span>
                    </div>
                    <div className="border-l border-white/[0.08]">
                      <span className="text-[10px] uppercase text-white/40 block">Frequência</span>
                      <span className="font-semibold text-[#00C2FF]">13.56 MHz NFC</span>
                    </div>
                    <div className="border-l border-white/[0.08]">
                      <span className="text-[10px] uppercase text-white/40 block">App</span>
                      <span className="font-semibold text-white">Sem instalação</span>
                    </div>
                  </div>
                </div>

                {/* Lado Direito: Modelos Disponíveis e Aplicação */}
                <div className="lg:col-span-7 flex flex-col justify-between gap-4">
                  <div className="space-y-3">
                    <span className="text-xs uppercase tracking-wider text-white/50 font-semibold block mb-1">
                      Modelos disponíveis para pedido:
                    </span>
                    {KEYCHAIN_MODELS.map((model) => (
                      <div
                        key={model.id}
                        onClick={() => setSelectedKeychainModel(model.id)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                          selectedKeychainModel === model.id
                            ? 'bg-[#161E4E] border-[#8B5CF6] shadow-md'
                            : 'bg-[#12183F] border-white/[0.08] hover:border-white/20'
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
                            <h4 className="text-sm font-bold text-white">
                              {model.name}
                            </h4>
                          </div>
                          <p className="text-xs text-[#F7F8FC]/70 leading-relaxed">
                            {model.description}
                          </p>
                        </div>
                        <a
                          href={getWhatsAppUrl(`Olá! Gostaria de um orçamento para o ${model.name}.`)}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="shrink-0 p-2 rounded-lg bg-white/5 hover:bg-[#8B5CF6] text-white/80 hover:text-white transition-colors"
                          title={`Pedir ${model.name}`}
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </a>
                      </div>
                    ))}
                  </div>

                  {/* Informação sobre os Cartões NFC */}
                  <div className="p-4 sm:p-5 rounded-xl bg-[#12183F] border border-[#8B5CF6]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-[11px] font-semibold text-[#8B5CF6] uppercase tracking-wide block">
                        Cartões de Visita NFC Inteligentes
                      </span>
                      <p className="text-xs text-white/80 mt-0.5">
                        Apresentação executiva: aproxime o cartão do smartphone do cliente para compartilhar BioSite, catálogo ou contato instantaneamente.
                      </p>
                    </div>
                    <a
                      href={getWhatsAppUrl('Olá! Gostaria de consultar um orçamento para Cartões de Visita NFC Inteligentes.')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-lg text-xs font-semibold bg-[#8B5CF6] hover:bg-[#6366F1] text-white transition-colors shrink-0"
                    >
                      Consultar cartão NFC
                    </a>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* CATEGORIA 03: PRESENÇA DIGITAL                           */}
          {/* ======================================================== */}
          {activeCategory === 'presenca-digital' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              {/* Descritivo da Categoria */}
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-white/10">
                <div className="max-w-2xl">
                  <span className="text-xs font-semibold text-[#8B5CF6] uppercase tracking-wider block mb-1">
                    Categoria 03 • Estrutura Online & Posicionamento
                  </span>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white font-display">
                    Presença Digital
                  </h3>
                  <p className="text-xs sm:text-sm lg:text-base text-[#F7F8FC]/75 mt-2 leading-relaxed">
                    Posicione sua empresa onde os clientes já estão procurando e centralize seus canais de atendimento em páginas digitais leves e profissionais.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <a
                    href={getWhatsAppUrl('Olá! Gostaria de um orçamento para soluções de Presença Digital com a Inova.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-semibold bg-[#8B5CF6] hover:bg-[#6366F1] text-white transition-all shadow-lg shadow-[#8B5CF6]/20 active:scale-98 min-h-[44px]"
                  >
                    <span>Quero minha presença digital</span>
                    <ArrowUpRight className="w-4 h-4 text-white shrink-0" />
                  </a>
                </div>
              </div>

              {/* Sub-Seletores de Soluções da Presença Digital: Apenas as 2 Soluções Reais */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 1. Perfil da Empresa no Google */}
                <button
                  type="button"
                  onClick={() => setDigitalTab('google')}
                  className={`p-5 rounded-2xl text-left transition-all duration-200 cursor-pointer border ${
                    digitalTab === 'google'
                      ? 'bg-[#161E4E] border-[#8B5CF6] text-white shadow-lg shadow-[#8B5CF6]/15 ring-1 ring-[#8B5CF6]/30'
                      : 'bg-[#12183F] border-white/[0.08] text-white/70 hover:text-white hover:bg-[#141C48] hover:border-white/15'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-semibold text-[#8B5CF6] uppercase tracking-wider">
                      Busca Local & Google Maps
                    </span>
                    <span
                      className={`w-2 h-2 rounded-full transition-colors ${
                        digitalTab === 'google' ? 'bg-[#8B5CF6]' : 'bg-white/20'
                      }`}
                    />
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-white mb-1 font-display">
                    Perfil da Empresa no Google
                  </h4>
                  <p className="text-xs text-[#F7F8FC]/70 leading-relaxed font-normal">
                    Otimização e padronização do Google Meu Negócio para posicionar sua marca nas pesquisas locais e atrair clientes no Maps.
                  </p>
                </button>

                {/* 2. BioSite Profissional (Cartão de Visitas Digital) */}
                <button
                  type="button"
                  onClick={() => setDigitalTab('biosite')}
                  className={`p-5 rounded-2xl text-left transition-all duration-200 cursor-pointer border ${
                    digitalTab === 'biosite'
                      ? 'bg-[#161E4E] border-[#8B5CF6] text-white shadow-lg shadow-[#8B5CF6]/15 ring-1 ring-[#8B5CF6]/30'
                      : 'bg-[#12183F] border-white/[0.08] text-white/70 hover:text-white hover:bg-[#141C48] hover:border-white/15'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-semibold text-[#8B5CF6] uppercase tracking-wider">
                      Link na Bio & Cartão Digital
                    </span>
                    <span
                      className={`w-2 h-2 rounded-full transition-colors ${
                        digitalTab === 'biosite' ? 'bg-[#8B5CF6]' : 'bg-white/20'
                      }`}
                    />
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-white mb-1 font-display">
                    BioSite Profissional
                  </h4>
                  <p className="text-xs text-[#F7F8FC]/70 leading-relaxed font-normal">
                    Seu cartão de visitas digital. Reúna seus links, redes sociais, contatos e informações profissionais em uma única página.
                  </p>
                </button>
              </div>

              {/* Painel de Apresentação das Soluções Digitais */}
              <div className="rounded-2xl bg-[#12183F] border border-white/[0.08] p-6 sm:p-8 lg:p-10 shadow-2xl">
                
                {/* Detalhe 1: Perfil da Empresa no Google */}
                {digitalTab === 'google' && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    <div className="lg:col-span-7 space-y-5">
                      <div>
                        <span className="text-xs font-semibold text-[#8B5CF6] uppercase tracking-wider block mb-1.5">
                          Busca Local & Google Maps
                        </span>
                        <h4 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white font-display leading-tight">
                          Perfil da Empresa no Google
                        </h4>
                        <p className="text-sm text-[#F7F8FC]/80 leading-relaxed mt-2">
                          Organize as informações do seu negócio e facilite que clientes encontrem sua empresa nas pesquisas da sua região e no Google Maps.
                        </p>
                      </div>

                      {/* Lista de Recursos Limpa e Direta */}
                      <div className="space-y-3 pt-2">
                        <div className="flex items-start gap-3 text-xs sm:text-sm text-[#F7F8FC]/85">
                          <Check className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
                          <span>Enquadramento correto nas categorias do Google para busca qualificada na sua cidade</span>
                        </div>
                        <div className="flex items-start gap-3 text-xs sm:text-sm text-[#F7F8FC]/85">
                          <Check className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
                          <span>Horários de funcionamento, telefone de contato, endereço físico e rota no Maps conferidos</span>
                        </div>
                        <div className="flex items-start gap-3 text-xs sm:text-sm text-[#F7F8FC]/85">
                          <Check className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
                          <span>Orientações práticas para incentivar avaliações espontâneas de 5 estrelas dos seus clientes</span>
                        </div>
                        <div className="flex items-start gap-3 text-xs sm:text-sm text-[#F7F8FC]/85">
                          <Check className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
                          <span>Fotos de fachada, ambiente e serviços padronizadas em alta resolução para transmitir confiança</span>
                        </div>
                      </div>

                      <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        <a
                          href={getWhatsAppUrl('Olá! Gostaria de um orçamento para criação e otimização do Perfil da Empresa no Google (Google Meu Negócio).')}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-semibold bg-[#8B5CF6] hover:bg-[#6366F1] text-white transition-all shadow-md text-center min-h-[44px]"
                        >
                          <span>Otimizar Perfil no Google</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </a>
                        <span className="text-xs text-[#F7F8FC]/55 text-center sm:text-left">
                          Sem falsas promessas, com estruturação séria e profissional
                        </span>
                      </div>
                    </div>

                    <div className="lg:col-span-5 flex justify-center">
                      <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0A0F2E] p-3 w-full max-w-sm sm:max-w-md group shadow-xl">
                        <img
                          src="/assets/inova/google-perfil.jpeg"
                          alt="Perfil da Empresa no Google organizado e otimizado pela Inova Soluções Digitais"
                          loading="lazy"
                          className="w-full h-auto rounded-xl object-contain transition-transform duration-300 group-hover:scale-102"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            onOpenModal({
                              src: '/assets/inova/google-perfil.jpeg',
                              name: 'Perfil da Empresa no Google',
                              category: 'Presença Digital',
                              description: 'Estruturação oficial do perfil no Google com dados comerciais padronizados.',
                              alt: 'Perfil da Empresa no Google',
                            })
                          }
                          className="absolute bottom-5 right-5 p-2.5 rounded-xl bg-[#0A0F2E]/85 backdrop-blur-sm text-white/90 hover:text-white border border-white/10 transition-colors cursor-pointer shadow-md"
                          title="Ampliar visualização"
                          aria-label="Ampliar visualização"
                        >
                          <Maximize2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Detalhe 2: BioSite Profissional (Seu Cartão de Visitas Digital) */}
                {digitalTab === 'biosite' && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    <div className="lg:col-span-7 space-y-5">
                      <div>
                        <span className="text-xs font-semibold text-[#8B5CF6] uppercase tracking-wider block mb-1.5">
                          Cartão de Visitas Digital & Link na Bio
                        </span>
                        <h4 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white font-display leading-tight">
                          BioSite Profissional
                        </h4>
                        <p className="text-sm sm:text-base text-[#F7F8FC]/85 leading-relaxed mt-2 font-normal">
                          Seu cartão de visitas digital. Reúna seus links, redes sociais, contatos e informações profissionais em uma única página, facilitando o acesso dos seus clientes.
                        </p>
                      </div>

                      {/* Lista de Recursos Limpa e Direta */}
                      <div className="space-y-3 pt-2">
                        <div className="flex items-start gap-3 text-xs sm:text-sm text-[#F7F8FC]/85">
                          <Check className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
                          <span>Funciona como cartão de visitas virtual instantâneo para networking no WhatsApp ou presencial</span>
                        </div>
                        <div className="flex items-start gap-3 text-xs sm:text-sm text-[#F7F8FC]/85">
                          <Check className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
                          <span>Botão em destaque para contato direto no WhatsApp comercial e salvamento rápido de contato</span>
                        </div>
                        <div className="flex items-start gap-3 text-xs sm:text-sm text-[#F7F8FC]/85">
                          <Check className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
                          <span>Centralização de links de redes sociais, localização, catálogo, chave Pix e serviços</span>
                        </div>
                        <div className="flex items-start gap-3 text-xs sm:text-sm text-[#F7F8FC]/85">
                          <Check className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
                          <span>Identidade visual sob medida com as cores, logotipo e estilo do seu negócio</span>
                        </div>
                        <div className="flex items-start gap-3 text-xs sm:text-sm text-[#F7F8FC]/85">
                          <Check className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
                          <span>Página leve, sem mensalidades ou assinaturas de plataformas genéricas</span>
                        </div>
                      </div>

                      <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        <a
                          href={getWhatsAppUrl('Olá! Gostaria de solicitar um orçamento para o BioSite Profissional (meu cartão de visitas digital).')}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-semibold bg-[#8B5CF6] hover:bg-[#6366F1] text-white transition-all shadow-md text-center min-h-[44px]"
                        >
                          <span>Quero meu BioSite</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </a>
                        <span className="text-xs text-[#F7F8FC]/55 text-center sm:text-left">
                          Desenvolvido sob medida com prévia digital antes da entrega
                        </span>
                      </div>
                    </div>

                    <div className="lg:col-span-5 flex justify-center">
                      <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0A0F2E] p-3 w-full max-w-sm sm:max-w-md group shadow-xl">
                        <img
                          src="/assets/inova/biosite-mockup.jpeg"
                          alt="Interface mobile do BioSite desenvolvido pela Inova Soluções Digitais funcionando como cartão de visitas digital"
                          loading="lazy"
                          className="w-full h-auto rounded-xl object-contain transition-transform duration-300 group-hover:scale-102"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            onOpenModal({
                              src: '/assets/inova/biosite-mockup.jpeg',
                              name: 'BioSite Profissional',
                              category: 'Presença Digital',
                              description: 'Página digital que funciona como cartão de visitas virtual e centralizador de links para Instagram e WhatsApp.',
                              alt: 'BioSite Profissional',
                            })
                          }
                          className="absolute bottom-5 right-5 p-2.5 rounded-xl bg-[#0A0F2E]/85 backdrop-blur-sm text-white/90 hover:text-white border border-white/10 transition-colors cursor-pointer shadow-md"
                          title="Ampliar visualização"
                          aria-label="Ampliar visualização"
                        >
                          <Maximize2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* CATEGORIA 04: SITES E AGENDAMENTO                        */}
          {/* ======================================================== */}
          {activeCategory === 'sites-agendamento' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              {/* Descritivo da Categoria */}
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-white/[0.08]">
                <div className="max-w-2xl">
                  <span className="text-xs font-semibold text-[#8B5CF6] uppercase tracking-wider block mb-1">
                    Categoria 04 • Plataformas & Organização de Horários
                  </span>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white font-display">
                    Sites e Agendamento
                  </h3>
                  <p className="text-xs sm:text-sm lg:text-base text-[#F7F8FC]/75 mt-2 leading-relaxed">
                    Apresente seus serviços, organize seus atendimentos e facilite a rotina dos seus clientes com soluções digitais desenvolvidas para a realidade do seu negócio.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <a
                    href={getWhatsAppUrl('Olá! Gostaria de um orçamento para Sistema de Agendamento Online e Sites com a Inova.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-semibold bg-[#8B5CF6] hover:bg-[#6366F1] text-white transition-all shadow-lg shadow-[#8B5CF6]/20 active:scale-98 min-h-[44px]"
                  >
                    <span>Solicitar agendamento ou site</span>
                    <ArrowUpRight className="w-4 h-4 text-white shrink-0" />
                  </a>
                </div>
              </div>

              {/* Grid Principal: Sistema de Agendamento + Páginas de Serviços e Catálogos */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                
                {/* Protagonista: Sistema de Agendamento Online */}
                <div className="lg:col-span-7 bg-[#12183F] rounded-2xl border border-[#8B5CF6]/40 p-6 sm:p-8 shadow-2xl flex flex-col justify-between relative overflow-hidden group hover:border-[#8B5CF6]/70 transition-colors">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-[#8B5CF6]/10 rounded-full blur-3xl pointer-events-none" />

                  <div>
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.08] text-xs">
                      <span className="text-[#8B5CF6] font-semibold uppercase tracking-wider">
                        Sistema de Agendamento Online
                      </span>
                      <span className="text-white/60">
                        Atendimento 24 horas
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-xl bg-[#8B5CF6]/15 text-[#8B5CF6]">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <h4 className="text-xl sm:text-2xl font-bold text-white font-display">
                        Mais facilidade na rotina de agendamentos
                      </h4>
                    </div>

                    <p className="text-xs sm:text-sm text-[#F7F8FC]/75 leading-relaxed mb-6 font-normal">
                      Seus clientes escolhem o serviço desejado, o profissional e o horário disponível em poucos cliques pelo celular. Você não precisa parar seu atendimento para responder perguntas de horários no WhatsApp.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 pt-4 border-t border-white/[0.08]">
                      <div className="space-y-2">
                        <div className="flex items-start gap-2 text-xs text-[#F7F8FC]/85">
                          <Check className="w-3.5 h-3.5 text-[#00C2FF] shrink-0 mt-0.5" />
                          <span>Catálogo de serviços com valores e tempo</span>
                        </div>
                        <div className="flex items-start gap-2 text-xs text-[#F7F8FC]/85">
                          <Check className="w-3.5 h-3.5 text-[#00C2FF] shrink-0 mt-0.5" />
                          <span>Escolha individual do profissional da equipe</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2 text-xs text-[#F7F8FC]/85">
                          <Check className="w-3.5 h-3.5 text-[#00C2FF] shrink-0 mt-0.5" />
                          <span>Confirmação que reduz faltas e atrasos</span>
                        </div>
                        <div className="flex items-start gap-2 text-xs text-[#F7F8FC]/85">
                          <Check className="w-3.5 h-3.5 text-[#00C2FF] shrink-0 mt-0.5" />
                          <span>Funciona no navegador, sem app para baixar</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <a
                      href={getWhatsAppUrl('Olá! Gostaria de um orçamento para implantar o Sistema de Agendamento Online no meu negócio.')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold bg-[#8B5CF6] hover:bg-[#6366F1] text-white transition-all shadow-md text-center min-h-[44px]"
                    >
                      <span>Solicitar orçamento de agendamento</span>
                      <ArrowUpRight className="w-4 h-4 text-white" />
                    </a>
                    <span className="text-[11px] text-[#F7F8FC]/50 text-center sm:text-right">
                      Personalizado para os seus serviços
                    </span>
                  </div>
                </div>

                {/* Coluna Complementar: Páginas de Procedimentos & Catálogos/Cardápios */}
                <div className="lg:col-span-5 flex flex-col justify-between gap-5">
                  
                  {/* Card: Página de Serviços & Procedimentos */}
                  <div className="bg-[#12183F] rounded-2xl border border-white/[0.08] p-5 shadow-xl flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/[0.08]">
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#8B5CF6]">
                          Páginas de Procedimentos
                        </span>
                        <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
                      </div>
                      <h4 className="text-base sm:text-lg font-bold text-white mb-1.5 font-display">
                        Página de Serviços & Lash/Nail Design
                      </h4>
                      <p className="text-xs text-[#F7F8FC]/70 leading-relaxed mb-3">
                        Página visual desenvolvida para valorizar procedimentos de estética, unhas e extensão de cílios, com galeria de fotos e botão de agendamento.
                      </p>
                    </div>
                    <a
                      href={getWhatsAppUrl('Olá! Gostaria de consultar uma Página de Procedimentos e Serviços com a Inova.')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-between w-full py-2.5 px-3.5 rounded-lg text-xs font-semibold bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors"
                    >
                      <span>Consultar Página de Serviços</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-white/70" />
                    </a>
                  </div>

                  {/* Card: Catálogos e Cardápios Digitais */}
                  <div className="bg-[#12183F] rounded-2xl border border-white/[0.08] p-5 shadow-xl flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/[0.08]">
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#8B5CF6]">
                          Catálogos & Cardápios
                        </span>
                        <Store className="w-4 h-4 text-[#8B5CF6]" />
                      </div>
                      <h4 className="text-base sm:text-lg font-bold text-white mb-1.5 font-display">
                        Catálogos e Cardápios Digitais
                      </h4>
                      <p className="text-xs text-[#F7F8FC]/70 leading-relaxed mb-3">
                        Exibição limpa de produtos ou cardápios de delivery com fotos e envio direto de pedidos para o WhatsApp, sem taxas ou comissões sobre vendas.
                      </p>
                    </div>
                    <a
                      href={getWhatsAppUrl('Olá! Gostaria de solicitar um orçamento para Catálogo ou Cardápio Digital.')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-between w-full py-2.5 px-3.5 rounded-lg text-xs font-semibold bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors"
                    >
                      <span>Consultar Catálogo ou Cardápio</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-white/70" />
                    </a>
                  </div>

                </div>

              </div>

              {/* Nichos Especializados Atendidos */}
              <div className="pt-4">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
                  <div>
                    <span className="text-xs font-semibold text-[#8B5CF6] uppercase tracking-wider block mb-0.5">
                      Segmentos Especializados
                    </span>
                    <h4 className="text-lg sm:text-xl font-bold text-white font-display">
                      Soluções para quem vive do atendimento com hora marcada
                    </h4>
                  </div>
                  <p className="text-xs text-[#F7F8FC]/60 max-w-sm">
                    Fluxos configurados para a realidade de cada rotina profissional.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
                  {SCHEDULING_NICHES.map((niche) => (
                    <div
                      key={niche.id}
                      className="bg-[#12183F] rounded-xl border border-white/[0.08] p-4 flex flex-col justify-between hover:border-[#8B5CF6]/50 transition-all duration-200 group"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1 mb-2">
                          <span className="text-[11px] font-semibold text-[#8B5CF6] uppercase">
                            {niche.name}
                          </span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]/50 group-hover:bg-[#8B5CF6]" />
                        </div>
                        <h5 className="text-xs font-bold text-white mb-1.5 leading-snug">
                          {niche.tagline}
                        </h5>
                        <p className="text-[11px] text-[#F7F8FC]/65 leading-relaxed mb-3">
                          {niche.focus}
                        </p>
                      </div>

                      <div className="pt-2.5 border-t border-white/[0.08]">
                        <span className="text-[10px] text-[#00C2FF] font-medium block mb-2">
                          ✓ {niche.benefit}
                        </span>
                        <a
                          href={getWhatsAppUrl(`Olá! Gostaria de consultar agendamento online para ${niche.name}.`)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-between w-full py-1.5 px-2.5 rounded-md text-[11px] font-semibold text-white/90 bg-white/5 hover:bg-[#8B5CF6] hover:text-white transition-colors"
                        >
                          <span>Consultar</span>
                          <ArrowUpRight className="w-3 h-3 opacity-70 group-hover:opacity-100" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Destaque Discreto de Responsividade */}
              <div className="rounded-xl bg-[#12183F] border border-white/[0.08] p-5 sm:p-6 shadow-xl">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                  <div className="flex items-start sm:items-center gap-4">
                    <div className="flex items-center -space-x-1 bg-white/5 p-2.5 rounded-xl border border-white/10 shrink-0 text-[#8B5CF6]">
                      <Monitor className="w-4 h-4 text-white/80" />
                      <Tablet className="w-3.5 h-3.5 text-[#8B5CF6]" />
                      <Smartphone className="w-4 h-4 text-white/90" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h5 className="text-sm sm:text-base font-bold text-white font-display">
                          Experiência adaptada a cada tela
                        </h5>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-[#8B5CF6]/15 text-[#8B5CF6] border border-[#8B5CF6]/30">
                          100% Responsivo
                        </span>
                      </div>
                      <p className="text-xs text-[#F7F8FC]/70 max-w-2xl leading-relaxed">
                        Sites, landing pages, catálogos e sistemas desenvolvidos para funcionar em computadores, tablets e celulares, com navegação adaptada a cada dispositivo.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 text-xs text-[#F7F8FC]/65 border-t lg:border-t-0 lg:border-l border-white/10 pt-3 lg:pt-0 lg:pl-6 shrink-0">
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0" />
                      <span>Navegação no touch</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0" />
                      <span>Sem app para baixar</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0" />
                      <span>Ideal para bio</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
};
