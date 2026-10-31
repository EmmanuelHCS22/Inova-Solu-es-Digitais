import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Maximize2,
  AlertCircle,
  Radio,
  QrCode,
  Pause,
  Play,
  MessageCircle,
  Check,
  Layers,
  RotateCcw,
} from 'lucide-react';
import {
  CATALOG_CATEGORIES,
  STANDARD_CATALOG,
  CUSTOM_PLAQUES,
  getWhatsAppUrl,
} from '../data/inovaData';

interface ShowcaseItem {
  id: string;
  name: string;
  label: string;
  type: 'padrao' | 'personalizada';
  categories: string[];
  description: string;
  image: string;
  alt: string;
  segment?: string;
}

interface CatalogProps {
  onOpenModal: (image: {
    src: string;
    name: string;
    category?: string;
    description?: string;
    alt: string;
  }) => void;
}

export const Catalog: React.FC<CatalogProps> = ({ onOpenModal }) => {
  // Collection tab: 'todos' | 'padrao' | 'personalizada'
  const [collectionTab, setCollectionTab] = useState<'todos' | 'padrao' | 'personalizada'>('todos');
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAutoplayActive, setIsAutoplayActive] = useState<boolean>(true);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);

  // Touch gesture tracking (horizontal vs vertical movement differentiation)
  const touchStartXRef = useRef<number>(0);
  const touchStartYRef = useRef<number>(0);
  const touchEndXRef = useRef<number>(0);
  const touchEndYRef = useRef<number>(0);

  // DOM Refs for GSAP and category scroll
  const sectionRef = useRef<HTMLElement>(null);
  const sliderStageRef = useRef<HTMLDivElement>(null);
  const activeCardRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Check category scroll position to toggle the mobile gradient continuity indicator
  const checkCategoryScroll = useCallback(() => {
    const el = categoryScrollRef.current;
    if (!el) return;
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
  }, []);

  useEffect(() => {
    checkCategoryScroll();
    window.addEventListener('resize', checkCategoryScroll);
    return () => window.removeEventListener('resize', checkCategoryScroll);
  }, [checkCategoryScroll]);

  // Unify standard and custom plaques while preserving every single authentic item and real photo
  const allPlaques: ShowcaseItem[] = [
    ...STANDARD_CATALOG.map((item) => ({
      ...item,
      type: 'padrao' as const,
    })),
    ...CUSTOM_PLAQUES.map((item) => ({
      ...item,
      type: 'personalizada' as const,
    })),
  ];

  // Filter items according to collectionTab and activeCategory
  const filteredItems = allPlaques.filter((item) => {
    if (collectionTab !== 'todos' && item.type !== collectionTab) {
      return false;
    }
    if (activeCategory === 'todos') {
      return true;
    }
    return item.categories.includes(activeCategory);
  });

  const totalItems = filteredItems.length;
  const currentItem = filteredItems[currentIndex] || filteredItems[0];

  // Calculate adjacent items for depth preview on desktop 2xl
  const prevIndex = totalItems > 0 ? (currentIndex - 1 + totalItems) % totalItems : 0;
  const nextIndex = totalItems > 0 ? (currentIndex + 1) % totalItems : 0;
  const prevItem = filteredItems[prevIndex];
  const nextItem = filteredItems[nextIndex];

  // GSAP Slide Transition
  const executeSlideTransition = useCallback(
    (direction: 'next' | 'prev', targetIndex: number) => {
      if (isAnimating || !activeCardRef.current || !detailsRef.current) return;
      setIsAnimating(true);

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        setCurrentIndex(targetIndex);
        setIsAnimating(false);
        return;
      }

      const activeCard = activeCardRef.current;
      const details = detailsRef.current;

      const isNext = direction === 'next';
      const exitX = isNext ? -60 : 60;
      const enterX = isNext ? 60 : -60;

      const tl = gsap.timeline({
        onComplete: () => {
          setIsAnimating(false);
        },
      });

      // 1. Exit active item with opacity and subtle slide
      tl.to(activeCard, {
        x: exitX,
        opacity: 0,
        scale: 0.96,
        duration: 0.25,
        ease: 'power2.in',
      })
      .to(
        details,
        {
          opacity: 0,
          y: 8,
          duration: 0.2,
          ease: 'power2.in',
        },
        '-=0.2'
      )
      // 2. Change React state halfway
      .call(() => {
        setCurrentIndex(targetIndex);
      })
      // 3. Set position to enter side
      .set(activeCard, {
        x: enterX,
        opacity: 0,
        scale: 0.96,
      })
      // 4. Smooth cinematic entry
      .to(activeCard, {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: 'power3.out',
      })
      .fromTo(
        details,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' },
        '-=0.3'
      );
    },
    [isAnimating]
  );

  const goToNext = useCallback(() => {
    if (totalItems <= 1) return;
    const nextIdx = (currentIndex + 1) % totalItems;
    executeSlideTransition('next', nextIdx);
  }, [currentIndex, totalItems, executeSlideTransition]);

  const goToPrev = useCallback(() => {
    if (totalItems <= 1) return;
    const prevIdx = (currentIndex - 1 + totalItems) % totalItems;
    executeSlideTransition('prev', prevIdx);
  }, [currentIndex, totalItems, executeSlideTransition]);

  const goToIndex = (targetIdx: number) => {
    if (targetIdx === currentIndex || isAnimating || targetIdx < 0 || targetIdx >= totalItems) return;
    const direction = targetIdx > currentIndex ? 'next' : 'prev';
    executeSlideTransition(direction, targetIdx);
  };

  // Reset index safely if category or collection filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeCategory, collectionTab]);

  // Autoplay functionality: 6 seconds interval, pauses on hover / interaction / out of viewport
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isAutoplayActive || prefersReducedMotion || totalItems <= 1) {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
      return;
    }

    autoplayTimerRef.current = setInterval(() => {
      goToNext();
    }, 6000);

    return () => {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    };
  }, [isAutoplayActive, goToNext, totalItems]);

  // IntersectionObserver to pause autoplay when section is not visible on screen
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            setIsAutoplayActive(false);
          } else {
            setIsAutoplayActive(true);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Keyboard navigation (ArrowLeft / ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        goToPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev]);

  // Touch Swipe Handlers with Predominantly Horizontal Verification
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
    touchEndXRef.current = e.touches[0].clientX;
    touchEndYRef.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.touches[0].clientX;
    touchEndYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    const deltaX = touchStartXRef.current - touchEndXRef.current;
    const deltaY = touchStartYRef.current - touchEndYRef.current;
    const minSwipeDistance = 45;

    // Only trigger swipe if movement is predominantly horizontal to avoid interrupting natural vertical scrolling
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
      if (deltaX > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
  };

  const handleResetFilters = () => {
    setCollectionTab('todos');
    setActiveCategory('todos');
  };

  return (
    <section
      id="catalogo-padrao"
      ref={sectionRef}
      className="py-20 sm:py-28 lg:py-32 relative bg-[#111321] text-[#F7F7F5] overflow-hidden border-t border-white/10"
      onMouseEnter={() => setIsAutoplayActive(false)}
      onMouseLeave={() => setIsAutoplayActive(true)}
      aria-roledescription="carousel"
      aria-label="Catálogo Editorial de Plaquinhas NFC e QR Code Inova"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header Editorial */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end mb-10 sm:mb-14">
          <div className="lg:col-span-7">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#8B5CF6] font-semibold block mb-3">
              04 / CATÁLOGO EDITORIAL DE PLAQUINHAS
            </span>
            <h2
              className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.12] font-display"
              style={{ textWrap: 'balance' }}
            >
              Plaquinhas em acrílico com aproximação NFC e QR Code.
            </h2>
          </div>

          <div className="lg:col-span-5 pb-1">
            <p className="text-sm sm:text-base text-[#F7F7F5]/75 leading-relaxed font-normal">
              Fabricadas em acrílico transparente com base em L. Conheça as artes padrão prontas para uso e as opções personalizadas com o logotipo e as cores do seu negócio.
            </p>
          </div>
        </div>

        {/* Collection Selector Tabs (Zero Pills: Controles Segmentados) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
          <div className="inline-flex p-1 rounded-xl bg-[#181B2E] border border-white/10 shrink-0 self-start">
            <button
              type="button"
              onClick={() => setCollectionTab('todos')}
              className={`px-3.5 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all min-h-[38px] ${
                collectionTab === 'todos'
                  ? 'bg-[#8B5CF6] text-white shadow-sm'
                  : 'text-[#F7F7F5]/70 hover:text-white'
              }`}
            >
              Todas as Plaquinhas ({allPlaques.length})
            </button>
            <button
              type="button"
              onClick={() => setCollectionTab('padrao')}
              className={`px-3.5 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all min-h-[38px] ${
                collectionTab === 'padrao'
                  ? 'bg-[#8B5CF6] text-white shadow-sm'
                  : 'text-[#F7F7F5]/70 hover:text-white'
              }`}
            >
              Linha Padrão ({STANDARD_CATALOG.length})
            </button>
            <button
              type="button"
              onClick={() => setCollectionTab('personalizada')}
              className={`px-3.5 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all min-h-[38px] ${
                collectionTab === 'personalizada'
                  ? 'bg-[#8B5CF6] text-white shadow-sm'
                  : 'text-[#F7F7F5]/70 hover:text-white'
              }`}
            >
              Personalizadas ({CUSTOM_PLAQUES.length})
            </button>
          </div>

          {/* Contador de Peças */}
          <div className="text-xs font-mono text-[#F7F7F5]/60 flex items-center gap-2 self-start sm:self-auto">
            {totalItems > 0 ? (
              <>
                <span>Peça {String(currentIndex + 1).padStart(2, '0')}</span>
                <span aria-hidden="true">/</span>
                <span>{String(totalItems).padStart(2, '0')}</span>
              </>
            ) : (
              <span>0 resultados</span>
            )}
          </div>
        </div>

        {/* Categories Filter Tabs com Máscara de Gradiente no Mobile para Indicador de Continuidade */}
        <div className="relative mb-8">
          <div
            ref={categoryScrollRef}
            onScroll={checkCategoryScroll}
            className="flex items-center justify-start overflow-x-auto pb-2 gap-2 no-scrollbar"
          >
            {CATALOG_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setActiveCategory(cat.id);
                  checkCategoryScroll();
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap shrink-0 min-h-[34px] ${
                  activeCategory === cat.id
                    ? 'bg-white text-[#111321] font-bold shadow-sm'
                    : 'bg-[#181B2E] text-[#F7F7F5]/70 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Indicador de Continuidade Visual com pointer-events-none no Mobile */}
          {canScrollRight && (
            <div
              className="absolute right-0 top-0 bottom-2 w-14 bg-gradient-to-l from-[#111321] via-[#111321]/80 to-transparent pointer-events-none transition-opacity duration-300 sm:hidden"
              aria-hidden="true"
            />
          )}
        </div>

        {/* Notice Disclaimer Banner (Regra do briefing) */}
        <div className="mb-10 p-4 rounded-xl bg-[#181B2E] border border-white/10 flex items-start gap-3 text-xs text-[#F7F7F5]/75">
          <AlertCircle className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
          <span>
            <strong className="text-white">Aviso de homologação:</strong> As imagens são referências visuais oficiais de produtos reais. O QR Code final é gerado sob medida para o link da sua empresa e testado antes do envio.
          </span>
        </div>

        {/* ==============================================================
            MAIN PRODUCT SHOWCASE SLIDER OU ESTADO VAZIO ELEGANTE
           ============================================================== */}
        {totalItems === 0 || !currentItem ? (
          /* Estado Vazio Editorial: Elimina desaparecimento da seção */
          <div className="rounded-2xl bg-[#181B2E] border border-white/10 p-8 sm:p-14 text-center max-w-xl mx-auto shadow-2xl my-6">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 text-[#8B5CF6]">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 font-display">
              Nenhum modelo encontrado para esta combinação de filtros
            </h3>
            <p className="text-xs sm:text-sm text-[#F7F7F5]/70 leading-relaxed mb-6">
              A categoria selecionada não possui modelos nesta coleção. Você pode redefinir os filtros para ver todas as opções disponíveis.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#8B5CF6] hover:bg-[#7348D6] transition-all shadow-md active:scale-98 min-h-[44px]"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Ver todas as plaquinhas ({allPlaques.length})</span>
            </button>
          </div>
        ) : (
          /* Carrossel de Showcase Ativo */
          <div
            ref={sliderStageRef}
            className="relative max-w-5xl mx-auto select-none"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Side Peeking Preview: PREVIOUS ITEM (Desktop 2xl only: 1536px+) */}
            {totalItems > 1 && prevItem && (
              <div
                onClick={goToPrev}
                className="hidden 2xl:flex flex-col items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 w-44 h-64 rounded-2xl bg-[#181B2E]/60 border border-white/10 p-3 opacity-40 hover:opacity-85 transition-all duration-300 cursor-pointer pointer-events-auto scale-90 z-0"
                title={`Ver anterior: ${prevItem.name}`}
              >
                <img
                  src={prevItem.image}
                  alt={prevItem.alt}
                  className="max-h-36 max-w-full object-contain mb-2 rounded-lg"
                />
                <span className="text-[11px] font-semibold text-white/80 truncate max-w-[140px]">
                  {prevItem.name}
                </span>
                <span className="text-[10px] text-[#8B5CF6] font-mono mt-0.5">← Anterior</span>
              </div>
            )}

            {/* Side Peeking Preview: NEXT ITEM (Desktop 2xl only: 1536px+) */}
            {totalItems > 1 && nextItem && (
              <div
                onClick={goToNext}
                className="hidden 2xl:flex flex-col items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 w-44 h-64 rounded-2xl bg-[#181B2E]/60 border border-white/10 p-3 opacity-40 hover:opacity-85 transition-all duration-300 cursor-pointer pointer-events-auto scale-90 z-0"
                title={`Ver próximo: ${nextItem.name}`}
              >
                <img
                  src={nextItem.image}
                  alt={nextItem.alt}
                  className="max-h-36 max-w-full object-contain mb-2 rounded-lg"
                />
                <span className="text-[11px] font-semibold text-white/80 truncate max-w-[140px]">
                  {nextItem.name}
                </span>
                <span className="text-[10px] text-[#8B5CF6] font-mono mt-0.5">Próximo →</span>
              </div>
            )}

            {/* Central Active Showcase Glass Card */}
            <div className="relative rounded-2xl bg-[#181B2E] border border-white/10 shadow-2xl p-5 sm:p-8 md:p-10 z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                
                {/* Lado Esquerdo: Fotografia Real com Moldura de Estúdio e Zoom Modal */}
                <div className="lg:col-span-6 flex justify-center items-center relative">
                  <div
                    ref={activeCardRef}
                    className="relative w-full max-w-[320px] sm:max-w-md aspect-square sm:aspect-[4/3] rounded-2xl bg-[#0E101D] border border-white/10 p-4 sm:p-6 flex items-center justify-center shadow-2xl cursor-pointer group overflow-hidden"
                    onClick={() =>
                      onOpenModal({
                        src: currentItem.image,
                        name: currentItem.name,
                        category: currentItem.label,
                        description: currentItem.description,
                        alt: currentItem.alt,
                      })
                    }
                    title="Clique para ampliar a fotografia em tela cheia (Esc para fechar)"
                  >
                    {/* Fotografia real em alta resolução mantendo proporções */}
                    <img
                      src={currentItem.image}
                      alt={currentItem.alt}
                      className="max-h-full max-w-full object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)] transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Indicador de Coleção (Texto limpo) */}
                    <div className="absolute top-3 left-3 bg-[#111321]/90 px-3 py-1 rounded-md text-[10px] font-mono text-white/90 border border-white/10">
                      <span>
                        {currentItem.type === 'personalizada'
                          ? 'Projeto Personalizado'
                          : 'Modelo Padrão Inova'}
                      </span>
                    </div>

                    {/* Botão de Ampliação */}
                    <div className="absolute bottom-3 right-3 bg-[#111321]/90 p-2 rounded-lg text-white/80 group-hover:text-white group-hover:bg-[#8B5CF6] transition-all border border-white/10">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Lado Direito: Informações Editoriais e Ações Comerciais */}
                <div ref={detailsRef} className="lg:col-span-6 flex flex-col justify-between text-left">
                  <div>
                    {/* Categoria e Segmento com separadores tipográficos discretos (Zero Pills) */}
                    <div className="flex flex-wrap items-center gap-2 mb-2 text-xs font-mono text-[#F7F7F5]/70">
                      <span className="text-[#8B5CF6] font-semibold uppercase tracking-wider">
                        {currentItem.label}
                      </span>
                      {currentItem.segment && (
                        <>
                          <span aria-hidden="true" className="text-white/30">·</span>
                          <span className="text-white/85 font-medium">{currentItem.segment}</span>
                        </>
                      )}
                    </div>

                    {/* Título */}
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3 font-display">
                      {currentItem.name}
                    </h3>

                    {/* Descrição Autêntica */}
                    <p className="text-xs sm:text-sm lg:text-base text-[#F7F7F5]/75 leading-relaxed mb-6 font-normal">
                      {currentItem.description}
                    </p>

                    {/* Especificações Técnicas Reais com Separadores Discretos */}
                    <div className="pt-4 border-t border-white/10 mb-6 space-y-2 text-xs font-mono text-[#F7F7F5]/70">
                      <div className="flex items-center gap-2">
                        <Radio className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0" />
                        <span>Aproximação NFC Contactless · Chip NTAG</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <QrCode className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0" />
                        <span>QR Code Vetorial de Alta Precisão</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0" />
                        <span>Suporte de balcão ou fixação em mesa</span>
                      </div>
                    </div>
                  </div>

                  {/* Ações Comerciais e WhatsApp */}
                  <div className="space-y-3 pt-4 border-t border-white/10">
                    <a
                      href={getWhatsAppUrl(
                        `Olá! Gostaria de solicitar um orçamento para o modelo de plaquinha "${currentItem.name}".`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#8B5CF6] hover:bg-[#7348D6] shadow-md transition-all active:scale-98 text-center min-h-[44px]"
                    >
                      <span>Solicitar este modelo</span>
                      <ArrowUpRight className="w-4 h-4 text-white shrink-0" />
                    </a>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                      <a
                        href={getWhatsAppUrl(
                          `Olá! Gostaria de tirar dúvidas e consultar detalhes sobre o modelo de plaquinha "${currentItem.name}".`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-medium text-[#F7F7F5]/85 bg-white/5 hover:bg-white/10 hover:text-white border border-white/10 transition-colors text-center min-h-[40px]"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Consultar detalhes pelo WhatsApp</span>
                      </a>

                      <button
                        type="button"
                        onClick={() =>
                          onOpenModal({
                            src: currentItem.image,
                            name: currentItem.name,
                            category: currentItem.label,
                            description: currentItem.description,
                            alt: currentItem.alt,
                          })
                        }
                        className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#F7F7F5]/80 hover:text-white border border-white/10 transition-colors flex items-center justify-center gap-1.5 text-xs min-h-[40px]"
                        title="Ampliar imagem da plaquinha"
                        aria-label="Ampliar imagem da plaquinha"
                      >
                        <Maximize2 className="w-4 h-4 shrink-0" />
                        <span className="sm:hidden">Ampliar foto</span>
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            </div>

            {/* Barra de Controles de Navegação */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 px-2">
              
              {/* Indicador Numérico e Botão de Autoplay */}
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm font-bold text-white tabular-nums">
                  {String(currentIndex + 1).padStart(2, '0')}
                </span>
                <span className="text-white/30">/</span>
                <span className="font-mono text-xs text-[#F7F7F5]/50 tabular-nums">
                  {String(totalItems).padStart(2, '0')}
                </span>

                <button
                  type="button"
                  onClick={() => setIsAutoplayActive(!isAutoplayActive)}
                  className="ml-3 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#F7F7F5]/60 hover:text-white transition-colors"
                  title={isAutoplayActive ? 'Pausar rotação automática' : 'Continuar rotação automática'}
                  aria-label={isAutoplayActive ? 'Pausar rotação' : 'Continuar rotação'}
                >
                  {isAutoplayActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Marcadores de Navegação com Padding Acessível para Toque no Celular */}
              <div className="flex items-center gap-1 flex-wrap justify-center">
                {filteredItems.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    type="button"
                    onClick={() => goToIndex(dotIdx)}
                    className="py-2.5 px-1 flex items-center justify-center focus:outline-none focus-visible:ring-1 focus-visible:ring-[#8B5CF6] rounded"
                    aria-label={`Ir para modelo ${dotIdx + 1}`}
                    aria-current={dotIdx === currentIndex ? 'true' : 'false'}
                  >
                    <span
                      className={`block h-1.5 rounded-full transition-all duration-200 ${
                        dotIdx === currentIndex
                          ? 'w-6 bg-[#8B5CF6]'
                          : 'w-1.5 bg-white/25 hover:bg-white/45'
                      }`}
                    />
                  </button>
                ))}
              </div>

              {/* Botões Anterior e Próximo */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={goToPrev}
                  disabled={isAnimating || totalItems <= 1}
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white flex items-center justify-center transition-all duration-200 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed group focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                  aria-label="Ver plaquinha anterior"
                >
                  <ChevronLeft className="w-4 h-4 text-white/80 group-hover:text-white transition-colors" />
                </button>

                <button
                  type="button"
                  onClick={goToNext}
                  disabled={isAnimating || totalItems <= 1}
                  className="w-10 h-10 rounded-xl bg-[#8B5CF6] hover:bg-[#7348D6] text-white flex items-center justify-center transition-all duration-200 shadow-sm active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed group focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                  aria-label="Ver próxima plaquinha"
                >
                  <ChevronRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Chamada para Personalização de Plaquinhas (`#plaquinhas-personalizadas`) */}
        <div
          id="plaquinhas-personalizadas"
          className="mt-16 sm:mt-20 rounded-2xl bg-[#181B2E] border border-white/10 p-6 sm:p-9 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl"
        >
          <div className="max-w-xl text-center md:text-left">
            <span className="text-xs font-mono uppercase tracking-wider text-[#8B5CF6] font-semibold block mb-1">
              PROJETOS SOB MEDIDA
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 font-display">
              Sua marca, sua identidade. Plaquinhas 100% personalizadas.
            </h3>
            <p className="text-xs sm:text-sm text-[#F7F7F5]/70 leading-relaxed">
              Envie sua logo e suas preferências visuais. Desenvolvemos o layout alinhado à sua identidade visual com aprovação prévia em mockup digital antes da produção.
            </p>
          </div>
          <a
            href={getWhatsAppUrl(
              'Olá! Tenho a logo da minha empresa e gostaria de solicitar um orçamento para uma plaquinha 100% personalizada com as minhas cores.'
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#8B5CF6] hover:bg-[#7348D6] shadow-md transition-all active:scale-98 text-center min-h-[44px] w-full md:w-auto"
          >
            <span>Enviar logo para personalização</span>
            <ArrowUpRight className="w-4 h-4 text-white shrink-0" />
          </a>
        </div>

      </div>
    </section>
  );
};
