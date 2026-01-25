import { motion } from 'framer-motion';
import { SwishUnderline } from './SwishUnderline';
import { FeatureCard } from './FeatureCard';
import { HiUsers, HiLightningBolt, HiGlobeAlt } from 'react-icons/hi';

interface HeroSectionProps {
    activeCardIndex: number;
    onCardExpand: (index: number) => void;
}

export const HeroSection = ({ activeCardIndex, onCardExpand }: HeroSectionProps) => {
    return (
        <section className="relative h-screen px-6 flex items-center bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto w-full py-20">
                {/* Split Column Layout */}
                <div className="grid lg:grid-cols-2 gap-8 mb-8 mt-8">
                    {/* Left Column - Heading */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0.0, 0.2, 1] }}
                            className="mb-3"
                        >
                            <span className="text-xs font-bold tracking-widest text-info uppercase">
                                Student Innovation • Technology • Community
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4, ease: [0.4, 0.0, 0.2, 1] }}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1] mb-6"
                        >
                            Discover the <SwishUnderline>power</SwishUnderline> of engineering on your terms
                        </motion.h1>
                    </div>

                    {/* Right Column - Description & CTA */}
                    <div className="flex flex-col justify-center">
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
                            className="text-base md:text-lg text-gray-600 leading-relaxed mb-6"
                        >
                            Join IEEE Cairo University Student Branch and unlock opportunities for professional
                            growth, technical excellence, and innovation.
                        </motion.p>

                        {/* Pill CTA Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8, ease: [0.4, 0.0, 0.2, 1] }}
                        >
                            <motion.a
                                href="#join"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="inline-flex items-center gap-3 bg-gray-900 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition-all shadow-xl hover:shadow-2xl group"
                            >
                                <span>Join IEEE CUSB</span>
                                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                                    <svg
                                        className="w-4 h-4 text-gray-900"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                                        />
                                    </svg>
                                </div>
                            </motion.a>
                        </motion.div>
                    </div>
                </div>

                {/* Feature Cards - Auto-Expanding Flex Grid */}
                <div className="flex gap-4">
                    <FeatureCard
                        variant="main"
                        title="Student Community"
                        description="Join 500+ engineering students advancing technology through collaborative projects."
                        bgPattern="waves1"
                        icon={<HiUsers />}
                        index={0}
                        activeIndex={activeCardIndex}
                        onExpand={onCardExpand}
                        delay={0}
                    />
                    <FeatureCard
                        variant="secondary"
                        title="Technical Excellence"
                        description="World-class workshops in AI, robotics, and emerging technologies."
                        bgPattern="waves2"
                        icon={<HiLightningBolt />}
                        index={1}
                        activeIndex={activeCardIndex}
                        onExpand={onCardExpand}
                        delay={0.1}
                    />
                    <FeatureCard
                        variant="secondary"
                        title="Global Network"
                        description="Connect with 400,000+ IEEE members across 160 countries."
                        bgPattern="waves3"
                        icon={<HiGlobeAlt />}
                        index={2}
                        activeIndex={activeCardIndex}
                        onExpand={onCardExpand}
                        delay={0.2}
                    />
                </div>
            </div>

            {/* Decorative Dot Mesh Pattern */}
            <div className="absolute top-32 right-12 w-32 h-32 opacity-20">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                    {[...Array(25)].map((_, i) => (
                        <circle
                            key={i}
                            cx={(i % 5) * 25 + 12.5}
                            cy={Math.floor(i / 5) * 25 + 12.5}
                            r="2"
                            fill="currentColor"
                            className="text-primary"
                        />
                    ))}
                </svg>
            </div>
        </section>
    );
};
