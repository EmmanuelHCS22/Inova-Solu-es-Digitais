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
  Sparkles,
  Pause,
  Play,
  Layers,
  MessageCircle,
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

  // Touch gesture tracking
  const touchStartXRef = useRef<number>(0);
  const touchEndXRef = useRef<number>(0);

  // DOM Refs for GSAP
  const sectionRef = useRef<HTMLElement>(null);
  const sliderStageRef = useRef<HTMLDivElement>(null);
  const activeCardRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Unify standard and custom plaques while preserving every single item and attribute
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

  // Calculate adjacent items for 3D continuous depth
  const prevIndex = (currentIndex - 1 + totalItems) % totalItems;
  const nextIndex = (currentIndex + 1) % totalItems;
  const prevItem = filteredItems[prevIndex];
  const nextItem = filteredItems[nextIndex];

  // GSAP 3D Slide Transition
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
      const exitX = isNext ? -120 : 120;
      const exitRotY = isNext ? 22 : -22;
      const enterX = isNext ? 120 : -120;
      const enterRotY = isNext ? -22 : 22;

      const tl = gsap.timeline({
        onComplete: () => {
          setIsAnimating(false);
        },
      });

      // 1. Exit active item with 3D rotation, scale down and fade
      tl.to(activeCard, {
        xPercent: exitX,
        opacity: 0,
        scale: 0.85,
        rotateY: exitRotY,
        duration: 0.35,
        ease: 'power2.in',
      })
      .to(
        details,
        {
          opacity: 0,
          y: 10,
          duration: 0.25,
          ease: 'power2.in',
        },
        '-=0.25'
      )
      // 2. Change React state halfway
      .call(() => {
        setCurrentIndex(targetIndex);
      })
      // 3. Reset position to enter side instantly
      .set(activeCard, {
        xPercent: enterX,
        opacity: 0,
        scale: 0.88,
        rotateY: enterRotY,
      })
      // 4. Smooth cinematic entry
      .to(activeCard, {
        xPercent: 0,
        opacity: 1,
        scale: 1,
        rotateY: 0,
        duration: 0.5,
        ease: 'power3.out',
      })
      .fromTo(
        details,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
        '-=0.35'
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
    if (targetIdx === currentIndex || isAnimating) return;
    const direction = targetIdx > currentIndex ? 'next' : 'prev';
    executeSlideTransition(direction, targetIdx);
  };

  // Reset index safely if category or collection filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeCategory, collectionTab]);

  // Autoplay functionality: 5 seconds interval, pauses on hover / interaction / out of viewport
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isAutoplayActive || prefersReducedMotion || totalItems <= 1) {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
      return;
    }

    autoplayTimerRef.current = setInterval(() => {
      goToNext();
    }, 5000);

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
      { threshold: 0.2 }
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

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = touchStartXRef.current - touchEndXRef.current;
    const minSwipeDistance = 50;

    if (Math.abs(distance) > minSwipeDistance) {
      if (distance > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
  };

  // 3D Parallax Mouse Move on Desktop
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = activeCardRef.current;
    if (!card || window.innerWidth < 1024) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.4,
      ease: 'power1.out',
      transformPerspective: 1000,
    });
  };

  const handleMouseLeave = () => {
    const card = activeCardRef.current;
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: 'power2.out',
    });
  };

  if (!currentItem) return null;

  return (
    <section
      id="catalogo-padrao"
      ref={sectionRef}
      className="py-28 relative bg-[#111321] text-[#F7F7F5] overflow-hidden border-t border-white/10"
      onMouseEnter={() => setIsAutoplayActive(false)}
      onMouseLeave={() => setIsAutoplayActive(true)}
      aria-roledescription="carousel"
      aria-label="Vitrine de Plaquinhas NFC e QR Code Inova"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7357E8]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#F7F7F5]/70 font-semibold">
              VITRINE DE HARDWARE & PRODUTOS
            </span>
          </div>
          <h2
            className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4 font-display"
            style={{ textWrap: 'balance' }}
          >
            Showroom interativo de plaquinhas.
          </h2>
          <p className="text-base sm:text-lg text-[#F7F7F5]/75 leading-relaxed max-w-2xl">
            Apresentação interativa com transições dos modelos oficiais com tecnologia NFC por aproximação e QR Code nítido de alta durabilidade.
          </p>
        </div>

        {/* Collection Selector Tabs */}
        <div className="flex justify-start sm:justify-start mb-6 overflow-x-auto max-w-full pb-2 no-scrollbar">
          <div className="inline-flex p-1 rounded-xl bg-white/5 border border-white/10 shrink-0">
            <button
              type="button"
              onClick={() => setCollectionTab('todos')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                collectionTab === 'todos'
                  ? 'bg-[#7357E8] text-white shadow-sm'
                  : 'text-[#F7F7F5]/60 hover:text-white'
              }`}
            >
              Todos ({allPlaques.length})
            </button>
            <button
              type="button"
              onClick={() => setCollectionTab('padrao')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                collectionTab === 'padrao'
                  ? 'bg-[#7357E8] text-white shadow-sm'
                  : 'text-[#F7F7F5]/60 hover:text-white'
              }`}
            >
              Modelos Padrão ({STANDARD_CATALOG.length})
            </button>
            <button
              type="button"
              onClick={() => setCollectionTab('personalizada')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                collectionTab === 'personalizada'
                  ? 'bg-[#7357E8] text-white shadow-sm'
                  : 'text-[#F7F7F5]/60 hover:text-white'
              }`}
            >
              Projetos Personalizados ({CUSTOM_PLAQUES.length})
            </button>
          </div>
        </div>

        {/* Categories Filter Tabs */}
        <div className="flex items-center justify-start overflow-x-auto pb-4 mb-8 gap-2 no-scrollbar">
          {CATALOG_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap shrink-0 ${
                activeCategory === cat.id
                  ? 'bg-white/15 text-white border border-white/30 font-bold shadow-sm'
                  : 'bg-white/5 text-[#F7F7F5]/60 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Notice Disclaimer Banner */}
        <div className="mb-10 p-4 rounded-xl bg-[#17192B] border border-white/10 flex items-start gap-3 text-xs text-[#F7F7F5]/75">
          <AlertCircle className="w-4 h-4 text-[#7357E8] shrink-0 mt-0.5" />
          <span>
            <strong className="text-white">Aviso de homologação:</strong> As imagens são referências visuais oficiais. Cada placa tem o chip NFC e QR Code gravados e conferidos antes do envio.
          </span>
        </div>

        {/* ==============================================================
            MAIN PRODUCT SHOWCASE SLIDER STAGE
           ============================================================== */}
        <div
          ref={sliderStageRef}
          className="relative max-w-5xl mx-auto select-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Side Peeking Preview: PREVIOUS ITEM (Desktop only) */}
          {totalItems > 1 && prevItem && (
            <div
              onClick={goToPrev}
              className="hidden lg:flex flex-col items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 w-48 h-64 rounded-2xl bg-[#0F1642]/40 border border-white/5 p-3 opacity-35 hover:opacity-75 transition-all duration-300 cursor-pointer pointer-events-auto transform -rotate-y-12 scale-90 blur-[1px] hover:blur-none z-0"
              style={{ perspective: 800 }}
              title={`Ver anterior: ${prevItem.name}`}
            >
              <img
                src={prevItem.image}
                alt={prevItem.alt}
                className="max-h-36 max-w-full object-contain mb-2"
              />
              <span className="text-[11px] font-semibold text-slate-300 truncate max-w-[150px]">
                {prevItem.name}
              </span>
              <span className="text-[9px] text-slate-500 font-mono mt-0.5">← Anterior</span>
            </div>
          )}

          {/* Side Peeking Preview: NEXT ITEM (Desktop only) */}
          {totalItems > 1 && nextItem && (
            <div
              onClick={goToNext}
              className="hidden lg:flex flex-col items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 w-48 h-64 rounded-2xl bg-[#0F1642]/40 border border-white/5 p-3 opacity-35 hover:opacity-75 transition-all duration-300 cursor-pointer pointer-events-auto transform rotate-y-12 scale-90 blur-[1px] hover:blur-none z-0"
              style={{ perspective: 800 }}
              title={`Ver próximo: ${nextItem.name}`}
            >
              <img
                src={nextItem.image}
                alt={nextItem.alt}
                className="max-h-36 max-w-full object-contain mb-2"
              />
              <span className="text-[11px] font-semibold text-slate-300 truncate max-w-[150px]">
                {nextItem.name}
              </span>
              <span className="text-[9px] text-[#22D3EE] font-mono mt-0.5">Próximo →</span>
            </div>
          )}

          {/* Central Active Showcase Glass Card */}
          <div
            className="relative rounded-2xl bg-[#17192B] border border-white/10 shadow-2xl p-4 sm:p-8 md:p-10 z-10"
            style={{ perspective: 1200 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              {/* Lado Esquerdo: Imagem da Plaquinha com Parallax 3D */}
              <div
                className="lg:col-span-6 flex justify-center items-center relative"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <div
                  ref={activeCardRef}
                  className="relative w-full max-w-[290px] sm:max-w-md aspect-square sm:aspect-[4/3] rounded-xl bg-[#0E101D] border border-white/10 p-3 sm:p-6 flex items-center justify-center shadow-2xl cursor-pointer group overflow-hidden"
                  onClick={() =>
                    onOpenModal({
                      src: currentItem.image,
                      name: currentItem.name,
                      category: currentItem.label,
                      description: currentItem.description,
                      alt: currentItem.alt,
                    })
                  }
                  title="Clique para ampliar a imagem em tela cheia"
                >
                  {/* High fidelity image preserved without distortion */}
                  <img
                    src={currentItem.image}
                    alt={currentItem.alt}
                    className="max-h-full max-w-full object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)] transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Top collection badge */}
                  <div className="absolute top-3 left-3 bg-black/80 px-2.5 py-1 rounded text-[10px] font-mono text-white/90 border border-white/10 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7357E8]" />
                    <span>
                      {currentItem.type === 'personalizada'
                        ? 'Projeto Personalizado'
                        : 'Modelo Padrão'}
                    </span>
                  </div>

                  {/* Expand button hint */}
                  <div className="absolute bottom-3 right-3 bg-black/70 p-2 rounded-lg text-white/80 group-hover:text-white group-hover:bg-[#7357E8] transition-all border border-white/10">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Lado Direito: Informações e Ações Comerciais */}
              <div ref={detailsRef} className="lg:col-span-6 flex flex-col justify-between text-left">
                <div>
                  {/* Category & Segment tag */}
                  <div className="flex items-center gap-2 mb-2 text-xs">
                    <span className="font-mono uppercase tracking-wider text-[#7357E8] font-semibold">
                      {currentItem.label}
                    </span>
                    {currentItem.segment && (
                      <>
                        <span className="text-white/30">·</span>
                        <span className="text-[#F7F7F5]/70">{currentItem.segment}</span>
                      </>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3 font-display">
                    {currentItem.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-[#F7F7F5]/75 leading-relaxed mb-6">
                    {currentItem.description}
                  </p>

                  {/* Feature badges (NFC + QR Code) */}
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    <div className="p-3 rounded-lg bg-white/5 border border-white/10 flex items-center gap-2.5">
                      <Radio className="w-4 h-4 text-[#7357E8] shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-white leading-none">Aproximação NFC</p>
                        <p className="text-[10px] text-[#F7F7F5]/50 mt-0.5">Chip NTAG Integrado</p>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-white/5 border border-white/10 flex items-center gap-2.5">
                      <QrCode className="w-4 h-4 text-[#7357E8] shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-white leading-none">QR Code Nítido</p>
                        <p className="text-[10px] text-[#F7F7F5]/50 mt-0.5">Alta Definição</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <a
                    href={getWhatsAppUrl(
                      `Olá! Gostaria de solicitar um orçamento para o modelo de plaquinha "${currentItem.name}".`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg text-sm font-semibold text-white bg-[#7357E8] hover:bg-[#6348d6] shadow-sm transition-all active:scale-98 whitespace-nowrap"
                  >
                    <span>Solicitar este modelo</span>
                    <ArrowUpRight className="w-4 h-4 text-white/90" />
                  </a>

                  <div className="flex items-center gap-3">
                    <a
                      href={getWhatsAppUrl(
                        `Olá! Gostaria de tirar dúvidas e consultar detalhes sobre o modelo "${currentItem.name}".`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs font-medium text-[#F7F7F5]/80 bg-white/5 hover:bg-white/10 hover:text-white border border-white/10 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
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
                      className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#F7F7F5]/80 hover:text-white border border-white/10 transition-colors"
                      title="Ampliar imagem"
                      aria-label="Ampliar imagem da plaquinha"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 px-2">
            {/* Numbered Indicator */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm font-bold text-white">
                {String(currentIndex + 1).padStart(2, '0')}
              </span>
              <span className="text-white/30">/</span>
              <span className="font-mono text-xs text-[#F7F7F5]/50">
                {String(totalItems).padStart(2, '0')}
              </span>

              {/* Autoplay Pause / Play toggle */}
              <button
                type="button"
                onClick={() => setIsAutoplayActive(!isAutoplayActive)}
                className="ml-3 p-1.5 rounded-md bg-white/5 hover:bg-white/10 text-[#F7F7F5]/60 hover:text-white transition-colors"
                title={isAutoplayActive ? 'Pausar reprodução automática' : 'Ativar reprodução automática'}
                aria-label={isAutoplayActive ? 'Pausar rotação' : 'Continuar rotação'}
              >
                {isAutoplayActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Pagination Dots */}
            <div className="flex items-center gap-1.5 flex-wrap justify-center">
              {filteredItems.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => goToIndex(dotIdx)}
                  className={`h-1.5 rounded-full transition-all duration-200 ${
                    dotIdx === currentIndex
                      ? 'w-6 bg-[#7357E8]'
                      : 'w-1.5 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Ir para modelo ${dotIdx + 1}`}
                  aria-current={dotIdx === currentIndex ? 'true' : 'false'}
                />
              ))}
            </div>

            {/* Previous and Next Navigation Buttons */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={goToPrev}
                disabled={isAnimating}
                className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white flex items-center justify-center transition-all duration-200 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed group focus:outline-none focus:ring-2 focus:ring-[#7357E8]"
                aria-label="Ver plaquinha anterior"
              >
                <ChevronLeft className="w-4 h-4 text-white/80 group-hover:text-white transition-colors" />
              </button>

              <button
                type="button"
                onClick={goToNext}
                disabled={isAnimating}
                className="w-10 h-10 rounded-lg bg-[#7357E8] hover:bg-[#6348d6] text-white flex items-center justify-center transition-all duration-200 shadow-sm active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed group focus:outline-none focus:ring-2 focus:ring-[#7357E8]"
                aria-label="Ver próxima plaquinha"
              >
                <ChevronRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Customization Callout Banner */}
        <div
          id="plaquinhas-personalizadas"
          className="mt-16 rounded-2xl bg-[#17192B] border border-white/10 p-7 sm:p-9 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl"
        >
          <div className="max-w-xl text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 font-display">
              Sua marca, sua identidade. Plaquinhas 100% personalizadas.
            </h3>
            <p className="text-xs sm:text-sm text-[#F7F7F5]/70 leading-relaxed">
              Envie sua logo e paleta de cores. Desenvolvemos o layout alinhado à sua identidade visual com aprovação prévia em mockup digital antes da produção.
            </p>
          </div>
          <a
            href={getWhatsAppUrl(
              'Olá! Tenho a logo da minha empresa e gostaria de solicitar um orçamento para uma plaquinha 100% personalizada com as minhas cores.'
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold text-white bg-[#7357E8] hover:bg-[#6348d6] shadow-sm transition-all whitespace-nowrap shrink-0 active:scale-98"
          >
            <span>Enviar logo para personalização</span>
            <ArrowUpRight className="w-4 h-4 text-white" />
          </a>
        </div>
      </div>
    </section>
  );
};
