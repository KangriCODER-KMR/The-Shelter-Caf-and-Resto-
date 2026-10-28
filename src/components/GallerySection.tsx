import React from 'react';
import { GALLERY_ITEMS } from '../data/restaurantData';
import { PolaroidLineCarousel } from './ui/polaroid-line-carousel';
import { motion } from 'motion/react';
import { Sparkles, Camera } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const slides = GALLERY_ITEMS.map((item) => ({
    image: item.imageUrl,
    title: item.title,
    caption: item.description,
    alt: item.title,
  }));

  return (
    <section id="gallery" className="py-24 sm:py-32 bg-qgreen-950 text-white relative overflow-hidden">
      
      {/* Background glass radial glow */}
      <div
        className="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] bg-emerald-600/15 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-qgold-400 text-xs uppercase tracking-[0.25em] font-bold mb-3">
            <Camera className="w-3.5 h-3.5" />
            <span>Google Maps Photos & Moments · Kralgund</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl mb-4 font-normal tracking-tight text-white">
            The Visual Gallery
          </h2>
          <p className="text-2xl font-serif italic text-qgold-500 mb-8">
            Real dining ambience, charcoal grills & valley hospitality.
          </p>
        </motion.div>

        {/* Polaroid Carousel integration */}
        <div className="relative -mx-4 sm:-mx-6 lg:-mx-8 h-[600px] sm:h-[700px]">
          <PolaroidLineCarousel 
            slides={slides}
            height="100%"
            background="transparent"
            string="rgba(255,255,255,0.4)"
            ink="#ffffff"
            sag={60}
            swing={1.5}
            autoplay={5000}
          />
        </div>

        <div className="text-center mt-12">
          <p className="text-xs text-emerald-300/60 uppercase tracking-[0.3em] font-bold">
            Drag the line or click a photo to explore
          </p>
        </div>

      </div>
    </section>
  );
};
