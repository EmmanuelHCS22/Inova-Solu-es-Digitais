import React from 'react';
import { ArrowUpRight, Compass, ShieldCheck, HeartHandshake, MapPin } from 'lucide-react';
import { INOVA_CONTACT, getWhatsAppUrl } from '../data/inovaData';

export const AboutUs: React.FC = () => {
  return (
    <section id="sobre" className="py-20 sm:py-28 lg:py-32 relative bg-[#F5F4F0] border-t border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Lado Esquerdo: Conteúdo Institucional Autêntico */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            <h2
              className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#171923] tracking-tight mb-6 font-display leading-[1.12]"
              style={{ textWrap: 'balance' }}
            >
              Conectamos o seu atendimento presencial ao mundo online.
            </h2>
            <div className="space-y-4 text-sm sm:text-base lg:text-lg text-[#171923]/75 leading-relaxed mb-8 font-normal">
              <p>
                A <strong className="text-[#171923]">Inova Soluções Digitais</strong> é uma empresa de tecnologia e soluções digitais que desenvolve produtos NFC, materiais físicos personalizados e ferramentas digitais para negócios e profissionais autônomos.
              </p>
              <p className="text-sm sm:text-base text-[#171923]/70">
                Nosso trabalho une o atendimento presencial à presença online. Produzimos plaquinhas em acrílico com base em L para balcão, chaveiros duráveis em impressão 3D, cartões NFC para networking, BioSites para biografia do Instagram, catálogos e cardápios digitais, além de sistemas práticos de agendamento online para barbearias, cabeleireiras, Lash Designers, Nail Designers e profissionais da estética.
              </p>
            </div>

            {/* 3 Pilares Institucionais Reais */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-white border border-black/10 shadow-sm">
                <Compass className="w-5 h-5 text-[#8B5CF6] mb-2" />
                <h3 className="text-sm font-bold text-[#171923] mb-1">Praticidade Real</h3>
                <p className="text-xs text-[#171923]/70 leading-relaxed font-normal">
                  Soluções diretas que seus clientes utilizam apenas aproximando o celular.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-black/10 shadow-sm">
                <ShieldCheck className="w-5 h-5 text-[#8B5CF6] mb-2" />
                <h3 className="text-sm font-bold text-[#171923] mb-1">Fabricação Precisa</h3>
                <p className="text-xs text-[#171923]/70 leading-relaxed font-normal">
                  Acrílico resistente com base em L e manufatura aditiva 3D de alta precisão.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-black/10 shadow-sm">
                <HeartHandshake className="w-5 h-5 text-[#8B5CF6] mb-2" />
                <h3 className="text-sm font-bold text-[#171923] mb-1">Atendimento Direto</h3>
                <p className="text-xs text-[#171923]/70 leading-relaxed font-normal">
                  Contato ágil pelo WhatsApp para tirar dúvidas, aprovar layouts e acompanhar pedidos.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={getWhatsAppUrl('Olá! Gostaria de conversar com a Inova Soluções Digitais e conhecer mais sobre seus produtos e serviços.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#111321] hover:bg-[#8B5CF6] transition-all shadow-sm active:scale-98 min-h-[44px]"
              >
                <span>Falar com a Inova</span>
                <ArrowUpRight className="w-4 h-4 text-white/80" />
              </a>

              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#171923]/60 font-medium">
                <MapPin className="w-4 h-4 text-[#8B5CF6]" />
                <span>Uberlândia, Minas Gerais · Atendimento Nacional</span>
              </div>
            </div>
          </div>

          {/* Lado Direito: Logo Oficial da Inova */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md rounded-2xl bg-white p-8 sm:p-10 border border-black/10 shadow-sm text-center">
              <div className="w-28 h-28 mx-auto rounded-2xl bg-[#F5F4F0] p-4 flex items-center justify-center mb-6 border border-black/5">
                <img
                  src={INOVA_CONTACT.logo}
                  alt="Logo oficial da Inova Soluções Digitais"
                  className="w-full h-full object-contain"
                />
              </div>

              <h3 className="text-2xl font-bold text-[#171923] mb-1 font-display">
                Inova Soluções Digitais
              </h3>
              <p className="text-xs uppercase tracking-wider text-[#8B5CF6] font-semibold mb-6">
                Tecnologia NFC · Impressão 3D · Soluções Digitais
              </p>

              <p className="text-xs text-[#171923]/65 leading-relaxed border-t border-black/10 pt-4 font-normal">
                Plaquinhas em acrílico, chaveiros por impressão 3D, cartões NFC, BioSites, cardápios e sistemas de agendamento online sediados em Uberlândia - MG e com entregas para todo o Brasil.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
