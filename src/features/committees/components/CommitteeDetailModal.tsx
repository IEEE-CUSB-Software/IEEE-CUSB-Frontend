import { getCommitteeIllustration } from '../constants/committeeIllustrations';
import { HiArrowLeft } from 'react-icons/hi';
import { TeamMember } from '@/shared/types/team.types';
import { MemberCard as BoardMemberCard } from '@/shared/components/MemberCard';
import { Modal } from '@ieee-ui/ui';
import { useTheme } from '@/shared/hooks/useTheme';
import { useCommittee } from '@/shared/queries/committees';
import { MemberRole } from '@/shared/types/committees.types';

interface CommitteeDetailModalProps {
  committeeId: string | null;
  onClose: () => void;
}

export const CommitteeDetailModal = ({
  committeeId,
  onClose,
}: CommitteeDetailModalProps) => {
  const { isDark } = useTheme();
  const { data: committee, isLoading } = useCommittee(
    committeeId as string,
    !!committeeId
  );

  const boardMembers: { member: TeamMember; title: string }[] = [];
  const regularMembers: TeamMember[] = [];

  if (committee?.members) {
    committee.members.forEach((m) => {
      const mappedMember: TeamMember = {
        name: m.name,
        role: m.role,
        bio: '',
        image: m.image_url || '',
        socials: {},
      };
      if (m.role === MemberRole.HEAD) {
        boardMembers.push({
          member: mappedMember,
          title: `${committee.name} Head`,
        });
      } else if (m.role === MemberRole.VICE_HEAD) {
        boardMembers.push({
          member: mappedMember,
          title: `${committee.name} Vice Head`,
        });
      } else {
        regularMembers.push(mappedMember);
      }
    });
  }

  const slug = committee?.name?.toLowerCase().replace(/\s+/g, '-');
  const illustration = slug ? getCommitteeIllustration(slug) : '';

  return (
    <Modal
      isOpen={!!committeeId}
      onClose={onClose}
      title={committee?.name ?? ''}
      size="4xl"
      darkMode={isDark}
    >
      {/* data-lenis-prevent tells Lenis to stop intercepting wheel/touch events
          inside the modal so the native overflow-y-auto scroll works */}
      <div data-lenis-prevent>
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <p className="text-muted-foreground animate-pulse">
              Loading committee details...
            </p>
          </div>
        )}
        {committee && !isLoading && (
          <>
            {/* ─── Header: illustration + meta ─── */}
            <div className="flex items-start gap-8 mb-8">
              <div className="flex-1">
                <span className="text-primary font-semibold text-sm tracking-wide uppercase">
                  {committee.category?.name || 'Section'}
                </span>
                <p className="text-muted-foreground text-base mt-2 italic">
                  {committee.about}
                </p>
                <p className="text-foreground/80 text-sm mt-3 leading-relaxed">
                  The {committee.name} committee is part of the{' '}
                  {committee.category?.name || 'Section'} section. Our team works together to
                  push boundaries, share knowledge, and grow as professionals in
                  the field of {committee.name.toLowerCase()}.
                </p>
              </div>
              <div className="hidden sm:flex shrink-0 w-32 h-32 rounded-2xl bg-primary/5 items-center justify-center">
                <img
                  src={illustration}
                  alt={committee.name}
                  className="w-24 h-24 object-contain"
                />
              </div>
            </div>

            {/* ─── Committee Board ─── */}
            {boardMembers.length > 0 && (
              <>
                <h3 className="text-2xl font-extrabold text-foreground text-center mb-13">
                  Committee&apos;s Board
                </h3>
                <div className="flex flex-wrap justify-center gap-8 sm:gap-12">
                  {boardMembers.map(({ member: m, title }, i) => (
                    <BoardMemberCard
                      key={i}
                      member={m}
                      roleOverride={title}
                      delay={0.1 + i * 0.1}
                      size="lg"
                      disableReveal
                    />
                  ))}
                </div>
              </>
            )}

            {/* ─── Team Members ─── */}
            {regularMembers.length > 0 && (
              <>
                <h3 className="text-xl font-bold text-foreground text-center mb-9 mt-12">
                  Team Members
                </h3>
                <div className="flex flex-wrap justify-center gap-6">
                  {regularMembers.map((m, i) => (
                    <BoardMemberCard
                      key={i}
                      member={m}
                      delay={0.1 + i * 0.06}
                      size="sm"
                      disableReveal
                    />
                  ))}
                </div>
              </>
            )}

            {/* ─── Join CTA ─── */}
            <div className="bg-primary/5 border border-border rounded-2xl px-8 py-6 mt-10 text-center">
              <p className="text-foreground font-semibold text-lg mb-2">
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
          </>
        )}
      </div>
    </Modal>
  );
};
