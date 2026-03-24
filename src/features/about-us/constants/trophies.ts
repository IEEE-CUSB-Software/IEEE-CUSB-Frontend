import { HiGlobe, HiUserGroup, HiStar, HiCode } from 'react-icons/hi';
import { HiTrophy } from 'react-icons/hi2';
import React from 'react';
export interface Award {
  icon: React.ElementType;
  title: string;
  year: string;
  brief: string;
  description: string;
  color: string;
  won: number | null;
}

export const awards: Award[] = [
  {
    icon: HiTrophy,
    title: 'Best Student Branch',
    year: 'EGYPT SECTION • 2019',
    brief:
      'Ranked for exceptional performance in organizing technical events and member engagement across Egypt, Middle East, and Africa.',
    description:
      'Ranked for exceptional performance in organizing technical events and member engagement across Egypt, Middle East, and Africa.',
    color: 'text-yellow-500',
    won: 2,
  },
  {
    icon: HiGlobe,
    title: 'Global Website Award',
    year: 'GLOBAL • 2021',
    brief:
      'Recognized for outstanding website design, content accessibility, and user experience among all IEEE student branches worldwide.',
    description:
      'Recognized for outstanding website design, content accessibility, and user experience among all IEEE student branches worldwide.',
    color: 'text-blue-500',
    won: 3,
  },
  {
    icon: HiUserGroup,
    title: 'Exemplary Volunteer',
    year: 'REGION 8 • 2020',
    brief:
      'Honoring the collective effort of our volunteers in community service and STEM outreach programs at local schools.',
    description:
      'Honoring the collective effort of our volunteers in community service and STEM outreach programs at local schools.',
    color: 'text-purple-500',
    won: null,
  },
  {
    icon: HiStar,
    title: 'Membership Growth',
    year: 'EGYPT AWARDS • 2018',
    brief:
      'Achieved the highest percentage increase in student membership within the Egypt Section for the fiscal year.',
    description:
      'Achieved the highest percentage increase in student membership within the Egypt Section for the fiscal year.',
    color: 'text-orange-500',
    won: 1,
  },
  {
    icon: HiCode,
    title: 'IEEE Xtreme Top 100',
    year: 'GLOBAL • 2021',
    brief:
      'Our coding teams ranked within the top 100 globally out of 4500+ teams in the 24-hour programming challenge.',
    description:
      'Our coding teams ranked within the top 100 globally out of 4500+ teams in the 24-hour programming challenge.',
    color: 'text-green-500',
    won: null,
  },
];
