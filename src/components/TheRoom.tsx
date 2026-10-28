import React, { useState } from 'react';
import { Calendar, Sparkles, Flower2 } from 'lucide-react';
import { LiquidButton } from '@/components/ui/liquid-glass-button';
import { motion } from 'motion/react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface TheRoomProps {
  onOpenReservation: () => void;
}

export const TheRoom: React.FC<TheRoomProps> = ({ onOpenReservation }) => {
  const [img1Error, setImg1Error] = useState(false);
  const [img2Error, setImg2Error] = useState(false);

  return (
    <section id="room" className="py-24 sm:py-32 bg-qgreen-950 text-white relative overflow-hidden">
      
      {/* Background glass lighting */}
      <div
        className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[150px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Narrative Column with Scroll Reveal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 glass-pill text-qgold-400 text-xs uppercase tracking-[0.25em] font-bold">
              <Flower2 className="w-3.5 h-3.5" />
              <span>Atmosphere & Setting · Kralgund</span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl mb-4 font-normal tracking-tight text-white">
              The Dining Sanctuary
            </h2>
            <p className="text-2xl font-serif italic text-qgold-500 mb-8">
              A haven along the Kupwara Highway.
            </p>

            <p className="text-base sm:text-lg font-light leading-relaxed text-emerald-100/90 mb-6">
              Step inside and the highway rush fades into tranquility. Warm Kashmiri cedar wood panels, ambient amber lighting, and plush executive booths create a calm refuge for bureaucrats, travelers, and families.
            </p>

            <p className="text-base sm:text-lg font-light leading-relaxed text-emerald-100/90 mb-10">
              Designed so that every cup of Kehwa, executive luncheon, or family feast feels like a dignified occasion.
            </p>

            {/* Highly Rounded Liquid Glass Button */}
            <LiquidButton
              size="lg"
              variant="gold"
              onClick={onOpenReservation}
              className="rounded-full text-xs uppercase tracking-widest font-bold text-white px-10 py-4 shadow-[0_12px_28px_0_rgba(0,0,0,0.35)]"
            >
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-white" />
                <span>Book Your Table</span>
              </span>
            </LiquidButton>
          </motion.div>

          {/* Visual Showcase (Two Offset Photos with Glass Frames) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="grid grid-cols-2 gap-4 sm:gap-6"
          >
            <div className="relative aspect-3/4 glass-panel-dark p-2 sm:p-3 group shadow-2xl">
              {!img1Error ? (
                <img
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
                  alt="Dining room in Kralgund"
                  referrerPolicy="no-referrer"
                  onError={() => setImg1Error(true)}
                  className="w-full h-full object-cover filter grayscale contrast-110 group-hover:grayscale-0 transition-all duration-700"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-emerald-900 text-center p-4">
                  <Sparkles className="w-8 h-8 text-emerald-300 mb-2" />
                  <span className="font-serif text-sm">Dining Hall</span>
                </div>
              )}
              <div className="absolute bottom-4 left-4 right-4 glass-panel-dark p-2 text-center text-[10px] uppercase tracking-widest text-emerald-200">
                Warm Cedar Booths
              </div>
            </div>

            <div className="relative aspect-3/4 glass-panel-dark p-2 sm:p-3 group shadow-2xl mt-8 sm:mt-12">
              {!img2Error ? (
                <img
                  src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80"
                  alt="Cozy table setting and warm lighting"
                  referrerPolicy="no-referrer"
                  onError={() => setImg2Error(true)}
                  className="w-full h-full object-cover filter grayscale contrast-110 group-hover:grayscale-0 transition-all duration-700"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-emerald-900 text-center p-4">
                  <Sparkles className="w-8 h-8 text-emerald-300 mb-2" />
                  <span className="font-serif text-sm">Amber Ambience</span>
                </div>
              )}
              <div className="absolute bottom-4 left-4 right-4 glass-panel-dark p-2 text-center text-[10px] uppercase tracking-widest text-emerald-200">
                Executive Setting
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
