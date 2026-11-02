import React from 'react';
import { ArrowUpRight, Compass, ShieldCheck, HeartHandshake, MapPin } from 'lucide-react';
import { getWhatsAppUrl } from '../data/inovaData';
import { AscendingTitleReveal } from './AscendingTitleReveal';

export const AboutUs: React.FC = () => {
  return (
    <section id="sobre" className="py-20 sm:py-28 lg:py-32 relative bg-[#F5F4F0] border-t border-black/[0.08] text-[#0A0F2E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Lado Esquerdo: Conteúdo Institucional Autêntico com Título Ascendente */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            <span className="inline-block text-xs font-semibold text-[#8B5CF6] uppercase tracking-wider mb-2">
              Sobre a Inova
            </span>
            <AscendingTitleReveal
              as="h2"
              lines={[
                "Conectamos o seu atendimento",
                "presencial ao mundo online."
              ]}
              className="text-[clamp(1.5rem,5.2vw,3rem)] font-extrabold text-[#0A0F2E] tracking-tight mb-5 sm:mb-6 font-display leading-[1.15]"
            />
            <div className="space-y-4 text-sm sm:text-base lg:text-lg text-[#0A0F2E]/80 leading-relaxed mb-8 font-normal">
              <p>
                A <strong className="text-[#0A0F2E]">Inova Soluções Digitais</strong> é uma empresa de tecnologia e soluções digitais que desenvolve produtos NFC, materiais físicos personalizados e ferramentas digitais para negócios e profissionais autônomos.
              </p>
              <p className="text-sm sm:text-base text-[#0A0F2E]/70">
                Nosso trabalho une o atendimento presencial à presença online. Produzimos plaquinhas em acrílico com base em L para balcão, chaveiros duráveis em impressão 3D, cartões NFC para networking, BioSites para biografia do Instagram, catálogos e cardápios digitais, além de sistemas práticos de agendamento online para barbearias, cabeleireiras, Lash Designers, Nail Designers e profissionais da estética.
              </p>
            </div>

            {/* 3 Pilares Institucionais com as 3 Cores Oficiais */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-white border border-black/[0.08] shadow-sm hover:border-[#8B5CF6]/40 transition-colors">
                <Compass className="w-5 h-5 text-[#8B5CF6] mb-2" />
                <h3 className="text-sm font-bold text-[#0A0F2E] mb-1 font-display">Praticidade Real</h3>
                <p className="text-xs text-[#0A0F2E]/70 leading-relaxed font-normal">
                  Soluções diretas que seus clientes utilizam apenas aproximando o celular.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-black/[0.08] shadow-sm hover:border-[#00C2FF]/40 transition-colors">
                <ShieldCheck className="w-5 h-5 text-[#00C2FF] mb-2" />
                <h3 className="text-sm font-bold text-[#0A0F2E] mb-1 font-display">Fabricação Precisa</h3>
                <p className="text-xs text-[#0A0F2E]/70 leading-relaxed font-normal">
                  Acrílico resistente com base em L e manufatura aditiva 3D de alta precisão.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-black/[0.08] shadow-sm hover:border-[#6366F1]/40 transition-colors">
                <HeartHandshake className="w-5 h-5 text-[#6366F1] mb-2" />
                <h3 className="text-sm font-bold text-[#0A0F2E] mb-1 font-display">Atendimento Direto</h3>
                <p className="text-xs text-[#0A0F2E]/70 leading-relaxed font-normal">
                  Contato ágil pelo WhatsApp para tirar dúvidas, aprovar layouts e acompanhar pedidos.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <a
                href={getWhatsAppUrl('Olá! Gostaria de conversar com a Inova Soluções Digitais e conhecer mais sobre seus produtos e serviços.')}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#0A0F2E] hover:bg-[#8B5CF6] transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-[#8B5CF6]/30 hover:-translate-y-0.5 active:scale-[0.97] active:translate-y-0.5 min-h-[44px] w-full sm:w-auto"
              >
                <span>Falar com a Inova</span>
                <ArrowUpRight className="w-4 h-4 text-white/80 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
              </a>

              <div className="flex items-center justify-center sm:justify-start gap-2 text-xs sm:text-sm text-[#0A0F2E]/60 font-medium">
                <MapPin className="w-4 h-4 text-[#8B5CF6] shrink-0" />
                <span>Uberlândia, Minas Gerais · Atendimento Nacional</span>
              </div>
            </div>
          </div>

          {/* Lado Direito: Logo Oficial da Inova em Neon Futurista */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md rounded-2xl bg-white p-5 sm:p-8 lg:p-10 border border-black/[0.08] shadow-sm text-center">
              <div className="w-28 h-28 sm:w-36 sm:h-36 mx-auto rounded-2xl overflow-hidden shadow-lg shadow-[#8B5CF6]/15 mb-5 sm:mb-6 border border-[#8B5CF6]/30 transition-transform duration-300 hover:scale-105">
                <img
                  src="/assets/aistudio/Logo_Inova_em_Neon_Futurista_3ba21f39.png"
                  alt="Logo oficial da Inova Soluções Digitais em Neon Futurista"
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-[#0A0F2E] mb-1 font-display">
                Inova Soluções Digitais
              </h3>
              <p className="text-xs uppercase tracking-wider text-[#8B5CF6] font-semibold mb-5 sm:mb-6">
                Tecnologia NFC · Soluções Digitais
              </p>

              <p className="text-xs text-[#0A0F2E]/70 leading-relaxed border-t border-black/[0.08] pt-4 font-normal">
                Plaquinhas em acrílico, chaveiros NFC, cartões inteligentes, BioSites, cardápios e sistemas de agendamento online sediados em Uberlândia - MG e com entregas para todo o Brasil.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
