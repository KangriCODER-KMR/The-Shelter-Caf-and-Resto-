import React from 'react';
import { Phone, MessageCircle, UtensilsCrossed, Calendar, Sparkles } from 'lucide-react';
import { RESTAURANT_INFO, WHATSAPP_CONFIG } from '../data/restaurantData';

interface MobileBottomBarProps {
  onOpenReservation: () => void;
  onOpenMenu: () => void;
  onOpenAiAssistant: () => void;
  onOpenOrder?: () => void;
  onOpenHistory?: () => void;
  cartCount?: number;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({
  onOpenReservation,
  onOpenMenu,
  onOpenAiAssistant,
}) => {
  return (
    <div
      role="navigation"
      aria-label="Mobile Navigation Dock"
      className="sm:hidden fixed bottom-3 left-2 right-2 z-40 max-w-md mx-auto pointer-events-none pb-[env(safe-area-inset-bottom,0px)]"
    >
      {/* iOS Liquid Glass Floating Dock with Unified, Alike, Professional Luxury Jewels */}
      <div className="pointer-events-auto glass-nav-dock rounded-3xl p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.85),inset_0_1.5px_2px_rgba(255,255,255,0.4)] border border-white/25 relative overflow-hidden backdrop-blur-2xl">
        {/* Specular Convex Lens Highlight */}
        <div className="absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-white/30 via-white/5 to-transparent pointer-events-none" />

        <div className="flex items-center justify-between gap-1 relative z-10 px-0.5">
          {/* 1. Menu (Vibrant Sky Blue Jewel) */}
          <button
            onClick={onOpenMenu}
            className="flex-1 min-w-0 flex flex-col items-center justify-center py-1 px-0.5 rounded-2xl transition-all active:scale-90 cursor-pointer group hover:bg-white/5"
            aria-label="Explore Menu"
          >
            <div className="w-9 h-9 xs:w-9.5 xs:h-9.5 rounded-xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center shadow-xs group-hover:bg-sky-500/30 group-hover:scale-105 transition-all">
              <UtensilsCrossed className="w-4.5 h-4.5 text-sky-300 stroke-[2.25]" />
            </div>
            <span className="text-[10px] font-bold tracking-tight mt-1 text-sky-200/95 truncate">
              Menu
            </span>
          </button>

          {/* 2. Reserve Table (Unified Warm Gold Jewel) */}
          <button
            onClick={onOpenReservation}
            className="flex-1 min-w-0 flex flex-col items-center justify-center py-1 px-0.5 rounded-2xl transition-all active:scale-90 cursor-pointer group hover:bg-white/5"
            aria-label="Reserve Table at The Shelter"
          >
            <div className="w-9 h-9 xs:w-9.5 xs:h-9.5 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center shadow-xs group-hover:bg-amber-500/30 group-hover:scale-105 transition-all">
              <Calendar className="w-4.5 h-4.5 text-amber-300 stroke-[2.25]" />
            </div>
            <span className="text-[10px] font-bold tracking-tight mt-1 text-amber-200/95 truncate">
              Reserve
            </span>
          </button>

          {/* 3. AI Assistant / Concierge (Luminous Violet/Gold Jewel with Live Indicator) */}
          <button
            onClick={onOpenAiAssistant}
            className="flex-1 min-w-0 flex flex-col items-center justify-center py-1 px-0.5 rounded-2xl transition-all active:scale-90 cursor-pointer group hover:bg-white/5"
            aria-label="Ask AI Dining Concierge"
          >
            <div className="relative w-9 h-9 xs:w-9.5 xs:h-9.5 rounded-xl bg-purple-500/25 border border-purple-400/50 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.35)] group-hover:bg-purple-500/35 group-hover:scale-105 transition-all">
              <Sparkles className="w-4.5 h-4.5 text-purple-200 stroke-[2.25] animate-pulse" />
              {/* Subtle top-right live breathing spark */}
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-300 border border-stone-900" />
              </span>
            </div>
            <span className="text-[10px] font-bold tracking-tight mt-1 text-purple-200/95 truncate">
              Ask AI
            </span>
          </button>

          {/* 4. WhatsApp Quick Order (Radiant Emerald Jewel) */}
          <a
            href={`https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodeURIComponent(
              'Hello The Shelter Cafe & Resto Kralgund! I would like to place an order from your online menu.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 min-w-0 flex flex-col items-center justify-center py-1 px-0.5 rounded-2xl transition-all active:scale-90 group hover:bg-white/5"
            aria-label="Order on WhatsApp"
          >
            <div className="w-9 h-9 xs:w-9.5 xs:h-9.5 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center shadow-xs group-hover:bg-emerald-500/30 group-hover:scale-105 transition-all">
              <MessageCircle className="w-4.5 h-4.5 text-emerald-300 stroke-[2.25]" />
            </div>
            <span className="text-[10px] font-bold tracking-tight mt-1 text-emerald-200/95 truncate">
              WhatsApp
            </span>
          </a>

          {/* 5. Call Resto Directly (Direct Phone Teal Jewel) */}
          <a
            href={RESTAURANT_INFO.phoneHref}
            className="flex-1 min-w-0 flex flex-col items-center justify-center py-1 px-0.5 rounded-2xl transition-all active:scale-90 group hover:bg-white/5"
            aria-label={`Call ${RESTAURANT_INFO.name}`}
          >
            <div className="w-9 h-9 xs:w-9.5 xs:h-9.5 rounded-xl bg-teal-500/20 border border-teal-400/40 flex items-center justify-center shadow-xs group-hover:bg-teal-500/30 group-hover:scale-105 transition-all">
              <Phone className="w-4.5 h-4.5 text-teal-300 stroke-[2.25]" />
            </div>
            <span className="text-[10px] font-bold tracking-tight mt-1 text-teal-200/95 truncate">
              Call
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};
