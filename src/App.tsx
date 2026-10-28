import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Story } from './components/Story';
import { Marquee } from './components/Marquee';
import { TheMasterpieces } from './components/TheMasterpieces';
import { CuisineSection } from './components/CuisineSection';
import { Signatures } from './components/Signatures';
import { Stats } from './components/Stats';
import { TheRoom } from './components/TheRoom';
import { Reviews } from './components/Reviews';
import { PrivateDining } from './components/PrivateDining';
import { GallerySection } from './components/GallerySection';
import { YourTableAwaits } from './components/YourTableAwaits';
import { Footer } from './components/Footer';
import { ReservationModal } from './components/ReservationModal';
import { OrderDrawer } from './components/OrderDrawer';
import { MenuModal } from './components/MenuModal';
import { PrivateDiningModal } from './components/PrivateDiningModal';
import { ThreeDMenu } from './components/ThreeDMenu';
import { FullScreenNavMenu } from './components/FullScreenNavMenu';
import { BlossomDrift } from './components/BlossomDrift';
import { FloatingSpices } from './components/FloatingSpices';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { LiveOrderTrackerModal } from './components/LiveOrderTrackerModal';
import { ExploreMenuSection } from './components/ExploreMenuSection';
import { OfflineIndicator } from './components/OfflineIndicator';
import { MobileBottomBar } from './components/MobileBottomBar';
import { OrderHistoryModal } from './components/OrderHistoryModal';
import { AiAssistantModal } from './components/AiAssistantModal';
import { MenuItem, CartItem, OrderData } from './types';

export default function App() {
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);
  const [menuInitialCategory, setMenuInitialCategory] = useState<string>('all');
  const [isPrivateDiningOpen, setIsPrivateDiningOpen] = useState(false);
  const [isThreeDMenuOpen, setIsThreeDMenuOpen] = useState(false);
  const [isFullScreenMenuOpen, setIsFullScreenMenuOpen] = useState(false);
  const [activeOrder, setActiveOrder] = useState<OrderData | null>(null);
  const [isOrderTrackerOpen, setIsOrderTrackerOpen] = useState(false);

  // Cart state persisted to localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('theshelter_cart') || localStorage.getItem('theshelter_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('theshelter_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  const handleAddToCart = (dish: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.item.id === dish.id);
      if (existing) {
        return prev.map((i) =>
          i.item.id === dish.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { item: dish, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => {
          if (i.item.id === id) {
            const nextQty = i.quantity + delta;
            return nextQty > 0 ? { ...i, quantity: nextQty } : null;
          }
          return i;
        })
        .filter((i): i is CartItem => i !== null)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((i) => i.item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleReorder = (items: CartItem[]) => {
    setCart((prev) => {
      const newCart = [...prev];
      items.forEach((reorderItem) => {
        const existingIdx = newCart.findIndex((i) => i.item.id === reorderItem.item.id);
        if (existingIdx >= 0) {
          newCart[existingIdx] = {
            ...newCart[existingIdx],
            quantity: newCart[existingIdx].quantity + reorderItem.quantity,
          };
        } else {
          newCart.push({ ...reorderItem });
        }
      });
      return newCart;
    });
    setIsOrderOpen(true);
  };

  const handleSelectCuisineCategory = (categoryKey: string) => {
    setMenuInitialCategory(categoryKey);
    const elem = document.getElementById('menu');
    if (elem) {
      const headerOffset = 85;
      const elementPosition = elem.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    } else {
      setIsMenuOpen(true);
    }
  };

  const handleScrollToExploreMenu = () => {
    const elem = document.getElementById('menu');
    if (elem) {
      const headerOffset = 85;
      const elementPosition = elem.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    } else {
      setMenuInitialCategory('all');
      setIsMenuOpen(true);
    }
  };

  const handleDownloadMenu = () => {
    setIsThreeDMenuOpen(true);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-qparchment text-qgreen-950 font-sans selection:bg-qgold-500 selection:text-white flex flex-col relative">
      {/* Ambient Glassmorphic Blossom Petals Floating (Beneath the Blossoms) */}
      <BlossomDrift />

      {/* 2D Interactive Motion Design: Flowing Spices & Parallax (Dribbble style) */}
      <FloatingSpices />

      {/* Floating Direct WhatsApp Business Chat Bubble */}
      <WhatsAppFloat />

      {/* Top Bar Navigation */}
      <Navbar
        onOpenReservation={() => setIsReservationOpen(true)}
        onOpenOrder={() => setIsOrderOpen(true)}
        onOpenMenu={handleScrollToExploreMenu}
        onOpenThreeDMenu={() => setIsThreeDMenuOpen(true)}
        onOpenFullScreenMenu={() => setIsFullScreenMenuOpen(true)}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onOpenAiAssistant={() => setIsAiAssistantOpen(true)}
        cartCount={cartCount}
      />

      {/* Main Content Flow */}
      <main className="flex-1">
        {/* 1. Hero with Video & Green/White Overlay */}
        <Hero
          onOpenReservation={() => setIsReservationOpen(true)}
          onOpenMenu={handleScrollToExploreMenu}
        />

        {/* 2. Our Story */}
        <Story />

        {/* 3. Flowing Marquee Banner */}
        <Marquee />

        {/* 4. The Masterpieces Banner */}
        <TheMasterpieces
          onOpenGallery={() => {
            const elem = document.getElementById('gallery');
            if (elem) elem.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 5. The Cuisine Course Grid */}
        <CuisineSection onSelectCategory={handleSelectCuisineCategory} />

        {/* 6. The Signatures Dishes */}
        <Signatures
          onOpenMenu={handleScrollToExploreMenu}
          onAddToCart={handleAddToCart}
          onOpenThreeDMenu={handleDownloadMenu}
        />

        {/* 6.5 Direct On-Page Menu Explorer (All Categories, Live Search & Direct Ordering) */}
        <ExploreMenuSection
          onAddToCart={handleAddToCart}
          onOpenThreeDMenu={handleDownloadMenu}
        />

        {/* 7. The Tale So Far Stats */}
        <Stats />

        {/* 8. The Room (Beneath the Blossoms) */}
        <TheRoom onOpenReservation={() => setIsReservationOpen(true)} />

        {/* 9. Verified Guest Reviews */}
        <Reviews />

        {/* 10. Private Dining & Celebrations */}
        <PrivateDining onOpenEnquiry={() => setIsPrivateDiningOpen(true)} />

        {/* 11. Visual Gallery with Lightbox */}
        <GallerySection />

        {/* 12. Your Table Awaits (Dine In vs At Home) */}
        <YourTableAwaits
          onOpenReservation={() => setIsReservationOpen(true)}
          onOpenOrder={() => setIsOrderOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenReservation={() => setIsReservationOpen(true)}
        onOpenOrder={() => setIsOrderOpen(true)}
        onOpenMenu={handleScrollToExploreMenu}
        onOpenThreeDMenu={() => setIsThreeDMenuOpen(true)}
      />

      {/* Modals & Interactive Drawers */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
      />

      <OrderDrawer
        isOpen={isOrderOpen}
        onClose={() => setIsOrderOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOpenMenu={handleScrollToExploreMenu}
        onOrderPlaced={(order) => {
          setActiveOrder(order);
          setIsOrderTrackerOpen(true);
        }}
      />

      <MenuModal
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onAddToCart={handleAddToCart}
        initialCategory={menuInitialCategory}
      />

      <PrivateDiningModal
        isOpen={isPrivateDiningOpen}
        onClose={() => setIsPrivateDiningOpen(false)}
      />

      {/* Enhanced Immersive 3D Hardcover Menu with Visible Traversal Controls & Direct Ordering */}
      <ThreeDMenu
        isOpen={isThreeDMenuOpen}
        onClose={() => setIsThreeDMenuOpen(false)}
        onAddToCart={handleAddToCart}
      />

      {/* Full-Screen Luxury Menu Overlay (Reference Design from Right Corner) */}
      <FullScreenNavMenu
        isOpen={isFullScreenMenuOpen}
        onClose={() => setIsFullScreenMenuOpen(false)}
        onOpenReservation={() => setIsReservationOpen(true)}
        onOpenOrder={() => setIsOrderOpen(true)}
        onOpenMenu={handleScrollToExploreMenu}
        onOpenThreeDMenu={() => setIsThreeDMenuOpen(true)}
      />

      {/* Floating Active Live Order Dispatch Indicator */}
      {activeOrder && (
        <button
          onClick={() => setIsOrderTrackerOpen(true)}
          className="fixed bottom-24 sm:bottom-6 left-3 sm:left-6 z-40 bg-[#072614]/85 backdrop-blur-xl text-[#f3d694] border border-[#c5a059]/60 hover:border-[#c5a059] shadow-[0_12px_32px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.22)] px-4 py-2.5 rounded-full flex items-center gap-2.5 text-xs font-extrabold uppercase tracking-wider cursor-pointer hover:scale-105 active:scale-95 transition-all"
          title="Open Live Order Delivery Tracker"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span>Live Order #{activeOrder.orderNumber} Active</span>
        </button>
      )}

      {/* Ultra-Realistic Animated Live Delivery Console Modal */}
      <LiveOrderTrackerModal
        isOpen={isOrderTrackerOpen}
        onClose={() => setIsOrderTrackerOpen(false)}
        order={activeOrder}
        onOrderConfirmedByCustomer={(updated) => setActiveOrder(updated)}
      />

      {/* PWA Offline Connectivity Indicator */}
      <OfflineIndicator />

      {/* Mobile-First Sticky Bottom Dock with Liquid Glass & Unified Professional Jewels */}
      <MobileBottomBar
        onOpenReservation={() => setIsReservationOpen(true)}
        onOpenMenu={handleScrollToExploreMenu}
        onOpenAiAssistant={() => setIsAiAssistantOpen(true)}
      />

      {/* AI Dining Concierge Modal (Intelligent Real-Time Grounded Assistant) */}
      <AiAssistantModal
        isOpen={isAiAssistantOpen}
        onClose={() => setIsAiAssistantOpen(false)}
        onOpenMenu={handleScrollToExploreMenu}
        onOpenReservation={() => setIsReservationOpen(true)}
        onOpenOrder={() => setIsOrderOpen(true)}
      />

      {/* Order History & 1-Tap Re-Order Modal */}
      <OrderHistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        onReorder={handleReorder}
        onViewOrderTicket={(order) => {
          setActiveOrder(order);
          setIsOrderTrackerOpen(true);
        }}
        onOpenMenu={handleScrollToExploreMenu}
      />
    </div>
  );
}
