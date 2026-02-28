import { motion, AnimatePresence } from 'framer-motion';
import { TeamMember } from '../../../shared/types/team.types';
import { SectionReveal } from './SectionReveal';
import { IoLogoLinkedin } from 'react-icons/io5';
import { FaGithub, FaTwitter } from 'react-icons/fa';
import { useState } from 'react';

export const TeamMemberCard = ({
  member,
  delay,
}: {
  member: TeamMember;
  delay?: number;
}) => {
  const [hovered, setHovered] = useState(false);
  return (
    <SectionReveal delay={delay}>
      <div className="relative w-64 h-[350px] flex flex-col items-center">
        <motion.div
          className="relative z-20 overflow-hidden shadow-xl bg-card "
          initial={{
            borderRadius: '999px',
            width: '144px',
            height: '144px',
            y: 0,
          }}
          whileHover={{
            borderRadius: '16px',
            width: '260px',
            height: '340px',
            y: -40,
          }}
          transition={{ type: 'spring', stiffness: 250, damping: 25 }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <motion.img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1.1 }}
            exit={{ scale: 0.8 }}
          />

          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent 
                          flex flex-col justify-end p-6 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ delay: 0.12, duration: hovered ? 0.55 : 0 }}
          >
            <h3 className="text-xl font-bold text-center">{member.name}</h3>
            <p className="text-sm text-center font-light mb-2">{member.role}</p>
            <p className="text-sm text-center font-light mb-2">{member.bio}</p>
            <div className="flex gap-4 justify-center text-xl">
              {member.socials.linkedin && (
                <a href={member.socials.linkedin} target="_blank">
                  <IoLogoLinkedin className="hover:text-[#0077b5] cursor-pointer transition-colors duration-200" />
                </a>
              )}
              {member.socials.github && (
                <a href={member.socials.github} target="_blank">
                  <FaGithub className="hover:text-foreground cursor-pointer transition-colors duration-200" />
                </a>
              )}
              {member.socials.twitter && (
                <a href={member.socials.twitter} target="_blank">
                  <FaTwitter className="hover:text-[#1DA1F2] cursor-pointer transition-colors duration-200" />
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>

        <AnimatePresence>
          <motion.div
            className="mt-4"
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: hovered ? 0 : 1, y: hovered ? -90 : 0 }}
          >
            <p className="text-center text-xl font-semibold ">{member.name}</p>
            <p className="text-primary text-center text-sm">{member.role}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </SectionReveal>
  );
};
