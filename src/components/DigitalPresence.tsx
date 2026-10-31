import React, { useState } from 'react';
import {
  ArrowUpRight,
  Search,
  Smartphone,
  Globe,
  Store,
  UtensilsCrossed,
  Layout,
  MessageCircle,
  Check,
  CreditCard,
} from 'lucide-react';
import { getWhatsAppUrl } from '../data/inovaData';

interface DigitalTool {
  id: string;
  name: string;
  badge: string;
  icon: React.ReactNode;
  summary: string;
  benefits: string[];
  image?: string;
  alt?: string;
  whatsappMessage: string;
}

export const DigitalPresence: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('google-perfil');

  const tools: DigitalTool[] = [
    {
      id: 'google-perfil',
      name: 'Perfil da Empresa no Google (Google Meu Negócio)',
      badge: 'Visibilidade nas Buscas',
      icon: <Search className="w-5 h-5 text-[#8B5CF6]" />,
      summary:
        'Criação e estruturação completa do Perfil da Empresa no Google. Padronizamos informações comerciais, categorias, fotos de fachada e orientamos a coleta de avaliações para melhorar a presença do seu negócio nas buscas da sua região.',
      benefits: [
        'Enquadramento nas categorias certas do Google para busca local',
        'Horários, telefone, endereço e rotas organizados para o cliente',
        'Orientações práticas para incentivar avaliações espontâneas',
        'Fotos de fachada, ambiente e serviços em alta qualidade',
      ],
      image: '/assets/inova/google-perfil.jpeg',
      alt: 'Perfil da Empresa no Google organizado e otimizado pela Inova Soluções Digitais',
      whatsappMessage:
        'Olá! Gostaria de um orçamento para criação e otimização do Perfil da Empresa no Google (Google Meu Negócio).',
    },
    {
      id: 'biosite',
      name: 'BioSite Profissional',
      badge: 'Centralização de Links',
      icon: <Smartphone className="w-5 h-5 text-[#8B5CF6]" />,
      summary:
        'Uma página digital desenvolvida sob medida para reunir informações, redes sociais, botão direto de WhatsApp, catálogo e localização em um único endereço. Ideal para colocar no link da bio do Instagram.',
      benefits: [
        'Carregamento leve e ultrarrápido em qualquer smartphone',
        'Botão em destaque para contato direto no WhatsApp',
        'Design limpo com o logotipo e as cores da sua empresa',
        'Sem taxas mensais de plataformas de links genéricas',
      ],
      image: '/assets/inova/biosite-mockup.jpeg',
      alt: 'Interface mobile do BioSite desenvolvido pela Inova Soluções Digitais',
      whatsappMessage:
        'Olá! Gostaria de solicitar um orçamento para desenvolvimento de um BioSite para o meu negócio.',
    },
    {
      id: 'cartao-virtual',
      name: 'Cartão Virtual Interativo',
      badge: 'Apresentação Comercial',
      icon: <CreditCard className="w-5 h-5 text-[#8B5CF6]" />,
      summary:
        'Apresentação digital interativa para compartilhar contatos, dados de atendimento e chave Pix com rapidez. Pode ser enviado em conversas no WhatsApp ou salvo no celular dos seus clientes.',
      benefits: [
        'Acesso em um toque para discagem, WhatsApp e navegação GPS',
        'Chave Pix formatada para cópia instantânea sem erros',
        'Design profissional que valoriza a imagem da sua empresa',
        'Substitui cartões de visita de papel com praticidade ecológica',
      ],
      whatsappMessage:
        'Olá! Gostaria de saber mais sobre o Cartão Virtual Interativo da Inova Soluções Digitais.',
    },
    {
      id: 'catalogo-digital',
      name: 'Catálogo Digital',
      badge: 'Exibição de Produtos',
      icon: <Store className="w-5 h-5 text-[#8B5CF6]" />,
      summary:
        'Apresentação organizada de produtos com fotos, descrições claras, opções e valores. Facilita a consulta dos clientes e encaminha o interesse diretamente para o WhatsApp.',
      benefits: [
        'Divisão intuitiva por categorias de produtos',
        'Fotos e detalhes que respondem às dúvidas frequentes dos clientes',
        'Botão de pedido ou consulta integrado diretamente ao WhatsApp',
        'Atualização ágil de itens e novidades da loja',
      ],
      whatsappMessage:
        'Olá! Tenho interesse no Catálogo Digital para apresentar os produtos da minha empresa.',
    },
    {
      id: 'cardapio-digital',
      name: 'Cardápio Digital Interativo',
      badge: 'Alimentação & Gastronomia',
      icon: <UtensilsCrossed className="w-5 h-5 text-[#8B5CF6]" />,
      summary:
        'Apresentação digital de pratos, bebidas, porções e combos para estabelecimentos alimentícios. Os clientes consultam pelo celular no salão ou no delivery e fecham o pedido no WhatsApp.',
      benefits: [
        'Acesso imediato por QR Code na mesa ou link no WhatsApp',
        'Sem cobrança de porcentagens ou comissões sobre pedidos',
        'Formatação do pedido pronta para envio na mensagem do WhatsApp',
        'Apresentação visual atrativa de ingredientes e tamanhos',
      ],
      whatsappMessage:
        'Olá! Gostaria de consultar detalhes e valores para criação de um Cardápio Digital para meu estabelecimento.',
    },
    {
      id: 'landing-pages',
      name: 'Landing Pages',
      badge: 'Apresentação & Conversão',
      icon: <Layout className="w-5 h-5 text-[#8B5CF6]" />,
      summary:
        'Páginas desenvolvidas com comunicação objetiva e estrutura visual limpa para apresentar produtos, serviços, campanhas ou ofertas específicas, com foco em conduzir o visitante ao contato.',
      benefits: [
        'Estrutura focada em responder o que é a solução e como contratar',
        '100% otimizada para abertura rápida em smartphones',
        'Botões de ação posicionados estrategicamente para o WhatsApp',
        'Linguagem direta voltada para o público do seu segmento',
      ],
      whatsappMessage:
        'Olá! Gostaria de solicitar um orçamento para desenvolvimento de uma Landing Page com a Inova.',
    },
  ];

  const currentTool = tools.find((t) => t.id === activeTab) || tools[0];

  return (
    <section
      id="presenca-digital"
      className="py-20 sm:py-28 lg:py-32 relative bg-[#111321] text-[#F7F7F5] border-t border-white/10 overflow-hidden"
    >
      {/* Marcadores de âncora para compatibilidade com links diretos */}
      <div id="biosite" className="relative -top-24 pointer-events-none" aria-hidden="true" />
      <div id="google-empresa" className="relative -top-24 pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Editorial */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-12 sm:mb-16">
          <div className="lg:col-span-7">
            <h2
              className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.12] font-display"
              style={{ textWrap: 'balance' }}
            >
              Soluções de presença digital para o seu negócio.
            </h2>
          </div>

          <div className="lg:col-span-5 pb-1">
            <p className="text-sm sm:text-base text-[#F7F7F5]/75 leading-relaxed font-normal">
              Ferramentas práticas para organizar seus canais de atendimento, apresentar produtos e serviços e fortalecer a visibilidade da sua empresa na internet.
            </p>
          </div>
        </div>

        {/* Menu de Abas das 6 Soluções Digitais */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar border-b border-white/10">
          {tools.map((tool) => {
            const isActive = tool.id === activeTab;
            return (
              <button
                key={tool.id}
                type="button"
                onClick={() => setActiveTab(tool.id)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shrink-0 flex items-center gap-2 min-h-[42px] ${
                  isActive
                    ? 'bg-[#8B5CF6] text-white shadow-md shadow-[#8B5CF6]/20'
                    : 'bg-[#181B2E] text-[#F7F7F5]/70 hover:text-white hover:bg-white/5 border border-white/5'
                }`}
              >
                <span>{tool.name}</span>
              </button>
            );
          })}
        </div>

        {/* Painel da Solução Selecionada com Apresentação de Estúdio */}
        <div className="rounded-2xl bg-[#181B2E] border border-white/10 p-6 sm:p-9 lg:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Lado Esquerdo: Benefícios e Descrição */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#8B5CF6]">
                    {currentTool.badge}
                  </span>
                </div>

                <h3 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight mb-4 font-display">
                  {currentTool.name}
                </h3>

                <p className="text-sm sm:text-base text-[#F7F7F5]/75 leading-relaxed mb-6 font-normal">
                  {currentTool.summary}
                </p>

                {/* Lista de Benefícios Concretos */}
                <div className="pt-4 border-t border-white/10 mb-8 space-y-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#F7F7F5]/60 block mb-2">
                    Benefícios práticos desta solução:
                  </span>
                  {currentTool.benefits.map((b, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F7F7F5]/85">
                      <Check className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Botão de Solicitação no WhatsApp */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4 border-t border-white/10">
                <a
                  href={getWhatsAppUrl(currentTool.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#8B5CF6] hover:bg-[#7348D6] transition-all shadow-md active:scale-98 min-h-[44px]"
                >
                  <MessageCircle className="w-4 h-4 text-white shrink-0" />
                  <span>Solicitar orçamento de {currentTool.name.split('(')[0].trim()}</span>
                  <ArrowUpRight className="w-4 h-4 text-white shrink-0" />
                </a>

                <span className="text-xs text-[#F7F7F5]/50 text-center sm:text-left">
                  Atendimento consultivo e proposta sob medida
                </span>
              </div>
            </div>

            {/* Lado Direito: Fotografia Real do Produto Digital ou Vitrine Técnica */}
            <div className="lg:col-span-5 flex justify-center">
              {currentTool.image ? (
                <div className="relative w-full max-w-[380px] rounded-2xl bg-[#0C0D17] p-5 border border-white/10 shadow-2xl">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-xs">
                    <span className="font-semibold text-white/90">Apresentação Real</span>
                    <span className="text-[11px] text-[#22D3EE] font-medium">Inova Soluções</span>
                  </div>
                  <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-black/40 flex items-center justify-center p-2 mb-3">
                    <img
                      src={currentTool.image}
                      alt={currentTool.alt || currentTool.name}
                      loading="lazy"
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>
                  <p className="text-[11px] text-[#F7F7F5]/60 text-center font-normal">
                    Estrutura responsiva adaptada para telas de celulares e computadores.
                  </p>
                </div>
              ) : (
                <div className="w-full max-w-[380px] rounded-2xl bg-[#111321] p-6 border border-white/10 shadow-xl flex flex-col justify-between">
                  <div className="pb-4 border-b border-white/10">
                    <div className="w-12 h-12 rounded-xl bg-[#8B5CF6]/15 flex items-center justify-center text-[#8B5CF6] mb-4">
                      {currentTool.icon}
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2 font-display">
                      Desenvolvido para Celular
                    </h4>
                    <p className="text-xs text-[#F7F7F5]/70 leading-relaxed font-normal">
                      Solução com abertura imediata, sem downloads e formatada com links de toque rápido para o WhatsApp da sua empresa.
                    </p>
                  </div>
                  <div className="pt-4 text-xs text-white/50 space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Compatibilidade:</span>
                      <span className="text-white font-medium">100% Mobile & Desktop</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Tempo de Abertura:</span>
                      <span className="text-[#22D3EE] font-medium">Ultrarrápido</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Destino dos Pedidos:</span>
                      <span className="text-white font-medium">WhatsApp Direto</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
