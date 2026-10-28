import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Minus, 
  Trash2, 
  ShoppingBag, 
  Clock, 
  MapPin, 
  MessageCircle, 
  Truck, 
  Store, 
  Receipt
} from 'lucide-react';
import { CartItem, OrderData } from '../types';
import { RESTAURANT_INFO, DELIVERY_AREAS, DeliveryArea } from '../data/restaurantData';
import { createOrderWhatsAppUrl } from '../utils/whatsapp';
import { saveOrderToHistory } from '../utils/orderStorage';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';

interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onOpenMenu: () => void;
  onOrderPlaced?: (order: OrderData) => void;
}

export const OrderDrawer: React.FC<OrderDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOpenMenu,
  onOrderPlaced,
}) => {
  const [orderType, setOrderType] = useState<'collection' | 'delivery'>('delivery');
  const [selectedAreaId, setSelectedAreaId] = useState<string>('kralgund-market');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  // Lock background scroll when drawer is open
  useBodyScrollLock(isOpen);

  if (!isOpen) return null;

  const curr = RESTAURANT_INFO.currency || '₹';
  const subtotal = cart.reduce((sum, item) => sum + item.item.price * item.quantity, 0);

  // Find selected delivery area
  const currentArea: DeliveryArea = 
    DELIVERY_AREAS.find((a) => a.id === selectedAreaId) || DELIVERY_AREAS[0];

  // Calculate area-specific delivery fee
  let deliveryFee = 0;
  let isFreeDeliveryApplied = false;

  if (orderType === 'delivery') {
    if (currentArea.freeAbove && subtotal >= currentArea.freeAbove) {
      deliveryFee = 0;
      isFreeDeliveryApplied = true;
    } else {
      deliveryFee = currentArea.deliveryFee;
    }
  }

  const estimatedMinutes = orderType === 'delivery' ? currentArea.estimatedMinutes : 15;
  const total = subtotal > 0 ? subtotal + deliveryFee : 0;
  const totalItemCount = cart.reduce((s, i) => s + i.quantity, 0);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const num = `TS-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: OrderData = {
      orderNumber: num,
      orderType,
      deliveryArea: orderType === 'delivery' ? currentArea.name : 'Takeaway Counter',
      customerName: customerName.trim() || 'Valued Guest',
      phone: phone.trim(),
      address: orderType === 'delivery' ? address.trim() : 'The Shelter Cafe Counter Pickup',
      notes: notes.trim() || undefined,
      items: [...cart],
      subtotal,
      deliveryFee,
      total,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      estimatedMinutes,
      customerConfirmed: true,
      confirmedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    saveOrderToHistory(newOrder);
    onClose();
    if (onOrderPlaced) {
      onOrderPlaced(newOrder);
    }
  };

  const handleDirectWhatsAppOrder = () => {
    if (cart.length === 0) return;
    const num = `TS-${Math.floor(1000 + Math.random() * 9000)}`;
    const directOrder: OrderData = {
      orderNumber: num,
      orderType,
      deliveryArea: orderType === 'delivery' ? currentArea.name : 'Takeaway Counter',
      customerName: customerName.trim() || 'Valued Guest',
      phone: phone.trim() || 'WhatsApp Guest',
      address: orderType === 'delivery' ? address.trim() : 'The Shelter Cafe Counter Pickup',
      notes: notes.trim() || undefined,
      items: [...cart],
      subtotal,
      deliveryFee,
      total,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      estimatedMinutes,
      customerConfirmed: true,
      confirmedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    saveOrderToHistory(directOrder);

    const url = createOrderWhatsAppUrl(cart, {
      orderNumber: num,
      orderType,
      deliveryArea: orderType === 'delivery' ? currentArea.name : 'Takeaway Counter',
      customerName: customerName.trim() || 'Valued Guest',
      phone: phone.trim(),
      address: orderType === 'delivery' ? address.trim() : undefined,
      notes: notes.trim() || undefined,
      deliveryFee,
      estimatedMinutes,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Your Bag"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[105] overflow-hidden bg-black/75 backdrop-blur-md flex justify-end animate-in fade-in duration-300 touch-none"
    >
      <div className="w-full max-w-lg bg-[#0c0c0c]/98 backdrop-blur-2xl text-white h-full flex flex-col shadow-2xl relative border-l border-white/15 animate-in slide-in-from-right duration-300">
        
        {/* Luminous Monochromatic Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 bg-black/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white shadow-sm">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                <span>Your Dining Bag</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/10 text-white font-mono border border-white/20">
                  {totalItemCount} {totalItemCount === 1 ? 'item' : 'items'}
                </span>
              </h3>
              <p className="text-[11px] text-white/50 font-sans tracking-wide">
                The Shelter Cafe &amp; Resto · Kralgund Qaziabad
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close bag"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Fulfillment Mode Switcher: Monochromatic Segmented Control */}
        <div className="p-3 bg-white/[0.02] border-b border-white/10">
          <div className="grid grid-cols-2 gap-2 bg-white/[0.04] p-1.5 rounded-2xl border border-white/10">
            <button
              type="button"
              onClick={() => setOrderType('delivery')}
              className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                orderType === 'delivery'
                  ? 'bg-white text-black shadow-sm font-extrabold'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Truck className="w-4 h-4" />
              <span>Express Delivery</span>
            </button>

            <button
              type="button"
              onClick={() => setOrderType('collection')}
              className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                orderType === 'collection'
                  ? 'bg-white text-black shadow-sm font-extrabold'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Store className="w-4 h-4" />
              <span>Counter Takeaway</span>
            </button>
          </div>
        </div>

        {/* Drawer Body Scroll with Balanced Composition & Negative Space */}
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain touch-pan-y p-4 sm:p-5 space-y-5 custom-scrollbar pb-36">
          {cart.length === 0 ? (
            <div className="h-full min-h-[350px] flex flex-col items-center justify-center text-center p-8 space-y-4">
              <div className="w-20 h-20 rounded-full bg-white/[0.05] border border-white/15 flex items-center justify-center text-white/60 shadow-inner">
                <ShoppingBag className="w-9 h-9 stroke-[1.25]" />
              </div>
              <div className="space-y-1">
                <h4 className="font-serif text-xl font-bold text-white">Your Bag is Empty</h4>
                <p className="text-xs text-white/50 max-w-xs leading-relaxed">
                  Explore our authentic woodfired pizzas, Kashmiri Kanties, sizzling combos, and fresh thickshakes.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenMenu();
                }}
                className="glass-btn-primary rounded-full px-6 py-2.5 text-xs uppercase tracking-wider font-extrabold text-black cursor-pointer active:scale-95 transition-all mt-2"
              >
                Explore Menu
              </button>
            </div>
          ) : (
            <>
              {/* 1. Itemized List of Dishes (Frosted Glass Cards) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-white/60">
                    Dishes in Your Bag
                  </span>
                  <button
                    onClick={onClearCart}
                    className="text-[11px] text-white/50 hover:text-white font-medium cursor-pointer underline transition-colors"
                  >
                    Clear Bag
                  </button>
                </div>

                {cart.map((cartItem) => (
                  <div
                    key={cartItem.item.id}
                    className="bg-white/[0.04] hover:bg-white/[0.06] p-3.5 rounded-2xl flex items-center justify-between gap-3 border border-white/10 transition-all"
                  >
                    {cartItem.item.imageUrl && (
                      <img
                        src={cartItem.item.imageUrl}
                        alt={cartItem.item.name}
                        className="w-14 h-14 rounded-xl object-cover border border-white/15 shrink-0"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-2">
                        <p className="font-medium text-sm text-white truncate">
                          {cartItem.item.name}
                        </p>
                        <span className="font-bold text-xs tabular-nums text-white">
                          {curr}{(cartItem.item.price * cartItem.quantity).toFixed(2)}
                        </span>
                      </div>

                      <p className="text-[11px] text-white/50 mt-0.5">
                        {curr}{cartItem.item.price.toFixed(2)} each {cartItem.item.portionOrSize ? `· ${cartItem.item.portionOrSize}` : ''}
                      </p>

                      {/* Quantity Stepper (Monochromatic Glass Capsule) */}
                      <div className="flex items-center gap-3 mt-2">
                        <div className="inline-flex items-center border border-white/20 rounded-lg bg-white/5 overflow-hidden">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(cartItem.item.id, -1)}
                            className="p-1 hover:bg-white/15 text-white/80 hover:text-white cursor-pointer transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-bold tabular-nums text-white">
                            {cartItem.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(cartItem.item.id, 1)}
                            className="p-1 hover:bg-white/15 text-white/80 hover:text-white cursor-pointer transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => onRemoveItem(cartItem.item.id)}
                          className="text-white/40 hover:text-white p-1 cursor-pointer transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 2. AREA-SPECIFIC DELIVERY CHARGES SELECTOR (Monochromatic Clean Glass) */}
              {orderType === 'delivery' && (
                <div className="bg-white/[0.03] p-4 rounded-2xl border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-white/80" />
                      <h4 className="text-xs uppercase tracking-wider font-bold text-white">
                        Delivery Zone &amp; Fee
                      </h4>
                    </div>
                    <span className="text-[10px] text-white/50 font-medium">
                      4 Serviceable Hubs
                    </span>
                  </div>

                  <p className="text-[11px] text-white/50 leading-relaxed">
                    Transparent delivery fees calculated based on your hub distance:
                  </p>

                  <div className="space-y-2">
                    {DELIVERY_AREAS.filter((a) => a.id !== 'self-pickup').map((area) => {
                      const isSelected = selectedAreaId === area.id;
                      const isFreeForThisArea = area.freeAbove && subtotal >= area.freeAbove;

                      return (
                        <div
                          key={area.id}
                          onClick={() => setSelectedAreaId(area.id)}
                          className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                            isSelected
                              ? 'bg-white/15 text-white border-white/40 shadow-sm ring-1 ring-white/30'
                              : 'bg-white/[0.03] hover:bg-white/[0.06] border-white/10 text-white/70'
                          }`}
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-xs text-white">{area.name}</span>
                              {isFreeForThisArea && (
                                <span className="px-2 py-0.5 rounded-full bg-white text-black text-[9px] font-black uppercase tracking-wider">
                                  Free
                                </span>
                              )}
                            </div>
                            <p className="text-[10px] mt-0.5 text-white/50">
                              {area.description}
                            </p>
                            <div className="flex items-center gap-2 mt-1 text-[10px] text-white/50">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3 text-white/70" />
                                <span>~{area.estimatedMinutes} mins</span>
                              </span>
                              {area.freeAbove && !isFreeForThisArea && (
                                <span>
                                  (Free over {curr}{area.freeAbove})
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <span className="text-sm font-black tabular-nums block text-white">
                              {isFreeForThisArea ? 'FREE' : `${curr}${area.deliveryFee}`}
                            </span>
                            <span className="text-[9px] uppercase font-medium block text-white/50">
                              Delivery Fee
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 3. Customer Details & Delivery Address Form (Minimalist Smooth Glass Inputs) */}
              <form id="checkout-form" onSubmit={handleCheckout} className="space-y-3 bg-white/[0.03] p-4 rounded-2xl border border-white/10">
                <h4 className="text-xs uppercase tracking-wider font-bold text-white flex items-center justify-between">
                  <span>Contact &amp; Delivery Details</span>
                  <span className="text-[10px] text-white/60 font-semibold flex items-center gap-1">
                    <MessageCircle className="w-3 h-3 text-white/80" /> Dispatched to WhatsApp
                  </span>
                </h4>

                <div>
                  <label className="text-[10px] uppercase font-bold text-white/60 block mb-1 tracking-wider">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Tariq Ahmad"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 text-xs text-white placeholder:text-white/30 focus:border-white focus:bg-white/[0.06] focus:ring-1 focus:ring-white/30 bg-white/[0.03] transition-all outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-white/60 block mb-1 tracking-wider">
                    Contact Phone Number (For WhatsApp Updates) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +91 97970 00000"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 text-xs text-white placeholder:text-white/30 focus:border-white focus:bg-white/[0.06] focus:ring-1 focus:ring-white/30 bg-white/[0.03] transition-all outline-none"
                  />
                </div>

                {orderType === 'delivery' && (
                  <div>
                    <label className="text-[10px] uppercase font-bold text-white/60 block mb-1 tracking-wider">
                      Exact Delivery Address in {currentArea.name} *
                    </label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder={`House / Landmark near ${currentArea.name}...`}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 text-xs text-white placeholder:text-white/30 focus:border-white focus:bg-white/[0.06] focus:ring-1 focus:ring-white/30 bg-white/[0.03] transition-all outline-none"
                    />
                  </div>
                )}

                <div>
                  <label className="text-[10px] uppercase font-bold text-white/60 block mb-1 tracking-wider">
                    Kitchen Instructions / Spice Level / Cutlery (Optional)
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Extra spicy, no onions, extra napkins..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 text-xs text-white placeholder:text-white/30 focus:border-white focus:bg-white/[0.06] focus:ring-1 focus:ring-white/30 bg-white/[0.03] transition-all outline-none"
                  />
                </div>
              </form>

              {/* 4. Billing Breakdown (Luminous Monochromatic Glass Card) */}
              <div className="bg-black/50 text-white p-4 rounded-2xl space-y-2 text-xs border border-white/15">
                <div className="flex justify-between text-white/70">
                  <span>Dishes Subtotal:</span>
                  <span className="font-mono font-bold text-white">{curr}{subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-white/70 items-center">
                  <span>
                    {orderType === 'delivery'
                      ? `Delivery Fee (${currentArea.name}):`
                      : 'Delivery Fee (Self-Pickup):'}
                  </span>
                  <span className="font-mono font-bold">
                    {orderType === 'delivery' ? (
                      deliveryFee === 0 ? (
                        <span className="text-white font-black underline">FREE</span>
                      ) : (
                        `${curr}${deliveryFee.toFixed(2)}`
                      )
                    ) : (
                      <span className="text-white font-black">FREE</span>
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-white/70">
                  <span>Kitchen Packaging &amp; Sanitization:</span>
                  <span className="font-bold text-white">FREE</span>
                </div>

                <div className="flex justify-between border-t border-white/15 pt-2.5 font-bold text-base text-white">
                  <span className="font-serif">Grand Total:</span>
                  <span className="font-mono text-white text-xl font-black">{curr}{total.toFixed(2)}</span>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] text-white/50 pt-1">
                  <Clock className="w-3 h-3 text-white/70" />
                  <span>Estimated time to table/door: ~{estimatedMinutes} mins</span>
                </div>
              </div>

              {/* 5. Checkout Actions */}
              <div className="space-y-2.5 pt-1 pb-safe">
                <button
                  type="submit"
                  form="checkout-form"
                  className="w-full py-3.5 px-4 rounded-full glass-btn-primary hover:brightness-105 active:scale-[0.98] text-black font-extrabold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Receipt className="w-4 h-4 text-black" />
                  <span>Generate Official Ticket &amp; Send ({curr}{total.toFixed(2)})</span>
                </button>

                <button
                  type="button"
                  onClick={handleDirectWhatsAppOrder}
                  className="w-full py-2.5 px-4 rounded-full glass-btn-secondary text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all hover:bg-white/20"
                >
                  <MessageCircle className="w-4 h-4 text-white" />
                  <span>Quick Order on WhatsApp directly</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
