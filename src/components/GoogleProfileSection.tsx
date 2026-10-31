import React from 'react';
import { Search, ArrowUpRight, AlertCircle, MapPin, Camera, Star, FileText, Settings } from 'lucide-react';
import { getWhatsAppUrl } from '../data/inovaData';

export const GoogleProfileSection: React.FC = () => {
  const pillars = [
    {
      icon: <FileText className="w-4 h-4 text-[#8B5CF6]" />,
      title: 'Revisão de Informações Comerciais',
      desc: 'Padronização de horários de funcionamento, telefone, endereço, links e descrição institucional.',
    },
    {
      icon: <Settings className="w-4 h-4 text-[#8B5CF6]" />,
      title: 'Organização de Serviços e Categorias',
      desc: 'Enquadramento correto nas categorias primárias e secundárias do Google para buscas locais relevantes.',
    },
    {
      icon: <Camera className="w-4 h-4 text-[#8B5CF6]" />,
      title: 'Orientação para Fotos e Imagens',
      desc: 'Diretrizes para fotos de fachada, ambiente interno, equipe e produtos em alta qualidade.',
    },
    {
      icon: <MapPin className="w-4 h-4 text-[#8B5CF6]" />,
      title: 'Apresentação Atraente da Empresa',
      desc: 'Estruturação de atributos de comodidade (acessibilidade, estacionamento, formas de pagamento e Wi-Fi).',
    },
    {
      icon: <Star className="w-4 h-4 text-[#8B5CF6]" />,
      title: 'Orientação para Avaliações e Respostas',
      desc: 'Como conduzir clientes ao link de avaliação e responder comentários com profissionalismo e clareza.',
    },
  ];

  return (
    <section id="google-empresa" className="py-24 sm:py-32 relative bg-[#F5F4F0] border-t border-black/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Lado Esquerdo: Fotografia Real do Perfil no Google */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[420px] rounded-2xl bg-[#111321] text-white p-5 sm:p-6 border border-white/10 shadow-xl">
              
              <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-[#8B5CF6]" />
                  <span className="text-xs uppercase tracking-wider font-semibold text-white/90">
                    Presença Local // Google Empresa
                  </span>
                </div>
                <span className="text-[10px] font-mono tracking-wider text-[#22D3EE] uppercase">
                  Otimização
                </span>
              </div>

              {/* Área Fotográfica com Proporção Real */}
              <div className="relative rounded-xl overflow-hidden aspect-square bg-[#0C0D17] flex items-center justify-center p-2 mb-4 group">
                <img
                  src="/assets/inova/google-perfil.jpeg"
                  alt="Apresentação do serviço de organização de Perfil da Empresa no Google pela Inova Soluções Digitais"
                  loading="lazy"
                  className="w-full h-full object-contain rounded-lg transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>

              {/* Metadados Técnicos em Linha Editorial Dividida */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/10 text-center">
                <div>
                  <span className="block text-[10px] font-mono tracking-widest uppercase text-white/45">
                    Alcance
                  </span>
                  <span className="block text-xs font-semibold text-white mt-0.5 truncate">
                    Busca Local
                  </span>
                </div>
                <div className="border-l border-white/10">
                  <span className="block text-[10px] font-mono tracking-widest uppercase text-white/45">
                    Métricas
                  </span>
                  <span className="block text-xs font-semibold text-white mt-0.5 truncate">
                    Rotas & Ligações
                  </span>
                </div>
                <div className="border-l border-white/10">
                  <span className="block text-[10px] font-mono tracking-widest uppercase text-white/45">
                    Autoridade
                  </span>
                  <span className="block text-xs font-semibold text-white mt-0.5 truncate">
                    Avaliações 5★
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Lado Direito: Narrativa Editorial e Pilares de Otimização */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
              <span className="text-xs uppercase tracking-[0.2em] text-[#171923]/70 font-semibold">
                VISIBILIDADE LOCAL
              </span>
            </div>
            
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#171923] tracking-tight mb-4 font-display leading-[1.08]"
              style={{ textWrap: 'balance' }}
            >
              Mais visibilidade para o seu negócio no Google.
            </h2>
            
            <p className="text-base text-[#171923]/75 leading-relaxed mb-8 max-w-2xl font-normal">
              Organizamos as informações comerciais e orientamos a apresentação do seu negócio no Perfil da Empresa no Google para que clientes encontrem você com agilidade e confiança nas buscas da sua região.
            </p>

            {/* Lista Editorial de Pilares (Substituindo os 5 cartões empilhados) */}
            <div className="divide-y divide-black/10 border-t border-b border-black/10 mb-8">
              {pillars.map((pil, idx) => (
                <div key={idx} className="py-3.5 sm:py-4 flex items-start gap-4 group">
                  <div className="w-8 h-8 rounded-lg bg-black/5 flex items-center justify-center shrink-0 mt-0.5 text-[#8B5CF6] group-hover:bg-[#8B5CF6]/10 transition-colors">
                    {pil.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#171923] font-display">
                      {pil.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#171923]/70 mt-0.5 leading-relaxed font-normal">
                      {pil.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Observação Técnica em Formato de Legenda Sutil */}
            <div className="flex items-start gap-2.5 text-xs text-[#171923]/70 mb-8">
              <AlertCircle className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong className="text-[#171923] font-semibold">Observação técnica:</strong> Nosso serviço estrutura e potencializa a apresentação comercial da sua empresa, orientando as melhores práticas do Google para engajamento e clareza.
              </p>
            </div>

            {/* Ação e Contato */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <a
                href={getWhatsAppUrl('Olá! Tenho interesse em otimizar o Perfil da Empresa da minha empresa no Google e gostaria de conversar sobre o escopo e os valores.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg text-sm font-semibold text-white bg-[#111321] hover:bg-[#8B5CF6] transition-all duration-200 shadow-sm active:scale-98 whitespace-nowrap self-start"
              >
                <span>Otimizar meu perfil no Google</span>
                <ArrowUpRight className="w-4 h-4 text-white/80" />
              </a>
              <span className="text-xs text-[#171923]/60">
                Atendimento consultivo e suporte direto
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
