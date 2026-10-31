import React, { useState } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { FAQ_DATA, getWhatsAppUrl } from '../data/inovaData';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-28 relative bg-[#F5F4F0] border-t border-black/8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7357E8]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#171923]/70 font-semibold">
              DÚVIDAS FREQUENTES
            </span>
          </div>
          <h2
            className="text-3xl sm:text-5xl font-extrabold text-[#171923] tracking-tight mb-4 font-display"
            style={{ textWrap: 'balance' }}
          >
            Perguntas Frequentes
          </h2>
          <p className="text-base sm:text-lg text-[#171923]/70 leading-relaxed font-normal">
            Respostas diretas e transparentes sobre nossos sites, produtos NFC, materiais de design e prazos de entrega.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {FAQ_DATA.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-xl bg-white border border-black/8 overflow-hidden transition-all shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(index)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 text-[#171923] hover:text-[#7357E8] transition-colors focus:outline-none focus:ring-2 focus:ring-[#7357E8]/30"
                >
                  <span className="text-sm sm:text-base font-bold leading-snug">
                    {item.question}
                  </span>
                  <div className={`p-1 rounded-md shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#7357E8]' : 'text-[#171923]/40'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-[#171923]/75 leading-relaxed border-t border-black/5 animate-in fade-in duration-150">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer help prompt */}
        <div className="mt-12 p-6 rounded-xl bg-white border border-black/8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <p className="text-sm font-bold text-[#171923]">Ficou com alguma dúvida específica?</p>
            <p className="text-xs text-[#171923]/60">Nossa equipe atende diretamente pelo canal oficial no WhatsApp.</p>
          </div>
          <a
            href={getWhatsAppUrl('Olá! Tenho uma dúvida sobre os serviços da Inova que não encontrei no site.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold text-white bg-[#111321] hover:bg-[#7357E8] transition-all whitespace-nowrap active:scale-98 shadow-sm"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Tirar dúvidas pelo WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};
