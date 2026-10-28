import React from 'react';

export const BlossomDrift: React.FC = () => {
  // Generate set of petals with varying positions, sizes and animation delays
  const petals = Array.from({ length: 15 }).map((_, i) => ({
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 20}s`,
    duration: `${15 + Math.random() * 15}s`,
    size: 8 + Math.random() * 12,
    opacity: 0.15 + Math.random() * 0.25,
    rotate: `${Math.random() * 360}deg`,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden" aria-hidden="true">
      {petals.map((petal, index) => (
        <div
          key={index}
          className="absolute animate-blossom"
          style={{
            left: petal.left,
            animationDelay: petal.delay,
            animationDuration: petal.duration,
            width: `${petal.size}px`,
            height: `${petal.size * 1.3}px`,
            transform: `rotate(${petal.rotate})`,
          }}
        >
          {/* Glassmorphic translucent petal with white/green reflection */}
          <div
            className="w-full h-full rounded-[60%_40%_70%_30%/50%_60%_40%_50%] backdrop-blur-xs border border-white/40 shadow-xs"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(245, 235, 208, 0.4) 100%)',
              opacity: petal.opacity,
            }}
          />
        </div>
      ))}
    </div>
  );
};

