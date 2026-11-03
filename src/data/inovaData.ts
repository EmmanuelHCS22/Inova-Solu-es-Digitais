import { CatalogItem, CustomPlaque, FAQItem, ServiceItem } from '../types';

export const INOVA_CONTACT = {
  name: 'Inova Soluções Digitais',
  tagline: 'Conectamos seu negócio ao mundo digital.',
  subtagline: 'Plaquinhas NFC, produtos personalizados e soluções digitais que facilitam a conexão com seus clientes e fortalecem a presença do seu negócio.',
  phone: '5534998973287',
  displayPhone: '(34) 99897-3287',
  email: 'inovasdigitais@gmail.com',
  location: 'Uberlândia, MG',
  instagram: 'https://www.instagram.com/inova_sdigitais/',
  instagramHandle: '@inova_sdigitais',
  logo: '/assets/inova/logo-inova.png',
};

export const getWhatsAppUrl = (message: string) => {
  return `https://wa.me/${INOVA_CONTACT.phone}?text=${encodeURIComponent(message)}`;
};

export const SOLUTIONS_DATA: ServiceItem[] = [
  {
    id: 'plaquinhas-nfc',
    title: 'Plaquinhas NFC e QR Code',
    iconName: 'Radio',
    description: 'Plaquinhas em acrílico com base em L para balcão, caixa e recepção. Conexão instantânea por aproximação NFC ou leitura do QR Code.',
    services: [
      'Plaquinhas de avaliação no Google (5 estrelas)',
      'Plaquinhas para Instagram e redes sociais',
      'Plaquinhas para WhatsApp de atendimento direto',
      'Plaquinhas para Pix e cobranças rápidas',
      'Plaquinhas para conexão à rede Wi-Fi sem senha digitada',
      'Modelos com artes padrão prontas e artes personalizadas com a sua marca',
    ],
    buttonText: 'Conhecer plaquinhas NFC',
    targetAnchor: '#catalogo-padrao',
    whatsappMessage: 'Olá! Gostaria de consultar modelos e valores das plaquinhas NFC e QR Code para balcão.',
  },
  {
    id: 'chaveiros-cartoes',
    title: 'Chaveiros e Cartões NFC',
    iconName: 'Smartphone',
    description: 'Chaveiros fabricados por tecnologia de impressão 3D e cartões inteligentes com chip NFC para compartilhamento por aproximação.',
    services: [
      'Chaveiros NFC produzidos por impressão 3D de alta precisão',
      'Modelos disponíveis: Instagram, WhatsApp e Google',
      'Modelos com símbolo NFC ou logotipo personalizado',
      'Cartões de visita NFC inteligentes para apresentação ágil',
      'Compartilhamento instantâneo sem necessidade de aplicativo',
    ],
    buttonText: 'Conhecer chaveiros e cartões',
    targetAnchor: '#chaveiros-nfc',
    whatsappMessage: 'Olá! Tenho interesse nos chaveiros NFC em impressão 3D e nos cartões NFC de aproximação.',
  },
  {
    id: 'presenca-digital',
    title: 'Presença Digital',
    iconName: 'Globe',
    description: 'Ferramentas digitais para organizar seus canais comerciais, centralizar links e atrair mais clientes na sua região.',
    services: [
      'Criação e otimização do Perfil da Empresa no Google (Google Meu Negócio)',
      'BioSite profissional para a biografia do Instagram e WhatsApp (cartão de visitas digital)',
      'Catálogo digital interativo para apresentação de produtos',
      'Cardápio digital prático para estabelecimentos alimentícios',
      'Landing pages desenvolvidas para apresentar produtos, serviços e ofertas',
    ],
    buttonText: 'Conhecer soluções de presença digital',
    targetAnchor: '#presenca-digital',
    whatsappMessage: 'Olá! Gostaria de saber mais sobre as soluções de presença digital (BioSite, Catálogo, Cardápio e Google).',
  },
  {
    id: 'agendamento-sites',
    title: 'Sites Profissionais & Agendamento',
    iconName: 'Calendar',
    description: 'Sistemas práticos de agendamento online e páginas de serviços pensadas para quem atende com horário marcado.',
    services: [
      'Sistemas de agendamento online para barbearias e cabeleireiras',
      'Soluções completas para Lash Designers e Nail Designers',
      'Páginas de serviços para profissionais de estética e beleza',
      'Organização de horários, escolha de profissional e menor índice de faltas',
      'Sites profissionais nas modalidades de catálogos, cardápios e landing pages',
    ],
    buttonText: 'Conhecer agendamento online',
    targetAnchor: '#agendamento-online',
    whatsappMessage: 'Olá! Gostaria de conhecer o sistema de agendamento online e páginas de serviços para profissionais.',
  },
];

export const NFC_FEATURES = [
  {
    icon: 'Star',
    title: 'Avaliações no Google',
    description: 'Facilite o acesso dos clientes ao perfil da sua empresa e incentive avaliações espontâneas de 5 estrelas no momento do atendimento.',
  },
  {
    icon: 'QrCode',
    title: 'QR Code de alta precisão',
    description: 'Leitura rápida para qualquer smartphone com câmera, funcionando como alternativa para aparelhos sem NFC.',
  },
  {
    icon: 'CreditCard',
    title: 'Pix e pagamentos',
    description: 'QR Code Pix organizado na recepção para agilizar cobranças no caixa sem atrito com o cliente.',
  },
  {
    icon: 'Share2',
    title: 'WhatsApp e Instagram',
    description: 'Deixe seu canal de atendimento e o perfil da empresa a um simples toque de aproximação do celular.',
  },
  {
    icon: 'Wifi',
    title: 'Acesso Wi-Fi para clientes',
    description: 'Conecte seus clientes à rede do estabelecimento sem precisar soletrar ou digitar senhas complexas.',
  },
  {
    icon: 'Radio',
    title: 'Tecnologia NFC integrada',
    description: 'Microchip embutido para aproximação instantânea compatível com a grande maioria dos smartphones.',
  },
];

export interface ProductExperienceItem {
  id: string;
  name: string;
  label: string;
  type: 'padrao' | 'personalizada';
  categories: string[];
  description: string;
  image: string;
  alt: string;
  segment?: string;
  primaryColor: string;
  secondaryColor: string;
  accentGlow: string;
  accentGlowSecondary: string;
  badgeText: string;
  badgeBorder: string;
  keyBenefits: string[];
  whatsappMessage: string;
}

export const PRODUCT_EXPERIENCE_CATALOG: ProductExperienceItem[] = [
  {
    id: 'padrao-google',
    name: 'Plaquinha Google',
    label: 'ARTE PADRÃO • Avaliações Google • NFC e QR Code',
    type: 'padrao',
    categories: ['google', 'nfc'],
    description: 'Deixe o caminho até as avaliações no Google direto e simples. O cliente apenas aproxima o smartphone ou lê o QR Code para abrir sua página e deixar uma avaliação de 5 estrelas no balcão.',
    image: '/assets/inova/padrao-google.jpeg',
    alt: 'Modelo padrão azul de plaquinha para avaliações no Google com estrelas, NFC e QR Code',
    primaryColor: '#1A73E8',
    secondaryColor: '#8B5CF6',
    accentGlow: 'rgba(26, 115, 232, 0.32)',
    accentGlowSecondary: 'rgba(139, 92, 246, 0.18)',
    badgeText: 'Arte Padrão • Avaliações Google',
    badgeBorder: '#1A73E8',
    keyBenefits: [
      'Abertura direta na tela de 5 estrelas sem busca manual',
      'QR Code de alta definição e chip NFC contactless embutido',
      'Estrutura em acrílico cristal dobrado em L para balcão'
    ],
    whatsappMessage: 'Olá! Tenho interesse na Plaquinha Google da Inova. Gostaria de receber informações e um orçamento.',
  },
  {
    id: 'padrao-instagram',
    name: 'Plaquinha Instagram',
    label: 'ARTE PADRÃO • Instagram • NFC e QR Code',
    type: 'padrao',
    categories: ['instagram', 'nfc'],
    description: 'Convide seus clientes a seguir o perfil da sua empresa e interagir com suas publicações no momento exato do atendimento físico, conectando seu balcão à sua audiência digital.',
    image: '/assets/inova/padrao-instagram.jpeg',
    alt: 'Modelo padrão colorido de plaquinha para divulgar o Instagram com NFC e QR Code',
    primaryColor: '#E1306C',
    secondaryColor: '#C13584',
    accentGlow: 'rgba(225, 48, 108, 0.30)',
    accentGlowSecondary: 'rgba(193, 53, 132, 0.18)',
    badgeText: 'Arte Padrão • Seguir no Instagram',
    badgeBorder: '#E1306C',
    keyBenefits: [
      'Aproximação instantânea direto para o seu perfil comercial',
      'QR Code colorido com contraste nítido para todas as câmeras',
      'Design vibrante que atrai a atenção e gera seguidores orgânicos'
    ],
    whatsappMessage: 'Olá! Tenho interesse na Plaquinha Instagram da Inova. Gostaria de receber informações e um orçamento.',
  },
  {
    id: 'padrao-whatsapp',
    name: 'Plaquinha WhatsApp',
    label: 'ARTE PADRÃO • WhatsApp • NFC e QR Code',
    type: 'padrao',
    categories: ['whatsapp', 'nfc', 'combinados'],
    description: 'Facilite o contato direto dos clientes pelo WhatsApp. Em um simples toque ou leitura de código, o cliente já inicia a conversa com o seu atendimento sem precisar salvar o número na agenda.',
    image: '/assets/inova/padrao-whatsapp.jpeg',
    alt: 'Modelo padrão de plaquinha verde para contato pelo WhatsApp com NFC e QR Code',
    primaryColor: '#25D366',
    secondaryColor: '#128C7E',
    accentGlow: 'rgba(37, 211, 102, 0.28)',
    accentGlowSecondary: 'rgba(18, 140, 126, 0.18)',
    badgeText: 'Arte Padrão • Atendimento WhatsApp',
    badgeBorder: '#25D366',
    keyBenefits: [
      'Abre a conversa imediatamente sem digitar dígitos ou DDD',
      'QR Code com logotipo WhatsApp para identificação instantânea',
      'Ideal para balcões de recepção, orçamentos e pós-venda'
    ],
    whatsappMessage: 'Olá! Tenho interesse na Plaquinha WhatsApp da Inova. Gostaria de receber informações e um orçamento.',
  },
  {
    id: 'padrao-pix',
    name: 'Plaquinha Pix',
    label: 'ARTE PADRÃO • Pix • NFC e QR Code',
    type: 'padrao',
    categories: ['pix', 'nfc'],
    description: 'Apresente seu canal de pagamento Pix com visual profissional e QR Code nítido para cobranças rápidas no caixa, eliminando erros de digitação de chave e atritos com o cliente.',
    image: '/assets/inova/padrao-pix.jpeg',
    alt: 'Modelo padrão verde de plaquinha para pagamento por Pix com NFC e QR Code',
    primaryColor: '#32BCAD',
    secondaryColor: '#22D3EE',
    accentGlow: 'rgba(50, 188, 173, 0.30)',
    accentGlowSecondary: 'rgba(34, 211, 238, 0.18)',
    badgeText: 'Arte Padrão • Pagamento Pix',
    badgeBorder: '#32BCAD',
    keyBenefits: [
      'QR Code Pix de leitura ultra-rápida direto no caixa',
      'Aproximação NFC com link da chave ou aplicativo de cobrança',
      'Agiliza o fluxo de pagamento e reduz tempo de espera na fila'
    ],
    whatsappMessage: 'Olá! Tenho interesse na Plaquinha Pix da Inova. Gostaria de receber informações e um orçamento.',
  },
  {
    id: 'padrao-wifi',
    name: 'Plaquinha Wi-Fi',
    label: 'ARTE PADRÃO • Wi-Fi • NFC e QR Code',
    type: 'padrao',
    categories: ['wifi', 'nfc'],
    description: 'Ajude seus clientes a conectar-se à rede Wi-Fi do seu estabelecimento com facilidade em mesas, balcões e recepções, sem precisar soletrar ou digitar senhas complexas repetidamente.',
    image: '/assets/inova/padrao-wifi.jpeg',
    alt: 'Modelo padrão azul de plaquinha para acesso ao Wi-Fi com NFC e QR Code',
    primaryColor: '#0EA5E9',
    secondaryColor: '#6366F1',
    accentGlow: 'rgba(14, 165, 233, 0.28)',
    accentGlowSecondary: 'rgba(99, 102, 241, 0.16)',
    badgeText: 'Arte Padrão • Conexão Wi-Fi',
    badgeBorder: '#0EA5E9',
    keyBenefits: [
      'Conexão automática por aproximação NFC ou leitura de câmera',
      'Funciona em smartphones iOS e Android sem instalar aplicativo',
      'Excelente hospitalidade para salas de espera, clínicas e cafés'
    ],
    whatsappMessage: 'Olá! Tenho interesse na Plaquinha Wi-Fi da Inova. Gostaria de receber informações e um orçamento.',
  },
  {
    id: 'claudia',
    name: 'Claudia Ateliê',
    label: 'Personalizada • Moda festa',
    type: 'personalizada',
    segment: 'Moda Festa & Noivas',
    categories: ['google', 'segmento'],
    description: 'Arte personalizada desenvolvida com a identidade visual elegante do ateliê para acolher noivas e convidadas, incentivando avaliações 5 estrelas espontâneas no balcão de atendimento.',
    image: '/assets/inova/personalizada-claudia.jpeg',
    alt: 'Arte vermelha de avaliação no Google para o Claudia Ateliê',
    primaryColor: '#E11D48',
    secondaryColor: '#9F1239',
    accentGlow: 'rgba(225, 29, 72, 0.28)',
    accentGlowSecondary: 'rgba(159, 18, 57, 0.18)',
    badgeText: 'Arte Personalizada • Moda Festa & Noivas',
    badgeBorder: '#E11D48',
    keyBenefits: [
      'Estamparia personalizada com as cores e monograma do ateliê',
      'Incentivo acolhedor para noivas e formandas avaliarem no Google',
      'Aprovação de mockup digital prévio antes da produção em acrílico'
    ],
    whatsappMessage: 'Olá! Vi o modelo da plaquinha personalizada da Claudia Ateliê e gostaria de solicitar um orçamento com o logotipo da minha marca.',
  },
  {
    id: 'verde-limao',
    name: 'Verde Limão Chinelaria',
    label: 'Personalizada • Varejo',
    type: 'personalizada',
    segment: 'Calçados & Varejo',
    categories: ['google', 'segmento'],
    description: 'Comunicação vibrante no ponto de venda com as cores e mascote da loja para incentivar avaliações espontâneas no momento do pagamento, reforçando a marca na mente do consumidor.',
    image: '/assets/inova/personalizada-verde-limao.jpeg',
    alt: 'Arte verde-limão de avaliação no Google para a Verde Limão Chinelaria',
    primaryColor: '#84CC16',
    secondaryColor: '#16A34A',
    accentGlow: 'rgba(132, 204, 22, 0.28)',
    accentGlowSecondary: 'rgba(22, 163, 74, 0.18)',
    badgeText: 'Arte Personalizada • Calçados & Varejo',
    badgeBorder: '#84CC16',
    keyBenefits: [
      'Cores cítricas e alegres que destacam o caixa da loja',
      'Aproximação NFC e QR Code direcionando ao perfil Google',
      'Durabilidade para balcões com alto fluxo diário de clientes'
    ],
    whatsappMessage: 'Olá! Gostei da plaquinha personalizada da Verde Limão Chinelaria e gostaria de um orçamento para o meu estabelecimento.',
  },
  {
    id: 'oticas-gouveia',
    name: 'Óticas Gouveia',
    label: 'Personalizada • Saúde visual',
    type: 'personalizada',
    segment: 'Ótica & Saúde Visual',
    categories: ['google', 'segmento'],
    description: 'Composição limpa e sóbria reforçando credibilidade clínica e confiança profissional para os clientes avaliarem os atendimentos oftálmicos e a experiência de compra de armações.',
    image: '/assets/inova/personalizada-oticas-gouveia.jpeg',
    alt: 'Arte de avaliação no Google para as Óticas Gouveia',
    primaryColor: '#0284C7',
    secondaryColor: '#0369A1',
    accentGlow: 'rgba(2, 132, 199, 0.30)',
    accentGlowSecondary: 'rgba(3, 105, 161, 0.18)',
    badgeText: 'Arte Personalizada • Ótica & Saúde Visual',
    badgeBorder: '#0284C7',
    keyBenefits: [
      'Estética sóbria e refinada adequada para clínicas e consultórios',
      'Coleta de depoimentos espontâneos de satisfação do paciente',
      'Suporte ergonômico de balcão fabricado em acrílico transparente'
    ],
    whatsappMessage: 'Olá! Gostaria de um orçamento para plaquinha personalizada inspirada no modelo das Óticas Gouveia com a minha identidade visual.',
  },
  {
    id: 'reall-car',
    name: 'Reall Car Automotive',
    label: 'Personalizada • Automotivo',
    type: 'personalizada',
    segment: 'Estética Automotiva',
    categories: ['google', 'segmento'],
    description: 'Plaquinha personalizada para recepção de clientes com visual esportivo e agressivo em preto e laranja, com QR Code e NFC para avaliações 5 estrelas logo após a entrega técnica do veículo.',
    image: '/assets/inova/personalizada-reall-car.jpeg',
    alt: 'Arte preta e laranja de avaliação no Google para a Reall Car Automotive',
    primaryColor: '#F97316',
    secondaryColor: '#EA580C',
    accentGlow: 'rgba(249, 115, 22, 0.28)',
    accentGlowSecondary: 'rgba(234, 88, 12, 0.18)',
    badgeText: 'Arte Personalizada • Estética Automotiva',
    badgeBorder: '#F97316',
    keyBenefits: [
      'Visual moderno e esportivo alinhado ao nicho automotivo',
      'Avaliação 5 estrelas no momento de maior satisfação do cliente',
      'Acrílico espesso de alta resistência para balcões de oficina'
    ],
    whatsappMessage: 'Olá! Gostaria de um orçamento para plaquinha personalizada como a da Reall Car Automotive com meu logotipo e redes sociais.',
  },
  {
    id: 'flayder-willis',
    name: 'Flayder Willis Barbearia',
    label: 'Personalizada • Barbearia',
    type: 'personalizada',
    segment: 'Barbearia & Estética Masculina',
    categories: ['pix', 'segmento'],
    description: 'Visual clássico de barbearia na bancada para agilizar pagamentos por Pix e aproximação NFC sem atrito com o cliente, valorizando o ambiente de atendimento e o profissionalismo do espaço.',
    image: '/assets/inova/personalizada-flayder.jpeg',
    alt: 'Arte de pagamento por Pix para a Flayder Willis Barbearia',
    primaryColor: '#EAB308',
    secondaryColor: '#CA8A04',
    accentGlow: 'rgba(234, 179, 8, 0.28)',
    accentGlowSecondary: 'rgba(202, 138, 4, 0.18)',
    badgeText: 'Arte Personalizada • Barbearia & Estética',
    badgeBorder: '#EAB308',
    keyBenefits: [
      'Agiliza o pagamento na bancada do barbeiro sem deslocamento',
      'Arte exclusiva combinando tons dourados clássicos de barbearia',
      'Chip NFC e QR Code Pix integrados para leitura imediata'
    ],
    whatsappMessage: 'Olá! Tenho uma barbearia/salão e gostaria de um orçamento para uma plaquinha personalizada como a da Flayder Willis Barbearia.',
  },
  {
    id: 'capotas-pickup',
    name: 'Capotas Pickup GYN Fibras',
    label: 'Personalizada • Automotivo',
    type: 'personalizada',
    segment: 'Acessórios Automotivos',
    categories: ['wifi', 'segmento'],
    description: 'Arte personalizada com as cores e logotipo da oficina para conectar clientes à rede Wi-Fi na sala de espera com um único toque, oferecendo conforto e tecnologia durante o tempo de serviço.',
    image: '/assets/inova/personalizada-capotas.jpeg',
    alt: 'Arte de acesso ao Wi-Fi para a Capotas Pickup GYN Fibras',
    primaryColor: '#6366F1',
    secondaryColor: '#4338CA',
    accentGlow: 'rgba(99, 102, 241, 0.28)',
    accentGlowSecondary: 'rgba(67, 56, 202, 0.18)',
    badgeText: 'Arte Personalizada • Acessórios Automotivos',
    badgeBorder: '#6366F1',
    keyBenefits: [
      'Conexão Wi-Fi imediata para clientes em sala de espera',
      'Identidade visual integrada com logotipo e cores da oficina',
      'Base firme em acrílico para balcão de peças e recepção'
    ],
    whatsappMessage: 'Olá! Gostaria de solicitar um orçamento para uma plaquinha personalizada nos moldes da Capotas Pickup com logotipo da minha empresa.',
  },
];

export const STANDARD_CATALOG: CatalogItem[] = [
  {
    id: 'padrao-google',
    categories: ['google', 'nfc'],
    label: 'ARTE PADRÃO • Avaliações Google • NFC e QR Code',
    name: 'Plaquinha Google',
    description: 'Deixe o caminho até as avaliações no Google direto e simples, incentivando depoimentos de 5 estrelas no balcão.',
    image: '/assets/inova/padrao-google.jpeg',
    alt: 'Modelo padrão azul de plaquinha para avaliações no Google com estrelas, NFC e QR Code',
  },
  {
    id: 'padrao-instagram',
    categories: ['instagram', 'nfc'],
    label: 'ARTE PADRÃO • Instagram • NFC e QR Code',
    name: 'Plaquinha Instagram',
    description: 'Convide seus clientes a seguir o perfil da sua empresa e interagir com suas publicações no ponto de contato.',
    image: '/assets/inova/padrao-instagram.jpeg',
    alt: 'Modelo padrão colorido de plaquinha para divulgar o Instagram com NFC e QR Code',
  },
  {
    id: 'padrao-whatsapp',
    categories: ['whatsapp', 'nfc', 'combinados'],
    label: 'ARTE PADRÃO • WhatsApp • NFC e QR Code',
    name: 'Plaquinha WhatsApp',
    description: 'Facilite o contato direto dos clientes pelo WhatsApp, por aproximação NFC ou leitura do QR Code no balcão.',
    image: '/assets/inova/padrao-whatsapp.jpeg',
    alt: 'Modelo padrão de plaquinha verde para contato pelo WhatsApp com NFC e QR Code',
  },
  {
    id: 'padrao-pix',
    categories: ['pix', 'nfc'],
    label: 'ARTE PADRÃO • Pix • NFC e QR Code',
    name: 'Plaquinha Pix',
    description: 'Apresente seu canal de pagamento Pix com visual organizado e QR Code instantâneo para cobranças rápidas no caixa.',
    image: '/assets/inova/padrao-pix.jpeg',
    alt: 'Modelo padrão verde de plaquinha para pagamento por Pix com NFC e QR Code',
  },
  {
    id: 'padrao-wifi',
    categories: ['wifi', 'nfc'],
    label: 'ARTE PADRÃO • Wi-Fi • NFC e QR Code',
    name: 'Plaquinha Wi-Fi',
    description: 'Ajude seus clientes a encontrar a rede e conectar-se com facilidade em mesas, balcões e recepções.',
    image: '/assets/inova/padrao-wifi.jpeg',
    alt: 'Modelo padrão azul de plaquinha para acesso ao Wi-Fi com NFC e QR Code',
  },
];

export const CATALOG_CATEGORIES = [
  { id: 'todos', label: 'Todas as artes' },
  { id: 'google', label: 'Avaliações Google' },
  { id: 'instagram', label: 'Instagram' },
  { id: 'whatsapp', label: 'WhatsApp' },
  { id: 'pix', label: 'Pix' },
  { id: 'wifi', label: 'Wi-Fi' },
  { id: 'nfc', label: 'Aproximação NFC' },
  { id: 'combinados', label: 'Modelos combinados' },
];

export const CUSTOM_PLAQUES: CustomPlaque[] = [
  {
    id: 'claudia',
    categories: ['google', 'segmento'],
    label: 'Personalizada • Moda festa',
    segment: 'Moda Festa & Noivas',
    name: 'Claudia Ateliê',
    description: 'Arte personalizada com a identidade visual do ateliê para acolher clientes e incentivar avaliações no balcão.',
    image: '/assets/inova/personalizada-claudia.jpeg',
    alt: 'Arte vermelha de avaliação no Google para o Claudia Ateliê',
  },
  {
    id: 'verde-limao',
    categories: ['google', 'segmento'],
    label: 'Personalizada • Varejo',
    segment: 'Calçados & Varejo',
    name: 'Verde Limão Chinelaria',
    description: 'Comunicação direta no ponto de venda com as cores da loja para incentivar avaliações espontâneas.',
    image: '/assets/inova/personalizada-verde-limao.jpeg',
    alt: 'Arte verde-limão de avaliação no Google para a Verde Limão Chinelaria',
  },
  {
    id: 'oticas-gouveia',
    categories: ['google', 'segmento'],
    label: 'Personalizada • Saúde visual',
    segment: 'Ótica & Saúde Visual',
    name: 'Óticas Gouveia',
    description: 'Composição limpa reforçando credibilidade e confiança para os pacientes avaliarem a clínica no Google.',
    image: '/assets/inova/personalizada-oticas-gouveia.jpeg',
    alt: 'Arte de avaliação no Google para as Óticas Gouveia',
  },
  {
    id: 'reall-car',
    categories: ['google', 'segmento'],
    label: 'Personalizada • Automotivo',
    segment: 'Estética Automotiva',
    name: 'Reall Car Automotive',
    description: 'Plaquinha personalizada para recepção de clientes com QR Code e NFC para avaliações 5 estrelas.',
    image: '/assets/inova/personalizada-reall-car.jpeg',
    alt: 'Arte preta e laranja de avaliação no Google para a Reall Car Automotive',
  },
  {
    id: 'flayder-willis',
    categories: ['pix', 'segmento'],
    label: 'Personalizada • Barbearia',
    segment: 'Barbearia & Estética Masculina',
    name: 'Flayder Willis Barbearia',
    description: 'Visual na bancada para agilizar pagamentos por Pix e aproximação NFC sem atrito com o cliente.',
    image: '/assets/inova/personalizada-flayder.jpeg',
    alt: 'Arte de pagamento por Pix para a Flayder Willis Barbearia',
  },
  {
    id: 'capotas-pickup',
    categories: ['wifi', 'segmento'],
    label: 'Personalizada • Automotivo',
    segment: 'Acessórios Automotivos',
    name: 'Capotas Pickup GYN Fibras',
    description: 'Arte personalizada com as cores da oficina para conectar clientes à rede Wi-Fi na sala de espera.',
    image: '/assets/inova/personalizada-capotas.jpeg',
    alt: 'Arte de acesso ao Wi-Fi para a Capotas Pickup GYN Fibras',
  },
];

export const CUSTOM_PLAQUES_FILTERS = [
  { id: 'todos', label: 'Todas as artes' },
  { id: 'google', label: 'Avaliações Google' },
  { id: 'pix', label: 'Pix' },
  { id: 'wifi', label: 'Wi-Fi' },
  { id: 'segmento', label: 'Por segmento' },
];

export const FAQ_DATA: FAQItem[] = [
  {
    question: 'Como funciona a tecnologia NFC nas plaquinhas, chaveiros e cartões?',
    answer: 'A tecnologia NFC (Near Field Communication) funciona por comunicação sem fio de curto alcance. Nossos produtos possuem um microchip interno programado com o seu link (Google, WhatsApp, Instagram, Pix ou BioSite). Quando o cliente aproxima a traseira do celular a poucos centímetros do produto, o link abre instantaneamente no navegador do aparelho, sem necessidade de instalar aplicativos ou ligar câmeras.',
  },
  {
    question: 'A tecnologia NFC funciona em qualquer celular?',
    answer: 'A aproximação por NFC funciona na grande maioria dos smartphones atuais (iPhones a partir dos modelos XR/XS e a maioria expressiva dos aparelhos Android intermediários e avançados). Para celulares que não contam com leitor NFC ativo, todas as nossas plaquinhas e cartões contam com QR Code de alta precisão gravado em nitidez para leitura com a câmera.',
  },
  {
    question: 'Como funciona o uso do QR Code nos produtos da Inova?',
    answer: 'O QR Code atua como uma via complementar e universal de acesso. Você nos envia o seu link ou chave e nós geramos o código vetorial em alta resolução, testando a leitura antes da produção. O cliente aponta a câmera do celular e acessa o mesmo destino do NFC.',
  },
  {
    question: 'Qual a diferença entre plaquinhas de arte padrão e personalizada?',
    answer: 'As plaquinhas de arte padrão utilizam layouts oficiais pré-definidos do nosso catálogo para Google, Instagram, WhatsApp, Pix e Wi-Fi. Já as plaquinhas com arte personalizada são produzidas com o logotipo, cores institucionais e elementos visuais da sua marca, com aprovação prévia em mockup digital antes da produção física.',
  },
  {
    question: 'Como são fabricados os chaveiros NFC da Inova?',
    answer: 'Nossos chaveiros NFC são produzidos por tecnologia de impressão 3D (manufatura aditiva de alta precisão), e não em acrílico. Isso proporciona um acabamento resistente, com relevos sólidos e durabilidade para o uso diário no bolso ou molho de chaves, com o microchip NFC embutido internamente.',
  },
  {
    question: 'O que são os Cartões NFC e como utilizá-los?',
    answer: 'O Cartão NFC é um cartão físico inteligente que substitui pilhas de cartões de papel. Ao encostá-lo no celular de um cliente ou parceiro, ele abre imediatamente seu contato salvo, BioSite, catálogo ou link comercial, transmitindo profissionalismo e modernidade no networking.',
  },
  {
    question: 'O que é o BioSite e para que ele serve?',
    answer: 'O BioSite é uma página digital desenvolvida para reunir informações, links comerciais, redes sociais e canais de contato em um único endereço. É a solução ideal para colocar na biografia do Instagram ou compartilhar no WhatsApp, permitindo que o cliente encontre rapidamente o que procura.',
  },
  {
    question: 'O BioSite funciona também como cartão de visitas digital?',
    answer: 'Sim! O BioSite é exatamente o seu cartão de visitas digital. Ele reúne seus links, redes sociais, contatos diretos (WhatsApp, telefone, e-mail) e dados profissionais em uma única página leve e personalizada, que o cliente abre instantaneamente no celular sem precisar baixar nenhum aplicativo.',
  },
  {
    question: 'O que é o Catálogo Digital e o Cardápio Digital?',
    answer: 'O Catálogo Digital organiza produtos com fotos, descrições e valores para consulta simples do cliente. O Cardápio Digital é voltado para restaurantes, lanchonetes e delivery, apresentando itens alimentícios organizados por categorias, permitindo envio prático de pedidos diretamente para o WhatsApp do estabelecimento, sem taxas ou comissões.',
  },
  {
    question: 'O que são as Landing Pages da Inova?',
    answer: 'São páginas desenvolvidas com objetivo focado: apresentar um produto específico, serviço, campanha ou oferta com comunicação clara e botões de ação voltados para conversão e contato comercial.',
  },
  {
    question: 'Como funciona o sistema de agendamento online para barbearias, salões e estética?',
    answer: 'É uma ferramenta web prática onde seus clientes escolhem o serviço desejado (corte, barba, procedimentos de lash, nail ou tratamentos estéticos), escolhem o profissional e o horário vago. O cliente agenda sozinho pelo celular a qualquer hora do dia, reduzindo o tempo que você gasta respondendo mensagens no WhatsApp e diminuindo o índice de faltas.',
  },
  {
    question: 'O que está incluso na criação e otimização do Perfil da Empresa no Google?',
    answer: 'Organizamos e padronizamos todas as informações comerciais da sua empresa no Google (antigo Google Meu Negócio): enquadramento nas categorias corretas, horários de atendimento, telefone, links, fotos de ambiente e fachada, e orientações práticas para conduzir clientes a avaliações espontâneas.',
  },
  {
    question: 'A otimização no Google garante o primeiro lugar nas pesquisas?',
    answer: 'Não. Não fazemos promessas mágicas de ranking, pois o posicionamento depende de múltiplos fatores algorítmicos do Google. O que garantimos é uma estruturação comercial e técnica correta, atrativa e completa que melhora significativamente sua autoridade e apresentação nas buscas locais.',
  },
  {
    question: 'Como solicitar um orçamento e qual o prazo de entrega?',
    answer: 'Basta clicar nos botões "Solicitar orçamento" no site para iniciar uma conversa direta pelo WhatsApp oficial da Inova. Apresentamos valores, opções de personalização e prazos conforme a quantidade de plaquinhas, chaveiros 3D ou o escopo da solução digital escolhida.',
  },
];

export const WORK_PROCESS_STEPS = [
  {
    step: '01',
    title: 'Escolha da Solução',
    description: 'Selecione os produtos e soluções que seu negócio precisa: Plaquinhas NFC, Chaveiros 3D, Cartões, BioSite, Agendamento Online ou Perfil no Google.',
  },
  {
    step: '02',
    title: 'Envio das Informações',
    description: 'Envie seus dados, logotipo, links de destino (Google, WhatsApp, Pix, Instagram) e preferências de personalização para alinhamento.',
  },
  {
    step: '03',
    title: 'Configuração e Homologação',
    description: 'Programamos os microchips NFC, testamos a leitura dos QR Codes e estruturamos as ferramentas digitais com validação técnica antes da entrega.',
  },
  {
    step: '04',
    title: 'Entrega e Suporte',
    description: 'Enviamos seus produtos físicos prontos para uso no balcão ou publicamos sua solução digital com suporte direto e atendimento transparente.',
  },
];
