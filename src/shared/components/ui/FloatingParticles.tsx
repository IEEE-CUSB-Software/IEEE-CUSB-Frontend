import { useState } from 'react';
import { motion } from 'framer-motion';

/** Seeded pseudo-random number generator (deterministic per particle index) */
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

interface FloatingParticlesProps {
  /** Number of particles */
  count?: number;
  /** Particle color */
  color?: string;
  /** Additional className for the container */
  className?: string;
}

/**
 * Floating particles that drift upward with varying sizes and speeds.
 * Creates a subtle ambient effect.
 */
export const FloatingParticles = ({
  count = 20,
  color = 'var(--color-info)',
  className = '',
}: FloatingParticlesProps) => {
  const [particles] = useState(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: seededRandom(i * 3 + 1) * 100,
      y: seededRandom(i * 5 + 2) * 100,
      size: 2 + seededRandom(i * 7 + 3) * 4,
      duration: 8 + seededRandom(i * 11 + 4) * 12,
      delay: seededRandom(i * 13 + 5) * 5,
      opacity: 0.1 + seededRandom(i * 17 + 6) * 0.3,
    }))
  );

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: color,
            opacity: 0,
          }}
          animate={{
            y: [0, -80, -160],
            opacity: [0, p.opacity, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};
