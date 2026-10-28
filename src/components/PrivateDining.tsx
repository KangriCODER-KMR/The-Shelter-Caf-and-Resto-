import React from 'react';
import { Utensils, Users, CalendarCheck, Sparkles } from 'lucide-react';
import { LiquidButton } from '@/components/ui/liquid-glass-button';
import { motion } from 'motion/react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface PrivateDiningProps {
  onOpenEnquiry: () => void;
}

export const PrivateDining: React.FC<PrivateDiningProps> = ({ onOpenEnquiry }) => {
  return (
    <section id="private-dining" className="py-28 sm:py-36 bg-qgreen-950 text-white text-center relative overflow-hidden">
      
      {/* Background glass lighting */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-emerald-600/15 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Glass Container with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="glass-panel-dark rounded-3xl p-8 sm:p-14 lg:p-16 shadow-2xl border border-white/20"
        >
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-white/10 text-qgold-400 text-xs uppercase tracking-[0.3em] font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Executive Banquets & Celebrations · Kralgund</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl mb-6 font-normal tracking-tight text-white">
            Private Dining & Banquets
          </h2>

          <p className="text-2xl font-serif italic mb-8 text-qgold-500">
            A sanctuary for executive meetings & cherished family milestones.
          </p>

          <p className="text-base sm:text-lg font-light leading-relaxed mb-12 text-emerald-100/90 max-w-2xl mx-auto">
            Official bureaucrat delegations, family gatherings, birthday feasts, or private dinners along the highway. Tell us the occasion and we will prepare a regal Kashmiri feast with customized service.
          </p>

          {/* Frosted Glass Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 glass-pill rounded-full text-xs font-semibold uppercase tracking-wider text-emerald-200">
              <Users className="w-4 h-4 text-qgold-500" />
              <span>Up to 50 Guests</span>
            </div>
            
            <div className="inline-flex items-center gap-2 px-4 py-2 glass-pill rounded-full text-xs font-semibold uppercase tracking-wider text-emerald-200">
              <Utensils className="w-4 h-4 text-qgold-500" />
              <span>Custom Wazwan & Multi-Cuisine Banquets</span>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 glass-pill rounded-full text-xs font-semibold uppercase tracking-wider text-emerald-200">
              <CalendarCheck className="w-4 h-4 text-qgold-500" />
              <span>Dedicated VIP Service & Host</span>
            </div>
          </div>

          <LiquidButton
            size="xl"
            variant="gold"
            onClick={onOpenEnquiry}
            className="rounded-full text-xs uppercase tracking-widest font-bold text-white px-10 py-4 shadow-xl"
          >
            <span>Enquire for Private Dining</span>
          </LiquidButton>
        </motion.div>

      </div>
    </section>
  );
};
