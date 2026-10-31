/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Solutions } from './components/Solutions';
import { WebDevelopment } from './components/WebDevelopment';
import { NFCProducts } from './components/NFCProducts';
import { Catalog } from './components/Catalog';
import { KeychainsNFC } from './components/KeychainsNFC';
import { BioSiteSection } from './components/BioSiteSection';
import { GoogleProfileSection } from './components/GoogleProfileSection';
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
      'desenvolvimento-web',
      'produtos-nfc',
      'catalogo-padrao',
      'plaquinhas-personalizadas',
      'chaveiros-nfc',
      'biosite',
      'google-empresa',
      'portfolio',
      'sobre',
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
        {/* 2. Hero Section with Studio Editorial Redesign */}
        <Hero />

        {/* 3. Solutions Section (4 Pillars) */}
        <Solutions />

        {/* 4. Highlight: Web Development (Landing Page, Institutional, Digital Catalog) */}
        <WebDevelopment />

        {/* 5. NFC & QR Code Products */}
        <NFCProducts />

        {/* 6. Product Showcase Slider: Cinematographic presentation of standard and custom plaques */}
        <Catalog onOpenModal={(img) => setModalImage(img)} />

        {/* 7. NFC Keychains Section */}
        <KeychainsNFC />

        {/* 8. BioSite Section */}
        <BioSiteSection />

        {/* 9. Google Business Profile Optimization */}
        <GoogleProfileSection />

        {/* 10. Portfolio Section */}
        <Portfolio onOpenModal={(img) => setModalImage(img)} />

        {/* 11. Why Choose Inova */}
        <WhyChooseUs />

        {/* 12. About Inova Soluções Digitais */}
        <AboutUs />

        {/* 13. Work Process (4 Steps) */}
        <ProcessSection />

        {/* 14. FAQ Accordion (14 Questions) */}
        <FAQ />

        {/* 15. Final CTA Banner & WhatsApp Lead Generator */}
        <ContactCTA />
      </main>

      {/* 16. Footer */}
      <Footer />

      {/* Image Zoom Modal */}
      <ImageModal image={modalImage} onClose={() => setModalImage(null)} />

      {/* Persistent Floating WhatsApp Button */}
      <FloatingWhatsApp />
    </div>
  );
}
