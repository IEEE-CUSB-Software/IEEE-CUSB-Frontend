import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  bgPattern?: 'waves1' | 'waves2' | 'waves3';
  variant?: 'main' | 'secondary';
  delay?: number;
  icon?: ReactNode;
  index: number;
  activeIndex: number;
  onExpand: (index: number) => void;
  darkMode?: boolean;
}

/**
 * Auto-expanding flex card with flowing wave backgrounds
 * Shows vertical title when inactive, horizontal when active
 * Colors: IEEE Blue shades only
 */
export const FeatureCard = ({
  title,
  description,
  bgPattern = 'waves1',
  delay = 0,
  icon,
  index,
  activeIndex,
  onExpand,
  darkMode,
}: FeatureCardProps) => {
  const isExpanded = activeIndex === index;

  // Flowing wave backgrounds in IEEE blue shades
  const backgrounds = {
    waves1: (
      <div className="absolute inset-0 overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop
                offset="0%"
                style={{ stopColor: '#00629B', stopOpacity: 1 }}
              />
              <stop
                offset="50%"
                style={{ stopColor: '#0082C8', stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: '#00A0E3', stopOpacity: 1 }}
              />
            </linearGradient>
          </defs>
          <path
            d="M0,100 Q50,80 100,100 T200,100 T300,100 T400,100 L400,400 L0,400 Z"
            fill="url(#grad1)"
            opacity="0.3"
          />
          <path
            d="M-100,150 Q0,120 100,150 T300,150 T500,150 L500,400 L-100,400 Z"
            fill="url(#grad1)"
            opacity="0.2"
          />
        </svg>
        <div className="absolute inset-0 bg-gradient-to-br from-[#004A7C] via-[#00629B] to-[#0082C8]" />
      </div>
    ),
    waves2: (
      <div className="absolute inset-0 overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="grad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop
                offset="0%"
                style={{ stopColor: '#0082C8', stopOpacity: 1 }}
              />
              <stop
                offset="50%"
                style={{ stopColor: '#00629B', stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: '#004A7C', stopOpacity: 1 }}
              />
            </linearGradient>
          </defs>
          <path
            d="M0,80 Q100,60 200,80 T400,80 L400,400 L0,400 Z"
            fill="url(#grad2)"
            opacity="0.25"
          />
          <path
            d="M0,140 Q150,110 300,140 T600,140 L600,400 L0,400 Z"
            fill="url(#grad2)"
            opacity="0.15"
          />
        </svg>
        <div className="absolute inset-0 bg-gradient-to-tl from-[#00527D] via-[#00629B] to-[#007AB8]" />
      </div>
    ),
    waves3: (
      <div className="absolute inset-0 overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="grad3" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop
                offset="0%"
                style={{ stopColor: '#003D5C', stopOpacity: 1 }}
              />
              <stop
                offset="50%"
                style={{ stopColor: '#00629B', stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: '#0090D0', stopOpacity: 1 }}
              />
            </linearGradient>
          </defs>
          <path
            d="M0,120 Q80,90 160,120 T320,120 T480,120 L480,400 L0,400 Z"
            fill="url(#grad3)"
            opacity="0.3"
          />
          <path
            d="M0,180 Q120,150 240,180 T480,180 L480,400 L0,400 Z"
            fill="url(#grad3)"
            opacity="0.2"
          />
        </svg>
        <div className="absolute inset-0 bg-gradient-to-tr from-[#004A7C] via-[#00629B] to-[#00A0E3]" />
      </div>
    ),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: delay + 1.2,
        ease: [0.4, 0.0, 0.2, 1],
      }}
      onClick={() => onExpand(index)}
      className={`
        group relative overflow-hidden rounded-3xl cursor-pointer
        ${isExpanded ? 'flex-[3]' : 'flex-1'}
        h-[280px]
        transition-all duration-700 ease-out
        shadow-xl ${isExpanded ? 'shadow-2xl' : ''}
      `}
    >
      {/* Flowing wave background */}
      {backgrounds[bgPattern]}

      {/* Large background icon - only when expanded */}
      <AnimatePresence>
        {icon && isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="absolute top-8 right-8 text-[200px] text-white"
          >
            {icon}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content with smooth transitions - Fixed positioning */}
      <div className="absolute inset-0 p-6 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!isExpanded ? (
            // Vertical title when inactive
            <motion.div
              key="vertical"
              initial={{ opacity: 0, rotateZ: 0 }}
              animate={{ opacity: 1, rotateZ: 0 }}
              exit={{ opacity: 0, rotateZ: 90 }}
              transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
              className="flex items-center justify-center"
            >
              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`text-2xl font-bold transition-colors duration-300 ${darkMode ? 'text-white/70' : 'text-white'}`}
                style={{
                  writingMode: 'vertical-rl',
                  transform: 'rotate(180deg)',
                }}
              >
                {title}
              </motion.h3>
            </motion.div>
          ) : (
            // Horizontal layout when active
            <motion.div
              key="horizontal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
              className="w-full h-full flex flex-col justify-between"
            >
              <div>
                <motion.h3
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="text-2xl font-bold text-white mb-4"
                >
                  {title}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="text-gray-100 leading-relaxed"
                >
                  {description}
                </motion.p>
              </div>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-auto origin-left"
              >
                <div className="h-1 bg-white rounded-full w-full" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
