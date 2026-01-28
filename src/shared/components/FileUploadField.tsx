import React, { useRef } from 'react';
import { FiUpload, FiX, FiFile } from 'react-icons/fi';
import { Button } from '@ieee-ui/ui';

interface FileUploadFieldProps {
  id?: string;
  label?: string;
  value?: File | string;
  onChange: (file: File | null) => void;
  preview?: string;
  accept?: string;
  acceptedFormats?: string;
  error?: string;
}

export const FileUploadField: React.FC<FileUploadFieldProps> = ({
  id,
  label,
  value,
  onChange,
  preview,
  accept,
  acceptedFormats,
  error,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange(file);
  };

  const handleRemove = () => {
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const isImage =
    preview || (value instanceof File && value.type.startsWith('image/'));

  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      {!value ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className={`
            border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors
            ${
              error
                ? 'border-red-300 bg-red-50 hover:bg-red-100'
                : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
            }
          `}
        >
          <FiUpload className="w-6 h-6 text-gray-400 mb-2" />
          <p className="text-sm text-gray-500 font-medium">Click to upload</p>
          {acceptedFormats && (
            <p className="text-xs text-gray-400">{acceptedFormats}</p>
          )}
        </div>
      ) : (
        <div className="relative rounded-xl overflow-hidden border border-gray-200 group">
          {isImage ? (
            <img
              src={
                preview ||
                (value instanceof File ? URL.createObjectURL(value) : '')
              }
              alt="Preview"
              className="w-full h-48 object-cover"
            />
          ) : (
            <div className="bg-gray-50 p-6 flex items-center justify-center">
              <FiFile className="w-8 h-8 text-gray-400" />
              <span className="ml-2 text-sm text-gray-700">
                {value instanceof File ? value.name : 'File uploaded'}
              </span>
            </div>
          )}

          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button
              type="secondary"
              onClick={handleRemove}
              buttonText="Remove"
              buttonIcon={<FiX />}
            />
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        id={id}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};
