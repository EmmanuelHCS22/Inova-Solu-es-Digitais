import React, { useState } from 'react';
import { ArrowUpRight, MessageSquare, Send, Check } from 'lucide-react';
import { getWhatsAppUrl } from '../data/inovaData';

export const ContactCTA: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string>('Site Institucional / Landing Page');
  const [userName, setUserName] = useState<string>('');
  const [userCompany, setUserCompany] = useState<string>('');
  const [userNotes, setUserNotes] = useState<string>('');

  const servicesList = [
    'Site Institucional / Landing Page',
    'Catálogo Digital de Produtos',
    'Plaquinhas NFC e QR Code',
    'Chaveiros NFC Personalizados',
    'BioSite para Instagram',
    'Design e Identidade Visual',
    'Otimização Google Meu Negócio',
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
    <section id="contato" className="py-28 relative bg-[#111321] text-[#F7F7F5] overflow-hidden border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-2xl bg-[#17192B] border border-white/10 p-8 sm:p-12 lg:p-14 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Lado Esquerdo: Mensagem de Conversão */}
            <div className="lg:col-span-6 text-left">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7357E8]" />
                <span className="text-xs uppercase tracking-[0.2em] text-[#F7F7F5]/70 font-semibold">
                  VAMOS CONVERSAR
                </span>
              </div>
              <h2
                className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-5 font-display"
                style={{ textWrap: 'balance' }}
              >
                Soluções sob medida para o seu negócio crescer.
              </h2>
              <p className="text-base sm:text-lg text-[#F7F7F5]/75 leading-relaxed mb-8 font-normal">
                Conte o que sua empresa busca e descubra como a Inova Soluções Digitais pode ajudar sua marca a se posicionar com autoridade e converter mais clientes.
              </p>

              {/* Quick perks */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-xs sm:text-sm text-[#F7F7F5]/80">
                  <Check className="w-4 h-4 text-[#7357E8]" />
                  <span>Atendimento consultivo direto pelo WhatsApp</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-[#F7F7F5]/80">
                  <Check className="w-4 h-4 text-[#7357E8]" />
                  <span>Propostas sem compromisso e orçamento sob medida</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-[#F7F7F5]/80">
                  <Check className="w-4 h-4 text-[#7357E8]" />
                  <span>Atendimento em Uberlândia e em todo o território nacional</span>
                </div>
              </div>

              {/* Direct WhatsApp Quick Button */}
              <div>
                <a
                  href={getWhatsAppUrl('Olá! Gostaria de pedir um orçamento para minha empresa.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg text-sm sm:text-base font-semibold text-white bg-[#7357E8] hover:bg-[#6348d6] shadow-sm transition-all whitespace-nowrap active:scale-98"
                >
                  <MessageSquare className="w-5 h-5 text-white" />
                  <span>Pedir orçamento pelo WhatsApp</span>
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </a>
              </div>
            </div>

            {/* Lado Direito: Formulário Prático Pré-Formatador */}
            <div className="lg:col-span-6 bg-[#0E101D] border border-white/10 rounded-xl p-6 sm:p-8 shadow-xl">
              <h3 className="text-lg font-bold text-white mb-2 font-display">
                Simulador de Mensagem de Orçamento
              </h3>
              <p className="text-xs text-[#F7F7F5]/60 mb-6">
                Selecione o serviço para iniciar o contato no WhatsApp já com o briefing formatado:
              </p>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#F7F7F5]/80 mb-1.5">
                    Qual serviço você procura?
                  </label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full bg-[#17192B] border border-white/10 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#7357E8] transition-colors"
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
                    <label className="block text-xs font-semibold text-[#F7F7F5]/80 mb-1.5">
                      Seu Nome
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Carlos Oliveira"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full bg-[#17192B] border border-white/10 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-[#F7F7F5]/40 focus:outline-none focus:border-[#7357E8] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#F7F7F5]/80 mb-1.5">
                      Sua Empresa / Ramo
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Barbearia ou Clínica"
                      value={userCompany}
                      onChange={(e) => setUserCompany(e.target.value)}
                      className="w-full bg-[#17192B] border border-white/10 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-[#F7F7F5]/40 focus:outline-none focus:border-[#7357E8] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#F7F7F5]/80 mb-1.5">
                    Informações adicionais (opcional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Conte sobre suas preferências, prazos ou objetivos..."
                    value={userNotes}
                    onChange={(e) => setUserNotes(e.target.value)}
                    className="w-full bg-[#17192B] border border-white/10 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-[#F7F7F5]/40 focus:outline-none focus:border-[#7357E8] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-5 rounded-lg text-xs sm:text-sm font-semibold text-white bg-[#7357E8] hover:bg-[#6348d6] shadow-sm flex items-center justify-center gap-2 active:scale-98 transition-all"
                >
                  <Send className="w-4 h-4 text-white" />
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
