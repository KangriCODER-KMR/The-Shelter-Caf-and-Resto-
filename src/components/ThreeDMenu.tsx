import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Utensils,
  Star,
  Leaf,
  Plus,
  Compass,
  ListFilter,
  Sparkles,
} from 'lucide-react';
import { FULL_MENU, RESTAURANT_INFO, CUISINE_CATEGORIES } from '../data/restaurantData';
import { MenuItem } from '../types';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';

interface ThreeDMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart?: (dish: MenuItem) => void;
}

export const ThreeDMenu: React.FC<ThreeDMenuProps> = ({
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [addedDishId, setAddedDishId] = useState<string | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Strictly lock background body scroll
  useBodyScrollLock(isOpen);

  const minSwipeDistance = 45;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe && currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
    if (isRightSwipe && currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const categories = CUISINE_CATEGORIES;
  // Page 0: Leather Hardcover
  // Page 1: Preface & Interactive Contents
  // Page 2 to 2 + categories.length - 1: Category Chapters
  // Final Page: Back Cover & Chef Note
  const totalPages = 2 + categories.length + 1;

  // Keyboard navigation (Left, Right, Escape)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        if (currentPage < totalPages - 1) setCurrentPage((prev) => prev + 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        if (currentPage > 0) setCurrentPage((prev) => prev - 1);
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentPage, totalPages, onClose]);

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleJumpToPage = (targetPage: number) => {
    if (targetPage >= 0 && targetPage < totalPages) {
      setCurrentPage(targetPage);
    }
  };

  const handleAddDish = (e: React.MouseEvent, item: MenuItem) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(item);
      setAddedDishId(item.id);
      setTimeout(() => setAddedDishId(null), 1400);
    }
  };

  const getPageTitle = (pageIndex: number): string => {
    if (pageIndex === 0) return 'Front Cover';
    if (pageIndex === 1) return 'Preface & Contents';
    if (pageIndex === totalPages - 1) return 'Back Cover';
    const cat = categories[pageIndex - 2];
    return cat ? cat.title : 'Menu';
  };

  const renderPageContent = (pageIndex: number) => {
    // 0. FRONT COVER (EMBOSSED LEATHER STYLE)
    if (pageIndex === 0) {
      return (
        <div className="h-full w-full flex flex-col items-center justify-center text-center p-4 sm:p-14 bg-gradient-to-br from-[#062111] via-[#072614] to-[#04150b] text-white relative overflow-hidden select-none">
          {/* Leather texture overlay */}
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/leather.png')]" />

          {/* Golden embossed filigree border */}
          <div className="relative z-10 w-full max-w-lg border-2 border-[#c5a059]/40 p-5 sm:p-12 rounded-sm outline-1 outline-[#c5a059]/50 outline-offset-4 sm:outline-offset-8 shadow-2xl bg-black/30 backdrop-blur-[2px]">
            <div className="flex items-center justify-center gap-2 text-[#c5a059] mb-4">
              <Sparkles className="w-4 h-4" />
              <span className="text-[11px] uppercase tracking-[0.4em] font-semibold">
                Kralgund · Handwara
              </span>
              <Sparkles className="w-4 h-4" />
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl text-white font-normal mb-2 tracking-tight">
              {RESTAURANT_INFO.name}
            </h1>

            <p className="font-serif italic text-base sm:text-2xl text-[#e8c87f] mb-4">
              {RESTAURANT_INFO.tagline}
            </p>

            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#c5a059] to-transparent mx-auto mb-6" />

            <p className="text-xs uppercase tracking-[0.25em] text-white/70 leading-relaxed mb-8 max-w-sm mx-auto">
              Authentic Kashmiri Wazwan · Barista Cafe · Multi-Cuisine Comforts for Bureaucrats & Everyday Citizens
            </p>

            <button
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#c5a059] hover:bg-[#d6b26b] text-[#072614] rounded-full text-xs uppercase tracking-[0.25em] font-bold shadow-lg hover:shadow-xl transition-all cursor-pointer transform hover:scale-105"
            >
              <BookOpen className="w-4 h-4" />
              <span>Open Menu (Contents)</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="absolute bottom-6 text-[10px] uppercase tracking-[0.3em] text-[#c5a059]/60 font-mono">
            Kupwara Highway Landmark · Est. 2024
          </div>
        </div>
      );
    }

    // 1. PREFACE & INTERACTIVE TABLE OF CONTENTS
    if (pageIndex === 1) {
      return (
        <div className="h-full flex flex-col p-4 sm:p-10 bg-[#fdfbf7] text-[#072614] border-l-4 border-[#072614]/15 overflow-y-auto no-scrollbar select-none overscroll-contain">
          <div className="border-b-2 border-[#c5a059]/40 pb-4 mb-6">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#c5a059] block mb-1">
              Table of Contents
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#072614]">
              The Culinary Chapters
            </h2>
            <p className="text-xs text-zinc-600 mt-1 font-serif italic">
              Tap any chapter title below to jump directly to that menu page:
            </p>
          </div>

          {/* Interactive TOC List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 flex-1">
            {categories.map((cat, idx) => {
              const targetPage = idx + 2;
              const dishCount = FULL_MENU.filter((m) => m.category === cat.categoryKey).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => handleJumpToPage(targetPage)}
                  className="text-left p-3.5 rounded-xl border border-[#072614]/10 bg-white/70 hover:bg-[#c5a059]/10 hover:border-[#c5a059]/60 transition-all cursor-pointer group shadow-2xs hover:shadow-md flex items-center justify-between"
                  title={`Jump to Chapter ${idx + 1}: ${cat.title}`}
                >
                  <div className="flex-1 pr-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-[#c5a059]">
                        CH.{String(idx + 1).padStart(2, '0')}
                      </span>
                      <h3 className="font-serif text-base font-semibold text-[#072614] group-hover:text-[#8a6824] transition-colors leading-snug">
                        {cat.title}
                      </h3>
                    </div>
                    <p className="text-[11px] text-zinc-500 line-clamp-1 mt-0.5">
                      {cat.tagline || cat.description}
                    </p>
                    <span className="text-[10px] text-emerald-800 font-medium">
                      {dishCount} curated dishes
                    </span>
                  </div>

                  <div className="text-right pl-2">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#072614]/5 group-hover:bg-[#c5a059] group-hover:text-[#072614] text-[#072614] text-xs font-mono font-bold transition-all">
                      P.{targetPage}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Footer note with quick action */}
          <div className="pt-4 border-t border-[#072614]/10 flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-600">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#c5a059]" />
              <span className="font-serif italic">
                Crafted with authentic Kashmiri valley saffron & mountain herbs.
              </span>
            </div>
            <button
              onClick={handleNext}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#072614] hover:bg-[#0b381e] text-white rounded-full text-[11px] uppercase tracking-wider font-semibold cursor-pointer transition-colors"
            >
              <span>Begin Chapter 1</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      );
    }

    // FINAL PAGE: BACK COVER & HOSPITALITY PLEDGE
    if (pageIndex === totalPages - 1) {
      return (
        <div className="h-full w-full flex flex-col items-center justify-center text-center p-4 sm:p-14 bg-gradient-to-br from-[#062111] via-[#072614] to-[#04150b] text-white relative overflow-hidden select-none">
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/leather.png')]" />

          <div className="relative z-10 w-full max-w-lg border-2 border-[#c5a059]/40 p-5 sm:p-12 rounded-sm outline-1 outline-[#c5a059]/50 outline-offset-4 sm:outline-offset-8 shadow-2xl bg-black/30 backdrop-blur-[2px]">
            <Utensils className="w-10 h-10 text-[#c5a059] mx-auto mb-4" />
            <h2 className="font-serif text-3xl sm:text-4xl text-white mb-2">
              Our Kashmiri Hospitality
            </h2>
            <p className="font-serif italic text-base text-[#e8c87f] mb-6">
              "Mehmaan Nawaz" — Honoring every guest as a member of our hearth.
            </p>

            <div className="w-12 h-0.5 bg-[#c5a059]/50 mx-auto mb-6" />

            <p className="text-xs text-white/80 leading-relaxed mb-6 font-light">
              Located on the main highway at Kralgund, Handwara. Whether you are taking an executive pause between official tours, rejoicing with family, or savoring hot Kehwa on a chilly evening, our kitchen is always prepared for you.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => handleJumpToPage(1)}
                className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full text-xs uppercase tracking-wider font-bold border border-white/20 transition-all cursor-pointer"
              >
                Return to Contents
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-[#c5a059] hover:bg-[#d6b26b] text-[#072614] rounded-full text-xs uppercase tracking-wider font-bold shadow-md transition-all cursor-pointer"
              >
                Close & Return to Site
              </button>
            </div>
          </div>

          <div className="absolute bottom-6 text-[10px] uppercase tracking-[0.3em] text-[#c5a059]/60 font-mono">
            {RESTAURANT_INFO.name} · Kralgund
          </div>
        </div>
      );
    }

    // CATEGORY CHAPTER PAGES
    const catIdx = pageIndex - 2;
    const category = categories[catIdx];
    if (!category) return null;

    const items = FULL_MENU.filter((item) => item.category === category.categoryKey);
    const prevChapterTitle = catIdx === 0 ? 'Preface & Contents' : categories[catIdx - 1]?.title;
    const nextChapterTitle = catIdx === categories.length - 1 ? 'Back Cover' : categories[catIdx + 1]?.title;

    return (
      <div className="h-full flex flex-col p-3.5 sm:p-10 bg-[#fdfbf7] text-[#072614] border-l-4 border-[#072614]/15 overflow-y-auto no-scrollbar overscroll-contain">
        {/* Chapter Header */}
        <div className="flex items-start justify-between border-b border-[#072614]/15 pb-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase tracking-[0.3em] font-mono font-bold text-[#c5a059]">
                Chapter {catIdx + 1} of {categories.length}
              </span>
              <span className="text-zinc-400">·</span>
              <span className="text-[10px] text-zinc-500 font-mono">Page {pageIndex}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#072614]">
              {category.title}
            </h2>
            <p className="font-serif italic text-xs sm:text-sm text-emerald-800 mt-1">
              {category.tagline || category.description}
            </p>
          </div>

          <div className="hidden sm:flex flex-col items-end">
            <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
              {items.length} items
            </span>
            <button
              onClick={() => handleJumpToPage(1)}
              className="mt-1 text-[11px] text-[#8a6824] hover:underline font-serif italic cursor-pointer inline-flex items-center gap-1"
            >
              <ListFilter className="w-3 h-3" />
              <span>Contents</span>
            </button>
          </div>
        </div>

        {/* Menu Dish Cards Grid inside 3D Book */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8 flex-1">
          {items.map((item) => (
            <div
              key={item.id}
              className="p-3.5 rounded-xl border border-[#072614]/10 bg-white/80 hover:bg-white hover:border-[#c5a059]/40 transition-all shadow-2xs group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-baseline justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h3 className="font-serif text-base font-bold text-[#072614] group-hover:text-[#8a6824] transition-colors">
                      {item.name}
                    </h3>
                    {item.isSignature && (
                      <span className="inline-flex items-center gap-0.5 text-[9px] uppercase tracking-wider font-bold bg-[#c5a059]/20 text-[#8a6824] px-1.5 py-0.5 rounded-sm">
                        <Star className="w-2.5 h-2.5 fill-[#8a6824]" />
                        <span>Sig</span>
                      </span>
                    )}
                    {item.isVegetarian && (
                      <span className="inline-flex items-center gap-0.5 text-[9px] uppercase tracking-wider font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-sm">
                        <Leaf className="w-2.5 h-2.5" />
                        <span>Veg</span>
                      </span>
                    )}
                  </div>

                  <span className="font-serif text-base font-bold text-[#072614] shrink-0">
                    {RESTAURANT_INFO.currency || '₹'}{item.price.toFixed(0)}
                  </span>
                </div>

                <p className="text-xs text-zinc-600 font-light leading-relaxed mb-2 line-clamp-2">
                  {item.description}
                </p>

                {item.regionalOrigin && (
                  <div className="text-[10px] uppercase tracking-wider text-emerald-700/70 font-semibold mb-2">
                    Heritage: {item.regionalOrigin}
                  </div>
                )}
              </div>

              {/* Add to order quick button inside 3D book */}
              <div className="pt-2 border-t border-zinc-100 flex items-center justify-between">
                <span className="text-[10px] text-zinc-400 font-mono">
                  {item.categoryLabel || category.title}
                </span>

                {onAddToCart && (
                  <button
                    onClick={(e) => handleAddDish(e, item)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                      addedDishId === item.id
                        ? 'bg-emerald-700 text-white'
                        : 'bg-[#072614]/5 hover:bg-[#c5a059] text-[#072614] hover:text-[#072614]'
                    }`}
                  >
                    <Plus className="w-3 h-3" />
                    <span>{addedDishId === item.id ? 'Added!' : 'Add to Order'}</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {items.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center opacity-40 text-center py-12">
            <Utensils className="w-10 h-10 mb-3" />
            <p className="italic font-serif">Seasonal valley creations in preparation...</p>
          </div>
        )}

        {/* In-Page Footer Chapter Traversal Links */}
        <div className="pt-4 border-t border-[#072614]/15 flex items-center justify-between text-xs font-semibold text-[#072614]">
          <button
            onClick={handlePrev}
            className="inline-flex items-center gap-1 text-[#072614]/70 hover:text-[#072614] hover:underline cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Prev: {prevChapterTitle}</span>
            <span className="sm:hidden">Prev Page</span>
          </button>

          <button
            onClick={() => handleJumpToPage(1)}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#072614]/5 hover:bg-[#c5a059]/20 text-[#072614] text-[11px] uppercase tracking-wider font-bold transition-colors cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Table of Contents</span>
          </button>

          <button
            onClick={handleNext}
            className="inline-flex items-center gap-1 text-[#072614]/70 hover:text-[#072614] hover:underline cursor-pointer"
          >
            <span className="hidden sm:inline">Next: {nextChapterTitle}</span>
            <span className="sm:hidden">Next Page</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="3D Hardcover Menu"
      className="fixed inset-0 z-[105] flex flex-col items-center justify-between p-2 sm:p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300 touch-none"
    >
      
      {/* Top Header Bar */}
      <div className="w-full max-w-6xl flex items-center justify-between z-20 py-2 px-2 text-white">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-[#c5a059]/20 text-[#e8c87f] border border-[#c5a059]/40 text-[11px] uppercase tracking-[0.25em] font-bold">
            3D Hardcover Menu
          </span>
          <span className="hidden sm:inline text-xs text-white/60 font-serif italic">
            {getPageTitle(currentPage)} · Kralgund
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick jump to contents button */}
          <button
            onClick={() => handleJumpToPage(1)}
            className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border border-white/10"
            title="Open Table of Contents"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#c5a059]" />
            <span className="hidden sm:inline">Table of Contents</span>
          </button>

          {/* Close modal */}
          <button
            onClick={onClose}
            className="p-2 bg-white/10 hover:bg-red-500/80 text-white rounded-full transition-all cursor-pointer border border-white/20"
            aria-label="Close 3D Menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Swipe Guidance Banner */}
      <div className="sm:hidden flex items-center justify-center py-1 px-3 bg-black/60 rounded-full border border-white/10 text-[10px] text-[#e8c87f] font-mono mb-1 select-none animate-pulse">
        <span>👆 Swipe left / right or tap arrows below to turn pages</span>
      </div>

      {/* Main Book Stage with Touch Support & Adaptive Floating Navigation */}
      <div className="relative w-full max-w-5xl flex-1 flex items-center justify-center my-1 sm:my-4 min-h-[380px] sm:min-h-[440px] max-h-[76vh] sm:max-h-[82vh]">
        
        {/* Desktop Prominent Left / Prev Button */}
        <div className="hidden sm:flex absolute left-1 sm:left-3 z-30 items-center">
          <button
            onClick={handlePrev}
            disabled={currentPage === 0}
            className={`flex items-center gap-1.5 px-3 py-4 sm:px-4 sm:py-5 rounded-2xl shadow-2xl transition-all cursor-pointer border ${
              currentPage === 0
                ? 'opacity-25 cursor-not-allowed bg-black/40 border-white/10 text-white/40'
                : 'bg-gradient-to-r from-[#072614] to-[#0f3d23] text-white hover:text-[#e8c87f] border-[#c5a059]/60 hover:scale-105 hover:border-[#c5a059] shadow-[0_0_20px_rgba(197,160,89,0.3)]'
            }`}
            title="Previous Page (Arrow Left)"
            aria-label="Previous Page"
          >
            <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 text-[#c5a059]" />
            <span className="hidden md:inline text-xs uppercase tracking-widest font-bold pr-1">
              Prev
            </span>
          </button>
        </div>

        {/* Desktop Prominent Right / Next Button */}
        <div className="hidden sm:flex absolute right-1 sm:right-3 z-30 items-center">
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
            className={`flex items-center gap-1.5 px-3 py-4 sm:px-4 sm:py-5 rounded-2xl shadow-2xl transition-all cursor-pointer border ${
              currentPage === totalPages - 1
                ? 'opacity-25 cursor-not-allowed bg-black/40 border-white/10 text-white/40'
                : 'bg-gradient-to-l from-[#072614] to-[#0f3d23] text-white hover:text-[#e8c87f] border-[#c5a059]/60 hover:scale-105 hover:border-[#c5a059] shadow-[0_0_20px_rgba(197,160,89,0.3)]'
            }`}
            title="Next Page (Arrow Right)"
            aria-label="Next Page"
          >
            <span className="hidden md:inline text-xs uppercase tracking-widest font-bold pl-1">
              Next
            </span>
            <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 text-[#c5a059]" />
          </button>
        </div>

        {/* The 3D Book Object with Touch Gestures */}
        <div 
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="relative w-full h-full max-w-4xl mx-0 sm:mx-16 bg-[#072614] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden perspective-2000 border-2 sm:border-4 border-[#c5a059]/40 touch-pan-y"
        >
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ rotateY: 35, opacity: 0.1, scale: 0.98 }}
              animate={{ rotateY: 0, opacity: 1, scale: 1 }}
              exit={{ rotateY: -35, opacity: 0.1, scale: 0.98 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="w-full h-full relative"
            >
              {/* Paper Texture Overlay */}
              <div className="absolute inset-0 pointer-events-none z-10 opacity-25 mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

              {/* Book Spine Shadow */}
              <div className="absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-black/25 via-black/10 to-transparent pointer-events-none z-20" />

              {/* Page Content */}
              {renderPageContent(currentPage)}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Persistent Bottom Control Dock with Quick Chapter Switcher */}
      <div className="w-full max-w-5xl z-20 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 p-2 sm:px-4 sm:py-2.5 bg-black/85 backdrop-blur-xl rounded-2xl border border-white/15 text-white shadow-2xl">
        
        {/* Mobile & Desktop High-Contrast Prev/Next Nav Controls with 44px min tap targets */}
        <div className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-2">
          <button
            onClick={handlePrev}
            disabled={currentPage === 0}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 disabled:opacity-25 disabled:cursor-not-allowed text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer transition-all border border-white/10 min-h-[44px]"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-4 h-4 text-[#c5a059]" />
            <span>Prev</span>
          </button>

          <div className="text-center px-2">
            <span className="text-xs font-mono font-bold text-[#e8c87f]">
              Page {currentPage} / {totalPages - 1}
            </span>
            <span className="block text-[9px] uppercase tracking-wider text-white/50 truncate max-w-[120px]">
              {getPageTitle(currentPage)}
            </span>
          </div>

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 disabled:opacity-25 disabled:cursor-not-allowed text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer transition-all border border-white/10 min-h-[44px]"
            aria-label="Next page"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4 text-[#c5a059]" />
          </button>
        </div>

        {/* Center: Scrollable / Selectable Chapter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full sm:max-w-md no-scrollbar py-1">
          <button
            onClick={() => handleJumpToPage(0)}
            className={`px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
              currentPage === 0
                ? 'bg-[#c5a059] text-[#072614] font-bold shadow-xs'
                : 'bg-white/5 hover:bg-white/15 text-white/70'
            }`}
          >
            Cover
          </button>

          <button
            onClick={() => handleJumpToPage(1)}
            className={`px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
              currentPage === 1
                ? 'bg-[#c5a059] text-[#072614] font-bold shadow-xs'
                : 'bg-white/5 hover:bg-white/15 text-white/70'
            }`}
          >
            Contents
          </button>

          {categories.map((cat, idx) => {
            const pageNum = idx + 2;
            const isActive = currentPage === pageNum;
            return (
              <button
                key={cat.id}
                onClick={() => handleJumpToPage(pageNum)}
                className={`px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#c5a059] text-[#072614] font-bold shadow-xs'
                    : 'bg-white/5 hover:bg-white/15 text-white/70'
                }`}
                title={`Jump to ${cat.title}`}
              >
                {cat.title.split(' ')[0]}
              </button>
            );
          })}
        </div>

        {/* Right: Keyboard Shortcut Hint */}
        <div className="hidden lg:flex items-center gap-2 text-[10px] text-white/50 uppercase tracking-wider font-mono">
          <span>Keys:</span>
          <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/80">←</kbd>
          <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/80">→</kbd>
          <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/80">ESC</kbd>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .perspective-2000 { perspective: 2000px; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
};
