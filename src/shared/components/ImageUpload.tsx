import React, { useRef, useState } from 'react';
import { FiUpload, FiX } from 'react-icons/fi';
import { Button } from '@ieee-ui/ui';

interface ImageUploadProps {
  label?: string;
  value?: string;
  onChange: (base64: string) => void;
  error?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  label,
  value,
  onChange,
  error,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string>(value || '');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setPreview(base64);
        onChange(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    setPreview('');
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      {!preview ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className={`
            border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-colors
            ${
              error
                ? 'border-red-300 bg-red-50 hover:bg-red-100'
                : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
            }
          `}
        >
          <FiUpload className="w-8 h-8 text-gray-400 mb-2" />
          <p className="text-sm text-gray-500 font-medium">
            Click to upload image
          </p>
          <p className="text-xs text-gray-400">PNG, JPG up to 5MB</p>
        </div>
      ) : (
        <div className="relative rounded-xl overflow-hidden border border-gray-200 group">
          <img
            src={preview}
            alt="Upload preview"
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button
              type="secondary"
              onClick={handleRemove}
              buttonText="Remove Image"
              buttonIcon={<FiX />}
            />
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default ImageUpload;
