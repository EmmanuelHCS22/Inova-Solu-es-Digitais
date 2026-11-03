import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useTransform, animate, MotionValue } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { ProductExperienceItem } from '../data/inovaData';

interface CoverflowCarouselProps {
  items: ProductExperienceItem[];
  activeIndex: number;
  onSelectIndex: (index: number) => void;
  onOpenModal: (image: {
    src: string;
    name: string;
    category?: string;
    description?: string;
    alt: string;
  }) => void;
}

interface Dimensions {
  activeWidth: number;
  activeHeight: number;
  restWidth: number;
  restHeight: number;
  gap: number;
  isMobile: boolean;
}

export const CoverflowCarousel: React.FC<CoverflowCarouselProps> = ({
  items,
  activeIndex,
  onSelectIndex,
  onOpenModal,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<Dimensions>({
    activeWidth: 380,
    activeHeight: 460,
    restWidth: 240,
    restHeight: 320,
    gap: 28,
    isMobile: false,
  });

  // MotionValue tracking continuous carousel position
  const progress = useMotionValue<number>(activeIndex);

  // Responsive dimensions updater calibrated for 320px, 360px, 375px, 390px, 414px, 430px and desktop
  const updateDimensions = useCallback(() => {
    if (typeof window === 'undefined') return;
    const w = window.innerWidth;

    if (w < 360) {
      // 320px - 359px (Ultra-compact mobile)
      setDimensions({
        activeWidth: 200,
        activeHeight: 265,
        restWidth: 72,
        restHeight: 110,
        gap: 6,
        isMobile: true,
      });
    } else if (w < 400) {
      // 360px - 399px (Standard mobile: 360, 375, 390)
      const aw = Math.min(235, Math.round(w * 0.62));
      setDimensions({
        activeWidth: aw,
        activeHeight: Math.round(aw * 1.32),
        restWidth: Math.round(aw * 0.40),
        restHeight: Math.round(aw * 0.60),
        gap: 8,
        isMobile: true,
      });
    } else if (w < 640) {
      // 400px - 639px (Large mobile: 414, 430)
      const aw = Math.min(265, Math.round(w * 0.62));
      setDimensions({
        activeWidth: aw,
        activeHeight: Math.round(aw * 1.30),
        restWidth: Math.round(aw * 0.42),
        restHeight: Math.round(aw * 0.62),
        gap: 10,
        isMobile: true,
      });
    } else if (w < 1024) {
      // Tablet (640px - 1023px)
      setDimensions({
        activeWidth: 320,
        activeHeight: 400,
        restWidth: 200,
        restHeight: 260,
        gap: 20,
        isMobile: false,
      });
    } else {
      // Desktop (>= 1024px)
      setDimensions({
        activeWidth: 380,
        activeHeight: 460,
        restWidth: 240,
        restHeight: 320,
        gap: 28,
        isMobile: false,
      });
    }
  }, []);

  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [updateDimensions]);

  // Animate progress smoothly when activeIndex changes
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      progress.set(activeIndex);
      return;
    }

    const controls = animate(progress, activeIndex, {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1], // Cinematic smooth cubic deceleration
    });

    return () => controls.stop();
  }, [activeIndex, progress]);

  // Touch gesture tracking for mobile swipe
  const touchStartXRef = useRef<number>(0);
  const touchStartYRef = useRef<number>(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaX = touchStartXRef.current - e.changedTouches[0].clientX;
    const deltaY = touchStartYRef.current - e.changedTouches[0].clientY;
    const minSwipeDistance = 35;

    // Horizontal swipe dominant
    if (Math.abs(deltaX) > Math.abs(deltaY) * 1.2 && Math.abs(deltaX) > minSwipeDistance) {
      if (deltaX > 0 && activeIndex < items.length - 1) {
        onSelectIndex(activeIndex + 1);
      } else if (deltaX < 0 && activeIndex > 0) {
        onSelectIndex(activeIndex - 1);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' && activeIndex < items.length - 1) {
      onSelectIndex(activeIndex + 1);
    } else if (e.key === 'ArrowLeft' && activeIndex > 0) {
      onSelectIndex(activeIndex - 1);
    }
  };

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full overflow-hidden select-none py-2 sm:py-6 focus:outline-none"
      style={{
        perspective: '1200px',
        touchAction: 'pan-y',
      }}
      aria-label="Coverflow de Plaquinhas NFC e Artes Personalizadas"
    >
      {/* 1. Arte Principal (3D Coverflow Stage) */}
      <div
        className="relative mx-auto flex items-center justify-center overflow-hidden"
        style={{
          height: `${dimensions.activeHeight + (dimensions.isMobile ? 12 : 36)}px`,
          transformStyle: 'preserve-3d',
        }}
      >
        {items.map((item, index) => (
          <CoverflowCard
            key={item.id}
            item={item}
            index={index}
            progress={progress}
            isActive={index === activeIndex}
            dimensions={dimensions}
            onSelect={() => onSelectIndex(index)}
            onOpenModal={onOpenModal}
          />
        ))}

        {/* Navigation Arrow Left (Tablet & Desktop only) */}
        <button
          type="button"
          onClick={() => activeIndex > 0 && onSelectIndex(activeIndex - 1)}
          disabled={activeIndex === 0}
          className="hidden sm:flex absolute left-2 sm:left-4 lg:left-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#0A0F2E]/85 hover:bg-[#8B5CF6] border border-white/15 text-white items-center justify-center transition-all duration-200 shadow-xl shadow-black/40 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed z-30 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] cursor-pointer"
          aria-label="Plaquinha anterior"
          title="Ver plaquinha anterior (Seta esquerda)"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>

        {/* Navigation Arrow Right (Tablet & Desktop only) */}
        <button
          type="button"
          onClick={() => activeIndex < items.length - 1 && onSelectIndex(activeIndex + 1)}
          disabled={activeIndex === items.length - 1}
          className="hidden sm:flex absolute right-2 sm:right-4 lg:right-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#0A0F2E]/85 hover:bg-[#8B5CF6] border border-white/15 text-white items-center justify-center transition-all duration-200 shadow-xl shadow-black/40 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed z-30 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] cursor-pointer"
          aria-label="Próxima plaquinha"
          title="Ver próxima plaquinha (Seta direita)"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* ÁREA INDEPENDENTE DE CONTROLES NO MOBILE:
          2. Indicador de posição (ex: 10 / 11)
          3. Botões Anterior e Próxima, lado a lado
          Garante z-index correto, sem sobreposição por fotos laterais e distante do botão flutuante
      */}
      <div className="sm:hidden relative z-30 flex flex-col items-center justify-center pt-2 pb-1 gap-2.5">
        {/* 2. Indicador de Quantidade / Posição */}
        <div className="inline-flex items-center px-3 py-0.5 rounded-full bg-white/[0.06] border border-white/10 text-xs font-semibold text-white/80 font-mono tracking-wider shadow-sm">
          <span className="text-white font-bold">{activeIndex + 1}</span>
          <span className="text-white/30 mx-1.5">/</span>
          <span className="text-white/60">{items.length}</span>
        </div>

        {/* 3. Botões Anterior e Próxima (Lado a Lado) */}
        <div className="flex items-center justify-center gap-3 w-full max-w-[270px]">
          <button
            type="button"
            onClick={() => activeIndex > 0 && onSelectIndex(activeIndex - 1)}
            disabled={activeIndex === 0}
            className="flex-1 min-h-[46px] px-4 py-2.5 rounded-xl bg-[#0A0F2E] hover:bg-[#161E4E] border border-white/15 active:border-[#8B5CF6] text-white flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed shadow-md cursor-pointer select-none"
            aria-label="Arte anterior"
          >
            <ChevronLeft className="w-4 h-4 text-white shrink-0" />
            <span className="text-xs font-semibold">Anterior</span>
          </button>

          <button
            type="button"
            onClick={() => activeIndex < items.length - 1 && onSelectIndex(activeIndex + 1)}
            disabled={activeIndex === items.length - 1}
            className="flex-1 min-h-[46px] px-4 py-2.5 rounded-xl bg-[#0A0F2E] hover:bg-[#161E4E] border border-white/15 active:border-[#8B5CF6] text-white flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed shadow-md cursor-pointer select-none"
            aria-label="Próxima arte"
          >
            <span className="text-xs font-semibold">Próxima</span>
            <ChevronRight className="w-4 h-4 text-white shrink-0" />
          </button>
        </div>
      </div>
    </div>
  );
};

interface CoverflowCardProps {
  item: ProductExperienceItem;
  index: number;
  progress: MotionValue<number>;
  isActive: boolean;
  dimensions: Dimensions;
  onSelect: () => void;
  onOpenModal: (image: {
    src: string;
    name: string;
    category?: string;
    description?: string;
    alt: string;
  }) => void;
}

const CoverflowCard: React.FC<CoverflowCardProps> = ({
  item,
  index,
  progress,
  isActive,
  dimensions,
  onSelect,
  onOpenModal,
}) => {
  const { activeWidth, activeHeight, restWidth, gap, isMobile } = dimensions;

  // Single MotionValue distance calculation
  const distance = useTransform(progress, (p) => index - p);

  // Horizontal position (x)
  const x = useTransform(distance, (d) => {
    const sign = Math.sign(d);
    const absD = Math.abs(d);
    if (absD === 0) return 0;

    // On mobile, compact neighbor offset keeps side cards tasteful without edge spill or button blocking
    const baseOffset = isMobile
      ? activeWidth * 0.44 + restWidth * 0.36 + gap
      : activeWidth / 2 + gap + restWidth / 2;

    if (absD <= 1) {
      return sign * absD * baseOffset;
    }
    // Deeper neighbors compressed along perspective line
    return sign * (baseOffset + (absD - 1) * (restWidth * (isMobile ? 0.45 : 0.65) + gap));
  });

  // Scale: 1.0 at center, controlled scaling for neighbors
  const scale = useTransform(distance, (d) => {
    const absD = Math.abs(d);
    if (absD === 0) return 1;
    const neighborScale = isMobile ? 0.70 : 0.78;
    if (absD <= 1) {
      return 1 - absD * (1 - neighborScale);
    }
    return Math.max(0.48, neighborScale - (absD - 1) * 0.12);
  });

  // 3D Rotation along Y-axis (tilted inward towards center)
  const rotateY = useTransform(distance, (d) => {
    const sign = Math.sign(d);
    const absD = Math.abs(d);
    const maxRot = isMobile ? 24 : 38;
    const rotSpeed = isMobile ? 20 : 32;
    return sign * -Math.min(maxRot, absD * rotSpeed);
  });

  // Z-depth: active item is at 0, neighbors are recessed in 3D space
  const z = useTransform(distance, (d) => {
    const absD = Math.abs(d);
    return -absD * (isMobile ? 70 : 110);
  });

  // Opacity: 1 at center, clean depth cue on neighbors, fades beyond 2 steps
  const opacity = useTransform(distance, (d) => {
    const absD = Math.abs(d);
    if (absD === 0) return 1;
    if (absD <= 1) {
      return 1 - absD * (isMobile ? 0.35 : 0.15);
    }
    return Math.max(0, (isMobile ? 0.65 : 0.85) - (absD - 1) * 0.5);
  });

  // Z-index: active card always on top, left and right stack naturally behind
  const zIndex = useTransform(distance, (d) => {
    const absD = Math.abs(d);
    return Math.max(1, 100 - Math.round(absD * 10));
  });

  return (
    <motion.div
      onClick={onSelect}
      style={{
        x,
        scale,
        rotateY,
        z,
        opacity,
        zIndex,
        width: `${activeWidth}px`,
        height: `${activeHeight}px`,
        position: 'absolute',
        transformStyle: 'preserve-3d',
        willChange: 'transform, opacity',
      }}
      className={`flex items-center justify-center ${
        !isActive ? 'cursor-pointer hover:brightness-110' : ''
      }`}
    >
      {/* Moldura de Acabamento Visual:
          No mobile: padding fino (p-1.5), rounded-2xl proporcional, borda elegante.
          No desktop: padding espaçoso (sm:p-4) e rounded-3xl preservado.
      */}
      <div className="relative w-full h-full flex flex-col items-center justify-center p-1.5 sm:p-4 rounded-2xl sm:rounded-3xl bg-[#12183F]/90 border border-white/[0.12] shadow-[0_15px_35px_rgba(0,0,0,0.6)] backdrop-blur-md overflow-hidden transition-all duration-300 group">
        
        {/* Active Item Color Ambient Glow behind image */}
        {isActive && (
          <div
            className="absolute inset-0 pointer-events-none opacity-40 blur-xl transition-colors duration-700"
            style={{
              background: `radial-gradient(circle at center, ${item.accentGlow} 0%, transparent 70%)`,
            }}
            aria-hidden="true"
          />
        )}

        {/* Acrylic Contact Reflection on Floor */}
        <div
          className="absolute bottom-1 w-3/4 h-4 rounded-full blur-md pointer-events-none transition-all duration-700"
          style={{
            background: `radial-gradient(ellipse, ${item.primaryColor} 0%, rgba(0,0,0,0.8) 70%, transparent 100%)`,
            opacity: isActive ? 0.65 : 0.25,
          }}
          aria-hidden="true"
        />

        {/* The Authentic Product Photograph (Clean, uncropped with object-fit: contain) */}
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            src={item.image}
            alt={item.alt}
            className="max-h-full max-w-full object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.65)] transition-transform duration-500 group-hover:scale-105"
            loading="eager"
          />
        </div>

        {/* Zoom Button on Active Card */}
        {isActive && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenModal({
                src: item.image,
                name: item.name,
                category: item.label,
                description: item.description,
                alt: item.alt,
              });
            }}
            className="absolute top-2 right-2 sm:top-3 sm:right-3 p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-[#0A0F2E]/85 hover:bg-[#8B5CF6] text-white/90 hover:text-white border border-white/10 transition-all shadow-md active:scale-95 z-20 cursor-pointer"
            title="Ampliar fotografia em alta resolução"
            aria-label="Ampliar fotografia em alta resolução"
          >
            <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        )}

        {/* Plaque Type Badge on Active Card (Preserved on Desktop; on mobile it is featured in Section 4 below controls) */}
        {isActive && (
          <div className="hidden sm:block absolute bottom-3 left-3 z-20">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#0A0F2E]/85 border border-white/10 text-[11px] font-semibold text-white/90 shadow-md">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: item.primaryColor }}
              />
              <span>{item.type === 'personalizada' ? 'Arte Personalizada' : 'Arte Padrão Inova'}</span>
            </span>
          </div>
        )}

        {/* Subtle glass reflection overlay for side cards */}
        {!isActive && (
          <div className="absolute inset-0 bg-black/25 hover:bg-black/10 transition-colors pointer-events-none rounded-2xl sm:rounded-3xl" />
        )}
      </div>
    </motion.div>
  );
};
