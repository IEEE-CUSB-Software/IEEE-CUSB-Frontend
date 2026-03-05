import { motion } from 'framer-motion';
import { Award } from '../constants/Trophies';
import trophy from '../../../assets/IEEE_Trophy.png';

function TrophyCard({ award, darkMode }: { award: Award; darkMode: boolean }) {
  return (
    <div className="flex flex-col items-center pt-8">
      <motion.div
        whileHover={{ scale: 1.1, y: -15 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center w-full"
      >
        {/* Trophy Image */}
        <div className={`relative flex justify-end items-end rounded-lg`}>
          <img
            src={trophy}
            alt={award.title}
            className="w-40 h-48 object-contain"
          />

          {award.won && (
            <div
              className={`flex -ml-6 items-end gap-1 sm:gap-2 ${darkMode ? 'text-white' : 'text-primary'}`}
            >
              <span className="text-2xl sm:text-2xl md:text-3xl font-bold leading-none pb-1">
                {award.won}
              </span>
              <div className="text-[6px] sm:text-[6px] md:text-[8px] uppercase font-bold pb-0.5 opacity-90">
                <p>Times</p>
                <p>Winner</p>
              </div>
            </div>
          )}
        </div>

        {/* Trophy Info */}
        <div className="text-center w-full">
          <motion.h4
            initial={{ backgroundPosition: '0% center' }}
            whileHover={{ backgroundPosition: '100% center' }}
            transition={{ duration: 2.5, ease: 'linear' }}
            className={`text-lg font-bold mb-2 pt-0.5 pb-0.5 text-info rounded-xl ${
              darkMode
                ? 'bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 text-white'
                : 'bg-gradient-to-r from-gray-600 via-gray-550 to-gray-600'
            } shadow-[0_14px_18px_-8px_rgba(0,0,0,0.6)]`}
          >
            {award.title}
          </motion.h4>
          <div className="text-m font-semibold tracking-wide text-info uppercase mb-2 line-clamp-1">
            {award.year}
          </div>
          <p
            className={`text-sm leading-relaxed line-clamp-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            {award.brief}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default TrophyCard;
