import React, { useState, useEffect } from 'react';
import { InputField, Button, Modal } from '@ieee-ui/ui';
import { useTheme } from '@/shared/hooks/useTheme';
import type {
  CommitteeMember,
  AddCommitteeMember,
  UpdateCommitteeMember,
} from '@/shared/types/committees.types';
import { MemberRole, MEMBER_ROLE_LABELS } from '@/shared/types/committees.types';

interface Props {
  member?: CommitteeMember;
  committeeId: string;
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    data: AddCommitteeMember | UpdateCommitteeMember,
    id?: string
  ) => void;
  isPending?: boolean;
}

interface FormValues {
  name: string;
  email: string;
  role: MemberRole;
  image_url: string;
}

type Errs = Partial<Record<keyof FormValues, string>>;

const AddEditMemberModal: React.FC<Props> = ({
  member,
  committeeId,
  isOpen,
  onClose,
  onSave,
  isPending = false,
}) => {
  const { isDark } = useTheme();
  const isEdit = !!member;
  const [form, setForm] = useState<FormValues>({
    name: member?.name ?? '',
    email: member?.email ?? '',
    role: member?.role ?? MemberRole.MEMBER,
    image_url: member?.image_url ?? '',
  });
  const [errors, setErrors] = useState<Errs>({});

  useEffect(() => {
    setForm({
      name: member?.name ?? '',
      email: member?.email ?? '',
      role: member?.role ?? MemberRole.MEMBER,
      image_url: member?.image_url ?? '',
    });
    setErrors({});
  }, [member, isOpen]);

  const handleChange =
    (f: keyof FormValues) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm(p => ({ ...p, [f]: e.target.value }));
      if (errors[f]) setErrors(p => ({ ...p, [f]: undefined }));
    };

  const handleSave = () => {
    const errs: Errs = {};
    if (!form.name.trim()) errs.name = 'Name is required.';
    if (!form.email.trim()) errs.email = 'Email is required.';
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    const payload: AddCommitteeMember | UpdateCommitteeMember = {
      committee_id: committeeId,
      name: form.name.trim(),
      email: form.email.trim(),
      role: form.role,
      ...(form.image_url.trim() && { image_url: form.image_url.trim() }),
    };
    onSave(payload, member?.id);
  };

  return (
    <Modal
      title={isEdit ? 'Edit Member' : 'Add Member'}
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
              placeholder="e.g. Jane Smith"
              onChange={handleChange('name')}
              id="member-name"
              error={errors.name}
              darkMode={isDark}
            />
          </div>
          <InputField
            label="Email"
            value={form.email}
            placeholder="e.g. jane@ieee.org"
            onChange={handleChange('email')}
            id="member-email"
            error={errors.email}
            darkMode={isDark}
          />
          <div>
            <label
              htmlFor="member-role"
              className={`block text-sm font-medium mb-1.5 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Role
            </label>
            <select
              id="member-role"
              value={form.role}
              onChange={handleChange('role') as any}
              className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition-colors ${
                isDark
                  ? 'bg-gray-800 border-gray-700 text-white focus:border-primary'
                  : 'bg-white border-gray-300 text-gray-900 focus:border-primary'
              }`}
            >
              {Object.values(MemberRole).map(r => (
                <option key={r} value={r}>
                  {MEMBER_ROLE_LABELS[r]}
                </option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <InputField
              label="Image URL (optional)"
              value={form.image_url}
              placeholder="https://..."
              onChange={handleChange('image_url')}
              id="member-image"
              darkMode={isDark}
            />
          </div>
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
            buttonText={
              isPending ? 'Saving…' : isEdit ? 'Save Changes' : 'Add Member'
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

export default AddEditMemberModal;
