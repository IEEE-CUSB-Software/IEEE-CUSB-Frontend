// src/features/home/constants/team.ts

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  socials: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Mariam Ahmed',
    role: 'Team Lead',
    bio: 'Specializing in scalable cloud architecture and lead developer for our core infrastructure.',
    image:
      'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=400&h=400&fit=crop',
    socials: {
      linkedin: 'https://linkedin.com/in/mariam',
      github: 'https://github.com/mariam',
      twitter: 'https://twitter.com/mariam',
    },
  },
  {
    name: 'Omar Zaid',
    role: 'Embedded Systems Lead',
    bio: 'A NASA Space Apps nominee with a passion for low-level programming and hardware integration.',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    socials: {
      linkedin: 'https://linkedin.com/in/omar',
      github: 'https://github.com/omar',
    },
  },
  {
    name: 'Laila Hassan',
    role: 'Creative Director',
    bio: 'Expert in UI/UX design and brand identity, ensuring theme consistency across all digital platforms.',
    image:
      'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop',
    socials: {
      linkedin: 'https://linkedin.com/in/laila',
      twitter: 'https://twitter.com/laila',
    },
  },
  {
    name: 'Youssef Kareem',
    role: 'Operations Manager',
    bio: 'Dedicated to optimizing workflow performance and managing large-scale technical projects.',
    image:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
    socials: {
      linkedin: 'https://linkedin.com/in/youssef',
      github: 'https://github.com/youssef',
    },
  },
];
