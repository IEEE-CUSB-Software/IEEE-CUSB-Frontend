import React, { useState, useEffect, useRef } from 'react';
import { InputField, Button, Modal } from '@ieee-ui/ui';
import { useTheme } from '@/shared/hooks/useTheme';
import { FiUpload, FiTrash2, FiImage, FiX } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import {
  useUploadCommitteeMemberImage,
  useDeleteCommitteeMemberImage,
} from '@/shared/queries/committees/committees.queries';
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
  });
  const [errors, setErrors] = useState<Errs>({});
  
  // Image Upload State
  const primaryFileRef = useRef<HTMLInputElement>(null);
  const [pendingPrimary, setPendingPrimary] = useState<File | null>(null);
  const [primaryPreview, setPrimaryPreview] = useState<string | null>(null);
  const [deletePrimary, setDeletePrimary] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const uploadImage = useUploadCommitteeMemberImage();
  const deleteImage = useDeleteCommitteeMemberImage();

  useEffect(() => {
    setForm({
      name: member?.name ?? '',
      email: member?.email ?? '',
      role: member?.role ?? MemberRole.MEMBER,
    });
    setErrors({});
    setPendingPrimary(null);
    if (primaryPreview) URL.revokeObjectURL(primaryPreview);
    setPrimaryPreview(null);
    setDeletePrimary(false);
    setIsUploading(false);
  }, [member, isOpen]);

  useEffect(() => {
    return () => {
      if (primaryPreview) URL.revokeObjectURL(primaryPreview);
    };
  }, []);

  const handleChange =
    (f: keyof FormValues) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm(p => ({ ...p, [f]: e.target.value }));
      if (errors[f]) setErrors(p => ({ ...p, [f]: undefined }));
    };

  const handlePrimarySelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File is too large. Keep it under 5MB.');
    }

    if (primaryPreview) URL.revokeObjectURL(primaryPreview);
    setPendingPrimary(file);
    setPrimaryPreview(URL.createObjectURL(file));
    setDeletePrimary(false);
    if (primaryFileRef.current) primaryFileRef.current.value = '';
  };

  const handleClearPrimary = () => {
    if (primaryPreview) URL.revokeObjectURL(primaryPreview);
    setPendingPrimary(null);
    setPrimaryPreview(null);
  };

  const handleMarkDeletePrimary = () => {
    handleClearPrimary();
    setDeletePrimary(true);
  };

  const handleSave = async () => {
    const errs: Errs = {};
    if (!form.name.trim()) errs.name = 'Name is required.';
    if (!form.email.trim()) errs.email = 'Email is required.';
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    if (isEdit && member?.id) {
      setIsUploading(true);
      try {
        const promises = [];
        if (pendingPrimary) promises.push(uploadImage.mutateAsync({ id: member.id, file: pendingPrimary }));
        if (deletePrimary) promises.push(deleteImage.mutateAsync(member.id));
        await Promise.all(promises);
      } catch (err) {
        setIsUploading(false);
        return; // Stop if images failed
      }
      setIsUploading(false);
    }

    const payload: AddCommitteeMember | UpdateCommitteeMember = {
      committee_id: committeeId,
      name: form.name.trim(),
      email: form.email.trim(),
      role: form.role,
    };
    onSave(payload, member?.id);
  };

  const displayPrimary = primaryPreview ?? (deletePrimary ? null : member?.image_url ?? null);
  const disableActions = isPending || isUploading || uploadImage.isPending || deleteImage.isPending;

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
        </div>

        {/* ── Cover Image ─── */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Member Image
            {!isEdit && <span className={`ml-1 text-xs font-normal ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>(available after creating)</span>}
          </label>
          <div className={`rounded-xl border-2 border-dashed transition-colors ${isDark ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
            {displayPrimary ? (
              <div className="flex items-center gap-4 p-4">
                <div className="relative flex-shrink-0">
                  <img src={displayPrimary} alt="Cover" className="w-20 h-20 rounded-full object-cover border border-gray-200 dark:border-gray-700" />
                  {pendingPrimary && (
                    <span className="absolute -top-1 -right-1 text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-primary text-white leading-none">NEW</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  {pendingPrimary
                    ? <p className={`text-sm font-medium truncate mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{pendingPrimary.name}</p>
                    : <p className={`text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Current image</p>
                  }
                  <div className="flex gap-2">
                    <button type="button" onClick={() => primaryFileRef.current?.click()} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${isDark ? 'bg-primary/20 text-primary-light hover:bg-primary/30' : 'bg-primary/10 text-primary hover:bg-primary/20'}`} disabled={!isEdit}>
                      <FiUpload className="w-3.5 h-3.5" />{pendingPrimary ? 'Change' : 'Replace'}
                    </button>
                    {pendingPrimary ? (
                      <button type="button" onClick={handleClearPrimary} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                        <FiX className="w-3.5 h-3.5" />Cancel
                      </button>
                    ) : (
                      <button type="button" onClick={handleMarkDeletePrimary} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${isDark ? 'bg-red-900/30 text-red-400 hover:bg-red-900/50' : 'bg-red-50 text-red-600 hover:bg-red-100'}`} disabled={!isEdit}>
                        <FiTrash2 className="w-3.5 h-3.5" />Remove
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <button type="button" onClick={() => primaryFileRef.current?.click()} disabled={!isEdit} className={`w-full flex flex-col items-center gap-2 py-6 rounded-xl transition-colors ${!isEdit ? 'opacity-50 cursor-not-allowed' : ''} ${isDark ? 'hover:bg-gray-700/50 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}>
                <FiImage className="w-8 h-8 opacity-60" />
                <span className="text-sm font-medium">Click to select an image</span>
                <span className="text-xs opacity-60">JPG, PNG or WebP</span>
              </button>
            )}
            <input ref={primaryFileRef} type="file" accept="image/*" onChange={handlePrimarySelect} className="hidden" disabled={!isEdit} />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button
            buttonText="Cancel"
            onClick={onClose}
            type="basic"
            width="fit"
            darkMode={isDark}
            disabled={disableActions}
          />
          <Button
            buttonText={
              disableActions ? 'Saving…' : isEdit ? 'Save Changes' : 'Add Member'
            }
            onClick={handleSave}
            type="primary"
            width="fit"
            darkMode={isDark}
            disabled={disableActions}
          />
        </div>
      </div>
    </Modal>
  );
};

export default AddEditMemberModal;
