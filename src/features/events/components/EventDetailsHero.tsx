import { motion } from 'framer-motion';
import { HiTag } from 'react-icons/hi';

interface EventDetailsHeroProps {
  title: string;
  description: string;
  image: string;
  category: string;
  categoryBadge: string;
}

export const EventDetailsHero = ({
  title,
  description,
  image,
  category,
  categoryBadge,
}: EventDetailsHeroProps) => {
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'technical':
        return 'bg-blue-100 text-blue-700';
      case 'social':
        return 'bg-orange-100 text-orange-700';
      case 'soft skills':
        return 'bg-purple-100 text-purple-700';
      case 'design':
        return 'bg-pink-100 text-pink-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="relative rounded-3xl overflow-hidden shadow-2xl mb-8"
    >
      {/* Hero Image */}
      <div className="relative h-[400px] overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          src={image}
          alt={title}
          className="w-full h-full object-cover opacity-80"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
          {/* Category Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-4"
          >
            <span
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-md ${getCategoryColor(category)}`}
            >
              <HiTag className="w-4 h-4" />
              {categoryBadge}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight"
          >
            {title}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-gray-200 max-w-3xl leading-relaxed"
          >
            {description}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};
