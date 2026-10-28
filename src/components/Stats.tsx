import React from 'react';
import { Award, Star, Users, Utensils, Sparkles } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const Stats: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-qparchment text-qgreen-950 relative overflow-hidden">
      
      {/* Background glass radial element */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-100/50 rounded-full blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-qgold-600 block mb-2">
            Our Journey & Accolades
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl mb-3 font-normal tracking-tight">
            The tale so far
          </h2>
          <p className="text-2xl font-serif italic text-qgold-500">
            A story worth telling.
          </p>
        </div>

        {/* 4-Stat Glass Container */}
        <div className="glass-panel-light p-8 sm:p-12 mb-12 shadow-xl border border-qgold-500/20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-qgold-500/15">
            
            <div className="pt-6 md:pt-0 group cursor-default">
              <p className="font-serif text-4xl sm:text-5xl lg:text-6xl text-qgreen-950 mb-3 tabular-nums font-normal group-hover:scale-105 transition-transform duration-300">
                4.8★
              </p>
              <p className="uppercase tracking-[0.2em] text-xs font-bold text-qgold-600">
                Google Rating
              </p>
            </div>

            <div className="pt-6 md:pt-0 group cursor-default">
              <p className="font-serif text-4xl sm:text-5xl lg:text-6xl text-emerald-950 mb-3 tabular-nums font-normal group-hover:scale-105 transition-transform duration-300">
                410
              </p>
              <p className="uppercase tracking-[0.2em] text-xs font-bold text-emerald-800">
                Reviews & Counting
              </p>
            </div>

            <div className="pt-6 md:pt-0 group cursor-default">
              <p className="font-serif text-4xl sm:text-5xl lg:text-6xl text-emerald-950 mb-3 tabular-nums font-normal group-hover:scale-105 transition-transform duration-300">
                100+
              </p>
              <p className="uppercase tracking-[0.2em] text-xs font-bold text-emerald-800">
                Dishes on the Menu
              </p>
            </div>

            <div className="pt-6 md:pt-0 group cursor-default">
              <p className="font-serif text-4xl sm:text-5xl lg:text-6xl text-emerald-950 mb-3 font-normal group-hover:scale-105 transition-transform duration-300">
                ∞
              </p>
              <p className="uppercase tracking-[0.2em] text-xs font-bold text-emerald-800">
                Stories Told
              </p>
            </div>

          </div>
        </div>

        {/* Accolades Banner Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
          {RESTAURANT_INFO.accolades.map((acc, index) => (
            <div
              key={index}
              className="glass-panel-light p-4 flex flex-col items-center justify-center border border-qgold-500/20 shadow-xs"
            >
              <Award className="w-5 h-5 text-qgold-500 mb-1.5" />
              <span className="font-serif text-sm font-bold text-emerald-950">{acc.title}</span>
              <span className="text-[11px] text-emerald-800/80 font-medium">{acc.label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
