import React from 'react';

export const Marquee: React.FC = () => {
  const items = [
    'Origin',
    'Spice',
    'Aroma',
    'Texture',
    'Taste',
    'Craft',
    'Gathering',
    'Celebration',
    'Kralgund', 'Handwara',
    'Heritage',
  ];

  return (
    <div className="bg-qgreen-950 text-white py-6 border-y border-qgold-500/20 overflow-hidden select-none">
      <div className="flex animate-marquee">
        {/* Repeated twice for seamless looping */}
        <div className="flex items-center shrink-0">
          {items.map((word, i) => (
            <span key={`first-${i}`} className="inline-flex items-center font-serif text-2xl sm:text-3xl md:text-4xl italic tracking-wider whitespace-nowrap mx-6">
              <span className="text-qgold-500">{word}</span>
              <span className="ml-6 text-qgold-300/40 not-italic text-lg" aria-hidden="true">✦</span>
            </span>
          ))}
        </div>
        <div className="flex items-center shrink-0">
          {items.map((word, i) => (
            <span key={`second-${i}`} className="inline-flex items-center font-serif text-2xl sm:text-3xl md:text-4xl italic tracking-wider whitespace-nowrap mx-6">
              <span className="text-qgold-500">{word}</span>
              <span className="ml-6 text-qgold-300/40 not-italic text-lg" aria-hidden="true">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
