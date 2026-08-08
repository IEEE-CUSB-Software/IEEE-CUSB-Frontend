import { motion } from 'framer-motion';
import { MemberCard } from '@/shared/components/MemberCard';
import { DEV_TEAM } from '../constants/devTeam';

export function DevTeamSection() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-24 border-t border-border mt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Development Team
        </h2>
        <p className="text-lg text-muted-foreground">
          The talented individuals who built this platform.
        </p>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-12">
        {DEV_TEAM.map((member, i) => (
          <MemberCard key={i} member={member as any} delay={i * 0.15} />
        ))}
      </div>
    </div>
  );
}
