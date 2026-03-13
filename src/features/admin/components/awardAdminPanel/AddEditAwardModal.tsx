import React, { useState, useEffect } from 'react';
import {
  InputField,
  Button,
  TextArea,
  Modal,
  Select,
} from '@ieee-ui/ui';
import { useTheme } from '@/shared/hooks/useTheme';
import type {
  Award,
  AwardFormValues,
  AwardFormErrors,
  AwardCategory,
} from '../../types/awardTypes';

const AWARD_CATEGORIES: AwardCategory[] = [
  'Technical Excellence',
  'Leadership',
  'Community Impact',
  'Innovation',
  'Academic Achievement',
  'Volunteer of the Year',
];

const CURRENT_YEAR = new Date().getFullYear();

interface AddEditAwardModalProps {
  award?: Award;
  isOpen: boolean;
  onClose: () => void;
  onSave: (award: Omit<Award, 'id'> & { id?: string }) => void;
}

const emptyForm = (): AwardFormValues => ({
  title: '',
  recipient: '',
  category: '',
  year: String(CURRENT_YEAR),
  description: '',
  imageUrl: '',
});

const awardToForm = (award?: Award): AwardFormValues => {
  if (!award) return emptyForm();
  return {
    title: award.title,
    recipient: award.recipient,
    category: award.category,
    year: String(award.year),
    description: award.description,
    imageUrl: award.imageUrl ?? '',
  };
};

const validate = (values: AwardFormValues): AwardFormErrors => {
  const errors: AwardFormErrors = {};
  if (!values.title.trim()) errors.title = 'Title is required.';
  if (!values.recipient.trim()) errors.recipient = 'Recipient is required.';
  if (!values.category) errors.category = 'Category is required.';
  const yr = Number(values.year);
  if (!values.year || isNaN(yr) || yr < 1900 || yr > CURRENT_YEAR + 1)
    errors.year = `Year must be between 1900 and ${CURRENT_YEAR + 1}.`;
  if (!values.description.trim()) errors.description = 'Description is required.';
  return errors;
};

const AddEditAwardModal: React.FC<AddEditAwardModalProps> = ({
  award,
  isOpen,
  onClose,
  onSave,
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
    onSave({
      id: award?.id,
      title: formValues.title.trim(),
      recipient: formValues.recipient.trim(),
      category: formValues.category as AwardCategory,
      year: Number(formValues.year),
      description: formValues.description.trim(),
      imageUrl: formValues.imageUrl.trim() || undefined,
    });
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

          {/* Recipient */}
          <InputField
            label="Recipient"
            value={formValues.recipient}
            placeholder="Enter recipient name or team"
            onChange={handleChange('recipient')}
            id="award-recipient"
            error={errors.recipient}
            darkMode={isDark}
          />

          {/* Year */}
          <InputField
            label="Year"
            value={formValues.year}
            placeholder={String(CURRENT_YEAR)}
            onChange={handleChange('year')}
            id="award-year"
            error={errors.year}
            darkMode={isDark}
          />

          {/* Category */}
          <div className="md:col-span-2">
            <Select
              id="award-category"
              label="Category"
              value={formValues.category}
              onChange={handleChange('category')}
              options={AWARD_CATEGORIES.map(c => ({ value: c, label: c }))}
              error={errors.category}
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
              value={formValues.imageUrl}
              placeholder="https://example.com/award-image.png"
              onChange={handleChange('imageUrl')}
              id="award-imageUrl"
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
          />
          <Button
            buttonText={isEditMode ? 'Save Changes' : 'Create Award'}
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

export default AddEditAwardModal;
