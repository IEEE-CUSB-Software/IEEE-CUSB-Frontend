export const EVENT_FORM_CONSTRAINTS = {
  title: {
    minLength: 5,
    maxLength: 100,
  },
  description: {
    minLength: 20,
    maxLength: 2000,
  },
  location: {
    minLength: 3,
    maxLength: 100,
  },
  category: {
    minLength: 3,
    maxLength: 50,
  },
  capacity: {
    min: 1,
    max: 10000,
  },
  file: {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedImageTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  },
};

export const ERROR_MESSAGES = {
  required: {
    title: 'Event title is required',
    description: 'Event description is required',
    date: 'Event date and time is required',
    location: 'Location is required',
    eventType: 'Event type is required',
    category: 'Category is required',
    capacity: 'Capacity is required',
    registeredCount: 'Registered count is required',
    attendeeCount: 'Attendee count is required',
    eventPoster: 'Event poster is required',
  },
  length: {
    titleMin: `Title must be at least ${EVENT_FORM_CONSTRAINTS.title.minLength} characters`,
    titleMax: `Title must be less than ${EVENT_FORM_CONSTRAINTS.title.maxLength} characters`,
    descriptionMin: `Description must be at least ${EVENT_FORM_CONSTRAINTS.description.minLength} characters`,
    descriptionMax: `Description must be less than ${EVENT_FORM_CONSTRAINTS.description.maxLength} characters`,
    locationMin: `Location must be at least ${EVENT_FORM_CONSTRAINTS.location.minLength} characters`,
    locationMax: `Location must be less than ${EVENT_FORM_CONSTRAINTS.location.maxLength} characters`,
    categoryMin: `Category must be at least ${EVENT_FORM_CONSTRAINTS.category.minLength} characters`,
    categoryMax: `Category must be less than ${EVENT_FORM_CONSTRAINTS.category.maxLength} characters`,
  },
  format: {
    fileTooLarge: 'File size exceeds the limit (5MB)',
    eventPosterFile: 'Invalid file type. Allowed: JPG, PNG, WEBP, GIF',
    eventPoster: 'Invalid URL format for event poster',
    invalidDate: 'Invalid date format',
  },
  validation: {
    invalidEventType: 'Invalid event type selected',
    mustBeNumber: 'Value must be a number',
    capacityMin: `Capacity must be at least ${EVENT_FORM_CONSTRAINTS.capacity.min}`,
    capacityMax: `Capacity cannot exceed ${EVENT_FORM_CONSTRAINTS.capacity.max}`,
    capacityLessThanRegistered: 'Capacity cannot be less than registered count',
    registeredNegative: 'Registered count cannot be negative',
    registeredExceedsCapacity: 'Registered count cannot exceed capacity',
    attendeeNegative: 'Attendee count cannot be negative',
    attendeeExceedsRegistered: 'Attendee count cannot exceed registered count',
  },
};
