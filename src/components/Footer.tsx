import React from 'react';
import { MessageCircle, Instagram, Mail, MapPin, ArrowUpRight, ChevronUp } from 'lucide-react';
import { INOVA_CONTACT } from '../data/inovaData';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { label: 'Início', href: '#inicio' },
    { label: 'Soluções Inova', href: '#solucoes' },
    { label: 'Diferenciais', href: '#diferenciais' },
    { label: 'Sobre a Inova', href: '#sobre' },
    { label: 'Como Trabalhamos', href: '#processo' },
    { label: 'Dúvidas Frequentes', href: '#faq' },
    { label: 'Contato', href: '#contato' },
  ];

  const solutionsLinks = [
    { label: 'Plaquinhas NFC e QR Code', href: '#solucoes' },
    { label: 'Chaveiros e Cartões NFC', href: '#chaveiros-nfc' },
    { label: 'Perfil da Empresa no Google', href: '#presenca-digital' },
    { label: 'BioSite e Cartão Virtual', href: '#presenca-digital' },
    { label: 'Catálogos e Cardápios Digitais', href: '#presenca-digital' },
    { label: 'Landing Pages e Agendamento Online', href: '#agendamento-online' },
  ];

  const contactChannels = [
    {
      id: 'whatsapp',
      channel: 'WhatsApp',
      info: INOVA_CONTACT.displayPhone,
      href: `https://wa.me/${INOVA_CONTACT.phone}`,
      isExternal: true,
      ariaLabel: 'Falar no WhatsApp oficial da Inova Soluções Digitais',
      icon: MessageCircle,
      iconContainerClass: 'bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white',
      borderHoverClass: 'hover:border-emerald-500/40',
    },
    {
      id: 'instagram',
      channel: 'Instagram',
      info: INOVA_CONTACT.instagramHandle,
      href: INOVA_CONTACT.instagram,
      isExternal: true,
      ariaLabel: 'Acessar o perfil oficial do Instagram da Inova Soluções Digitais',
      icon: Instagram,
      iconContainerClass: 'bg-[#8B5CF6]/10 text-[#8B5CF6] group-hover:bg-[#8B5CF6] group-hover:text-white',
      borderHoverClass: 'hover:border-[#8B5CF6]/50',
    },
    {
      id: 'email',
      channel: 'E-mail',
      info: INOVA_CONTACT.email,
      href: `mailto:${INOVA_CONTACT.email}`,
      isExternal: false,
      ariaLabel: 'Enviar e-mail para o atendimento da Inova Soluções Digitais',
      icon: Mail,
      iconContainerClass: 'bg-[#22D3EE]/10 text-[#22D3EE] group-hover:bg-[#22D3EE] group-hover:text-[#0A0F2E]',
      borderHoverClass: 'hover:border-[#22D3EE]/50',
    },
  ];

  return (
    <footer className="bg-[#0A0F2E] text-[#F7F8FC] border-t border-white/[0.08] pt-16 sm:pt-20 pb-12 relative z-10 font-['Poppins',sans-serif]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Grade Principal com 4 Colunas Equilibradas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 pb-14 border-b border-white/[0.08]">
          
          {/* COLUNA 1 — MARCA E APRESENTAÇÃO */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              {/* Logo Oficial Preservada */}
              <a
                href="#inicio"
                className="inline-block mb-5 transition-opacity duration-200 hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] rounded-md"
                aria-label="Inova Soluções Digitais — Voltar ao início"
              >
                <img
                  src={INOVA_CONTACT.logo}
                  alt="Inova Soluções Digitais"
                  className="h-9 w-auto object-contain"
                  width="136"
                  height="36"
                  loading="lazy"
                />
              </a>

              {/* Textos de Apresentação */}
              <p className="text-sm font-semibold text-[#8B5CF6] tracking-tight mb-2.5">
                Conectamos seu negócio ao mundo digital.
              </p>
              <p className="text-xs sm:text-sm text-[#F7F8FC]/70 leading-relaxed mb-6 font-normal max-w-sm">
                Plaquinhas NFC, chaveiros em impressão 3D, cartões inteligentes, BioSites e soluções digitais para aproximar empresas e clientes.
              </p>
            </div>

            {/* Localização Discreta */}
            <div className="flex items-center gap-2 text-xs text-[#F7F8FC]/50 font-medium pt-1">
              <MapPin className="w-4 h-4 text-[#22D3EE] shrink-0" aria-hidden="true" />
              <span>Uberlândia – MG | Atendimento nacional</span>
            </div>
          </div>

          {/* COLUNA 2 — NAVEGAÇÃO */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4 sm:mb-5 text-[#F7F8FC]">
              Navegação
            </h3>
            <ul className="space-y-1 sm:space-y-2.5 text-xs sm:text-sm font-normal">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-[#F7F8FC]/70 hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all duration-200 focus:outline-none focus-visible:text-white py-1.5 min-h-[36px]"
                  >
                    <span className="text-[#8B5CF6]/60 text-xs font-bold leading-none select-none">›</span>
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUNA 3 — NOSSAS SOLUÇÕES */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4 sm:mb-5 text-[#F7F8FC]">
              Nossas Soluções
            </h3>
            <ul className="space-y-1 sm:space-y-2.5 text-xs sm:text-sm font-normal">
              {solutionsLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-[#F7F8FC]/70 hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all duration-200 focus:outline-none focus-visible:text-white py-1.5 min-h-[36px]"
                  >
                    <span className="text-[#22D3EE]/60 text-xs font-bold leading-none select-none">›</span>
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUNA 4 — FALE COM A INOVA */}
          <div className="lg:col-span-3 flex flex-col">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4 sm:mb-5 text-[#F7F8FC]">
              Fale com a Inova
            </h3>

            {/* 3 Elementos de Contato Oficiais e Clicáveis */}
            <div className="space-y-3">
              {contactChannels.map((item) => {
                const IconComponent = item.icon;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    target={item.isExternal ? '_blank' : undefined}
                    rel={item.isExternal ? 'noopener noreferrer' : undefined}
                    aria-label={item.ariaLabel}
                    className={`flex items-center justify-between p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] ${item.borderHoverClass} transition-all duration-200 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] min-h-[50px] active:scale-[0.98]`}
                  >
                    <div className="flex items-center gap-3 min-w-0 pr-2">
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-200 ${item.iconContainerClass}`}
                      >
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 truncate">
                        <span className="block text-[10px] uppercase tracking-wider font-semibold text-[#F7F8FC]/50 group-hover:text-[#F7F8FC]/80 transition-colors">
                          {item.channel}
                        </span>
                        <span className="block text-xs sm:text-[13px] font-medium text-white truncate group-hover:text-white transition-colors">
                          {item.info}
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#F7F8FC]/40 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0" />
                  </a>
                );
              })}
            </div>
          </div>

        </div>

        {/* BARRA INFERIOR */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F7F8FC]/50">
          <p className="text-center sm:text-left">
            © 2026 Inova Soluções Digitais. Todos os direitos reservados.
          </p>

          <a
            href="#inicio"
            className="inline-flex items-center gap-1.5 text-xs text-[#F7F8FC]/50 hover:text-white transition-colors duration-200 focus:outline-none focus-visible:text-white min-h-[44px] px-2 py-1 rounded-md"
            aria-label="Voltar ao início do site"
          >
            <span>Voltar ao topo</span>
            <ChevronUp className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>

      </div>
    </footer>
  );
};
