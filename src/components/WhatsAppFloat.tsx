import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Sparkles, Clock, CheckCheck } from 'lucide-react';
import { WHATSAPP_CONFIG } from '../data/restaurantData';
import { createDirectChatWhatsAppUrl } from '../utils/whatsapp';

export const WhatsAppFloat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const url = createDirectChatWhatsAppUrl(message.trim() || undefined);
    window.open(url, '_blank', 'noopener,noreferrer');
    setMessage('');
    setIsOpen(false);
  };

  const directChatUrl = createDirectChatWhatsAppUrl();

  return (
    <div className="fixed bottom-24 sm:bottom-6 right-3 sm:right-6 z-40 flex flex-col items-end pointer-events-auto">
      {/* Floating Chat Popup Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 15 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="mb-3 w-[calc(100vw-2rem)] sm:w-96 max-w-sm glass-modal rounded-3xl overflow-hidden shadow-2xl border border-white/80"
          >
            {/* Header */}
            <div className="bg-emerald-950 text-white p-4 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-emerald-800 border-2 border-emerald-400 flex items-center justify-center font-serif text-lg font-bold text-white shadow-inner">
                    S
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full ring-2 ring-emerald-950" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm leading-tight">
                    {WHATSAPP_CONFIG.restaurantName}
                  </h4>
                  <p className="text-[11px] text-emerald-300 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Replies immediately on WhatsApp
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Close chat window"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Body Bubble */}
            <div className="p-4 bg-gradient-to-b from-emerald-50/60 to-white/70 space-y-3">
              <div className="flex items-start gap-2.5 max-w-[85%]">
                <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-xs border border-emerald-900/10 text-xs text-emerald-950 leading-relaxed">
                  <p className="font-semibold text-emerald-900 mb-0.5">
                    Welcome to {WHATSAPP_CONFIG.restaurantName}!
                  </p>
                  <p>
                    How can we assist you today? You can reserve an executive table, order fresh delivery, or inquire about authentic Kashmiri Wazwan dishes.
                  </p>
                  <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-emerald-700/60 font-mono">
                    <span>Just now</span>
                    <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                </div>
              </div>

              {/* Quick Prompt Suggestions */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {[
                  'Book a Table tonight',
                  'Authentic Wazwan menu',
                  'Executive lounge enquiry',
                ].map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => {
                      const url = createDirectChatWhatsAppUrl(`Hi, I'd like to ask: ${prompt}`);
                      window.open(url, '_blank', 'noopener,noreferrer');
                    }}
                    className="text-[10px] px-2.5 py-1 bg-white/80 hover:bg-emerald-900 hover:text-white border border-emerald-900/20 rounded-full transition-all text-emerald-900 font-medium cursor-pointer"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="p-3 bg-white/90 border-t border-emerald-900/10 flex items-center gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your WhatsApp message..."
                className="flex-1 px-3 py-2 text-xs bg-emerald-50/50 border border-emerald-900/15 rounded-full text-emerald-950 placeholder:text-emerald-800/50 focus:outline-hidden focus:ring-1 focus:ring-emerald-800"
              />
              <button
                type="submit"
                className="p-2.5 bg-emerald-900 text-white rounded-full hover:bg-emerald-800 transition-all shadow-md cursor-pointer shrink-0"
                aria-label="Send WhatsApp message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="px-4 py-2 bg-emerald-950/5 text-center text-[10px] text-emerald-800/80 border-t border-emerald-900/5">
              Direct connection to WhatsApp Business (+{WHATSAPP_CONFIG.phoneNumber})
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative group flex items-center gap-3 px-4 py-3 bg-emerald-900 text-white rounded-full shadow-[0_12px_32px_rgba(7,38,20,0.35)] border border-emerald-700/60 hover:bg-emerald-800 transition-all duration-300 cursor-pointer overflow-hidden"
        aria-label="Open WhatsApp Business chat"
      >
        {/* Specular Liquid highlight reflection */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-white/25 pointer-events-none rounded-full" />

        <div className="relative flex items-center justify-center">
          <MessageCircle className="w-5 h-5 text-emerald-300 fill-emerald-300/30" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-400 rounded-full ring-2 ring-emerald-900 animate-pulse" />
        </div>

        <div className="text-left hidden sm:block">
          <span className="text-[10px] uppercase tracking-wider block text-emerald-200/90 font-medium">
            WhatsApp Business
          </span>
          <span className="text-xs font-bold block leading-none">
            Chat with The Shelter
          </span>
        </div>
      </motion.button>
    </div>
  );
};
