import React from 'react';
import { Image as ImageIcon, ArrowRight, Sparkles } from 'lucide-react';
import { LiquidButton } from './ui/liquid-glass-button';
import { motion } from 'motion/react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface TheMasterpiecesProps {
  onOpenGallery: () => void;
}

export const TheMasterpieces: React.FC<TheMasterpiecesProps> = ({ onOpenGallery }) => {
  return (
    <section className="py-20 sm:py-24 bg-qgreen-950 text-white text-center relative border-b border-qgreen-900 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[#e8c87f] text-[11px] uppercase tracking-[0.3em] font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
          <span>Visual Anthology · Kralgund Sanctuary</span>
        </div>

        <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl mb-4 font-normal tracking-tight text-white">
          The Masterpieces
        </h2>

        <p className="text-lg sm:text-xl font-light text-emerald-100/90 mb-10 max-w-xl mx-auto">
          Crafted Wazwan icons, smoking sizzlers, and barista brews along the Kupwara Highway.
        </p>

        <LiquidButton
          size="lg"
          variant="gold"
          onClick={onOpenGallery}
          className="w-full sm:w-auto rounded-full text-xs uppercase tracking-widest font-bold px-10 py-4 shadow-xl border border-white/40"
        >
          <span className="flex items-center gap-2.5">
            <ImageIcon className="w-4 h-4" />
            <span>View the Full Gallery</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </span>
        </LiquidButton>
      </motion.div>
    </section>
  );
};
