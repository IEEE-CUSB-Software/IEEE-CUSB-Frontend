import React, { useState, useEffect } from 'react';
import { InputField, Button, Modal } from '@ieee-ui/ui';
import { useTheme } from '@/shared/hooks/useTheme';
import { FileUploadField } from '@/shared/components/FileUploadField';
import type { Instructor, CreateInstructorRequest, UpdateInstructorRequest } from '@/shared/types/workshops.types';

interface Props {
  instructor?: Instructor;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CreateInstructorRequest | UpdateInstructorRequest, id?: string, file?: File | null) => void;
  isPending?: boolean;
}

interface FormValues {
  name: string;
  bio: string;
  image: File | null;
}

const empty = (): FormValues => ({
  name: '',
  bio: '',
  image: null,
});

const toForm = (m?: Instructor): FormValues =>
  m
    ? {
        name: m.name,
        bio: m.bio,
        image: null,
      }
    : empty();

type Errs = Partial<Record<keyof FormValues, string>>;

const validate = (v: FormValues): Errs => {
  const e: Errs = {};
  if (!v.name.trim()) e.name = 'Name is required.';
  if (!v.bio.trim()) e.bio = 'Bio is required.';
  return e;
};

export const AddEditInstructorModal: React.FC<Props> = ({
  instructor,
  isOpen,
  onClose,
  onSave,
  isPending = false,
}) => {
  const { isDark } = useTheme();
  const isEdit = !!instructor;
  const [form, setForm] = useState<FormValues>(toForm(instructor));
  const [errors, setErrors] = useState<Errs>({});

  useEffect(() => {
    setForm(toForm(instructor));
    setErrors({});
  }, [instructor, isOpen]);

  const handleChange =
    (f: keyof FormValues) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm(p => ({ ...p, [f]: e.target.value }));
      if (errors[f]) setErrors(p => ({ ...p, [f]: undefined }));
    };

  const handleImageChange = (file: File | null) => {
    setForm(p => ({ ...p, image: file }));
  };

  const handleSave = () => {
    const errs = validate(form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    
    const payload: CreateInstructorRequest | UpdateInstructorRequest = {
      name: form.name.trim(),
      bio: form.bio.trim(),
    };
    
    onSave(payload, instructor?.id, form.image);
  };

  return (
    <Modal
      title={isEdit ? 'Edit Instructor' : 'Add Instructor'}
      isOpen={isOpen}
      onClose={onClose}
      size="large"
      darkMode={isDark}
    >
      <div className="space-y-5">
        <div className="grid grid-cols-1 gap-4">
          <InputField
            label="Full Name"
            value={form.name}
            placeholder="e.g. Dr. Jane Doe"
            onChange={handleChange('name')}
            id="instructor-name"
            error={errors.name}
            darkMode={isDark}
          />
          <InputField
            label="Biography"
            value={form.bio}
            placeholder="Expert in Software Architecture..."
            onChange={handleChange('bio')}
            id="instructor-bio"
            error={errors.bio}
            darkMode={isDark}
          />
          <FileUploadField
            label="Avatar Image"
            id="instructor-image"
            value={form.image || undefined}
            preview={instructor?.image_url || undefined}
            onChange={handleImageChange}
            accept="image/*"
            acceptedFormats="PNG, JPG, GIF up to 5MB"
          />
        </div>

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
            buttonText={isPending ? 'Saving…' : isEdit ? 'Save Changes' : 'Add Instructor'}
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

export default AddEditInstructorModal;
