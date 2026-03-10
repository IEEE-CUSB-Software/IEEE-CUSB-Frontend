import { motion, AnimatePresence } from 'framer-motion';
import { Committee } from '../constants/committeeData';
import { getCommitteeIllustration } from '../constants/committeeIllustrations';
import { HiX, HiArrowLeft } from 'react-icons/hi';
import { TeamMember } from '@/shared/types/team.types';
import { MemberCard as BoardMemberCard } from '@/shared/components/MemberCard';

interface CommitteeDetailModalProps {
  committee: Committee | null;
  onClose: () => void;
}

export const CommitteeDetailModal = ({
  committee,
  onClose,
}: CommitteeDetailModalProps) => {
  if (!committee) return null;

  // Collect board members (head + viceHead)
  const boardMembers: { member: TeamMember; title: string }[] = [];
  if (committee.head) {
    boardMembers.push({
      member: committee.head,
      title: `${committee.name} Head`,
    });
  }
  if (committee.viceHead) {
    boardMembers.push({
      member: committee.viceHead,
      title: `${committee.name} Vice Head`,
    });
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center"
        onClick={onClose}
        data-lenis-prevent="true"
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.97 }}
          transition={{
            duration: 0.35,
            ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
          }}
          className="relative w-full max-w-5xl mx-4 max-h-[90vh] overflow-y-auto overscroll-contain scrollbar-hide bg-background rounded-3xl shadow-2xl"
          style={{ touchAction: 'pan-y' }}
          onClick={e => e.stopPropagation()}
          data-lenis-prevent="true"
        >
          {/* ─── Close Button ─── */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-surface transition-colors shadow-sm"
          >
            <HiX className="w-5 h-5" />
          </button>

          {/* ─── Header Section ─── */}
          <div className="bg-linear-to-br from-primary/5 via-background to-primary/3 px-8 py-10 sm:px-12">
            {/* Back link */}
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 text-primary font-medium text-sm mb-6 hover:underline"
            >
              <HiArrowLeft className="w-4 h-4" />
              Back to Committees
            </button>

            <div className="flex items-start justify-between gap-8">
              <div className="flex-1">
                <span className="text-primary font-semibold text-sm tracking-wide uppercase">
                  {committee.sectionName}
                </span>
                <h2 className="text-4xl sm:text-5xl font-extrabold text-foreground mt-2 tracking-tight">
                  {committee.name}
                </h2>
                <p className="text-muted-foreground text-lg mt-2 italic">
                  {committee.description}
                </p>
                <p className="text-foreground/80 text-base mt-4 leading-relaxed max-w-2xl">
                  The {committee.name} committee is part of the{' '}
                  {committee.sectionName} section. Our team works together to
                  push boundaries, share knowledge, and grow as professionals in
                  the field of {committee.name.toLowerCase()}.
                </p>
              </div>
              {/* Large illustration area */}
              <div className="hidden sm:flex shrink-0 w-44 h-44 rounded-3xl bg-primary/5 items-center justify-center">
                <img
                  src={getCommitteeIllustration(committee.slug)}
                  alt={committee.name}
                  className="w-36 h-36 object-contain"
                />
              </div>
            </div>
          </div>

          {/* ─── Committee Board ─── */}
          {boardMembers.length > 0 && (
            <div className="px-8 sm:px-12 pt-10">
              <h3 className="text-3xl font-extrabold text-foreground text-center mb-20">
                Committee&apos;s Board
              </h3>
              <div className="flex flex-wrap justify-center gap-8 sm:gap-12">
                {boardMembers.map(({ member: m, title }, i) => (
                  <BoardMemberCard
                    key={i}
                    member={m}
                    roleOverride={title}
                    delay={0.2 + i * 0.15}
                    size="lg"
                    disableReveal
                  />
                ))}
              </div>
            </div>
          )}

          {/* ─── Team Members ─── */}
          {committee.members.length > 0 && (
            <div className="px-8 sm:px-12">
              <h3 className="text-2xl font-bold text-foreground mb-8">
                Team Members
              </h3>
              <div className="flex flex-wrap justify-center gap-8">
                {committee.members.map((m, i) => (
                  <BoardMemberCard
                    key={i}
                    member={m}
                    delay={0.3 + i * 0.08}
                    size="sm"
                    disableReveal
                  />
                ))}
              </div>
            </div>
          )}

          {/* ─── Join CTA ─── */}
          <div className="bg-primary/5 border-t border-border px-8 sm:px-12 py-8 text-center">
            <p className="text-foreground font-semibold text-lg mb-3">
              Interested in Joining Us?
            </p>
            <p className="text-muted-foreground text-sm mb-5 max-w-md mx-auto">
              Be part of the {committee.name} committee and grow your skills
              alongside passionate peers.
            </p>
            <a
              href="/join"
              className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl"
            >
              Apply Now
              <HiArrowLeft className="w-4 h-4 rotate-180" />
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
