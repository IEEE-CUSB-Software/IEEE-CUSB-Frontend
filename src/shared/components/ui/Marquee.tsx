import { ReactNode, CSSProperties } from 'react';

interface MarqueeProps {
  /** Content to scroll */
  children: ReactNode;
  /** Duration of one full scroll cycle in seconds */
  duration?: number;
  /** Scroll direction */
  direction?: 'left' | 'right';
  /** Pause on hover */
  pauseOnHover?: boolean;
  /** Gap between repeated items */
  gap?: number;
  /** Additional className */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}

/**
 * Infinite scrolling marquee component.
 * Duplicates children to create a seamless loop.
 */
export const Marquee = ({
  children,
  duration = 30,
  direction = 'left',
  pauseOnHover = true,
  gap = 0,
  className = '',
  style,
}: MarqueeProps) => {
  const animationDirection = direction === 'left' ? 'normal' : 'reverse';

  return (
    <div className={`overflow-hidden ${className}`} style={style}>
      <div
        className={`flex w-max ${pauseOnHover ? 'hover:[animation-play-state:paused]' : ''}`}
        style={{
          animation: `marqueeScroll ${duration}s linear infinite`,
          animationDirection,
          gap: `${gap}px`,
        }}
      >
        {/* First copy */}
        <div className="flex shrink-0" style={{ gap: `${gap}px` }}>
          {children}
        </div>
        {/* Duplicate for seamless loop */}
        <div className="flex shrink-0" style={{ gap: `${gap}px` }} aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
};
