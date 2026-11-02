import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { WORK_PROCESS_STEPS } from '../data/inovaData';

export const ProcessSection: React.FC = () => {
  return (
    <section id="processo" className="py-20 sm:py-28 lg:py-32 relative bg-[#0A0F2E] text-[#F7F8FC] border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mb-14">
          <span className="inline-block text-xs font-semibold text-[#8B5CF6] uppercase tracking-wider mb-2">
            Como trabalhamos
          </span>
          <h2
            className="text-[clamp(1.5rem,5.2vw,3rem)] font-extrabold text-white tracking-tight mb-4 font-display leading-[1.15]"
            style={{ textWrap: 'balance' }}
          >
            Da primeira conversa à entrega da solução.
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-[#F7F8FC]/75 leading-relaxed max-w-2xl font-normal">
            Etapas lineares, comunicação direta pelo WhatsApp e testes em cada fase para garantir produtos funcionais e sem falhas.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative">
          {WORK_PROCESS_STEPS.map((step, idx) => (
            <div
              key={idx}
              className="relative rounded-2xl bg-[#12183F] border border-white/[0.08] hover:border-[#8B5CF6]/50 p-5 sm:p-7 transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-black/20 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.08]">
                  <span className="w-10 h-10 rounded-xl bg-white/5 border border-white/[0.08] flex items-center justify-center font-bold text-sm text-[#8B5CF6] font-mono">
                    {step.step}
                  </span>
                  {idx < WORK_PROCESS_STEPS.length - 1 && (
                    <ArrowRight className="hidden lg:block w-4 h-4 text-white/30 group-hover:text-[#8B5CF6] group-hover:translate-x-1 transition-all" />
                  )}
                </div>

                <h3 className="text-lg font-bold text-white mb-2 font-display">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#F7F8FC]/70 leading-relaxed font-normal">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center gap-1.5 text-xs text-[#00C2FF] font-medium">
                <Check className="w-3.5 h-3.5" />
                <span>Etapa {idx + 1} de 4</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
