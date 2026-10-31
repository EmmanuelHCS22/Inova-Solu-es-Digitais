import React from 'react';
import { ArrowUpRight, Smartphone, ShieldCheck, Zap } from 'lucide-react';
import { getWhatsAppUrl } from '../data/inovaData';

export const KeychainsNFC: React.FC = () => {
  return (
    <section id="chaveiros-nfc" className="py-24 sm:py-32 relative bg-[#F5F4F0] border-t border-black/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Lado Esquerdo: Fotografia Real do Produto em Apresentação de Galeria */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[420px] rounded-2xl bg-[#111321] text-white p-5 sm:p-6 border border-white/10 shadow-xl">
              
              {/* Header de Curadoria da Peça */}
              <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
                  <span className="text-xs uppercase tracking-wider font-semibold text-white/90">
                    Hardware Portátil // Chaveiro NFC
                  </span>
                </div>
                <span className="text-[10px] font-mono tracking-wider text-white/50 uppercase">
                  Foto Real
                </span>
              </div>

              {/* Imagem Real de Chaveiros NFC com Máxima Área Útil */}
              <div className="relative rounded-xl overflow-hidden aspect-square bg-[#0C0D17] flex items-center justify-center p-2 mb-4 group">
                <img
                  src="/assets/inova/chaveiros-nfc.jpeg"
                  alt="Chaveiros NFC oficiais da Inova Soluções Digitais para Instagram com tecnologia de aproximação"
                  loading="lazy"
                  className="w-full h-full object-contain rounded-lg transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>

              {/* Metadados Técnicos em Linha Editorial Dividida (Zero cartões dentro de cartões) */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/10 text-center">
                <div>
                  <span className="block text-[10px] font-mono tracking-widest uppercase text-white/45">
                    Microchip
                  </span>
                  <span className="block text-xs font-semibold text-white mt-0.5 truncate">
                    NTAG 215 / 213
                  </span>
                </div>
                <div className="border-l border-white/10">
                  <span className="block text-[10px] font-mono tracking-widest uppercase text-white/45">
                    Acabamento
                  </span>
                  <span className="block text-xs font-semibold text-white mt-0.5 truncate">
                    Resinado 3D
                  </span>
                </div>
                <div className="border-l border-white/10">
                  <span className="block text-[10px] font-mono tracking-widest uppercase text-white/45">
                    Leitura
                  </span>
                  <span className="block text-xs font-semibold text-white mt-0.5 truncate">
                    Instantânea
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Lado Direito: Narrativa Editorial e Pilares de Conexão */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
              <span className="text-xs uppercase tracking-[0.2em] text-[#171923]/70 font-semibold">
                CONECTIVIDADE NO BOLSO
              </span>
            </div>
            
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#171923] tracking-tight mb-4 font-display leading-[1.08]"
              style={{ textWrap: 'balance' }}
            >
              Compartilhe sua presença digital com um simples toque.
            </h2>
            
            <p className="text-base text-[#171923]/75 leading-relaxed mb-8 max-w-2xl font-normal">
              Chaveiros NFC personalizados para facilitar o compartilhamento de links, páginas, BioSites e canais corporativos através da aproximação rápida de qualquer celular compatível.
            </p>

            {/* Narrativa Editorial Dividida (Substituindo a pilha de caixas brancas) */}
            <div className="divide-y divide-black/10 border-t border-b border-black/10 mb-8">
              
              <div className="py-4 sm:py-5 flex items-start gap-4">
                <div className="w-9 h-9 rounded-lg bg-black/5 flex items-center justify-center shrink-0 mt-0.5 text-[#8B5CF6]">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-[#171923] font-display">
                    Como Funciona a Leitura
                  </h4>
                  <p className="text-xs sm:text-sm text-[#171923]/70 mt-1 leading-relaxed font-normal">
                    Basta aproximar a parte traseira de um smartphone compatível do chaveiro para abrir instantaneamente seu link ou BioSite, sem necessidade de digitar URL.
                  </p>
                </div>
              </div>

              <div className="py-4 sm:py-5 flex items-start gap-4">
                <div className="w-9 h-9 rounded-lg bg-black/5 flex items-center justify-center shrink-0 mt-0.5 text-[#8B5CF6]">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-[#171923] font-display">
                    Exemplos de Utilização Comercial
                  </h4>
                  <p className="text-xs sm:text-sm text-[#171923]/70 mt-1 leading-relaxed font-normal">
                    Ideal para reuniões presenciais, feiras, eventos, networking, atendimentos externos e para carregar os canais da sua marca sempre no molho de chaves.
                  </p>
                </div>
              </div>

              <div className="py-4 sm:py-5 flex items-start gap-4">
                <div className="w-9 h-9 rounded-lg bg-black/5 flex items-center justify-center shrink-0 mt-0.5 text-[#8B5CF6]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-[#171923] font-display">
                    Compatibilidade Ampla
                  </h4>
                  <p className="text-xs sm:text-sm text-[#171923]/70 mt-1 leading-relaxed font-normal">
                    Compatível nativamente com a grande maioria dos aparelhos Android e iPhones com leitor NFC integrado, sem depender de baterias ou recargas.
                  </p>
                </div>
              </div>

            </div>

            {/* Ação e Contato */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <a
                href={getWhatsAppUrl('Olá! Tenho interesse em solicitar um chaveiro NFC. Gostaria de consultar opções de personalização e valores.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg text-sm font-semibold text-white bg-[#111321] hover:bg-[#8B5CF6] transition-all duration-200 shadow-sm active:scale-98 whitespace-nowrap self-start"
              >
                <span>Solicitar chaveiro NFC</span>
                <ArrowUpRight className="w-4 h-4 text-white/80" />
              </a>
              <span className="text-xs text-[#171923]/60">
                Consulte cores e lotes sob medida pelo WhatsApp
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
