import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { getWhatsAppUrl, INOVA_CONTACT } from '../data/inovaData';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <aside aria-label="Atendimento rápido" className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-40 flex items-end flex-col gap-2 pointer-events-auto">
      {/* Tooltip prompt */}
      {showTooltip && (
        <div className="relative bg-[#111321] border border-white/10 text-white rounded-xl p-2.5 sm:p-3 shadow-2xl max-w-[240px] sm:max-w-xs text-xs animate-in fade-in slide-in-from-bottom-2 duration-300">
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
            <p className="text-[10px] sm:text-[11px] text-[#F7F7F5]/70">
              Fale direto com a Inova pelo WhatsApp.
            </p>
          </div>
          {/* Pointer tail */}
          <div className="absolute -bottom-1.5 right-5 sm:right-6 w-3 h-3 bg-[#111321] border-r border-b border-white/10 rotate-45" />
        </div>
      )}

      {/* WhatsApp Action Button */}
      <a
        href={getWhatsAppUrl('Olá! Estou no site da Inova Soluções Digitais e gostaria de solicitar um orçamento.')}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-emerald-400/40 relative group"
        aria-label="Abrir conversa no WhatsApp com Inova Soluções Digitais"
      >
        <span className="sr-only">Falar no WhatsApp com a Inova</span>
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-white text-emerald-500" />
      </a>
    </aside>
  );
};
