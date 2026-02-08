import React, { useState } from 'react';
import { InputField, Button, TextArea, Modal } from '@ieee-ui/ui';
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
import {
  FormFieldWithError,
  NumberInputField,
  DateTimeInputField,
} from './EventModalFormFields';

const AddEditEventModal: React.FC<AddEditEventModalProps> = ({
  event,
  isOpen,
  onClose,
  onSave,
}) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formKey]);

  const handleInputChange =
    (field: keyof EventFormValues) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
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
      className="max-w-4xl"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Event Title */}
          <div className="md:col-span-2">
            <FormFieldWithError error={errors.title}>
              <InputField
                label="Event Title"
                value={formValues.title}
                placeholder="Enter event title"
                onChange={handleInputChange('title')}
                id="title"
                error={errors.title}
              />
            </FormFieldWithError>
          </div>

          {/* Event Description */}
          <div className="md:col-span-2">
            <FormFieldWithError error={errors.description}>
              <TextArea
                label="Event Description"
                value={formValues.description}
                placeholder="Enter detailed event description"
                onChange={handleTextAreaChange}
                id="description"
                maxLength={EVENT_FORM_CONSTRAINTS.description.maxLength}
                error={errors.description}
              />
            </FormFieldWithError>
          </div>

          {/* Start Date & Time */}
          <FormFieldWithError error={errors.startTime}>
            <DateTimeInputField
              id="startTime"
              label="Start Date & Time"
              value={formValues.startTime}
              onChange={handleInputChange('startTime')}
              error={errors.startTime}
            />
          </FormFieldWithError>

          {/* End Date & Time */}
          <FormFieldWithError error={errors.endTime}>
            <DateTimeInputField
              id="endTime"
              label="End Date & Time"
              value={formValues.endTime}
              onChange={handleInputChange('endTime')}
              error={errors.endTime}
            />
          </FormFieldWithError>

          {/* Registration Deadline */}
          <div className="md:col-span-2">
            <FormFieldWithError error={errors.registrationDeadline}>
              <DateTimeInputField
                id="registrationDeadline"
                label="Registration Deadline"
                value={formValues.registrationDeadline}
                onChange={handleInputChange('registrationDeadline')}
                error={errors.registrationDeadline}
              />
            </FormFieldWithError>
          </div>

          {/* Location */}
          <div className="md:col-span-2">
            <FormFieldWithError error={errors.location}>
              <InputField
                label="Location"
                value={formValues.location}
                placeholder="Enter event location"
                onChange={handleInputChange('location')}
                id="location"
                error={errors.location}
              />
            </FormFieldWithError>
          </div>

          {/* Capacity */}
          <FormFieldWithError error={errors.capacity}>
            <NumberInputField
              id="capacity"
              label="Capacity"
              value={formValues.capacity}
              onChange={handleInputChange('capacity')}
              placeholder="Enter event capacity"
              min={EVENT_FORM_CONSTRAINTS.capacity.min.toString()}
              max={EVENT_FORM_CONSTRAINTS.capacity.max.toString()}
              error={errors.capacity}
            />
          </FormFieldWithError>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <Button
            buttonText="Cancel"
            onClick={onClose}
            type="basic"
            width="fit"
          />
          <Button
            buttonText={isEditMode ? 'Save Changes' : 'Create Event'}
            onClick={handleSave}
            type="primary"
            width="fit"
          />
        </div>
      </div>
    </Modal>
  );
};

export default AddEditEventModal;
