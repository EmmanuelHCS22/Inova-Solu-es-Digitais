import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowUpRight,
  Radio,
  Printer,
  Globe,
  Calendar,
  Check,
  Maximize2,
  Search,
  Smartphone,
  CreditCard,
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

  // Presença Digital state
  const [digitalTab, setDigitalTab] = useState<'google' | 'biosite' | 'cartao-virtual'>('google');

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
  };

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
        <div ref={headerRef} className="max-w-3xl mb-12 sm:mb-16">
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

        {/* Navegação Principal das 4 Categorias */}
        <div ref={navTabsRef} className="mb-10 sm:mb-14">
          <div className="flex items-center gap-2 overflow-x-auto pb-3 border-b border-white/10 mobile-touch-scroll -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-4">
            
            {/* Categoria 1: Plaquinhas NFC */}
            <button
              type="button"
              onClick={() => handleCategoryChange('plaquinhas')}
              className={`flex items-center gap-3 p-3.5 sm:p-4 rounded-xl text-left transition-all duration-200 shrink-0 sm:shrink min-w-[200px] sm:min-w-0 min-h-[56px] hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0.5 cursor-pointer ${
                activeCategory === 'plaquinhas'
                  ? 'bg-white/10 border border-[#8B5CF6] text-white shadow-lg shadow-[#8B5CF6]/20 ring-1 ring-[#8B5CF6]/40'
                  : 'bg-white/[0.02] border border-white/[0.06] text-[#F7F8FC]/65 hover:text-white hover:bg-white/[0.06] hover:border-white/15'
              }`}
            >
              <div
                className={`p-2 rounded-lg shrink-0 transition-transform duration-200 ${
                  activeCategory === 'plaquinhas' ? 'bg-[#8B5CF6] text-white shadow-sm shadow-[#8B5CF6]/40 scale-105' : 'bg-white/5 text-[#8B5CF6]'
                }`}
              >
                <Radio className="w-4 h-4" />
              </div>
              <div className="truncate">
                <span className="block text-xs uppercase tracking-wider font-semibold opacity-70">
                  Categoria 01
                </span>
                <span className="block text-sm font-bold text-white truncate">
                  Plaquinhas NFC & QR
                </span>
              </div>
            </button>

            {/* Categoria 2: Chaveiros 3D & Cartões */}
            <button
              type="button"
              onClick={() => handleCategoryChange('chaveiros-cartoes')}
              className={`flex items-center gap-3 p-3.5 sm:p-4 rounded-xl text-left transition-all duration-200 shrink-0 sm:shrink min-w-[200px] sm:min-w-0 min-h-[56px] hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0.5 cursor-pointer ${
                activeCategory === 'chaveiros-cartoes'
                  ? 'bg-white/10 border border-[#8B5CF6] text-white shadow-lg shadow-[#8B5CF6]/20 ring-1 ring-[#8B5CF6]/40'
                  : 'bg-white/[0.02] border border-white/[0.06] text-[#F7F8FC]/65 hover:text-white hover:bg-white/[0.06] hover:border-white/15'
              }`}
            >
              <div
                className={`p-2 rounded-lg shrink-0 transition-transform duration-200 ${
                  activeCategory === 'chaveiros-cartoes' ? 'bg-[#8B5CF6] text-white shadow-sm shadow-[#8B5CF6]/40 scale-105' : 'bg-white/5 text-[#8B5CF6]'
                }`}
              >
                <Printer className="w-4 h-4" />
              </div>
              <div className="truncate">
                <span className="block text-xs uppercase tracking-wider font-semibold opacity-70">
                  Categoria 02
                </span>
                <span className="block text-sm font-bold text-white truncate">
                  Chaveiros 3D & Cartões
                </span>
              </div>
            </button>

            {/* Categoria 3: Presença Digital */}
            <button
              type="button"
              onClick={() => handleCategoryChange('presenca-digital')}
              className={`flex items-center gap-3 p-3.5 sm:p-4 rounded-xl text-left transition-all duration-200 shrink-0 sm:shrink min-w-[200px] sm:min-w-0 min-h-[56px] hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0.5 cursor-pointer ${
                activeCategory === 'presenca-digital'
                  ? 'bg-white/10 border border-[#8B5CF6] text-white shadow-lg shadow-[#8B5CF6]/20 ring-1 ring-[#8B5CF6]/40'
                  : 'bg-white/[0.02] border border-white/[0.06] text-[#F7F8FC]/65 hover:text-white hover:bg-white/[0.06] hover:border-white/15'
              }`}
            >
              <div
                className={`p-2 rounded-lg shrink-0 transition-transform duration-200 ${
                  activeCategory === 'presenca-digital' ? 'bg-[#8B5CF6] text-white shadow-sm shadow-[#8B5CF6]/40 scale-105' : 'bg-white/5 text-[#8B5CF6]'
                }`}
              >
                <Globe className="w-4 h-4" />
              </div>
              <div className="truncate">
                <span className="block text-xs uppercase tracking-wider font-semibold opacity-70">
                  Categoria 03
                </span>
                <span className="block text-sm font-bold text-white truncate">
                  Presença Digital
                </span>
              </div>
            </button>

            {/* Categoria 4: Sites & Agendamento */}
            <button
              type="button"
              onClick={() => handleCategoryChange('sites-agendamento')}
              className={`flex items-center gap-3 p-3.5 sm:p-4 rounded-xl text-left transition-all duration-200 shrink-0 sm:shrink min-w-[200px] sm:min-w-0 min-h-[56px] hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0.5 cursor-pointer ${
                activeCategory === 'sites-agendamento'
                  ? 'bg-white/10 border border-[#8B5CF6] text-white shadow-lg shadow-[#8B5CF6]/20 ring-1 ring-[#8B5CF6]/40'
                  : 'bg-white/[0.02] border border-white/[0.06] text-[#F7F8FC]/65 hover:text-white hover:bg-white/[0.06] hover:border-white/15'
              }`}
            >
              <div
                className={`p-2 rounded-lg shrink-0 transition-transform duration-200 ${
                  activeCategory === 'sites-agendamento' ? 'bg-[#8B5CF6] text-white shadow-sm shadow-[#8B5CF6]/40 scale-105' : 'bg-white/5 text-[#8B5CF6]'
                }`}
              >
                <Calendar className="w-4 h-4" />
              </div>
              <div className="truncate">
                <span className="block text-xs uppercase tracking-wider font-semibold opacity-70">
                  Categoria 04
                </span>
                <span className="block text-sm font-bold text-white truncate">
                  Sites & Agendamento
                </span>
              </div>
            </button>

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
              <div className="relative rounded-2xl bg-[#12183F] border border-white/[0.08] p-3 sm:p-6 lg:p-8 overflow-hidden shadow-2xl">
                <CoverflowCarousel
                  items={filteredPlaques}
                  activeIndex={currentPlaqueIndex}
                  onSelectIndex={(idx) => setCurrentPlaqueIndex(idx)}
                  onOpenModal={onOpenModal}
                />

                {/* Informações da Plaquinha em Destaque */}
                {activePlaqueItem && (
                  <div className="mt-5 sm:mt-6 pt-5 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[11px] font-semibold text-[#8B5CF6] uppercase tracking-wide">
                          {activePlaqueItem.type === 'padrao' ? 'Arte Padrão Oficial' : 'Arte Personalizada da Empresa'}
                        </span>
                        <span className="text-white/40">·</span>
                        <span className="text-xs text-white/70">
                          {activePlaqueItem.badgeText}
                        </span>
                      </div>
                      <h4 className="text-base sm:text-lg font-bold text-white">
                        {activePlaqueItem.name}
                      </h4>
                      <p className="text-xs text-[#F7F8FC]/65 mt-0.5 max-w-xl">
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
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-3 sm:py-2.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors w-full sm:w-auto min-h-[44px] active:scale-98"
                      >
                        <Maximize2 className="w-3.5 h-3.5 text-white/70" />
                        <span>Ver foto ampliada</span>
                      </button>

                      <a
                        href={getWhatsAppUrl(`Olá! Gostaria de consultar o modelo de plaquinha: ${activePlaqueItem.name}.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 sm:py-2.5 rounded-xl text-xs font-semibold bg-[#8B5CF6] hover:bg-[#6366F1] text-white transition-all shadow-md active:scale-98 w-full sm:w-auto min-h-[44px]"
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

              {/* Sub-Seletores de Soluções da Presença Digital */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setDigitalTab('google')}
                  className={`p-4 rounded-xl border text-left transition-all min-h-[72px] flex items-center justify-between ${
                    digitalTab === 'google'
                      ? 'bg-[#161E4E] border-[#8B5CF6] text-white shadow-lg shadow-[#8B5CF6]/10'
                      : 'bg-[#12183F] border-white/[0.08] text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Search className={`w-5 h-5 ${digitalTab === 'google' ? 'text-[#8B5CF6]' : 'text-white/40'}`} />
                    <div>
                      <span className="block text-xs uppercase tracking-wider font-semibold opacity-60">Perfil no Google</span>
                      <span className="block text-sm font-bold text-white">Google Meu Negócio</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </button>

                <button
                  type="button"
                  onClick={() => setDigitalTab('biosite')}
                  className={`p-4 rounded-xl border text-left transition-all min-h-[72px] flex items-center justify-between ${
                    digitalTab === 'biosite'
                      ? 'bg-[#161E4E] border-[#8B5CF6] text-white shadow-lg shadow-[#8B5CF6]/10'
                      : 'bg-[#12183F] border-white/[0.08] text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Smartphone className={`w-5 h-5 ${digitalTab === 'biosite' ? 'text-[#8B5CF6]' : 'text-white/40'}`} />
                    <div>
                      <span className="block text-xs uppercase tracking-wider font-semibold opacity-60">Link na Bio</span>
                      <span className="block text-sm font-bold text-white">BioSite Profissional</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </button>

                <button
                  type="button"
                  onClick={() => setDigitalTab('cartao-virtual')}
                  className={`p-4 rounded-xl border text-left transition-all min-h-[72px] flex items-center justify-between ${
                    digitalTab === 'cartao-virtual'
                      ? 'bg-[#161E4E] border-[#8B5CF6] text-white shadow-lg shadow-[#8B5CF6]/10'
                      : 'bg-[#12183F] border-white/[0.08] text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className={`w-5 h-5 ${digitalTab === 'cartao-virtual' ? 'text-[#8B5CF6]' : 'text-white/40'}`} />
                    <div>
                      <span className="block text-xs uppercase tracking-wider font-semibold opacity-60">Contato Interativo</span>
                      <span className="block text-sm font-bold text-white">Cartão Virtual</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </button>
              </div>

              {/* Conteúdo Detalhado da Ferramenta Selecionada */}
              <div className="rounded-2xl bg-[#12183F] border border-white/[0.08] p-6 sm:p-8 lg:p-10 shadow-2xl">
                
                {digitalTab === 'google' && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-7 space-y-4">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 text-[#8B5CF6] text-xs font-semibold">
                        <span>Busca Local & Google Maps</span>
                      </div>
                      <h4 className="text-xl sm:text-2xl font-bold text-white font-display">
                        Criação e otimização do Perfil da Empresa no Google
                      </h4>
                      <p className="text-sm text-[#F7F8FC]/80 leading-relaxed">
                        Organize as informações do seu negócio e facilite que clientes encontrem sua empresa nas pesquisas e no Google Maps.
                      </p>

                      <div className="space-y-2.5 pt-3 border-t border-white/[0.08]">
                        <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F7F8FC]/85">
                          <Check className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
                          <span>Enquadramento correto nas categorias do Google para busca na sua região</span>
                        </div>
                        <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F7F8FC]/85">
                          <Check className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
                          <span>Horários de funcionamento, telefone, endereço e rotas no Maps organizados</span>
                        </div>
                        <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F7F8FC]/85">
                          <Check className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
                          <span>Orientações práticas para incentivar avaliações espontâneas dos clientes</span>
                        </div>
                        <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F7F8FC]/85">
                          <Check className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
                          <span>Fotos de fachada, ambiente e serviços padronizadas em alta resolução</span>
                        </div>
                      </div>

                      <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        <a
                          href={getWhatsAppUrl('Olá! Gostaria de um orçamento para criação e otimização do Perfil da Empresa no Google (Google Meu Negócio).')}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold bg-[#8B5CF6] hover:bg-[#6366F1] text-white transition-all shadow-md text-center"
                        >
                          <span>Otimizar Perfil no Google</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </a>
                        <span className="text-xs text-[#F7F8FC]/50 text-center sm:text-left">
                          Sem promessas falsas de primeiro lugar, com padronização séria
                        </span>
                      </div>
                    </div>

                    <div className="lg:col-span-5 flex justify-center">
                      <div className="relative rounded-xl overflow-hidden border border-white/[0.08] bg-[#0A0F2E] p-3 max-w-sm group">
                        <img
                          src="/assets/inova/google-perfil.jpeg"
                          alt="Perfil da Empresa no Google organizado e otimizado pela Inova Soluções Digitais"
                          loading="lazy"
                          className="w-full h-auto rounded-lg object-cover transition-transform duration-300 group-hover:scale-102"
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
                          className="absolute bottom-5 right-5 p-2 rounded-lg bg-[#0A0F2E]/80 backdrop-blur-sm text-white/80 hover:text-white border border-white/10 transition-colors"
                        >
                          <Maximize2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {digitalTab === 'biosite' && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-7 space-y-4">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 text-[#8B5CF6] text-xs font-semibold">
                        <span>Centralização de Links no Instagram</span>
                      </div>
                      <h4 className="text-xl sm:text-2xl font-bold text-white font-display">
                        BioSite Profissional
                      </h4>
                      <p className="text-sm text-[#F7F7F5]/80 leading-relaxed">
                        Reúna seus links, redes sociais, contatos e informações em uma única página digital.
                      </p>

                      <div className="space-y-2.5 pt-3 border-t border-white/10">
                        <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F7F8FC]/85">
                          <Check className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
                          <span>Carregamento leve e ultrarrápido em qualquer smartphone</span>
                        </div>
                        <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F7F8FC]/85">
                          <Check className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
                          <span>Botão em destaque para contato direto no WhatsApp comercial</span>
                        </div>
                        <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F7F8FC]/85">
                          <Check className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
                          <span>Identidade visual alinhada às cores e logotipo da sua empresa</span>
                        </div>
                        <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F7F8FC]/85">
                          <Check className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
                          <span>Sem mensalidades ou assinaturas de plataformas genéricas</span>
                        </div>
                      </div>

                      <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        <a
                          href={getWhatsAppUrl('Olá! Gostaria de solicitar um orçamento para desenvolvimento de um BioSite para o meu negócio.')}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold bg-[#8B5CF6] hover:bg-[#6366F1] text-white transition-all shadow-md text-center"
                        >
                          <span>Quero meu BioSite</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </a>
                        <span className="text-xs text-[#F7F8FC]/50 text-center sm:text-left">
                          Desenvolvido sob medida para a sua marca
                        </span>
                      </div>
                    </div>

                    <div className="lg:col-span-5 flex justify-center">
                      <div className="relative rounded-xl overflow-hidden border border-white/[0.08] bg-[#0A0F2E] p-3 max-w-[280px] group">
                        <img
                          src="/assets/inova/biosite-mockup.jpeg"
                          alt="Interface mobile do BioSite desenvolvido pela Inova Soluções Digitais"
                          loading="lazy"
                          className="w-full h-auto rounded-lg object-contain transition-transform duration-300 group-hover:scale-102"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            onOpenModal({
                              src: '/assets/inova/biosite-mockup.jpeg',
                              name: 'BioSite Profissional',
                              category: 'Presença Digital',
                              description: 'Página mobile centralizadora de links para biografia do Instagram.',
                              alt: 'BioSite Profissional',
                            })
                          }
                          className="absolute bottom-5 right-5 p-2 rounded-lg bg-[#0A0F2E]/80 backdrop-blur-sm text-white/80 hover:text-white border border-white/10 transition-colors"
                        >
                          <Maximize2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {digitalTab === 'cartao-virtual' && (
                  <div className="space-y-6">
                    <div className="max-w-2xl">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 text-[#8B5CF6] text-xs font-semibold mb-2">
                        <span>Apresentação Executiva & Compartilhamento</span>
                      </div>
                      <h4 className="text-xl sm:text-2xl font-bold text-white font-display">
                        Cartão Virtual Interativo
                      </h4>
                      <p className="text-sm text-[#F7F8FC]/80 leading-relaxed mt-1">
                        Compartilhe seus dados profissionais e canais de contato em uma apresentação digital prática.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                      <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                        <span className="block text-xs font-bold text-white mb-1">
                          Compartilhamento Fácil
                        </span>
                        <p className="text-xs text-[#F7F8FC]/65">
                          Envie por WhatsApp como link ou arquivo executivo. O cliente acessa em 1 clique.
                        </p>
                      </div>
                      <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                        <span className="block text-xs font-bold text-white mb-1">
                          Salvar Contato na Agenda
                        </span>
                        <p className="text-xs text-[#F7F8FC]/65">
                          Botão que baixa o vCard direto para a agenda telefônica do cliente sem digitação.
                        </p>
                      </div>
                      <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                        <span className="block text-xs font-bold text-white mb-1">
                          Atalhos de Ação Rápida
                        </span>
                        <p className="text-xs text-[#F7F8FC]/65">
                          Botões diretos para chamada de voz, WhatsApp, e-mail, redes sociais e chave Pix.
                        </p>
                      </div>
                    </div>

                    <div className="pt-2">
                      <a
                        href={getWhatsAppUrl('Olá! Gostaria de um orçamento para Cartão Virtual Interativo.')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold bg-[#8B5CF6] hover:bg-[#6366F1] text-white transition-all shadow-md"
                      >
                        <span>Solicitar Cartão Virtual</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
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
