import React, { useState } from 'react';
import { ArrowUpRight, Maximize2, Sparkles, Send } from 'lucide-react';
import { CUSTOM_PLAQUES, CUSTOM_PLAQUES_FILTERS, getWhatsAppUrl } from '../data/inovaData';
import { CustomPlaque } from '../types';

interface CustomPlaquesProps {
  onOpenModal: (image: { src: string; name: string; category?: string; description?: string; alt: string }) => void;
}

export const CustomPlaques: React.FC<CustomPlaquesProps> = ({ onOpenModal }) => {
  const [activeFilter, setActiveFilter] = useState<string>('todos');

  const filteredPlaques = CUSTOM_PLAQUES.filter((item) => {
    if (activeFilter === 'todos') return true;
    return item.categories.includes(activeFilter);
  });

  return (
    <section id="plaquinhas-personalizadas" className="py-24 relative bg-gradient-to-b from-[#0A0F2E] via-[#0E153E] to-[#0A0F2E] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 text-xs font-semibold text-[#22D3EE] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Identidade Visual Exclusiva</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4" style={{ textWrap: 'balance' }}>
            Sua marca, seu estilo.
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Envie sua logo e suas preferências para solicitar uma plaquinha desenvolvida de acordo com a identidade do seu negócio.
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-10 gap-2 no-scrollbar">
          {CUSTOM_PLAQUES_FILTERS.map((filt: { id: string; label: string }) => (
            <button
              key={filt.id}
              type="button"
              onClick={() => setActiveFilter(filt.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap shrink-0 ${
                activeFilter === filt.id
                  ? 'bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] text-white shadow-md shadow-[#8B5CF6]/30'
                  : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              {filt.label}
            </button>
          ))}
        </div>

        {/* Reference Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredPlaques.map((plaque: CustomPlaque) => (
            <div
              key={plaque.id}
              className="group rounded-3xl bg-[#0F1642]/80 border border-white/10 hover:border-[#8B5CF6]/50 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 shadow-xl shadow-black/30 backdrop-blur-sm"
            >
              {/* Image Frame */}
              <div
                className="relative bg-[#0A0F2E] aspect-[4/3] flex items-center justify-center p-4 overflow-hidden cursor-pointer"
                onClick={() =>
                  onOpenModal({
                    src: plaque.image,
                    name: plaque.name,
                    category: `${plaque.segment} • ${plaque.label}`,
                    description: plaque.description,
                    alt: plaque.alt,
                  })
                }
              >
                <img
                  src={plaque.image}
                  alt={plaque.alt}
                  loading="lazy"
                  className="max-h-full max-w-full object-contain rounded-xl transition-transform duration-500 group-hover:scale-105"
                />
                {/* Reference Tag Badge */}
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono text-slate-300 border border-white/10">
                  Projeto de Referência
                </div>
                {/* Zoom hint */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-semibold backdrop-blur-xs">
                  <Maximize2 className="w-4 h-4 text-[#22D3EE]" />
                  <span>Ver em tela cheia</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#22D3EE]">
                      {plaque.segment}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {plaque.label}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {plaque.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                    {plaque.description}
                  </p>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-white/10">
                  <a
                    href={getWhatsAppUrl(`Olá! Vi o projeto de referência "${plaque.name}" e gostaria de solicitar uma plaquinha personalizada com as cores da minha empresa.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] hover:from-[#7c3aed] hover:to-[#4f46e5] shadow-md shadow-[#8B5CF6]/20 transition-all active:scale-95"
                  >
                    <span>Solicitar personalização</span>
                    <ArrowUpRight className="w-4 h-4 text-[#22D3EE]" />
                  </a>

                  <button
                    type="button"
                    onClick={() =>
                      onOpenModal({
                        src: plaque.image,
                        name: plaque.name,
                        category: `${plaque.segment} • ${plaque.label}`,
                        description: plaque.description,
                        alt: plaque.alt,
                      })
                    }
                    className="w-full text-center text-xs font-medium text-slate-400 hover:text-white py-1 transition-colors"
                  >
                    Visualizar detalhes
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Customization Callout banner */}
        <div className="rounded-3xl bg-gradient-to-r from-[#141C52] via-[#1E297A] to-[#141C52] border border-white/15 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="max-w-xl text-center md:text-left">
            <h3 className="text-2xl font-bold text-white mb-2">
              Quer uma peça exclusiva com a identidade da sua marca?
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Você nos envia seu logotipo em alta resolução e preferências de cor. Nós desenvolvemos uma prévia digital para sua aprovação antes da confecção.
            </p>
          </div>
          <a
            href={getWhatsAppUrl('Olá! Tenho a logo da minha empresa e gostaria de solicitar um orçamento para uma plaquinha 100% personalizada.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] shadow-lg shadow-purple-500/25 hover:brightness-110 active:scale-95 transition-all whitespace-nowrap shrink-0"
          >
            <Send className="w-4 h-4 text-white" />
            <span>Enviar minha logo pelo WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};
