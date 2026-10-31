import React from 'react';
import { ArrowUpRight, Link2, MessageSquare, Compass, Eye, Share2, Sparkles } from 'lucide-react';
import { getWhatsAppUrl } from '../data/inovaData';

export const BioSiteSection: React.FC = () => {
  const benefits = [
    {
      icon: <Link2 className="w-4 h-4 text-[#7357E8]" />,
      title: 'Centralização de Links',
      desc: 'Reúna todas as suas portas de entrada digitais sob um único endereço fácil de memorizar.',
    },
    {
      icon: <MessageSquare className="w-4 h-4 text-[#7357E8]" />,
      title: 'Acesso Imediato ao WhatsApp',
      desc: 'Botão em destaque para que o cliente inicie uma conversa com a sua equipe com um toque.',
    },
    {
      icon: <Compass className="w-4 h-4 text-[#7357E8]" />,
      title: 'Apresentação Profissional',
      desc: 'Transmita credibilidade com design limpo, logotipo oficial e identidade harmonizada.',
    },
    {
      icon: <Eye className="w-4 h-4 text-[#7357E8]" />,
      title: 'Personalização Visual',
      desc: 'Cores, fotos, fontes e botões configurados de acordo com o padrão estético da sua marca.',
    },
    {
      icon: <Share2 className="w-4 h-4 text-[#7357E8]" />,
      title: 'Compartilhamento Rápido',
      desc: 'Perfeito para a biografia do Instagram, perfil do TikTok, cartão digital ou chip NFC.',
    },
  ];

  return (
    <section id="biosite" className="py-24 relative bg-[#111321] text-[#F7F7F5] border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Lado Esquerdo: Conteúdo e Benefícios */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left order-2 lg:order-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7357E8]" />
              <span className="text-xs uppercase tracking-[0.2em] text-[#F7F7F5]/70 font-semibold">
                BIOSITE PROFISSIONAL
              </span>
            </div>
            <h2
              className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4 font-display"
              style={{ textWrap: 'balance' }}
            >
              Sua presença digital concentrada em um só lugar.
            </h2>
            <p className="text-base text-[#F7F7F5]/75 leading-relaxed mb-8 max-w-2xl font-normal">
              Uma página digital desenvolvida sob medida para reunir canais de atendimento, catálogos e informações comerciais em um endereço único e ultrarrápido.
            </p>

            {/* Lista de Benefícios */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {benefits.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-xl bg-[#17192B] border border-white/10 p-3.5 flex items-start gap-3 hover:border-white/20 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-white/5 shrink-0 mt-0.5">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white mb-0.5">
                      {item.title}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-[#F7F7F5]/65 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Disclaimer & CTA */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center gap-4">
              <a
                href={getWhatsAppUrl('Olá! Tenho interesse no BioSite e gostaria de conversar sobre a configuração e os valores.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold text-white bg-[#7357E8] hover:bg-[#6348d6] transition-all shadow-sm active:scale-98 whitespace-nowrap"
              >
                <span>Solicitar meu BioSite</span>
                <ArrowUpRight className="w-4 h-4 text-white/90" />
              </a>
              <span className="text-xs text-[#F7F7F5]/60 text-center sm:text-left">
                Página entregue 100% pronta e com link configurado
              </span>
            </div>
          </div>

          {/* Lado Direito: Imagem Original Completa do BioSite (1:1 Proporção Real) */}
          <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
            <div className="relative w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[420px] rounded-2xl overflow-hidden bg-[#17192B] p-3 sm:p-4 border border-white/10 shadow-2xl">
              {/* Moldura da Imagem preservando 100% da arte sem cortes de borda */}
              <div className="relative rounded-xl overflow-hidden aspect-square bg-[#0E101D] flex items-center justify-center p-2 border border-white/5">
                <img
                  src="/assets/inova/biosite-mockup.jpeg"
                  alt="Apresentação oficial do BioSite desenvolvido pela Inova Soluções Digitais"
                  loading="lazy"
                  className="w-full h-full object-contain rounded-lg transition-transform duration-500 hover:scale-[1.02]"
                />
                <div className="absolute top-3 right-3 bg-black/80 px-2.5 py-1 rounded text-[10px] font-mono text-white/90 border border-white/10 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#7357E8]" />
                  <span>Demonstração Oficial</span>
                </div>
              </div>

              <div className="text-center pt-3">
                <span className="text-[10px] sm:text-[11px] text-[#F7F7F5]/60 font-mono">
                  100% adaptado para smartphones e redes sociais
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
