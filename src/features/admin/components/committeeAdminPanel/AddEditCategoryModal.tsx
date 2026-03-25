import React, { useState, useEffect } from 'react';
import { InputField, Button, TextArea, Modal } from '@ieee-ui/ui';
import { useTheme } from '@/shared/hooks/useTheme';
import type {
  CommitteeCategory,
  CreateCategory,
  UpdateCategory,
} from '@/shared/types/committees.types';

interface Props {
  category?: CommitteeCategory;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CreateCategory | UpdateCategory, id?: string) => void;
  isPending?: boolean;
}

interface FormValues {
  name: string;
  description: string;
}

type Errs = Partial<Record<keyof FormValues, string>>;

const AddEditCategoryModal: React.FC<Props> = ({
  category,
  isOpen,
  onClose,
  onSave,
  isPending = false,
}) => {
  const { isDark } = useTheme();
  const isEdit = !!category;
  const [form, setForm] = useState<FormValues>({
    name: category?.name ?? '',
    description: category?.description ?? '',
  });
  const [errors, setErrors] = useState<Errs>({});

  useEffect(() => {
    setForm({
      name: category?.name ?? '',
      description: category?.description ?? '',
    });
    setErrors({});
  }, [category, isOpen]);

  const handleChange =
    (f: keyof FormValues) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm(p => ({ ...p, [f]: e.target.value }));
      if (errors[f]) setErrors(p => ({ ...p, [f]: undefined }));
    };

  const handleTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setForm(p => ({ ...p, description: e.target.value }));
    if (errors.description)
      setErrors(p => ({ ...p, description: undefined }));
  };

  const handleSave = () => {
    const errs: Errs = {};
    if (!form.name.trim()) errs.name = 'Name is required.';
    if (!form.description.trim()) errs.description = 'Description is required.';
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    onSave(
      { name: form.name.trim(), description: form.description.trim() },
      category?.id
    );
  };

  return (
    <Modal
      title={isEdit ? 'Edit Category' : 'Add Category'}
      isOpen={isOpen}
      onClose={onClose}
      size="large"
      darkMode={isDark}
    >
      <div className="space-y-5">
        <InputField
          label="Category Name"
          value={form.name}
          placeholder="e.g. Technical"
          onChange={handleChange('name')}
          id="cat-name"
          error={errors.name}
          darkMode={isDark}
        />
        <TextArea
          label="Description"
          value={form.description}
          placeholder="Describe this category…"
          onChange={handleTextArea}
          id="cat-desc"
          maxLength={300}
          error={errors.description}
          darkMode={isDark}
        />
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
            buttonText={isPending ? 'Saving…' : isEdit ? 'Save Changes' : 'Create Category'}
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

export default AddEditCategoryModal;
