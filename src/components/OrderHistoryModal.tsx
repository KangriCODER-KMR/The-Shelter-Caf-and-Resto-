import React, { useState, useEffect } from 'react';
import { 
  History, 
  RotateCcw, 
  ShoppingBag, 
  X, 
  Clock, 
  Truck, 
  Store, 
  ChevronRight, 
  ArrowRight, 
  Receipt, 
  CheckCircle2, 
  Trash2, 
  ExternalLink, 
  Sparkles, 
  Smartphone, 
  ShieldCheck,
  MessageCircle
} from 'lucide-react';
import { OrderData, CartItem } from '../types';
import { getOrderHistory, removeOrderFromHistory, clearOrderHistory } from '../utils/orderStorage';
import { createOrderWhatsAppUrl } from '../utils/whatsapp';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';

interface OrderHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReorder: (items: CartItem[]) => void;
  onViewOrderTicket?: (order: OrderData) => void;
  onOpenMenu: () => void;
}

export const OrderHistoryModal: React.FC<OrderHistoryModalProps> = ({
  isOpen,
  onClose,
  onReorder,
  onViewOrderTicket,
  onOpenMenu,
}) => {
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null);
  const [reorderSuccessMsg, setReorderSuccessMsg] = useState<string | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Strictly lock background body scroll
  useBodyScrollLock(isOpen);

  // Load orders on open and listen to live storage updates
  useEffect(() => {
    if (isOpen) {
      setOrders(getOrderHistory());
      setShowClearConfirm(false);
    }

    const handleUpdate = (e: Event) => {
      const custom = e as CustomEvent<OrderData[]>;
      if (custom.detail) {
        setOrders(custom.detail);
      } else {
        setOrders(getOrderHistory());
      }
    };

    window.addEventListener('shelter_order_history_updated', handleUpdate);
    return () => window.removeEventListener('shelter_order_history_updated', handleUpdate);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleReorderClick = (order: OrderData) => {
    if (!order.items || order.items.length === 0) return;
    onReorder(order.items);
    setReorderSuccessMsg(`Added ${order.items.length} items to your Bag!`);
    setTimeout(() => {
      setReorderSuccessMsg(null);
      onClose();
    }, 800);
  };

  const handleDelete = (orderNumber: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = removeOrderFromHistory(orderNumber);
    setOrders(updated);
    if (selectedOrder?.orderNumber === orderNumber) {
      setSelectedOrder(null);
    }
  };

  const handleClearAll = () => {
    clearOrderHistory();
    setOrders([]);
    setSelectedOrder(null);
    setShowClearConfirm(false);
  };

  const handleShareWhatsApp = (order: OrderData, e: React.MouseEvent) => {
    e.stopPropagation();
    const url = createOrderWhatsAppUrl(order.items, {
      orderNumber: order.orderNumber,
      orderType: order.orderType,
      deliveryArea: order.deliveryArea,
      customerName: order.customerName,
      phone: order.phone,
      address: order.address,
      notes: order.notes,
      deliveryFee: order.deliveryFee,
      estimatedMinutes: order.estimatedMinutes,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const curr = RESTAURANT_INFO.currency || '₹';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Order History & Re-order"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[105] flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300 touch-none"
    >
      {/* iOS Liquid Glass Container */}
      <div className="relative w-full max-w-2xl bg-[#0c140f]/95 border border-emerald-500/25 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.8),inset_0_1.5px_2px_rgba(255,255,255,0.25)] flex flex-col h-[94dvh] sm:h-auto max-h-[94dvh] sm:max-h-[85vh] overflow-hidden text-white backdrop-blur-2xl">
        
        {/* Top iOS Specular Convex Reflection */}
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-emerald-400/15 via-white/5 to-transparent pointer-events-none rounded-t-3xl" />

        {/* Header Bar */}
        <div className="relative z-10 px-5 sm:px-6 py-4 border-b border-white/10 flex items-center justify-between shrink-0 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500/30 to-emerald-500/30 border border-amber-400/40 flex items-center justify-center shadow-inner">
              <History className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-white tracking-tight">
                  Past Orders & Re-Order
                </h3>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  {orders.length} {orders.length === 1 ? 'Order' : 'Orders'}
                </span>
              </div>
              <p className="text-[11px] text-white/60 flex items-center gap-1.5 mt-0.5">
                <Smartphone className="w-3 h-3 text-emerald-400 shrink-0" />
                <span>Saved locally on this device · Quick 1-tap re-order</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {orders.length > 0 && !showClearConfirm && (
              <button
                onClick={() => setShowClearConfirm(true)}
                className="text-[11px] text-white/50 hover:text-rose-300 transition-colors px-2 py-1 rounded-lg hover:bg-white/5"
                title="Clear order history"
              >
                Clear All
              </button>
            )}

            {showClearConfirm && (
              <div className="flex items-center gap-1.5 bg-rose-950/70 border border-rose-500/30 rounded-xl px-2 py-1 text-[11px]">
                <span className="text-rose-200">Clear?</span>
                <button
                  onClick={handleClearAll}
                  className="font-bold text-rose-400 hover:text-white px-1.5 py-0.5 rounded bg-rose-900/60"
                >
                  Yes
                </button>
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="text-white/60 hover:text-white px-1"
                >
                  Cancel
                </button>
              </div>
            )}

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer active:scale-90"
              aria-label="Close history modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Feedback Alert Pill */}
        {reorderSuccessMsg && (
          <div className="mx-6 mt-3 p-3 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 flex items-center gap-2 text-xs font-bold animate-in fade-in duration-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{reorderSuccessMsg} Opening your dining bag...</span>
          </div>
        )}

        {/* Main Content Area */}
        <div className="relative z-10 flex-1 min-h-0 overflow-y-auto overscroll-contain touch-pan-y p-4 sm:p-6 space-y-4 pb-20 custom-scrollbar">
          
          {/* Storage Explanation Banner */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-black/40 to-amber-950/50 border border-emerald-500/20 flex items-start gap-3 text-xs">
            <div className="p-2 rounded-xl bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 shrink-0 mt-0.5">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="space-y-0.5 text-white/80 leading-relaxed">
              <p className="font-semibold text-white text-[12px] flex items-center gap-1.5">
                <span>Where are your orders saved?</span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-white/10 text-emerald-300">
                  Phone Storage (localStorage)
                </span>
              </p>
              <p className="text-[11px] text-white/70">
                All order tickets are stored directly in your phone&apos;s browser memory. They stay here persistently even if you close the app or restart your phone, so you can easily re-order your favorite meals anytime with 1 tap.
              </p>
            </div>
          </div>

          {/* If No Orders Yet */}
          {orders.length === 0 ? (
            <div className="py-12 sm:py-16 text-center space-y-4 flex flex-col items-center">
              <div className="w-16 h-16 rounded-3xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-white/40 shadow-inner">
                <Clock className="w-8 h-8 stroke-[1.5] text-amber-300/60" />
              </div>
              <div className="space-y-1.5 max-w-sm">
                <h4 className="font-serif text-lg sm:text-xl font-bold text-white">
                  No Past Orders on this Device
                </h4>
                <p className="text-xs text-white/60 leading-relaxed">
                  When you order woodfired pizzas, Kashmiri Kanties, or drinks, your order receipts will appear here so you can re-order with a single tap.
                </p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onOpenMenu();
                }}
                className="mt-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 text-stone-950 font-black text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(245,158,11,0.35)] hover:brightness-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-stone-950" />
                <span>Explore Menu &amp; Order Now</span>
              </button>
            </div>
          ) : (
            /* Orders Listing */
            <div className="space-y-3.5">
              {orders.map((order) => {
                const totalItemsCount = order.items.reduce((acc, it) => acc + it.quantity, 0);

                return (
                  <div
                    key={order.orderNumber}
                    className="group bg-white/[0.04] hover:bg-white/[0.07] border border-white/15 hover:border-emerald-500/40 rounded-2xl sm:rounded-3xl p-4 sm:p-5 transition-all duration-300 shadow-lg relative overflow-hidden"
                  >
                    {/* Subtle colorful edge glow */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 relative z-10">
                      
                      {/* Left: Order Info & Metadata */}
                      <div className="space-y-2 flex-1 min-w-0">
                        <div className="flex items-center flex-wrap gap-2">
                          <span className="font-mono font-black text-xs sm:text-sm text-amber-300 bg-amber-400/15 border border-amber-400/30 px-2.5 py-0.5 rounded-full">
                            #{order.orderNumber}
                          </span>

                          <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                            order.orderType === 'delivery'
                              ? 'bg-sky-500/15 text-sky-300 border-sky-400/30'
                              : 'bg-emerald-500/15 text-emerald-300 border-emerald-400/30'
                          }`}>
                            {order.orderType === 'delivery' ? (
                              <>
                                <Truck className="w-3 h-3" />
                                <span>Delivery · {order.deliveryArea || 'Home'}</span>
                              </>
                            ) : (
                              <>
                                <Store className="w-3 h-3" />
                                <span>Counter Takeaway</span>
                              </>
                            )}
                          </span>

                          <span className="text-[11px] text-white/50 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-white/40" />
                            <span>{order.createdAt}</span>
                          </span>
                        </div>

                        {/* Customer & Address if available */}
                        <div className="text-xs text-white/80">
                          <span className="font-semibold text-white">{order.customerName}</span>
                          {order.phone && <span className="text-white/50"> · {order.phone}</span>}
                          {order.address && (
                            <p className="text-[11px] text-white/60 truncate mt-0.5">
                              📍 {order.address}
                            </p>
                          )}
                        </div>

                        {/* Dishes Overview List */}
                        <div className="bg-black/40 rounded-xl p-2.5 border border-white/10 space-y-1.5 mt-2">
                          <div className="text-[10px] uppercase font-bold text-white/40 tracking-wider flex justify-between">
                            <span>Dishes Ordered ({totalItemsCount} items)</span>
                            <span>Price</span>
                          </div>

                          <div className="space-y-1 max-h-32 overflow-y-auto pr-1">
                            {order.items.map((cartItem, idx) => (
                              <div
                                key={`${order.orderNumber}-item-${idx}`}
                                className="flex items-center justify-between text-xs text-white/90"
                              >
                                <div className="flex items-center gap-2 truncate">
                                  <span className="font-mono text-emerald-300 font-bold text-[11px] bg-emerald-500/20 px-1.5 py-0.2 rounded shrink-0">
                                    {cartItem.quantity}x
                                  </span>
                                  <span className="truncate">{cartItem.item.name}</span>
                                  {cartItem.item.portionOrSize && (
                                    <span className="text-[10px] text-white/50 shrink-0">
                                      ({cartItem.item.portionOrSize})
                                    </span>
                                  )}
                                </div>
                                <span className="font-mono font-bold text-white/80 text-xs shrink-0 ml-2">
                                  {curr}{(cartItem.item.price * cartItem.quantity).toFixed(2)}
                                </span>
                              </div>
                            ))}
                          </div>

                          {order.deliveryFee > 0 && (
                            <div className="pt-1 border-t border-white/10 flex justify-between text-[11px] text-white/60">
                              <span>Delivery Fee ({order.deliveryArea}):</span>
                              <span className="font-mono">{curr}{order.deliveryFee.toFixed(2)}</span>
                            </div>
                          )}

                          <div className="pt-1.5 border-t border-white/15 flex justify-between items-baseline font-bold text-sm text-white">
                            <span className="font-serif">Order Total:</span>
                            <span className="font-mono text-amber-300 text-base font-black">
                              {curr}{order.total.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Quick Action Controls */}
                      <div className="flex sm:flex-col items-center justify-end gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10">
                        {/* 1-Tap Re-Order Button (Dominant Colorful Jewel CTA) */}
                        <button
                          onClick={() => handleReorderClick(order)}
                          className="flex-1 sm:flex-none px-4 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-400 text-stone-950 font-black text-xs uppercase tracking-wider shadow-[0_4px_16px_rgba(16,185,129,0.35)] hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                          title="Re-order all items from this meal"
                        >
                          <RotateCcw className="w-3.5 h-3.5 text-stone-950 stroke-[2.5]" />
                          <span>Re-Order Meal</span>
                        </button>

                        <div className="flex items-center gap-1.5">
                          {/* WhatsApp Resend Button */}
                          <button
                            onClick={(e) => handleShareWhatsApp(order, e)}
                            className="p-2 rounded-xl bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 hover:bg-emerald-500/25 transition-all cursor-pointer active:scale-90"
                            title="Resend official kitchen ticket to WhatsApp"
                            aria-label="Resend ticket on WhatsApp"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </button>

                          {/* View Ticket / Track Button */}
                          {onViewOrderTicket && (
                            <button
                              onClick={() => {
                                onViewOrderTicket(order);
                                onClose();
                              }}
                              className="p-2 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all cursor-pointer active:scale-90"
                              title="View interactive delivery ticket"
                              aria-label="View interactive ticket"
                            >
                              <Receipt className="w-4 h-4" />
                            </button>
                          )}

                          {/* Delete Item from History */}
                          <button
                            onClick={(e) => handleDelete(order.orderNumber, e)}
                            className="p-2 rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-rose-400 hover:bg-rose-500/10 transition-all cursor-pointer active:scale-90"
                            title="Remove from history"
                            aria-label="Remove order"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>

        {/* Footer Area */}
        <div className="relative z-10 px-5 sm:px-6 py-3.5 border-t border-white/10 bg-white/[0.02] flex items-center justify-between text-xs text-white/60">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span className="text-[11px]">The Shelter Cafe &amp; Resto · Kralgund Handwara</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs cursor-pointer active:scale-95 transition-all"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
