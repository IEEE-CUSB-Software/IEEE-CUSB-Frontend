import { motion } from 'framer-motion';

export const CommitteeHeroSection = () => {
    return (
        <section className="relative h-[60vh] px-6 flex items-center bg-background md:-mt-32">
            <div className="max-w-7xl mx-auto w-full pt-28 md:pt-32 pb-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
                    className="mb-3"
                >
                    <span className="text-xs font-bold tracking-widest text-info uppercase">
                        Our Structure
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] mb-6 max-w-3xl"
                >
                    Committees & Structure
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
                    className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl"
                >
                    Explore the organizational structure of IEEE Cairo University Student
                    Branch. Discover our executive board, technical sections, and the teams
                    behind every achievement.
                </motion.p>
            </div>

            {/* Decorative dots */}
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
