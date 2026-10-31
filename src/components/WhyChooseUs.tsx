import React from 'react';
import { Palette, Zap, Radio, Users } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const differentials = [
    {
      num: '01',
      title: 'Produtos personalizados',
      desc: 'Plaquinhas em acrílico e materiais produzidos com o logotipo e as cores do seu negócio.',
      icon: <Palette className="w-5 h-5 text-[#8B5CF6]" />,
    },
    {
      num: '02',
      title: 'Impressão 3D e NFC',
      desc: 'Chaveiros duráveis em manufatura aditiva 3D e chips NFC de leitura instantânea sem necessidade de app.',
      icon: <Radio className="w-5 h-5 text-[#8B5CF6]" />,
    },
    {
      num: '03',
      title: 'Conexão físico-digital',
      desc: 'Facilidade para seus clientes avaliarem no Google, pagarem por Pix e agendarem horários em segundos.',
      icon: <Zap className="w-5 h-5 text-[#8B5CF6]" />,
    },
    {
      num: '04',
      title: 'Atendimento consultivo',
      desc: 'Contato direto e transparente pelo WhatsApp para tirar dúvidas, alinhar detalhes e acompanhar seu pedido.',
      icon: <Users className="w-5 h-5 text-[#8B5CF6]" />,
    },
  ];

  return (
    <section id="diferenciais" className="py-20 sm:py-28 relative bg-[#111321] text-[#F7F7F5] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mb-14">
          <h2
            className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4 font-display leading-[1.12]"
            style={{ textWrap: 'balance' }}
          >
            Tecnologia física e digital trabalhando juntas.
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-[#F7F7F5]/75 leading-relaxed max-w-2xl font-normal">
            Unimos materiais físicos de alta durabilidade a soluções digitais práticas que tornam o contato com seus clientes mais rápido e profissional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {differentials.map((diff, index) => (
            <div
              key={index}
              className="group rounded-2xl bg-[#181B2E] border border-white/10 p-7 transition-all duration-300 hover:-translate-y-1 shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                    {diff.icon}
                  </div>
                  <span className="text-sm font-semibold text-white/40">
                    {diff.num}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-[#8B5CF6] transition-colors font-display">
                  {diff.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#F7F7F5]/70 leading-relaxed font-normal">
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
