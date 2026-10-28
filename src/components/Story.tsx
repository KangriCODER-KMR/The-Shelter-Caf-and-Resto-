import React, { useState } from 'react';
import { Sparkles, MapPin, Award } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { motion, AnimatePresence } from 'motion/react';

export const Story: React.FC = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [activeStoryTab, setActiveStoryTab] = useState<'promise' | 'sourcing' | 'spices'>('promise');

  return (
    <section id="story" className="py-24 sm:py-32 bg-white text-emerald-950 relative overflow-hidden">
      
      {/* Background Glass Orb */}
      <div
        className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Visual Column with Glass Frame */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative group"
          >
            <div className="glass-panel-light p-3 sm:p-4 rounded-3xl shadow-xl transition-transform duration-500 group-hover:scale-[1.01] border border-white/80">
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-emerald-900/10">
                {!imageError ? (
                  <img
                    src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80"
                    alt={`${RESTAURANT_INFO.name} entrance in Kralgund, Kashmir`}
                    referrerPolicy="no-referrer"
                    onLoad={() => setImageLoaded(true)}
                    onError={() => setImageError(true)}
                    className={`w-full h-full object-cover filter grayscale contrast-105 group-hover:grayscale-0 transition-all duration-700 ${
                      imageLoaded ? 'opacity-95' : 'opacity-0'
                    }`}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-emerald-900 text-white p-8 text-center">
                    <Sparkles className="w-12 h-12 text-qgold-500 mb-3" />
                    <p className="font-serif text-2xl font-semibold mb-2 text-white">{RESTAURANT_INFO.name}</p>
                    <p className="text-xs uppercase tracking-widest text-emerald-200">
                      {RESTAURANT_INFO.address}
                    </p>
                  </div>
                )}

                <div className="absolute inset-0 bg-emerald-900/10 pointer-events-none group-hover:opacity-0 transition-opacity" />
              </div>

              {/* Glass Floating Trust Badge */}
              <div className="absolute bottom-6 left-6 right-6 glass-panel-dark rounded-2xl text-white p-3 sm:p-4 flex items-center justify-between border border-white/20">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-qgold-500" />
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    Valley Diners Choice 2026
                  </span>
                </div>
                <span className="text-xs text-emerald-200 font-mono">{RESTAURANT_INFO.googleRating} / 5.0</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-qgreen-900">
              <MapPin className="w-3.5 h-3.5 text-qgold-600" />
              <span>Experience Hospitality — {RESTAURANT_INFO.name} in Kralgund</span>
            </div>
          </motion.div>

          {/* Editorial Content Column */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col justify-center"
          >
            <div className="inline-block mb-3">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-qgold-600">
                Our Narrative & Heritage
              </span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-qgreen-950 font-normal tracking-tight mb-4">
              What is {RESTAURANT_INFO.name}?
            </h2>

            <p className="font-serif italic text-2xl text-emerald-800/90 mb-8 font-light">
              A word that means a tale.
            </p>

            <div className="space-y-6 text-base sm:text-lg text-emerald-950/80 font-normal leading-relaxed mb-8">
              <p>
                Food is all about its story — the origin, the spices, the texture and the taste of every dish.
                It is the cornerstone of daily life, of culture, of history.
              </p>
              <p>
                <strong className="font-semibold text-emerald-950">'{RESTAURANT_INFO.name}'</strong> tells the extraordinary
                stories behind the foods we eat: the finest Indian cuisine, served with careful attention to every
                detail of food, service and ambience.
              </p>
              <p>
                {RESTAURANT_INFO.name} is a place of gathering, of celebrations, of business, and of pleasure. Let the story begin…
              </p>
            </div>

            {/* Interactive Glass Detail Tabs */}
            <div className="glass-panel-light p-5 rounded-3xl border border-white/80 shadow-md">
              <div className="flex items-center gap-2 border-b border-emerald-900/15 pb-3 mb-4 overflow-x-auto no-scrollbar">
                {(['promise', 'sourcing', 'spices'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveStoryTab(tab)}
                    className={`text-[10px] sm:text-xs uppercase tracking-wider font-bold px-3.5 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap ${
                      activeStoryTab === tab
                        ? 'bg-qgold-500 text-white shadow-md scale-105'
                        : 'text-qgreen-900 hover:bg-qgold-50'
                    }`}
                  >
                    {tab === 'promise' ? 'The Promise' : tab === 'sourcing' ? 'Valley Sourcing' : 'Spice Alchemy'}
                  </button>
                ))}
              </div>

              <div className="min-h-[100px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStoryTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {activeStoryTab === 'promise' && (
                      <div>
                        <p className="font-serif text-xl font-bold text-emerald-950 tracking-wide mb-1">
                          — The {RESTAURANT_INFO.name} Promise
                        </p>
                        <p className="text-xs text-emerald-800 leading-relaxed font-light">
                          Every dish is freshly prepared to order using ancestral techniques: glowing charcoal grills,
                          slow dum pukht steam sealing, and reductions simmered for hours rather than minutes.
                        </p>
                      </div>
                    )}

                    {activeStoryTab === 'sourcing' && (
                      <div>
                        <p className="font-serif text-xl font-bold text-emerald-950 tracking-wide mb-1">
                          Pampore Saffron & Mountain Farms
                        </p>
                        <p className="text-xs text-emerald-800 leading-relaxed font-light">
                          We partner with local valley growers for certified Pampore saffron, crisp Dal Lake lotus stems (Nadru), fresh mountain dairy, and prime livestock.
                        </p>
                      </div>
                    )}

                    {activeStoryTab === 'spices' && (
                      <div>
                        <p className="font-serif text-xl font-bold text-emerald-950 tracking-wide mb-1">
                          Roasted In-House Daily
                        </p>
                        <p className="text-xs text-emerald-800 leading-relaxed font-light">
                          Kashmiri saffron, Tellicherry peppercorns, dried kasoori methi and green cardamom pods
                          are hand-toasted each morning to release delicate essential oils.
                        </p>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

