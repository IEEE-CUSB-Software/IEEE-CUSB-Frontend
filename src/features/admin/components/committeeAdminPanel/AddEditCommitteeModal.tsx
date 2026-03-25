import React, { useState, useEffect } from 'react';
import { InputField, Button, TextArea, Modal } from '@ieee-ui/ui';
import { useTheme } from '@/shared/hooks/useTheme';
import type {
  Committee,
  CommitteeCategory,
  CreateCommittee,
  UpdateCommittee,
} from '@/shared/types/committees.types';

interface Props {
  committee?: Committee;
  categories: CommitteeCategory[];
  defaultCategoryId?: string;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CreateCommittee | UpdateCommittee, id?: string) => void;
  isPending?: boolean;
}

interface FormValues {
  name: string;
  about: string;
  category_id: string;
}

type Errs = Partial<Record<keyof FormValues, string>>;

const AddEditCommitteeModal: React.FC<Props> = ({
  committee,
  categories,
  defaultCategoryId,
  isOpen,
  onClose,
  onSave,
  isPending = false,
}) => {
  const { isDark } = useTheme();
  const isEdit = !!committee;
  const [form, setForm] = useState<FormValues>({
    name: committee?.name ?? '',
    about: committee?.about ?? '',
    category_id: committee?.category_id ?? defaultCategoryId ?? '',
  });
  const [errors, setErrors] = useState<Errs>({});

  useEffect(() => {
    setForm({
      name: committee?.name ?? '',
      about: committee?.about ?? '',
      category_id:
        committee?.category_id ?? defaultCategoryId ?? categories[0]?.id ?? '',
    });
    setErrors({});
  }, [committee, isOpen, defaultCategoryId, categories]);

  const handleChange =
    (f: keyof FormValues) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm(p => ({ ...p, [f]: e.target.value }));
      if (errors[f]) setErrors(p => ({ ...p, [f]: undefined }));
    };

  const handleTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setForm(p => ({ ...p, about: e.target.value }));
    if (errors.about) setErrors(p => ({ ...p, about: undefined }));
  };

  const handleSave = () => {
    const errs: Errs = {};
    if (!form.name.trim()) errs.name = 'Name is required.';
    if (!form.about.trim()) errs.about = 'Description is required.';
    if (!form.category_id) errs.category_id = 'Category is required.';
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    onSave(
      {
        name: form.name.trim(),
        about: form.about.trim(),
        category_id: form.category_id,
      },
      committee?.id
    );
  };

  return (
    <Modal
      title={isEdit ? 'Edit Committee' : 'Add Committee'}
      isOpen={isOpen}
      onClose={onClose}
      size="large"
      darkMode={isDark}
    >
      <div className="space-y-5">
        <InputField
          label="Committee Name"
          value={form.name}
          placeholder="e.g. Robotics Committee"
          onChange={handleChange('name')}
          id="comm-name"
          error={errors.name}
          darkMode={isDark}
        />

        <div>
          <label
            htmlFor="comm-category"
            className={`block text-sm font-medium mb-1.5 ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            Category
          </label>
          <select
            id="comm-category"
            value={form.category_id}
            onChange={handleChange('category_id') as any}
            className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition-colors ${
              isDark
                ? 'bg-gray-800 border-gray-700 text-white focus:border-primary'
                : 'bg-white border-gray-300 text-gray-900 focus:border-primary'
            }`}
          >
            <option value="">Select category…</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          {errors.category_id && (
            <p className="text-red-500 text-xs mt-1">{errors.category_id}</p>
          )}
        </div>

        <TextArea
          label="About"
          value={form.about}
          placeholder="Describe this committee…"
          onChange={handleTextArea}
          id="comm-about"
          maxLength={500}
          error={errors.about}
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
            buttonText={
              isPending ? 'Saving…' : isEdit ? 'Save Changes' : 'Create Committee'
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

export default AddEditCommitteeModal;
