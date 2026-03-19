import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const SPARKLE_COUNT = 30;
const SYMBOLS = ['✦', '✧'];
const sparkles = Array.from({ length: SPARKLE_COUNT }, (_, i) => ({
  left: `${Math.random() * 90 + 5}%`,
  top: `${Math.random() * 80 + 5}%`,
  fontSize: `${[10, 13, 18][i % 3]}px`,
  symbol: SYMBOLS[i % SYMBOLS.length] ?? '✦',
}));

export const AwardSparkles = () => {
  const sparkleRefs = useRef<HTMLDivElement[]>([]);

  useGSAP(() => {
    gsap.set(sparkleRefs.current, { opacity: 0, scale: 0.5 });

    gsap.to(sparkleRefs.current, {
      opacity: 'random(0.6,1)',
      scale: 'random(0.8,1.4)',
      x: 'random(-10,10)',
      y: 'random(-10,10)',
      duration: 'random(1,2)',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: { each: 0.15, from: 'random' },
    });
  }, []);

  return (
    <>
      {sparkles.map((s, i) => (
        <div
          key={i}
          ref={el => {
            if (el) sparkleRefs.current[i] = el;
          }}
          className="absolute pointer-events-none select-none z-0"
          style={{
            left: s.left,
            top: s.top,
            color: '#978253',
            fontSize: s.fontSize,
          }}
        >
          {s.symbol}
        </div>
      ))}
    </>
  );
};
