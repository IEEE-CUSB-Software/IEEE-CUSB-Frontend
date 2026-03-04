import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EXECUTIVE_BOARD, SECTIONS } from '../constants/committeeData';
import { CommitteeCard } from './CommitteeCard';
import { SectionIcon } from './SectionIcon';
import { HiChevronDown } from 'react-icons/hi';

// ─── Animation Variants ─────────────────────────────────────────────────────

const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] } },
});

const connectorGrow = (delay: number) => ({
    initial: { scaleY: 0 },
    animate: { scaleY: 1, transition: { duration: 0.35, delay, ease: 'easeOut' as const } },
});

const lineGrow = (delay: number) => ({
    initial: { scaleX: 0 },
    animate: { scaleX: 1, transition: { duration: 0.35, delay, ease: 'easeOut' as const } },
});

export const OrgChartView = () => {
    const [expandedSection, setExpandedSection] = useState<string | null>(null);

    const toggleSection = (sectionName: string) => {
        setExpandedSection(expandedSection === sectionName ? null : sectionName);
    };

    const activeSection = SECTIONS.find((s) => s.name === expandedSection);

    return (
        <div className="max-w-7xl mx-auto px-6 py-16">
            {/* ─── Level 1: Chair & Vice Chair ─── */}
            <motion.div className="flex justify-center mb-2" {...fadeUp(0)}>
                <OrgNode
                    label="Chair & Vice Chair"
                    subtitle={`${EXECUTIVE_BOARD[0]!.name} & ${EXECUTIVE_BOARD[1]!.name}`}
                    avatar={EXECUTIVE_BOARD[0]!.image}
                    highlighted
                    size="lg"
                />
            </motion.div>

            {/* Connector */}
            <div className="flex justify-center">
                <motion.div className="w-0.5 h-10 bg-border origin-top" {...connectorGrow(0.3)} />
            </div>

            {/* ─── Level 2: Secretary & Treasurer ─── */}
            <div className="flex justify-center gap-16 mb-2 relative">
                {/* Horizontal connector */}
                <motion.div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-0.5 bg-border origin-center"
                    {...lineGrow(0.5)}
                />
                <motion.div className="flex flex-col items-center" {...fadeUp(0.6)}>
                    <div className="w-0.5 h-5 bg-border" />
                    <OrgNode
                        label="Secretary"
                        subtitle={EXECUTIVE_BOARD[2]!.name}
                        avatar={EXECUTIVE_BOARD[2]!.image}
                    />
                </motion.div>
                <motion.div className="flex flex-col items-center" {...fadeUp(0.7)}>
                    <div className="w-0.5 h-5 bg-border" />
                    <OrgNode
                        label="Treasurer"
                        subtitle={EXECUTIVE_BOARD[3]!.name}
                        avatar={EXECUTIVE_BOARD[3]!.image}
                    />
                </motion.div>
            </div>

            {/* Connector */}
            <div className="flex justify-center">
                <motion.div className="w-0.5 h-10 bg-border origin-top" {...connectorGrow(0.8)} />
            </div>

            {/* ─── Level 3: PR&FR and OC ─── */}
            <div className="flex justify-center gap-16 mb-2 relative">
                <motion.div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-0.5 bg-border origin-center"
                    {...lineGrow(0.9)}
                />
                <motion.div className="flex flex-col items-center" {...fadeUp(1.0)}>
                    <div className="w-0.5 h-5 bg-border" />
                    <OrgNode
                        label="PR & FR"
                        subtitle={EXECUTIVE_BOARD[4]!.name}
                        avatar={EXECUTIVE_BOARD[4]!.image}
                    />
                </motion.div>
                <motion.div className="flex flex-col items-center" {...fadeUp(1.1)}>
                    <div className="w-0.5 h-5 bg-border" />
                    <OrgNode
                        label="OC"
                        subtitle={EXECUTIVE_BOARD[5]!.name}
                        avatar={EXECUTIVE_BOARD[5]!.image}
                    />
                </motion.div>
            </div>

            {/* Connector */}
            <div className="flex justify-center">
                <motion.div className="w-0.5 h-12 bg-border origin-top" {...connectorGrow(1.2)} />
            </div>

            {/* ─── Level 4: Sections ─── */}
            <div className="relative mb-6">
                {/* Horizontal line across all sections */}
                <motion.div
                    className="absolute top-0 left-[5%] right-[5%] h-0.5 bg-border origin-center"
                    {...lineGrow(1.3)}
                />

                <div className="flex flex-wrap justify-center gap-5 pt-6">
                    {SECTIONS.map((section, i) => (
                        <motion.div
                            key={section.name}
                            className="flex flex-col items-center"
                            {...fadeUp(1.4 + i * 0.1)}
                        >
                            <div className="w-0.5 h-6 bg-border -mt-6" />
                            <button
                                onClick={() => toggleSection(section.name)}
                                className="group"
                            >
                                <motion.div
                                    className={`px-6 py-4 rounded-2xl border-2 transition-all duration-200 flex items-center gap-3 ${expandedSection === section.name
                                        ? 'bg-primary border-primary text-white shadow-lg shadow-primary/25'
                                        : 'bg-card border-border text-foreground hover:border-primary/50 hover:shadow-lg'
                                        }`}
                                    whileHover={{ y: -3, scale: 1.02 }}
                                    whileTap={{ scale: 0.96 }}
                                >
                                    <SectionIcon
                                        sectionName={section.name}
                                        size="md"
                                        active={expandedSection === section.name}
                                    />
                                    <span className="font-bold text-base">{section.name}</span>
                                    <HiChevronDown
                                        className={`w-5 h-5 transition-transform duration-300 ${expandedSection === section.name ? 'rotate-180' : ''
                                            }`}
                                    />
                                </motion.div>
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* ─── Expanded Section: Committee Cards Grid ─── */}
            <AnimatePresence mode="wait">
                {activeSection && (
                    <motion.div
                        key={activeSection.name}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    >
                        {/* Connector from section */}
                        <div className="flex justify-center mb-8">
                            <motion.div
                                className="w-0.5 h-10 bg-primary origin-top"
                                initial={{ scaleY: 0 }}
                                animate={{ scaleY: 1 }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>

                        <div className="flex items-center gap-3 mb-8">
                            <SectionIcon sectionName={activeSection.name} size="lg" />
                            <h3 className="text-2xl font-bold text-foreground">
                                {activeSection.name} Section
                            </h3>
                        </div>

                        <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-8">
                            {activeSection.committees.map((committee, i) => (
                                <CommitteeCard
                                    key={committee.name}
                                    committee={committee}
                                    delay={i * 0.1}
                                />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// ─── Org Chart Node component ────────────────────────────────────────────────

interface OrgNodeProps {
    label: string;
    subtitle?: string;
    avatar?: string;
    highlighted?: boolean;
    size?: 'md' | 'lg';
}

const OrgNode = ({ label, subtitle, avatar, highlighted, size = 'md' }: OrgNodeProps) => (
    <motion.div
        className={`flex items-center rounded-2xl border-2 shadow-sm transition-shadow ${size === 'lg' ? 'gap-5 px-8 py-5' : 'gap-4 px-7 py-4'
            } ${highlighted
                ? 'bg-primary border-primary text-white shadow-lg shadow-primary/25'
                : 'bg-card border-border text-foreground hover:shadow-md'
            }`}
        whileHover={{ y: -2, scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
        {avatar && (
            <img
                src={avatar}
                alt={label}
                className={`rounded-full object-cover flex-shrink-0 border-2 ${size === 'lg' ? 'w-16 h-16' : 'w-14 h-14'
                    } ${highlighted ? 'border-white/30' : 'border-primary/20'}`}
            />
        )}
        <div>
            <p
                className={`font-bold ${size === 'lg' ? 'text-lg' : 'text-base'} ${highlighted ? 'text-white' : 'text-foreground'
                    }`}
            >
                {label}
            </p>
            {subtitle && (
                <p
                    className={`${size === 'lg' ? 'text-base' : 'text-sm'} ${highlighted ? 'text-white/80' : 'text-muted-foreground'
                        }`}
                >
                    {subtitle}
                </p>
            )}
        </div>
    </motion.div>
);
