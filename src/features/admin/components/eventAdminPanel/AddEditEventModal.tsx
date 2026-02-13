import React, { useState } from 'react';
import {
  InputField,
  Button,
  TextArea,
  Modal,
  DateTimePicker,
  NumberField,
  Select,
} from '@ieee-ui/ui';
import type {
  AddEditEventModalProps,
  EventFormValues,
  FormErrors,
} from '../../types/eventModalTypes';
import { EVENT_FORM_CONSTRAINTS } from '../../constants/eventModalConstants';
import {
  validateAllFields,
  convertEventToFormValues,
  convertFormValuesToEventFormData,
} from '../../utils/eventModalUtils';
import { useTheme } from '@/shared/hooks/useTheme';

const AddEditEventModal: React.FC<AddEditEventModalProps> = ({
  event,
  isOpen,
  onClose,
  onSave,
}) => {
  const { isDark } = useTheme();
  const isEditMode = !!event;

  // Use a key-based approach to reset form when event changes
  const [formKey, setFormKey] = useState(0);
  const [formValues, setFormValues] = useState<EventFormValues>(() =>
    convertEventToFormValues(event)
  );
  const [errors, setErrors] = useState<FormErrors>({});

  // Update form key when event or isOpen changes to trigger re-initialization
  React.useEffect(() => {
    setFormKey(prev => prev + 1);
  }, [event?.id, isOpen]);

  // Initialize/reset form values when key changes
  React.useEffect(() => {
    setFormValues(convertEventToFormValues(event));
    setErrors({});
  }, [formKey]);

  const handleInputChange =
    (field: keyof EventFormValues) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value = event.target.value;
      setFormValues((prev: EventFormValues) => ({ ...prev, [field]: value }));

      if (errors[field as keyof FormErrors]) {
        setErrors((prev: FormErrors) => ({ ...prev, [field]: undefined }));
      }
    };

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value } = event.target;
    setFormValues((prev: EventFormValues) => ({ ...prev, description: value }));

    if (errors.description) {
      setErrors((prev: FormErrors) => ({ ...prev, description: undefined }));
    }
  };

  const handleDateChange =
    (field: keyof EventFormValues) => (timestamp: number) => {
      const d = new Date(timestamp);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const hours = String(d.getHours()).padStart(2, '0');
      const minutes = String(d.getMinutes()).padStart(2, '0');
      const value = `${year}-${month}-${day}T${hours}:${minutes}`;

      setFormValues((prev: EventFormValues) => ({ ...prev, [field]: value }));

      if (errors[field as keyof FormErrors]) {
        setErrors((prev: FormErrors) => ({ ...prev, [field]: undefined }));
      }
    };

  const handleSave = () => {
    const validationErrors = validateAllFields(formValues);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const eventFormData = convertFormValuesToEventFormData(formValues, event);
    onSave(eventFormData);
  };

  return (
    <Modal
      title={isEditMode ? 'Edit Event' : 'Add New Event'}
      isOpen={isOpen}
      onClose={onClose}
      size="large"
      darkMode={isDark}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Event Title */}
          <div className="md:col-span-2">
            <InputField
              label="Event Title"
              value={formValues.title}
              placeholder="Enter event title"
              onChange={handleInputChange('title')}
              id="title"
              error={errors.title}
              darkMode={isDark}
            />
          </div>

          {/* Event Description */}
          <div className="md:col-span-2">
            <TextArea
              label="Event Description"
              value={formValues.description}
              placeholder="Enter detailed event description"
              onChange={handleTextAreaChange}
              id="description"
              maxLength={EVENT_FORM_CONSTRAINTS.description.maxLength}
              error={errors.description}
              darkMode={isDark}
            />
          </div>

          {/* Start Date & Time */}
          <DateTimePicker
            id="startTime"
            label="Start Date & Time"
            value={
              formValues.startTime
                ? new Date(formValues.startTime).getTime()
                : undefined
            }
            onChange={handleDateChange('startTime')}
            error={errors.startTime}
            darkMode={isDark}
          />

          {/* End Date & Time */}
          <DateTimePicker
            id="endTime"
            label="End Date & Time"
            value={
              formValues.endTime
                ? new Date(formValues.endTime).getTime()
                : undefined
            }
            onChange={handleDateChange('endTime')}
            error={errors.endTime}
            darkMode={isDark}
          />

          {/* Registration Deadline */}
          <div className="md:col-span-2">
            <DateTimePicker
              id="registrationDeadline"
              label="Registration Deadline"
              value={
                formValues.registrationDeadline
                  ? new Date(formValues.registrationDeadline).getTime()
                  : undefined
              }
              onChange={handleDateChange('registrationDeadline')}
              error={errors.registrationDeadline}
              darkMode={isDark}
            />
          </div>

          {/* Location */}
          <div className="md:col-span-2">
            <InputField
              label="Location"
              value={formValues.location}
              placeholder="Enter event location"
              onChange={handleInputChange('location')}
              id="location"
              error={errors.location}
              darkMode={isDark}
            />
          </div>

          {/* Category */}
          <div className="md:col-span-2">
            <Select
              id="category"
              label="Category"
              value={formValues.category}
              onChange={handleInputChange('category')}
              options={[
                { value: 'Technical', label: 'Technical' },
                { value: 'Non-Technical', label: 'Non-Technical' },
                { value: 'Social', label: 'Social' },
              ]}
              error={errors.category}
              darkMode={isDark}
            />
          </div>

          {/* Capacity */}
          <NumberField
            id="capacity"
            label="Capacity"
            value={formValues.capacity}
            onChange={handleInputChange('capacity')}
            placeholder="Enter event capacity"
            min={EVENT_FORM_CONSTRAINTS.capacity.min.toString()}
            max={EVENT_FORM_CONSTRAINTS.capacity.max.toString()}
            error={errors.capacity}
            darkMode={isDark}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <Button
            buttonText="Cancel"
            onClick={onClose}
            type="basic"
            width="fit"
            darkMode={isDark}
          />
          <Button
            buttonText={isEditMode ? 'Save Changes' : 'Create Event'}
            onClick={handleSave}
            type="primary"
            width="fit"
            darkMode={isDark}
          />
        </div>
      </div>
    </Modal>
  );
};

export default AddEditEventModal;
