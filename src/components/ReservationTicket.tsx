import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Calendar, Clock, Users, MapPin, Sparkles, Scissors } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { ReservationData } from '../types';
import { motion } from 'motion/react';

interface ReservationTicketProps {
  data: ReservationData;
  bookingRef: string;
}

export const ReservationTicket: React.FC<ReservationTicketProps> = ({ data, bookingRef }) => {
  const qrValue = `https://thesheltercafe.in/verify/${bookingRef}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="relative max-w-sm mx-auto bg-white rounded-3xl overflow-hidden shadow-2xl border border-qgold-500/20"
    >
      {/* Top Branding Section */}
      <div className="bg-qgreen-950 p-6 text-white text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
        </div>
        
        <div className="relative z-10">
          <Sparkles className="w-5 h-5 text-qgold-500 mx-auto mb-2" />
          <h3 className="font-serif text-3xl font-bold tracking-tight">{RESTAURANT_INFO.name}</h3>
          <p className="text-[10px] uppercase tracking-[0.3em] text-qgold-400 font-bold">Official Reservation Ticket</p>
        </div>

        {/* Liquid Highlight */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-qgold-500/20 rounded-full blur-2xl" />
      </div>

      {/* Main Ticket Body */}
      <div className="p-6 pb-4 bg-qparchment relative">
        <div className="space-y-4">
          {/* Guest Name */}
          <div className="text-center pb-4 border-b border-qgreen-900/10">
            <p className="text-[10px] uppercase tracking-widest text-qgreen-900/50 font-bold mb-1">Guest Name</p>
            <h4 className="font-serif text-2xl text-qgreen-950">{data.fullName}</h4>
          </div>

          {/* Grid Details */}
          <div className="grid grid-cols-2 gap-4 text-left pt-2">
            <div>
              <p className="text-[9px] uppercase tracking-widest text-qgreen-900/50 font-bold flex items-center gap-1 mb-1">
                <Calendar className="w-3 h-3" /> Date
              </p>
              <p className="font-semibold text-qgreen-950 text-sm">{data.date}</p>
            </div>
            <div>
              <p className="text-[9px] uppercase tracking-widest text-qgreen-900/50 font-bold flex items-center gap-1 mb-1">
                <Clock className="w-3 h-3" /> Time
              </p>
              <p className="font-semibold text-qgreen-950 text-sm">{data.time}</p>
            </div>
            <div>
              <p className="text-[9px] uppercase tracking-widest text-qgreen-900/50 font-bold flex items-center gap-1 mb-1">
                <Users className="w-3 h-3" /> Party
              </p>
              <p className="font-semibold text-qgreen-950 text-sm">{data.guests} Guests</p>
            </div>
            <div>
              <p className="text-[9px] uppercase tracking-widest text-qgreen-900/50 font-bold flex items-center gap-1 mb-1">
                <MapPin className="w-3 h-3" /> Table
              </p>
              <p className="font-semibold text-qgreen-950 text-sm">{data.area}</p>
            </div>
          </div>
        </div>

        {/* Perforation Line */}
        <div className="relative h-8 my-4 -mx-6 flex items-center">
          <div className="absolute left-0 w-4 h-8 bg-black/60 rounded-r-full -ml-2" />
          <div className="w-full border-t-2 border-dashed border-qgreen-900/20" />
          <div className="absolute right-0 w-4 h-8 bg-black/60 rounded-l-full -mr-2" />
        </div>

        {/* QR Section */}
        <div className="flex flex-col items-center justify-center pt-2 pb-4">
          <div className="p-3 bg-white rounded-xl shadow-inner border border-qgold-500/20 mb-3">
            <QRCodeSVG 
              value={qrValue} 
              size={120}
              level="H"
              includeMargin={true}
              imageSettings={{
                src: "/favicon.ico",
                x: undefined,
                y: undefined,
                height: 24,
                width: 24,
                excavate: true,
              }}
            />
          </div>
          <p className="text-[10px] font-mono font-bold text-qgreen-950 uppercase tracking-widest">
            REF: {bookingRef}
          </p>
          <p className="text-[9px] text-qgreen-900/60 mt-1">Present this QR upon arrival</p>
        </div>
      </div>

      {/* Footer Instructions */}
      <div className="bg-qgold-50 p-4 border-t border-qgold-500/10 text-center">
        <p className="text-[9px] text-qgold-800/80 font-medium leading-relaxed">
          Main Road Kralgund, Handwara, J&K 193302<br />
          Main Road Kralgund · WhatsApp Confirmation
        </p>
      </div>

      {/* Decorative corner accents */}
      <div className="absolute top-0 left-0 w-1 h-full bg-qgold-500/30" />
      <div className="absolute top-0 right-0 w-1 h-full bg-qgold-500/30" />
    </motion.div>
  );
};
