import { motion } from 'framer-motion';
import { Committee } from '../constants/committeeData';
import { MemberCard } from './MemberCard';
import { HiUserAdd } from 'react-icons/hi';

interface CommitteeCardProps {
    committee: Committee;
    delay?: number;
}

export const CommitteeCard = ({ committee, delay = 0 }: CommitteeCardProps) => {
    const hasMembers = committee.members.length > 0 || committee.head;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay, ease: [0.4, 0, 0.2, 1] }}
            className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
        >
            {/* Header */}
            <div className="bg-primary/5 px-5 py-4 border-b border-border">
                <h3 className="text-lg font-bold text-foreground">{committee.name}</h3>
            </div>

            {/* Body */}
            <div className="p-4">
                {/* Head */}
                {committee.head && (
                    <div className="mb-3">
                        <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                            Head
                        </p>
                        <MemberCard member={committee.head} />
                    </div>
                )}

                {/* Members */}
                {committee.members.length > 0 && (
                    <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                            Members
                        </p>
                        <div className="space-y-1">
                            {committee.members.map((m, i) => (
                                <MemberCard key={i} member={m} compact />
                            ))}
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {!hasMembers && (
                    <div className="flex flex-col items-center py-6">
                        <p className="text-muted-foreground mb-3 text-sm">
                            No members yet — be the first!
                        </p>
                        <motion.a
                            href="/join"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-primary/90 transition-colors shadow-md"
                        >
                            <HiUserAdd className="w-4 h-4" />
                            Join Us!
                        </motion.a>
                    </div>
                )}
            </div>
        </motion.div>
    );
};
