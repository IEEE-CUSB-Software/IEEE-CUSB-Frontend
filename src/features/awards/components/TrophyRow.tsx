import { useRef } from 'react';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import trophy from '../../../assets/IEEE_Trophy.png';
import { useGSAP } from '@gsap/react';
import { Award } from '../../../features/about-us/constants/trophies';

export const TrophyRow = ({
  award,
  index,
  darkMode,
}: {
  award: Award;
  index: number;
  darkMode: boolean;
}) => {
  const isEven = index % 2 === 0;
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!cardRef.current || !imgRef.current || !contentRef.current) return;
    const xOffset = window.innerWidth < 768 ? 30 : 60;

    gsap.fromTo(
      imgRef.current,
      { x: isEven ? -xOffset : xOffset, y: 60, opacity: 0, scale: 0.92 },
      {
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 82%',
          toggleActions: 'play none none reset',
        },
      }
    );

    gsap.fromTo(
      contentRef.current,
      { x: isEven ? xOffset : -xOffset, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        delay: 0.15,
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 82%',
          toggleActions: 'play none none reset',
        },
      }
    );
  }, [isEven]);
  return (
    <div ref={cardRef}>
      <div
        className={`flex flex-col items-center gap-8 pt-4 sm:pt-6 md:pt-8 ${
          isEven ? 'md:flex-row' : 'md:flex-row-reverse'
        }`}
      >
        {/* Trophy Image */}

        <div className="flex flex-col items-center w-full md:w-1/2">
          <div
            className="relative flex justify-end items-end rounded-lg "
            ref={imgRef}
          >
            <img
              src={trophy}
              alt={award.title}
              className="w-24 h-32 sm:w-32 sm:h-40 md:w-36 md:h-44 lg:w-40 lg:h-48 object-contain "
            />
            {award.won && (
              <div
                className={`flex -ml-3 sm:-ml-5 md:-ml-6 items-end gap-1 sm:gap-1.5 md:gap-2 ${
                  darkMode ? 'text-white' : 'text-primary'
                }`}
              >
                <span className="text-lg sm:text-2xl md:text-2xl lg:text-3xl font-bold leading-none pb-1">
                  {award.won}
                </span>
                <div className="text-[5px] sm:text-[6px] md:text-[7px] lg:text-[8px] uppercase font-bold pb-0.5 opacity-90">
                  <p>Times</p>
                  <p>Winner</p>
                </div>
              </div>
            )}
          </div>

          {/* Title bar */}
          <div className="text-center w-full ">
            <motion.h4
              initial={{ backgroundPosition: '0% center' }}
              whileHover={{ backgroundPosition: '100% center' }}
              transition={{ duration: 2.5, ease: 'linear' }}
              className={`text-xs sm:text-sm md:text-base lg:text-lg font-bold  pt-0.5 pb-0.5 rounded-t-xl rounded-b-md ${
                darkMode
                  ? 'bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 text-white'
                  : 'bg-gradient-to-r from-gray-600 via-gray-550 to-gray-600 text-white'
              } shadow-[0_14px_18px_-8px_rgba(0,0,0,0.6)]`}
            >
              <div>{award.title}</div>
              <div className="text-[10px] sm:text-xs md:text-sm font-semibold tracking-wide text-info uppercase mb-1.5 sm:mb-2 line-clamp-1">
                {award.year}
              </div>
            </motion.h4>
          </div>
        </div>

        {/* Description */}
        <div
          className={`relative w-full md:w-1/2 text-center ${
            isEven ? 'md:text-left' : 'md:text-right'
          }`}
          ref={contentRef}
        >
          {/* Gold glow orb */}
          <div
            className="absolute top-1/2 left-1/2 pointer-events-none -z-10"
            style={{
              width: '80vw',
              maxWidth: '400px',
              height: '200px',
              transform: 'translate(-50%, -50%)',
              background:
                'radial-gradient(ellipse at center, rgba(74,144,217,0.25) 0%, transparent 70%)',
              borderRadius: '50%',
            }}
          />
          <p
            className={`text-md md:text-lg lg:text-xl text-center ${
              darkMode ? 'text-white' : 'text-foreground'
            }`}
          >
            {award.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrophyRow;
