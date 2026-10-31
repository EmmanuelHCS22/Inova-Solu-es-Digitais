import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Monitor, Smartphone, Tablet, ArrowUpRight, Check, Zap, Layers, Store } from 'lucide-react';
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
    name: 'Barbearia & Estética',
    tagline: 'Projeto Conceitual • Barber Classic & Studio',
    heroHeadline: 'Estilo autêntico, visual impecável e agendamento sem espera.',
    description: 'Site institucional com apresentação de serviços, equipe e botão de agendamento direto.',
    stats: [
      { label: 'Tempo de Carregamento', value: '< 0.8s' },
      { label: 'Agendamento Direto', value: 'WhatsApp' },
      { label: 'Responsividade', value: '100% Mobile' },
    ],
  },
  {
    id: 'transportadora',
    name: 'Transporte & Logística',
    tagline: 'Projeto Conceitual • Logística Express',
    heroHeadline: 'Agilidade, segurança e rastreamento para cargas corporativas.',
    description: 'Landing page focada na captação de cotações, mapa de rotas operacionais e apresentação técnica.',
    stats: [
      { label: 'Conversão em Cotações', value: 'Otimizada' },
      { label: 'Formulário Inteligente', value: '2 Cliques' },
      { label: 'Segurança e SSL', value: 'Certificado' },
    ],
  },
  {
    id: 'comercio',
    name: 'Comércio & Varejo Local',
    tagline: 'Projeto Conceitual • Vitrine Digital & Varejo',
    heroHeadline: 'Seu catálogo de produtos sempre atualizado no celular dos clientes.',
    description: 'Catálogo digital com filtros por categoria, botão de pedido para WhatsApp e fotos em alta resolução.',
    stats: [
      { label: 'Facilidade de Busca', value: 'Filtros Ágeis' },
      { label: 'Sem Comissões', value: 'Venda Direta' },
      { label: 'Atualização Fácil', value: 'Painel Simples' },
    ],
  },
  {
    id: 'servicos',
    name: 'Consultoria & Serviços',
    tagline: 'Projeto Conceitual • Serviços Especializados',
    heroHeadline: 'Autoridade profissional e geração contínua de novos clientes.',
    description: 'Site corporativo estruturado para transmitir credibilidade, tirar dúvidas e acelerar fechamentos comerciais.',
    stats: [
      { label: 'Google SEO Local', value: 'Estruturado' },
      { label: 'Prova de Serviços', value: 'Portfólio' },
      { label: 'Canal Oficial', value: 'Integrado' },
    ],
  },
];

export const WebDevelopment: React.FC = () => {
  const [activeSegment, setActiveSegment] = useState<string>('barbearia');
  const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const modalitiesRef = useRef<HTMLDivElement>(null);

  const currentSegment = DEMO_SEGMENTS.find((s) => s.id === activeSegment) || DEMO_SEGMENTS[0];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
          },
        }
      );

      if (modalitiesRef.current) {
        gsap.fromTo(
          modalitiesRef.current.children,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: modalitiesRef.current,
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
      id="desenvolvimento-web"
      ref={sectionRef}
      className="py-28 relative bg-[#111321] text-[#F7F7F5] border-t border-white/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div ref={headerRef} className="max-w-3xl mb-16 will-change-transform">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#F7F7F5]/70 font-semibold">
              DESENVOLVIMENTO WEB SOB MEDIDA
            </span>
          </div>
          <h2
            className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-5 font-display"
            style={{ textWrap: 'balance' }}
          >
            Seu negócio merece uma presença digital de alto padrão.
          </h2>
          <p className="text-base sm:text-lg text-[#F7F7F5]/75 leading-relaxed max-w-2xl">
            Projetamos sites rápidos, objetivos e elegantes, pensados para valorizar sua autoridade de mercado e converter visitantes em contatos qualificados.
          </p>
        </div>

        {/* 3 Modalidades Cards */}
        <div ref={modalitiesRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          
          {/* Modalidade 01: Landing Page */}
          <div className="rounded-xl bg-[#17192B] p-7 border border-white/10 hover:border-white/20 transition-all duration-300 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5 pb-3 border-b border-white/10">
                <span className="text-xs font-mono uppercase tracking-wider text-[#8B5CF6] font-semibold">
                  01 · FOCO DIRETO
                </span>
                <Zap className="w-4 h-4 text-[#8B5CF6]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 font-display">Landing Page</h3>
              <p className="text-sm text-[#F7F7F5]/70 leading-relaxed mb-6">
                Página estratégica de apresentação única focada em divulgar um produto ou serviço com alta taxa de conversão.
              </p>
              <ul className="space-y-2.5 mb-8 pt-4 border-t border-white/10 text-xs sm:text-sm text-[#F7F7F5]/80">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
                  <span>Estrutura orientada à conversão direta</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
                  <span>Apresentação objetiva de proposta de valor</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
                  <span>Botões de contato com WhatsApp imediato</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
                  <span>Carregamento instantâneo em celulares</span>
                </li>
              </ul>
            </div>
            <a
              href={getWhatsAppUrl('Olá! Gostaria de um orçamento para criação de uma Landing Page com a Inova.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between w-full py-3 px-4 rounded-lg text-xs sm:text-sm font-semibold bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors"
            >
              <span>Consultar Landing Page</span>
              <ArrowUpRight className="w-4 h-4 text-white/70" />
            </a>
          </div>

          {/* Modalidade 02: Site Institucional (Featured Studio Piece) */}
          <div className="rounded-xl bg-[#1C1F35] p-7 border-2 border-[#8B5CF6] relative shadow-2xl flex flex-col justify-between">
            <div className="absolute -top-3 left-6 px-3 py-0.5 bg-[#8B5CF6] rounded text-[11px] font-bold tracking-wider text-white uppercase">
              Mais Escolhido
            </div>
            <div>
              <div className="flex items-center justify-between mb-5 pb-3 border-b border-white/10 mt-1">
                <span className="text-xs font-mono uppercase tracking-wider text-white/90 font-semibold">
                  02 · CORPORATIVO
                </span>
                <Layers className="w-4 h-4 text-[#8B5CF6]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 font-display">Site Institucional</h3>
              <p className="text-sm text-[#F7F7F5]/70 leading-relaxed mb-6">
                Presença digital completa para apresentar a história da empresa, diferenciais, serviços detalhados e portfólio.
              </p>
              <ul className="space-y-2.5 mb-8 pt-4 border-t border-white/10 text-xs sm:text-sm text-[#F7F7F5]/80">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
                  <span>Apresentação corporativa estruturada</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
                  <span>Páginas organizadas de serviços e diferenciais</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
                  <span>Galeria de portfólio e projetos realizados</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
                  <span>Integração com canais e mapa de localização</span>
                </li>
              </ul>
            </div>
            <a
              href={getWhatsAppUrl('Olá! Gostaria de um orçamento para desenvolvimento de um Site Institucional completo.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between w-full py-3 px-4 rounded-lg text-xs sm:text-sm font-semibold bg-[#8B5CF6] hover:bg-[#6348d6] text-white transition-all shadow-md active:scale-98"
            >
              <span>Consultar Site Institucional</span>
              <ArrowUpRight className="w-4 h-4 text-white" />
            </a>
          </div>

          {/* Modalidade 03: Catálogo Digital */}
          <div className="rounded-xl bg-[#17192B] p-7 border border-white/10 hover:border-white/20 transition-all duration-300 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5 pb-3 border-b border-white/10">
                <span className="text-xs font-mono uppercase tracking-wider text-[#8B5CF6] font-semibold">
                  03 · CATÁLOGO
                </span>
                <Store className="w-4 h-4 text-[#8B5CF6]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 font-display">Catálogo Digital</h3>
              <p className="text-sm text-[#F7F7F5]/70 leading-relaxed mb-6">
                Mostruário interativo para exibir itens, preços sugeridos, especificações e pedidos diretos sem intermediários.
              </p>
              <ul className="space-y-2.5 mb-8 pt-4 border-t border-white/10 text-xs sm:text-sm text-[#F7F7F5]/80">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
                  <span>Organização de produtos por categorias</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
                  <span>Fotos de alta resolução e descrições claras</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
                  <span>Botão de pedido com mensagem pré-formatada</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
                  <span>Fácil navegação em qualquer smartphone</span>
                </li>
              </ul>
            </div>
            <a
              href={getWhatsAppUrl('Olá! Gostaria de solicitar um orçamento para criação de um Catálogo Digital de produtos.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between w-full py-3 px-4 rounded-lg text-xs sm:text-sm font-semibold bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors"
            >
              <span>Consultar Catálogo Digital</span>
              <ArrowUpRight className="w-4 h-4 text-white/70" />
            </a>
          </div>
        </div>

        {/* Demonstração Visual Interativa de Responsividade */}
        <div className="rounded-2xl bg-[#17192B] border border-white/10 p-6 sm:p-9 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 mb-8 border-b border-white/10">
            <div>
              <span className="text-xs font-mono text-[#8B5CF6] uppercase tracking-wider block mb-1">
                DEMONSTRAÇÃO DE RESPONSIVIDADE
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
                Adaptação visual em todos os dispositivos
              </h3>
              <p className="text-xs sm:text-sm text-[#F7F7F5]/60 mt-1">
                Alterne entre formatos e ramos de atividade para visualizar a flexibilidade do design.
              </p>
            </div>

            {/* Device Toggle Controls */}
            <div className="flex items-center gap-1.5 bg-white/5 p-1 rounded-lg border border-white/10 shrink-0 self-start lg:self-auto">
              <button
                type="button"
                onClick={() => setDeviceView('desktop')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                  deviceView === 'desktop'
                    ? 'bg-[#8B5CF6] text-white shadow-sm'
                    : 'text-[#F7F7F5]/60 hover:text-white'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Desktop</span>
              </button>
              <button
                type="button"
                onClick={() => setDeviceView('tablet')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                  deviceView === 'tablet'
                    ? 'bg-[#8B5CF6] text-white shadow-sm'
                    : 'text-[#F7F7F5]/60 hover:text-white'
                }`}
              >
                <Tablet className="w-3.5 h-3.5" />
                <span>Tablet</span>
              </button>
              <button
                type="button"
                onClick={() => setDeviceView('mobile')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                  deviceView === 'mobile'
                    ? 'bg-[#8B5CF6] text-white shadow-sm'
                    : 'text-[#F7F7F5]/60 hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Celular</span>
              </button>
            </div>
          </div>

          {/* Segment Selector Tabs */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <span className="text-xs text-[#F7F7F5]/50 mr-2 font-medium">Segmentos:</span>
            {DEMO_SEGMENTS.map((seg) => (
              <button
                key={seg.id}
                type="button"
                onClick={() => setActiveSegment(seg.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeSegment === seg.id
                    ? 'bg-[#8B5CF6] text-white font-semibold'
                    : 'bg-white/5 text-[#F7F7F5]/70 hover:bg-white/10 hover:text-white border border-white/5'
                }`}
              >
                {seg.name}
              </button>
            ))}
          </div>

          {/* Interactive Screen Preview */}
          <div className="flex justify-center items-center py-4">
            <div
              className={`transition-all duration-300 rounded-xl bg-[#0E101D] border border-white/10 shadow-2xl p-4 sm:p-6 overflow-hidden ${
                deviceView === 'desktop'
                  ? 'w-full max-w-4xl'
                  : deviceView === 'tablet'
                  ? 'w-full max-w-xl'
                  : 'w-full max-w-sm'
              }`}
            >
              {/* Browser chrome header */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10 text-xs text-[#F7F7F5]/50 font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                </div>
                <div className="bg-white/5 px-4 py-1 rounded-md border border-white/5 truncate max-w-[200px] sm:max-w-xs text-[#F7F7F5]/75">
                  cliente.{currentSegment.id}.inova-solucoes.com
                </div>
                <span className="text-[10px] text-[#F7F7F5]/50 uppercase">{deviceView}</span>
              </div>

              {/* Rendered Website Interior Preview */}
              <div className="rounded-lg bg-[#141624] p-6 border border-white/5">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono tracking-wider uppercase text-[#8B5CF6]">
                    {currentSegment.tagline}
                  </span>
                  <span className="text-[10px] text-white/60">
                    Demonstração
                  </span>
                </div>

                <h4 className="text-xl sm:text-2xl font-extrabold text-white mb-2 leading-tight font-display">
                  {currentSegment.heroHeadline}
                </h4>
                <p className="text-xs sm:text-sm text-[#F7F7F5]/70 mb-6 leading-relaxed">
                  {currentSegment.description}
                </p>

                {/* KPI/Feature Strip */}
                <div className="grid grid-cols-3 gap-3 mb-6 pt-4 border-t border-white/10">
                  {currentSegment.stats.map((st, i) => (
                    <div key={i} className="bg-white/5 p-2 sm:p-3 rounded-lg border border-white/5 text-center">
                      <p className="text-xs sm:text-sm font-bold text-white tabular-nums">{st.value}</p>
                      <p className="text-[10px] text-[#F7F7F5]/50 mt-0.5 truncate">{st.label}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={getWhatsAppUrl(`Olá! Gostaria de um site para o segmento de ${currentSegment.name}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white rounded-lg bg-[#8B5CF6] hover:bg-[#6348d6] shadow-sm transition-all"
                  >
                    <span>Quero um projeto como este</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-white/80" />
                  </a>
                  <span className="text-[11px] text-[#F7F7F5]/50">
                    Desenvolvido sob medida pela Inova
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Banner */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-base sm:text-lg font-bold text-white">
                Pronto para transformar a imagem da sua empresa na internet?
              </p>
              <p className="text-xs sm:text-sm text-[#F7F7F5]/60">
                Atendimento consultivo e proposta sob medida para sua necessidade.
              </p>
            </div>
            <a
              href={getWhatsAppUrl('Olá! Quero criar meu site com a Inova Soluções Digitais e gostaria de solicitar um orçamento.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold text-white bg-[#8B5CF6] hover:bg-[#6348d6] transition-all shadow-md active:scale-98 whitespace-nowrap"
            >
              <span>Solicitar proposta de site</span>
              <ArrowUpRight className="w-4 h-4 text-white" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
