import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { getWhatsAppUrl, INOVA_CONTACT } from '../data/inovaData';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 7000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <aside
      aria-label="Atendimento rápido"
      className="fixed right-3 sm:right-6 z-40 flex items-end flex-col gap-2 pointer-events-auto"
      style={{ bottom: 'max(1rem, env(safe-area-inset-bottom))' }}
    >
      {/* Tooltip prompt */}
      {showTooltip && (
        <div className="relative bg-[#0A0F2E] border border-white/[0.08] text-[#F7F8FC] rounded-xl p-2.5 sm:p-3 shadow-2xl max-w-[190px] xs:max-w-[230px] sm:max-w-xs text-xs animate-in fade-in slide-in-from-bottom-2 duration-300">
          <button
            type="button"
            onClick={() => setShowTooltip(false)}
            className="absolute top-2 right-2 text-white/50 hover:text-white"
            aria-label="Fechar mensagem de WhatsApp"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="pr-4">
            <p className="font-bold text-white mb-0.5 text-xs">Precisa de ajuda ou orçamento?</p>
            <p className="text-[10px] sm:text-[11px] text-[#F7F8FC]/70">
              Fale direto com a Inova pelo WhatsApp.
            </p>
          </div>
          {/* Pointer tail */}
          <div className="absolute -bottom-1.5 right-5 sm:right-6 w-3 h-3 bg-[#0A0F2E] border-r border-b border-white/[0.08] rotate-45" />
        </div>
      )}

      {/* WhatsApp Action Button */}
      <a
        href={getWhatsAppUrl('Olá! Estou no site da Inova Soluções Digitais e gostaria de solicitar um orçamento.')}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/45 transition-all duration-300 hover:scale-105 hover:-translate-y-1 active:scale-95 active:translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-emerald-400/40 relative group"
        aria-label="Abrir conversa no WhatsApp com Inova Soluções Digitais"
      >
        <span className="sr-only">Falar no WhatsApp com a Inova</span>
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-white text-emerald-500 group-hover:scale-110 transition-transform duration-300" />
      </a>
    </aside>
  );
};
