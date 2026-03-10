import { CSSProperties, useState } from 'react';

/** Seeded pseudo-random number generator (deterministic per ray index) */
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

interface LightRaysProps {
  /** Background color behind the rays */
  backgroundColor?: string;
  /** Ray color configuration */
  raysColor?:
    | { mode: 'single'; color: string }
    | { mode: 'multi'; color1: string; color2: string };
  /** Number of ray beams */
  rayCount?: number;
  /** Overall opacity of the rays layer */
  opacity?: number;
  /** Additional className */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}

/**
 * Animated light rays background effect.
 * Creates radiating beams of light with a subtle rotation animation.
 */
export const LightRays = ({
  backgroundColor = 'var(--color-background)',
  raysColor = { mode: 'multi', color1: '#00529b', color2: '#00aeef' },
  rayCount = 12,
  opacity = 0.4,
  className = '',
  style,
}: LightRaysProps) => {
  const [rays] = useState(() => {
    const items: {
      angle: number;
      color: string;
      width: number;
      delay: number;
    }[] = [];
    for (let i = 0; i < rayCount; i++) {
      const angle = (360 / rayCount) * i;
      const color =
        raysColor.mode === 'single'
          ? raysColor.color
          : i % 2 === 0
            ? raysColor.color1
            : raysColor.color2;
      // wide beams: 60–140 px
      const width = 60 + seededRandom(i * 7 + 1) * 80;
      const delay = seededRandom(i * 13 + 2) * 4;
      items.push({ angle, color, width, delay });
    }
    return items;
  });

  return (
    <div
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{ backgroundColor, ...style }}
    >
      {/* Animated rays container – rotates slowly */}
      <div
        className="absolute inset-0 animate-[lightRaysSpin_60s_linear_infinite]"
        style={{ opacity }}
      >
        {rays.map((ray, i) => (
          <div
            key={i}
            className="absolute animate-[rayPulse_5s_ease-in-out_infinite]"
            style={{
              /*
               * Position the bottom edge of the beam at the screen center.
               * The beam is centered horizontally around the origin.
               */
              bottom: '50%',
              left: '50%',
              width: `${ray.width}px`,
              height: '65%',
              marginLeft: `-${ray.width / 2}px`,
              transformOrigin: 'bottom center',
              transform: `rotate(${ray.angle}deg)`,
              background: `linear-gradient(to top, ${ray.color}bb 0%, ${ray.color}66 40%, ${ray.color}11 80%, transparent 100%)`,
              filter: 'blur(18px)',
              animationDelay: `${ray.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Strong radial glow at the center origin */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 70% 60% at 50% 50%, ${
            raysColor.mode === 'single' ? raysColor.color : raysColor.color2
          }55 0%, ${
            raysColor.mode === 'single' ? raysColor.color : raysColor.color1
          }22 35%, transparent 70%)`,
          opacity,
        }}
      />

      {/* Top fade so rays don't bleed over the navbar */}
      <div
        className="absolute inset-x-0 top-0 h-40"
        style={{
          background: `linear-gradient(to bottom, ${backgroundColor} 0%, transparent 100%)`,
        }}
      />

      {/* Bottom fade */}
      <div
        className="absolute inset-x-0 bottom-0 h-40"
        style={{
          background: `linear-gradient(to top, ${backgroundColor} 0%, transparent 100%)`,
        }}
      />
    </div>
  );
};
