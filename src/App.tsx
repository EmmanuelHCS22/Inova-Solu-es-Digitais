/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Solutions } from './components/Solutions';
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
    <div className="min-h-screen bg-[#F5F4F0] text-[#0A0F2E] flex flex-col font-['Poppins',sans-serif] selection:bg-[#8B5CF6]/20 selection:text-[#8B5CF6]">
      {/* 1. Header Fixo com navegação reorganizada */}
      <Header activeSection={activeSection} />

      {/* Conteúdo Principal */}
      <main className="flex-1">
        {/* 2. Hero Refinada com Modelo 3D Real */}
        <Hero />

        {/* 3. Soluções Inova — Seção Central Unificada das 4 Categorias */}
        <Solutions onOpenModal={(img) => setModalImage(img)} />

        {/* 4. Por que Escolher a Inova (Diferenciais) */}
        <WhyChooseUs />

        {/* 5. Sobre a Inova Soluções Digitais */}
        <AboutUs />

        {/* 6. Processo de Trabalho (4 Etapas Lineares) */}
        <ProcessSection />

        {/* 7. Dúvidas Frequentes (FAQ) */}
        <FAQ />

        {/* 8. Contato Final & Lead WhatsApp */}
        <ContactCTA />
      </main>

      {/* 9. Rodapé Oficial */}
      <Footer />

      {/* Modal de Zoom de Imagens em Alta Definição */}
      <ImageModal image={modalImage} onClose={() => setModalImage(null)} />

      {/* Botão Flutuante de WhatsApp Comercial */}
      <FloatingWhatsApp />
    </div>
  );
}
