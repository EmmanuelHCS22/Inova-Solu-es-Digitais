import React from 'react';

export const WhyChooseUs: React.FC = () => {
  const differentials = [
    {
      title: 'Produtos personalizados',
      tag: 'Identidade visual',
      desc: 'Plaquinhas em acrílico produzidas com as cores, logotipo e identidade visual do seu negócio para destacar o balcão.',
      accent: '#8B5CF6',
    },
    {
      title: 'Impressão 3D e tecnologia NFC',
      tag: 'Manufatura aditiva',
      desc: 'Chaveiros duráveis e microchips NFC de aproximação instantânea. O cliente encosta o celular e acessa seus canais sem app.',
      accent: '#00C2FF',
    },
    {
      title: 'Conexão físico-digital',
      tag: 'Jornada ágil',
      desc: 'Aproximação direta para avaliações 5 estrelas no Google, pagamentos via Pix e agendamento online no ponto de venda.',
      accent: '#6366F1',
    },
    {
      title: 'Atendimento consultivo',
      tag: 'Contato direto',
      desc: 'Contato transparente pelo WhatsApp, tirando dúvidas e enviando prévia digital para sua aprovação antes da fabricação.',
      accent: '#8B5CF6',
    },
  ];

  return (
    <section
      id="diferenciais"
      className="py-12 sm:py-16 lg:py-20 relative bg-[#0A0F2E] text-[#F7F8FC] border-t border-white/[0.08]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Identificação Curta e Direta da Seção */}
        <div className="mb-6 sm:mb-8">
          <span className="text-xs font-semibold text-[#8B5CF6] uppercase tracking-wider block">
            Por que escolher a Inova
          </span>
        </div>

        {/* Grade Equilibrada dos 4 Diferenciais:
            Desktop: 4 colunas bem proporcionadas e compactas.
            Mobile: grade responsiva e enxuta, sem cards excessivamente altos.
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 lg:gap-5">
          {differentials.map((item, index) => (
            <div
              key={index}
              className="rounded-xl sm:rounded-2xl bg-[#12183F] border border-white/[0.08] hover:border-white/20 p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 shadow-md shadow-black/10 group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#F7F8FC]/50">
                    {item.tag}
                  </span>
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: item.accent }}
                  />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white font-display mb-1.5 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-[#F7F8FC]/70 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
