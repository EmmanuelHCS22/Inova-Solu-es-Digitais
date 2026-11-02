import React from 'react';
import { Palette, Zap, Radio, Users } from 'lucide-react';
import { AscendingTitleReveal } from './AscendingTitleReveal';

export const WhyChooseUs: React.FC = () => {
  const differentials = [
    {
      num: '01',
      title: 'Produtos personalizados',
      desc: 'Plaquinhas em acrílico e materiais produzidos com o logotipo e as cores do seu negócio.',
      icon: <Palette className="w-5 h-5 text-[#8B5CF6]" />,
      badgeColor: 'border-[#8B5CF6]/30 bg-[#8B5CF6]/10',
    },
    {
      num: '02',
      title: 'Impressão 3D e NFC',
      desc: 'Chaveiros duráveis em manufatura aditiva 3D e chips NFC de leitura instantânea sem necessidade de app.',
      icon: <Radio className="w-5 h-5 text-[#00C2FF]" />,
      badgeColor: 'border-[#00C2FF]/30 bg-[#00C2FF]/10',
    },
    {
      num: '03',
      title: 'Conexão físico-digital',
      desc: 'Facilidade para seus clientes avaliarem no Google, pagarem por Pix e agendarem horários em segundos.',
      icon: <Zap className="w-5 h-5 text-[#6366F1]" />,
      badgeColor: 'border-[#6366F1]/30 bg-[#6366F1]/10',
    },
    {
      num: '04',
      title: 'Atendimento consultivo',
      desc: 'Contato direto e transparente pelo WhatsApp para tirar dúvidas, alinhar detalhes e acompanhar seu pedido.',
      icon: <Users className="w-5 h-5 text-[#8B5CF6]" />,
      badgeColor: 'border-[#8B5CF6]/30 bg-[#8B5CF6]/10',
    },
  ];

  return (
    <section id="diferenciais" className="py-20 sm:py-28 relative bg-[#0A0F2E] text-[#F7F8FC] border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mb-14">
          <span className="inline-block text-xs font-semibold text-[#8B5CF6] uppercase tracking-wider mb-2">
            Por que escolher a Inova
          </span>
          <AscendingTitleReveal
            as="h2"
            lines={[
              "Tecnologia física e digital",
              "trabalhando juntas."
            ]}
            className="text-[clamp(1.5rem,5.2vw,3rem)] font-extrabold text-white tracking-tight mb-4 font-display leading-[1.15]"
          />
          <p className="text-sm sm:text-base lg:text-lg text-[#F7F8FC]/75 leading-relaxed max-w-2xl font-normal">
            Unimos materiais físicos de alta durabilidade a soluções digitais práticas que tornam o contato com seus clientes mais rápido e profissional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {differentials.map((diff, index) => (
            <div
              key={index}
              className="group rounded-2xl bg-[#12183F] border border-white/[0.08] hover:border-[#8B5CF6]/50 p-7 transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-black/20 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.08]">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${diff.badgeColor}`}>
                    {diff.icon}
                  </div>
                  <span className="text-sm font-semibold text-[#F7F8FC]/40 font-mono">
                    {diff.num}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-[#8B5CF6] transition-colors font-display">
                  {diff.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#F7F8FC]/70 leading-relaxed font-normal">
                  {diff.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
