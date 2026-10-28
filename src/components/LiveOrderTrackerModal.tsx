import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Flame,
  ChefHat,
  PackageCheck,
  Bike,
  ShieldCheck,
  Sparkles,
  Printer,
  Share2,
  Check,
  Navigation,
  FileText,
  Receipt
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { OrderData } from '../types';
import { RESTAURANT_INFO, WHATSAPP_CONFIG } from '../data/restaurantData';
import { createForwardOrderToOwnerWhatsAppUrl } from '../utils/whatsapp';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';

interface LiveOrderTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: OrderData | null;
  onOrderConfirmedByCustomer?: (order: OrderData) => void;
}

export const LiveOrderTrackerModal: React.FC<LiveOrderTrackerModalProps> = ({
  isOpen,
  onClose,
  order,
  onOrderConfirmedByCustomer,
}) => {
  const [currentOrder, setCurrentOrder] = useState<OrderData | null>(order);
  const [activeStage, setActiveStage] = useState<1 | 2 | 3 | 4>(2);
  const [isCustomerConfirmed, setIsCustomerConfirmed] = useState(true);
  const [confirmedTimeStr, setConfirmedTimeStr] = useState<string>('');
  const [secondsRemaining, setSecondsRemaining] = useState<number>(30 * 60);
  const [copiedLink, setCopiedLink] = useState(false);

  // Lock body scroll when tracker is open
  useBodyScrollLock(isOpen);

  // Synchronize when order prop updates
  useEffect(() => {
    if (order) {
      setCurrentOrder(order);
      setIsCustomerConfirmed(order.customerConfirmed !== false);
      setConfirmedTimeStr(order.confirmedAt || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setSecondsRemaining((order.estimatedMinutes || 30) * 60);
    }
  }, [order]);

  // Live countdown timer simulation
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  // Gentle progression through stages
  useEffect(() => {
    if (!isOpen) return;
    const timer1 = setTimeout(() => setActiveStage(2), 2500);
    const timer2 = setTimeout(() => setActiveStage(3), 16000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [isOpen]);

  if (!isOpen || !currentOrder) return null;

  const curr = RESTAURANT_INFO.currency || '₹';
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const timeDisplay = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  const estimatedWindow =
    currentOrder.orderType === 'delivery'
      ? `${currentOrder.estimatedMinutes || 35}–${(currentOrder.estimatedMinutes || 35) + 10} mins`
      : `${currentOrder.estimatedMinutes || 20} mins`;

  const handleCustomerConfirm = () => {
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setIsCustomerConfirmed(true);
    setConfirmedTimeStr(timeNow);
    const updated: OrderData = {
      ...currentOrder,
      customerConfirmed: true,
      confirmedAt: timeNow,
    };
    setCurrentOrder(updated);
    if (onOrderConfirmedByCustomer) {
      onOrderConfirmedByCustomer(updated);
    }
  };

  const handleForwardToOwner = () => {
    const targetOrder: OrderData = {
      ...currentOrder,
      customerConfirmed: isCustomerConfirmed,
      confirmedAt: confirmedTimeStr || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    const url = createForwardOrderToOwnerWhatsAppUrl(targetOrder);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyOrderLink = () => {
    navigator.clipboard.writeText(`https://thesheltercafe.com/orders/${currentOrder.orderNumber}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Live Order Tracker"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[105] overflow-y-auto overscroll-contain touch-pan-y bg-black/85 backdrop-blur-xl flex items-center justify-center p-2 sm:p-6 animate-in fade-in duration-300 touch-none"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 25 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 280 }}
        className="w-full max-w-3xl bg-[#030913] text-white rounded-3xl overflow-hidden shadow-2xl border border-[#c5a059]/30 flex flex-col relative my-4 sm:my-6 max-h-[94dvh] sm:max-h-[90vh]"
      >
        {/* Subtle Ambient Radial Lighting */}
        <div
          className="absolute -top-24 -right-24 w-96 h-96 bg-[#c5a059]/15 rounded-full blur-[100px] pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#072614]/40 rounded-full blur-[100px] pointer-events-none"
          aria-hidden="true"
        />

        {/* 1. Header Bar */}
        <div className="px-4 sm:px-6 py-4 bg-gradient-to-r from-[#071626] to-[#040e1a] border-b border-white/10 flex items-center justify-between z-10 shrink-0">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-sm sm:text-base font-bold text-white tracking-wide">
                  Live Dispatch Console &amp; Printable Receipt
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold uppercase tracking-wider border border-emerald-500/30">
                  LIVE
                </span>
              </div>
              <p className="text-[10px] text-white/60 font-mono">
                Order Ref: <span className="text-[#c5a059] font-bold">#{currentOrder.orderNumber}</span> · {currentOrder.createdAt}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={handlePrint}
              className="px-2.5 py-1.5 bg-white/10 hover:bg-white/20 text-[#f3d694] rounded-full transition-colors cursor-pointer text-xs flex items-center gap-1.5 border border-[#c5a059]/40"
              title="Print Kitchen Ticket"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline font-bold">Print Ticket</span>
            </button>

            <button
              onClick={handleCopyOrderLink}
              className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer text-xs"
              title="Copy Order Link"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              aria-label="Close tracking modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 2. Scrollable Body Content */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-7 space-y-6 z-10 custom-scrollbar">
          
          {/* Top Banner: Estimated Arrival Time & Live Countdown */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#072614]/80 via-[#0a1e38]/70 to-[#040e1a] p-4 sm:p-6 border border-[#c5a059]/30 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5 items-center">
              <div className="md:col-span-7 space-y-1">
                <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#c5a059] block">
                  {currentOrder.orderType === 'delivery' ? 'Estimated Courier Window' : 'Kitchen Ready Window'}
                </span>
                <h4 className="font-serif text-3xl sm:text-4xl text-white font-normal flex items-baseline gap-2">
                  <span>~{estimatedWindow}</span>
                </h4>
                <p className="text-xs text-white/70 font-light flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Fresh preparation in progress at {RESTAURANT_INFO.name} kitchen, Kralgund</span>
                </p>
                {currentOrder.deliveryArea && (
                  <p className="text-xs text-emerald-300 font-semibold flex items-center gap-1 pt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span>Destination Zone: {currentOrder.deliveryArea}</span>
                  </p>
                )}
              </div>

              {/* Live Countdown Clock Widget */}
              <div className="md:col-span-5 flex flex-col items-center sm:items-end justify-center bg-black/40 backdrop-blur-md rounded-2xl p-3.5 border border-white/10">
                <span className="text-[10px] uppercase tracking-widest text-[#c5a059] font-mono">
                  Live Kitchen Countdown
                </span>
                <div className="text-3xl sm:text-4xl font-mono font-bold tracking-wider text-emerald-400 drop-shadow-[0_0_12px_rgba(52,211,153,0.3)] my-1">
                  {timeDisplay}
                </div>
                <div className="flex items-center gap-1 text-[10px] text-white/60">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
                  <span>Real-time kitchen sync</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Four Kitchen Progress Stages */}
          <div className="bg-[#040e1b] rounded-2xl p-4 sm:p-5 border border-white/10 space-y-3">
            <span className="text-[10px] uppercase tracking-widest text-white/60 font-mono block">
              Kitchen &amp; Dispatch Stages
            </span>

            <div className="relative py-2">
              <div className="absolute top-5 left-8 right-8 h-1 bg-white/10 -z-0 rounded-full">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-[#c5a059] rounded-full transition-all duration-700"
                  style={{ width: `${((activeStage - 1) / 3) * 100}%` }}
                />
              </div>

              <div className="grid grid-cols-4 gap-2 text-center relative z-10">
                {/* Stage 1 */}
                <div className="flex flex-col items-center">
                  <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold shadow-md ring-4 ring-[#030913] mb-1.5 transition-all ${
                    activeStage >= 1 ? 'bg-emerald-500 text-black' : 'bg-white/10 text-white/50'
                  }`}>
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className={`text-[10px] sm:text-[11px] font-semibold ${activeStage >= 1 ? 'text-white' : 'text-white/60'}`}>
                    Confirmed
                  </span>
                </div>

                {/* Stage 2 */}
                <div className="flex flex-col items-center">
                  <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold shadow-md ring-4 ring-[#030913] mb-1.5 transition-all ${
                    activeStage >= 2 ? 'bg-[#c5a059] text-black animate-pulse' : 'bg-white/10 text-white/50'
                  }`}>
                    <ChefHat className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className={`text-[10px] sm:text-[11px] font-semibold ${activeStage >= 2 ? 'text-white' : 'text-white/60'}`}>
                    Cooking
                  </span>
                </div>

                {/* Stage 3 */}
                <div className="flex flex-col items-center">
                  <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold shadow-md ring-4 ring-[#030913] mb-1.5 transition-all ${
                    activeStage >= 3 ? 'bg-emerald-500 text-black' : 'bg-white/10 text-white/50'
                  }`}>
                    <PackageCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className={`text-[10px] sm:text-[11px] font-semibold ${activeStage >= 3 ? 'text-white' : 'text-white/60'}`}>
                    Packing
                  </span>
                </div>

                {/* Stage 4 */}
                <div className="flex flex-col items-center">
                  <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold shadow-md ring-4 ring-[#030913] mb-1.5 transition-all ${
                    activeStage >= 4 ? 'bg-emerald-500 text-black' : 'bg-white/10 text-white/50'
                  }`}>
                    <Bike className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className={`text-[10px] sm:text-[11px] font-semibold ${activeStage >= 4 ? 'text-white' : 'text-white/60'}`}>
                    {currentOrder.orderType === 'delivery' ? 'Dispatched' : 'Ready'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Localized Route Radar Simulation */}
          <div className="bg-[#05111d] rounded-2xl p-4 sm:p-5 border border-white/10 relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Navigation className="w-4 h-4 text-[#c5a059]" />
                <span className="text-xs font-bold uppercase tracking-wider text-white/90">
                  Live Dispatch Route · Kralgund Belt
                </span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400">
                GPS Active · {currentOrder.deliveryArea || 'Kralgund Zone'}
              </span>
            </div>

            <div className="relative py-3 px-2">
              <div className="flex items-center justify-between relative">
                {/* Origin */}
                <div className="flex flex-col items-center z-10 text-center">
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-[#c5a059] shadow-lg shrink-0">
                    <img src={RESTAURANT_INFO.logoUrl} alt="Resto" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[10px] font-bold text-[#e8c87f] mt-1">The Shelter Kitchen</span>
                  <span className="text-[9px] text-white/50">Main Road Kralgund</span>
                </div>

                {/* Animated Connecting Path */}
                <div className="flex-1 mx-3 sm:mx-6 relative">
                  <div className="h-0.5 bg-white/20 w-full" />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 transition-all duration-1000 flex items-center justify-center w-7 h-7 bg-[#c5a059] rounded-full text-black shadow-lg"
                    style={{ left: `${Math.min(95, Math.max(5, (activeStage / 4) * 100))}%` }}
                  >
                    <Bike className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Destination */}
                <div className="flex flex-col items-center z-10 text-center">
                  <div className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-400 flex items-center justify-center text-emerald-300 shadow-lg shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-white mt-1">
                    {currentOrder.deliveryArea || 'Delivery Point'}
                  </span>
                  <span className="text-[9px] text-emerald-300/80 truncate max-w-[120px]">
                    {currentOrder.address || 'Kralgund Hub'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 5. FANTASTIC PRINTABLE OFFICIAL RECEIPT / KITCHEN ORDER TICKET (User Requested) */}
          <div id="printable-ticket" className="bg-white text-zinc-900 rounded-2xl shadow-xl overflow-hidden border border-zinc-300">
            {/* Top Ticket Header Banner */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-[#072614] to-[#0d3d23] text-white flex items-center justify-between border-b border-[#c5a059]/40">
              <div className="flex items-center gap-3">
                <img
                  src={RESTAURANT_INFO.logoUrl}
                  alt={RESTAURANT_INFO.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#c5a059]"
                />
                <div>
                  <h4 className="font-serif text-base sm:text-lg font-bold text-[#f3d694] leading-tight">
                    {RESTAURANT_INFO.name}
                  </h4>
                  <p className="text-[11px] text-emerald-200">
                    Main Road, Kralgund Qaziabad, Handwara · +91 95961 23022
                  </p>
                  <p className="text-[10px] text-[#c5a059] font-mono mt-0.5">
                    Official Tax Invoice &amp; Kitchen Order Ticket (KOT)
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase tracking-wider text-emerald-300 font-mono block">
                  ORDER REF #
                </span>
                <span className="font-mono text-base sm:text-xl font-black text-[#f3d694] block">
                  {currentOrder.orderNumber}
                </span>
                <span className="text-[10px] text-white/70 block">
                  {currentOrder.createdAt}
                </span>
              </div>
            </div>

            {/* Ticket Body Content */}
            <div className="p-4 sm:p-6 space-y-4 text-xs">
              
              {/* Customer & Fulfillment Grid */}
              <div className="grid grid-cols-2 gap-3 pb-3 border-b border-zinc-200">
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-zinc-500 block">
                    Customer Details
                  </span>
                  <span className="font-bold text-zinc-900 text-sm block">
                    {currentOrder.customerName || 'Valued Guest'}
                  </span>
                  <span className="text-[11px] font-mono text-zinc-700 block">
                    📞 {currentOrder.phone}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-zinc-500 block">
                    Fulfillment Zone
                  </span>
                  <span className="font-bold text-zinc-900 text-sm block">
                    {currentOrder.orderType === 'delivery' ? '🚗 Express Delivery' : '🛍️ Self Takeaway'}
                  </span>
                  <span className="text-[11px] font-bold text-emerald-800 block">
                    {currentOrder.deliveryArea || 'Kralgund Hub'}
                  </span>
                </div>
              </div>

              {/* Exact Delivery Address */}
              {currentOrder.orderType === 'delivery' && currentOrder.address && (
                <div className="p-2.5 bg-zinc-50 rounded-xl border border-zinc-200">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-zinc-500 block">
                    Delivery Destination Address:
                  </span>
                  <span className="font-medium text-zinc-900 block mt-0.5">
                    📍 {currentOrder.address}
                  </span>
                </div>
              )}

              {/* Kitchen Notes */}
              {currentOrder.notes && (
                <div className="p-2 bg-amber-50 rounded-lg border border-amber-200 text-amber-900 text-[11px]">
                  <strong>Kitchen Note:</strong> {currentOrder.notes}
                </div>
              )}

              {/* Itemized Table */}
              <div>
                <span className="text-[10px] uppercase tracking-wider font-bold text-zinc-500 block mb-2">
                  Itemized Dishes &amp; Pricing
                </span>

                <div className="space-y-2 border-t border-b border-zinc-200 py-2">
                  {currentOrder.items.map((cartItem, idx) => (
                    <div key={idx} className="flex items-start justify-between py-1 border-b border-zinc-100 last:border-b-0">
                      <div className="flex items-start gap-2 max-w-[75%]">
                        <span className="px-1.5 py-0.5 bg-zinc-800 text-white rounded font-mono font-bold text-[10px]">
                          {cartItem.quantity}x
                        </span>
                        <div>
                          <span className="font-bold text-zinc-900">
                            {cartItem.item.name}
                          </span>
                          {cartItem.item.portionOrSize && (
                            <span className="text-[10px] text-zinc-500 block">
                              Portion: {cartItem.item.portionOrSize}
                            </span>
                          )}
                          {cartItem.specialInstructions && (
                            <span className="text-[10px] text-zinc-500 block italic">
                              ↳ Note: {cartItem.specialInstructions}
                            </span>
                          )}
                        </div>
                      </div>

                      <span className="font-mono font-bold text-zinc-900">
                        {curr}{(cartItem.item.price * cartItem.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Totals Summary */}
              <div className="space-y-1.5 text-xs pt-1">
                <div className="flex justify-between text-zinc-600">
                  <span>Subtotal</span>
                  <span className="font-mono font-semibold">{curr}{currentOrder.subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-zinc-600">
                  <span>Delivery Service ({currentOrder.deliveryArea || 'Standard'}):</span>
                  <span className="font-mono font-semibold">
                    {currentOrder.deliveryFee === 0 ? (
                      <span className="text-emerald-700 font-bold">FREE</span>
                    ) : (
                      `${curr}${currentOrder.deliveryFee.toFixed(2)}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-zinc-600">
                  <span>Packaging &amp; Handling</span>
                  <span className="font-semibold text-emerald-700">₹0.00 (Free)</span>
                </div>

                <div className="flex justify-between font-bold text-base text-zinc-950 pt-2 border-t-2 border-dashed border-zinc-300">
                  <span className="font-serif">Grand Total Payable</span>
                  <span className="font-mono text-emerald-800 text-lg font-black">
                    {curr}{currentOrder.total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Note for Restaurant Owner */}
              <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-[11px] leading-relaxed">
                <strong className="block text-amber-950 mb-0.5">⚠️ Note for Restaurant Owner:</strong>
                <span>Please confirm this order from your side and pre-inform the customer immediately if any changes or substitutions are in the order.</span>
              </div>

              {/* QR Verification & Print Button inside ticket */}
              <div className="pt-3 border-t border-zinc-200 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 bg-white border border-zinc-200 rounded-lg">
                    <QRCodeSVG
                      value={`https://thesheltercafe.com/verify-order/${currentOrder.orderNumber}`}
                      size={54}
                      level="M"
                    />
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-wider font-bold text-zinc-500 block">
                      Kitchen Verification QR
                    </span>
                    <span className="text-[10px] text-zinc-600">Scan to verify &amp; dispatch</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-black text-white text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5 text-[#f3d694]" />
                  <span>Print Receipt</span>
                </button>
              </div>

              <div className="text-center text-[10px] text-zinc-500 pt-1 border-t border-zinc-100">
                Thank you for choosing The Shelter Cafe &amp; Resto Kralgund · Hotline: +91 95961 23022
              </div>
            </div>
          </div>
        </div>

        {/* 6. Footer: Customer Confirmation Toggle & Forward to Restaurant Owner */}
        <div className="p-4 sm:p-5 bg-gradient-to-t from-[#01060e] via-[#040f1c] to-[#071626] border-t border-white/15 space-y-3 z-20 shrink-0">
          
          {/* Customer Confirmation Banner */}
          <div className="rounded-2xl p-3.5 bg-white/[0.04] border border-[#c5a059]/40 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="space-y-0.5 text-center sm:text-left">
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#c5a059] flex items-center justify-center sm:justify-start gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Customer Side Order Confirmation</span>
              </span>
              <p className="text-xs text-white/80">
                {isCustomerConfirmed ? (
                  <span className="text-emerald-400 font-semibold flex items-center gap-1 justify-center sm:justify-start">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Confirmed by you at {confirmedTimeStr || 'Just now'} · Preparation window: ~{estimatedWindow}
                  </span>
                ) : (
                  <span>Please confirm order from your side so kitchen timing can be synchronized.</span>
                )}
              </p>
            </div>

            {!isCustomerConfirmed ? (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleCustomerConfirm}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-gradient-to-r from-[#c5a059] to-[#dfbc71] text-black font-bold text-xs uppercase tracking-wider shadow-md hover:brightness-110 transition-all cursor-pointer whitespace-nowrap"
              >
                ✓ Confirm From My Side
              </motion.button>
            ) : (
              <div className="px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 whitespace-nowrap">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Confirmed &amp; Locked</span>
              </div>
            )}
          </div>

          {/* Primary Action Button: Forward to Restaurant Owner WhatsApp (+91 95961 23022) */}
          <div className="flex flex-col sm:flex-row items-center gap-2.5">
            <button
              onClick={handleForwardToOwner}
              className="w-full sm:flex-1 py-3 px-5 rounded-full bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-[0_4px_25px_rgba(16,185,129,0.35)] transition-all cursor-pointer flex items-center justify-center gap-2 group"
            >
              {/* WhatsApp Icon */}
              <svg className="w-5 h-5 fill-current text-white shrink-0" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              <span>Forward Ticket to Resto Owner (+91 95961 23022)</span>
            </button>

            <button
              onClick={onClose}
              className="py-2.5 px-5 rounded-full border border-white/20 hover:bg-white/10 text-white/80 hover:text-white text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer"
            >
              Done / Close
            </button>
          </div>

          <div className="text-center text-[10px] text-white/50">
            Formatted Kitchen Ticket with ~{estimatedWindow} window will be sent directly to registered owner (+91 95961 23022).
          </div>
        </div>
      </motion.div>
    </div>
  );
};
