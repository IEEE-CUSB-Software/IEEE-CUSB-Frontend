import React, { useState, useEffect } from 'react';
import { InputField, Button, TextArea, Modal } from '@ieee-ui/ui';
import { useTheme } from '@/shared/hooks/useTheme';
import type {
  Award,
  AwardFormValues,
  AwardFormErrors,
  CreateAwardRequest,
  UpdateAwardRequest,
} from '@/shared/types/award.types';

interface AddEditAwardModalProps {
  award?: Award;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CreateAwardRequest | UpdateAwardRequest, id?: string) => void;
  isPending?: boolean;
}

const emptyForm = (): AwardFormValues => ({
  title: '',
  description: '',
  image_url: '',
  won_count: '0',
});

const awardToForm = (award?: Award): AwardFormValues => {
  if (!award) return emptyForm();
  return {
    title: award.title,
    description: award.description,
    image_url: award.image_url ?? '',
    won_count: String(award.won_count ?? 0),
  };
};

const validate = (values: AwardFormValues): AwardFormErrors => {
  const errors: AwardFormErrors = {};
  if (!values.title.trim()) errors.title = 'Title is required.';
  if (!values.description.trim())
    errors.description = 'Description is required.';
  const count = Number(values.won_count);
  if (values.won_count !== '' && (isNaN(count) || count < 0))
    errors.won_count = 'Won count must be a non-negative number.';
  return errors;
};

const AddEditAwardModal: React.FC<AddEditAwardModalProps> = ({
  award,
  isOpen,
  onClose,
  onSave,
  isPending = false,
}) => {
  const { isDark } = useTheme();
  const isEditMode = !!award;

  const [formValues, setFormValues] = useState<AwardFormValues>(
    awardToForm(award)
  );
  const [errors, setErrors] = useState<AwardFormErrors>({});

  useEffect(() => {
    setFormValues(awardToForm(award));
    setErrors({});
  }, [award, isOpen]);

  const handleChange =
    (field: keyof AwardFormValues) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value = e.target.value;
      setFormValues(prev => ({ ...prev, [field]: value }));
      if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
    };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormValues(prev => ({ ...prev, description: e.target.value }));
    if (errors.description)
      setErrors(prev => ({ ...prev, description: undefined }));
  };

  const handleSave = () => {
    const validationErrors = validate(formValues);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const payload: CreateAwardRequest | UpdateAwardRequest = {
      title: formValues.title.trim(),
      description: formValues.description.trim(),
      ...(formValues.image_url.trim() && {
        image_url: formValues.image_url.trim(),
      }),
      won_count: formValues.won_count !== '' ? Number(formValues.won_count) : 0,
    };
    onSave(payload, award?.id);
  };

  return (
    <Modal
      title={isEditMode ? 'Edit Award' : 'Add New Award'}
      isOpen={isOpen}
      onClose={onClose}
      size="large"
      darkMode={isDark}
    >
      <div className="space-y-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Title */}
          <div className="md:col-span-2">
            <InputField
              label="Award Title"
              value={formValues.title}
              placeholder="Enter award title"
              onChange={handleChange('title')}
              id="award-title"
              error={errors.title}
              darkMode={isDark}
            />
          </div>

          {/* Won Count */}
          <div className="md:col-span-2">
            <InputField
              label="Times Won"
              value={formValues.won_count}
              placeholder="0"
              onChange={handleChange('won_count')}
              id="award-won-count"
              error={errors.won_count}
              darkMode={isDark}
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <TextArea
              label="Description"
              value={formValues.description}
              placeholder="Enter award description"
              onChange={handleTextAreaChange}
              id="award-description"
              maxLength={500}
              error={errors.description}
              darkMode={isDark}
            />
          </div>

          {/* Image URL (optional) */}
          <div className="md:col-span-2">
            <InputField
              label="Image URL (optional)"
              value={formValues.image_url}
              placeholder="https://example.com/award-image.png"
              onChange={handleChange('image_url')}
              id="award-image-url"
              darkMode={isDark}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button
            buttonText="Cancel"
            onClick={onClose}
            type="basic"
            width="fit"
            darkMode={isDark}
            disabled={isPending}
          />
          <Button
            buttonText={
              isPending
                ? 'Saving…'
                : isEditMode
                  ? 'Save Changes'
                  : 'Create Award'
            }
            onClick={handleSave}
            type="primary"
            width="fit"
            darkMode={isDark}
            disabled={isPending}
          />
        </div>
      </div>
    </Modal>
  );
};

export default AddEditAwardModal;
