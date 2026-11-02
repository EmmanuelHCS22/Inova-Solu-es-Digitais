import React, { useState } from 'react';
import { ArrowUpRight, MessageSquare, Send, Check } from 'lucide-react';
import { getWhatsAppUrl } from '../data/inovaData';

export const ContactCTA: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string>('Plaquinhas NFC e QR Code (Balcão)');
  const [userName, setUserName] = useState<string>('');
  const [userCompany, setUserCompany] = useState<string>('');
  const [userNotes, setUserNotes] = useState<string>('');

  const servicesList = [
    'Plaquinhas NFC e QR Code (Balcão)',
    'Chaveiros NFC em Impressão 3D',
    'Cartões de Visita NFC Inteligentes',
    'BioSite Profissional para Instagram',
    'Perfil da Empresa no Google (Google Meu Negócio)',
    'Sistema de Agendamento Online',
    'Catálogo Digital de Produtos',
    'Cardápio Digital Interativo',
    'Landing Page de Apresentação e Conversão',
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let msg = `Olá! Meu nome é ${userName || 'um cliente'}`;
    if (userCompany) {
      msg += ` da empresa ${userCompany}`;
    }
    msg += `. Gostaria de solicitar um orçamento para ${selectedService}.`;
    if (userNotes) {
      msg += ` Detalhes: ${userNotes}`;
    }
    window.open(getWhatsAppUrl(msg), '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contato" className="py-20 sm:py-28 lg:py-32 relative bg-[#0A0F2E] text-[#F7F8FC] overflow-hidden border-t border-white/[0.08]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-2xl bg-[#12183F] border border-white/[0.08] p-5 sm:p-10 lg:p-14 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
            
            {/* Lado Esquerdo: Mensagem de Conversão */}
            <div className="lg:col-span-6 text-left">
              <h2
                className="text-[clamp(1.5rem,5.2vw,3rem)] font-extrabold text-white tracking-tight mb-4 sm:mb-5 font-display leading-[1.15]"
                style={{ textWrap: 'balance' }}
              >
                Solicite um orçamento sob medida para o seu negócio.
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-[#F7F8FC]/75 leading-relaxed mb-6 sm:mb-8 font-normal">
                Conte o que sua empresa busca e descubra como a Inova Soluções Digitais pode ajudar sua marca a se conectar com clientes e organizar atendimentos.
              </p>

              {/* Vantagens do Atendimento */}
              <div className="space-y-3 mb-6 sm:mb-8">
                <div className="flex items-center gap-3 text-xs sm:text-sm text-[#F7F8FC]/85">
                  <Check className="w-4 h-4 text-[#00C2FF] shrink-0" />
                  <span>Atendimento consultivo direto pelo WhatsApp</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-[#F7F8FC]/85">
                  <Check className="w-4 h-4 text-[#00C2FF] shrink-0" />
                  <span>Propostas sem compromisso com valores claros</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-[#F7F8FC]/85">
                  <Check className="w-4 h-4 text-[#00C2FF] shrink-0" />
                  <span>Atendimento em Uberlândia e envio para todo o Brasil</span>
                </div>
              </div>

              {/* Botão de WhatsApp Direto */}
              <div>
                <a
                  href={getWhatsAppUrl('Olá! Gostaria de pedir um orçamento com a Inova Soluções Digitais.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#8B5CF6] hover:bg-[#6366F1] shadow-md shadow-[#8B5CF6]/25 hover:shadow-lg hover:shadow-[#8B5CF6]/40 hover:-translate-y-0.5 active:scale-[0.97] active:translate-y-0.5 transition-all duration-200 whitespace-nowrap min-h-[46px] w-full sm:w-auto"
                >
                  <MessageSquare className="w-4 h-4 text-white group-hover:scale-105 transition-transform duration-200" />
                  <span>Pedir orçamento pelo WhatsApp</span>
                  <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                </a>
              </div>
            </div>

            {/* Lado Direito: Formulário Prático Pré-Formatador */}
            <div className="lg:col-span-6 bg-[#0A0F2E] border border-white/[0.08] rounded-2xl p-5 sm:p-8 shadow-xl">
              <h3 className="text-base sm:text-lg font-bold text-white mb-1 font-display">
                Simulador de Mensagem de Orçamento
              </h3>
              <p className="text-xs text-[#F7F8FC]/60 mb-5 font-normal">
                Selecione o serviço para iniciar a conversa no WhatsApp com seu pedido estruturado:
              </p>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[#F7F8FC]/80 mb-1.5">
                    Qual solução você procura?
                  </label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full bg-[#12183F] border border-white/[0.08] rounded-xl px-3.5 py-3 text-base sm:text-sm text-white focus:outline-none focus:border-[#8B5CF6] transition-colors min-h-[46px]"
                  >
                    {servicesList.map((srv, idx) => (
                      <option key={idx} value={srv}>
                        {srv}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#F7F8FC]/80 mb-1.5">
                      Seu Nome
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Carlos Oliveira"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full bg-[#12183F] border border-white/[0.08] rounded-xl px-3.5 py-3 text-base sm:text-sm text-white placeholder-[#F7F8FC]/40 focus:outline-none focus:border-[#8B5CF6] transition-colors min-h-[46px]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#F7F8FC]/80 mb-1.5">
                      Sua Empresa ou Ramo
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Barbearia ou Loja"
                      value={userCompany}
                      onChange={(e) => setUserCompany(e.target.value)}
                      className="w-full bg-[#12183F] border border-white/[0.08] rounded-xl px-3.5 py-3 text-base sm:text-sm text-white placeholder-[#F7F8FC]/40 focus:outline-none focus:border-[#8B5CF6] transition-colors min-h-[46px]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#F7F8FC]/80 mb-1.5">
                    Informações adicionais (opcional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Conte sobre quantidades, logotipo ou prazos..."
                    value={userNotes}
                    onChange={(e) => setUserNotes(e.target.value)}
                    className="w-full bg-[#12183F] border border-white/[0.08] rounded-xl px-3.5 py-3 text-base sm:text-sm text-white placeholder-[#F7F8FC]/40 focus:outline-none focus:border-[#8B5CF6] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="group w-full py-3.5 px-5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#8B5CF6] hover:bg-[#6366F1] shadow-md shadow-[#8B5CF6]/25 hover:shadow-lg hover:shadow-[#8B5CF6]/40 hover:-translate-y-0.5 active:scale-[0.97] active:translate-y-0.5 flex items-center justify-center gap-2 transition-all duration-200 min-h-[48px] cursor-pointer"
                >
                  <Send className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                  <span>Iniciar conversa no WhatsApp</span>
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
