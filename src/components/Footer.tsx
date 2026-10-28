import React from 'react';
import { Phone, Mail, MapPin, ExternalLink, Calendar, ShoppingBag, Clock, Heart, Facebook, Instagram } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { PWAInstallButton } from './PWAInstallButton';

interface FooterProps {
  onOpenReservation: () => void;
  onOpenOrder: () => void;
  onOpenMenu: () => void;
  onOpenThreeDMenu: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenReservation,
  onOpenOrder,
  onOpenMenu,
  onOpenThreeDMenu,
}) => {
  return (
    <footer id="contact" className="bg-qgreen-950 text-white pt-20 pb-28 sm:pb-20 border-t border-white/20 relative overflow-hidden">
      
      {/* Background glass radial glow */}
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-16 border-b border-white/15">
          
          {/* Column 1: Branding & Philosophy */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <img
                src={RESTAURANT_INFO.logoUrl}
                alt={RESTAURANT_INFO.name}
                className="w-12 h-12 rounded-full object-cover shadow-lg ring-2 ring-[#c5a059]/70 shrink-0"
              />
              <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
                {RESTAURANT_INFO.name}
              </h3>
            </div>
            <p className="font-serif italic text-base text-qgold-500 mb-5">
              — {RESTAURANT_INFO.tagline}
            </p>
            <p className="text-sm font-light leading-relaxed text-emerald-100/80 mb-6">
              {RESTAURANT_INFO.description}
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={onOpenReservation}
                className="inline-flex items-center gap-1.5 bg-qgold-500 text-white px-3.5 py-2 text-xs uppercase tracking-wider font-bold hover:bg-qgold-600 transition-all cursor-pointer shadow-sm"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Reserve</span>
              </button>
              <button
                onClick={onOpenOrder}
                className="inline-flex items-center gap-1.5 glass-panel-dark text-white px-3.5 py-2 text-xs uppercase tracking-wider font-bold hover:bg-white hover:text-emerald-950 transition-all cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Order</span>
              </button>
            </div>
          </div>

          {/* Column 2: Explore Navigation */}
          <div>
            <h4 className="uppercase tracking-[0.25em] text-xs font-bold mb-6 text-qgold-500">
              Explore
            </h4>
            <ul className="space-y-3 font-light text-sm text-emerald-100/90">
              <li>
                <a href="#story" className="hover:text-emerald-300 hover:underline transition-colors">
                  Our Story
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenThreeDMenu}
                  className="hover:text-emerald-300 hover:underline transition-colors text-left font-light cursor-pointer"
                >
                  Menu Experience
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenMenu}
                  className="hover:text-emerald-300 hover:underline transition-colors text-left font-light cursor-pointer"
                >
                  Order Online
                </button>
              </li>
              <li>
                <a href="#gallery" className="hover:text-emerald-300 hover:underline transition-colors">
                  Gallery
                </a>
              </li>
              <li>
                <a href="#private-dining" className="hover:text-emerald-300 hover:underline transition-colors">
                  Private Dining
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-emerald-300 hover:underline transition-colors">
                  Guest Reviews
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-emerald-300 hover:underline transition-colors">
                  Visit &amp; Contact
                </a>
              </li>
              <li className="pt-2">
                <PWAInstallButton variant="compact" />
              </li>
            </ul>
          </div>

          {/* Column 3: Hours of Service with Glass Panel */}
          <div className="glass-panel-dark p-6">
            <h4 className="uppercase tracking-[0.25em] text-xs font-bold mb-4 text-qgold-500 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5" />
              <span>Opening Hours</span>
            </h4>
            <ul className="space-y-2.5 font-light text-xs text-emerald-100/90">
              {RESTAURANT_INFO.hours.map((h, i) => (
                <li key={i} className="flex justify-between border-b border-white/10 pb-1.5 last:border-b-0">
                  <span className="font-medium text-emerald-200">{h.days}</span>
                  <span className="text-white font-mono tabular-nums">{h.hours}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Location with Glass Panel */}
          <div className="glass-panel-dark p-6">
            <h4 className="uppercase tracking-[0.25em] text-xs font-bold mb-4 text-qgold-500 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5" />
              <span>Contact & Location</span>
            </h4>
            <div className="space-y-3 font-light text-xs text-emerald-100/90">
              <address className="not-italic leading-relaxed text-emerald-100/90">
                Main Road Kralgund, Handwara<br />
                Kupwara District, J&K 193302
              </address>

              <div className="pt-2">
                <a
                  href={RESTAURANT_INFO.phoneHref}
                  className="hover:text-emerald-300 font-serif text-lg tracking-wide hover:underline text-white block"
                >
                  {RESTAURANT_INFO.phone}
                </a>
              </div>

              <div>
                <a
                  href={`mailto:${RESTAURANT_INFO.email}`}
                  className="hover:text-emerald-300 hover:underline"
                >
                  {RESTAURANT_INFO.email}
                </a>
              </div>

              <div className="pt-2 border-t border-white/10">
                <a
                  href={RESTAURANT_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-emerald-300 hover:text-white transition-colors font-bold"
                >
                  <span>Google Maps Directions</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Facebook Contact & Socials */}
              <div className="pt-3 border-t border-white/10 space-y-2">
                <span className="text-[10px] uppercase tracking-wider text-emerald-300/80 font-bold block">
                  Connect & Social:
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={RESTAURANT_INFO.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-600/25 hover:bg-blue-600 text-blue-200 hover:text-white border border-blue-400/40 transition-all text-[11px] font-semibold cursor-pointer shadow-xs"
                    title="Connect with us on Facebook"
                  >
                    <Facebook className="w-3.5 h-3.5 text-blue-400 group-hover:text-white" />
                    <span>Facebook</span>
                  </a>

                  <a
                    href={RESTAURANT_INFO.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-600/25 hover:bg-pink-600 text-pink-200 hover:text-white border border-pink-400/40 transition-all text-[11px] font-semibold cursor-pointer shadow-xs"
                    title="Follow on Instagram"
                  >
                    <Instagram className="w-3.5 h-3.5 text-pink-400 group-hover:text-white" />
                    <span>Instagram</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Legal & Attribution Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-light text-emerald-300/70 gap-4">
          <p>
            &copy; {new Date().getFullYear()} {RESTAURANT_INFO.name}. All rights reserved.
          </p>
          <p className="text-center sm:text-right uppercase tracking-wider text-[11px]">
            Kralgund, Handwara, Kupwara Highway, Jammu & Kashmir
          </p>
        </div>

      </div>
    </footer>
  );
};
