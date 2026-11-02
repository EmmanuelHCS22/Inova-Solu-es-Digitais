import React, { useEffect } from 'react';
import { X, ArrowUpRight, AlertTriangle } from 'lucide-react';
import { getWhatsAppUrl } from '../data/inovaData';

interface ModalImage {
  src: string;
  name: string;
  category?: string;
  description?: string;
  alt: string;
}

interface ImageModalProps {
  image: ModalImage | null;
  onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({ image, onClose }) => {
  useEffect(() => {
    if (!image) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Prevent background scrolling while modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [image, onClose]);

  if (!image) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-image-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full bg-[#12183F] border border-white/[0.08] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors focus:outline-none focus:ring-2 focus:ring-[#00C2FF]"
          aria-label="Fechar ampliação"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image Frame */}
        <div className="md:w-3/5 bg-[#0A0F2E] flex items-center justify-center p-4 sm:p-6 relative">
          <img
            src={image.src}
            alt={image.alt}
            className="max-h-[65vh] w-auto max-w-full object-contain rounded-xl shadow-lg"
          />
        </div>

        {/* Details Sidebar */}
        <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/[0.08] bg-[#12183F]">
          <div>
            {image.category && (
              <span className="text-xs font-mono uppercase tracking-wider text-[#00C2FF] font-semibold block mb-2">
                {image.category}
              </span>
            )}
            <h3 id="modal-image-title" className="text-2xl font-bold text-white mb-3 font-display">
              {image.name}
            </h3>
            {image.description && (
              <p className="text-sm text-[#F7F8FC]/80 leading-relaxed mb-6 font-normal">
                {image.description}
              </p>
            )}

            {/* Verification Note */}
            <div className="p-3 rounded-xl bg-white/5 border border-white/[0.08] flex items-start gap-2.5 text-xs text-[#F7F8FC]/70 mb-6">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                As imagens são referências visuais. O QR Code final deve ser configurado com o link da sua empresa e testado antes da utilização.
              </span>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-white/[0.08]">
            <a
              href={getWhatsAppUrl(`Olá! Tenho interesse no modelo "${image.name}" e gostaria de solicitar um orçamento.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#8B5CF6] hover:bg-[#6366F1] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/50 shadow-md transition-all active:scale-98 min-h-[44px]"
            >
              <span>Solicitar este modelo</span>
              <ArrowUpRight className="w-4 h-4 text-white shrink-0" />
            </a>
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-medium text-[#F7F8FC]/60 hover:text-white hover:bg-white/5 transition-colors"
            >
              Fechar visualização (Esc)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
