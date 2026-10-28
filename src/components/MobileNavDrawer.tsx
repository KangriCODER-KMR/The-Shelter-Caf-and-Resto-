import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Home, 
  BookOpen, 
  UtensilsCrossed, 
  Sparkles, 
  Calendar, 
  ShoppingBag, 
  Phone, 
  MapPin, 
  MessageCircle, 
  Award, 
  Camera, 
  Users, 
  ChevronRight,
  Download,
  History,
  ReceiptText
} from 'lucide-react';
import { RESTAURANT_INFO, WHATSAPP_CONFIG } from '../data/restaurantData';
import { PWAInstallButton } from './PWAInstallButton';
import { getOrderHistory } from '../utils/orderStorage';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenReservation: () => void;
  onOpenOrder: () => void;
  onOpenMenu: () => void;
  onOpenThreeDMenu: () => void;
  onOpenHistory?: () => void;
  onOpenAiAssistant?: () => void;
  cartCount: number;
}

export const MobileNavDrawer: React.FC<MobileNavDrawerProps> = ({
  isOpen,
  onClose,
  onOpenReservation,
  onOpenOrder,
  onOpenMenu,
  onOpenThreeDMenu,
  onOpenHistory,
  onOpenAiAssistant,
  cartCount,
}) => {
  const [pastOrderCount, setPastOrderCount] = useState<number>(0);

  // Lock background scroll when drawer is open
  useBodyScrollLock(isOpen);

  useEffect(() => {
    const updateCount = () => {
      setPastOrderCount(getOrderHistory().length);
    };
    updateCount();
    window.addEventListener('shelter_order_history_updated', updateCount);
    return () => window.removeEventListener('shelter_order_history_updated', updateCount);
  }, [isOpen]);

  const handleScrollTo = (targetId: string) => {
    onClose();
    if (targetId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setTimeout(() => {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  const navItems = [
    { label: 'Home', icon: Home, action: () => handleScrollTo('home'), badge: 'Top' },
    { label: 'Our Story', icon: BookOpen, action: () => handleScrollTo('story') },
    { label: 'The Cuisine Courses', icon: UtensilsCrossed, action: () => handleScrollTo('cuisine') },
    { label: 'Signature Dishes', icon: Sparkles, action: () => handleScrollTo('signatures'), badge: 'Popular' },
    { label: 'Explore Full Menu', icon: UtensilsCrossed, action: () => handleScrollTo('menu') },
    { 
      label: '3D Hardcover Menu', 
      icon: BookOpen, 
      action: () => {
        onClose();
        setTimeout(onOpenThreeDMenu, 200);
      },
      badge: 'Interactive'
    },
    { label: 'The Room & Ambience', icon: Sparkles, action: () => handleScrollTo('room') },
    { label: 'Guest Reviews & Ratings', icon: Award, action: () => handleScrollTo('reviews'), badge: '4.9★' },
    { label: 'Private Dining & Cabins', icon: Users, action: () => handleScrollTo('private-dining') },
    { label: 'Visual Photo Gallery', icon: Camera, action: () => handleScrollTo('gallery') },
    { label: 'Location & Contact', icon: MapPin, action: () => handleScrollTo('contact') },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          className="fixed inset-0 z-[100] flex justify-end"
        >
          {/* Backdrop Scrim */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm touch-none"
          />

          {/* Drawer Slide-Over Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="relative w-full max-w-xs sm:max-w-sm bg-[#0c0c0c]/95 backdrop-blur-2xl text-white h-full flex flex-col shadow-2xl border-l border-white/15 z-10 overflow-hidden"
          >
            {/* Drawer Header (Fixed at top) */}
            <div className="p-4 sm:p-5 border-b border-white/10 bg-black/60 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <img
                  src={RESTAURANT_INFO.logoUrl}
                  alt={RESTAURANT_INFO.name}
                  className="w-11 h-11 rounded-full object-cover shadow-sm ring-1 ring-white/30"
                />
                <div>
                  <h3 className="font-serif text-base font-bold text-white leading-tight">
                    {RESTAURANT_INFO.name}
                  </h3>
                  <p className="text-[11px] text-white/60 font-sans">
                    Kralgund Qaziabad · Handwara
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close navigation"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Single Scrollable Container for All Drawer Content */}
            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain touch-pan-y p-3 space-y-3.5 custom-scrollbar pb-[calc(2.5rem+env(safe-area-inset-bottom,0px))]">
              {/* Featured Order History Section */}
              <div className="bg-gradient-to-r from-amber-500/15 via-amber-400/5 to-transparent border border-amber-400/25 rounded-2xl p-1">
                <button
                  onClick={() => {
                    onClose();
                    if (onOpenHistory) setTimeout(onOpenHistory, 200);
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-amber-950/60 to-black/60 hover:from-amber-900/60 hover:to-black/80 border border-amber-400/40 text-left transition-all active:scale-[0.98] group cursor-pointer shadow-[0_4px_16px_rgba(245,158,11,0.15)]"
                  aria-label="View Order History & Re-Order"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 text-stone-950 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform shrink-0">
                      <History className="w-5 h-5 stroke-[2.5]" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-xs font-black tracking-wide text-amber-200 group-hover:text-amber-100 uppercase">
                          Order History
                        </span>
                        {pastOrderCount > 0 ? (
                          <span className="px-1.5 py-0.2 rounded-full bg-amber-400 text-stone-950 text-[10px] font-black">
                            {pastOrderCount} {pastOrderCount === 1 ? 'order' : 'orders'}
                          </span>
                        ) : (
                          <span className="px-1.5 py-0.2 rounded-full bg-white/10 text-amber-300 text-[9px] font-bold">
                            Saved on phone
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-white/70 truncate">
                        {pastOrderCount > 0 ? '1-Tap Re-Order & view past receipts' : 'View past order receipts & re-order'}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-amber-300 group-hover:text-amber-100 group-hover:translate-x-0.5 transition-transform shrink-0 ml-2" />
                </button>
              </div>

              {/* AI Dining Concierge Card */}
              <div className="bg-gradient-to-r from-purple-500/15 via-purple-400/5 to-transparent border border-purple-400/25 rounded-2xl p-1">
                <button
                  onClick={() => {
                    onClose();
                    if (onOpenAiAssistant) setTimeout(onOpenAiAssistant, 200);
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-purple-950/60 to-black/60 hover:from-purple-900/60 hover:to-black/80 border border-purple-400/40 text-left transition-all active:scale-[0.98] group cursor-pointer shadow-[0_4px_16px_rgba(168,85,247,0.15)]"
                  aria-label="Ask AI Dining Concierge"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-500 to-amber-300 text-stone-950 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform shrink-0">
                      <Sparkles className="w-5 h-5 stroke-[2.5] text-stone-950 animate-pulse" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-xs font-black tracking-wide text-purple-200 group-hover:text-purple-100 uppercase">
                          AI Dining Concierge
                        </span>
                        <span className="px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[9px] font-bold">
                          Online
                        </span>
                      </div>
                      <p className="text-[11px] text-white/70 truncate">
                        Instant answers on food, GPS coordinates &amp; orders
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-purple-300 group-hover:text-purple-100 group-hover:translate-x-0.5 transition-transform shrink-0 ml-2" />
                </button>
              </div>

              {/* Quick Actions Row */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    onClose();
                    onOpenReservation();
                  }}
                  className="glass-btn-primary flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-black text-xs font-extrabold uppercase tracking-wider shadow-sm active:scale-95 transition-all cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5 text-black" />
                  <span>Reserve Table</span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onOpenOrder();
                  }}
                  className="glass-btn-secondary flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-white text-xs font-bold uppercase tracking-wider active:scale-95 transition-all cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-white" />
                  <span>Bag ({cartCount})</span>
                </button>
              </div>

              {/* Navigation Links List */}
              <nav className="space-y-1">
                <p className="px-2 py-1 text-[10px] uppercase tracking-[0.25em] font-bold text-white/40">
                  Website Navigation
                </p>

                {navItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <button
                      key={item.label}
                      onClick={item.action}
                      className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/10 active:bg-white/15 transition-all text-left text-xs font-medium text-white/80 group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 rounded-lg bg-white/10 text-white group-hover:bg-white group-hover:text-black transition-colors">
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-semibold tracking-wide text-white/90 group-hover:text-white transition-colors">
                          {item.label}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {item.badge && (
                          <span className="px-2 py-0.5 rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-bold">
                            {item.badge}
                          </span>
                        )}
                        <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-white transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </button>
                  );
                })}
              </nav>

              {/* Serviceable Delivery Areas & Fee Matrix */}
              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-xs">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-300" />
                    Delivery Areas &amp; Charges
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono font-bold">Live</span>
                </div>
                <div className="space-y-1.5 text-[11px]">
                  <div className="flex justify-between items-center text-white/80">
                    <span>• Kralgund Central</span>
                    <span className="font-mono font-bold text-white">₹20</span>
                  </div>
                  <div className="flex justify-between items-center text-white/80">
                    <span>• Supernaghama &amp; Qaziabad</span>
                    <span className="font-mono font-bold text-white">₹40</span>
                  </div>
                  <div className="flex justify-between items-center text-white/80">
                    <span>• Outside Market &amp; Environs</span>
                    <span className="font-mono font-bold text-white">₹60</span>
                  </div>
                  <div className="flex justify-between items-center text-white/80">
                    <span>• Highway Corridor / Langate</span>
                    <span className="font-mono font-bold text-white">₹90</span>
                  </div>
                  <div className="flex justify-between items-center text-white/70 pt-1 border-t border-white/10">
                    <span>• In-Store Counter Pickup</span>
                    <span className="font-mono font-bold text-emerald-400">FREE</span>
                  </div>
                </div>
              </div>

              {/* Install PWA Prompt inside mobile menu */}
              <div>
                <PWAInstallButton variant="prominent" className="w-full justify-center" />
              </div>

              {/* Contact Hotline & WhatsApp Quick Connect */}
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2.5">
                <div className="flex items-center justify-between text-xs text-white/80">
                  <span className="font-semibold text-white/70">Official Helpline:</span>
                  <span className="font-mono text-amber-300 font-bold">+91 95961 23022</span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <a
                    href={RESTAURANT_INFO.phoneHref}
                    className="glass-btn-secondary flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-white text-xs font-semibold active:scale-95 transition-all"
                  >
                    <Phone className="w-3.5 h-3.5 text-teal-300" />
                    <span>Call Us</span>
                  </a>

                  <a
                    href={`https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodeURIComponent(
                      'Hello The Shelter Cafe & Resto Kralgund! I would like to place an order / make an inquiry.'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-btn-secondary flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-white text-xs font-semibold active:scale-95 transition-all"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>WhatsApp</span>
                  </a>
                </div>

                <p className="text-[10px] text-center text-white/40 pt-1">
                  Main Road, Kralgund Qaziabad · 09:30 AM – 10:30 PM Daily
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
