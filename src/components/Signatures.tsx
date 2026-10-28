import React, { useState } from 'react';
import { Plus, Download, FileText, Wine, Check, ArrowRight, BookOpen } from 'lucide-react';
import { SIGNATURE_DISHES, RESTAURANT_INFO } from '../data/restaurantData';
import { MenuItem } from '../types';
import { LiquidButton } from '@/components/ui/liquid-glass-button';
import { motion } from 'motion/react';

interface SignaturesProps {
  onOpenMenu: () => void;
  onAddToCart: (dish: MenuItem) => void;
  onOpenThreeDMenu: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as any
    }
  }
};

export const Signatures: React.FC<SignaturesProps> = ({
  onOpenMenu,
  onAddToCart,
  onOpenThreeDMenu,
}) => {
  const [addedId, setAddedId] = useState<string | null>(null);

  const badgeLabels: Record<string, string> = {
    'sig-1': 'House Favourite',
    'sig-2': 'The Highway Legend',
    'sig-3': 'Hyderabad Heritage',
    'sig-4': "Chef's Signature",
    'sig-5': 'Artisanal Vegetarian',
    'sig-6': 'To Share',
  };

  const winePairings: Record<string, string> = {
    'sig-1': 'Pair with chilled Viognier or Kingfisher Draught',
    'sig-2': 'Pair with full-bodied Malbec or Rioja Reserva',
    'sig-3': 'Pair with Pinot Noir or Spiced Mango Lassi',
    'sig-4': 'Pair with Sauvignon Blanc or Cardamom Gin Fizz',
    'sig-5': 'Pair with aromatic Gewürztraminer or Indian Chai',
    'sig-6': 'Pair with Syrah or Saffron Old Fashioned',
  };

  const handleAdd = (dish: MenuItem) => {
    onAddToCart(dish);
    setAddedId(dish.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <section id="signatures" className="py-24 sm:py-32 bg-emerald-950 text-white relative overflow-hidden">
      
      {/* Background ambient radial lights */}
      <div
        className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-emerald-600/15 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 sm:mb-20"
        >
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-300 block mb-3">
            Culinary Highlights
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl mb-4 font-normal tracking-tight">
            The Signatures
          </h2>
          <p className="text-2xl font-serif italic text-emerald-200/80 mb-4">
            Dishes with a story to tell.
          </p>
          <p className="max-w-xl mx-auto text-base sm:text-lg text-emerald-100/80 font-light">
            A few of the culinary masterpieces our guests return for time and time again.
          </p>
        </motion.div>

        {/* 2-Column Grid of 6 Signatures with glass-panel-light containers */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          {SIGNATURE_DISHES.map((dish) => (
            <motion.div
              key={dish.id}
              variants={cardVariants}
              whileHover={{ scale: 1.01 }}
              className="glass-panel-light rounded-3xl p-6 sm:p-8 flex flex-col justify-between glass-card-hover group border border-white/80 shadow-[0_20px_45px_-12px_rgba(0,0,0,0.35)] transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-3">
                  <span className="text-[11px] uppercase tracking-[0.22em] font-bold text-white bg-qgold-600 px-3 py-1 rounded-full border border-qgold-500/20">
                    {badgeLabels[dish.id] || 'Signature'}
                  </span>
                  <span className="font-serif text-2xl font-bold text-emerald-950 tabular-nums">
                    {RESTAURANT_INFO.currency || '₹'}{dish.price.toFixed(2)}
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl text-emerald-950 mb-2 group-hover:text-emerald-800 transition-colors">
                  {dish.name}
                </h3>

                <p className="text-emerald-950/85 text-sm sm:text-base leading-relaxed font-light mb-4">
                  {dish.description}
                </p>

                {dish.regionalOrigin && (
                  <p className="text-xs text-emerald-800/90 italic mb-2">
                    Story: {dish.regionalOrigin}
                  </p>
                )}

                {/* Wine & Drink Pairing Hint */}
                <div className="flex items-center gap-2 text-xs text-emerald-900/80 pt-2 border-t border-emerald-900/15 mb-4">
                  <Wine className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
                  <span className="italic">{winePairings[dish.id]}</span>
                </div>
              </div>

              {/* Action row with highly rounded Liquid Glass Button */}
              <div className="flex items-center justify-between pt-3 border-t border-emerald-900/10">
                <span className="text-xs text-emerald-800 font-medium">
                  {dish.isGlutenFree && 'Gluten-Free · '}
                  {dish.isVegetarian ? 'Vegetarian' : 'Clay Oven Roasted'}
                </span>
                
                <LiquidButton
                  size="sm"
                  variant="gold"
                  className="rounded-full text-xs font-bold px-5 py-2 shadow-sm"
                  onClick={() => handleAdd(dish)}
                >
                  <span className="flex items-center gap-1.5">
                    {addedId === dish.id ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </>
                    )}
                  </span>
                </LiquidButton>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA Row: Highly Rounded Liquid Glass Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-center"
        >
          <LiquidButton
            size="lg"
            variant="gold"
            className="w-full sm:w-auto rounded-full text-xs uppercase tracking-widest font-bold px-8 py-4 shadow-xl"
            onClick={onOpenMenu}
          >
            <span className="flex items-center gap-2">
              <span>Full Menu</span>
              <ArrowRight className="w-4 h-4" />
            </span>
          </LiquidButton>

          <LiquidButton
            size="lg"
            className="w-full sm:w-auto rounded-full text-xs uppercase tracking-widest font-bold text-white hover:text-emerald-200 px-8 py-4 shadow-xl border border-white/40 glass-panel-dark"
            onClick={onOpenThreeDMenu}
          >
            <span className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-qgold-500" />
              <span>Immersive 3D Menu</span>
            </span>
          </LiquidButton>
        </motion.div>

      </div>
    </section>
  );
};

