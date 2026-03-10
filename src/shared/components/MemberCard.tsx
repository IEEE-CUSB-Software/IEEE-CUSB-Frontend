import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { TeamMember } from '@/shared/types/team.types';
import { IoLogoLinkedin } from 'react-icons/io5';
import { FaGithub, FaTwitter } from 'react-icons/fa';

// ─── Size tokens ─────────────────────────────────────────────────────────────
//
// The outer container always has a FIXED width & height equal to the expanded
// dimensions (+label area). The card animates visually inside that space so
// sibling elements never shift.
//
//   circle     — resting avatar diameter
//   expandedW  — expanded card width  (= container width)
//   expandedH  — expanded card height
//   expandedY  — how far the card moves UP when expanded (visual only)
//   containerH — fixed container height = (expandedH + expandedY offset) + label
//                → bottom of expanded card stays inside the container

export type MemberCardSize = 'sm' | 'md' | 'lg';

const SIZE: Record<
  MemberCardSize,
  {
    circle: number;
    expandedW: number;
    expandedH: number;
    expandedY: number;
    containerH: number; // px — always reserved
    overlayPadding: string;
    nameCls: string;
    roleCls: string;
    nameOverlayCls: string;
    roleOverlayCls: string;
    bioCls: string;
    iconCls: string;
  }
> = {
  sm: {
    circle: 80,
    expandedW: 160,
    expandedH: 210,
    expandedY: -20,
    containerH: 200, // expanded bottom (190) + 10 buffer
    overlayPadding: 'p-4',
    nameCls: 'text-base font-semibold',
    roleCls: 'text-xs',
    nameOverlayCls: 'text-base font-bold',
    roleOverlayCls: 'text-xs',
    bioCls: 'text-xs line-clamp-2',
    iconCls: 'text-base',
  },
  md: {
    circle: 108,
    expandedW: 210,
    expandedH: 270,
    expandedY: -30,
    containerH: 250, // expanded bottom (240) + 10 buffer
    overlayPadding: 'p-5',
    nameCls: 'text-lg font-semibold',
    roleCls: 'text-xs',
    nameOverlayCls: 'text-lg font-bold',
    roleOverlayCls: 'text-xs',
    bioCls: 'text-xs line-clamp-2',
    iconCls: 'text-lg',
  },
  lg: {
    circle: 144,
    expandedW: 260,
    expandedH: 340,
    expandedY: -40,
    containerH: 310, // expanded bottom (300) + 10 buffer
    overlayPadding: 'p-6',
    nameCls: 'text-xl font-semibold',
    roleCls: 'text-sm',
    nameOverlayCls: 'text-xl font-bold',
    roleOverlayCls: 'text-sm',
    bioCls: 'text-sm line-clamp-3',
    iconCls: 'text-xl',
  },
};

// ─── Props ───────────────────────────────────────────────────────────────────

export interface MemberCardProps {
  member: TeamMember;
  /** Replace the role text shown on the card */
  roleOverride?: string;
  delay?: number;
  /**
   * sm  — compact  (80px circle → 160×210 expanded)
   * md  — medium   (108px circle → 210×270 expanded)
   * lg  — full     (144px circle → 260×340 expanded)  ← default
   */
  size?: MemberCardSize;
  /**
   * Skip the scroll-reveal entrance animation.
   * Use inside modals or already-animated containers.
   */
  disableReveal?: boolean;
}

// ─── Component ───────────────────────────────────────────────────────────────

export const MemberCard = ({
  member,
  roleOverride,
  delay = 0,
  size = 'lg',
  disableReveal = false,
}: MemberCardProps) => {
  const [hovered, setHovered] = useState(false);
  const [tapped, setTapped] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const isActive = hovered || tapped;
  const displayRole = roleOverride ?? member.role;
  const s = SIZE[size];

  // Label slides up and fades out when card expands.
  // The negative y keeps it inside the fixed-height container.
  const labelCollapseY = -(s.expandedH + s.expandedY - s.circle - 16);

  const revealed = disableReveal || isInView;

  return (
    // Fixed-size container — never changes, siblings never shift
    <motion.div
      ref={ref}
      className="relative flex flex-col items-center shrink-0"
      style={{ width: s.expandedW, height: s.containerH }}
      initial={disableReveal ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.55, delay, ease: 'easeOut' }}
    >
      {/* ── Animated card ── */}
      <motion.div
        className="relative z-20 overflow-hidden shadow-xl bg-card cursor-pointer select-none"
        style={{ position: 'absolute', top: 0, left: '50%', x: '-50%' }}
        animate={
          isActive
            ? {
                borderRadius: '16px',
                width: s.expandedW,
                height: s.expandedH,
                y: s.expandedY,
              }
            : {
                borderRadius: '999px',
                width: s.circle,
                height: s.circle,
                y: 0,
              }
        }
        transition={{ type: 'spring', stiffness: 250, damping: 25 }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        onClick={() => setTapped(p => !p)}
      >
        <motion.img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover pointer-events-none"
          animate={{ scale: isActive ? 1.1 : 1 }}
          transition={{ duration: 0.4 }}
        />

        {/* Overlay with bio + socials */}
        <motion.div
          className={`absolute inset-0 bg-linear-to-t from-primary/90 via-primary/40 to-transparent
                                flex flex-col justify-end ${s.overlayPadding} text-white`}
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{
            delay: isActive ? 0.12 : 0,
            duration: isActive ? 0.5 : 0.15,
          }}
        >
          <h3 className={`${s.nameOverlayCls} text-center`}>{member.name}</h3>
          <p className={`${s.roleOverlayCls} text-center font-light mb-2`}>
            {displayRole}
          </p>
          {member.bio && (
            <p className={`${s.bioCls} text-center font-light mb-2`}>
              {member.bio}
            </p>
          )}
          <div className={`flex gap-3 justify-center ${s.iconCls}`}>
            {member.socials?.linkedin && member.socials.linkedin !== '#' && (
              <a
                href={member.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
              >
                <IoLogoLinkedin className="hover:text-[#0077b5] transition-colors duration-200" />
              </a>
            )}
            {member.socials?.github && (
              <a
                href={member.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
              >
                <FaGithub className="hover:text-foreground transition-colors duration-200" />
              </a>
            )}
            {member.socials?.twitter && (
              <a
                href={member.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
              >
                <FaTwitter className="hover:text-[#1DA1F2] transition-colors duration-200" />
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* ── Label (name + role) — sits below circle, slides away on expand ── */}
      <motion.div
        className="absolute text-center pointer-events-none"
        style={{ top: s.circle + 16 }}
        animate={{
          opacity: isActive ? 0 : 1,
          y: isActive ? labelCollapseY : 0,
        }}
        transition={{ duration: 0.25 }}
      >
        <p className={s.nameCls}>{member.name}</p>
        <p className={`text-primary ${s.roleCls}`}>{displayRole}</p>
      </motion.div>
    </motion.div>
  );
};
