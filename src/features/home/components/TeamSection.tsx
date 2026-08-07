import { SectionReveal } from './SectionReveal';
import { Link } from 'react-router-dom';
import { GoArrowUpRight } from 'react-icons/go';
import { motion } from 'framer-motion';
import { useOfficers } from '@/shared/queries/board/board.queries';
import { useCommittees } from '@/shared/queries/committees/committees.queries';
import { MemberCard as TeamMemberCard } from '@/shared/components/MemberCard';

export function TeamSection() {
  const { data, isLoading: isLoadingOfficers, isError } = useOfficers();
  const { data: committeesData, isLoading: isLoadingCommittees } = useCommittees({ limit: 100 });
  const isLoading = isLoadingOfficers || isLoadingCommittees;

  // Extract board and leaders, and normalize them into a single array
  const board = data?.board || [];
  const leaders = data?.leaders || [];
  const committeesList = committeesData?.committees || [];
  
  const officers = [
    ...board.map((b: any) => ({
      name: b.name,
      role: b.role,
      image: b.image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(b.name || 'User')}&background=0f172a&color=fff&size=256`,
    })),
    ...leaders.map((l: any) => {
      const committee = committeesList.find(c => c.id === l.committee_id);
      const teamName = committee?.name || 'Team';
      const capitalizedRole = l.role ? l.role.charAt(0).toUpperCase() + l.role.slice(1) : '';
      const roleStr = l.role === 'head' ? `${teamName} Head` : `${teamName} ${capitalizedRole}`;
      return {
        name: l.name,
        role: roleStr,
        image: l.image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(l.name || 'User')}&background=0f172a&color=fff&size=256`,
      };
    })
  ];

  const displayMembers = !isError ? officers : [];

  return (
    <section className="py-20 px-6 bg-background overflow-hidden">
      <SectionReveal>
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center gap-5 ">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-center ">
              Meet our officers
            </h2>
            <motion.button className="self-center mb-2 cursor-pointer ">
              <Link to="/committees">
                <GoArrowUpRight className="text-3xl  hover:text-primary transition-colors duration-200" />
              </Link>
            </motion.button>
          </div>
          <p className="text-lg text-muted-foreground mb-16 text-center ">
            Behind every success, there’s a remarkable team working backstage.
          </p>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-12">
              {displayMembers.map((member: any, index: number) => (
                <TeamMemberCard key={index} member={member} delay={index * 0.1} />
              ))}
            </div>
          )}
        </div>
      </SectionReveal>
    </section>
  );
}
