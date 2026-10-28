import React, { useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Calendar, Utensils, Star, ShieldCheck, Clock, Sparkles } from 'lucide-react';
import { RESTAURANT_INFO, MEDIA_CONFIG, WHATSAPP_CONFIG } from '../data/restaurantData';
import { LiquidButton } from '@/components/ui/liquid-glass-button';
import { motion } from 'motion/react';

interface HeroProps {
  onOpenReservation: () => void;
  onOpenMenu: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenReservation, onOpenMenu }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  /**
   * 💡 HOW TO REPLACE THE HERO VIDEO & PHOTOS:
   * 1. Place your video (e.g. 'hero.mp4') in /public/videos/
   * 2. Place your poster (e.g. 'poster.jpg') in /public/images/
   * 3. Update the URLs in src/data/restaurantData.ts under MEDIA_CONFIG.
   */

  const handleWhatsAppAction = (type: 'book' | 'order') => {
    const text = type === 'book' 
      ? `Hello ${RESTAURANT_INFO.name}, I would like to book a table for...`
      : `Hello ${RESTAURANT_INFO.name}, I would like to place an order for...`;
    window.open(`https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-qgreen-950 pt-[calc(5rem+env(safe-area-inset-top,0px))] sm:pt-28">
      
      {/* Background Video & Dual Atmospheric Overlays */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50 transition-opacity duration-1000"
          poster={MEDIA_CONFIG.heroPosterUrl}
        >
          <source src={MEDIA_CONFIG.heroVideoUrl} type="video/mp4" />
        </video>

        {/* Deep emerald glass gradient overlays */}
        <div className="absolute inset-0 bg-qgreen-950/75 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-qgreen-950 via-qgreen-900/60 to-qgreen-950/90" />
        
        {/* Luminous radial glass highlight */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-emerald-600/20 rounded-full blur-[120px] pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* Floating Video & Audio Glass Controls (Bottom Right) */}
      <div className="absolute bottom-8 right-8 z-20 flex items-center gap-2">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="flex items-center gap-2 px-3.5 py-2 text-xs text-white/90 bg-emerald-950/60 backdrop-blur-md border border-white/25 rounded-full hover:bg-white hover:text-emerald-950 transition-all duration-300 shadow-lg cursor-pointer"
          aria-label={isPlaying ? 'Pause background video' : 'Play background video'}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span className="uppercase tracking-widest text-[10px] font-semibold">
            {isPlaying ? 'Pause Ambience' : 'Play Ambience'}
          </span>
        </button>

        {/* Audio Mute/Unmute Button */}
        <button
          onClick={toggleMute}
          className="p-2 text-white/90 bg-emerald-950/60 backdrop-blur-md border border-white/25 rounded-full hover:bg-white hover:text-emerald-950 transition-all duration-300 shadow-lg cursor-pointer"
          aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5 text-emerald-300" /> : <Volume2 className="w-3.5 h-3.5 text-white" />}
        </button>
      </div>

      {/* Main Hero Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white py-16">
        
        {/* Animated Glass Location Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 glass-panel-dark rounded-full text-emerald-200 text-xs uppercase tracking-[0.28em] font-medium animate-float-gentle"
        >
          <Sparkles className="w-3 h-3 text-qgold-500" />
          <span>{RESTAURANT_INFO.tagline}</span>
          <span>·</span>
          <span>Kralgund, Handwara</span>
        </motion.div>

        {/* Giant Serif Typography with 2D Kinetic Appearance */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="font-serif text-4xl sm:text-6xl md:text-8xl lg:text-9xl tracking-tight mb-6 sm:mb-8 font-normal drop-shadow-md text-white"
        >
          {RESTAURANT_INFO.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-2xl mx-auto text-sm sm:text-base md:text-xl font-light leading-relaxed mb-8 sm:mb-10 px-2 text-emerald-50/90 [text-wrap:balance]"
        >
          {RESTAURANT_INFO.description}
        </motion.p>

        {/* Highly Rounded Liquid Glass Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-12"
        >
          <LiquidButton
            size="xl"
            variant="gold"
            onClick={onOpenMenu}
            className="w-full sm:w-auto rounded-full text-xs uppercase tracking-widest font-bold px-10 py-4 shadow-[0_12px_28px_0_rgba(0,0,0,0.35)]"
          >
            <span className="flex items-center gap-2.5">
              <Utensils className="w-4 h-4" />
              <span>Explore Menu</span>
            </span>
          </LiquidButton>

          <LiquidButton
            size="xl"
            onClick={() => handleWhatsAppAction('book')}
            className="w-full sm:w-auto rounded-full text-xs uppercase tracking-widest font-bold text-white hover:text-emerald-200 px-10 py-4 shadow-[0_12px_28px_0_rgba(0,0,0,0.35)] border border-white/40 glass-panel-dark"
          >
            <span className="flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-emerald-300" />
              <span>Book via WhatsApp</span>
            </span>
          </LiquidButton>
        </motion.div>

        {/* Glassmorphic Quick Info Strip */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-3xl mx-auto glass-panel-dark rounded-3xl p-4 sm:p-5 text-white/90 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs border border-white/20"
        >
          <div className="flex items-center justify-center sm:justify-start gap-2.5 sm:border-r border-white/15 pr-4">
            <Star className="w-4 h-4 text-qgold-500 fill-qgold-500" />
            <div className="text-left">
              <span className="font-bold text-white block">{RESTAURANT_INFO.googleRating}★ Rating</span>
              <span className="text-[11px] text-emerald-200/80">{RESTAURANT_INFO.reviewCount}+ Verified Reviews</span>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-2.5 sm:border-r border-white/15 pr-4">
            <Clock className="w-4 h-4 text-emerald-300" />
            <div className="text-left">
              <span className="font-bold text-white block">All-Day Dining & Cafe</span>
              <span className="text-[11px] text-emerald-200/80">Mon–Sun · 09:30–22:30</span>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-2.5 cursor-pointer hover:bg-white/5 transition-colors rounded-xl p-1" onClick={() => handleWhatsAppAction('order')}>
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            <div className="text-left">
              <span className="font-bold text-white block">WhatsApp Direct</span>
              <span className="text-[11px] text-emerald-200/80">Instant Table & Takeaway</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};


