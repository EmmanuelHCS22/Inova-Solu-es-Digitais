import React, { useState } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { FAQ_DATA, getWhatsAppUrl } from '../data/inovaData';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 sm:py-28 lg:py-32 relative bg-[#F5F4F0] border-t border-black/[0.08] text-[#0A0F2E]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="inline-block text-xs font-semibold text-[#8B5CF6] uppercase tracking-wider mb-2">
            Perguntas Frequentes
          </span>
          <h2
            className="text-[clamp(1.5rem,5.2vw,3rem)] font-extrabold text-[#0A0F2E] tracking-tight mb-4 font-display leading-[1.15]"
            style={{ textWrap: 'balance' }}
          >
            Dúvidas comuns sobre nossos produtos e soluções.
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-[#0A0F2E]/75 leading-relaxed font-normal">
            Respostas claras sobre funcionamento do NFC, compatibilidade de smartphones, chaveiros 3D, plaquinhas, BioSites e agendamento online.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {FAQ_DATA.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl bg-white border border-black/[0.08] overflow-hidden transition-all shadow-sm hover:border-[#8B5CF6]/40"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(index)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-4 sm:p-6 flex items-start justify-between gap-3 text-[#0A0F2E] hover:text-[#8B5CF6] transition-colors focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/30 cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-bold leading-snug">
                    {item.question}
                  </span>
                  <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#8B5CF6] bg-[#8B5CF6]/10' : 'text-[#0A0F2E]/40 bg-black/5'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-6 pb-5 sm:pb-6 pt-1 text-xs sm:text-sm text-[#0A0F2E]/75 leading-relaxed border-t border-black/5 animate-in fade-in duration-150">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Help Prompt */}
        <div className="mt-10 sm:mt-12 p-5 sm:p-8 rounded-2xl bg-white border border-black/[0.08] shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="text-left">
            <p className="text-sm sm:text-base font-bold text-[#0A0F2E]">Ficou com alguma dúvida específica?</p>
            <p className="text-xs text-[#0A0F2E]/65 mt-0.5">Nossa equipe atende diretamente pelo WhatsApp oficial da Inova.</p>
          </div>
          <a
            href={getWhatsAppUrl('Olá! Tenho uma dúvida sobre os produtos e serviços da Inova que gostaria de esclarecer.')}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#0A0F2E] hover:bg-[#8B5CF6] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-[#8B5CF6]/30 active:scale-[0.97] active:translate-y-0.5 whitespace-nowrap shadow-sm min-h-[44px] w-full sm:w-auto"
          >
            <MessageCircle className="w-4 h-4 text-[#00C2FF] group-hover:scale-110 transition-transform duration-200" />
            <span>Tirar dúvidas pelo WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};
