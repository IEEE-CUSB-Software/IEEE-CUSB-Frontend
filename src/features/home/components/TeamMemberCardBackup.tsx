import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { TeamMember } from '../../../shared/types/team.types';
import { SectionReveal } from './SectionReveal';
import { IoLogoLinkedin } from 'react-icons/io5';
import { FaGithub, FaTwitter } from 'react-icons/fa';

export const TeamMemberCardBackup = ({
  member,
  delay,
}: {
  member: TeamMember;
  delay?: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <SectionReveal delay={delay}>
      <div
        className="relative w-72 h-[380px] flex items-center justify-center transition-colors duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-card border border-border/50 rounded-[2rem] shadow-2xl shadow-primary/5"
        />

        <div className="relative z-10 flex flex-col items-center w-full px-6">
          <motion.div
            layout
            initial={{ width: 144, height: 144 }}
            animate={{
              width: isHovered ? 100 : 144,
              height: isHovered ? 100 : 144,
            }}
            transition={{ type: 'spring', stiffness: 250, damping: 25 }}
            className={`overflow-hidden rounded-full border-[3px] transition-colors duration-300 ${
              isHovered ? 'border-primary/10' : 'border-background'
            }`}
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div layout className="mt-4 text-center">
            <h3 className="text-xl font-bold text-foreground">{member.name}</h3>
            <p className="text-primary font-medium text-sm">{member.role}</p>
          </motion.div>

          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="mt-4 flex flex-col items-center"
              >
                <p className="text-muted-foreground text-sm text-center line-clamp-3 mb-4">
                  {member.bio}
                </p>

                <div className="flex gap-3">
                  {member.socials.linkedin && (
                    <a
                      href={member.socials.linkedin}
                      target="_blank"
                      className="w-8 h-8 rounded-full bg-surface flex items-center justify-center text-foreground hover:text-[#0077b5] transition-colors"
                    >
                      <IoLogoLinkedin size={18} />
                    </a>
                  )}
                  {member.socials.github && (
                    <a
                      href={member.socials.github}
                      target="_blank"
                      className="w-8 h-8 rounded-full bg-surface flex items-center justify-center text-foreground hover:text-foreground transition-colors"
                    >
                      <FaGithub size={18} />
                    </a>
                  )}
                  {member.socials.twitter && (
                    <a
                      href={member.socials.twitter}
                      target="_blank"
                      className="w-8 h-8 rounded-full bg-surface flex items-center justify-center text-foreground hover:text-[#1DA1F2] transition-colors"
                    >
                      <FaTwitter size={18} />
                    </a>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </SectionReveal>
  );
};
