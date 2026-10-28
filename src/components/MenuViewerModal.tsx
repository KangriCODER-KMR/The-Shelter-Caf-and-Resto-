import React from 'react';
import { X, Download, Printer } from 'lucide-react';
import { FULL_MENU, RESTAURANT_INFO } from '../data/restaurantData';

interface MenuViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'dine' | 'drinks';
}

export const MenuViewerModal: React.FC<MenuViewerModalProps> = ({ isOpen, onClose, type }) => {
  if (!isOpen) return null;

  const title = type === 'dine' ? 'Dine-In À La Carte Menu' : 'Drinks & Wine List';
  const items = type === 'dine'
    ? FULL_MENU.filter((m) => m.category !== 'drinks')
    : FULL_MENU.filter((m) => m.category === 'drinks');

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md animate-in fade-in duration-300">
      <div className="glass-modal w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl relative animate-in zoom-in-95 duration-200">
        
        {/* Top Control Bar */}
        <div className="p-4 bg-emerald-950 text-white flex items-center justify-between border-b border-emerald-900">
          <div className="flex items-center gap-3">
            <span className="font-serif text-xl">{RESTAURANT_INFO.name} — {title}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs uppercase tracking-wider font-semibold border border-white/30 text-white hover:bg-white hover:text-emerald-950 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-white/80 hover:text-white border border-white/20"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Menu Paper Preview */}
        <div className="flex-1 overflow-y-auto p-8 sm:p-12 bg-[#fafdfb] text-emerald-950">
          <div className="text-center pb-8 border-b-2 border-emerald-900 mb-8">
            <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight mb-2 text-emerald-950">
              {RESTAURANT_INFO.name}
            </h1>
            <p className="font-serif italic text-lg text-emerald-800">
              — {RESTAURANT_INFO.tagline} —
            </p>
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-700 mt-2">
              Main Road Kralgund, Handwara, Kupwara Highway, J&K
            </p>
          </div>

          <div className="space-y-6">
            {items.map((dish) => (
              <div key={dish.id} className="flex items-baseline justify-between gap-4 border-b border-emerald-900/10 pb-3">
                <div className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <h4 className="font-serif text-lg font-bold text-emerald-950">
                      {dish.name}
                    </h4>
                    {dish.isSignature && (
                      <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-800">
                        (Signature)
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-emerald-900/80 font-light mt-0.5 leading-relaxed">
                    {dish.description}
                  </p>
                  {dish.regionalOrigin && (
                    <p className="text-[10px] text-emerald-700 italic">
                      Region: {dish.regionalOrigin}
                    </p>
                  )}
                </div>
                <div className="text-right shrink-0">
                  <span className="font-serif text-base font-bold text-emerald-950 tabular-nums">
                    £{dish.price.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-10 mt-10 border-t border-emerald-900/20 text-xs text-emerald-800 font-light">
            <p className="italic">
              All dishes freshly prepared by our master chefs. VAT included. Service charge discretionary.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
