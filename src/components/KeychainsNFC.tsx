import React from 'react';
import { ArrowUpRight, Smartphone, ShieldCheck, Zap } from 'lucide-react';
import { getWhatsAppUrl } from '../data/inovaData';

export const KeychainsNFC: React.FC = () => {
  return (
    <section id="chaveiros-nfc" className="py-24 relative bg-[#F5F4F0] border-t border-black/8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Lado Esquerdo: Imagem Original dos Chaveiros NFC (1:1 Proporção Real) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[420px] rounded-2xl bg-white border border-black/8 p-3 sm:p-4 shadow-sm">
              {/* Moldura da Imagem preservando 100% da arte quadrada original sem cortes */}
              <div className="relative rounded-xl overflow-hidden aspect-square bg-[#F0EFEA] flex items-center justify-center p-2 border border-black/5">
                <img
                  src="/assets/inova/chaveiros-nfc.jpeg"
                  alt="Chaveiros NFC oficiais da Inova Soluções Digitais para Instagram"
                  loading="lazy"
                  className="w-full h-full object-contain rounded-lg transition-transform duration-500 hover:scale-[1.02]"
                />
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded text-[10px] sm:text-xs font-semibold text-[#171923] border border-black/10">
                  Foto Real do Produto
                </div>
              </div>

              {/* Technical specs strip */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-3 text-center">
                <div className="bg-[#F5F4F0] p-2.5 rounded-lg border border-black/5">
                  <p className="text-[10px] text-[#171923]/60 font-medium">Microchip</p>
                  <p className="text-[11px] sm:text-xs font-bold text-[#171923] mt-0.5 truncate">NTAG 215 / 213</p>
                </div>
                <div className="bg-[#F5F4F0] p-2.5 rounded-lg border border-black/5">
                  <p className="text-[10px] text-[#171923]/60 font-medium">Acabamento</p>
                  <p className="text-[11px] sm:text-xs font-bold text-[#171923] mt-0.5 truncate">Resinado 3D</p>
                </div>
                <div className="bg-[#F5F4F0] p-2.5 rounded-lg border border-black/5">
                  <p className="text-[10px] text-[#171923]/60 font-medium">Leitura</p>
                  <p className="text-[11px] sm:text-xs font-bold text-[#171923] mt-0.5 truncate">Instantânea</p>
                </div>
              </div>
            </div>
          </div>

          {/* Lado Direito: Apresentação e Benefícios */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7357E8]" />
              <span className="text-xs uppercase tracking-[0.2em] text-[#171923]/70 font-semibold">
                CONECTIVIDADE NO BOLSO
              </span>
            </div>
            <h2
              className="text-2xl sm:text-4xl font-extrabold text-[#171923] tracking-tight mb-4 font-display"
              style={{ textWrap: 'balance' }}
            >
              Compartilhe sua presença digital com um simples toque.
            </h2>
            <p className="text-base text-[#171923]/75 leading-relaxed mb-8 max-w-2xl font-normal">
              Chaveiros NFC personalizados para facilitar o compartilhamento de links, páginas, BioSites e canais corporativos através da aproximação de um celular compatível.
            </p>

            {/* Benefícios e Aplicações */}
            <div className="space-y-3 mb-8">
              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white border border-black/8 shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-[#7357E8]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Smartphone className="w-4 h-4 text-[#7357E8]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#171923]">Como Funciona</h4>
                  <p className="text-xs sm:text-sm text-[#171923]/70 mt-0.5 leading-relaxed">
                    Basta aproximar a parte traseira de um smartphone compatível com NFC do chaveiro para abrir instantaneamente seu link ou BioSite, sem necessidade de digitar URL.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white border border-black/8 shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-[#7357E8]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Zap className="w-4 h-4 text-[#7357E8]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#171923]">Exemplos de Utilização</h4>
                  <p className="text-xs sm:text-sm text-[#171923]/70 mt-0.5 leading-relaxed">
                    Ideal para reuniões presenciais, feiras, eventos, networking, visitas comerciais e para carregar os canais da sua marca sempre no molho de chaves.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white border border-black/8 shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-[#7357E8]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4 text-[#7357E8]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#171923]">Compatibilidade Ampla</h4>
                  <p className="text-xs sm:text-sm text-[#171923]/70 mt-0.5 leading-relaxed">
                    Compatível com a grande maioria dos aparelhos Android e iPhones modernos com leitor NFC ativado.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-4 border-t border-black/8">
              <a
                href={getWhatsAppUrl('Olá! Tenho interesse em solicitar um chaveiro NFC. Gostaria de consultar opções de personalização e valores.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold text-white bg-[#111321] hover:bg-[#7357E8] transition-all shadow-sm active:scale-98 whitespace-nowrap"
              >
                <span>Solicitar chaveiro NFC</span>
                <ArrowUpRight className="w-4 h-4 text-white/80" />
              </a>
              <span className="text-xs text-[#171923]/60 text-center sm:text-left">
                Consulte cores e lotes sob medida pelo WhatsApp
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
