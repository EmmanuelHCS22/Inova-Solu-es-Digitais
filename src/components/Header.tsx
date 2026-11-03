import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, X, ArrowUpRight, Home, Layers, Compass, HelpCircle, MessageSquare } from 'lucide-react';
import { INOVA_CONTACT, getWhatsAppUrl } from '../data/inovaData';

interface HeaderProps {
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number; opacity: number }>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock scroll, set body data attribute, and handle escape key when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.setAttribute('data-mobile-menu-open', 'true');
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setMobileMenuOpen(false);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        document.body.removeAttribute('data-mobile-menu-open');
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
      document.body.removeAttribute('data-mobile-menu-open');
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { id: 'inicio', label: 'Início', href: '#inicio', icon: Home },
    { id: 'solucoes', label: 'Soluções', href: '#solucoes', icon: Layers },
    { id: 'sobre', label: 'Sobre', href: '#sobre', icon: Compass },
    { id: 'faq', label: 'Dúvidas', href: '#faq', icon: HelpCircle },
    { id: 'contato', label: 'Contato', href: '#contato', icon: MessageSquare },
  ];

  // Map adjacent sections for uninterrupted active continuity
  const getMappedSection = useCallback((section: string) => {
    if (section === 'diferenciais') return 'solucoes';
    if (section === 'processo') return 'sobre';
    return section;
  }, []);

  const effectiveSection = getMappedSection(activeSection);

  // Measure and position the active sliding indicator (Reference 1)
  const updateIndicator = useCallback(() => {
    const activeEl = navRefs.current[effectiveSection];
    if (activeEl) {
      setIndicatorStyle({
        left: activeEl.offsetLeft,
        width: activeEl.offsetWidth,
        opacity: 1,
      });
    }
  }, [effectiveSection]);

  useEffect(() => {
    // Run after DOM render
    const timer = setTimeout(updateIndicator, 50);
    window.addEventListener('resize', updateIndicator);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateIndicator);
    };
  }, [updateIndicator]);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        mobileMenuOpen
          ? 'bg-transparent border-b-0 shadow-none'
          : `bg-[#0A0F2E]/95 backdrop-blur-md border-b border-white/[0.08] shadow-lg shadow-black/25 ${
              isScrolled ? 'py-2.5 sm:py-3' : 'py-3.5 sm:py-4'
            }`
      }`}
    >
      {/* Backdrop com blur que cobre a tela inteira atrás do menu aberto */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 glass-menu-backdrop -z-10 transition-opacity duration-300"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Barra Superior do Cabeçalho */}
      <div
        className={`transition-all duration-300 ${
          mobileMenuOpen
            ? 'glass-menu-mobile border-b border-white/[0.10] py-3.5 sm:py-4 shadow-lg shadow-black/30'
            : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 sm:gap-6">
            {/* Logo Oficial da Inova — PNG original preservado */}
            <a
              href="#inicio"
              className="flex items-center gap-3 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] rounded-xl transition-all duration-200 hover:opacity-95 hover:scale-[1.01] active:scale-[0.98]"
              aria-label="Inova Soluções Digitais — Início"
            >
              <div className="relative h-9 sm:h-10 w-auto flex items-center">
                <img
                  src={INOVA_CONTACT.logo}
                  alt="Inova Soluções Digitais"
                  className="h-8 sm:h-9 w-auto object-contain transition-transform duration-200"
                  width="136"
                  height="36"
                  loading="eager"
                />
              </div>
            </a>

            {/* Menu de Navegação Desktop — Barra Horizontal com Indicador Deslizante Fluido */}
            <nav
              aria-label="Navegação principal"
              className="hidden lg:flex items-center bg-white/[0.04] border border-white/[0.08] p-1 rounded-full relative shadow-inner"
            >
              {/* Indicador animado contínuo que desliza entre os itens ativos */}
              <span
                aria-hidden="true"
                className="absolute top-1 bottom-1 rounded-full bg-[#8B5CF6] transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] shadow-[0_2px_12px_rgba(139,92,246,0.45)] pointer-events-none"
                style={{
                  left: `${indicatorStyle.left}px`,
                  width: `${indicatorStyle.width}px`,
                  opacity: indicatorStyle.opacity,
                  transform: 'translateZ(0)',
                }}
              >
                {/* Brilho curvo sutil de acabamento */}
                <span className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-white/10 to-white/20 pointer-events-none" />
              </span>

              {navLinks.map((link) => {
                const isSelected = effectiveSection === link.id;
                return (
                  <a
                    key={link.id}
                    ref={(el) => {
                      navRefs.current[link.id] = el;
                    }}
                    href={link.href}
                    className={`relative z-10 px-4 py-1.5 text-xs sm:text-sm rounded-full transition-colors duration-200 select-none flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] ${
                      isSelected
                        ? 'text-white font-semibold'
                        : 'text-[#B8BAC8] hover:text-[#F7F8FC]'
                    }`}
                  >
                    <span>{link.label}</span>
                  </a>
                );
              })}
            </nav>

            {/* Botão Solicitar Orçamento & Mobile Menu Toggle */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Botão Solicitar Orçamento no Desktop */}
              <a
                href={getWhatsAppUrl('Olá! Gostaria de solicitar um orçamento com a Inova Soluções Digitais.')}
                target="_blank"
                rel="noopener noreferrer"
                className="group hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-full bg-[#F7F8FC] text-[#0A0F2E] hover:bg-[#8B5CF6] hover:text-white transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-[#8B5CF6]/30 hover:-translate-y-0.5 active:scale-[0.97] active:translate-y-0.5 whitespace-nowrap min-h-[40px]"
              >
                <span>Solicitar orçamento</span>
                <ArrowUpRight className="w-4 h-4 text-[#0A0F2E] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
              </a>

              {/* Mobile / Tablet Hamburger & Close Button com acabamento translúcido */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`lg:hidden p-2.5 rounded-xl transition-all duration-200 active:scale-95 min-h-[44px] min-w-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] ${
                  mobileMenuOpen
                    ? 'text-white bg-white/[0.12] hover:bg-white/[0.18] border border-white/[0.22] shadow-sm shadow-black/20'
                    : 'text-[#F7F8FC] bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08]'
                }`}
                aria-expanded={mobileMenuOpen}
                aria-label={mobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
              >
                <div className="relative w-5 h-5 flex items-center justify-center">
                  {mobileMenuOpen ? (
                    <X className="w-5 h-5 text-white transition-transform duration-200" />
                  ) : (
                    <Menu className="w-5 h-5 text-white transition-transform duration-200" />
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Painel de Navegação Mobile — Superfície Translúcida com Glassmorphism (#0A0F2E com 78% opacidade e blur de 18px) */}
      {mobileMenuOpen && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:hidden">
          <div className="mt-2.5 pt-3 pb-5 border border-white/[0.10] glass-menu-mobile rounded-2xl px-3.5 shadow-2xl shadow-black/40 animate-in fade-in slide-in-from-top-3 duration-200 max-h-[calc(100vh-6rem)] overflow-y-auto">
            <nav className="flex flex-col gap-1.5" aria-label="Navegação mobile">
              {navLinks.map((link) => {
                const isSelected = effectiveSection === link.id;
                const IconComponent = link.icon;

                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={handleLinkClick}
                    className={`px-3.5 py-3 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-between active:scale-[0.98] active:translate-y-0.5 ${
                      isSelected
                        ? 'bg-[#8B5CF6]/15 text-white font-medium border border-[#8B5CF6]/35 shadow-sm shadow-[#8B5CF6]/10'
                        : 'text-[#D1D4E5] hover:text-white hover:bg-white/[0.05] border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-1.5 rounded-lg transition-colors ${
                          isSelected
                            ? 'bg-[#8B5CF6]/30 text-[#00C2FF] border border-[#8B5CF6]/40 shadow-sm shadow-[#8B5CF6]/20'
                            : 'bg-white/[0.06] text-[#A2A6BD]'
                        }`}
                      >
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <span className={isSelected ? 'text-white font-semibold' : 'text-[#D1D4E5]'}>
                        {link.label}
                      </span>
                    </div>

                    {isSelected && (
                      <span className="flex items-center gap-1.5 pl-2">
                        <span className="w-2 h-2 rounded-full bg-[#00C2FF] shadow-[0_0_8px_#00C2FF]" />
                      </span>
                    )}
                  </a>
                );
              })}

              <div className="pt-3 mt-2 border-t border-white/[0.08]">
                <a
                  href={getWhatsAppUrl('Olá! Gostaria de solicitar um orçamento com a Inova Soluções Digitais.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLinkClick}
                  className="group w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] hover:from-[#7C3AED] hover:to-[#4F46E5] text-white shadow-md shadow-[#8B5CF6]/25 hover:shadow-lg hover:shadow-[#8B5CF6]/40 whitespace-nowrap active:scale-[0.98] active:translate-y-0.5 transition-all duration-200 min-h-[46px]"
                >
                  <span>Solicitar orçamento no WhatsApp</span>
                  <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                </a>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};
