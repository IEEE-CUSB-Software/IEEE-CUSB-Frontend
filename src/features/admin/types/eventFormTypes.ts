import type { AdminEvent } from '../utils/eventConversion';

export interface EventFormData {
  id?: string;
  title: string;
  description: string;
  location: string;
  start_time: string;
  end_time: string;
  capacity: number;
  registration_deadline: string;
}

export interface CreateEventPayload {
  title: string;
  description: string;
  location: string;
  start_time: string;
  end_time: string;
  capacity: number;
  registration_deadline: string;
}

export interface UpdateEventPayload {
  id: string;
  title: string;
  description: string;
  location: string;
  start_time: string;
  end_time: string;
  capacity: number;
  registration_deadline: string;
}

export const convertEventToFormData = (event: AdminEvent): EventFormData => {
  return {
    id: event.id,
    title: event.title,
    description: event.description,
    location: event.location,
    start_time: event.date, // AdminEvent uses 'date' but we map to 'start_time'
    end_time: event.date, // Default same as start, will be updated
    capacity: event.capacity,
    registration_deadline: event.date, // Default same as start, will be updated
  };
};

export const convertFormDataToCreatePayload = (
  formData: EventFormData
): CreateEventPayload => {
  return {
    title: formData.title,
    description: formData.description,
    location: formData.location,
    start_time: formData.start_time,
    end_time: formData.end_time,
    capacity: formData.capacity,
    registration_deadline: formData.registration_deadline,
  };
};

export const convertFormDataToUpdatePayload = (
  formData: EventFormData
): UpdateEventPayload => {
  if (!formData.id) {
    throw new Error('Event ID is required for updates');
  }

  return {
    id: formData.id,
    title: formData.title,
    description: formData.description,
    location: formData.location,
    start_time: formData.start_time,
    end_time: formData.end_time,
    capacity: formData.capacity,
    registration_deadline: formData.registration_deadline,
  };
};
