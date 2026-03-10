import { motion } from 'framer-motion';
import { HiOutlineViewGrid, HiOutlineCollection } from 'react-icons/hi';

interface ViewToggleProps {
    activeView: 'orgChart' | 'tabbed';
    onViewChange: (view: 'orgChart' | 'tabbed') => void;
}

export const ViewToggle = ({ activeView, onViewChange }: ViewToggleProps) => {
    return (
        <div className="sticky top-24 z-30 flex justify-center py-5 bg-background/80 backdrop-blur-md border-b border-border">
            <div className="flex bg-surface rounded-full p-1.5 shadow-md border border-border">
                {(['orgChart', 'tabbed'] as const).map((view) => (
                    <button
                        key={view}
                        onClick={() => onViewChange(view)}
                        className={`relative px-7 py-3.5 rounded-full text-base font-semibold transition-colors duration-200 flex items-center gap-2.5 ${activeView === view
                                ? 'text-white'
                                : 'text-muted-foreground hover:text-foreground'
                            }`}
                    >
                        {activeView === view && (
                            <motion.div
                                layoutId="activeViewPill"
                                className="absolute inset-0 bg-primary rounded-full shadow-lg shadow-primary/20"
                                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                            />
                        )}
                        <span className="relative z-10 flex items-center gap-2.5">
                            {view === 'orgChart' ? (
                                <>
                                    <HiOutlineViewGrid className="w-5 h-5" />
                                    Org Chart
                                </>
                            ) : (
                                <>
                                    <HiOutlineCollection className="w-5 h-5" />
                                    Browse by Section
                                </>
                            )}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
};
