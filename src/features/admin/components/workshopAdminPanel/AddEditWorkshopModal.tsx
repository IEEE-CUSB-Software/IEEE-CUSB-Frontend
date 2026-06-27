import React, { useState, useEffect } from 'react';
import { InputField, Button, Modal } from '@ieee-ui/ui';
import { useTheme } from '@/shared/hooks/useTheme';
import { FileUploadField } from '@/shared/components/FileUploadField';
import type { Workshop, CreateWorkshopRequest, UpdateWorkshopRequest } from '@/shared/types/workshops.types';
import { useGetInstructors } from '@/shared/queries/workshops';

interface Props {
  workshop?: Workshop;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CreateWorkshopRequest | UpdateWorkshopRequest, id?: string, file?: File | null) => void;
  isPending?: boolean;
}

interface FormValues {
  title: string;
  description: string;
  content: string;
  location: string;
  start_time: string;
  end_time: string;
  capacity: string;
  registration_deadline: string;
  instructor_ids: string[];
  image: File | null;
}

// Helper to format date string to datetime-local format
const formatDateForInput = (dateString?: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  // Returns 'YYYY-MM-DDThh:mm' format
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
};

const empty = (): FormValues => ({
  title: '',
  description: '',
  content: '',
  location: '',
  start_time: '',
  end_time: '',
  capacity: '0',
  registration_deadline: '',
  instructor_ids: [],
  image: null,
});

const toForm = (w?: Workshop): FormValues =>
  w
    ? {
        title: w.title,
        description: w.description,
        content: w.content || '',
        location: w.location,
        start_time: formatDateForInput(w.start_time),
        end_time: formatDateForInput(w.end_time),
        capacity: String(w.capacity),
        registration_deadline: formatDateForInput(w.registration_deadline),
        instructor_ids: w.instructors?.map(i => i.id) || w.instructor_ids || [],
        image: null,
      }
    : empty();

type Errs = Partial<Record<keyof FormValues, string>>;

const validate = (v: FormValues): Errs => {
  const e: Errs = {};
  if (!v.title.trim()) e.title = 'Title is required.';
  if (!v.location.trim()) e.location = 'Location is required.';
  if (!v.start_time) e.start_time = 'Start time is required.';
  if (!v.end_time) e.end_time = 'End time is required.';
  if (Number(v.capacity) <= 0) e.capacity = 'Capacity must be greater than 0.';
  return e;
};

export const AddEditWorkshopModal: React.FC<Props> = ({
  workshop,
  isOpen,
  onClose,
  onSave,
  isPending = false,
}) => {
  const { isDark } = useTheme();
  const isEdit = !!workshop;
  const [form, setForm] = useState<FormValues>(toForm(workshop));
  const [errors, setErrors] = useState<Errs>({});

  const { data: instructors = [] } = useGetInstructors();

  useEffect(() => {
    setForm(toForm(workshop));
    setErrors({});
  }, [workshop, isOpen]);

  const handleChange =
    (f: keyof FormValues) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm(p => ({ ...p, [f]: e.target.value }));
      if (errors[f]) setErrors(p => ({ ...p, [f]: undefined }));
    };

  const handleInstructorToggle = (id: string) => {
    setForm(p => {
      const current = new Set(p.instructor_ids);
      if (current.has(id)) {
        current.delete(id);
      } else {
        current.add(id);
      }
      return { ...p, instructor_ids: Array.from(current) };
    });
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

    const payload: CreateWorkshopRequest | UpdateWorkshopRequest = {
      title: form.title.trim(),
      description: form.description.trim(),
      content: form.content.trim(),
      category: 'Technical', // Hardcoded for now based on API schema which didn't specify it, though it's in the types
      location: form.location.trim(),
      start_time: new Date(form.start_time).toISOString(),
      end_time: new Date(form.end_time).toISOString(),
      capacity: Number(form.capacity),
      registration_deadline: form.registration_deadline ? new Date(form.registration_deadline).toISOString() : new Date(form.start_time).toISOString(),
      instructor_ids: form.instructor_ids,
    };

    onSave(payload, workshop?.id, form.image);
  };

  return (
    <Modal
      title={isEdit ? 'Edit Workshop' : 'Add Workshop'}
      isOpen={isOpen}
      onClose={onClose}
      size="large"
      darkMode={isDark}
    >
      <div className="space-y-5 max-h-[70vh] overflow-y-auto p-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <InputField
              label="Workshop Title"
              value={form.title}
              placeholder="e.g. IEEE Web Development Workshop"
              onChange={handleChange('title')}
              id="ws-title"
              error={errors.title}
              darkMode={isDark}
            />
          </div>
          
          <div className="md:col-span-2">
            <InputField
              label="Description (Short)"
              value={form.description}
              placeholder="A comprehensive crash course..."
              onChange={handleChange('description')}
              id="ws-desc"
              error={errors.description}
              darkMode={isDark}
            />
          </div>

          <div className="md:col-span-2">
            <InputField
              label="Content"
              value={form.content}
              placeholder="HTML, CSS, JavaScript, React..."
              onChange={handleChange('content')}
              id="ws-content"
              error={errors.content}
              darkMode={isDark}
            />
          </div>

          <InputField
            label="Location"
            value={form.location}
            placeholder="e.g. Lab 3, Building C"
            onChange={handleChange('location')}
            id="ws-location"
            error={errors.location}
            darkMode={isDark}
          />
          
          <InputField
            label="Capacity"
            type="number"
            value={form.capacity}
            onChange={handleChange('capacity')}
            id="ws-capacity"
            error={errors.capacity}
            darkMode={isDark}
          />

          <div className="space-y-2">
            <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Start Time</label>
            <input
              type="datetime-local"
              value={form.start_time}
              onChange={handleChange('start_time')}
              className={`w-full px-4 py-2 rounded-lg border ${
                isDark 
                  ? 'bg-ieee-dark-900 border-gray-700 text-white focus:border-primary focus:ring-1 focus:ring-primary' 
                  : 'bg-white border-gray-300 text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary'
              }`}
            />
            {errors.start_time && <p className="text-sm text-red-500">{errors.start_time}</p>}
          </div>

          <div className="space-y-2">
            <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>End Time</label>
            <input
              type="datetime-local"
              value={form.end_time}
              onChange={handleChange('end_time')}
              className={`w-full px-4 py-2 rounded-lg border ${
                isDark 
                  ? 'bg-ieee-dark-900 border-gray-700 text-white focus:border-primary focus:ring-1 focus:ring-primary' 
                  : 'bg-white border-gray-300 text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary'
              }`}
            />
            {errors.end_time && <p className="text-sm text-red-500">{errors.end_time}</p>}
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Registration Deadline</label>
            <input
              type="datetime-local"
              value={form.registration_deadline}
              onChange={handleChange('registration_deadline')}
              className={`w-full px-4 py-2 rounded-lg border ${
                isDark 
                  ? 'bg-ieee-dark-900 border-gray-700 text-white focus:border-primary focus:ring-1 focus:ring-primary' 
                  : 'bg-white border-gray-300 text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary'
              }`}
            />
          </div>

          <div className="md:col-span-2">
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Instructors</label>
            <div className="flex flex-wrap gap-2">
              {instructors.map(instructor => (
                <button
                  key={instructor.id}
                  onClick={() => handleInstructorToggle(instructor.id)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                    form.instructor_ids.includes(instructor.id)
                      ? isDark
                        ? 'bg-primary/20 border-primary text-primary'
                        : 'bg-primary/10 border-primary text-primary'
                      : isDark
                      ? 'border-gray-700 hover:border-gray-500 text-gray-300'
                      : 'border-gray-300 hover:border-gray-400 text-gray-700'
                  }`}
                >
                  {instructor.name}
                </button>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <FileUploadField
              label="Cover Image"
              id="ws-cover"
              value={form.image || undefined}
              preview={workshop?.image_url || undefined}
              onChange={handleImageChange}
              accept="image/*"
              acceptedFormats="PNG, JPG, GIF up to 5MB"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
          <Button
            buttonText="Cancel"
            onClick={onClose}
            type="basic"
            width="fit"
            darkMode={isDark}
            disabled={isPending}
          />
          <Button
            buttonText={isPending ? 'Saving…' : isEdit ? 'Save Changes' : 'Add Workshop'}
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

export default AddEditWorkshopModal;
