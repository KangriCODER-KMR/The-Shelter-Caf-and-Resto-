import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  BookOpen,
  Leaf,
  Flame,
  Star,
  Plus,
  Check,
  Coffee,
  Pizza,
  UtensilsCrossed,
  Utensils,
  Sparkles,
  ArrowRight,
  Filter,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { FULL_MENU, CUISINE_CATEGORIES, RESTAURANT_INFO } from '../data/restaurantData';
import { MenuItem } from '../types';

interface ExploreMenuSectionProps {
  onAddToCart: (dish: MenuItem) => void;
  onOpenThreeDMenu: () => void;
}

export const ExploreMenuSection: React.FC<ExploreMenuSectionProps> = ({
  onAddToCart,
  onOpenThreeDMenu,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'veg' | 'non-veg' | 'signature'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [addedDishId, setAddedDishId] = useState<string | null>(null);
  const [isFullMenuExpanded, setIsFullMenuExpanded] = useState(false);

  const handleAdd = (dish: MenuItem) => {
    onAddToCart(dish);
    setAddedDishId(dish.id);
    setTimeout(() => setAddedDishId(null), 1400);
  };

  const filteredItems = useMemo(() => {
    return FULL_MENU.filter((item) => {
      // Category match
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Dietary filter match
      if (dietaryFilter === 'veg' && !item.isVegetarian) return false;
      if (dietaryFilter === 'non-veg' && item.isVegetarian) return false;
      if (dietaryFilter === 'signature' && !item.isSignature) return false;

      // Search match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(query);
        const matchDesc = item.description.toLowerCase().includes(query);
        const matchOrigin = item.regionalOrigin?.toLowerCase().includes(query);
        const matchCategory = item.categoryLabel?.toLowerCase().includes(query);
        if (!matchName && !matchDesc && !matchOrigin && !matchCategory) {
          return false;
        }
      }

      return true;
    });
  }, [selectedCategory, dietaryFilter, searchQuery]);

  // Collapsed by default: Keep signature preview dishes from every section unless expanded or filtered
  const displayedItems = useMemo(() => {
    if (isFullMenuExpanded || searchQuery.trim() || selectedCategory !== 'all' || dietaryFilter !== 'all') {
      return filteredItems;
    }
    const previewList: MenuItem[] = [];
    CUISINE_CATEGORIES.forEach((cat) => {
      const itemsInCat = FULL_MENU.filter((m) => m.category === cat.categoryKey);
      const sorted = [...itemsInCat].sort((a, b) => (b.isSignature ? 1 : 0) - (a.isSignature ? 1 : 0));
      previewList.push(...sorted.slice(0, 2));
    });
    return previewList;
  }, [filteredItems, isFullMenuExpanded, searchQuery, selectedCategory, dietaryFilter]);

  return (
    <section id="menu" className="pt-20 sm:pt-28 pb-36 sm:pb-32 bg-[#fdfbf7] text-[#072614] relative overflow-hidden border-t border-[#072614]/10">
      
      {/* Subtle organic mountain background glow */}
      <div
        className="absolute top-1/3 -left-32 w-96 h-96 bg-emerald-100/60 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 right-0 w-80 h-80 bg-amber-100/40 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Scroll-Triggered Text Appearance */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-900/10 border border-emerald-900/20 text-[#072614] text-xs uppercase tracking-[0.25em] font-bold mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>Explore Directly on Website · Kralgund Kitchen</span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#072614] font-normal tracking-tight mb-4 leading-tight">
              Our Complete Culinary Menu
            </h2>

            <p className="font-light text-base sm:text-lg text-emerald-950/80 leading-relaxed mb-6">
              From slow-simmered Kashmiri Wazwan (Rogan Josh, Goshtaba, Tabak Maaz) to artisanal copper samovar Kehwa, crispy stone-baked pizzas, smoking sizzlers, and comforting citizen thalis.
            </p>

            {/* 3D Hardcover Menu Link Banner */}
            <div className="inline-flex flex-wrap items-center justify-center gap-3 p-2 px-4 rounded-2xl bg-white shadow-md border border-[#c5a059]/40 hover:border-[#c5a059] transition-all">
              <span className="text-xs text-zinc-600 font-serif italic">
                Prefer holding our physical book?
              </span>
              <button
                onClick={onOpenThreeDMenu}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#072614] hover:bg-[#0f4425] text-white rounded-full text-xs uppercase tracking-widest font-bold transition-transform cursor-pointer hover:scale-105 shadow-sm"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>Open 3D Hardcover Book</span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Search & Dietary Control Toolbar with Scroll Appearance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-3xl p-4 sm:p-6 shadow-xl border border-[#072614]/10 mb-8"
        >
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Live Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dishes, saffron kehwa, sizzlers, pizza, mutton tujje..."
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs sm:text-sm text-zinc-900 focus:outline-hidden focus:ring-2 focus:ring-[#072614]/30 focus:border-[#072614] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-zinc-700 cursor-pointer font-bold px-1.5 py-0.5 rounded-full"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Dietary Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 touch-pan-x overscroll-x-contain">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1 shrink-0">
                <Filter className="w-3 h-3" /> Filter:
              </span>

              <button
                onClick={() => setDietaryFilter('all')}
                className={`px-3.5 py-2 rounded-full text-xs uppercase tracking-wider font-bold transition-all cursor-pointer whitespace-nowrap ${
                  dietaryFilter === 'all'
                    ? 'bg-[#072614] text-white shadow-md'
                    : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                }`}
              >
                All
              </button>

              <button
                onClick={() => setDietaryFilter('non-veg')}
                className={`px-3.5 py-2 rounded-full text-xs uppercase tracking-wider font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  dietaryFilter === 'non-veg'
                    ? 'bg-rose-900 text-white shadow-md'
                    : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                }`}
              >
                <span>Non-Veg</span>
              </button>

              <button
                onClick={() => setDietaryFilter('veg')}
                className={`px-3.5 py-2 rounded-full text-xs uppercase tracking-wider font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  dietaryFilter === 'veg'
                    ? 'bg-emerald-800 text-white shadow-md'
                    : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                }`}
              >
                <Leaf className="w-3 h-3 text-emerald-400" />
                <span>Veg Only</span>
              </button>

              <button
                onClick={() => setDietaryFilter('signature')}
                className={`px-3.5 py-2 rounded-full text-xs uppercase tracking-wider font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  dietaryFilter === 'signature'
                    ? 'bg-[#c5a059] text-[#072614] shadow-md'
                    : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                }`}
              >
                <Star className="w-3 h-3 fill-[#c5a059]" />
                <span>Signatures</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Category Horizontal Navigation Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-4 mb-8 touch-pan-x overscroll-x-contain scroll-smooth"
        >
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2.5 rounded-2xl text-xs uppercase tracking-wider font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
              selectedCategory === 'all'
                ? 'bg-[#072614] text-[#e8c87f] shadow-lg scale-105'
                : 'bg-white text-zinc-700 hover:bg-zinc-100 border border-zinc-200'
            }`}
          >
            <UtensilsCrossed className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>All Dishes ({FULL_MENU.length})</span>
          </button>

          {CUISINE_CATEGORIES.map((cat) => {
            const count = FULL_MENU.filter((m) => m.category === cat.categoryKey).length;
            const isActive = selectedCategory === cat.categoryKey;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.categoryKey)}
                className={`px-4 py-2.5 rounded-2xl text-xs uppercase tracking-wider font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
                  isActive
                    ? 'bg-[#072614] text-[#e8c87f] shadow-lg scale-105'
                    : 'bg-white text-zinc-700 hover:bg-zinc-100 border border-zinc-200'
                }`}
              >
                <span>{cat.title}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                    isActive ? 'bg-[#c5a059] text-[#072614]' : 'bg-zinc-100 text-zinc-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-zinc-500 mb-6 px-1">
          <span>
            Showing <strong className="text-zinc-900">{displayedItems.length}</strong> items
            {!isFullMenuExpanded && !searchQuery && selectedCategory === 'all' && dietaryFilter === 'all' && (
              <span className="text-zinc-500 font-medium"> (Highlights from each section · {FULL_MENU.length} total)</span>
            )}
            {selectedCategory !== 'all' && (
              <> in <strong className="text-emerald-900">{selectedCategory}</strong></>
            )}
            {searchQuery && (
              <> matching "<strong className="text-zinc-900">{searchQuery}</strong>"</>
            )}
          </span>

          {(selectedCategory !== 'all' || dietaryFilter !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('all');
                setDietaryFilter('all');
                setSearchQuery('');
              }}
              className="text-[#8a6824] hover:underline font-semibold cursor-pointer"
            >
              Reset All Filters
            </button>
          )}
        </div>

        {/* Menu Dish Cards Grid with Scroll-Triggered Text & Card Appearance */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence>
            {displayedItems.map((dish, idx) => (
              <motion.div
                key={dish.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.5,
                  delay: Math.min(idx * 0.05, 0.4),
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-zinc-200/80 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  {/* Dish Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100">
                    <img
                      src={dish.imageUrl}
                      alt={dish.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                    {/* Badge Badges Overlay */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      {dish.isSignature && (
                        <span className="inline-flex items-center gap-1 bg-[#072614] text-[#e8c87f] px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold shadow-md border border-[#c5a059]/40">
                          <Star className="w-3 h-3 fill-[#c5a059] text-[#c5a059]" />
                          <span>Chef Signature</span>
                        </span>
                      )}
                      {dish.isVegetarian ? (
                        <span className="inline-flex items-center gap-1 bg-emerald-700 text-white px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold shadow-md">
                          <Leaf className="w-3 h-3" />
                          <span>Pure Veg</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-rose-900 text-white px-2 py-0.5 rounded-full text-[9px] uppercase tracking-wider font-bold shadow-md">
                          <span>Non-Veg</span>
                        </span>
                      )}
                    </div>

                    {/* Price Tag in Image */}
                    <div className="absolute bottom-3 right-3 bg-white/95 text-[#072614] backdrop-blur-md px-3 py-1 rounded-full font-serif font-bold text-sm shadow-md">
                      {RESTAURANT_INFO.currency || '₹'}{dish.price.toFixed(0)}
                    </div>

                    {/* Regional origin */}
                    {dish.regionalOrigin && (
                      <div className="absolute bottom-3 left-3 text-white text-[10px] font-mono font-medium drop-shadow-md">
                        📍 {dish.regionalOrigin}
                      </div>
                    )}
                  </div>

                  {/* Card Content with Typography */}
                  <div className="p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-serif text-xl font-bold text-[#072614] group-hover:text-[#8a6824] transition-colors leading-snug">
                        {dish.name}
                      </h3>

                      {dish.spiceLevel !== undefined && dish.spiceLevel > 0 && (
                        <div
                          className="flex items-center text-amber-600 shrink-0 pt-0.5"
                          title={`Spice Level: ${dish.spiceLevel}/3`}
                        >
                          {[...Array(dish.spiceLevel)].map((_, i) => (
                            <Flame key={i} className="w-3.5 h-3.5 fill-amber-500" />
                          ))}
                        </div>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-zinc-600 font-light leading-relaxed mb-4 line-clamp-3">
                      {dish.description}
                    </p>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-5 sm:p-6 pt-0 border-t border-zinc-100 mt-auto flex items-center justify-between">
                  <span className="text-[11px] font-mono text-zinc-400">
                    {dish.categoryLabel || 'Kralgund Special'}
                  </span>

                  <button
                    onClick={() => handleAdd(dish)}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs uppercase tracking-wider font-bold transition-all cursor-pointer shadow-sm ${
                      addedDishId === dish.id
                        ? 'bg-emerald-700 text-white scale-105'
                        : 'bg-[#072614] hover:bg-[#c5a059] text-white hover:text-[#072614] hover:scale-105'
                    }`}
                  >
                    {addedDishId === dish.id ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add to Order</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Collapsed Menu Expand / Collapse Controls */}
        {!isFullMenuExpanded && !searchQuery.trim() && selectedCategory === 'all' && dietaryFilter === 'all' && (
          <div className="mt-12 text-center">
            <div className="inline-flex flex-col items-center gap-3 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-white via-zinc-50 to-white shadow-xl border-2 border-[#c5a059]/40 max-w-xl mx-auto">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#8a6824] font-bold">
                Showing Highlights ({displayedItems.length} of {FULL_MENU.length} Specialties)
              </span>
              <h4 className="font-serif text-2xl sm:text-3xl font-bold text-[#072614]">
                Want to Explore the Entire Menu?
              </h4>
              <p className="text-xs sm:text-sm text-zinc-600 font-light max-w-md">
                We've collapsed our menu to showcase the best of every section. Tap below to view all 70+ authentic dishes across Kashmiri Wazwan, Kanties, Stone-Baked Pizzas, Rolls, Momos, Shakes, and Combos.
              </p>
              <button
                onClick={() => setIsFullMenuExpanded(true)}
                className="mt-2 inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#072614] via-[#0d4223] to-[#072614] text-[#f3d694] hover:text-white border border-[#c5a059]/70 shadow-xl text-xs uppercase tracking-widest font-black cursor-pointer hover:scale-105 active:scale-95 transition-all group"
              >
                <Utensils className="w-4 h-4 text-[#c5a059] group-hover:rotate-12 transition-transform" />
                <span>View Full Menu ({FULL_MENU.length}+ Items)</span>
                <ChevronDown className="w-4 h-4 text-[#c5a059] group-hover:translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        )}

        {isFullMenuExpanded && !searchQuery.trim() && selectedCategory === 'all' && dietaryFilter === 'all' && (
          <div className="mt-12 text-center">
            <button
              onClick={() => {
                setIsFullMenuExpanded(false);
                const elem = document.getElementById('menu');
                if (elem) {
                  const y = elem.getBoundingClientRect().top + window.pageYOffset - 90;
                  window.scrollTo({ top: y, behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs uppercase tracking-wider font-bold cursor-pointer transition-all border border-zinc-300 shadow-sm active:scale-95"
            >
              <ChevronUp className="w-4 h-4 text-[#8a6824]" />
              <span>Collapse Menu (Show Highlights Only)</span>
            </button>
          </div>
        )}

        {/* Empty Search Fallback */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl p-8 border border-zinc-200 shadow-sm max-w-lg mx-auto">
            <UtensilsCrossed className="w-12 h-12 text-zinc-400 mx-auto mb-3" />
            <h4 className="font-serif text-2xl text-zinc-900 mb-2">No matching dishes found</h4>
            <p className="text-xs text-zinc-600 mb-6">
              We couldn't find items matching "{searchQuery}". Try searching for Wazwan, Kehwa, Pizza, or Sizzler.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setDietaryFilter('all');
                setSearchQuery('');
              }}
              className="px-6 py-2.5 bg-[#072614] text-white text-xs uppercase tracking-widest font-bold rounded-full cursor-pointer hover:bg-[#0f4425]"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Bottom Booking & Explore Banner with Scroll Appearance */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mt-16 sm:mt-20 rounded-3xl bg-gradient-to-r from-[#062111] via-[#072614] to-[#04150b] text-white p-8 sm:p-12 shadow-2xl border border-[#c5a059]/30 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="relative z-10 max-w-xl">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#c5a059] block mb-2">
              Kralgund Highway Dining & Takeaway
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal mb-2">
              Need a bespoke banquet or swift pickup?
            </h3>
            <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed">
              Order directly via our instant WhatsApp dispatch slip or reserve private dining cabins for executive meetings, families, and travelers.
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenThreeDMenu}
              className="px-6 py-3 bg-[#c5a059] hover:bg-[#d6b26b] text-[#072614] rounded-full text-xs uppercase tracking-widest font-bold shadow-lg transition-transform cursor-pointer hover:scale-105 inline-flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>3D Hardcover Menu</span>
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
