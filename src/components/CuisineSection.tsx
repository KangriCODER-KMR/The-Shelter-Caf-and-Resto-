import React, { useState } from 'react';
import { ArrowRight, Utensils } from 'lucide-react';
import { CUISINE_CATEGORIES } from '../data/restaurantData';
import { LiquidButton } from '@/components/ui/liquid-glass-button';
import { motion } from 'motion/react';

interface CuisineSectionProps {
  onSelectCategory: (categoryKey: string) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as any
    }
  }
};

export const CuisineSection: React.FC<CuisineSectionProps> = ({ onSelectCategory }) => {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section id="cuisine" className="py-24 sm:py-32 bg-[#fcfdfc] text-emerald-950 relative overflow-hidden">
      
      {/* Background glass gradient glow */}
      <div
        className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 sm:mb-20"
        >
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-qgold-600 block mb-3">
            Culinary Chapters
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl mb-4 font-normal tracking-tight">
            The Cuisine
          </h2>
          <p className="text-2xl font-serif italic text-emerald-800/80 mb-6">
            Explore the menu, course by course.
          </p>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-emerald-950/75 leading-relaxed font-normal">
            From royal Kashmiri Wazwan and copper samovar Kehwa to stone-baked pizzas, sizzlers, charcoal mutton tujje, and comfort citizen thalis — every chapter tells its own story.
          </p>
        </motion.div>

        {/* 6-Card Glassmorphic Grid with glass-panel-light */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {CUISINE_CATEGORIES.map((cat) => (
            <motion.div
              key={cat.id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              onClick={() => onSelectCategory(cat.categoryKey)}
              className="glass-panel-light rounded-3xl p-6 sm:p-7 glass-card-hover group cursor-pointer flex flex-col justify-between border border-white/80 shadow-[0_16px_36px_-10px_rgba(13,66,35,0.1)] transition-all duration-300"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectCategory(cat.categoryKey);
                }
              }}
            >
              <div>
                {/* Visual Glass Frame */}
                <div className="aspect-4/3 mb-5 overflow-hidden rounded-2xl bg-emerald-900/10 border border-white/70 relative shadow-inner">
                  {!imageErrors[cat.id] ? (
                    <img
                      src={cat.imageUrl}
                      alt={cat.title}
                      referrerPolicy="no-referrer"
                      onError={() => handleImageError(cat.id)}
                      className="object-cover w-full h-full filter grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-108 transition-all duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-emerald-950 text-white p-4 text-center">
                      <Utensils className="w-8 h-8 text-emerald-400 mb-2" />
                      <span className="font-serif text-lg">{cat.title}</span>
                    </div>
                  )}
                  {/* Subtle emerald glass scrim */}
                  <div className="absolute inset-0 bg-emerald-900/15 group-hover:bg-transparent transition-colors pointer-events-none" />
                </div>

                {/* Card Title & Tagline */}
                <div className="mb-2">
                  <h3 className="font-serif text-2xl sm:text-3xl text-emerald-950 group-hover:text-emerald-800 transition-colors">
                    {cat.title}
                  </h3>
                </div>

                <p className="text-emerald-900/85 text-sm leading-relaxed mb-3 font-medium">
                  {cat.tagline}
                </p>
                <p className="text-xs text-emerald-800/70 leading-relaxed font-light">
                  {cat.description}
                </p>
              </div>

              {/* Action: Highly Rounded Liquid Glass Button */}
              <div className="mt-6 pt-4 border-t border-emerald-900/10 flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-wider font-bold text-emerald-800/80">
                  Course Chapter
                </span>
                <LiquidButton
                  size="sm"
                  variant="gold"
                  className="rounded-full text-xs font-semibold px-4 py-1.5 shadow-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectCategory(cat.categoryKey);
                  }}
                >
                  <span className="flex items-center gap-1.5">
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </LiquidButton>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

