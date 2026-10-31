import { CatalogItem, CustomPlaque, FAQItem, PortfolioProject, ServiceItem } from '../types';

export const INOVA_CONTACT = {
  name: 'Inova Soluções Digitais',
  tagline: 'Seu negócio conectado ao futuro.',
  subtagline: 'Desenvolvimento web, design e tecnologia para empresas que querem crescer e se destacar no digital.',
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
    id: 'dev-web',
    title: 'Desenvolvimento Web',
    iconName: 'Code',
    description: 'Desenvolvimento de sites modernos, landing pages, catálogos digitais e plataformas personalizadas.',
    services: [
      'Sites institucionais modernos',
      'Landing pages de alta conversão',
      'BioSites profissionais e responsivos',
      'Catálogos digitais interativos',
      'Sistemas e plataformas sob medida',
    ],
    buttonText: 'Conhecer desenvolvimento web',
    targetAnchor: '#desenvolvimento-web',
    whatsappMessage: 'Olá! Gostaria de solicitar um orçamento para criação de site e desenvolvimento web.',
  },
  {
    id: 'design',
    title: 'Design e Identidade Visual',
    iconName: 'Palette',
    description: 'Criamos materiais visuais personalizados para fortalecer a identidade e a comunicação da sua marca.',
    services: [
      'Artes publicitárias e comerciais',
      'Criação de identidade visual',
      'Materiais para ponto de venda',
      'Design estratégico para redes sociais',
      'Materiais gráficos personalizados',
    ],
    buttonText: 'Conhecer serviços de design',
    targetAnchor: '#plaquinhas-personalizadas',
    whatsappMessage: 'Olá! Tenho interesse nos serviços de design e criação de identidade visual da Inova.',
  },
  {
    id: 'nfc-qr',
    title: 'NFC e QR Code',
    iconName: 'Radio',
    description: 'Soluções físicas e digitais que aproximam sua empresa dos clientes com tecnologia ágil.',
    services: [
      'Plaquinhas NFC para balcão',
      'Plaquinhas com QR Code personalizado',
      'Chaveiros NFC inteligentes',
      'Cartões de visita NFC interativos',
      'Projetos físicos sob medida',
    ],
    buttonText: 'Conhecer produtos NFC',
    targetAnchor: '#produtos-nfc',
    whatsappMessage: 'Olá! Gostaria de conhecer as opções de plaquinhas e chaveiros NFC.',
  },
  {
    id: 'presenca-digital',
    title: 'Presença Digital',
    iconName: 'Globe',
    description: 'Organização e otimização dos canais digitais para facilitar o acesso às informações da sua empresa.',
    services: [
      'BioSites estruturados com todos os links',
      'Otimização do Perfil da Empresa no Google',
      'Organização e padronização de canais',
      'Orientação estratégica para presença online',
    ],
    buttonText: 'Conhecer presença digital',
    targetAnchor: '#biosite',
    whatsappMessage: 'Olá! Quero saber mais sobre o serviço de BioSite e otimização de presença digital.',
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
    description: 'Direcione para links, cardápios, pagamentos, redes sociais ou páginas de contato com design sofisticado.',
  },
  {
    icon: 'CreditCard',
    title: 'Pix e pagamentos',
    description: 'Uma apresentação mais organizada e segura para seu QR Code de pagamento, agilizando transações.',
  },
  {
    icon: 'Share2',
    title: 'WhatsApp e Instagram',
    description: 'Deixe seus canais de atendimento e redes sociais a um toque de distância dos clientes.',
  },
  {
    icon: 'Wifi',
    title: 'Wi-Fi para clientes',
    description: 'Ajude seu público a encontrar a rede e conectar-se à internet com facilidade e sem senhas confusas.',
  },
  {
    icon: 'Radio',
    title: 'Tecnologia NFC',
    description: 'Aproximação instantânea compatível com smartphones, trazendo conveniência para o ponto de venda.',
  },
];

export const STANDARD_CATALOG: CatalogItem[] = [
  {
    id: 'padrao-whatsapp',
    categories: ['whatsapp', 'nfc', 'combinados'],
    label: 'ARTE PADRÃO • WhatsApp • NFC e QR Code',
    name: 'Plaquinha WhatsApp',
    description: 'Facilite o contato direto dos clientes pelo WhatsApp, por aproximação NFC ou leitura do QR Code.',
    image: '/assets/inova/padrao-whatsapp.jpeg',
    alt: 'Modelo padrão de plaquinha verde para contato pelo WhatsApp com NFC e QR Code',
  },
  {
    id: 'padrao-pix',
    categories: ['pix', 'nfc'],
    label: 'ARTE PADRÃO • Pix • NFC e QR Code',
    name: 'Plaquinha Pix',
    description: 'Apresente seu canal de pagamento com instrução de aproximação e espaço para QR Code instantâneo.',
    image: '/assets/inova/padrao-pix.jpeg',
    alt: 'Modelo padrão verde de plaquinha para pagamento por Pix com NFC e QR Code',
  },
  {
    id: 'padrao-instagram',
    categories: ['instagram', 'nfc'],
    label: 'ARTE PADRÃO • Instagram • NFC e QR Code',
    name: 'Plaquinha Instagram',
    description: 'Convide seus clientes a seguir o perfil da sua empresa e interagir com suas publicações.',
    image: '/assets/inova/padrao-instagram.jpeg',
    alt: 'Modelo padrão colorido de plaquinha para divulgar o Instagram com NFC e QR Code',
  },
  {
    id: 'padrao-google',
    categories: ['google', 'nfc'],
    label: 'ARTE PADRÃO • Avaliações Google • NFC e QR Code',
    name: 'Plaquinha Google',
    description: 'Deixe o caminho até as avaliações da sua empresa mais simples e impulsione sua autoridade local.',
    image: '/assets/inova/padrao-google.jpeg',
    alt: 'Modelo padrão azul de plaquinha para avaliações no Google com estrelas, NFC e QR Code',
  },
  {
    id: 'padrao-wifi',
    categories: ['wifi', 'nfc'],
    label: 'ARTE PADRÃO • Wi-Fi • NFC e QR Code',
    name: 'Plaquinha Wi-Fi',
    description: 'Ajude seus clientes a encontrar a rede e conectar-se com facilidade em mesas e recepções.',
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
  { id: 'outros', label: 'Outros modelos' },
];

export const CUSTOM_PLAQUES: CustomPlaque[] = [
  {
    id: 'claudia',
    categories: ['google', 'segmento'],
    label: 'Elegante • Moda festa',
    segment: 'Moda Festa & Noivas',
    name: 'Claudia Ateliê',
    description: 'Identidade em vermelho, branco e dourado para valorizar a marca e acolher clientes com sofisticação.',
    image: '/assets/inova/personalizada-claudia.jpeg',
    alt: 'Arte vermelha de avaliação no Google para o Claudia Ateliê',
  },
  {
    id: 'verde-limao',
    categories: ['google', 'segmento'],
    label: 'Vibrante • Varejo',
    segment: 'Calçados & Varejo',
    name: 'Verde Limão Chinelaria',
    description: 'Contraste marcante e comunicação direta no ponto de venda para incentivar avaliações espontâneas.',
    image: '/assets/inova/personalizada-verde-limao.jpeg',
    alt: 'Arte verde-limão de avaliação no Google para a Verde Limão Chinelaria',
  },
  {
    id: 'oticas-gouveia',
    categories: ['google', 'segmento'],
    label: 'Clássico • Saúde visual',
    segment: 'Ótica & Saúde Visual',
    name: 'Óticas Gouveia',
    description: 'Composição limpa reforçando credibilidade médica, acolhimento e confiança para os pacientes.',
    image: '/assets/inova/personalizada-oticas-gouveia.jpeg',
    alt: 'Arte de avaliação no Google para as Óticas Gouveia',
  },
  {
    id: 'reall-car',
    categories: ['google', 'segmento'],
    label: 'Impactante • Automotivo',
    segment: 'Estética Automotiva',
    name: 'Reall Car Automotive',
    description: 'Estética premium em tons escuros e detalhes dinâmicos para destacar a qualidade dos serviços automotivos.',
    image: '/assets/inova/personalizada-reall-car.jpeg',
    alt: 'Arte preta e laranja de avaliação no Google para a Reall Car Automotive',
  },
  {
    id: 'flayder-willis',
    categories: ['pix', 'segmento'],
    label: 'Premium • Barbearia',
    segment: 'Barbearia & Estética Masculina',
    name: 'Flayder Willis Barbearia',
    description: 'Visual sofisticado e elegante na bancada para agilizar o pagamento por Pix e QR Code sem atrito.',
    image: '/assets/inova/personalizada-flayder.jpeg',
    alt: 'Arte de pagamento por Pix para a Flayder Willis Barbearia',
  },
  {
    id: 'capotas-pickup',
    categories: ['wifi', 'segmento'],
    label: 'Conectividade • Automotivo',
    segment: 'Acessórios Automotivos',
    name: 'Capotas Pickup GYN Fibras',
    description: 'Arte personalizada com as cores da oficina para conectar clientes à rede Wi-Fi com agilidade na sala de espera.',
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
    id: 'site-barbearia-conceito',
    name: 'Barbearia Imperial Classic',
    segment: 'Estética Masculina & Bem-estar',
    category: 'sites',
    categoryLabel: 'Site Institucional',
    description: 'Plataforma web com agendamento online integrado, apresentação de serviços premium e catálogo de produtos.',
    solution: 'Site institucional rápido, responsivo e com fluxo direto para o WhatsApp e agendador.',
    image: '/assets/inova/personalizada-flayder.jpeg',
    isConceptual: true,
  },
  {
    id: 'site-transportadora-conceito',
    name: 'TransLog Express Frotas',
    segment: 'Transporte & Logística',
    category: 'landing-pages',
    categoryLabel: 'Landing Page',
    description: 'Landing page focada em cotação ágil de fretes, cobertura regional e apresentação de frota comercial.',
    solution: 'Estrutura orientada à conversão corporativa B2B com formulário inteligente e botão de cotação rápida.',
    image: '/assets/inova/personalizada-capotas.jpeg',
    isConceptual: true,
  },
  {
    id: 'biosite-inova',
    name: 'BioSite Corporativo Integrado',
    segment: 'Presença Digital & Omnichannel',
    category: 'biosites',
    categoryLabel: 'BioSite',
    description: 'Página digital unificada com todos os canais de atendimento, catálogo interativo e localização comercial.',
    solution: 'Design minimalista carregamento ultrarrápido em celulares com botões diretos para canais de contato.',
    image: '/assets/inova/biosite-mockup.jpeg',
    isConceptual: false,
  },
  {
    id: 'chaveiro-nfc-inova',
    name: 'Chaveiro NFC Touch Connect',
    segment: 'Tecnologia & Conectividade Física',
    category: 'nfc',
    categoryLabel: 'NFC',
    description: 'Dispositivo físico com microchip NTAG programado para compartilhamento com um simples toque.',
    solution: 'Acabamento resistente e chip de alta sensibilidade para aproximação em smartphones compatíveis.',
    image: '/assets/inova/chaveiros-nfc.jpeg',
    isConceptual: false,
  },
  {
    id: 'placa-reall-car',
    name: 'Plaquinha Reall Car Automotive',
    segment: 'Automotivo Premium',
    category: 'plaquinhas',
    categoryLabel: 'Plaquinha Personalizada',
    description: 'Material visual personalizado para balcão de recepção com QR Code e NFC para avaliações no Google.',
    solution: 'Design de alto contraste com harmonização da paleta da marca e proteção visual.',
    image: '/assets/inova/personalizada-reall-car.jpeg',
    isConceptual: false,
  },
  {
    id: 'placa-claudia-atelie',
    name: 'Plaquinha Claudia Ateliê',
    segment: 'Moda Festa e Noivas',
    category: 'identidade-visual',
    categoryLabel: 'Identidade Visual & Plaquinha',
    description: 'Peça refinada para recepção de noivas, combinando tipografia elegante e acabamento dourado.',
    solution: 'Integração visual com a identidade do ateliê para captação de depoimentos espontâneos.',
    image: '/assets/inova/personalizada-claudia.jpeg',
    isConceptual: false,
  },
];

export const FAQ_DATA: FAQItem[] = [
  {
    question: 'Posso usar minha própria logo e minhas cores?',
    answer: 'Sim, com certeza! Nossa proposta em materiais personalizados é adaptar o layout exatamente à identidade visual da sua marca, respeitando sua paleta de cores, tipografia e logotipo oficial.',
  },
  {
    question: 'Posso enviar meu próprio QR Code ou link?',
    answer: 'Sim. Você nos envia o link de destino (do seu perfil do Google, WhatsApp, chave Pix, cardápio ou site). Nós geramos o código com padrão gráfico profissional. O QR Code final sempre deve ser testado com o endereço fornecido antes de sua utilização.',
  },
  {
    question: 'A plaquinha ou o chaveiro NFC funciona em qualquer celular?',
    answer: 'A aproximação instantânea depende de um chip NFC configurado e da compatibilidade do smartphone do usuário (a grande maioria dos celulares modernos conta com leitor NFC nativo ativado). Apenas a arte gráfica não ativa a função por aproximação — o chip interno é responsável por essa comunicação.',
  },
  {
    question: 'Qual a diferença entre modelo padrão e personalizado?',
    answer: 'Os modelos padrão seguem o layout pré-desenhado do nosso catálogo (com cores e diagramação definidas da Inova). A arte personalizada é criada sob medida para a sua empresa, com sua marca, suas cores e elementos exclusivos do seu negócio.',
  },
  {
    question: 'Vocês fazem artes para qualquer segmento?',
    answer: 'Sim. Adaptamos nossos designs e estruturas web para os mais variados segmentos comerciais: barbearias, clínicas, oficinas, estúdios de beleza, restaurantes, escritórios de advocacia, transportadoras, comércios locais e prestadores de serviços.',
  },
  {
    question: 'As artes do catálogo já estão prontas para produção?',
    answer: 'As artes exibidas em nossa galeria são referências visuais e exemplos de portfólio. O material final, seus dados específicos (como links e dados de pagamento) e o escopo exato são preparados individualmente para cada pedido.',
  },
  {
    question: 'O que é o BioSite?',
    answer: 'O BioSite é uma página web moderna e otimizada para dispositivos móveis que centraliza todos os canais da sua empresa em um único link (ideal para a biografia do Instagram, cartão virtual ou assinatura de e-mail). Nele, você reúne WhatsApp, catálogo, localização, redes sociais e formulário de contato.',
  },
  {
    question: 'A otimização garante primeiro lugar no Google?',
    answer: 'Não. Nosso serviço organiza, padroniza e melhora a apresentação técnica e visual das informações comerciais no Perfil da Empresa no Google (Google Meu Negócio), facilitando a experiência do cliente e a relevância local. Porém, não garantimos posições fixas ou resultados algorítmicos específicos.',
  },
  {
    question: 'Os QR Codes das imagens já direcionam para minha empresa?',
    answer: 'As imagens apresentadas no site são referências conceituais e visuais. No momento da produção do seu projeto, o código é gerado com os links oficiais da sua empresa e devidamente validado antes da entrega.',
  },
  {
    question: 'Quais são os preços, prazos e opções de entrega?',
    answer: 'Como cada projeto possui particularidades (quantidade de plaquinhas, se inclui chip NFC ou somente QR Code, complexidade de sites ou páginas), valores e prazos são informados com clareza em nosso atendimento direto pelo WhatsApp.',
  },
  {
    question: 'Como funciona a criação de sites?',
    answer: 'Iniciamos entendendo o objetivo do seu negócio (apresentar serviços, captar leads ou exibir catálogo). Em seguida, criamos a estrutura visual, redigimos os textos estratégicos, integramos botões diretos para o WhatsApp e entregamos uma página rápida e otimizada.',
  },
  {
    question: 'Vocês desenvolvem sites personalizados?',
    answer: 'Sim! Desenvolvemos desde landing pages de alta conversão até sites institucionais completos e catálogos interativos, sempre com código limpo, velocidade e responsividade total.',
  },
  {
    question: 'Os sites funcionam em celulares?',
    answer: 'Absolutamente. Todos os projetos web desenvolvidos pela Inova são criados com metodologia mobile-first, garantindo que funcionem perfeitamente em celulares, tablets, notebooks e monitores de alta resolução.',
  },
  {
    question: 'Como solicitar um orçamento?',
    answer: 'Basta clicar em qualquer um dos botões "Solicitar orçamento" ou "Falar no WhatsApp" presentes no site. Você será direcionado para uma conversa direta com nossa equipe com os detalhes do serviço que você selecionou.',
  },
];

export const WORK_PROCESS_STEPS = [
  {
    step: '01',
    title: 'Escolha uma solução',
    description: 'Conheça nossas áreas de atuação (Sites, NFC, Design ou Presença Digital) e identifique o que sua empresa precisa para se destacar.',
  },
  {
    step: '02',
    title: 'Compartilhe suas informações',
    description: 'Envie sua logotipo, cores, referências visuais, canais de atendimento e os links que deseja incluir em seu projeto.',
  },
  {
    step: '03',
    title: 'Alinhamento do projeto',
    description: 'Definimos com clareza o escopo, nível de personalização, compatibilidade técnica, prazos e investimento necessário.',
  },
  {
    step: '04',
    title: 'Aprovação e entrega',
    description: 'Você revisa a solução, realizamos os testes de validação e entregamos o material ou colocamos seu site no ar com total suporte.',
  },
];
