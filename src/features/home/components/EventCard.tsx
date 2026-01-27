import { motion } from 'framer-motion';

interface EventCardProps {
    title: string;
    description: string;
    icon: string;
    delay?: number;
}

/**
 * Animated event/activity card with hover lift effect
 * Used in Events & Activities section
 */
export const EventCard = ({
    title,
    description,
    icon,
    delay = 0,
}: EventCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
                duration: 0.5,
                delay,
                ease: [0.4, 0.0, 0.2, 1],
            }}
            whileHover={{
                y: -8,
                transition: { duration: 0.2 },
            }}
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100"
        >
            <div className="text-5xl mb-4">{icon}</div>
            <h3 className="text-2xl font-bold text-primary mb-3">{title}</h3>
            <p className="text-gray-600 leading-relaxed">{description}</p>
        </motion.div>
    );
};
