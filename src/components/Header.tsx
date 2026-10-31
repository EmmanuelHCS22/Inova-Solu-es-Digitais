import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { INOVA_CONTACT, getWhatsAppUrl } from '../data/inovaData';

interface HeaderProps {
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Início', href: '#inicio' },
    { label: 'Soluções', href: '#solucoes' },
    { label: 'Plaquinhas NFC', href: '#catalogo-padrao' },
    { label: 'Chaveiros 3D & Cartões', href: '#chaveiros-nfc' },
    { label: 'Presença Digital', href: '#presenca-digital' },
    { label: 'Agendamento Online', href: '#agendamento-online' },
    { label: 'Portfólio', href: '#portfolio' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'Dúvidas', href: '#faq' },
    { label: 'Contato', href: '#contato' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-[#111321] border-b border-white/10 shadow-lg shadow-black/25 transition-all duration-300 ${
        isScrolled ? 'py-3 sm:py-3.5' : 'py-4 sm:py-4.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6">
          {/* Logo Oficial da Inova — PNG original preservado */}
          <a
            href="#inicio"
            className="flex items-center gap-3 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] rounded-md transition-opacity hover:opacity-90"
            aria-label="Inova Soluções Digitais — Início"
          >
            <div className="relative h-9 sm:h-10 w-auto flex items-center">
              <img
                src={INOVA_CONTACT.logo}
                alt="Inova Soluções Digitais"
                className="h-8 sm:h-9 w-auto object-contain"
                width="136"
                height="36"
                loading="eager"
              />
            </div>
          </a>

          {/* Menu de Navegação */}
          <nav
            aria-label="Navegação principal"
            className="hidden xl:flex items-center gap-5 text-xs font-medium tracking-tight"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative py-1 transition-colors duration-200 ${
                    isActive
                      ? 'text-[#F7F8FC] font-semibold'
                      : 'text-[#B8BAC8] hover:text-[#8B5CF6]'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#8B5CF6] rounded-full shadow-[0_0_8px_rgba(139,92,246,0.6)]"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Botão Solicitar Orçamento & Mobile Menu Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Botão Solicitar Orçamento */}
            <a
              href={getWhatsAppUrl('Olá! Gostaria de solicitar um orçamento com a Inova Soluções Digitais.')}
              target="_blank"
              rel="noopener noreferrer"
              className="group hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-lg bg-[#F7F8FC] text-[#111321] hover:bg-[#8B5CF6] hover:text-white transition-all duration-200 shadow-sm active:scale-98 whitespace-nowrap"
            >
              <span>Solicitar orçamento</span>
              <ArrowUpRight className="w-4 h-4 text-[#111321] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
            </a>

            {/* Mobile / Tablet Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-[#F7F8FC] hover:text-[#8B5CF6] hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] transition-colors"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden mt-3 pt-3 pb-4 border border-white/10 bg-[#111321] rounded-xl px-4 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col gap-1.5">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={handleLinkClick}
                    className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${
                      isActive
                        ? 'bg-white/10 text-[#F7F8FC] font-semibold border-l-2 border-[#8B5CF6]'
                        : 'text-[#B8BAC8] hover:text-[#8B5CF6] hover:bg-white/5'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />
                    )}
                  </a>
                );
              })}
              <div className="pt-3 mt-2 border-t border-white/10">
                <a
                  href={getWhatsAppUrl('Olá! Gostaria de solicitar um orçamento com a Inova Soluções Digitais.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLinkClick}
                  className="group w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg bg-[#F7F8FC] text-[#111321] hover:bg-[#8B5CF6] hover:text-white shadow-sm whitespace-nowrap active:scale-98 transition-all duration-200"
                >
                  <span>Solicitar orçamento no WhatsApp</span>
                  <ArrowUpRight className="w-4 h-4 text-[#111321] group-hover:text-white transition-colors duration-200" />
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
