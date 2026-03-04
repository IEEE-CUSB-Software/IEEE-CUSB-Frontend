import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EXECUTIVE_BOARD, SECTIONS } from '../constants/committeeData';
import { CommitteeCard } from './CommitteeCard';
import { SectionIcon } from './SectionIcon';

export const TabbedView = () => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            {/* ─── Executive Board (Pinned) ─── */}
            <div className="mb-10">
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <span className="w-1.5 h-8 bg-primary rounded-full" />
                    Executive Board
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                    {EXECUTIVE_BOARD.map((exec, i) => (
                        <motion.div
                            key={exec.position}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: i * 0.08 }}
                            className="bg-card border border-border rounded-2xl p-4 text-center shadow-sm hover:shadow-md transition-shadow"
                        >
                            <img
                                src={exec.image}
                                alt={exec.name}
                                className="w-16 h-16 rounded-full object-cover mx-auto mb-3 border-2 border-primary/20"
                            />
                            <p className="font-bold text-foreground text-sm truncate">
                                {exec.name}
                            </p>
                            <p className="text-xs text-primary font-semibold">
                                {exec.position}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* ─── Section Tabs ─── */}
            <div className="mb-8">
                <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
                    {SECTIONS.map((section, i) => (
                        <button
                            key={section.name}
                            onClick={() => setActiveTab(i)}
                            className={`flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 border ${activeTab === i
                                ? 'bg-primary border-primary text-white shadow-md'
                                : 'bg-card border-border text-foreground hover:border-primary/40'
                                }`}
                        >
                            <SectionIcon sectionName={section.name} size="sm" active={activeTab === i} />
                            {section.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* ─── Tab Content: Committees ─── */}
            <AnimatePresence mode="wait">
                {(() => {
                    const currentSection = SECTIONS[activeTab];
                    if (!currentSection) return null;
                    return (
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                                <SectionIcon sectionName={currentSection.name} size="lg" />
                                {currentSection.name} Section
                            </h3>
                            <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-8">
                                {currentSection.committees.map((committee, i) => (
                                    <CommitteeCard
                                        key={committee.name}
                                        committee={committee}
                                        delay={i * 0.08}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    );
                })()}
            </AnimatePresence>
        </div>
    );
};
