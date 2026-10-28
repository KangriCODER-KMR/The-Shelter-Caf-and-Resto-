import React from 'react';
import { Calendar, ShoppingBag, Clock, ShieldCheck, MapPin } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { LiquidButton } from '@/components/ui/liquid-glass-button';

interface YourTableAwaitsProps {
  onOpenReservation: () => void;
  onOpenOrder: () => void;
}

export const YourTableAwaits: React.FC<YourTableAwaitsProps> = ({
  onOpenReservation,
  onOpenOrder,
}) => {
  return (
    <section className="py-24 sm:py-32 bg-qparchment text-qgreen-950 text-center relative overflow-hidden">
      
      {/* Background radial glass tone */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-emerald-100/60 rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-qgold-600 block mb-3">
          Plan Your Experience
        </span>
        <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl mb-4 font-normal tracking-tight">
          Your Table Awaits
        </h2>
        <p className="text-2xl font-serif italic text-qgold-500 mb-16">
          Two ways to taste the tale.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Option 1: Dine In Glass Card */}
          <div className="glass-panel-light rounded-3xl p-8 sm:p-12 lg:p-14 flex flex-col justify-between glass-card-hover text-center border border-white/80 shadow-xl">
            <div>
              <div className="w-14 h-14 mx-auto mb-6 flex items-center justify-center bg-qgold-500 text-white rounded-full shadow-md">
                <Calendar className="w-6 h-6" />
              </div>

              <h3 className="text-3xl sm:text-4xl font-serif mb-4 text-emerald-950">
                Dine In
              </h3>

              <p className="text-base sm:text-lg font-light text-emerald-950/80 mb-8 leading-relaxed">
                Join us at our tranquil sanctuary in Kralgund. Instant table reservation and authentic Kashmiri hospitality.
              </p>
            </div>

            <div>
              <LiquidButton
                size="lg"
                variant="gold"
                onClick={onOpenReservation}
                className="w-full rounded-full text-xs uppercase tracking-widest font-bold text-white py-4 mb-4 shadow-md"
              >
                Reserve a Table
              </LiquidButton>

              <div className="flex items-center justify-center gap-1.5 text-xs uppercase tracking-widest text-emerald-800/80 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>Powered by {RESTAURANT_INFO.bookingProvider}</span>
              </div>
            </div>
          </div>

          {/* Option 2: At Home Glass Card */}
          <div className="glass-panel-light rounded-3xl p-8 sm:p-12 lg:p-14 flex flex-col justify-between glass-card-hover text-center border border-white/80 shadow-xl">
            <div>
              <div className="w-14 h-14 mx-auto mb-6 flex items-center justify-center bg-qgold-50 text-qgold-600 border border-qgold-500/20 rounded-full shadow-xs">
                <ShoppingBag className="w-6 h-6" />
              </div>

              <h3 className="text-3xl sm:text-4xl font-serif mb-4 text-emerald-950">
                At Home
              </h3>

              <p className="text-base sm:text-lg font-light text-emerald-950/80 mb-8 leading-relaxed">
                The full menu, collected fresh or delivered across Kralgund, Handwara, and highway hubs ({RESTAURANT_INFO.deliveryPostcodes.join(', ')}).
              </p>
            </div>

            <div>
              <LiquidButton
                size="lg"
                variant="gold"
                onClick={onOpenOrder}
                className="w-full rounded-full text-xs uppercase tracking-widest font-bold text-white py-4 mb-4 shadow-md border border-qgold-500/30"
              >
                Order Takeaway & Delivery
              </LiquidButton>

              <div className="flex items-center justify-center gap-1.5 text-xs uppercase tracking-widest text-emerald-800/80 font-semibold">
                <Clock className="w-3.5 h-3.5 text-emerald-700" />
                <span>Powered by {RESTAURANT_INFO.orderProvider}</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
