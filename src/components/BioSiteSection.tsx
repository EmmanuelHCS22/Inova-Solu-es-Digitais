import React from 'react';
import { ArrowUpRight, Link2, MessageSquare, Compass, Eye, Share2, Sparkles, Smartphone } from 'lucide-react';
import { getWhatsAppUrl } from '../data/inovaData';

export const BioSiteSection: React.FC = () => {
  const benefits = [
    {
      icon: <Link2 className="w-4 h-4 text-[#8B5CF6]" />,
      title: 'Centralização de Links',
      desc: 'Reúna todas as suas portas de entrada digitais sob um único endereço fácil de memorizar.',
    },
    {
      icon: <MessageSquare className="w-4 h-4 text-[#8B5CF6]" />,
      title: 'Acesso Imediato ao WhatsApp',
      desc: 'Botão em destaque para que o cliente inicie uma conversa com a sua equipe com um toque.',
    },
    {
      icon: <Compass className="w-4 h-4 text-[#8B5CF6]" />,
      title: 'Apresentação Profissional',
      desc: 'Transmita credibilidade com design limpo, logotipo oficial e identidade harmonizada.',
    },
    {
      icon: <Eye className="w-4 h-4 text-[#8B5CF6]" />,
      title: 'Personalização Visual',
      desc: 'Cores, fotos, fontes e botões configurados de acordo com o padrão estético da sua marca.',
    },
    {
      icon: <Share2 className="w-4 h-4 text-[#8B5CF6]" />,
      title: 'Compartilhamento Rápido',
      desc: 'Perfeito para a biografia do Instagram, perfil do TikTok, cartão digital ou chip NFC.',
    },
  ];

  return (
    <section id="biosite" className="py-24 sm:py-32 relative bg-[#111321] text-[#F7F8FC] border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Lado Esquerdo: Conteúdo Editorial e Benefícios */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left order-2 lg:order-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
              <span className="text-xs uppercase tracking-[0.2em] text-white/70 font-semibold">
                BIOSITE PROFISSIONAL
              </span>
            </div>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4 font-display leading-[1.08]"
              style={{ textWrap: 'balance' }}
            >
              Sua presença digital concentrada em um só lugar.
            </h2>
            <p className="text-base text-white/75 leading-relaxed mb-8 max-w-2xl font-normal">
              Uma página digital desenvolvida sob medida para reunir canais de atendimento, catálogos e informações comerciais em um endereço único, leve e ultrarrápido.
            </p>

            {/* Matriz Editorial de Benefícios (Zero cartões com bordas pesadas) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 mb-8 pt-4 border-t border-white/10">
              {benefits.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3.5 group">
                  <div className="p-2 rounded-lg bg-white/5 shrink-0 mt-0.5 text-[#8B5CF6] group-hover:bg-[#8B5CF6]/15 transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1 font-display">
                      {item.title}
                    </h4>
                    <p className="text-xs text-white/65 leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Disclaimer & Ação CTA */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center gap-4">
              <a
                href={getWhatsAppUrl('Olá! Tenho interesse no BioSite e gostaria de conversar sobre a configuração e os valores.')}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg text-sm font-semibold bg-[#F7F8FC] text-[#111321] hover:bg-[#8B5CF6] hover:text-white transition-all duration-200 shadow-sm active:scale-98 whitespace-nowrap self-start"
              >
                <span>Solicitar meu BioSite</span>
                <ArrowUpRight className="w-4 h-4 text-[#111321] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
              </a>
              <span className="text-xs text-white/50">
                Página entregue 100% pronta e com link configurado
              </span>
            </div>
          </div>

          {/* Lado Direito: Fotografia Real do BioSite com Apresentação de Estúdio */}
          <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
            <div className="relative w-full max-w-[420px] rounded-2xl bg-[#0C0D17] p-5 sm:p-6 border border-white/10 shadow-2xl">
              
              <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-[#8B5CF6]" />
                  <span className="text-xs uppercase tracking-wider font-semibold text-white/90">
                    Interface Mobile // BioSite
                  </span>
                </div>
                <span className="text-[10px] font-mono tracking-wider text-[#22D3EE] uppercase">
                  Design Exclusivo
                </span>
              </div>

              {/* Área Fotográfica com Proporção Real */}
              <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-black/40 flex items-center justify-center p-2 mb-4 group">
                <img
                  src="/assets/inova/biosite-mockup.jpeg"
                  alt="Apresentação oficial do BioSite desenvolvido pela Inova Soluções Digitais"
                  loading="lazy"
                  className="w-full h-full object-contain rounded-lg transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
              </div>

              {/* Metadados Técnicos em Linha Editorial Dividida */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/10 text-center">
                <div>
                  <span className="block text-[10px] font-mono tracking-widest uppercase text-white/45">
                    Velocidade
                  </span>
                  <span className="block text-xs font-semibold text-white mt-0.5 truncate">
                    &lt; 0.8s
                  </span>
                </div>
                <div className="border-l border-white/10">
                  <span className="block text-[10px] font-mono tracking-widest uppercase text-white/45">
                    Adaptação
                  </span>
                  <span className="block text-xs font-semibold text-white mt-0.5 truncate">
                    100% Mobile
                  </span>
                </div>
                <div className="border-l border-white/10">
                  <span className="block text-[10px] font-mono tracking-widest uppercase text-white/45">
                    Integração
                  </span>
                  <span className="block text-xs font-semibold text-white mt-0.5 truncate">
                    WhatsApp & Pix
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
