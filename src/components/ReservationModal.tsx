import React, { useState } from 'react';
import { X, Calendar, Clock, Users, CheckCircle2, ChevronRight, ShieldCheck, MapPin, Sparkles, MessageCircle, Download } from 'lucide-react';
import { RESTAURANT_INFO, WHATSAPP_CONFIG } from '../data/restaurantData';
import { ReservationData } from '../types';
import { LiquidButton } from './ui/liquid-glass-button';
import { createReservationWhatsAppUrl } from '../utils/whatsapp';

import { ReservationTicket } from './ReservationTicket';
import { QRCodeSVG } from 'qrcode.react';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [isConfirmingPayment, setIsConfirmingPayment] = useState(false);
  const [formData, setFormData] = useState<ReservationData>({
    guests: 2,
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    time: '19:00',
    area: 'Blossom Canopy',
    fullName: '',
    email: '',
    phone: '',
    specialRequests: '',
    dietaryNotes: '',
  });

  const [bookingRef, setBookingRef] = useState('');

  // Lock background scroll when modal is open
  useBodyScrollLock(isOpen);

  if (!isOpen) return null;

  const timeSlots = [
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'
  ];

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      const ref = `QS-${Math.floor(1000 + Math.random() * 9000)}`;
      setBookingRef(ref);

      // Directly open WhatsApp Business with pre-filled formatted reservation
      // We append the payment requirement note to the message
      const whatsappUrl = createReservationWhatsAppUrl(formData);
      const paymentNote = encodeURIComponent("\n\n*Note:* I understand a £10.00 confirmation fee is required to secure this booking. Please send the payment link.");
      window.open(`${whatsappUrl}${paymentNote}`, '_blank', 'noopener,noreferrer');

      setStep(3);
    }
  };

  const handleConfirmPayment = () => {
    setIsConfirmingPayment(true);
    // Simulate verification delay
    setTimeout(() => {
      setIsConfirmingPayment(false);
      setStep(4);
    }, 2000);
  };

  const handleReset = () => {
    setStep(1);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Reserve a Table"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[105] flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-300 touch-none"
    >
      <div className="glass-modal max-w-xl w-full p-6 sm:p-10 relative rounded-3xl shadow-2xl max-h-[92dvh] sm:max-h-[90vh] overflow-y-auto overscroll-contain touch-pan-y animate-in zoom-in-95 duration-200 border border-white/80">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-emerald-950 hover:text-emerald-700 p-2 hover:bg-emerald-100 rounded-full transition-colors cursor-pointer"
          aria-label="Close reservation modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6 border-b border-emerald-900/15 pb-4">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-emerald-800 font-bold mb-1">
            <MessageCircle className="w-4 h-4 text-emerald-700" />
            <span>Direct WhatsApp Business Booking · Instant Response</span>
          </div>
          <h2 className="font-serif text-3xl text-emerald-950 font-normal">
            Reserve a Table at {RESTAURANT_INFO.name}
          </h2>
          <p className="text-xs text-emerald-800/80 mt-1">
            {RESTAURANT_INFO.address} · Instant WhatsApp Confirmation
          </p>
        </div>

        {/* Step 1: Party, Date, Time & Area */}
        {step === 1 && (
          <form onSubmit={handleNextStep} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold text-emerald-950 mb-2">
                Number of Guests
              </label>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <button
                    type="button"
                    key={num}
                    onClick={() => setFormData({ ...formData, guests: num })}
                    className={`py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                      formData.guests === num
                        ? 'bg-emerald-900 text-white border-emerald-900 shadow-sm'
                        : 'border-emerald-900/25 bg-white/60 text-emerald-900 hover:bg-emerald-100'
                    }`}
                  >
                    {num} {num === 1 ? 'Guest' : 'Guests'}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-emerald-950 mb-2">
                  Reservation Date
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-900/30 text-emerald-950 text-sm focus:outline-hidden focus:ring-1 focus:ring-emerald-900 bg-white/80"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-emerald-950 mb-2">
                  Seating Area
                </label>
                <select
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-900/30 text-emerald-950 text-sm focus:outline-hidden focus:ring-1 focus:ring-emerald-900 bg-white/80"
                >
                  <option value="Blossom Canopy">Beneath the Blossoms</option>
                  <option value="Main Dining Room">Main Dining Room</option>
                  <option value="Window Booth">Window Booth</option>
                  <option value="Any Available">First Available Table</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-bold text-emerald-950 mb-2">
                Available Time Slots
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {timeSlots.map((slot) => (
                  <button
                    type="button"
                    key={slot}
                    onClick={() => setFormData({ ...formData, time: slot })}
                    className={`py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                      formData.time === slot
                        ? 'bg-emerald-900 text-white border-emerald-900 shadow-sm'
                        : 'border-emerald-900/25 bg-white/60 text-emerald-900 hover:bg-emerald-100'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-emerald-900/15 flex items-center justify-between">
              <span className="text-xs text-emerald-800">
                Selected: {formData.guests} guests · {formData.time}
              </span>
              <LiquidButton
                type="submit"
                className="rounded-full bg-emerald-900 text-white hover:bg-emerald-950 px-6 py-2.5 text-xs uppercase tracking-widest font-bold shadow-md cursor-pointer inline-flex items-center gap-2"
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4" />
              </LiquidButton>
            </div>
          </form>
        )}

        {/* Step 2: Guest Information & WhatsApp Direct Dispatch */}
        {step === 2 && (
          <form onSubmit={handleNextStep} className="space-y-4">
            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-900/20 text-xs text-emerald-900 flex justify-between items-center mb-4">
              <span>{formData.date} at {formData.time} ({formData.guests} guests) · {formData.area}</span>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="font-bold underline text-emerald-800 cursor-pointer"
              >
                Change
              </button>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-bold text-emerald-950 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="e.g. Charlotte Bennett"
                className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-900/30 text-emerald-950 text-sm focus:outline-hidden focus:ring-1 focus:ring-emerald-900 bg-white"
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
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-900/30 text-emerald-950 text-sm focus:outline-hidden focus:ring-1 focus:ring-emerald-900 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-emerald-950 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="07123 456789"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-900/30 text-emerald-950 text-sm focus:outline-hidden focus:ring-1 focus:ring-emerald-900 bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-bold text-emerald-950 mb-1">
                Dietary Allergies or Preferences
              </label>
              <input
                type="text"
                value={formData.dietaryNotes}
                onChange={(e) => setFormData({ ...formData, dietaryNotes: e.target.value })}
                placeholder="e.g. Gluten-free, nut allergy, vegan"
                className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-900/30 text-emerald-950 text-sm focus:outline-hidden focus:ring-1 focus:ring-emerald-900 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-bold text-emerald-950 mb-1">
                Occasion / Special Notes
              </label>
              <textarea
                rows={2}
                value={formData.specialRequests}
                onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                placeholder="Birthday, anniversary celebration, highchair request..."
                className="w-full px-3.5 py-2 rounded-xl border border-emerald-900/30 text-emerald-950 text-sm focus:outline-hidden focus:ring-1 focus:ring-emerald-900 bg-white"
              />
            </div>

            {/* WhatsApp notification highlight */}
            <div className="p-3 bg-emerald-900/10 rounded-2xl border border-emerald-900/15 flex items-center gap-2.5 text-xs text-emerald-950">
              <MessageCircle className="w-5 h-5 text-emerald-700 shrink-0" />
              <span>
                Clicking confirm will launch WhatsApp Business to send your pre-filled reservation directly to our team!
              </span>
            </div>

            <div className="pt-4 border-t border-emerald-900/15 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs uppercase tracking-wider font-bold text-emerald-900 hover:underline cursor-pointer"
              >
                Back
              </button>
              <LiquidButton
                type="submit"
                className="rounded-full bg-emerald-900 text-white hover:bg-emerald-950 px-8 py-3 text-xs uppercase tracking-widest font-bold shadow-md cursor-pointer flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-300" />
                <span>Book via WhatsApp</span>
              </LiquidButton>
            </div>
          </form>
        )}

        {/* Step 3: Payment Verification & QR Generator */}
        {step === 3 && (
          <div className="text-center py-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-qgold-50 border border-qgold-500/20 text-qgold-600 flex items-center justify-center rounded-full shadow-inner animate-pulse">
              <Sparkles className="w-10 h-10" />
            </div>

            <h3 className="font-serif text-3xl text-qgreen-950 font-normal mb-2">
              Confirmation Required
            </h3>

            <p className="text-sm text-qgreen-900/80 mb-6">
              To secure your table at The Shelter Cafe & Resto, a small booking fee of <strong className="text-qgreen-950 font-bold">£10.00</strong> is required. 
              <br className="hidden sm:block" /> This amount is fully deductible from your final bill.
            </p>

            {/* Payment QR Generator */}
            <div className="glass-panel-light p-8 mb-8 inline-block rounded-3xl border border-qgold-500/20 shadow-xl relative group">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-qgold-500 text-white text-[10px] uppercase tracking-widest px-3 py-1 rounded-full font-bold shadow-sm">
                Scan to Pay Securely
              </div>
              
              <div className="bg-white p-4 rounded-2xl shadow-inner border border-qgreen-900/10 mb-4">
                <QRCodeSVG 
                  value={`https://thesheltercafe.in/pay/reservation/${bookingRef}?amt=10.00`} 
                  size={180}
                  level="M"
                  includeMargin={false}
                />
              </div>

              <div className="flex items-center justify-center gap-2 text-xs font-bold text-qgreen-950">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
                <span>Waiting for transaction...</span>
              </div>
            </div>

            <div className="space-y-3 max-w-sm mx-auto">
              <LiquidButton
                variant="gold"
                onClick={handleConfirmPayment}
                disabled={isConfirmingPayment}
                className="w-full rounded-full py-4 text-xs uppercase tracking-widest font-bold shadow-md cursor-pointer justify-center"
              >
                {isConfirmingPayment ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Verifying Payment...
                  </span>
                ) : (
                  <span>I've Completed the Payment</span>
                )}
              </LiquidButton>

              <button
                onClick={() => setStep(2)}
                className="text-[10px] uppercase tracking-wider font-bold text-qgreen-900/50 hover:text-qgreen-950 transition-colors"
              >
                Review Booking Details
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Digital Ticket Generation */}
        {step === 4 && (
          <div className="text-center py-4">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center shadow-sm">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-2xl text-qgreen-950 text-left leading-tight">
                  Booking Confirmed
                </h3>
                <p className="text-[10px] uppercase tracking-widest text-green-600 font-bold text-left">
                  Payment Verified · Ticket Generated
                </p>
              </div>
            </div>

            {/* The Ticket Component */}
            <div className="mb-8">
              <ReservationTicket data={formData} bookingRef={bookingRef} />
            </div>

            <div className="space-y-4 max-w-sm mx-auto">
              <div className="flex gap-3">
                <LiquidButton
                  variant="gold"
                  onClick={() => {
                    const text = encodeURIComponent(`Hi The Shelter Cafe! Here is my confirmed reservation ticket: ${bookingRef}. See you soon!`);
                    window.open(`https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${text}`, '_blank');
                  }}
                  className="flex-1 rounded-full py-3.5 text-[10px] uppercase tracking-widest font-bold shadow-md cursor-pointer justify-center flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send to WhatsApp</span>
                </LiquidButton>

                <button
                  className="flex-1 rounded-full border border-qgreen-900/20 hover:bg-qgreen-50 py-3.5 text-[10px] uppercase tracking-widest font-bold text-qgreen-950 transition-all cursor-pointer flex items-center justify-center gap-2"
                  onClick={() => window.print()}
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </button>
              </div>

              <button
                onClick={handleReset}
                className="text-[10px] uppercase tracking-wider font-bold text-qgreen-900/50 hover:text-qgreen-950 transition-colors"
              >
                Close & Return to The Shelter
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
