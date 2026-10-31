import React from 'react';
import { Search, ArrowUpRight, AlertCircle, MapPin, Camera, Star, FileText, Settings } from 'lucide-react';
import { getWhatsAppUrl } from '../data/inovaData';

export const GoogleProfileSection: React.FC = () => {
  const pillars = [
    {
      icon: <FileText className="w-4 h-4 text-[#7357E8]" />,
      title: 'Revisão de Informações Comerciais',
      desc: 'Padronização de horários de funcionamento, telefone, endereço, links e descrição institucional.',
    },
    {
      icon: <Settings className="w-4 h-4 text-[#7357E8]" />,
      title: 'Organização de Serviços e Categorias',
      desc: 'Enquadramento correto nas categorias primárias e secundárias do Google para buscas locais relevantes.',
    },
    {
      icon: <Camera className="w-4 h-4 text-[#7357E8]" />,
      title: 'Orientação para Fotos e Imagens',
      desc: 'Diretrizes para fotos de fachada, ambiente interno, equipe e produtos em alta qualidade.',
    },
    {
      icon: <MapPin className="w-4 h-4 text-[#7357E8]" />,
      title: 'Apresentação Atraente da Empresa',
      desc: 'Estruturação de atributos de comodidade (acessibilidade, estacionamento, formas de pagamento e Wi-Fi).',
    },
    {
      icon: <Star className="w-4 h-4 text-[#7357E8]" />,
      title: 'Orientação para Avaliações e Respostas',
      desc: 'Como conduzir clientes ao link de avaliação e responder comentários com profissionalismo e clareza.',
    },
  ];

  return (
    <section id="google-empresa" className="py-24 relative bg-[#F5F4F0] border-t border-black/8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Lado Esquerdo: Imagem Original da Otimização do Google (1:1 Proporção Real) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[420px] rounded-2xl bg-white p-3 sm:p-4 border border-black/8 shadow-sm">
              {/* Moldura da Imagem preservando 100% da arte sem cortes */}
              <div className="relative rounded-xl overflow-hidden aspect-square bg-[#F0EFEA] flex items-center justify-center p-2 border border-black/5">
                <img
                  src="/assets/inova/google-perfil.jpeg"
                  alt="Apresentação do serviço de organização de Perfil da Empresa no Google pela Inova"
                  loading="lazy"
                  className="w-full h-full object-contain rounded-lg transition-transform duration-500 hover:scale-[1.02]"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded text-[10px] sm:text-xs font-semibold text-[#171923] border border-black/10 flex items-center gap-1.5">
                  <Search className="w-3 h-3 text-[#7357E8]" />
                  <span>Google Meu Negócio</span>
                </div>
              </div>

              <div className="mt-3 p-2.5 bg-[#F5F4F0] rounded-lg border border-black/5 text-center">
                <p className="text-xs text-[#171923]/70 font-medium">
                  Mais clareza para quem busca seu produto ou serviço na sua região.
                </p>
              </div>
            </div>
          </div>

          {/* Lado Direito: Pilares e Explicações */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7357E8]" />
              <span className="text-xs uppercase tracking-[0.2em] text-[#171923]/70 font-semibold">
                VISIBILIDADE LOCAL
              </span>
            </div>
            <h2
              className="text-2xl sm:text-4xl font-extrabold text-[#171923] tracking-tight mb-4 font-display"
              style={{ textWrap: 'balance' }}
            >
              Mais visibilidade para o seu negócio no Google.
            </h2>
            <p className="text-base text-[#171923]/75 leading-relaxed mb-8 max-w-2xl font-normal">
              Organizamos as informações comerciais e orientamos a apresentação do seu negócio no Perfil da Empresa no Google para que os clientes encontrem você com agilidade e confiança.
            </p>

            {/* Pilares Grid */}
            <div className="space-y-3 mb-8">
              {pillars.map((pil, idx) => (
                <div
                  key={idx}
                  className="rounded-xl bg-white border border-black/8 p-3.5 flex items-start gap-3.5 shadow-sm"
                >
                  <div className="p-2 rounded-lg bg-[#7357E8]/10 shrink-0 mt-0.5">
                    {pil.icon}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#171923] mb-0.5">
                      {pil.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#171923]/70 leading-relaxed">
                      {pil.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Transparent Disclaimer Box */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-black/8 flex items-start gap-3 text-xs text-[#171923]/75 mb-8 shadow-sm">
              <AlertCircle className="w-4 h-4 text-[#7357E8] shrink-0 mt-0.5" />
              <span className="text-xs leading-relaxed">
                <strong className="text-[#171923]">Observação técnica:</strong> Nosso serviço organiza, padroniza e potencializa a apresentação comercial da sua empresa, mas não garante primeiro lugar nos resultados de busca ou quantidade pré-fixada de clientes, fatores regulados pelas políticas do algoritmo do Google.
              </span>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-4 border-t border-black/8">
              <a
                href={getWhatsAppUrl('Olá! Tenho interesse em otimizar o Perfil da Empresa da minha empresa no Google e gostaria de conversar sobre o escopo e os valores.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold text-white bg-[#111321] hover:bg-[#7357E8] shadow-sm transition-all active:scale-98 whitespace-nowrap"
              >
                <span>Otimizar meu perfil no Google</span>
                <ArrowUpRight className="w-4 h-4 text-white/80" />
              </a>
              <span className="text-xs text-[#171923]/60 text-center sm:text-left">
                Atendimento consultivo e suporte direto
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
