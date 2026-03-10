import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EXECUTIVE_BOARD, SECTIONS, Committee } from '../constants/committeeData';
import { CommitteeCard } from './CommitteeCard';
import { SectionIcon } from './SectionIcon';
import { HiChevronDown } from 'react-icons/hi';

// ─── Animation helpers ───────────────────────────────────────────────────────

const inView = (delay = 0) => ({
    initial: { opacity: 0, y: 20 } as const,
    animate: { opacity: 1, y: 0 } as const,
    transition: { duration: 0.5, delay, ease: 'easeOut' as const },
});

const vLine = (delay = 0) => ({
    initial: { scaleY: 0 } as const,
    animate: { scaleY: 1 } as const,
    transition: { duration: 0.4, delay, ease: 'easeOut' as const },
});

const hLine = (delay = 0) => ({
    initial: { scaleX: 0 } as const,
    animate: { scaleX: 1 } as const,
    transition: { duration: 0.4, delay, ease: 'easeOut' as const },
});

// ─── Main Component ───────────────────────────────────────────────────────────

interface OrgChartViewProps {
    onViewDetails: (committee: Committee) => void;
}

export const OrgChartView = ({ onViewDetails }: OrgChartViewProps) => {
    const [expandedSection, setExpandedSection] = useState<string | null>(null);

    const toggleSection = (sectionName: string) => {
        setExpandedSection(expandedSection === sectionName ? null : sectionName);
    };

    const activeSection = SECTIONS.find((s) => s.name === expandedSection);

    return (
        <div className="max-w-6xl mx-auto px-6 py-16">
            {/* ═══════════════ Level 1: Chair & Vice Chair ═══════════════ */}
            <motion.div className="flex justify-center" {...inView(0)}>
                <OrgNode
                    label="Chair & Vice Chair"
                    subtitle={`${EXECUTIVE_BOARD[0]!.name} & ${EXECUTIVE_BOARD[1]!.name}`}
                    avatar={EXECUTIVE_BOARD[0]!.image}
                    highlighted
                    size="lg"
                />
            </motion.div>

            {/* ↓ connector */}
            <Connector />

            {/* ═══════════════ Level 2: Secretary & Treasurer ═══════════════ */}
            <TwoNodeRow
                left={{ label: 'Secretary', subtitle: EXECUTIVE_BOARD[2]!.name, avatar: EXECUTIVE_BOARD[2]!.image }}
                right={{ label: 'Treasurer', subtitle: EXECUTIVE_BOARD[3]!.name, avatar: EXECUTIVE_BOARD[3]!.image }}
                delay={0.15}
            />

            {/* ↓ connector */}
            <Connector />

            {/* ═══════════════ Level 3: PR&FR and OC ═══════════════ */}
            <TwoNodeRow
                left={{ label: 'PR & FR', subtitle: EXECUTIVE_BOARD[4]!.name, avatar: EXECUTIVE_BOARD[4]!.image }}
                right={{ label: 'OC', subtitle: EXECUTIVE_BOARD[5]!.name, avatar: EXECUTIVE_BOARD[5]!.image }}
                delay={0.15}
            />

            {/* ↓ connector */}
            <Connector height="h-12" />

            {/* ═══════════════ Level 4: Section Buttons ═══════════════ */}
            <div className="relative">
                {/* Horizontal line spanning all sections */}
                <div className="flex justify-center">
                    <motion.div
                        className="h-px bg-border origin-center"
                        style={{ width: `${Math.min(SECTIONS.length * 200, 900)}px` }}
                        {...hLine(0.1)}
                    />
                </div>

                {/* Section buttons row */}
                <div className="flex justify-center gap-4 sm:gap-6">
                    {SECTIONS.map((section, i) => (
                        <motion.div
                            key={section.name}
                            className="flex flex-col items-center"
                            {...inView(0.15 + i * 0.08)}
                        >
                            {/* Vertical stub from horizontal line */}
                            <div className="w-px h-6 bg-border" />
                            <button onClick={() => toggleSection(section.name)} className="group">
                                <motion.div
                                    className={`px-5 py-3.5 rounded-2xl border-2 transition-all duration-200 flex items-center gap-2.5 text-sm sm:text-base ${expandedSection === section.name
                                        ? 'bg-primary border-primary text-white shadow-lg shadow-primary/25'
                                        : 'bg-card border-border text-foreground hover:border-primary/50 hover:shadow-lg'
                                        }`}
                                    whileHover={{ y: -2, scale: 1.02 }}
                                    whileTap={{ scale: 0.96 }}
                                >
                                    <SectionIcon
                                        sectionName={section.name}
                                        size="sm"
                                        active={expandedSection === section.name}
                                    />
                                    <span className="font-bold whitespace-nowrap">{section.name}</span>
                                    <HiChevronDown
                                        className={`w-4 h-4 transition-transform duration-300 ${expandedSection === section.name ? 'rotate-180' : ''
                                            }`}
                                    />
                                </motion.div>
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* ═══════════════ Level 5: Expanded Committee Cards (as tree branches) ═══════════════ */}
            <AnimatePresence mode="wait">
                {activeSection && (
                    <motion.div
                        key={activeSection.name}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: 'easeOut' as const }}
                        className="overflow-hidden"
                    >
                        {/* Central connector going down from section */}
                        <div className="flex justify-center">
                            <motion.div
                                className="w-px h-10 bg-primary origin-top"
                                initial={{ scaleY: 0 }}
                                animate={{ scaleY: 1 }}
                                transition={{ duration: 0.3, delay: 0.1 }}
                            />
                        </div>

                        {/* Section header */}
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <SectionIcon sectionName={activeSection.name} size="lg" />
                            <h3 className="text-2xl font-bold text-foreground">
                                {activeSection.name} Committees
                            </h3>
                        </div>

                        {/* Committee cards with tree branches */}
                        <div className="relative">
                            {/* Central vertical line running through all cards */}
                            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-primary/20 -translate-x-1/2" />

                            <div className="space-y-6">
                                {activeSection.committees.map((committee, i) => {
                                    const isLeft = i % 2 === 0;
                                    return (
                                        <motion.div
                                            key={committee.slug}
                                            initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{
                                                duration: 0.4,
                                                delay: 0.2 + i * 0.1,
                                                ease: 'easeOut' as const,
                                            }}
                                            className="relative"
                                        >
                                            {/* Horizontal branch from center line to card */}
                                            <div
                                                className={`absolute top-1/2 -translate-y-1/2 h-px bg-primary/30 ${isLeft
                                                    ? 'right-1/2 left-[5%] sm:left-[10%]'
                                                    : 'left-1/2 right-[5%] sm:right-[10%]'
                                                    }`}
                                            />
                                            {/* Dot on the center line */}
                                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary border-2 border-background z-10" />

                                            {/* Card container - alternating sides */}
                                            <div
                                                className={`flex ${isLeft ? 'justify-start pr-[55%]' : 'justify-end pl-[55%]'
                                                    }`}
                                            >
                                                <div className="w-full">
                                                    <CommitteeCard
                                                        committee={committee}
                                                        delay={0}
                                                        onViewDetails={onViewDetails}
                                                    />
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// ─── Vertical Connector ──────────────────────────────────────────────────────

const Connector = ({ height = 'h-8' }: { height?: string }) => (
    <div className="flex justify-center">
        <motion.div className={`w-px ${height} bg-border origin-top`} {...vLine(0.05)} />
    </div>
);

// ─── Two-Node Row with proper horizontal connector ──────────────────────────

interface TwoNodeRowProps {
    left: { label: string; subtitle: string; avatar: string };
    right: { label: string; subtitle: string; avatar: string };
    delay?: number;
}

const TwoNodeRow = ({ left, right, delay = 0 }: TwoNodeRowProps) => (
    <div className="relative">
        {/* Horizontal line connecting the two nodes */}
        <div className="flex justify-center">
            <motion.div className="w-60 h-px bg-border origin-center" {...hLine(delay)} />
        </div>
        {/* Nodes */}
        <div className="flex justify-center gap-16 sm:gap-20">
            <motion.div className="flex flex-col items-center" {...inView(delay + 0.1)}>
                <div className="w-px h-5 bg-border" />
                <OrgNode label={left.label} subtitle={left.subtitle} avatar={left.avatar} />
            </motion.div>
            <motion.div className="flex flex-col items-center" {...inView(delay + 0.2)}>
                <div className="w-px h-5 bg-border" />
                <OrgNode label={right.label} subtitle={right.subtitle} avatar={right.avatar} />
            </motion.div>
        </div>
    </div>
);

// ─── Org Chart Node ─────────────────────────────────────────────────────────

interface OrgNodeProps {
    label: string;
    subtitle?: string;
    avatar?: string;
    highlighted?: boolean;
    size?: 'md' | 'lg';
}

const OrgNode = ({ label, subtitle, avatar, highlighted, size = 'md' }: OrgNodeProps) => (
    <motion.div
        className={`flex items-center rounded-2xl border-2 shadow-sm transition-shadow ${size === 'lg' ? 'gap-5 px-8 py-5' : 'gap-4 px-6 py-4'
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
