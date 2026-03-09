import { motion } from 'framer-motion';
import { Committee } from '../constants/committeeData';
import { getCommitteeIllustration } from '../constants/committeeIllustrations';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';

interface CommitteeCardProps {
    committee: Committee;
    delay?: number;
    onViewDetails: (committee: Committee) => void;
}

export const CommitteeCard = ({ committee, delay = 0, onViewDetails }: CommitteeCardProps) => {
    const illustration = getCommitteeIllustration(committee.slug);

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
            className="group relative bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
            onClick={() => onViewDetails(committee)}
        >
            <div className="flex items-start justify-between p-6 min-h-[210px]">
                {/* Left Content */}
                <div className="flex-1 pr-4 flex flex-col justify-between h-full min-h-[175px]">
                    <div>
                        <span className="text-primary font-semibold text-sm tracking-wide">
                            {committee.sectionName}
                        </span>
                        <h3 className="text-2xl font-extrabold text-foreground uppercase tracking-tight mt-1.5 leading-tight">
                            {committee.name}
                        </h3>
                        <p className="text-muted-foreground text-sm mt-3 leading-relaxed line-clamp-2">
                            {committee.description}
                        </p>
                    </div>

                    <motion.button
                        whileHover={{ x: 4 }}
                        className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-widest mt-5 w-fit shadow-md hover:shadow-lg hover:bg-primary/90 transition-all"
                    >
                        View Details
                        <HiOutlineArrowNarrowRight className="w-4 h-4" />
                    </motion.button>
                </div>

                {/* Right: Illustration from public/illustrations/ */}
                <div className="flex-shrink-0 flex items-center justify-center w-36 h-36 self-center">
                    <img
                        src={illustration}
                        alt={committee.name}
                        className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                        loading="lazy"
                    />
                </div>
            </div>
        </motion.div>
    );
};
