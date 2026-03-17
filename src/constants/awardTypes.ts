export const AWARD_CATEGORIES = [
  { label: 'Technical Excellence', value: 'Technical Excellence' },
  { label: 'Leadership', value: 'Leadership' },
  { label: 'Community Impact', value: 'Community Impact' },
  { label: 'Innovation', value: 'Innovation' },
  { label: 'Academic Achievement', value: 'Academic Achievement' },
  { label: 'Volunteer of the Year', value: 'Volunteer of the Year' },
] as const;

export type AwardCategory = (typeof AWARD_CATEGORIES)[number]['value'];

export default AWARD_CATEGORIES;
