import React from 'react';
import { Palette, Zap, Target, Users } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const differentials = [
    {
      num: '01',
      title: 'Design personalizado',
      desc: 'Projetos desenvolvidos de acordo com a identidade, estilo e valores de cada negócio, sem templates genéricos.',
      icon: <Palette className="w-5 h-5 text-[#7357E8]" />,
    },
    {
      num: '02',
      title: 'Tecnologia acessível',
      desc: 'Soluções pensadas para facilitar o dia a dia das empresas e seus clientes com máxima praticidade e sem complicações.',
      icon: <Zap className="w-5 h-5 text-[#7357E8]" />,
    },
    {
      num: '03',
      title: 'Soluções sob medida',
      desc: 'Cada projeto considera minuciosamente as necessidades, o público-alvo e os objetivos estratégicos de cada negócio.',
      icon: <Target className="w-5 h-5 text-[#7357E8]" />,
    },
    {
      num: '04',
      title: 'Atendimento consultivo',
      desc: 'Contato direto e transparente para alinhar ideias, orientar escolhas técnicas e acompanhar cada etapa de entrega.',
      icon: <Users className="w-5 h-5 text-[#7357E8]" />,
    },
  ];

  return (
    <section className="py-28 relative bg-[#111321] text-[#F7F7F5] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7357E8]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#F7F7F5]/70 font-semibold">
              DIFERENCIAIS DO ESTÚDIO
            </span>
          </div>
          <h2
            className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4 font-display"
            style={{ textWrap: 'balance' }}
          >
            Tecnologia e criatividade trabalhando juntas.
          </h2>
          <p className="text-base sm:text-lg text-[#F7F7F5]/75 leading-relaxed max-w-2xl font-normal">
            Combinamos precisão técnica com sensibilidade visual para construir soluções digitais que geram autoridade e valor duradouro para o seu negócio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {differentials.map((diff, index) => (
            <div
              key={index}
              className="group rounded-xl bg-[#17192B] border border-white/10 p-7 transition-all duration-300 hover:-translate-y-1 shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                    {diff.icon}
                  </div>
                  <span className="text-sm font-mono font-bold text-white/40">
                    {diff.num}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#7357E8] transition-colors font-display">
                  {diff.title}
                </h3>
                <p className="text-sm text-[#F7F7F5]/70 leading-relaxed">
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
