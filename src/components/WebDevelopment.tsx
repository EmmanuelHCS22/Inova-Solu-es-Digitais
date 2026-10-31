import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Monitor,
  Smartphone,
  Tablet,
  ArrowUpRight,
  Calendar,
  Store,
  Sparkles,
  Check,
  Clock,
  MessageCircle,
} from 'lucide-react';
import { getWhatsAppUrl } from '../data/inovaData';

gsap.registerPlugin(ScrollTrigger);

interface DemoSegment {
  id: string;
  name: string;
  tagline: string;
  heroHeadline: string;
  description: string;
  stats: { label: string; value: string }[];
}

const DEMO_SEGMENTS: DemoSegment[] = [
  {
    id: 'barbearia',
    name: 'Barbearias',
    tagline: 'Agendamento • Barbearias & Salões Masculinos',
    heroHeadline: 'Corte, barba e horário marcado sem fila de espera.',
    description: 'Página mobile com catálogo de serviços, escolha de barbeiro e sistema de agendamento ágil pelo próprio cliente.',
    stats: [
      { label: 'Tempo de Agendamento', value: '< 1 min' },
      { label: 'Processo Direto', value: '3 Cliques' },
      { label: 'Menos Mensagens no WhatsApp', value: 'Notável' },
    ],
  },
  {
    id: 'cabeleireiras',
    name: 'Cabeleireiras & Salões',
    tagline: 'Agendamento • Salão de Beleza & Cabelos',
    heroHeadline: 'Mechas, corte, escova e tratamentos com hora marcada online.',
    description: 'Organização prática da agenda da profissional, permitindo que as clientes escolham o procedimento e o horário disponível.',
    stats: [
      { label: 'Agenda 24 Horas', value: 'Automática' },
      { label: 'Organização da Rotina', value: 'Total' },
      { label: 'Acesso pelo Celular', value: '100% Mobile' },
    ],
  },
  {
    id: 'lash-designer',
    name: 'Lash Designers',
    tagline: 'Agendamento • Lash & Extensão de Cílios',
    heroHeadline: 'Extensão de cílios, manutenção e horários marcados pelo celular.',
    description: 'Apresentação visual dos procedimentos com fotos de trabalhos e botão de agendamento disponível a qualquer hora.',
    stats: [
      { label: 'Agendamento Online', value: '24h' },
      { label: 'Sem Parar o Atendimento', value: 'Tranquilo' },
      { label: 'Confirmação Automática', value: 'Direta' },
    ],
  },
  {
    id: 'nail-designer',
    name: 'Nail Designers',
    tagline: 'Agendamento • Alongamento & Nail Art',
    heroHeadline: 'Alongamento em fibra, esmaltação e horários vagos na tela.',
    description: 'Vitrine digital com catálogo de serviços, tabela de valores e escolha rápida de horários sem troca infinita de mensagens.',
    stats: [
      { label: 'Catálogo de Serviços', value: 'Integrado' },
      { label: 'Menor Índice de Faltas', value: 'Efetivo' },
      { label: 'Facilidade de Acesso', value: 'Sem App' },
    ],
  },
  {
    id: 'estetica-beleza',
    name: 'Profissionais da Estética',
    tagline: 'Agendamento • Estética Facial & Corporal',
    heroHeadline: 'Limpeza de pele, massagens e protocolos com horário organizado.',
    description: 'Página profissional para clínicas de estética, biomédicas e massoterapeutas gerenciarem seus atendimentos com pontualidade.',
    stats: [
      { label: 'Apresentação Profissional', value: 'Elegante' },
      { label: 'Gestão de Horários', value: 'Organizada' },
      { label: 'Comunicação Clara', value: 'WhatsApp' },
    ],
  },
];

export const WebDevelopment: React.FC = () => {
  const [activeSegment, setActiveSegment] = useState<string>('barbearia');
  const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const modalitiesRef = useRef<HTMLDivElement>(null);
  const demoRef = useRef<HTMLDivElement>(null);

  const currentSegment = DEMO_SEGMENTS.find((s) => s.id === activeSegment) || DEMO_SEGMENTS[0];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
          },
        }
      );

      if (modalitiesRef.current) {
        gsap.fromTo(
          modalitiesRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: modalitiesRef.current,
              start: 'top 80%',
            },
          }
        );
      }

      if (demoRef.current) {
        gsap.fromTo(
          demoRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: demoRef.current,
              start: 'top 80%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="agendamento-online"
      ref={sectionRef}
      className="py-20 sm:py-28 lg:py-32 relative bg-[#181B2E] text-[#F7F7F5] border-t border-white/10 overflow-hidden"
    >
      {/* Âncora para links antigos */}
      <div id="desenvolvimento-web" className="relative -top-24 pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Editorial */}
        <div ref={headerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-12 sm:mb-16 lg:mb-20">
          <div className="lg:col-span-7">
            <h2
              className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.12] font-display"
              style={{ textWrap: 'balance' }}
            >
              Agendamento online e sites focados em serviços.
            </h2>
          </div>

          <div className="lg:col-span-5 pb-1">
            <p className="text-sm sm:text-base lg:text-lg text-[#F7F7F5]/75 leading-relaxed font-normal mb-4">
              Soluções direcionadas a barbearias, cabeleireiras, Lash Designers, Nail Designers e profissionais da estética que buscam organizar horários e atender sem interrupções.
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#F7F7F5]/70 pt-3 border-t border-white/10 font-medium">
              <span>Agendamento 24h</span>
              <span aria-hidden="true" className="text-white/30">·</span>
              <span>Menos mensagens no WhatsApp</span>
              <span aria-hidden="true" className="text-white/30">·</span>
              <span>Menor índice de faltas</span>
            </div>
          </div>
        </div>

        {/* Modalidades em Composição Editorial */}
        <div ref={modalitiesRef} className="mb-20 sm:mb-28 lg:mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            
            {/* Peça Protagonista: Sistema de Agendamento Online */}
            <div className="lg:col-span-7 bg-[#111321] rounded-2xl border border-[#8B5CF6]/40 p-6 sm:p-8 lg:p-10 shadow-2xl flex flex-col justify-between relative overflow-hidden group hover:border-[#8B5CF6]/70 transition-colors">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#8B5CF6]/10 rounded-full blur-3xl pointer-events-none" />

              <div>
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-white/10 text-xs text-[#F7F7F5]/70 font-medium">
                  <span className="text-[#8B5CF6] font-semibold uppercase tracking-wider">
                    Sistema de Agendamento Online
                  </span>
                  <span className="text-white/60">
                    Barbearias, cabeleireiras e estética
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 sm:p-2.5 rounded-xl bg-[#8B5CF6]/15 text-[#8B5CF6]">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white font-display tracking-tight">
                    Mais facilidade na rotina de agendamentos
                  </h3>
                </div>

                <p className="text-xs sm:text-sm lg:text-base text-[#F7F7F5]/75 leading-relaxed mb-6 max-w-xl font-normal">
                  Seus clientes escolhem o serviço desejado, o profissional e o horário disponível em poucos cliques pelo celular. Você não precisa parar seu trabalho para responder perguntas de horários disponíveis no WhatsApp.
                </p>

                {/* Grid de Benefícios Concretos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 pt-5 border-t border-white/10">
                  <div className="space-y-2.5">
                    <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F7F7F5]/85">
                      <Check className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
                      <span>Catálogo de serviços com valores e tempo de duração</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F7F7F5]/85">
                      <Check className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
                      <span>Escolha individual de profissional da equipe</span>
                    </div>
                  </div>
                  <div className="space-y-2.5">
                    <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F7F7F5]/85">
                      <Check className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
                      <span>Confirmação que reduz faltas e atrasos</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F7F7F5]/85">
                      <Check className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
                      <span>Funciona direto no navegador, sem app para instalar</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botão de Solicitação */}
              <div className="pt-5 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <a
                  href={getWhatsAppUrl('Olá! Gostaria de um orçamento para implantar o Sistema de Agendamento Online no meu negócio.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-semibold bg-[#8B5CF6] hover:bg-[#7348D6] text-white transition-all shadow-lg shadow-[#8B5CF6]/20 active:scale-98 text-center min-h-[44px]"
                >
                  <span>Solicitar orçamento de agendamento</span>
                  <ArrowUpRight className="w-4 h-4 text-white shrink-0" />
                </a>
                <span className="text-xs text-[#F7F7F5]/50 text-center sm:text-right">
                  Personalizado para os seus horários e serviços
                </span>
              </div>
            </div>

            {/* Coluna Complementar: Páginas de Serviços e Catálogos */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-5 sm:gap-6">
              
              {/* Modalidade: Página de Serviços e Procedimentos */}
              <div className="bg-[#111321] rounded-2xl border border-white/10 p-5 sm:p-7 shadow-xl hover:border-white/20 transition-all flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#8B5CF6]">
                      Páginas de Serviços
                    </span>
                    <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 font-display">
                    Página de Procedimentos & Serviços
                  </h3>
                  <p className="text-xs sm:text-sm text-[#F7F7F5]/70 leading-relaxed mb-4">
                    Página desenvolvida para valorizar procedimentos de Lash Design, Nail Design, estética e beleza, apresentando fotos de resultados e botão direto de agendamento.
                  </p>

                  <div className="space-y-2 mb-5 text-xs text-[#F7F7F5]/80">
                    <div className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0 mt-0.5" />
                      <span>Galeria de fotos reais de trabalhos e resultados</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0 mt-0.5" />
                      <span>Detalhamento dos procedimentos e tabela de valores</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0 mt-0.5" />
                      <span>Abertura ultrarrápida no celular para link na bio</span>
                    </div>
                  </div>
                </div>

                <a
                  href={getWhatsAppUrl('Olá! Gostaria de consultar uma Página de Serviços e Procedimentos com a Inova.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors text-center min-h-[44px]"
                >
                  <span>Consultar Página de Serviços</span>
                  <ArrowUpRight className="w-4 h-4 text-white/70 shrink-0" />
                </a>
              </div>

              {/* Modalidade: Catálogos e Cardápios Digitais */}
              <div className="bg-[#111321] rounded-2xl border border-white/10 p-5 sm:p-7 shadow-xl hover:border-white/20 transition-all flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#8B5CF6]">
                      Catálogos & Cardápios
                    </span>
                    <Store className="w-4 h-4 text-[#8B5CF6]" />
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 font-display">
                    Catálogos e Cardápios Digitais
                  </h3>
                  <p className="text-xs sm:text-sm text-[#F7F7F5]/70 leading-relaxed mb-4">
                    Sites profissionais estruturados para exibição de produtos ou cardápios alimentícios, facilitando consultas e pedidos no WhatsApp.
                  </p>

                  <div className="space-y-2 mb-5 text-xs text-[#F7F7F5]/80">
                    <div className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0 mt-0.5" />
                      <span>Organização limpa por categorias com fotos</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0 mt-0.5" />
                      <span>Pedidos enviados diretamente para o WhatsApp</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0 mt-0.5" />
                      <span>Sem taxas sobre vendas ou comissões</span>
                    </div>
                  </div>
                </div>

                <a
                  href={getWhatsAppUrl('Olá! Gostaria de solicitar um orçamento para Catálogo ou Cardápio Digital.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors text-center min-h-[44px]"
                >
                  <span>Consultar Catálogo ou Cardápio</span>
                  <ArrowUpRight className="w-4 h-4 text-white/70 shrink-0" />
                </a>
              </div>

            </div>

          </div>
        </div>

        {/* Demonstração Interativa de Responsividade */}
        <div ref={demoRef} className="rounded-2xl bg-[#111321] border border-white/10 p-5 sm:p-8 lg:p-10 shadow-2xl">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 mb-8 border-b border-white/10">
            <div>
              <span className="text-xs font-semibold text-[#8B5CF6] uppercase tracking-wider block mb-1">
                Demonstração Interativa
              </span>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white font-display tracking-tight">
                Adaptação visual em celulares, tablets e computadores
              </h3>
              <p className="text-xs sm:text-sm text-[#F7F7F5]/65 mt-1 max-w-xl">
                Alterne entre formatos de tela e veja como as páginas de agendamento se adaptam perfeitamente ao celular dos seus clientes.
              </p>
            </div>

            {/* Controles de Dispositivo */}
            <div className="flex items-center gap-1 bg-[#0C0D17] p-1.5 rounded-xl border border-white/10 shrink-0 self-start lg:self-auto">
              <button
                type="button"
                onClick={() => setDeviceView('desktop')}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-2 text-xs font-semibold rounded-lg transition-all duration-200 min-h-[38px] ${
                  deviceView === 'desktop'
                    ? 'bg-[#8B5CF6] text-white shadow-sm'
                    : 'text-[#F7F7F5]/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <Monitor className="w-3.5 h-3.5 shrink-0" />
                <span>Desktop</span>
              </button>
              <button
                type="button"
                onClick={() => setDeviceView('tablet')}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-2 text-xs font-semibold rounded-lg transition-all duration-200 min-h-[38px] ${
                  deviceView === 'tablet'
                    ? 'bg-[#8B5CF6] text-white shadow-sm'
                    : 'text-[#F7F7F5]/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <Tablet className="w-3.5 h-3.5 shrink-0" />
                <span>Tablet</span>
              </button>
              <button
                type="button"
                onClick={() => setDeviceView('mobile')}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-2 text-xs font-semibold rounded-lg transition-all duration-200 min-h-[38px] ${
                  deviceView === 'mobile'
                    ? 'bg-[#8B5CF6] text-white shadow-sm'
                    : 'text-[#F7F7F5]/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5 shrink-0" />
                <span>Celular</span>
              </button>
            </div>
          </div>

          {/* Seletores de Segmento */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <span className="text-xs text-[#F7F7F5]/50 mr-2 uppercase tracking-wider font-semibold w-full sm:w-auto">
              Segmentos atendidos:
            </span>
            {DEMO_SEGMENTS.map((seg) => (
              <button
                key={seg.id}
                type="button"
                onClick={() => setActiveSegment(seg.id)}
                className={`px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-lg text-xs font-medium transition-all min-h-[34px] ${
                  activeSegment === seg.id
                    ? 'bg-white text-[#111321] font-bold shadow-sm'
                    : 'bg-[#0C0D17] text-[#F7F7F5]/70 hover:text-white hover:bg-white/5 border border-white/5'
                }`}
              >
                {seg.name}
              </button>
            ))}
          </div>

          {/* Canvas de Exibição */}
          <div className="flex justify-center items-center py-2 sm:py-6 bg-[#0C0D17]/80 rounded-xl border border-white/5 p-2 sm:p-6">
            <div
              className={`transition-all duration-300 rounded-xl bg-[#0E101D] border border-white/10 shadow-2xl p-3 sm:p-6 overflow-hidden ${
                deviceView === 'desktop'
                  ? 'w-full max-w-4xl'
                  : deviceView === 'tablet'
                  ? 'w-full max-w-xl'
                  : 'w-full max-w-[340px] sm:max-w-[360px] min-h-[480px] flex flex-col justify-between'
              }`}
            >
              {/* Moldura do Dispositivo */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10 text-xs text-[#F7F7F5]/50 font-medium">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                </div>
                <div className="bg-white/5 px-3 py-1 rounded-md border border-white/5 truncate max-w-[180px] sm:max-w-xs text-[#F7F7F5]/80 text-[11px]">
                  agendamento.{currentSegment.id}.inova-solucoes.com
                </div>
                <span className="text-[10px] text-[#F7F7F5]/50 uppercase">{deviceView}</span>
              </div>

              {/* Conteúdo Renderizado da Amostra */}
              <div className="rounded-lg bg-[#141624] p-4 sm:p-6 lg:p-7 border border-white/5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] uppercase tracking-wider text-[#8B5CF6] font-semibold">
                      {currentSegment.tagline}
                    </span>
                    <span className="text-[10px] text-white/50">
                      Demonstração
                    </span>
                  </div>

                  <h4 className="text-lg sm:text-xl font-extrabold text-white mb-2 leading-tight font-display">
                    {currentSegment.heroHeadline}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#F7F7F5]/70 mb-5 leading-relaxed max-w-xl font-normal">
                    {currentSegment.description}
                  </p>

                  <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6 pt-4 border-t border-white/10">
                    {currentSegment.stats.map((st, i) => (
                      <div
                        key={i}
                        className="bg-white/5 p-2 sm:p-2.5 rounded-lg border border-white/5 text-center flex flex-col justify-center items-center"
                      >
                        <p className="text-xs sm:text-sm font-bold text-white leading-none">
                          {st.value}
                        </p>
                        <p className="text-[10px] text-[#F7F7F5]/70 mt-1 leading-tight text-center">
                          {st.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                  <a
                    href={getWhatsAppUrl(`Olá! Gostaria de consultar um sistema de agendamento online para ${currentSegment.name}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white rounded-lg bg-[#8B5CF6] hover:bg-[#7348D6] shadow-sm transition-all text-center min-h-[40px]"
                  >
                    <span>Quero agendamento online para {currentSegment.name}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-white/80 shrink-0" />
                  </a>
                  <span className="text-[11px] text-[#F7F7F5]/50 text-center sm:text-left">
                    Desenvolvido sob medida pela Inova
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Banner de Fechamento */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6">
            <div className="text-center sm:text-left">
              <p className="text-base sm:text-lg font-bold text-white font-display">
                Quer mais clientes agendando sozinhos e menos tempo no WhatsApp?
              </p>
              <p className="text-xs sm:text-sm text-[#F7F7F5]/65 mt-0.5">
                Atendimento consultivo e proposta sob medida para sua barbearia, salão ou clínica de estética.
              </p>
            </div>
            <a
              href={getWhatsAppUrl('Olá! Quero conhecer o sistema de agendamento online da Inova Soluções Digitais e solicitar um orçamento.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#8B5CF6] hover:bg-[#7348D6] transition-all shadow-lg shadow-[#8B5CF6]/25 active:scale-98 text-center w-full sm:w-auto min-h-[44px]"
            >
              <span>Solicitar orçamento de agendamento</span>
              <ArrowUpRight className="w-4 h-4 text-white shrink-0" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
