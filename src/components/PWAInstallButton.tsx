import React, { useState } from 'react';
import { Download, Share2, PlusSquare, X, Smartphone, CheckCircle2 } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  variant?: 'navbar' | 'prominent' | 'compact' | 'drawer';
  className?: string;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  variant = 'navbar',
  className = '',
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  // If already running inside an installed PWA window, don't show prompt
  if (isInstalled) {
    return null;
  }

  // If neither installable directly nor iOS, we still allow an informative modal on click
  // so users on desktop Chrome or Android who already dismissed the prompt can see how to install it.
  const handleClick = async () => {
    if (isInstallable) {
      setIsInstalling(true);
      try {
        await install();
      } finally {
        setIsInstalling(false);
      }
    } else {
      setShowIOSGuide(true);
    }
  };

  const renderButtonContent = () => {
    if (variant === 'prominent') {
      return (
        <button
          onClick={handleClick}
          disabled={isInstalling}
          className={`group relative inline-flex items-center gap-2.5 px-4 py-2.5 bg-gradient-to-r from-emerald-900 to-[#072614] hover:from-[#0a331c] hover:to-emerald-950 text-[#f3d694] border border-[#c5a059]/40 hover:border-[#c5a059] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-xs font-bold tracking-wide uppercase cursor-pointer ${className}`}
          title="Install The Shelter Cafe App for instant offline dining & ordering"
        >
          <div className="relative">
            <Download className="w-4 h-4 text-[#e4be74] group-hover:translate-y-0.5 transition-transform" />
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
          </div>
          <span>Install App</span>
        </button>
      );
    }

    if (variant === 'compact') {
      return (
        <button
          onClick={handleClick}
          disabled={isInstalling}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-950 bg-white/80 hover:bg-emerald-900 hover:text-white border border-emerald-900/20 rounded-full transition-all duration-300 cursor-pointer shadow-xs ${className}`}
          title="Install App"
        >
          <Smartphone className="w-3.5 h-3.5 text-qgold-600" />
          <span>Install</span>
        </button>
      );
    }

    // Default 'navbar' styling matching The Shelter Cafe header
    return (
      <button
        onClick={handleClick}
        disabled={isInstalling}
        className={`group relative inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 sm:py-2 text-[11px] sm:text-xs uppercase tracking-wider font-semibold text-emerald-950 bg-white/70 hover:bg-emerald-950 hover:text-[#e4be74] backdrop-blur-md border border-[#c5a059]/30 hover:border-[#c5a059] rounded-full transition-all duration-300 whitespace-nowrap shrink-0 shadow-xs cursor-pointer ${className}`}
        aria-label="Install The Shelter Cafe App"
      >
        <Download className="w-3.5 h-3.5 text-[#c5a059] group-hover:text-[#e4be74] group-hover:-translate-y-0.5 transition-transform" />
        <span className="hidden md:inline">Install App</span>
        <span className="md:hidden">App</span>
      </button>
    );
  };

  return (
    <>
      {renderButtonContent()}

      {/* iOS & General Installation Guide Modal */}
      {showIOSGuide && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in"
          onClick={() => setShowIOSGuide(false)}
        >
          <div
            className="w-full max-w-sm rounded-2xl bg-[#072614] border border-[#c5a059]/40 p-6 text-white shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowIOSGuide(false)}
              className="absolute top-4 right-4 text-emerald-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* App Icon & Header */}
            <div className="flex items-center gap-3.5 pb-4 border-b border-emerald-800/60">
              <img
                src="/pwa-192x192.png"
                alt="The Shelter Icon"
                className="w-12 h-12 rounded-xl border border-[#c5a059]/50 shadow-md object-cover"
              />
              <div>
                <h3 className="font-serif text-lg font-bold text-[#f3d694]">The Shelter Cafe</h3>
                <p className="text-xs text-emerald-300/80">Kralgund, Handwara • Install to Home Screen</p>
              </div>
            </div>

            {/* Step-by-step instructions */}
            <div className="mt-5 space-y-4 text-xs">
              {isIOS ? (
                <>
                  <p className="text-emerald-200 leading-relaxed">
                    Install on your iPhone or iPad for instant offline access and quick food ordering:
                  </p>
                  <div className="flex items-start gap-3 bg-emerald-950/60 p-3 rounded-xl border border-emerald-800/40">
                    <div className="p-2 bg-emerald-900 rounded-lg shrink-0">
                      <Share2 className="w-4 h-4 text-[#e4be74]" />
                    </div>
                    <div>
                      <p className="font-bold text-white">Step 1</p>
                      <p className="text-emerald-300">Tap the <span className="font-semibold text-white">Share</span> button at the bottom of Safari.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-emerald-950/60 p-3 rounded-xl border border-emerald-800/40">
                    <div className="p-2 bg-emerald-900 rounded-lg shrink-0">
                      <PlusSquare className="w-4 h-4 text-[#e4be74]" />
                    </div>
                    <div>
                      <p className="font-bold text-white">Step 2</p>
                      <p className="text-emerald-300">Scroll down and tap <span className="font-semibold text-white">Add to Home Screen</span>.</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-emerald-200 leading-relaxed">
                    Install <span className="font-semibold text-[#f3d694]">The Shelter Cafe</span> on your device for fast, app-like ordering, table booking, and offline menu browsing:
                  </p>
                  <div className="flex items-start gap-3 bg-emerald-950/60 p-3 rounded-xl border border-emerald-800/40">
                    <div className="p-2 bg-emerald-900 rounded-lg shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-[#e4be74]" />
                    </div>
                    <div>
                      <p className="font-bold text-white">Instant 1-Click Launch</p>
                      <p className="text-emerald-300">Tap the browser menu (⋮ or Share) and select <span className="text-white font-semibold">Install App</span> or <span className="text-white font-semibold">Add to Home screen</span>.</p>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Benefits Badge */}
            <div className="mt-5 grid grid-cols-2 gap-2 text-[10px] text-emerald-300">
              <span className="flex items-center gap-1.5 bg-white/5 py-1.5 px-2 rounded-lg">
                <span className="text-emerald-400">⚡</span> Ultra-Fast Loading
              </span>
              <span className="flex items-center gap-1.5 bg-white/5 py-1.5 px-2 rounded-lg">
                <span className="text-emerald-400">📶</span> Offline Menus
              </span>
            </div>

            <button
              onClick={() => setShowIOSGuide(false)}
              className="mt-5 w-full rounded-xl bg-gradient-to-r from-[#c5a059] to-[#b38e47] hover:from-[#d4af66] hover:to-[#c5a059] py-2.5 text-xs font-bold uppercase tracking-wider text-[#072614] shadow-md transition-all cursor-pointer"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
};
