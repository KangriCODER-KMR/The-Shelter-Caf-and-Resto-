import React, { useState } from 'react';
import { X, Search, Plus, Check, Download, Flame, Leaf, Sparkles } from 'lucide-react';
import { FULL_MENU, RESTAURANT_INFO } from '../data/restaurantData';
import { MenuItem } from '../types';
import { LiquidButton } from './ui/liquid-glass-button';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (dish: MenuItem) => void;
  initialCategory?: string;
}

export const MenuModal: React.FC<MenuModalProps> = ({
  isOpen,
  onClose,
  onAddToCart,
  initialCategory = 'all',
}) => {
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'veg' | 'vegan' | 'gf'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [addedDishId, setAddedDishId] = useState<string | null>(null);

  // Lock background scroll when modal is open
  useBodyScrollLock(isOpen);

  if (!isOpen) return null;

  const categories = [
    { key: 'all', label: 'All Dishes' },
    { key: 'kashmiri-specials', label: 'Kashmiri Wazwan' },
    { key: 'starters', label: 'Starters & Chaat' },
    { key: 'tandoor', label: 'Grills & Tandoor' },
    { key: 'curries', label: 'Traditional Curries' },
    { key: 'biryani', label: 'Biryani & Rice' },
    { key: 'vegetarian', label: 'Vegetarian Specials' },
    { key: 'desserts', label: 'Artisanal Desserts' },
    { key: 'sides', label: 'Breads & Sides' },
    { key: 'drinks', label: 'Cocktails & Wine' },
  ];

  const filteredDishes = FULL_MENU.filter((dish) => {
    if (activeCategory !== 'all' && dish.category !== activeCategory) {
      return false;
    }
    if (dietaryFilter === 'veg' && !dish.isVegetarian) return false;
    if (dietaryFilter === 'vegan' && !dish.isVegan) return false;
    if (dietaryFilter === 'gf' && !dish.isGlutenFree) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = dish.name.toLowerCase().includes(q);
      const matchDesc = dish.description.toLowerCase().includes(q);
      const matchCat = dish.categoryLabel.toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchCat) return false;
    }

    return true;
  });

  const handleAdd = (dish: MenuItem) => {
    onAddToCart(dish);
    setAddedDishId(dish.id);
    setTimeout(() => {
      setAddedDishId(null);
    }, 1200);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="The Complete Menu"
      className="fixed inset-0 z-[105] overflow-hidden bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 animate-in fade-in duration-300 touch-none"
    >
      <div className="glass-modal w-full max-w-5xl h-[94dvh] sm:h-[88vh] flex flex-col shadow-2xl relative animate-in zoom-in-95 duration-200 overflow-hidden rounded-2xl sm:rounded-3xl border border-white/20">
        
        {/* Top Header */}
        <div className="p-4 sm:p-6 bg-qgreen-950 text-white flex items-center justify-between border-b border-qgreen-900 shadow-md shrink-0">
          <div>
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-qgold-500 font-semibold block mb-0.5 sm:mb-1">
              {RESTAURANT_INFO.name} · Kralgund, Handwara
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-normal">
              The Complete Menu
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white border border-white/20 rounded-xl hover:bg-white/10 cursor-pointer transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-3 sm:p-5 border-b border-qgreen-900/15 bg-qparchment/80 backdrop-blur-md flex flex-col gap-3 shrink-0">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-emerald-800" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dishes, spices, ingredients..."
                className="w-full pl-9 pr-4 py-2 border border-qgreen-900/30 rounded-xl text-xs text-qgreen-950 focus:outline-none focus:border-qgold-500 bg-white/90 shadow-2xs"
              />
            </div>

            {/* Dietary Filter Segmented Control */}
            <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 touch-pan-x overscroll-x-contain no-scrollbar">
              {[
                { key: 'all', label: 'All Diets' },
                { key: 'veg', label: 'Vegetarian' },
                { key: 'vegan', label: 'Vegan' },
                { key: 'gf', label: 'Gluten-Free' },
              ].map((d) => (
                <button
                  key={d.key}
                  onClick={() => setDietaryFilter(d.key as any)}
                  className={`px-3 py-1.5 text-xs uppercase tracking-wider font-semibold rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                    dietaryFilter === d.key
                      ? 'bg-qgold-500 text-white shadow-xs'
                      : 'bg-white/80 border border-qgreen-900/20 text-qgreen-900 hover:bg-qgold-50'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>

          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none touch-pan-x overscroll-x-contain">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-3.5 py-1.5 text-xs uppercase tracking-wider font-semibold rounded-xl whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                  activeCategory === cat.key
                    ? 'bg-qgold-500 text-white shadow-xs'
                    : 'bg-white/80 text-qgreen-950 border border-qgreen-900/20 hover:bg-qgold-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dishes Grid */}
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain touch-pan-y p-4 sm:p-6 lg:p-8 pb-24 custom-scrollbar">
          {filteredDishes.length === 0 ? (
            <div className="py-20 text-center text-emerald-900">
              <p className="font-serif text-2xl mb-2">No dishes match your criteria</p>
              <p className="text-xs text-emerald-700 mb-4">Try clearing filters or searching another keyword.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setDietaryFilter('all');
                  setActiveCategory('all');
                }}
                className="bg-emerald-900 text-white px-5 py-2 text-xs uppercase tracking-wider font-semibold cursor-pointer shadow-xs"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredDishes.map((dish) => (
                <div
                  key={dish.id}
                  className="glass-panel-light rounded-3xl p-6 flex flex-col justify-between glass-card-hover group border border-emerald-900/15"
                >
                  <div>
                    <div className="flex items-baseline justify-between gap-3 mb-1.5">
                      <div className="flex items-center gap-2">
                        <h4 className="font-serif text-xl sm:text-2xl text-emerald-950 font-normal group-hover:text-emerald-800 transition-colors">
                          {dish.name}
                        </h4>
                        {dish.isVegetarian && (
                          <span title="Vegetarian" className="text-emerald-700">
                            <Leaf className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </div>
                      <span className="font-serif text-lg font-medium text-emerald-900 tabular-nums">
                        {RESTAURANT_INFO.currency || '₹'}{dish.price.toFixed(2)}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-emerald-950/80 font-light leading-relaxed mb-3">
                      {dish.description}
                    </p>

                    {dish.regionalOrigin && (
                      <p className="text-[11px] text-emerald-700/80 italic mb-2">
                        Origin: {dish.regionalOrigin}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-emerald-900/10 mt-2">
                    <div className="flex items-center gap-2 text-xs text-emerald-800/80">
                      {dish.spiceLevel > 0 && (
                        <span className="flex items-center gap-0.5 text-emerald-700 text-[11px]" title={`Spice Level: ${dish.spiceLevel}/3`}>
                          <Flame className="w-3 h-3 text-red-600" />
                          {dish.spiceLevel === 1 ? 'Mild' : dish.spiceLevel === 2 ? 'Medium' : 'Hot'}
                        </span>
                      )}
                      {dish.isGlutenFree && (
                        <span className="text-[10px] uppercase tracking-wider font-semibold text-emerald-800">
                          GF
                        </span>
                      )}
                    </div>

                    <LiquidButton
                      size="sm"
                      onClick={() => handleAdd(dish)}
                      className={`rounded-full px-4 py-1.5 text-xs uppercase tracking-wider font-bold transition-all cursor-pointer shadow-xs ${
                        addedDishId === dish.id
                          ? 'bg-qgreen-700 text-white'
                          : 'bg-qgold-500 text-white hover:bg-qgold-600'
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
                    </LiquidButton>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Bottom Bar */}
        <div className="p-4 bg-emerald-50/80 border-t border-emerald-900/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-emerald-900 backdrop-blur-md">
          <p className="text-center sm:text-left">
            * All dishes freshly made to order. Inform your server of any dietary preferences.
          </p>
          <LiquidButton
            onClick={onClose}
            variant="gold"
            className="rounded-full px-6 py-2 bg-qgold-500 text-white uppercase tracking-wider font-bold hover:bg-qgold-600 cursor-pointer shadow-xs"
          >
            Close Menu
          </LiquidButton>
        </div>

      </div>
    </div>
  );
};
