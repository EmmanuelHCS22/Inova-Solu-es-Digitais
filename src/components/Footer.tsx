import React from 'react';
import { MessageCircle, MapPin, Instagram } from 'lucide-react';
import { INOVA_CONTACT, getWhatsAppUrl } from '../data/inovaData';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0E101D] border-t border-white/10 pt-16 pb-12 text-[#F7F7F5]/70 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Coluna 1: Identidade e Logo */}
          <div className="lg:col-span-5">
            <a href="#inicio" className="inline-block mb-4">
              <img
                src={INOVA_CONTACT.logo}
                alt="Inova Soluções Digitais"
                className="h-9 w-auto object-contain"
                width="136"
                height="36"
              />
            </a>
            <p className="text-xs uppercase tracking-wider font-semibold text-[#8B5CF6] mb-2 font-mono">
              {INOVA_CONTACT.tagline}
            </p>
            <p className="text-xs sm:text-sm text-[#F7F7F5]/60 leading-relaxed max-w-sm mb-6">
              Plaquinhas NFC, chaveiros em impressão 3D, cartões inteligentes, BioSites e sistemas de agendamento online conectando o mundo físico ao digital.
            </p>

            <div className="flex items-center gap-2 text-xs text-[#F7F7F5]/50">
              <MapPin className="w-4 h-4 text-[#8B5CF6]" />
              <span>{INOVA_CONTACT.location} · Atendimento nacional</span>
            </div>
          </div>

          {/* Coluna 2: Navegação */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold mb-4">
              Navegação
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#inicio" className="hover:text-white transition-colors">
                  Início
                </a>
              </li>
              <li>
                <a href="#solucoes" className="hover:text-white transition-colors">
                  Soluções
                </a>
              </li>
              <li>
                <a href="#catalogo-padrao" className="hover:text-white transition-colors">
                  Plaquinhas NFC
                </a>
              </li>
              <li>
                <a href="#chaveiros-nfc" className="hover:text-white transition-colors">
                  Chaveiros 3D & Cartões
                </a>
              </li>
              <li>
                <a href="#biosite" className="hover:text-white transition-colors">
                  Presença Digital & BioSite
                </a>
              </li>
              <li>
                <a href="#desenvolvimento-web" className="hover:text-white transition-colors">
                  Agendamento & Sites
                </a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-white transition-colors">
                  Portfólio
                </a>
              </li>
              <li>
                <a href="#sobre" className="hover:text-white transition-colors">
                  Sobre a Inova
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Dúvidas Frequentes
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Soluções */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold mb-4">
              Soluções Oficiais
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#catalogo-padrao" className="hover:text-white transition-colors">
                  Plaquinhas NFC (Balcão)
                </a>
              </li>
              <li>
                <a href="#chaveiros-nfc" className="hover:text-white transition-colors">
                  Chaveiros NFC Impressão 3D
                </a>
              </li>
              <li>
                <a href="#chaveiros-nfc" className="hover:text-white transition-colors">
                  Cartões NFC Inteligentes
                </a>
              </li>
              <li>
                <a href="#biosite" className="hover:text-white transition-colors">
                  BioSite para Instagram
                </a>
              </li>
              <li>
                <a href="#google-empresa" className="hover:text-white transition-colors">
                  Perfil no Google (Otimização)
                </a>
              </li>
              <li>
                <a href="#desenvolvimento-web" className="hover:text-white transition-colors">
                  Agendamento Barbearias
                </a>
              </li>
              <li>
                <a href="#desenvolvimento-web" className="hover:text-white transition-colors">
                  Agendamento Lash & Salões
                </a>
              </li>
              <li>
                <a href="#desenvolvimento-web" className="hover:text-white transition-colors">
                  Catálogos & Cardápios
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna 4: Canais de Atendimento */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold mb-4">
              Atendimento Direto
            </h4>
            <div className="space-y-2.5 mb-6">
              <a
                href={getWhatsAppUrl('Olá! Gostaria de falar com o atendimento da Inova Soluções Digitais.')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-3 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/5"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <div className="text-xs">
                  <p className="font-semibold">{INOVA_CONTACT.displayPhone}</p>
                  <p className="text-[#F7F7F5]/50 text-[11px]">WhatsApp Oficial</p>
                </div>
              </a>

              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-3 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/5"
              >
                <Instagram className="w-4 h-4 text-pink-400 shrink-0" />
                <div className="text-xs">
                  <p className="font-semibold">Instagram Oficial</p>
                  <p className="text-[#F7F7F5]/50 text-[11px]">@inova.solucoesdigitais</p>
                </div>
              </a>
            </div>

            <p className="text-[11px] text-[#F7F7F5]/50 font-mono">
              Segunda a Sexta · 08h às 18h
            </p>
          </div>
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F7F7F5]/50">
          <p>
            © {currentYear} Inova Soluções Digitais. Todos os direitos reservados. CNPJ e serviços sediados em Uberlândia - MG.
          </p>
          <div className="flex items-center gap-4 text-[#F7F7F5]/50">
            <span>Privacidade & Diretrizes</span>
            <span>·</span>
            <span>Estúdio Inova</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
