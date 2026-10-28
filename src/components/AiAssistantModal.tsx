import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Sparkles,
  Send,
  MapPin,
  Phone,
  MessageCircle,
  Calendar,
  UtensilsCrossed,
  ShoppingBag,
  ExternalLink,
  RotateCcw,
  Bot,
  User,
  Compass,
} from 'lucide-react';
import { RESTAURANT_INFO, WHATSAPP_CONFIG, DELIVERY_AREAS } from '../data/restaurantData';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  actions?: Array<{
    label: string;
    action: () => void;
    icon?: React.ElementType;
    isExternal?: boolean;
    href?: string;
  }>;
}

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenMenu: () => void;
  onOpenReservation: () => void;
  onOpenOrder: () => void;
}

const QUICK_SUGGESTIONS = [
  { label: '📍 Location & Coordinates', query: 'What is your exact location and GPS coordinates?' },
  { label: '📞 Phone & WhatsApp', query: 'What is the restaurant phone number and WhatsApp contact?' },
  { label: '🚚 Delivery Areas & Rates', query: 'What are the delivery charges for Kralgund and Supernaghama?' },
  { label: '🍲 Wazwan & Kanties', query: 'Tell me about your Kashmiri Wazwan and Kanties specialties.' },
  { label: '🍕 Pizzas & Combos', query: 'What are the best pizzas and family combos available?' },
  { label: '🪑 Reserve a Table', query: 'How can I reserve a table or private family cabin?' },
  { label: '⏰ Timings & Hours', query: 'What are your opening hours for lunch and dinner?' },
];

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  isOpen,
  onClose,
  onOpenMenu,
  onOpenReservation,
  onOpenOrder,
}) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Strictly lock background body scroll when AI modal is open
  useBodyScrollLock(isOpen);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const initialWelcomeText = `Khushamdeed! I am your AI Dining Concierge for **The Shelter Cafe & Resto**, Kralgund Qaziabad.

I am delighted to assist you with:
• **Dishes & Pricing:** Handcrafted pizzas, Wazwan Biryani, Kanties, Combos, Momos & Shakes
• **Location & Directions:** GPS Coordinates (\`34.3559051° N, 74.3483628° E\`) along Kupwara Highway
• **Delivery Services:** Charges for Kralgund Market (₹20), Supernaghama (₹40), Outside Qaziabad (₹60)
• **Instant Contact:** +91 95961 23022 for WhatsApp orders & phone inquiries
• **Table Reservations:** Private family cabins, booths & celebrations

How may I assist your dining experience today?`;

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: initialWelcomeText,
      timestamp: 'Just now',
      actions: [
        {
          label: 'View Menu',
          action: () => {
            onClose();
            setTimeout(onOpenMenu, 150);
          },
          icon: UtensilsCrossed,
        },
        {
          label: 'Reserve Table',
          action: () => {
            onClose();
            setTimeout(onOpenReservation, 150);
          },
          icon: Calendar,
        },
        {
          label: 'Google Maps',
          action: () => window.open(RESTAURANT_INFO.googleMapsUrl, '_blank'),
          icon: Compass,
          isExternal: true,
        },
      ],
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 200);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, messages]);

  // Client-side grounded fallback engine
  const getLocalKnowledgeResponse = (userQuery: string): { text: string; actions?: Message['actions'] } => {
    const q = userQuery.toLowerCase();

    if (
      q.includes('coordinate') ||
      q.includes('gps') ||
      q.includes('lat') ||
      q.includes('map') ||
      q.includes('where is') ||
      q.includes('location') ||
      q.includes('address') ||
      q.includes('kralgund')
    ) {
      return {
        text: `The Shelter Cafe & Resto is located at **Main Road, Kralgund Qaziabad, Handwara, Kupwara District, Jammu & Kashmir 193302**.\n\n📍 **Exact GPS Coordinates:** \`34.3559051° N, 74.3483628° E\` (Decimal: 34.3559051, 74.3483628)\n\nWe are conveniently located along the Kupwara Highway right near the Kralgund Market & Bridge.`,
        actions: [
          {
            label: 'Open in Google Maps',
            action: () => window.open(RESTAURANT_INFO.googleMapsUrl, '_blank'),
            icon: Compass,
            isExternal: true,
          },
          {
            label: 'Call Resto for Directions',
            action: () => window.open(RESTAURANT_INFO.phoneHref, '_self'),
            icon: Phone,
          },
        ],
      };
    }

    if (
      q.includes('phone') ||
      q.includes('number') ||
      q.includes('call') ||
      q.includes('contact') ||
      q.includes('whatsapp') ||
      q.includes('mobile')
    ) {
      return {
        text: `You can reach our official team directly at:\n\n📞 **Call & Phone Orders:** **+91 95961 23022**\n💬 **WhatsApp Line:** **+91 95961 23022**\n✉️ **Email:** theshelterresto@gmail.com\n\nOur kitchen and helpline are live daily from **09:30 AM to 10:30 PM**.`,
        actions: [
          {
            label: 'Call +91 95961 23022',
            action: () => window.open(RESTAURANT_INFO.phoneHref, '_self'),
            icon: Phone,
          },
          {
            label: 'Chat on WhatsApp',
            action: () =>
              window.open(
                `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodeURIComponent(
                  'Hello The Shelter Cafe & Resto Kralgund! I have an inquiry.'
                )}`,
                '_blank'
              ),
            icon: MessageCircle,
            isExternal: true,
          },
        ],
      };
    }

    if (
      q.includes('delivery') ||
      q.includes('fee') ||
      q.includes('charge') ||
      q.includes('supernaghama') ||
      q.includes('area') ||
      q.includes('serviceable')
    ) {
      const areaList = DELIVERY_AREAS.map(
        (a) =>
          `• **${a.name}:** ₹${a.deliveryFee}${a.freeAbove ? ` *(Free above ₹${a.freeAbove})*` : ''} — Est. ~${a.estimatedMinutes} mins`
      ).join('\n');

      return {
        text: `We provide live doorstep delivery across the surrounding localities:\n\n${areaList}\n\nWhen you place your order through our digital Bag, the delivery fee is automatically applied as per your chosen destination!`,
        actions: [
          { label: 'View Menu & Order', action: onOpenMenu, icon: UtensilsCrossed },
          { label: 'Open Bag', action: onOpenOrder, icon: ShoppingBag },
        ],
      };
    }

    if (
      q.includes('reserve') ||
      q.includes('table') ||
      q.includes('cabin') ||
      q.includes('booking') ||
      q.includes('seat')
    ) {
      return {
        text: `Reserving your table at The Shelter is seamless and instant:\n\n• **Family Dining Cabins:** Private, family-friendly partitions with namaz/prayer room accessibility.\n• **Couple & Cozy Booths:** Relaxed ambient seating.\n• **Lawn & Outdoor Terrace:** Scenic mountain-breeze dining along the highway.\n\nYou can book directly through our reservation system or call our host at **+91 95961 23022**.`,
        actions: [
          { label: 'Reserve Table Now', action: onOpenReservation, icon: Calendar },
          {
            label: 'Call Resto (+91 95961 23022)',
            action: () => window.open(RESTAURANT_INFO.phoneHref, '_self'),
            icon: Phone,
          },
        ],
      };
    }

    if (
      q.includes('wazwan') ||
      q.includes('kanti') ||
      q.includes('biryani') ||
      q.includes('rista') ||
      q.includes('kabab')
    ) {
      return {
        text: `Here are our crowned Kashmiri Wazwan & Kanti specialties:\n\n• **Wazwan Biryani:** Half ₹350 | Full ₹650 (Dum-cooked aged basmati layered with succulent mutton)\n• **Chicken Kanti:** Half ₹350 | Full ₹650 (Boneless chicken tossed in spices, crisp onions & tomatoes)\n• **Rista Kanti:** Half ₹260 | Full ₹520 (Spiced pounded meatballs flash-fried with mountain spices)\n• **Kabab Kanti:** Half ₹260 | Full ₹520 (Charcoal seekh kebabs tossed in tangy red sauce)\n• **Spicy Rista + Kabab Kanti:** ₹400 (The grand signature duo)\n• **Shelter Special Biryani:** Half ₹199 | Full ₹399`,
        actions: [
          { label: 'Browse Full Menu', action: onOpenMenu, icon: UtensilsCrossed },
          { label: 'Open Bag', action: onOpenOrder, icon: ShoppingBag },
        ],
      };
    }

    if (
      q.includes('combo') ||
      q.includes('deal') ||
      q.includes('chicken lover') ||
      q.includes('desi delight')
    ) {
      return {
        text: `Our chef-curated combos offer the best feast and value:\n\n• **Chicken Lover Combo (₹750):** Half Butter Chicken, 3 Rumali Rotis, Chicken Nuggets, Peri-Peri Fries & Chilled Beverage.\n• **Desi Delight Combo (₹590):** Charcoal Tandoori Half, Half Biryani, Crispy Fries, Cold Drink & Dessert.\n• **Chinese Combo (₹599):** Fried Rice, Half Chilli Chicken, Kathi Roll & Cold Drink.\n• **Classic Combo (₹519):** Small Stone-Baked Pizza, Chicken Roll, Fries, Drink & Dessert.\n• **Pizza Lovers Combo (₹350):** Small Pizza, Fries & Cold Drink.`,
        actions: [
          { label: 'Explore Combos in Menu', action: onOpenMenu, icon: UtensilsCrossed },
          { label: 'Order via WhatsApp', action: onOpenOrder, icon: MessageCircle },
        ],
      };
    }

    if (
      q.includes('pizza') ||
      q.includes('burger') ||
      q.includes('roll') ||
      q.includes('momo') ||
      q.includes('shake')
    ) {
      return {
        text: `Our cafe offerings are prepared fresh upon order:\n\n• **Chef Special Pizza:** Small ₹260 | Med ₹400 | Large ₹700\n• **Butter Chicken Pizza:** Small ₹230 | Med ₹380 | Large ₹600\n• **Margherita Pizza:** Small ₹150 | Med ₹280 | Large ₹450\n• **Peri-Peri Chicken Roll:** ₹160 | **Cheese & Chicken Roll:** ₹180\n• **Afghani Momos:** ₹149 | **Tandoori Momos:** ₹149\n• **Almond & Dates Shake:** ₹200 | **Kitkat / Oreo Shake:** ₹120–₹130`,
        actions: [
          { label: 'View All Menu Items', action: onOpenMenu, icon: UtensilsCrossed },
          { label: 'Open Bag', action: onOpenOrder, icon: ShoppingBag },
        ],
      };
    }

    if (q.includes('hour') || q.includes('time') || q.includes('timing') || q.includes('open')) {
      return {
        text: `The Shelter Cafe & Resto is open **Monday through Sunday**:\n\n🕒 **Operating Hours:** 09:30 AM – 10:30 PM\n🍱 **Lunch Hours:** 12:00 PM – 04:00 PM\n🌙 **Dinner Hours:** 06:00 PM – 10:30 PM\n\nTakeaway and home delivery orders are dispatched continuously throughout the day!`,
        actions: [
          { label: 'Book Table', action: onOpenReservation, icon: Calendar },
          { label: 'Order Food', action: onOpenMenu, icon: UtensilsCrossed },
        ],
      };
    }

    // Default polite response
    return {
      text: `Khushamdeed! I am delighted to help you with any questions about **The Shelter Cafe & Resto** in Kralgund Qaziabad.\n\nYou can ask me about:\n• **Dishes & Prices:** Pizzas, Wazwan Biryani, Kanties, Combos, Momos & Shakes\n• **Location & Directions:** GPS (\`34.3559051° N, 74.3483628° E\`) along Kupwara Highway\n• **Delivery Fees:** Kralgund (₹20), Supernaghama (₹40), Outside Market (₹60)\n• **Contact:** Call/WhatsApp at **+91 95961 23022**\n• **Table Reservation:** Family cabins & event bookings\n\nHow can I help you right now?`,
      actions: [
        { label: 'Explore Menu', action: onOpenMenu, icon: UtensilsCrossed },
        { label: 'Reserve Table', action: onOpenReservation, icon: Calendar },
        { label: 'Call Resto', action: () => window.open(RESTAURANT_INFO.phoneHref, '_self'), icon: Phone },
      ],
    };
  };

  const handleSend = async (messageText?: string) => {
    const textToSend = (messageText || input).trim();
    if (!textToSend || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Attempt server-side Gemini endpoint
      const response = await fetch('/api/concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: messages.map((m) => ({
            role: m.sender === 'user' ? 'user' : 'model',
            text: m.text,
          })),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.reply) {
          const groundedActions: Message['actions'] = [];
          const lower = textToSend.toLowerCase() + ' ' + data.reply.toLowerCase();

          if (lower.includes('map') || lower.includes('coordinate') || lower.includes('gps') || lower.includes('location')) {
            groundedActions.push({
              label: 'Google Maps',
              action: () => window.open(RESTAURANT_INFO.googleMapsUrl, '_blank'),
              icon: Compass,
              isExternal: true,
            });
          }
          if (lower.includes('reserve') || lower.includes('table') || lower.includes('cabin')) {
            groundedActions.push({ label: 'Reserve Table', action: onOpenReservation, icon: Calendar });
          }
          if (lower.includes('menu') || lower.includes('pizza') || lower.includes('biryani') || lower.includes('dish') || lower.includes('price')) {
            groundedActions.push({ label: 'Explore Menu', action: onOpenMenu, icon: UtensilsCrossed });
          }
          if (lower.includes('order') || lower.includes('bag') || lower.includes('delivery')) {
            groundedActions.push({ label: 'View Bag', action: onOpenOrder, icon: ShoppingBag });
          }
          if (lower.includes('whatsapp') || lower.includes('phone') || lower.includes('call')) {
            groundedActions.push({
              label: 'Call Resto',
              action: () => window.open(RESTAURANT_INFO.phoneHref, '_self'),
              icon: Phone,
            });
          }

          const assistantMessage: Message = {
            id: `assistant-${Date.now()}`,
            sender: 'assistant',
            text: data.reply,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            actions: groundedActions.length > 0 ? groundedActions : undefined,
          };

          setMessages((prev) => [...prev, assistantMessage]);
          setIsLoading(false);
          return;
        }
      }
    } catch {
      // Fetch failed or server offline; proceed to fallback
    }

    // Local grounded fallback
    const fallback = getLocalKnowledgeResponse(textToSend);
    const assistantMessage: Message = {
      id: `assistant-${Date.now()}`,
      sender: 'assistant',
      text: fallback.text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actions: fallback.actions,
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsLoading(false);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'assistant',
        text: initialWelcomeText,
        timestamp: 'Just now',
        actions: [
          {
            label: 'View Menu',
            action: () => {
              onClose();
              setTimeout(onOpenMenu, 150);
            },
            icon: UtensilsCrossed,
          },
          {
            label: 'Reserve Table',
            action: () => {
              onClose();
              setTimeout(onOpenReservation, 150);
            },
            icon: Calendar,
          },
          {
            label: 'Google Maps',
            action: () => window.open(RESTAURANT_INFO.googleMapsUrl, '_blank'),
            icon: Compass,
            isExternal: true,
          },
        ],
      },
    ]);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="AI Concierge - The Shelter Cafe & Resto"
        className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-hidden touch-none"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-stone-950/85 backdrop-blur-md cursor-pointer touch-none"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ type: 'spring', damping: 26, stiffness: 300 }}
          className="relative w-full max-w-2xl h-[100dvh] sm:h-[88dvh] max-h-[100dvh] sm:max-h-[820px] flex flex-col bg-[#072614]/98 text-stone-100 rounded-t-3xl sm:rounded-3xl border border-white/25 shadow-[0_25px_60px_rgba(0,0,0,0.9),inset_0_1px_2px_rgba(255,255,255,0.3)] backdrop-blur-2xl overflow-hidden z-10"
        >
          {/* Top Glass Lens Glare */}
          <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-white/20 via-white/5 to-transparent pointer-events-none" />

          {/* Header */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-white/15 relative z-10 shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-500/30 to-amber-500/20 border border-purple-400/50 shadow-md">
                <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
                <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border border-stone-900" />
                </span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-serif font-bold text-white truncate">
                    The Shelter AI Concierge
                  </h2>
                  <span className="hidden xs:inline-block px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-widest bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 rounded-full">
                    Online
                  </span>
                </div>
                <p className="text-[11px] text-white/70 truncate flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-amber-300 shrink-0" />
                  <span>Kralgund Qaziabad • 34.3559° N, 74.3484° E</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={handleResetChat}
                className="p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
                title="Restart Conversation"
                aria-label="Restart Conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
                aria-label="Close Assistant"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Query Pills */}
          <div className="px-4 sm:px-6 py-2.5 bg-black/40 border-b border-white/10 overflow-x-auto no-scrollbar flex items-center gap-2 relative z-10 shrink-0 touch-pan-x overscroll-x-contain">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300/80 shrink-0 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Quick Ask:
            </span>
            {QUICK_SUGGESTIONS.map((sug) => (
              <button
                key={sug.label}
                onClick={() => handleSend(sug.query)}
                className="whitespace-nowrap px-3 py-1 rounded-full text-[11px] font-semibold bg-white/10 hover:bg-white/20 active:scale-95 text-white/90 border border-white/15 transition-all cursor-pointer"
              >
                {sug.label}
              </button>
            ))}
          </div>

          {/* Messages Stream */}
          <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain touch-pan-y px-4 sm:px-6 py-4 space-y-4 relative z-10">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'assistant' && (
                  <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center shrink-0 mt-0.5 text-amber-300 shadow-xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[80%] rounded-2xl px-4 py-3 shadow-md ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-tr-xs border border-emerald-400/30'
                      : 'bg-white/10 text-stone-100 rounded-tl-xs border border-white/20 backdrop-blur-md'
                  }`}
                >
                  {/* Message Text with basic markdown rendering */}
                  <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-sans">
                    {msg.text.split('\n').map((line, i) => {
                      if (!line.trim()) return <div key={i} className="h-2" />;

                      // Bold replacement **text** -> <strong>text</strong>
                      const parts = line.split(/(\*\*.*?\*\*|`.*?`)/g);
                      return (
                        <p key={i} className="my-0.5">
                          {parts.map((part, pIdx) => {
                            if (part.startsWith('**') && part.endsWith('**')) {
                              return (
                                <strong key={pIdx} className="font-bold text-amber-300">
                                  {part.slice(2, -2)}
                                </strong>
                              );
                            }
                            if (part.startsWith('`') && part.endsWith('`')) {
                              return (
                                <code
                                  key={pIdx}
                                  className="px-1 py-0.5 rounded bg-black/40 text-emerald-300 font-mono text-[11px]"
                                >
                                  {part.slice(1, -1)}
                                </code>
                              );
                            }
                            return part;
                          })}
                        </p>
                      );
                    })}
                  </div>

                  {/* Contextual Action Buttons */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-white/15 flex flex-wrap gap-2">
                      {msg.actions.map((act) => {
                        const Icon = act.icon;
                        return (
                          <button
                            key={act.label}
                            onClick={() => {
                              act.action();
                              if (!act.isExternal) {
                                onClose();
                              }
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold bg-amber-400 text-stone-950 hover:bg-amber-300 active:scale-95 transition-all shadow-sm cursor-pointer"
                          >
                            {Icon && <Icon className="w-3.5 h-3.5" />}
                            <span>{act.label}</span>
                            {act.isExternal && <ExternalLink className="w-3 h-3 opacity-70" />}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  <span className="block text-[9px] text-white/50 text-right mt-1.5">
                    {msg.timestamp}
                  </span>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center shrink-0 mt-0.5 text-emerald-300 shadow-xs">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </motion.div>
            ))}

            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2.5 text-white/70 text-xs py-2 px-1"
              >
                <div className="w-7 h-7 rounded-xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-amber-300">
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="animate-pulse">Thinking with Kashmiri warmth</span>
                  <span className="inline-flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:0.4s]" />
                  </span>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Console */}
          <div className="p-3 sm:p-4 bg-black/50 border-t border-white/15 relative z-10 shrink-0 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about food, prices, coordinates, reservations..."
                  className="w-full bg-white/10 text-white placeholder-white/50 text-xs sm:text-sm rounded-2xl px-4 py-3 pr-10 border border-white/20 focus:border-amber-400/80 focus:outline-hidden focus:ring-1 focus:ring-amber-400/50 backdrop-blur-md transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="px-4 py-3 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-stone-950 font-bold hover:brightness-110 active:scale-95 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-md cursor-pointer flex items-center justify-center shrink-0"
                aria-label="Send Message"
              >
                <Send className="w-4 h-4 stroke-[2.5]" />
              </button>
            </form>
            <p className="text-[10px] text-white/50 text-center mt-2 truncate">
              The Shelter AI is grounded in real menu items, live prices, location coordinates & WhatsApp dispatches.
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
