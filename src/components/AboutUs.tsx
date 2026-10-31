import React from 'react';
import { ArrowUpRight, Compass, ShieldCheck, HeartHandshake, MapPin } from 'lucide-react';
import { INOVA_CONTACT, getWhatsAppUrl } from '../data/inovaData';

export const AboutUs: React.FC = () => {
  return (
    <section id="sobre" className="py-28 relative bg-[#F5F4F0] border-t border-black/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Lado Esquerdo: Conteúdo Institucional */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7357E8]" />
              <span className="text-xs uppercase tracking-[0.2em] text-[#171923]/70 font-semibold">
                SOBRE A INOVA
              </span>
            </div>
            <h2
              className="text-3xl sm:text-5xl font-extrabold text-[#171923] tracking-tight mb-6 font-display"
              style={{ textWrap: 'balance' }}
            >
              Conectamos tecnologia, estética e estratégia de negócios.
            </h2>
            <div className="space-y-4 text-base sm:text-lg text-[#171923]/75 leading-relaxed mb-8">
              <p>
                A <strong className="text-[#171923]">Inova Soluções Digitais</strong> atua no desenvolvimento de soluções que integram design contemporâneo, engenharia web e tecnologia física por aproximação.
              </p>
              <p className="text-sm sm:text-base text-[#171923]/70 font-normal">
                Desenvolvemos produtos digitais que ajudam empresas a se apresentarem com autoridade, gerarem mais leads qualificados e fortalecerem o relacionamento com seus clientes no balcão e online.
              </p>
            </div>

            {/* 3 Valores Institucionais Reais */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-white border border-black/8 shadow-sm">
                <Compass className="w-5 h-5 text-[#7357E8] mb-2" />
                <h4 className="text-sm font-bold text-[#171923] mb-1">Visão Integrada</h4>
                <p className="text-xs text-[#171923]/70 leading-relaxed">
                  Conexão real entre presença física no ponto de venda e ambiente web.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-black/8 shadow-sm">
                <ShieldCheck className="w-5 h-5 text-[#7357E8] mb-2" />
                <h4 className="text-sm font-bold text-[#171923] mb-1">Atenção ao Detalhe</h4>
                <p className="text-xs text-[#171923]/70 leading-relaxed">
                  Proporções visuais refinadas, tipografia expressiva e código de alta performance.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-black/8 shadow-sm">
                <HeartHandshake className="w-5 h-5 text-[#7357E8] mb-2" />
                <h4 className="text-sm font-bold text-[#171923] mb-1">Atendimento Direto</h4>
                <p className="text-xs text-[#171923]/70 leading-relaxed">
                  Comunicação clara e transparente sem burocracias ou intermediários.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={getWhatsAppUrl('Olá! Gostaria de conversar com a Inova Soluções Digitais e conhecer mais sobre seus serviços.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold text-white bg-[#111321] hover:bg-[#7357E8] transition-all shadow-sm active:scale-98"
              >
                <span>Falar com a Inova</span>
                <ArrowUpRight className="w-4 h-4 text-white/80" />
              </a>

              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#171923]/60 font-medium">
                <MapPin className="w-4 h-4 text-[#7357E8]" />
                <span>Uberlândia, Minas Gerais</span>
              </div>
            </div>
          </div>

          {/* Lado Direito: Composição com Logo Oficial da Inova */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md rounded-2xl bg-white p-8 sm:p-10 border border-black/8 shadow-sm text-center">
              <div className="w-28 h-28 mx-auto rounded-2xl bg-[#F5F4F0] p-4 flex items-center justify-center mb-6 border border-black/5">
                <img
                  src={INOVA_CONTACT.logo}
                  alt="Logo oficial da Inova Soluções Digitais"
                  className="w-full h-full object-contain"
                />
              </div>

              <h3 className="text-2xl font-bold text-[#171923] mb-2 font-display">
                Inova Soluções Digitais
              </h3>
              <p className="text-xs font-mono uppercase tracking-wider text-[#7357E8] font-semibold mb-6">
                Design · Desenvolvimento Web · NFC
              </p>

              <p className="text-xs text-[#171923]/65 leading-relaxed border-t border-black/8 pt-4">
                Desenvolvimento de sites corporativos, landing pages, produtos NFC, catálogos digitais e otimização de presença no Google em Uberlândia e em todo o território nacional.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
