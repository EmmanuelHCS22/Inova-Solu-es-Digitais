/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Solutions } from './components/Solutions';
import { NFCProducts } from './components/NFCProducts';
import { Catalog } from './components/Catalog';
import { KeychainsNFC } from './components/KeychainsNFC';
import { DigitalPresence } from './components/DigitalPresence';
import { WebDevelopment } from './components/WebDevelopment';
import { Portfolio } from './components/Portfolio';
import { WhyChooseUs } from './components/WhyChooseUs';
import { AboutUs } from './components/AboutUs';
import { ProcessSection } from './components/ProcessSection';
import { FAQ } from './components/FAQ';
import { ContactCTA } from './components/ContactCTA';
import { Footer } from './components/Footer';
import { ImageModal } from './components/ImageModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

interface ModalImageData {
  src: string;
  name: string;
  category?: string;
  description?: string;
  alt: string;
}

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('inicio');
  const [modalImage, setModalImage] = useState<ModalImageData | null>(null);

  useEffect(() => {
    const sectionIds = [
      'inicio',
      'solucoes',
      'produtos-nfc',
      'catalogo-padrao',
      'chaveiros-nfc',
      'presenca-digital',
      'agendamento-online',
      'portfolio',
      'diferenciais',
      'sobre',
      'processo',
      'faq',
      'contato',
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-30% 0px -60% 0px',
        threshold: 0,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F4F0] text-[#171923] flex flex-col font-sans selection:bg-[#7357E8]/20 selection:text-[#7357E8]">
      {/* 1. Fixed Header with navigation and official logo */}
      <Header activeSection={activeSection} />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* 2. Hero Section with 3D Plaque Showcase */}
        <Hero />

        {/* 3. Solutions Section (4 Official Categories) */}
        <Solutions />

        {/* 4. NFC & QR Code Products */}
        <NFCProducts />

        {/* 5. Product Showcase: Standard and Custom Acrylic Plaques */}
        <Catalog onOpenModal={(img) => setModalImage(img)} />

        {/* 6. 3D-Printed NFC Keychains & Smart NFC Cards */}
        <KeychainsNFC />

        {/* 7. Digital Presence: Google Meu Negócio, BioSite, Cartão Virtual, Catálogos, Cardápios, Landing Pages */}
        <DigitalPresence />

        {/* 8. Online Scheduling & Specialized Service Pages (Barbearias, Cabeleireiras, Lash, Nail, Estética) */}
        <WebDevelopment />

        {/* 9. Portfolio Section with Real Authentic Projects */}
        <Portfolio onOpenModal={(img) => setModalImage(img)} />

        {/* 10. Why Choose Inova (Differentials) */}
        <WhyChooseUs />

        {/* 11. About Inova Soluções Digitais */}
        <AboutUs />

        {/* 12. Work Process (4 Linear Steps) */}
        <ProcessSection />

        {/* 13. FAQ Accordion (14 Questions Covering all 10 areas) */}
        <FAQ />

        {/* 14. Final CTA Banner & WhatsApp Lead Generator */}
        <ContactCTA />
      </main>

      {/* 15. Footer */}
      <Footer />

      {/* Image Zoom Modal */}
      <ImageModal image={modalImage} onClose={() => setModalImage(null)} />

      {/* Persistent Floating WhatsApp Button */}
      <FloatingWhatsApp />
    </div>
  );
}
