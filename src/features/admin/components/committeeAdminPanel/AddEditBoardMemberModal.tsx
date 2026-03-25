import React, { useState, useEffect } from 'react';
import { InputField, Button, Modal } from '@ieee-ui/ui';
import { useTheme } from '@/shared/hooks/useTheme';
import type {
  BoardMember,
  CreateBoardMember,
  UpdateBoardMember,
} from '@/shared/types/committees.types';

interface Props {
  member?: BoardMember;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CreateBoardMember | UpdateBoardMember, id?: string) => void;
  isPending?: boolean;
}

interface FormValues {
  name: string;
  email: string;
  role: string;
  image_url: string;
  display_order: string;
}

const empty = (): FormValues => ({
  name: '',
  email: '',
  role: '',
  image_url: '',
  display_order: '0',
});

const toForm = (m?: BoardMember): FormValues =>
  m
    ? {
        name: m.name,
        email: m.email,
        role: m.role,
        image_url: m.image_url ?? '',
        display_order: String(m.display_order ?? 0),
      }
    : empty();

type Errs = Partial<Record<keyof FormValues, string>>;

const validate = (v: FormValues): Errs => {
  const e: Errs = {};
  if (!v.name.trim()) e.name = 'Name is required.';
  if (!v.email.trim()) e.email = 'Email is required.';
  if (!v.role.trim()) e.role = 'Role is required.';
  return e;
};

const AddEditBoardMemberModal: React.FC<Props> = ({
  member,
  isOpen,
  onClose,
  onSave,
  isPending = false,
}) => {
  const { isDark } = useTheme();
  const isEdit = !!member;
  const [form, setForm] = useState<FormValues>(toForm(member));
  const [errors, setErrors] = useState<Errs>({});

  useEffect(() => {
    setForm(toForm(member));
    setErrors({});
  }, [member, isOpen]);

  const handleChange =
    (f: keyof FormValues) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm(p => ({ ...p, [f]: e.target.value }));
      if (errors[f]) setErrors(p => ({ ...p, [f]: undefined }));
    };

  const handleSave = () => {
    const errs = validate(form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    const payload: CreateBoardMember | UpdateBoardMember = {
      name: form.name.trim(),
      email: form.email.trim(),
      role: form.role.trim(),
      ...(form.image_url.trim() && { image_url: form.image_url.trim() }),
      display_order: Number(form.display_order) || 0,
    };
    onSave(payload, member?.id);
  };

  return (
    <Modal
      title={isEdit ? 'Edit Board Member' : 'Add Board Member'}
      isOpen={isOpen}
      onClose={onClose}
      size="large"
      darkMode={isDark}
    >
      <div className="space-y-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <InputField
              label="Full Name"
              value={form.name}
              placeholder="e.g. Mario Raafat"
              onChange={handleChange('name')}
              id="board-name"
              error={errors.name}
              darkMode={isDark}
            />
          </div>
          <InputField
            label="Email"
            value={form.email}
            placeholder="e.g. mario@ieee.org"
            onChange={handleChange('email')}
            id="board-email"
            error={errors.email}
            darkMode={isDark}
          />
          <InputField
            label="Role / Title"
            value={form.role}
            placeholder="e.g. Chair & Vice Chair"
            onChange={handleChange('role')}
            id="board-role"
            error={errors.role}
            darkMode={isDark}
          />
          <InputField
            label="Display Order"
            value={form.display_order}
            placeholder="0"
            onChange={handleChange('display_order')}
            id="board-order"
            darkMode={isDark}
          />
          <InputField
            label="Image URL (optional)"
            value={form.image_url}
            placeholder="https://..."
            onChange={handleChange('image_url')}
            id="board-image"
            darkMode={isDark}
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
            buttonText={isPending ? 'Saving…' : isEdit ? 'Save Changes' : 'Add Member'}
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

export default AddEditBoardMemberModal;
