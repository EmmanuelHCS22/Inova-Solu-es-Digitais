export interface CatalogItem {
  id: string;
  name: string;
  label: string;
  categories: string[];
  description: string;
  image: string;
  alt: string;
}

export interface CustomPlaque {
  id: string;
  name: string;
  label: string;
  segment: string;
  categories: string[];
  description: string;
  image: string;
  alt: string;
}

export interface PortfolioProject {
  id: string;
  name: string;
  segment: string;
  category: 'sites' | 'landing-pages' | 'identidade-visual' | 'plaquinhas' | 'nfc' | 'biosites';
  categoryLabel: string;
  description: string;
  solution: string;
  image: string;
  demoUrl?: string;
  isConceptual?: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  iconName: string;
  description: string;
  services: string[];
  buttonText: string;
  targetAnchor: string;
  whatsappMessage: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
