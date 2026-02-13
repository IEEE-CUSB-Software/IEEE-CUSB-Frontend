import type { AdminEvent } from '../utils/eventConversion';
import type { EventFormData } from './eventFormTypes';
export type { EventFormData };

export interface AddEditEventModalProps {
  isOpen: boolean;
  event?: AdminEvent;
  onClose: () => void;
  onSave: (eventFormData: EventFormData) => void;
}

export interface MediaItem {
  id?: string;
  file: File | string;
  preview?: string;
}

export interface EventFormValues {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  registrationDeadline: string;
  location: string;
  capacity: string;
  category: "Technical" | "Non-Technical" | "Social";
}

export interface FormErrors {
  title?: string;
  description?: string;
  startTime?: string;
  endTime?: string;
  registrationDeadline?: string;
  location?: string;
  capacity?: string;
  category?: string;
}
