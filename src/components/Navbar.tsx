import React, { useState, useEffect } from 'react';
import { ShoppingBag, Calendar, Phone, UtensilsCrossed, Utensils, BookOpen, History, Sparkles } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { PWAInstallButton } from './PWAInstallButton';
import { MobileNavDrawer } from './MobileNavDrawer';

interface NavbarProps {
  onOpenReservation: () => void;
  onOpenOrder: () => void;
  onOpenMenu: () => void;
  onOpenThreeDMenu: () => void;
  onOpenFullScreenMenu: () => void;
  onOpenHistory: () => void;
  onOpenAiAssistant?: () => void;
  cartCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenReservation,
  onOpenOrder,
  onOpenMenu,
  onOpenThreeDMenu,
  onOpenFullScreenMenu,
  onOpenHistory,
  onOpenAiAssistant,
  cartCount,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Our Story', href: '#story' },
    { label: 'The Cuisine', href: '#cuisine' },
    { label: 'Signatures', href: '#signatures' },
    { label: 'The Room', href: '#room' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Private Dining', href: '#private-dining' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 pt-[calc(0.5rem+env(safe-area-inset-top,0px))] px-2 sm:px-4 lg:px-8 pointer-events-none transition-all duration-300">
        <div
          className={`pointer-events-auto max-w-7xl mx-auto rounded-2xl sm:rounded-full px-2.5 sm:px-6 py-1.5 sm:py-2.5 transition-all duration-300 relative overflow-hidden ${
            isScrolled ? 'glass-nav-dock-scrolled' : 'glass-nav-dock'
          }`}
        >
          {/* iOS 27 Specular Convex Glass Lens Highlight */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/25 via-white/5 to-transparent rounded-inherit pointer-events-none" />

          <div className="flex items-center justify-between gap-1.5 sm:gap-4 relative z-10">
            
            {/* Zone 1: Brand Wordmark with Official Round Seal in Frosted Ring (Shrink-Safe) */}
            <a
              href="#"
              className="flex items-center gap-1.5 sm:gap-3 group whitespace-nowrap shrink min-w-0 transition-transform duration-300 hover:scale-[1.02]"
              aria-label={RESTAURANT_INFO.name}
            >
              {RESTAURANT_INFO.logoUrl && (
                <div className="relative rounded-full p-0.5 bg-white/10 backdrop-blur-md border border-white/30 shadow-sm group-hover:border-white/60 transition-all shrink-0">
                  <img
                    src={RESTAURANT_INFO.logoUrl}
                    alt={RESTAURANT_INFO.name}
                    onError={(e) => {
                      (e.currentTarget as HTMLElement).style.display = 'none';
                    }}
                    className="h-7.5 w-7.5 xs:h-8.5 xs:w-8.5 sm:h-11 sm:w-11 rounded-full object-cover"
                  />
                </div>
              )}
              <div className="flex flex-col min-w-0">
                <span className="font-serif text-xs xs:text-sm sm:text-2xl font-bold tracking-tight text-white group-hover:text-white/90 transition-colors drop-shadow-sm truncate">
                  <span className="inline sm:hidden">The Shelter</span>
                  <span className="hidden sm:inline">{RESTAURANT_INFO.name}</span>
                </span>
                <span className="hidden xs:block text-[9px] sm:text-xs uppercase tracking-wider text-white/70 font-semibold truncate">
                  Kralgund Qaziabad
                </span>
              </div>
            </a>

            {/* Zone 2: Desktop Navigation Links (Large Screens) with Frosted Capsules */}
            <nav className="hidden xl:flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-3 py-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 hover:backdrop-blur-md transition-all whitespace-nowrap shrink-0"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={onOpenThreeDMenu}
                className="glass-btn-secondary px-3.5 py-1.5 rounded-full text-white hover:bg-white/20 transition-all whitespace-nowrap shrink-0 font-bold uppercase tracking-wider cursor-pointer flex items-center gap-1.5 active:scale-95"
              >
                <BookOpen className="w-3.5 h-3.5 text-white/80" />
                <span>3D Menu</span>
              </button>
              <button
                onClick={onOpenMenu}
                className="glass-btn-secondary px-3.5 py-1.5 rounded-full text-white hover:bg-white/20 transition-all whitespace-nowrap shrink-0 font-bold uppercase tracking-wider cursor-pointer flex items-center gap-1.5 active:scale-95"
              >
                <Utensils className="w-3.5 h-3.5 text-white/80" />
                <span>Order Online</span>
              </button>
              <button
                onClick={onOpenHistory}
                className="glass-btn-secondary px-3.5 py-1.5 rounded-full text-white hover:bg-amber-500/20 hover:border-amber-400/40 transition-all whitespace-nowrap shrink-0 font-bold uppercase tracking-wider cursor-pointer flex items-center gap-1.5 active:scale-95"
              >
                <History className="w-3.5 h-3.5 text-amber-300" />
                <span>Past Orders</span>
              </button>
              {onOpenAiAssistant && (
                <button
                  onClick={onOpenAiAssistant}
                  className="glass-btn-secondary px-3.5 py-1.5 rounded-full text-white hover:bg-purple-500/20 hover:border-purple-400/40 transition-all whitespace-nowrap shrink-0 font-bold uppercase tracking-wider cursor-pointer flex items-center gap-1.5 active:scale-95"
                >
                  <Sparkles className="w-3.5 h-3.5 text-purple-300 animate-pulse" />
                  <span>Ask AI</span>
                </button>
              )}
            </nav>

            {/* Zone 3: Mobile-First Primary Actions (Clean, Zero Overflow, Zero Overlap) */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
              
              {/* Optional PWA Install Action on desktop */}
              <div className="hidden md:block">
                <PWAInstallButton variant="navbar" />
              </div>

              {/* Enhanced Bag Button with Live Item Counter Badge (Accessible on mobile & desktop) */}
              <button
                onClick={onOpenOrder}
                className={`glass-btn-secondary relative inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs uppercase tracking-wider font-bold rounded-full transition-all duration-300 whitespace-nowrap shrink-0 cursor-pointer group active:scale-95 hover:border-emerald-400/50 hover:bg-emerald-500/15 ${
                  cartCount > 0 ? 'ring-1.5 ring-emerald-400/80 !border-emerald-400/60 bg-emerald-950/40' : ''
                }`}
                aria-label={`Open Bag with ${cartCount} items`}
              >
                <div className="relative flex items-center justify-center">
                  <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white group-hover:scale-105 transition-transform" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1.5 -right-2.5 bg-gradient-to-r from-rose-500 to-amber-500 text-white text-[9px] font-black rounded-full h-3.5 min-w-[14px] px-1 flex items-center justify-center shadow-md border border-white/40">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="font-bold tracking-wide text-white text-[11px]">Bag</span>
                {cartCount > 0 && (
                  <span className="hidden sm:inline-block px-1.5 py-0.2 text-[10px] bg-emerald-400 text-stone-950 font-black rounded-full shadow-xs">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Menu Button (Three-Bars + Menu Label Pill - Houses History, Navigation & Settings) */}
              <button
                onClick={() => setIsMobileNavOpen(true)}
                className="glass-btn-secondary inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-white active:scale-95 cursor-pointer shrink-0 transition-all hover:bg-white/20"
                aria-label="Open Navigation Menu"
                title="Open Navigation Menu"
              >
                <div className="flex flex-col justify-center gap-[2.5px] w-3.5">
                  <span className="w-3.5 h-[1.5px] bg-white rounded-full" />
                  <span className="w-3.5 h-[1.5px] bg-white rounded-full" />
                  <span className="w-2.5 h-[1.5px] bg-white rounded-full self-end" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider">Menu</span>
              </button>

              {/* Reserve Table Button (Hidden in phone view because phone has dedicated center bottom dock button) */}
              <button
                onClick={onOpenReservation}
                className="glass-btn-primary relative hidden sm:inline-flex items-center gap-1.5 px-4 sm:px-5 py-1.5 text-xs uppercase tracking-wider font-extrabold rounded-full transition-all duration-300 whitespace-nowrap shrink-0 cursor-pointer active:scale-95 text-stone-950"
                aria-label="Reserve Table"
              >
                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-950 stroke-[2.5]" />
                <span className="font-black text-xs">Reserve Table</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Dedicated Mobile & Tablet Navigation Drawer (Three-Bar Menu) */}
      <MobileNavDrawer
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        onOpenReservation={onOpenReservation}
        onOpenOrder={onOpenOrder}
        onOpenMenu={onOpenMenu}
        onOpenThreeDMenu={onOpenThreeDMenu}
        onOpenHistory={onOpenHistory}
        onOpenAiAssistant={onOpenAiAssistant}
        cartCount={cartCount}
      />
    </>
  );
};
