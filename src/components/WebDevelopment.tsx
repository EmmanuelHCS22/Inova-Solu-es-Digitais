import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Monitor,
  Smartphone,
  Tablet,
  ArrowUpRight,
  Zap,
  Layers,
  Store,
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
      id="desenvolvimento-web"
      ref={sectionRef}
      className="py-20 sm:py-28 lg:py-32 relative bg-[#111321] text-[#F7F7F5] border-t border-white/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Editorial com Tipografia Expressiva */}
        <div ref={headerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-12 sm:mb-16 lg:mb-20">
          <div className="lg:col-span-7">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#8B5CF6] font-semibold block mb-3">
              02 / DESENVOLVIMENTO WEB SOB MEDIDA
            </span>
            <h2
              className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.12] font-display"
              style={{ textWrap: 'balance' }}
            >
              Seu negócio merece uma presença digital de alto padrão.
            </h2>
          </div>

          <div className="lg:col-span-5 pb-1">
            <p className="text-sm sm:text-base lg:text-lg text-[#F7F7F5]/75 leading-relaxed font-normal mb-4">
              Projetamos sites rápidos, objetivos e elegantes, pensados para valorizar sua autoridade de mercado e converter visitantes em contatos qualificados.
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono text-[#F7F7F5]/70 pt-3 border-t border-white/10">
              <span className="text-white/85">Stack Moderna</span>
              <span aria-hidden="true" className="text-white/30">·</span>
              <span>Ultra Otimizado para Mobile</span>
              <span aria-hidden="true" className="text-white/30">·</span>
              <span>Sem Mensalidades Ocultas</span>
            </div>
          </div>
        </div>

        {/* Modalidades em Composição Editorial Assimétrica */}
        <div ref={modalitiesRef} className="mb-20 sm:mb-28 lg:mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            
            {/* Peça Protagonista (7 colunas): Site Institucional */}
            <div className="lg:col-span-7 bg-[#181B2E] rounded-2xl border border-[#8B5CF6]/40 p-6 sm:p-8 lg:p-10 shadow-2xl flex flex-col justify-between relative overflow-hidden group hover:border-[#8B5CF6]/70 transition-colors">
              
              {/* Marca sutil de fundo */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#8B5CF6]/10 rounded-full blur-3xl pointer-events-none" />

              <div>
                {/* Metadados Editoriais Limpos (Zero Pills) */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 sm:pb-5 mb-5 sm:mb-6 border-b border-white/10 text-xs font-mono text-[#F7F7F5]/70">
                  <span className="text-[#8B5CF6] font-semibold tracking-wider uppercase">
                    01 · FORMATO INSTITUCIONAL
                  </span>
                  <span className="text-white/60">
                    Proposta recomendada para autoridade corporativa
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 sm:p-2.5 rounded-xl bg-[#8B5CF6]/15 text-[#8B5CF6]">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white font-display tracking-tight">
                    Site Institucional Completo
                  </h3>
                </div>

                <p className="text-xs sm:text-sm lg:text-base text-[#F7F7F5]/75 leading-relaxed mb-6 sm:mb-8 max-w-xl">
                  Presença digital completa para apresentar a história da empresa, diferenciais competitivos, detalhamento de serviços e portfólio de projetos realizados.
                </p>

                {/* Grid Editorial de Entregáveis */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8 pt-5 sm:pt-6 border-t border-white/10">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F7F7F5]/85">
                      <span className="text-xs font-mono text-[#8B5CF6] font-bold mt-0.5">01</span>
                      <span>Apresentação corporativa estruturada</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F7F7F5]/85">
                      <span className="text-xs font-mono text-[#8B5CF6] font-bold mt-0.5">02</span>
                      <span>Páginas organizadas de serviços e diferenciais</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F7F7F5]/85">
                      <span className="text-xs font-mono text-[#8B5CF6] font-bold mt-0.5">03</span>
                      <span>Galeria de portfólio e projetos realizados</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F7F7F5]/85">
                      <span className="text-xs font-mono text-[#8B5CF6] font-bold mt-0.5">04</span>
                      <span>Integração com canais e mapa de localização</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botão de Ação Primário com Contraste Marcante (Responsivo para 320px/360px/390px) */}
              <div className="pt-5 sm:pt-6 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
                <a
                  href={getWhatsAppUrl('Olá! Gostaria de um orçamento para desenvolvimento de um Site Institucional completo.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-5 sm:px-6 py-3.5 rounded-xl text-xs sm:text-sm font-semibold bg-[#8B5CF6] hover:bg-[#7348D6] text-white transition-all shadow-lg shadow-[#8B5CF6]/20 active:scale-98 text-center min-h-[44px]"
                >
                  <span>Consultar Site Institucional</span>
                  <ArrowUpRight className="w-4 h-4 text-white shrink-0" />
                </a>
                <span className="text-xs font-mono text-[#F7F7F5]/50 text-center sm:text-right">
                  Personalização sob medida para sua marca
                </span>
              </div>
            </div>

            {/* Coluna Complementar (5 colunas): Landing Page & Catálogo Digital */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-5 sm:gap-6">
              
              {/* Modalidade: Landing Page */}
              <div className="bg-[#181B2E] rounded-2xl border border-white/10 p-5 sm:p-7 shadow-xl hover:border-white/20 transition-all flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#8B5CF6] font-semibold">
                      02 · FOCO DIRETO
                    </span>
                    <Zap className="w-4 h-4 text-[#8B5CF6]" />
                  </div>

                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2 font-display">
                    Landing Page de Alta Conversão
                  </h3>
                  <p className="text-xs sm:text-sm text-[#F7F7F5]/70 leading-relaxed mb-4 sm:mb-5">
                    Página estratégica de apresentação única focada em divulgar um produto ou serviço com carregamento instantâneo.
                  </p>

                  <div className="space-y-2 mb-5 sm:mb-6 text-xs text-[#F7F7F5]/80">
                    <div className="flex items-start gap-2">
                      <span className="text-xs font-mono text-[#8B5CF6] font-bold">·</span>
                      <span>Estrutura orientada à conversão direta</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-xs font-mono text-[#8B5CF6] font-bold">·</span>
                      <span>Apresentação objetiva de proposta de valor</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-xs font-mono text-[#8B5CF6] font-bold">·</span>
                      <span>Botões de contato com WhatsApp imediato</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-xs font-mono text-[#8B5CF6] font-bold">·</span>
                      <span>Carregamento instantâneo em celulares</span>
                    </div>
                  </div>
                </div>

                <a
                  href={getWhatsAppUrl('Olá! Gostaria de um orçamento para criação de uma Landing Page com a Inova.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors text-center min-h-[44px]"
                >
                  <span>Consultar Landing Page</span>
                  <ArrowUpRight className="w-4 h-4 text-white/70 shrink-0" />
                </a>
              </div>

              {/* Modalidade: Catálogo Digital */}
              <div className="bg-[#181B2E] rounded-2xl border border-white/10 p-5 sm:p-7 shadow-xl hover:border-white/20 transition-all flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#8B5CF6] font-semibold">
                      03 · VITRINE COMERCIAL
                    </span>
                    <Store className="w-4 h-4 text-[#8B5CF6]" />
                  </div>

                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2 font-display">
                    Catálogo Digital Interativo
                  </h3>
                  <p className="text-xs sm:text-sm text-[#F7F7F5]/70 leading-relaxed mb-4 sm:mb-5">
                    Mostruário interativo para exibir itens, preços sugeridos, especificações e pedidos diretos sem intermediários.
                  </p>

                  <div className="space-y-2 mb-5 sm:mb-6 text-xs text-[#F7F7F5]/80">
                    <div className="flex items-start gap-2">
                      <span className="text-xs font-mono text-[#8B5CF6] font-bold">·</span>
                      <span>Organização de produtos por categorias</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-xs font-mono text-[#8B5CF6] font-bold">·</span>
                      <span>Fotos de alta resolução e descrições claras</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-xs font-mono text-[#8B5CF6] font-bold">·</span>
                      <span>Botão de pedido com mensagem pré-formatada</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-xs font-mono text-[#8B5CF6] font-bold">·</span>
                      <span>Fácil navegação em qualquer smartphone</span>
                    </div>
                  </div>
                </div>

                <a
                  href={getWhatsAppUrl('Olá! Gostaria de solicitar um orçamento para criação de um Catálogo Digital de produtos.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors text-center min-h-[44px]"
                >
                  <span>Consultar Catálogo Digital</span>
                  <ArrowUpRight className="w-4 h-4 text-white/70 shrink-0" />
                </a>
              </div>

            </div>

          </div>
        </div>

        {/* Demonstração Visual Interativa de Responsividade */}
        <div ref={demoRef} className="rounded-2xl bg-[#181B2E] border border-white/10 p-5 sm:p-8 lg:p-10 shadow-2xl">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 mb-8 border-b border-white/10">
            <div>
              <span className="text-xs font-mono text-[#8B5CF6] uppercase tracking-wider block mb-1">
                LABORATÓRIO INTERATIVO
              </span>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white font-display tracking-tight">
                Adaptação visual em todos os dispositivos
              </h3>
              <p className="text-xs sm:text-sm text-[#F7F7F5]/65 mt-1 max-w-xl">
                Alterne entre formatos de tela e ramos de atividade para visualizar a flexibilidade do design e o comportamento responsivo real.
              </p>
            </div>

            {/* Controles Segmentados de Dispositivo (Zero Pills) */}
            <div className="flex items-center gap-1 bg-[#111321] p-1.5 rounded-xl border border-white/10 shrink-0 self-start lg:self-auto">
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

          {/* Seletores de Segmento com Estilo Editorial Limpo */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <span className="text-xs font-mono text-[#F7F7F5]/50 mr-2 uppercase tracking-wider w-full sm:w-auto">
              Segmentos:
            </span>
            {DEMO_SEGMENTS.map((seg) => (
              <button
                key={seg.id}
                type="button"
                onClick={() => setActiveSegment(seg.id)}
                className={`px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-lg text-xs font-medium transition-all min-h-[34px] ${
                  activeSegment === seg.id
                    ? 'bg-white text-[#111321] font-bold shadow-sm'
                    : 'bg-[#111321] text-[#F7F7F5]/70 hover:text-white hover:bg-white/5 border border-white/5'
                }`}
              >
                {seg.name}
              </button>
            ))}
          </div>

          {/* Canvas de Exibição Cinematográfica com Proporção Aperfeiçoada */}
          <div className="flex justify-center items-center py-2 sm:py-6 bg-[#111321]/60 rounded-xl border border-white/5 p-2 sm:p-6">
            <div
              className={`transition-all duration-300 rounded-xl bg-[#0E101D] border border-white/10 shadow-2xl p-3 sm:p-6 overflow-hidden ${
                deviceView === 'desktop'
                  ? 'w-full max-w-4xl'
                  : deviceView === 'tablet'
                  ? 'w-full max-w-xl'
                  : 'w-full max-w-[340px] sm:max-w-[360px] min-h-[480px] flex flex-col justify-between'
              }`}
            >
              {/* Moldura do Navegador / Dispositivo */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10 text-xs text-[#F7F7F5]/50 font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                </div>
                <div className="bg-white/5 px-3 sm:px-4 py-1 rounded-md border border-white/5 truncate max-w-[160px] sm:max-w-xs text-[#F7F7F5]/80 font-mono text-[10px] sm:text-[11px]">
                  cliente.{currentSegment.id}.inova-solucoes.com
                </div>
                <span className="text-[10px] text-[#F7F7F5]/50 uppercase font-mono">{deviceView}</span>
              </div>

              {/* Conteúdo Renderizado da Amostra */}
              <div className="rounded-lg bg-[#141624] p-4 sm:p-6 lg:p-7 border border-white/5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <span className="text-[10px] sm:text-[11px] font-mono tracking-wider uppercase text-[#8B5CF6]">
                      {currentSegment.tagline}
                    </span>
                    <span className="text-[10px] font-mono text-white/50">
                      Demonstração
                    </span>
                  </div>

                  <h4 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-white mb-2 leading-tight font-display">
                    {currentSegment.heroHeadline}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#F7F7F5]/70 mb-5 leading-relaxed max-w-xl">
                    {currentSegment.description}
                  </p>

                  {/* Métricas e Diferenciais (Sem truncamento rígido, quebra natural em 2 linhas) */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6 pt-4 border-t border-white/10">
                    {currentSegment.stats.map((st, i) => (
                      <div
                        key={i}
                        className="bg-white/5 p-2 sm:p-2.5 rounded-lg border border-white/5 text-center flex flex-col justify-center items-center"
                      >
                        <p className="text-xs sm:text-sm font-bold text-white font-mono tabular-nums leading-none">
                          {st.value}
                        </p>
                        {/* Quebra natural e legibilidade sem truncate */}
                        <p className="text-[9px] sm:text-[10px] text-[#F7F7F5]/70 mt-1 leading-tight text-center min-h-[2.2em] flex items-center justify-center">
                          {st.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                  <a
                    href={getWhatsAppUrl(`Olá! Gostaria de um site para o segmento de ${currentSegment.name}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white rounded-lg bg-[#8B5CF6] hover:bg-[#7348D6] shadow-sm transition-all text-center min-h-[40px]"
                  >
                    <span>Quero um projeto como este</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-white/80 shrink-0" />
                  </a>
                  <span className="text-[10px] sm:text-[11px] font-mono text-[#F7F7F5]/50 text-center sm:text-left">
                    Desenvolvido sob medida pela Inova
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Banner de Fechamento Editorial Responsivo */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6">
            <div className="text-center sm:text-left">
              <p className="text-base sm:text-lg font-bold text-white font-display">
                Pronto para transformar a imagem da sua empresa na internet?
              </p>
              <p className="text-xs sm:text-sm text-[#F7F7F5]/65 mt-0.5">
                Atendimento consultivo e proposta sob medida para sua necessidade e prazo.
              </p>
            </div>
            <a
              href={getWhatsAppUrl('Olá! Quero criar meu site com a Inova Soluções Digitais e gostaria de solicitar um orçamento.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#8B5CF6] hover:bg-[#7348D6] transition-all shadow-lg shadow-[#8B5CF6]/25 active:scale-98 text-center w-full sm:w-auto min-h-[44px]"
            >
              <span>Solicitar proposta de site</span>
              <ArrowUpRight className="w-4 h-4 text-white shrink-0" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
