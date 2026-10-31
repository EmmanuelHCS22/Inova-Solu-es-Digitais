import React from 'react';
import { ArrowUpRight, Smartphone, ShieldCheck, Zap, Printer, CreditCard } from 'lucide-react';
import { getWhatsAppUrl } from '../data/inovaData';

export const KeychainsNFC: React.FC = () => {
  return (
    <section
      id="chaveiros-nfc"
      className="py-20 sm:py-28 lg:py-32 relative bg-[#F5F4F0] border-t border-black/10 text-[#171923] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Lado Esquerdo: Fotografia Real do Produto em Apresentação de Estúdio */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[420px] rounded-2xl bg-[#111321] text-white p-5 sm:p-7 border border-white/10 shadow-2xl">
              
              {/* Header de Curadoria da Peça */}
              <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-white/10 text-xs font-mono">
                <span className="uppercase tracking-wider font-semibold text-[#8B5CF6]">
                  Chaveiros 3D & Cartões NFC
                </span>
                <span className="text-[10px] tracking-wider text-white/50 uppercase">
                  Fotografia Real
                </span>
              </div>

              {/* Imagem Real de Chaveiros NFC em Impressão 3D */}
              <div className="relative rounded-xl overflow-hidden aspect-square bg-[#0C0D17] flex items-center justify-center p-3 mb-5 group">
                <img
                  src="/assets/inova/chaveiros-nfc.jpeg"
                  alt="Chaveiros NFC fabricados por impressão 3D da Inova Soluções Digitais"
                  loading="lazy"
                  className="w-full h-full object-contain rounded-lg transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
              </div>

              {/* Metadados Técnicos Reais em Linha Editorial Dividida */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/10 text-center">
                <div>
                  <span className="block text-[10px] font-mono tracking-widest uppercase text-white/50">
                    Tecnologia
                  </span>
                  <span className="block text-xs font-semibold text-white mt-0.5 truncate">
                    Impressão 3D
                  </span>
                </div>
                <div className="border-l border-white/10">
                  <span className="block text-[10px] font-mono tracking-widest uppercase text-white/50">
                    Microchip
                  </span>
                  <span className="block text-xs font-semibold text-white mt-0.5 truncate font-mono tabular-nums">
                    NTAG 213 / 215
                  </span>
                </div>
                <div className="border-l border-white/10">
                  <span className="block text-[10px] font-mono tracking-widest uppercase text-white/50">
                    Aproximação
                  </span>
                  <span className="block text-xs font-semibold text-white mt-0.5 truncate">
                    Instantânea
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Lado Direito: Narrativa Editorial e Pilares de Conectividade */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#7357E8] font-semibold block mb-3">
              05 / CHAVEIROS 3D & CARTÕES INTELIGENTES
            </span>
            
            <h2
              className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#171923] tracking-tight mb-4 font-display leading-[1.12]"
              style={{ textWrap: 'balance' }}
            >
              Chaveiros em impressão 3D e cartões NFC portáteis.
            </h2>
            
            <p className="text-sm sm:text-base text-[#171923]/80 leading-relaxed mb-8 max-w-2xl font-normal">
              Compartilhe sua presença digital, redes sociais, BioSite ou dados comerciais com um simples toque de smartphone. Fabricação durável por impressão 3D de alta precisão e cartões inteligentes de aproximação.
            </p>

            {/* Narrativa Editorial Dividida com Divisores Sutis */}
            <div className="divide-y divide-black/10 border-t border-b border-black/10 mb-8">
              
              <div className="py-4 sm:py-5 flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-black/5 flex items-center justify-center shrink-0 mt-0.5 text-[#8B5CF6]">
                  <Printer className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[#171923] font-display">
                    Chaveiros NFC Fabricados por Impressão 3D
                  </h3>
                  <p className="text-xs sm:text-sm text-[#171923]/70 mt-1 leading-relaxed font-normal">
                    Modelos fabricados por manufatura aditiva 3D, com acabamento em relevo sólido para Instagram, WhatsApp, Google, símbolo NFC ou artes personalizadas. Resistentes e leves para levar no molho de chaves.
                  </p>
                </div>
              </div>

              <div className="py-4 sm:py-5 flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-black/5 flex items-center justify-center shrink-0 mt-0.5 text-[#8B5CF6]">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[#171923] font-display">
                    Cartões de Visita NFC Inteligentes
                  </h3>
                  <p className="text-xs sm:text-sm text-[#171923]/70 mt-1 leading-relaxed font-normal">
                    Cartões físicos com chip NFC embutido e QR Code de apoio. Substitua dezenas de cartões de papel: encoste o cartão no celular do cliente e abra seu contato, catálogo ou BioSite na hora.
                  </p>
                </div>
              </div>

              <div className="py-4 sm:py-5 flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-black/5 flex items-center justify-center shrink-0 mt-0.5 text-[#8B5CF6]">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[#171923] font-display">
                    Sem Baterias e Sem Aplicativos
                  </h3>
                  <p className="text-xs sm:text-sm text-[#171923]/70 mt-1 leading-relaxed font-normal">
                    O chip NTAG é passivo e energizado pelo próprio smartphone no momento da aproximação. Funciona instantaneamente sem necessidade de instalar aplicativos.
                  </p>
                </div>
              </div>

            </div>

            {/* Ação e Contato WhatsApp Oficial */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href={getWhatsAppUrl('Olá! Tenho interesse nos chaveiros NFC em impressão 3D e nos cartões NFC. Gostaria de consultar modelos e valores.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#111321] hover:bg-[#8B5CF6] transition-all duration-200 shadow-sm active:scale-98 text-center min-h-[44px]"
              >
                <span>Solicitar chaveiros ou cartões NFC</span>
                <ArrowUpRight className="w-4 h-4 text-white/80 shrink-0" />
              </a>
              <span className="text-xs font-mono text-[#171923]/70 text-center sm:text-left">
                Consulte modelos padrão e opções personalizadas
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
