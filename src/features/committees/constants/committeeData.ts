import { TeamMember } from '@/shared/types/team.types';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface Chapter {
  name: string;
  fullName: string;
  slug: string;
  description: string;
  logo?: string;
  email?: string;
  socialLinks?: { facebook?: string; linkedin?: string; instagram?: string };
  board: TeamMember[];
}

// ─── Helper ──────────────────────────────────────────────────────────────────

function member(
  name: string,
  role: string,
  image: string,
  bio = '',
  linkedin?: string
): TeamMember {
  return {
    name,
    role,
    bio,
    image,
    socials: {
      linkedin: linkedin || '#',
    },
  };
}

// ─── Chapters & Affinity Groups ─────────────────────────────────────────────

export const CHAPTERS: Chapter[] = [
  {
    name: 'WIE',
    fullName: 'Women in Engineering',
    slug: 'wie',
    logo: '/chapters/WIE.jpg',
    description:
      'IEEE Women in Engineering (WIE) is one of the largest international professional organizations dedicated to promoting women engineers and scientists, and inspiring girls around the world to follow their academic interests in a career in engineering.',
    board: [],
  },
  {
    name: 'EMBS',
    fullName: 'Engineering in Medicine and Biology Society',
    slug: 'embs',
    logo: '/chapters/EMBS.jpg',
    description:
      "The IEEE Engineering in Medicine and Biology Society (EMBS) is the world's largest international society of biomedical engineers. Our mission is to advance the application of engineering sciences and technology to medicine and biology.",
    email: 'embs@ieeecusb.org',
    board: [
      member(
        'Mahmoud Yasser',
        'Chairman',
        'http://edu.ieee.org/eg-cu-embs/wp-content/uploads/sites/1078/Untitled-3.png',
        '',
        'https://www.linkedin.com/in/mahmoud1yaser/'
      ),
      member(
        'Ibrahim Mohamed',
        'Vice-Chair',
        'http://edu.ieee.org/eg-cu-embs/wp-content/uploads/sites/1078/Untitled-33.png',
        '',
        'https://www.linkedin.com/in/1brahimmohamed/'
      ),
      member(
        'Youssef Hassanien',
        'Secretary',
        'http://edu.ieee.org/eg-cu-embs/wp-content/uploads/sites/1078/has.png',
        '',
        'https://www.linkedin.com/in/youssef-hassanien/'
      ),
    ],
  },
];
