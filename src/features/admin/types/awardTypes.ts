export interface Award {
  id: string;
  title: string;
  recipient: string;
  category: AwardCategory;
  year: number;
  description: string;
  imageUrl?: string;
}

export type AwardCategory =
  | 'Technical Excellence'
  | 'Leadership'
  | 'Community Impact'
  | 'Innovation'
  | 'Academic Achievement'
  | 'Volunteer of the Year';

export interface AwardFormValues {
  title: string;
  recipient: string;
  category: AwardCategory | '';
  year: string;
  description: string;
  imageUrl: string;
}

export type AwardFormErrors = Partial<Record<keyof AwardFormValues, string>>;
