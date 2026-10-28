import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowUpRight, Instagram, Facebook } from 'lucide-react';
import { RESTAURANT_INFO, WHATSAPP_CONFIG } from '../data/restaurantData';
import { PWAInstallButton } from './PWAInstallButton';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';

interface FullScreenNavMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenReservation: () => void;
  onOpenOrder: () => void;
  onOpenMenu: () => void;
  onOpenThreeDMenu: () => void;
}

export const FullScreenNavMenu: React.FC<FullScreenNavMenuProps> = ({
  isOpen,
  onClose,
  onOpenReservation,
  onOpenOrder,
  onOpenMenu,
  onOpenThreeDMenu,
}) => {
  // Lock body scroll when overlay is active
  useBodyScrollLock(isOpen);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const menuItems = [
    {
      number: '00',
      label: 'Home',
      action: () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        onClose();
      },
    },
    {
      number: '01',
      label: 'Our Story',
      action: () => {
        const el = document.getElementById('story');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      number: '02',
      label: 'The Menu',
      action: () => {
        onClose();
        setTimeout(() => {
          onOpenThreeDMenu();
        }, 300);
      },
    },
    {
      number: '03',
      label: 'Gallery',
      action: () => {
        const el = document.getElementById('gallery');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      number: '04',
      label: 'Private Dining',
      action: () => {
        const el = document.getElementById('private-dining');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      number: '05',
      label: 'Journal',
      action: () => {
        const el = document.getElementById('reviews');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      number: '06',
      label: 'Visit & Contact',
      action: () => {
        const el = document.getElementById('contact');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[115] overflow-y-auto overscroll-contain touch-pan-y bg-[#030913] text-white flex flex-col justify-between selection:bg-qgold-500 selection:text-black"
        >
          {/* Subtle Ambient Radial Lighting for Atmospheric Glow */}
          <div
            className="absolute top-0 right-1/4 w-[650px] h-[650px] bg-gradient-to-br from-[#c5a059]/12 via-[#072614]/30 to-transparent rounded-full blur-[140px] pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#0a1e38]/35 via-transparent to-transparent rounded-full blur-[120px] pointer-events-none"
            aria-hidden="true"
          />
          {/* Delicate Paper Texture scrim */}
          <div
            className="absolute inset-0 opacity-[0.035] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"
            aria-hidden="true"
          />

          {/* Top Bar with Minimalist CLOSE Trigger */}
          <div className="relative z-20 max-w-7xl w-full mx-auto px-6 sm:px-10 lg:px-16 pt-8 pb-4 flex items-center justify-between">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#c5a059]/70 font-semibold select-none">
              A Sanctuary of Taste & Comfort · Kralgund
            </span>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="group flex items-center gap-2 text-xs sm:text-sm uppercase tracking-[0.25em] font-semibold text-white/80 hover:text-[#e4be74] transition-colors duration-200 cursor-pointer py-2 px-3 rounded-full hover:bg-white/5"
              aria-label="Close menu"
            >
              <X className="w-4 h-4 text-[#c5a059] group-hover:rotate-90 transition-transform duration-300" />
              <span>CLOSE</span>
            </motion.button>
          </div>

          {/* Main 2-Column Content Grid */}
          <div className="relative z-10 max-w-7xl w-full mx-auto px-6 sm:px-10 lg:px-16 py-6 sm:py-10 flex-1 flex flex-col justify-center">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Left Column: Numbered Serif Links & Action Buttons */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                <nav className="flex flex-col space-y-2 sm:space-y-3 lg:space-y-4">
                  {menuItems.map((item, index) => (
                    <motion.div
                      key={item.number}
                      initial={{ opacity: 0, x: -35 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.08 + index * 0.06,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <button
                        onClick={item.action}
                        className="group flex items-start text-left cursor-pointer transition-all duration-300 hover:translate-x-3 w-fit"
                      >
                        {/* Number in gold superscript/mono */}
                        <span className="text-[11px] sm:text-xs font-mono font-normal tracking-widest text-[#c5a059]/70 mr-3 sm:mr-4 pt-1 sm:pt-2 select-none group-hover:text-[#ffd786] transition-colors">
                          {item.number}
                        </span>

                        {/* Title in Giant Serif */}
                        <span className="font-serif text-2xl xs:text-3xl sm:text-5xl lg:text-6xl text-white/95 font-normal tracking-tight leading-none group-hover:text-[#e6c178] transition-colors">
                          {item.label}
                        </span>
                      </button>
                    </motion.div>
                  ))}
                </nav>

                {/* Bottom Left Buttons: RESERVE & ORDER */}
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ duration: 0.5, delay: 0.55 }}
                  className="flex flex-wrap items-center gap-3 pt-6 sm:pt-10 mt-2"
                >
                  {/* Reserve button with luminous gold gradient */}
                  <button
                    onClick={() => {
                      onClose();
                      onOpenReservation();
                    }}
                    className="group relative inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#071d11] bg-gradient-to-r from-[#e7c77c] via-[#c5a059] to-[#b3883a] shadow-[0_0_30px_rgba(197,160,89,0.38)] hover:shadow-[0_0_40px_rgba(197,160,89,0.55)] hover:brightness-110 active:scale-95 transition-all duration-300 cursor-pointer overflow-hidden"
                  >
                    <span className="relative z-10">RESERVE</span>
                    <ArrowUpRight className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    {/* Gloss sheen animation */}
                    <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>

                  {/* Order button with subtle dark glass outline */}
                  <button
                    onClick={() => {
                      onClose();
                      onOpenOrder();
                    }}
                    className="group inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-white/90 border border-white/20 bg-white/[0.04] hover:bg-white/10 hover:text-white hover:border-[#c5a059]/60 active:scale-95 transition-all duration-300 cursor-pointer backdrop-blur-md"
                  >
                    <span>ORDER</span>
                    <ArrowUpRight className="w-4 h-4 text-white/70 group-hover:text-[#c5a059] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>

                  {/* Direct PWA Install Prompt */}
                  <div className="w-full sm:w-auto pt-1 sm:pt-0">
                    <PWAInstallButton variant="prominent" />
                  </div>
                </motion.div>
              </div>

              {/* Right Column: Golden Flourish Emblem, Address, Contact, Socials */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-5 lg:pl-10 lg:border-l lg:border-white/10 flex flex-col justify-between space-y-8 sm:space-y-10"
              >
                {/* Golden The Shelter Emblem + Brand Title */}
                <div className="space-y-4">
                  {/* Sunburst Floral/Spice Emblem SVG */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 relative text-[#c5a059] drop-shadow-[0_0_15px_rgba(197,160,89,0.3)]">
                    <svg
                      viewBox="0 0 100 100"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-full h-full"
                    >
                      <g fill="currentColor">
                        {/* Central radiant floral spice petals */}
                        {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map(
                          (angle, idx) => (
                            <g key={idx} transform={`rotate(${angle} 50 50)`}>
                              {/* Slender spoon/petal drop */}
                              <path
                                d="M 50 14 C 47.5 22, 48.5 32, 50 36 C 51.5 32, 52.5 22, 50 14 Z"
                                opacity="0.9"
                              />
                              {/* Outer droplet bud */}
                              <circle cx="50" cy="8" r="2.2" opacity="0.95" />
                              {/* Inner delicate diamond */}
                              <circle cx="50" cy="24" r="1.2" opacity="0.8" />
                            </g>
                          )
                        )}
                        {/* Central emblem ring */}
                        <circle cx="50" cy="50" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.85" />
                        <circle cx="50" cy="50" r="5" fill="currentColor" opacity="0.9" />
                      </g>
                    </svg>
                  </div>

                  {/* Brand Typography */}
                  <div>
                    <h2 className="font-serif text-2xl sm:text-3xl tracking-[0.2em] font-normal text-[#e8c87f] drop-shadow-sm uppercase">
                      THE SHELTER
                    </h2>
                    <p className="font-serif italic text-sm sm:text-base text-[#c5a059]/90 tracking-wide mt-0.5">
                      Cafe & Resto · Kralgund
                    </p>
                  </div>
                </div>

                {/* Section: FIND US */}
                <div className="space-y-1.5">
                  <h4 className="text-[11px] uppercase tracking-[0.3em] font-bold text-[#c5a059]">
                    FIND US
                  </h4>
                  <p className="text-sm font-light text-white/85 leading-relaxed">
                    Main Road Kralgund, Handwara<br />
                    Kupwara District, J&K 193302
                  </p>
                  <a
                    href={RESTAURANT_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wider text-[#c5a059] hover:text-white transition-colors pt-1 font-semibold"
                  >
                    <span>View on Google Maps</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Section: RESERVATIONS */}
                <div className="space-y-1.5">
                  <h4 className="text-[11px] uppercase tracking-[0.3em] font-bold text-[#c5a059]">
                    RESERVATIONS
                  </h4>
                  <div className="space-y-0.5 text-sm font-light">
                    <div>
                      <a
                        href={RESTAURANT_INFO.phoneHref}
                        className="text-white/90 hover:text-[#c5a059] transition-colors"
                      >
                        {RESTAURANT_INFO.phone}
                      </a>
                    </div>
                    <div>
                      <a
                        href={`mailto:${RESTAURANT_INFO.email}`}
                        className="text-white/80 hover:text-[#c5a059] transition-colors"
                      >
                        {RESTAURANT_INFO.email}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Section: FOLLOW THE TALE */}
                <div className="space-y-2.5 pt-1">
                  <h4 className="text-[11px] uppercase tracking-[0.3em] font-bold text-[#c5a059]">
                    FOLLOW THE TALE
                  </h4>
                  <div className="flex items-center gap-3">
                    {/* Instagram */}
                    <a
                      href={RESTAURANT_INFO.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full border border-white/20 hover:border-[#c5a059] hover:bg-[#c5a059]/15 text-white/80 hover:text-white flex items-center justify-center transition-all duration-300"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-4 h-4" />
                    </a>

                    {/* Facebook */}
                    <a
                      href={RESTAURANT_INFO.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full border border-white/20 hover:border-[#c5a059] hover:bg-[#c5a059]/15 text-white/80 hover:text-white flex items-center justify-center transition-all duration-300"
                      aria-label="Facebook"
                    >
                      <Facebook className="w-4 h-4" />
                    </a>

                    {/* TikTok SVG Icon */}
                    <a
                      href="https://www.tiktok.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full border border-white/20 hover:border-[#c5a059] hover:bg-[#c5a059]/15 text-white/80 hover:text-white flex items-center justify-center transition-all duration-300"
                      aria-label="TikTok"
                    >
                      <svg
                        className="w-4 h-4 fill-currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-2.887 2.887 2.896 2.896 0 0 1-2.887-2.887 2.896 2.896 0 0 1 2.887-2.887c.306 0 .602.049.88.138V9.378a6.34 6.34 0 0 0-.88-.063 6.332 6.332 0 0 0-6.332 6.332 6.332 6.332 0 0 0 6.332 6.332 6.332 6.332 0 0 0 6.332-6.332V8.922a8.204 8.204 0 0 0 4.887 1.579V7.056a4.834 4.834 0 0 1-1.116-.37z" />
                      </svg>
                    </a>
                  </div>
                </div>

              </motion.div>

            </div>
          </div>

          {/* Bottom subtle copyright / location footer */}
          <div className="relative z-10 max-w-7xl w-full mx-auto px-6 sm:px-10 lg:px-16 py-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/40 tracking-wider">
            <span>© {new Date().getFullYear()} THE SHELTER CAFE & RESTO · KRALGUND, HANDWARA</span>
            <span className="font-serif italic text-white/50 mt-1 sm:mt-0">Crafted for bureaucrats & everyday citizens</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
