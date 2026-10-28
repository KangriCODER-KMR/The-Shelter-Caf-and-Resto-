import React, { useState } from 'react';
import { X, CheckCircle2, Users, Calendar, Wine } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { LiquidButton } from './ui/liquid-glass-button';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';

interface PrivateDiningModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivateDiningModal: React.FC<PrivateDiningModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [guests, setGuests] = useState('15');
  const [eventDate, setEventDate] = useState('');
  const [eventType, setEventType] = useState('Birthday Celebration');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Lock background scroll when modal is open
  useBodyScrollLock(isOpen);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleDone = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Private Dining & Celebrations"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[105] flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-300 touch-none"
    >
      <div className="glass-modal max-w-lg w-full p-6 sm:p-10 relative shadow-2xl max-h-[92dvh] sm:max-h-[90vh] overflow-y-auto overscroll-contain touch-pan-y animate-in zoom-in-95 duration-200 rounded-3xl">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-emerald-900 hover:text-emerald-700 p-2"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6 border-b border-emerald-900/15 pb-4">
          <span className="text-xs uppercase tracking-widest text-emerald-800 font-bold block mb-1">
            The Shelter Private Gatherings
          </span>
          <h2 className="font-serif text-3xl text-emerald-950 font-normal">
            Private Dining & Celebrations
          </h2>
          <p className="text-xs text-emerald-800/80 mt-1">
            Let our hospitality team curate your special evening beneath the blossoms.
          </p>
        </div>

        {submitted ? (
          <div className="py-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-emerald-50 border border-emerald-900/20 text-emerald-800 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="font-serif text-3xl text-emerald-950 font-normal mb-2">
              Enquiry Received
            </h3>

            <p className="text-sm text-emerald-900 mb-6">
              Thank you, <strong className="font-bold">{name}</strong>. Our events manager will review your date for{' '}
              <strong className="font-bold">{guests} guests</strong> and contact you within 24 hours.
            </p>

            <LiquidButton
              onClick={handleDone}
              className="rounded-full bg-emerald-900 text-white hover:bg-emerald-950 px-8 py-3 text-xs uppercase tracking-widest font-bold w-full shadow-md cursor-pointer justify-center"
            >
              Close
            </LiquidButton>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold text-emerald-950 mb-1">
                Your Full Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alistair Montgomery"
                className="w-full px-3 py-2 border border-emerald-900/30 text-emerald-950 text-sm focus:outline-none focus:border-emerald-900"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-emerald-950 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3 py-2 border border-emerald-900/30 text-emerald-950 text-sm focus:outline-none focus:border-emerald-900"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-emerald-950 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="01732..."
                  className="w-full px-3 py-2 border border-emerald-900/30 text-emerald-950 text-sm focus:outline-none focus:border-emerald-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-emerald-950 mb-1">
                  Approximate Date
                </label>
                <input
                  type="date"
                  required
                  value={eventDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full px-3 py-2 border border-emerald-900/30 text-emerald-950 text-sm focus:outline-none focus:border-emerald-900"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-emerald-950 mb-1">
                  Estimated Guest Count
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full px-3 py-2 border border-emerald-900/30 text-emerald-950 text-sm focus:outline-none focus:border-emerald-900 bg-white"
                >
                  <option value="8-12">8 – 12 Guests</option>
                  <option value="12-20">12 – 20 Guests</option>
                  <option value="20-30">20 – 30 Guests</option>
                  <option value="30-45">30 – 45 Guests (Full Room Buyout)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-bold text-emerald-950 mb-1">
                Occasion Type
              </label>
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="w-full px-3 py-2 border border-emerald-900/30 text-emerald-950 text-sm focus:outline-none focus:border-emerald-900 bg-white"
              >
                <option value="Birthday Celebration">Birthday Celebration</option>
                <option value="Corporate Dinner">Corporate & Business Dinner</option>
                <option value="Anniversary">Anniversary</option>
                <option value="Wedding / Pre-Wedding Reception">Wedding / Pre-Wedding Reception</option>
                <option value="Festive Gathering">Festive & Holiday Gathering</option>
                <option value="Other">Other Private Event</option>
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-bold text-emerald-950 mb-1">
                Special Requirements or Menu Requests
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Mention wine pairings, dietary needs, or audio/decorations..."
                className="w-full px-3 py-2 border border-emerald-900/30 text-emerald-950 text-sm focus:outline-none focus:border-emerald-900"
              />
            </div>

            <div className="pt-4 border-t border-emerald-900/15 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs uppercase tracking-wider font-semibold text-emerald-900 hover:bg-emerald-50"
              >
                Cancel
              </button>
              <LiquidButton
                type="submit"
                className="rounded-full bg-emerald-900 text-white hover:bg-emerald-950 px-8 py-3 text-xs uppercase tracking-widest font-bold shadow-md cursor-pointer"
              >
                Send Enquiry
              </LiquidButton>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
