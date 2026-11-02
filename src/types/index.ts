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
