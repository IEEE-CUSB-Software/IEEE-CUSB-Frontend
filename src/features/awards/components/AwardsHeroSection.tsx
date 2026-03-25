import { useRef } from 'react';
import gsap from 'gsap';
import LaurelLeft from '../../../assets/LaurelLeftSide-removebg-preview.png';
import LaurelRight from '../../../assets/LaurelRightSide-removebg-preview.png';
import { useGSAP } from '@gsap/react';

const SPARKLE_COUNT = 30;
const SYMBOLS = ['✦', '✧'];
const sparkles = Array.from({ length: SPARKLE_COUNT }, (_, i) => ({
  left: `${Math.random() * 90 + 5}%`,
  top: `${Math.random() * 80 + 5}%`,
  fontSize: `${[10, 13, 18][i % 3]}px`,
  symbol: SYMBOLS[i % SYMBOLS.length] ?? '✦',
}));

export const AwardsHeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRefs = useRef<HTMLDivElement[]>([]);
  const subRef = useRef<HTMLDivElement>(null);
  const sparkleRefs = useRef<HTMLDivElement[]>([]);

  useGSAP(() => {
    const line0 = lineRefs.current[0];
    const line1 = lineRefs.current[1];
    if (!line0 || !line1 || !subRef.current) return;
    gsap.set([line0, line1, subRef.current], { opacity: 0, y: 40 });
    gsap.set(sparkleRefs.current, { opacity: 0, scale: 0.5 });

    const exitX = window.innerWidth < 768 ? 80 : 160;

    gsap
      .timeline({ delay: 0.2 })
      .to(line0, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power1.out',
      })
      .to(line1, { opacity: 1, y: 0, duration: 1, ease: 'power1.out' }, '-=0.7')
      .to(
        subRef.current,
        { opacity: 1, y: 0, duration: 1, ease: 'power1.out' },
        '-=0.3'
      );

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

    const exitTrigger = {
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom top',
      scrub: 2,
    };

    gsap.fromTo(
      line0,
      { x: 0, opacity: 1, immediateRender: false },
      { x: -exitX, opacity: 0, ease: 'none', scrollTrigger: exitTrigger }
    );

    gsap.fromTo(
      line1,
      { x: 0, opacity: 1, immediateRender: false },
      { x: exitX, opacity: 0, ease: 'none', scrollTrigger: exitTrigger }
    );

    gsap.fromTo(
      subRef.current,
      { y: 0, opacity: 1, immediateRender: false },
      {
        y: 60,
        opacity: 0,
        ease: 'none',
        scrollTrigger: exitTrigger,
      }
    );

    gsap.fromTo(
      sparkleRefs.current,
      { opacity: 1, immediateRender: false },
      {
        opacity: 0,
        ease: 'none',
        overwrite: 'auto',
        scrollTrigger: { ...exitTrigger, scrub: 1.5 },
      }
    );
  }, []);
  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col items-center justify-center text-center py-18 px-6 min-h-[100vh] overflow-hidden"
    >
      {/* Sparkles */}
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
      {/* Title */}
      <div className="mx-auto mb-8 w-fit z-10 text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.15] tracking-tight">
        <div
          ref={el => {
            if (el) lineRefs.current[0] = el;
          }}
          className="pr-12 sm:pr-20 md:pr-32 lg:pr-40"
        >
          A Legacy
        </div>
        <div
          ref={el => {
            if (el) lineRefs.current[1] = el;
          }}
          className="pl-12 sm:pl-20 md:pl-32 lg:pl-40"
        >
          of Excellence
        </div>
      </div>

      {/* Subtitle */}
      <div
        ref={subRef}
        className="flex items-center justify-center max-w-xl mx-auto z-10"
      >
        <img
          src={LaurelLeft}
          alt=""
          className="w-8 md:w-10 lg:w-12 flex-shrink-0 opacity-90"
        />
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed text-center px-2">
          Behind every trophy is a team that refused to settle for ordinary —
          recognized locally, celebrated globally
        </p>
        <img
          src={LaurelRight}
          alt=""
          className="w-8 md:w-10 lg:w-12 flex-shrink-0 opacity-90"
        />
      </div>
    </section>
  );
};

export default AwardsHeroSection;
