import React from 'react';

// CSS for the glitch effect
const glitchStyles = `
  .glitch {
    position: relative;
    color: white;
    font-size: 4rem;
    width: 100%;
    margin: 0 auto;
  }

  .glitch::before,
  .glitch::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .glitch::before {
    left: -2px;
    text-shadow: 2px 0 blue;
    background: black;
    overflow: hidden;
    animation: noise-anim-1 3s infinite linear alternate-reverse;
  }

  .glitch::after {
    left: 2px;
    text-shadow: -1px 0 red;
    background: black;
    overflow: hidden;
    animation: noise-anim-2 2s infinite linear alternate-reverse;
  }

  @keyframes noise-anim-1 {
    0% { clip-path: inset(40% 0 61% 0); }
    5% { clip-path: inset(92% 0 1% 0); }
    10% { clip-path: inset(43% 0 1% 0); }
    15% { clip-path: inset(25% 0 58% 0); }
    20% { clip-path: inset(54% 0 7% 0); }
    25% { clip-path: inset(35% 0 90% 0); }
    30% { clip-path: inset(17% 0 56% 0); }
    35% { clip-path: inset(71% 0 22% 0); }
    40% { clip-path: inset(98% 0 1% 0); }
    45% { clip-path: inset(36% 0 38% 0); }
    50% { clip-path: inset(10% 0 89% 0); }
    55% { clip-path: inset(82% 0 4% 0); }
    60% { clip-path: inset(1% 0 94% 0); }
    65% { clip-path: inset(96% 0 3% 0); }
    70% { clip-path: inset(23% 0 33% 0); }
    75% { clip-path: inset(57% 0 17% 0); }
    80% { clip-path: inset(49% 0 28% 0); }
    85% { clip-path: inset(13% 0 76% 0); }
    90% { clip-path: inset(64% 0 17% 0); }
    95% { clip-path: inset(40% 0 16% 0); }
    100% { clip-path: inset(19% 0 71% 0); }
  }

  @keyframes noise-anim-2 {
    0% { clip-path: inset(24% 0 74% 0); }
    5% { clip-path: inset(86% 0 7% 0); }
    10% { clip-path: inset(33% 0 53% 0); }
    15% { clip-path: inset(6% 0 84% 0); }
    20% { clip-path: inset(44% 0 33% 0); }
    25% { clip-path: inset(52% 0 16% 0); }
    30% { clip-path: inset(74% 0 2% 0); }
    35% { clip-path: inset(12% 0 65% 0); }
    40% { clip-path: inset(92% 0 5% 0); }
    45% { clip-path: inset(24% 0 31% 0); }
    50% { clip-path: inset(58% 0 22% 0); }
    55% { clip-path: inset(91% 0 3% 0); }
    60% { clip-path: inset(4% 0 67% 0); }
    65% { clip-path: inset(83% 0 4% 0); }
    70% { clip-path: inset(15% 0 56% 0); }
    75% { clip-path: inset(63% 0 26% 0); }
    80% { clip-path: inset(38% 0 57% 0); }
    85% { clip-path: inset(26% 0 49% 0); }
    90% { clip-path: inset(75% 0 18% 0); }
    95% { clip-path: inset(33% 0 52% 0); }
    100% { clip-path: inset(10% 0 69% 0); }
  }
`;

export function WelcomeGlass() {
  return (
    <div className="h-[60svh] w-full relative  ">
      <style>{glitchStyles}</style>
      
   
      
      {/* Your original heading with gradient */}
      <h1 className="  text-6xl md:text-8xl font-inter font-extrabold italic text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-blue-200 pb-2 mt-5 relative z-10">
        Welcome to Tftac.tips
      </h1>
    </div>
  );
}