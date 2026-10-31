import { CatalogItem, CustomPlaque, FAQItem, PortfolioProject, ServiceItem } from '../types';

export const INOVA_CONTACT = {
  name: 'Inova Soluções Digitais',
  tagline: 'Conectamos seu negócio ao mundo digital.',
  subtagline: 'Plaquinhas NFC, produtos personalizados e soluções digitais que facilitam a conexão com seus clientes e fortalecem a presença do seu negócio.',
  phone: '5534998973287',
  displayPhone: '(34) 99897-3287',
  location: 'Uberlândia, MG',
  instagram: 'https://www.instagram.com',
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
      'BioSite completo para a biografia do Instagram e WhatsApp',
      'Cartão virtual interativo para apresentação comercial',
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

export const STANDARD_CATALOG: CatalogItem[] = [
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
    id: 'padrao-instagram',
    categories: ['instagram', 'nfc'],
    label: 'ARTE PADRÃO • Instagram • NFC e QR Code',
    name: 'Plaquinha Instagram',
    description: 'Convide seus clientes a seguir o perfil da sua empresa e interagir com suas publicações no ponto de contato.',
    image: '/assets/inova/padrao-instagram.jpeg',
    alt: 'Modelo padrão colorido de plaquinha para divulgar o Instagram com NFC e QR Code',
  },
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
  { id: 'whatsapp', label: 'WhatsApp' },
  { id: 'pix', label: 'Pix' },
  { id: 'instagram', label: 'Instagram' },
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

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'agendamento-barbearia',
    name: 'Barbearia Imperial Classic',
    segment: 'Barbearia & Estética Masculina',
    category: 'agendamento-sites',
    categoryLabel: 'Agendamento Online',
    description: 'Sistema prático de agendamento online com escolha de profissional, catálogo de serviços e confirmação de horários.',
    solution: 'Página mobile rápida que permite ao cliente agendar horários em 3 cliques, reduzindo mensagens no WhatsApp e faltas.',
    image: '/assets/inova/personalizada-flayder.jpeg',
    isConceptual: true,
  },
  {
    id: 'biosite-inova',
    name: 'BioSite Integrado de Atendimento',
    segment: 'Presença Digital & Centralização',
    category: 'presenca-digital',
    categoryLabel: 'BioSite',
    description: 'Página unificada com todos os canais de contato, catálogo de serviços e localização comercial.',
    solution: 'Design leve e de abertura ultrarrápida no celular, ideal para link na bio do Instagram e WhatsApp comercial.',
    image: '/assets/inova/biosite-mockup.jpeg',
    isConceptual: false,
  },
  {
    id: 'chaveiro-nfc-inova',
    name: 'Chaveiro NFC Impressão 3D',
    segment: 'Conectividade Física Portátil',
    category: 'chaveiros-cartoes',
    categoryLabel: 'Chaveiro NFC 3D',
    description: 'Chaveiro fabricado por tecnologia de impressão 3D de precisão com microchip NFC embutido para aproximação rápida.',
    solution: 'Estrutura resistente com relevo sólido para compartilhar Instagram, WhatsApp ou BioSite com um simples toque.',
    image: '/assets/inova/chaveiros-nfc.jpeg',
    isConceptual: false,
  },
  {
    id: 'cartao-nfc-networking',
    name: 'Cartão de Visita NFC Inteligente',
    segment: 'Networking & Contatos',
    category: 'chaveiros-cartoes',
    categoryLabel: 'Cartão NFC',
    description: 'Cartão físico com aproximação NFC e QR Code para apresentação executiva e troca imediata de dados comerciais.',
    solution: 'Aproxime o cartão do celular do cliente e abra seu contato, catálogo ou BioSite na hora, sem necessidade de papel.',
    image: '/assets/inova/chaveiros-nfc.jpeg',
    isConceptual: true,
  },
  {
    id: 'placa-reall-car',
    name: 'Plaquinha Reall Car Automotive',
    segment: 'Estética Automotiva',
    category: 'plaquinhas',
    categoryLabel: 'Plaquinha NFC',
    description: 'Plaquinha em acrílico com base em L, chip NFC e QR Code com arte personalizada para avaliações 5 estrelas no Google.',
    solution: 'Posicionada na recepção, estimula clientes a deixarem avaliações no momento da entrega do veículo.',
    image: '/assets/inova/personalizada-reall-car.jpeg',
    isConceptual: false,
  },
  {
    id: 'placa-claudia-atelie',
    name: 'Plaquinha Claudia Ateliê',
    segment: 'Moda Festa e Noivas',
    category: 'plaquinhas',
    categoryLabel: 'Plaquinha NFC',
    description: 'Plaquinha em acrílico com arte personalizada nas cores do ateliê para captação de avaliações no Google.',
    solution: 'Harmonizada com o balcão de atendimento, transmitindo profissionalismo e acolhimento para noivas e clientes.',
    image: '/assets/inova/personalizada-claudia.jpeg',
    isConceptual: false,
  },
  {
    id: 'placa-verde-limao',
    name: 'Plaquinha Verde Limão Chinelaria',
    segment: 'Calçados & Varejo Local',
    category: 'plaquinhas',
    categoryLabel: 'Plaquinha NFC',
    description: 'Plaquinha personalizada para balcão de vendas com instrução visual clara para avaliação no Google.',
    solution: 'Facilitou a captação de avaliações espontâneas no caixa com aproximação NFC e leitura de QR Code.',
    image: '/assets/inova/personalizada-verde-limao.jpeg',
    isConceptual: false,
  },
  {
    id: 'landing-page-servicos',
    name: 'Página de Serviços & Lash Design',
    segment: 'Estética & Beleza Feminina',
    category: 'agendamento-sites',
    categoryLabel: 'Página de Serviços',
    description: 'Página focada na apresentação de procedimentos (Lash Design, Nail Design e Estética) com botão direto de agendamento.',
    solution: 'Apresentação visual que valoriza o trabalho da profissional e facilita a consulta de procedimentos e marcação de horários.',
    image: '/assets/inova/personalizada-capotas.jpeg',
    isConceptual: true,
  },
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
    question: 'O que é o Cartão Virtual e qual a diferença para o BioSite?',
    answer: 'O Cartão Virtual é uma apresentação digital interativa focada no compartilhamento dos dados de contato de uma pessoa ou empresa (telefone, WhatsApp, e-mail, redes, endereço e chave Pix). Funciona como um cartão de visitas digital leve que pode ser salvo no celular.',
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
