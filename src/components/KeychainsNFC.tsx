import React from 'react';
import { ArrowUpRight, Printer, CreditCard, Zap, Check } from 'lucide-react';
import { getWhatsAppUrl } from '../data/inovaData';

export const KeychainsNFC: React.FC = () => {
  const modelsList = [
    'Chaveiro Instagram',
    'Chaveiro WhatsApp',
    'Chaveiro Google Avaliações',
    'Chaveiro com Símbolo NFC',
    'Chaveiros com Logotipo Personalizado',
  ];

  return (
    <section
      id="chaveiros-nfc"
      className="py-20 sm:py-28 lg:py-32 relative bg-[#F5F4F0] border-t border-black/10 text-[#171923] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Lado Esquerdo: Fotografia Real dos Chaveiros em Impressão 3D */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[420px] rounded-2xl bg-[#111321] text-white p-5 sm:p-7 border border-white/10 shadow-2xl">
              
              {/* Header do Card */}
              <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-white/10 text-xs">
                <span className="font-semibold text-[#8B5CF6] uppercase tracking-wider">
                  Chaveiros 3D & Cartões NFC
                </span>
                <span className="text-[11px] text-white/60">
                  Fotografia Real do Produto
                </span>
              </div>

              {/* Imagem Real dos Chaveiros NFC em Impressão 3D */}
              <div className="relative rounded-xl overflow-hidden aspect-square bg-[#0C0D17] flex items-center justify-center p-3 mb-5 group">
                <img
                  src="/assets/inova/chaveiros-nfc.jpeg"
                  alt="Chaveiros NFC fabricados por tecnologia de impressão 3D da Inova Soluções Digitais"
                  loading="lazy"
                  className="w-full h-full object-contain rounded-lg transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
              </div>

              {/* Metadados Técnicos Reais */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/10 text-center">
                <div>
                  <span className="block text-[10px] tracking-wider uppercase text-white/50">
                    Fabricação
                  </span>
                  <span className="block text-xs font-semibold text-white mt-0.5 truncate">
                    Impressão 3D
                  </span>
                </div>
                <div className="border-l border-white/10">
                  <span className="block text-[10px] tracking-wider uppercase text-white/50">
                    Tecnologia
                  </span>
                  <span className="block text-xs font-semibold text-white mt-0.5 truncate">
                    Microchip NFC
                  </span>
                </div>
                <div className="border-l border-white/10">
                  <span className="block text-[10px] tracking-wider uppercase text-white/50">
                    Aproximação
                  </span>
                  <span className="block text-xs font-semibold text-white mt-0.5 truncate">
                    Instantânea
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Lado Direito: Narrativa Oficial dos Chaveiros 3D e Cartões */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            <h2
              className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#171923] tracking-tight mb-4 font-display leading-[1.12]"
              style={{ textWrap: 'balance' }}
            >
              Chaveiros em impressão 3D e cartões NFC inteligentes.
            </h2>
            
            <p className="text-sm sm:text-base text-[#171923]/80 leading-relaxed mb-6 max-w-2xl font-normal">
              Compartilhe seus canais comerciais, redes sociais, chave Pix ou BioSite aproximando o chaveiro ou cartão do smartphone do cliente. Formato compacto, resistente e extremamente prático para carregar no dia a dia.
            </p>

            {/* Diferenciais dos Produtos */}
            <div className="divide-y divide-black/10 border-t border-b border-black/10 mb-6">
              
              <div className="py-4 sm:py-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center shrink-0 mt-0.5 text-[#8B5CF6]">
                  <Printer className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[#171923] font-display">
                    Chaveiros Produzidos por Impressão 3D
                  </h3>
                  <p className="text-xs sm:text-sm text-[#171923]/70 mt-1 leading-relaxed font-normal">
                    Fabricados por tecnologia de impressão 3D (manufatura aditiva de alta precisão). O acabamento em relevo sólido confere alta durabilidade física e visual moderno para levar no chaveiro ou na bolsa.
                  </p>
                </div>
              </div>

              <div className="py-4 sm:py-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center shrink-0 mt-0.5 text-[#8B5CF6]">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[#171923] font-display">
                    Cartões de Visita NFC Inteligentes
                  </h3>
                  <p className="text-xs sm:text-sm text-[#171923]/70 mt-1 leading-relaxed font-normal">
                    Cartões inteligentes que substituem o papel. Encoste no celular do cliente e abra seu contato, catálogo ou BioSite na hora, com QR Code de apoio no verso.
                  </p>
                </div>
              </div>

              <div className="py-4 sm:py-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center shrink-0 mt-0.5 text-[#8B5CF6]">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[#171923] font-display">
                    Sem Baterias e Sem Aplicativos
                  </h3>
                  <p className="text-xs sm:text-sm text-[#171923]/70 mt-1 leading-relaxed font-normal">
                    O microchip NTAG é energizado pelo próprio smartphone no momento da aproximação. Funciona de forma passiva, limpa e contínua sem depender de recargas ou instalação de apps.
                  </p>
                </div>
              </div>

            </div>

            {/* Modelos Disponíveis */}
            <div className="mb-8">
              <span className="text-xs font-semibold text-[#171923]/70 uppercase tracking-wider block mb-2.5">
                Modelos de Chaveiros Disponíveis:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {modelsList.map((model, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-[#171923]/85">
                    <Check className="w-4 h-4 text-[#8B5CF6] shrink-0" />
                    <span>{model}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ação e Contato WhatsApp */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href={getWhatsAppUrl('Olá! Tenho interesse nos chaveiros NFC em impressão 3D e nos cartões NFC. Gostaria de solicitar um orçamento.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#111321] hover:bg-[#8B5CF6] transition-all duration-200 shadow-sm active:scale-98 text-center min-h-[44px]"
              >
                <span>Solicitar chaveiros ou cartões NFC</span>
                <ArrowUpRight className="w-4 h-4 text-white/80 shrink-0" />
              </a>
              <span className="text-xs text-[#171923]/70 text-center sm:text-left">
                Pedidos unitários ou em lotes para empresas
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
