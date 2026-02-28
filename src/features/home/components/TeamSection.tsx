import { SectionReveal } from './SectionReveal';
import { TeamMemberCard } from './TeamMemberCard';
//import { TeamMemberCardBackup } from './TeamMemberCardBackup';
import { Link } from 'react-router-dom';
import { GoArrowUpRight } from 'react-icons/go';
import { motion } from 'framer-motion';
import { TEAM_MEMBERS } from './constants/team';

export function TeamSection() {
  return (
    <section className="py-20 px-6 bg-background overflow-hidden">
      <SectionReveal>
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center gab-5 ">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-center ">
              Meet our team
            </h2>
            <motion.button className="self-center mb-2 cursor-pointer ">
              {/* NOTE: will be changed to the team page */}
              <Link to="/about">
                <GoArrowUpRight className="text-3xl  hover:text-primary transition-colors duration-200" />
              </Link>
            </motion.button>
          </div>
          <p className="text-lg text-muted-foreground mb-16 text-center ">
            Behind every success, there’s a remarkable team working backstage.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 justify-items-center">
            {TEAM_MEMBERS.map((member, index) => (
              <TeamMemberCard key={index} member={member} delay={index * 0.1} />
            ))}
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
