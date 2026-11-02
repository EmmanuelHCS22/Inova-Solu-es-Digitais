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
  });

  // MotionValue tracking continuous carousel position
  const progress = useMotionValue<number>(activeIndex);

  // Responsive dimensions updater
  const updateDimensions = useCallback(() => {
    if (typeof window === 'undefined') return;
    const w = window.innerWidth;
    if (w < 380) {
      // Small mobile (320px - 360px)
      setDimensions({
        activeWidth: Math.max(210, w - 76),
        activeHeight: 285,
        restWidth: 110,
        restHeight: 160,
        gap: 8,
      });
    } else if (w < 640) {
      // Standard mobile (375px - 430px)
      setDimensions({
        activeWidth: Math.min(w - 80, 260),
        activeHeight: 330,
        restWidth: 140,
        restHeight: 190,
        gap: 12,
      });
    } else if (w < 1024) {
      // Tablet (640px - 768px - 1024px)
      setDimensions({
        activeWidth: 320,
        activeHeight: 400,
        restWidth: 200,
        restHeight: 260,
        gap: 20,
      });
    } else {
      // Desktop
      setDimensions({
        activeWidth: 380,
        activeHeight: 460,
        restWidth: 240,
        restHeight: 320,
        gap: 28,
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
      duration: 0.65,
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
    const minSwipeDistance = 40;

    // Horizontal swipe dominant
    if (Math.abs(deltaX) > Math.abs(deltaY) * 1.3 && Math.abs(deltaX) > minSwipeDistance) {
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
      className="relative w-full overflow-hidden select-none py-6 sm:py-8 focus:outline-none"
      style={{
        perspective: '1200px',
        touchAction: 'pan-y',
      }}
      aria-label="Coverflow 3D de Plaquinhas NFC"
    >
      {/* 3D Coverflow Stage */}
      <div
        className="relative mx-auto flex items-center justify-center"
        style={{
          height: `${dimensions.activeHeight + 50}px`,
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
          className="hidden sm:flex absolute left-2 sm:left-6 lg:left-10 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#0A0F2E]/80 hover:bg-[#8B5CF6] border border-white/15 text-white items-center justify-center transition-all duration-200 shadow-xl shadow-black/40 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed z-30 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
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
          className="hidden sm:flex absolute right-2 sm:right-6 lg:right-10 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#0A0F2E]/80 hover:bg-[#8B5CF6] border border-white/15 text-white items-center justify-center transition-all duration-200 shadow-xl shadow-black/40 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed z-30 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
          aria-label="Próxima plaquinha"
          title="Ver próxima plaquinha (Seta direita)"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Barra de Controles Dedicada Mobile (Elimina sobreposição na arte e garante toque $\ge 44$px) */}
      <div className="sm:hidden flex items-center justify-between gap-3 px-2 pt-2">
        <button
          type="button"
          onClick={() => activeIndex > 0 && onSelectIndex(activeIndex - 1)}
          disabled={activeIndex === 0}
          className="min-h-[44px] min-w-[44px] px-3.5 py-2.5 rounded-xl bg-[#0A0F2E] border border-white/15 text-white flex items-center justify-center transition-all active:scale-95 disabled:opacity-30"
          aria-label="Plaquinha anterior"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-xs font-medium ml-1">Anterior</span>
        </button>

        <span className="text-xs font-semibold text-white/70 font-mono tracking-wide">
          {activeIndex + 1} <span className="text-white/30">/</span> {items.length}
        </span>

        <button
          type="button"
          onClick={() => activeIndex < items.length - 1 && onSelectIndex(activeIndex + 1)}
          disabled={activeIndex === items.length - 1}
          className="min-h-[44px] min-w-[44px] px-3.5 py-2.5 rounded-xl bg-[#0A0F2E] border border-white/15 text-white flex items-center justify-center transition-all active:scale-95 disabled:opacity-30"
          aria-label="Próxima plaquinha"
        >
          <span className="text-xs font-medium mr-1">Próxima</span>
          <ChevronRight className="w-5 h-5" />
        </button>
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
  const { activeWidth, activeHeight, restWidth, gap } = dimensions;

  // Single MotionValue distance calculation
  const distance = useTransform(progress, (p) => index - p);

  // Horizontal position (x)
  const x = useTransform(distance, (d) => {
    const sign = Math.sign(d);
    const absD = Math.abs(d);
    if (absD === 0) return 0;

    const baseOffset = activeWidth / 2 + gap + restWidth / 2;
    if (absD <= 1) {
      return sign * absD * baseOffset;
    }
    // Deeper neighbors compressed along perspective line
    return sign * (baseOffset + (absD - 1) * (restWidth * 0.65 + gap));
  });

  // Scale: 1.0 at center, down to ~0.76 for immediate neighbors, ~0.64 for deeper ones
  const scale = useTransform(distance, (d) => {
    const absD = Math.abs(d);
    if (absD <= 1) {
      return 1 - absD * 0.22;
    }
    return Math.max(0.55, 0.78 - (absD - 1) * 0.12);
  });

  // 3D Rotation along Y-axis (tilted inward towards center)
  const rotateY = useTransform(distance, (d) => {
    const sign = Math.sign(d);
    const absD = Math.abs(d);
    return sign * -Math.min(38, absD * 32);
  });

  // Z-depth: active item is at 0, neighbors are recessed in 3D space
  const z = useTransform(distance, (d) => {
    const absD = Math.abs(d);
    return -absD * 110;
  });

  // Opacity: 1 at center, ~0.85 at d=1, ~0.45 at d=2, fades to 0 further out
  const opacity = useTransform(distance, (d) => {
    const absD = Math.abs(d);
    if (absD <= 1) {
      return 1 - absD * 0.15;
    }
    return Math.max(0, 0.85 - (absD - 1) * 0.45);
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
      <div className="relative w-full h-full flex flex-col items-center justify-center p-3 sm:p-5 rounded-3xl bg-[#12183F]/90 border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.65)] backdrop-blur-md overflow-hidden transition-all duration-300 group">
        
        {/* Active Item Color Ambient Glow behind image */}
        {isActive && (
          <div
            className="absolute inset-0 pointer-events-none opacity-50 blur-2xl transition-colors duration-700"
            style={{
              background: `radial-gradient(circle at center, ${item.accentGlow} 0%, transparent 70%)`,
            }}
            aria-hidden="true"
          />
        )}

        {/* Acrylic Contact Reflection on Floor */}
        <div
          className="absolute bottom-2 w-3/4 h-6 rounded-full blur-lg pointer-events-none transition-all duration-700"
          style={{
            background: `radial-gradient(ellipse, ${item.primaryColor} 0%, rgba(0,0,0,0.8) 70%, transparent 100%)`,
            opacity: isActive ? 0.75 : 0.35,
          }}
          aria-hidden="true"
        />

        {/* The Authentic Product Photograph (Clean, uncropped with object-fit: contain) */}
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            src={item.image}
            alt={item.alt}
            className="max-h-full max-w-full object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.7)] transition-transform duration-500 group-hover:scale-105"
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
            className="absolute top-3 right-3 p-2 rounded-xl bg-[#0A0F2E]/80 hover:bg-[#8B5CF6] text-white/80 hover:text-white border border-white/10 transition-all shadow-md active:scale-95 z-20"
            title="Ampliar fotografia em alta resolução"
            aria-label="Ampliar fotografia em alta resolução"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        )}

        {/* Plaque Type Badge on Active Card */}
        {isActive && (
          <div className="absolute bottom-3 left-3 z-20">
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
          <div className="absolute inset-0 bg-black/25 hover:bg-black/10 transition-colors pointer-events-none rounded-3xl" />
        )}
      </div>
    </motion.div>
  );
};
