import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'motion/react';
import { Sparkles, Info, X } from 'lucide-react';

interface SpiceItem {
  id: string;
  name: string;
  subtitle: string;
  origin: string;
  flavorNote: string;
  xPercent: number; // base X percentage
  yPercent: number; // base Y percentage
  size: number;
  rotation: number;
  driftDuration: number;
  driftRange: number;
  color: string;
  svgType: 'star-anise' | 'cardamom' | 'chili' | 'bay-leaf' | 'clove' | 'saffron' | 'coriander';
}

const SPICES: SpiceItem[] = [
  {
    id: 'spice-1',
    name: 'Star Anise',
    subtitle: 'Chakra Phool',
    origin: 'Vietnam & Western Ghats',
    flavorNote: 'Sweet warm licorice aroma infused in our 12-hour biryanis and stocks',
    xPercent: 7,
    yPercent: 18,
    size: 46,
    rotation: 18,
    driftDuration: 6.5,
    driftRange: 14,
    color: '#935422',
    svgType: 'star-anise',
  },
  {
    id: 'spice-2',
    name: 'Green Cardamom',
    subtitle: 'Chhoti Elaichi',
    origin: 'Cardamom Hills, Kerala',
    flavorNote: 'Queen of Spices: eucalyptus & citrus notes in our Butter Chicken gravy',
    xPercent: 91,
    yPercent: 24,
    size: 42,
    rotation: -25,
    driftDuration: 7.2,
    driftRange: 18,
    color: '#347e45',
    svgType: 'cardamom',
  },
  {
    id: 'spice-3',
    name: 'Kashmiri Chili',
    subtitle: 'Deghi Mirch',
    origin: 'Pampore Valley, Kashmir',
    flavorNote: 'Lustrous ruby-red glow with mild gentle heat and sun-dried fruitiness',
    xPercent: 88,
    yPercent: 72,
    size: 48,
    rotation: 40,
    driftDuration: 5.8,
    driftRange: 16,
    color: '#d63031',
    svgType: 'chili',
  },
  {
    id: 'spice-4',
    name: 'Bay Leaf',
    subtitle: 'Tej Patta',
    origin: 'Himalayan Foothills',
    flavorNote: 'Woody cinnamon-clove fragrance gently tempered in bubbling clarified ghee',
    xPercent: 5,
    yPercent: 78,
    size: 44,
    rotation: -35,
    driftDuration: 8.0,
    driftRange: 12,
    color: '#4e7d32',
    svgType: 'bay-leaf',
  },
  {
    id: 'spice-5',
    name: 'Zanzibar Clove',
    subtitle: 'Laung',
    origin: 'Malabar & Spice Islands',
    flavorNote: 'Intense warming sweetness essential to our slow-cooked highway lamb curry',
    xPercent: 50,
    yPercent: 92,
    size: 36,
    rotation: 15,
    driftDuration: 6.8,
    driftRange: 15,
    color: '#5d3825',
    svgType: 'clove',
  },
  {
    id: 'spice-6',
    name: 'Royal Saffron',
    subtitle: 'Kesar Threads',
    origin: 'Kashmir Valley',
    flavorNote: 'Hand-plucked golden crimson filaments yielding honeyed royal fragrance',
    xPercent: 84,
    yPercent: 44,
    size: 38,
    rotation: -12,
    driftDuration: 6.0,
    driftRange: 10,
    color: '#e67e22',
    svgType: 'saffron',
  },
  {
    id: 'spice-7',
    name: 'Fresh Coriander',
    subtitle: 'Dhaniya Patta',
    origin: 'English Garden Fresh',
    flavorNote: 'Crisp citrusy herbal finish sprinkled atop charcoal tandoor sizzlers',
    xPercent: 12,
    yPercent: 48,
    size: 40,
    rotation: 28,
    driftDuration: 7.5,
    driftRange: 14,
    color: '#27ae60',
    svgType: 'coriander',
  },
];

export const FloatingSpices: React.FC = () => {
  const [activeSpice, setActiveSpice] = useState<SpiceItem | null>(null);
  const [isExploded, setIsExploded] = useState(false);

  // Mouse Parallax Effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for fluid, bouncy 2D motion
  const smoothMouseX = useSpring(mouseX, { stiffness: 45, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 45, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 40; // max 20px offset
      const y = (e.clientY / innerHeight - 0.5) * 40;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const renderSpiceSvg = (type: SpiceItem['svgType'], color: string) => {
    switch (type) {
      case 'star-anise':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
            <g fill={color} stroke="#542e12" strokeWidth="2" strokeLinejoin="round">
              {/* 8-pointed star anise petals with seed centres */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                <g key={i} transform={`rotate(${angle} 50 50)`}>
                  <ellipse cx="50" cy="22" rx="9" ry="16" />
                  <ellipse cx="50" cy="20" rx="4" ry="7" fill="#c48243" />
                  <circle cx="50" cy="18" r="2.5" fill="#f5deb3" />
                </g>
              ))}
              <circle cx="50" cy="50" r="10" fill="#542e12" />
            </g>
          </svg>
        );

      case 'cardamom':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
            {/* Plump oval cardamom pod with ribbed ridges and tip */}
            <path
              d="M 50 15 C 65 30, 72 65, 50 85 C 28 65, 35 30, 50 15 Z"
              fill={color}
              stroke="#1b4d27"
              strokeWidth="2.5"
            />
            {/* Ridges */}
            <path d="M 50 18 Q 60 50 50 82" stroke="#8fd49e" strokeWidth="2.5" fill="none" opacity="0.8" />
            <path d="M 46 22 Q 38 50 46 80" stroke="#8fd49e" strokeWidth="1.8" fill="none" opacity="0.6" />
            <path d="M 54 22 Q 62 50 54 80" stroke="#8fd49e" strokeWidth="1.8" fill="none" opacity="0.6" />
            {/* Top stem */}
            <path d="M 50 15 L 50 8" stroke="#1b4d27" strokeWidth="3" strokeLinecap="round" />
          </svg>
        );

      case 'chili':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
            {/* Curving whole red chili */}
            <path
              d="M 35 25 C 60 25, 75 45, 68 70 C 64 85, 45 92, 40 92 C 45 80, 50 65, 42 45 C 38 38, 30 30, 35 25 Z"
              fill={color}
              stroke="#7a1213"
              strokeWidth="2.5"
            />
            {/* Highlight gloss */}
            <path
              d="M 45 32 C 55 35, 62 48, 58 65"
              stroke="#ff7675"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.75"
            />
            {/* Green calyx cap and stem */}
            <path d="M 28 22 C 32 18, 40 18, 44 24 C 38 28, 32 26, 28 22 Z" fill="#27ae60" />
            <path d="M 36 20 C 38 12, 42 10, 46 8" stroke="#1e824c" strokeWidth="3" strokeLinecap="round" fill="none" />
          </svg>
        );

      case 'bay-leaf':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
            {/* Lanceolate bay leaf */}
            <path
              d="M 50 10 C 72 30, 72 70, 50 90 C 28 70, 28 30, 50 10 Z"
              fill={color}
              stroke="#2d501e"
              strokeWidth="2"
            />
            {/* Central vein */}
            <path d="M 50 14 L 50 86" stroke="#90be6d" strokeWidth="2.5" />
            {/* Side veins */}
            <path d="M 50 35 Q 60 30 65 25" stroke="#90be6d" strokeWidth="1.5" fill="none" />
            <path d="M 50 45 Q 62 42 66 38" stroke="#90be6d" strokeWidth="1.5" fill="none" />
            <path d="M 50 55 Q 60 54 64 50" stroke="#90be6d" strokeWidth="1.5" fill="none" />
            <path d="M 50 35 Q 40 30 35 25" stroke="#90be6d" strokeWidth="1.5" fill="none" />
            <path d="M 50 45 Q 38 42 34 38" stroke="#90be6d" strokeWidth="1.5" fill="none" />
            <path d="M 50 55 Q 40 54 36 50" stroke="#90be6d" strokeWidth="1.5" fill="none" />
          </svg>
        );

      case 'clove':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
            {/* Rounded head */}
            <circle cx="50" cy="30" r="16" fill="#8c5338" stroke="#3e2316" strokeWidth="2" />
            {/* Four sepals */}
            <path d="M 38 38 L 32 30 L 40 28 Z" fill="#3e2316" />
            <path d="M 62 38 L 68 30 L 60 28 Z" fill="#3e2316" />
            {/* Stem */}
            <rect x="44" y="38" width="12" height="46" rx="4" fill={color} stroke="#3e2316" strokeWidth="2" />
            <line x1="50" y1="42" x2="50" y2="78" stroke="#8c5338" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );

      case 'saffron':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
            {/* 3 flared trumpeting stigmas */}
            <path
              d="M 50 85 Q 52 50 68 25 Q 74 15 80 18 Q 78 28 66 52 Q 52 70 50 85 Z"
              fill={color}
              stroke="#b33939"
              strokeWidth="1.5"
            />
            <path
              d="M 50 85 Q 46 50 32 25 Q 26 15 20 18 Q 22 28 34 52 Q 48 70 50 85 Z"
              fill="#d35400"
              stroke="#b33939"
              strokeWidth="1.5"
            />
            <path
              d="M 50 85 Q 49 45 52 18 Q 55 12 58 14 Q 56 26 53 50 Q 51 72 50 85 Z"
              fill="#f39c12"
              stroke="#b33939"
              strokeWidth="1.5"
            />
          </svg>
        );

      case 'coriander':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
            {/* Sprig of coriander */}
            <path d="M 50 90 Q 50 55 52 20" stroke="#1e824c" strokeWidth="3" fill="none" strokeLinecap="round" />
            {/* Lobed leaves */}
            <circle cx="52" cy="20" r="12" fill={color} />
            <circle cx="44" cy="22" r="10" fill={color} />
            <circle cx="60" cy="22" r="10" fill={color} />
            <circle cx="34" cy="46" r="9" fill={color} />
            <circle cx="28" cy="42" r="7" fill={color} />
            <circle cx="68" cy="48" r="9" fill={color} />
            <circle cx="74" cy="44" r="7" fill={color} />
            {/* Highlights */}
            <circle cx="52" cy="18" r="3" fill="#a8e6cf" />
            <circle cx="34" cy="44" r="2.5" fill="#a8e6cf" />
          </svg>
        );
    }
  };

  return (
    <>
      {/* Interactive 2D Motion Spices Layer - Hidden on mobile to avoid touch hijacking */}
      <div className="hidden sm:block fixed inset-0 pointer-events-none z-20 overflow-hidden" aria-hidden="true">
        {SPICES.map((spice) => {
          return (
            <motion.div
              key={spice.id}
              className="absolute pointer-events-auto cursor-pointer select-none group"
              style={{
                left: `${spice.xPercent}%`,
                top: `${spice.yPercent}%`,
                width: spice.size,
                height: spice.size,
                x: smoothMouseX,
                y: smoothMouseY,
              }}
              animate={{
                y: isExploded ? [0, -40, 0] : [0, -spice.driftRange, 0],
                rotate: [spice.rotation, spice.rotation + 8, spice.rotation],
                scale: isExploded ? 1.25 : 1,
              }}
              transition={{
                y: {
                  repeat: Infinity,
                  duration: spice.driftDuration,
                  ease: 'easeInOut',
                },
                rotate: {
                  repeat: Infinity,
                  duration: spice.driftDuration * 1.3,
                  ease: 'easeInOut',
                },
                scale: {
                  type: 'spring',
                  stiffness: 260,
                  damping: 18,
                },
              }}
              whileHover={{
                scale: 1.35,
                rotate: spice.rotation + 25,
                transition: { type: 'spring', stiffness: 350, damping: 15 },
              }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setActiveSpice(spice)}
            >
              {/* Liquid glass aura glow around each spice on hover */}
              <div className="relative w-full h-full">
                <div className="absolute inset-0 rounded-full bg-white/40 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {renderSpiceSvg(spice.svgType, spice.color)}

                {/* Pulsing subtle spark badge */}
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-white opacity-85 shadow-sm animate-ping group-hover:hidden" />
              </div>

              {/* Instant hover tooltip pill */}
              <div className="absolute left-1/2 -translate-x-1/2 -bottom-7 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-30">
                <span className="px-2.5 py-1 text-[10px] font-bold text-white bg-emerald-950/90 backdrop-blur-md rounded-full border border-emerald-400/40 shadow-lg tracking-wider">
                  {spice.name} ✨
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Floating 2D Motion Control Badge (Pizza Hut playful floating widget style) */}
      <div className="fixed bottom-6 left-6 z-30 hidden md:block">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="glass-panel-light px-3.5 py-2 rounded-full border border-emerald-900/20 shadow-lg flex items-center gap-2.5 text-xs text-emerald-950"
        >
          <div className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          <span className="font-semibold text-[11px] tracking-wide">
            2D Motion: <span className="text-emerald-800 font-normal">Interactive Spices Floating</span>
          </span>
          <button
            onClick={() => setIsExploded(!isExploded)}
            className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-emerald-900 text-white rounded-full hover:bg-emerald-800 transition-colors cursor-pointer"
          >
            {isExploded ? 'Gentle Float' : 'Stir Spices'}
          </button>
        </motion.div>
      </div>

      {/* Spice Knowledge Glass Modal (When visitor clicks on any floating spice) */}
      <AnimatePresence>
        {activeSpice && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 15 }}
              transition={{ type: 'spring', damping: 22, stiffness: 280 }}
              className="glass-modal max-w-sm w-full p-6 relative rounded-3xl shadow-2xl border border-white/80"
            >
              <button
                onClick={() => setActiveSpice(null)}
                className="absolute top-4 right-4 text-emerald-950 hover:text-emerald-700 p-1.5 rounded-full hover:bg-emerald-100 transition-colors"
                aria-label="Close spice card"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-16 h-16 rounded-2xl p-2.5 flex items-center justify-center shadow-inner border border-white/60"
                  style={{ backgroundColor: `${activeSpice.color}15` }}
                >
                  {renderSpiceSvg(activeSpice.svgType, activeSpice.color)}
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-emerald-800 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-emerald-600" />
                    {activeSpice.subtitle}
                  </span>
                  <h3 className="font-serif text-2xl text-emerald-950 font-semibold">
                    {activeSpice.name}
                  </h3>
                  <p className="text-xs text-emerald-800/80">
                    Sourced from {activeSpice.origin}
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-emerald-50/70 border border-emerald-900/10 rounded-2xl mb-5 text-xs text-emerald-950 leading-relaxed">
                <span className="font-bold text-emerald-900 block mb-1">
                  How our chefs use it:
                </span>
                {activeSpice.flavorNote}
              </div>

              <button
                onClick={() => setActiveSpice(null)}
                className="w-full py-2.5 bg-emerald-900 text-white font-semibold text-xs rounded-full uppercase tracking-wider hover:bg-emerald-800 transition-all shadow-md cursor-pointer"
              >
                Back to Dining Experience
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
