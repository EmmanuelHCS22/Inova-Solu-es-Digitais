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
    description: 'Plaquinhas em acrílico com base em L para balcão e recepção. Conexão por aproximação NFC ou leitura do QR Code.',
    services: [
      'Avaliações no Google (5 estrelas)',
      'Instagram e redes sociais',
      'WhatsApp de atendimento direto',
      'Pix e pagamentos instantâneos',
      'Acesso à rede Wi-Fi para clientes',
      'Modelos padrão e artes personalizadas com sua marca',
    ],
    buttonText: 'Conhecer plaquinhas NFC',
    targetAnchor: '#catalogo-padrao',
    whatsappMessage: 'Olá! Gostaria de consultar modelos e valores de plaquinhas NFC e QR Code para balcão.',
  },
  {
    id: 'chaveiros-cartoes',
    title: 'Chaveiros e Cartões NFC',
    iconName: 'Smartphone',
    description: 'Chaveiros fabricados por impressão 3D e cartões de visita inteligentes com chip NFC para compartilhamento por aproximação.',
    services: [
      'Chaveiros NFC fabricados em impressão 3D',
      'Modelos para Instagram, WhatsApp e Google',
      'Modelos com símbolo NFC ou logotipo personalizado',
      'Cartões de visita NFC inteligentes para networking',
      'Compartilhamento instantâneo sem necessidade de aplicativo',
    ],
    buttonText: 'Conhecer chaveiros e cartões',
    targetAnchor: '#chaveiros-nfc',
    whatsappMessage: 'Olá! Tenho interesse nos chaveiros NFC em impressão 3D e nos cartões NFC de aproximação.',
  },
  {
    id: 'presenca-digital',
    title: 'Presença Digital & BioSite',
    iconName: 'Globe',
    description: 'Ferramentas digitais para organizar seus canais comerciais, centralizar links e atrair mais clientes na sua região.',
    services: [
      'BioSite completo para biografia do Instagram',
      'Cartão Virtual interativo',
      'Catálogo Digital e Cardápio Digital interativos',
      'Otimização do Perfil da Empresa no Google',
      'Landing Pages objetivas focadas em conversão',
    ],
    buttonText: 'Conhecer presença digital',
    targetAnchor: '#biosite',
    whatsappMessage: 'Olá! Quero saber mais sobre BioSite, Catálogo/Cardápio Digital e otimização no Google.',
  },
  {
    id: 'agendamento-sites',
    title: 'Sites & Agendamento Online',
    iconName: 'Calendar',
    description: 'Sistemas práticos de agendamento online e páginas de serviços pensadas especialmente para prestadores de serviços.',
    services: [
      'Agendamento online para barbearias e cabeleireiras',
      'Sistemas para Lash Designers e Nail Designers',
      'Páginas para profissionais de estética e beleza',
      'Redução de tempo no WhatsApp e menor índice de faltas',
      'Estrutura moderna, rápida e 100% otimizada para celular',
    ],
    buttonText: 'Conhecer sistemas de agendamento',
    targetAnchor: '#desenvolvimento-web',
    whatsappMessage: 'Olá! Gostaria de conhecer o sistema de agendamento online e páginas de serviços para profissionais.',
  },
];

export const NFC_FEATURES = [
  {
    icon: 'Star',
    title: 'Avaliações no Google',
    description: 'Facilite o acesso dos clientes ao perfil da sua empresa e incentive avaliações espontâneas de 5 estrelas no balcão.',
  },
  {
    icon: 'QrCode',
    title: 'QR Code personalizado',
    description: 'Direcione para links, redes sociais, WhatsApp ou páginas comerciais com leitura rápida e padrão visual profissional.',
  },
  {
    icon: 'CreditCard',
    title: 'Pix e pagamentos',
    description: 'Apresentação organizada para seu QR Code Pix no balcão, agilizando cobranças sem atrito.',
  },
  {
    icon: 'Share2',
    title: 'WhatsApp e Instagram',
    description: 'Deixe seu canal de atendimento e o perfil da empresa a um simples toque de celular do cliente.',
  },
  {
    icon: 'Wifi',
    title: 'Wi-Fi para clientes',
    description: 'Conecte seus clientes à rede Wi-Fi da loja ou recepção sem precisar soletrar ou digitar senhas.',
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
    description: 'Apresente seu canal de pagamento Pix com visual organizado e QR Code instantâneo para cobranças rápidas.',
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
  { id: 'pix', label: 'Pix e pagamentos' },
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
    description: 'Sistema prático de agendamento online com escolha de profissional, catálogo de serviços e confirmação automática.',
    solution: 'Página mobile rápida que permite ao cliente agendar em 3 cliques, reduzindo mensagens no WhatsApp e faltas.',
    image: '/assets/inova/personalizada-flayder.jpeg',
    isConceptual: true,
  },
  {
    id: 'biosite-inova',
    name: 'BioSite Corporativo Integrado',
    segment: 'Presença Digital & Centralização',
    category: 'presenca-digital',
    categoryLabel: 'BioSite',
    description: 'Página unificada com todos os canais de atendimento, catálogo interativo de serviços e localização comercial.',
    solution: 'Design leve e de abertura ultrarrápida no celular, perfeito para link na bio do Instagram e WhatsApp.',
    image: '/assets/inova/biosite-mockup.jpeg',
    isConceptual: false,
  },
  {
    id: 'chaveiro-nfc-inova',
    name: 'Chaveiro NFC Impressão 3D',
    segment: 'Conectividade Física Portátil',
    category: 'chaveiros-cartoes',
    categoryLabel: 'Chaveiro NFC 3D',
    description: 'Chaveiro inteligente fabricado por impressão 3D com microchip NFC embutido para aproximação rápida.',
    solution: 'Estrutura resistente com relevo preciso para compartilhar Instagram, WhatsApp ou BioSite com um toque.',
    image: '/assets/inova/chaveiros-nfc.jpeg',
    isConceptual: false,
  },
  {
    id: 'cartao-nfc-networking',
    name: 'Cartão de Visita NFC Inteligente',
    segment: 'Networking & Contatos',
    category: 'chaveiros-cartoes',
    categoryLabel: 'Cartão NFC',
    description: 'Cartão físico com aproximação NFC e QR Code para apresentação executiva e troca imediata de contatos.',
    solution: 'Aproxime o cartão do celular do cliente e abra seu contato, catálogo ou BioSite na hora, sem papel.',
    image: '/assets/inova/chaveiros-nfc.jpeg',
    isConceptual: true,
  },
  {
    id: 'placa-reall-car',
    name: 'Plaquinha Reall Car Automotive',
    segment: 'Estética Automotiva',
    category: 'plaquinhas',
    categoryLabel: 'Plaquinha NFC',
    description: 'Plaquinha personalizada em acrílico com base em L, chip NFC e QR Code para avaliações 5 estrelas no Google.',
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
    description: 'Plaquinha em acrílico com arte personalizada nas cores do ateliê para captação de depoimentos no Google.',
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
    solution: 'Aumentou a captação de avaliações espontâneas no caixa com facilidade por aproximação e QR Code.',
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
    solution: 'Visual clean e sofisticado que valoriza o trabalho da profissional e facilita a marcação de horários.',
    image: '/assets/inova/personalizada-capotas.jpeg',
    isConceptual: true,
  },
];

export const FAQ_DATA: FAQItem[] = [
  {
    question: 'A tecnologia NFC funciona em qualquer celular?',
    answer: 'A aproximação por NFC funciona na grande maioria dos smartphones modernos (iPhones a partir do modelo XR/XS e quase todos os aparelhos Android intermediários e avançados). Para aparelhos que não possuam NFC ativo, todas as nossas plaquinhas contam com QR Code de alta precisão como alternativa rápida.',
  },
  {
    question: 'Qual a diferença entre plaquinhas de arte padrão e personalizada?',
    answer: 'As artes padrão seguem os layouts prontos do nosso catálogo com diagramação oficial para Google, Instagram, WhatsApp, Pix e Wi-Fi. Já as artes personalizadas são produzidas sob medida para o seu negócio, incorporando seu logotipo, suas cores institucionais e elementos da sua marca.',
  },
  {
    question: 'Como são fabricados os chaveiros NFC?',
    answer: 'Nossos chaveiros NFC são fabricados por tecnologia de impressão 3D de alta precisão, o que garante acabamento sólido, relevos nítidos e estrutura durável. Eles recebem um microchip NTAG embutido internamente para leitura por aproximação.',
  },
  {
    question: 'Como funciona o Cartão NFC de aproximação?',
    answer: 'O Cartão NFC é um cartão físico inteligente que substitui pilhas de cartões de papel. Ao aproximá-lo da traseira de um smartphone compatível, ele abre instantaneamente seu BioSite, contato salvo, cardápio ou link comercial.',
  },
  {
    question: 'O que é o BioSite e para que ele serve?',
    answer: 'O BioSite é uma página web desenvolvida sob medida para centralizar todos os seus canais em um único link (ideal para a biografia do Instagram e WhatsApp). Nele, você reúne botão de WhatsApp, agendamento, catálogo de serviços, redes sociais e localização da sua empresa.',
  },
  {
    question: 'O que está incluso na otimização do Perfil da Empresa no Google?',
    answer: 'Organizamos e padronizamos todas as informações comerciais da sua empresa no Google: categorias corretas, horários de atendimento, telefone, links, fotos de fachada e ambiente, além de orientações práticas para conduzir clientes a avaliações espontâneas.',
  },
  {
    question: 'A otimização no Google garante o primeiro lugar nas pesquisas?',
    answer: 'Não prometemos garantias mágicas de primeiro lugar, pois o ranking depende de múltiplos fatores algorítmicos do Google. O que garantimos é uma estruturação técnica e comercial correta e atrativa que melhora significativamente sua autoridade e visibilidade nas buscas da sua região.',
  },
  {
    question: 'Como funciona o sistema de agendamento online para barbearias e salões?',
    answer: 'Disponibilizamos uma página de agendamento prática e intuitiva onde seus clientes escolhem o serviço (corte, barba, lash, unhas), selecionam o profissional e o horário disponível. O sistema envia a confirmação diretamente, reduzindo o tempo gasto respondendo no WhatsApp e diminuindo as faltas.',
  },
  {
    question: 'Posso usar meu próprio QR Code ou link nas plaquinhas?',
    answer: 'Sim! Você nos envia o seu link (perfil de avaliações do Google, link do WhatsApp, chave Pix ou Instagram) e nós geramos e validamos o QR Code antes da impressão e da programação do chip NFC.',
  },
  {
    question: 'Como solicitar um orçamento e qual o prazo de entrega?',
    answer: 'Você pode clicar em qualquer botão "Solicitar orçamento" no site para falar diretamente conosco pelo WhatsApp. Informamos valores, prazos e opções de frete conforme a quantidade de plaquinhas, chaveiros ou o escopo digital escolhido.',
  },
];

export const WORK_PROCESS_STEPS = [
  {
    step: '01',
    title: 'Escolha da Solução',
    description: 'Selecione os produtos que seu negócio precisa: Plaquinhas NFC, Chaveiros 3D, Cartões, BioSite ou Agendamento Online.',
  },
  {
    step: '02',
    title: 'Envio das Informações',
    description: 'Envie seus dados, logotipo, links de destino (Google, WhatsApp, Pix, Instagram) e preferências de personalização.',
  },
  {
    step: '03',
    title: 'Ajuste e Programação',
    description: 'Configuramos o chip NFC, diagramamos a arte física ou estruturamos a página web com testes de validação técnica.',
  },
  {
    step: '04',
    title: 'Entrega e Suporte',
    description: 'Entregamos seu produto físico pronto para uso no balcão ou publicamos sua solução digital com suporte direto.',
  },
];
