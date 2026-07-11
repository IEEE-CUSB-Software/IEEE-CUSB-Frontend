import React, { useState } from 'react';
import { InputField, Button, TextArea, Modal } from '@ieee-ui/ui';
import { useTheme } from '@/shared/hooks/useTheme';
import {
  AddVacancy,
  UpdateVacancy,
  Vacancy,
} from '@/shared/types/recruitment.types';

interface ExtendedAddEditVacancyModalProps {
  vacancy?: Vacancy;
  apiVacancy?: Vacancy;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: AddVacancy | UpdateVacancy, id?: string) => Promise<void>;
  isPending?: boolean;
}

interface FormValues {
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  is_open: boolean;
}

const empty = (): FormValues => ({
  title: '',
  description: '',
  created_at: '',
  updated_at: '',
  is_open: true,
});

const formatDateForInput = (dateString?: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16);
};

const toForm = (v?: Vacancy): FormValues =>
  v
    ? {
        title: v.title,
        description: v.description,
        created_at: formatDateForInput(v.created_at),
        updated_at: formatDateForInput(v.updated_at),
        //updated_at: formatDateForInput(Date.now().toString()),
        is_open: v.is_open,
      }
    : empty();

type Errs = Partial<Record<keyof FormValues, string>>;

const validate = (v: FormValues): Errs => {
  const e: Errs = {};
  if (!v.title.trim()) e.title = 'Title is required.';
  if (!v.description.trim()) e.description = 'Description is required.';
  return e;
};

export const AddEditVacancyModal: React.FC<
  ExtendedAddEditVacancyModalProps
> = ({ vacancy, apiVacancy, isOpen, onClose, onSave, isPending = false }) => {
  const { isDark } = useTheme();
  const isEditMode = !!vacancy;
  const vacancyId = apiVacancy?.id || vacancy?.id;
  const options = ['Open', 'Closed'];
  const statusColors: Record<string, string> = {
    ['Open']: isDark
      ? 'bg-green-900/30 text-green-300'
      : 'bg-green-50 text-green-700',
    ['Closed']: isDark
      ? 'bg-red-900/30 text-red-300'
      : 'bg-red-50 text-red-700',
  };
  // Form state
  const [formKey, setFormKey] = useState(0);
  const [formValues, setFormValues] = useState<FormValues>(() =>
    toForm(vacancy)
  );
  const [errors, setErrors] = useState<Errs>({});
  const [isSaving, setIsSaving] = useState(false);

  // Reset when modal opens / vacancy changes
  React.useEffect(() => {
    setFormKey(prev => prev + 1);
  }, [vacancy?.id, isOpen]);

  React.useEffect(() => {
    setFormValues(toForm(vacancy));
    setErrors({});
    setIsSaving(false);
  }, [formKey]);

  /* ── Form handlers ─────────────────────────────── */
  const handleInputChange =
    (field: 'title') =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value = e.target.value;
      setFormValues(prev => ({ ...prev, [field]: value }));
      if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
    };

  const handleTextAreaChange =
    (field: 'description') => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setFormValues(prev => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
    };

  const handleStatusChange = (value: string) => {
    setFormValues(prev => ({ ...prev, is_open: value === 'Open' }));
    if (errors.is_open) setErrors(prev => ({ ...prev, is_open: undefined }));
  };

  /* ── Save ──────────────────────────────────────── */
  const handleSave = async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    const validationErrors = validate(formValues);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSaving(true);

    const payload: AddVacancy | UpdateVacancy = {
      title: formValues.title.trim(),
      description: formValues.description.trim(),
      is_open: formValues.is_open,
    };

    try {
      await onSave(payload, vacancyId);
    } catch {
      setIsSaving(false);
    }
  };
  return (
    <Modal
      title={isEditMode ? 'Edit Vacancy' : 'Add New Vacancy'}
      isOpen={isOpen}
      onClose={onClose}
      size="large"
      darkMode={isDark}
    >
      <div className="space-y-6">
        {/* ── Form fields ─── */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <InputField
              label="Vacancy Title"
              value={formValues.title}
              placeholder="e.g. Backend Development"
              onChange={handleInputChange('title')}
              id="title"
              error={errors.title}
              darkMode={isDark}
            />
          </div>
          <div className="md:col-span-2">
            <TextArea
              label="Description (Short)"
              value={formValues.description}
              placeholder="e.g. Develop and maintain backend services..."
              onChange={handleTextAreaChange('description')}
              id="description"
              error={errors.description}
              darkMode={isDark}
            />
          </div>
        </div>
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <label
              id="choose-one-label"
              className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} whitespace-nowrap`}
            >
              Vacancy Status:
            </label>
            <div
              role="group"
              aria-labelledby="choose-one-label"
              className="flex gap-2"
            >
              {options.map(option => (
                <Button
                  buttonText={option}
                  key={option}
                  onClick={() => handleStatusChange(option as string)}
                  className={`text-xs px-2 py-1, ${statusColors[option]}`}
                  width="fit"
                  darkMode={isDark}
                  type="primary"
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Actions ─── */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <Button
            buttonText="Cancel"
            onClick={onClose}
            type="basic"
            width="fit"
            darkMode={isDark}
            disabled={isPending || isSaving}
          />
          <Button
            buttonText={isEditMode ? 'Save Changes' : 'Create Vacancy'}
            onClick={handleSave}
            type="primary"
            width="fit"
            darkMode={isDark}
            loading={isPending || isSaving}
            disabled={isPending || isSaving}
          />
        </div>
      </div>
    </Modal>
  );
};
export default AddEditVacancyModal;
