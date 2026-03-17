/** Backend Award shape */
export interface Award {
  id: string;
  image_url: string;
  title: string;
  description: string;
  won_count: number;
  created_at: string;
  updated_at: string;
}

export interface CreateAwardRequest {
  title: string;
  description: string;
  image_url?: string;
  won_count?: number;
}

export interface UpdateAwardRequest {
  title?: string;
  description?: string;
  image_url?: string;
  won_count?: number;
}

export interface AwardFormValues {
  title: string;
  description: string;
  image_url: string;
  won_count: string;
}

export type AwardFormErrors = Partial<Record<keyof AwardFormValues, string>>;
