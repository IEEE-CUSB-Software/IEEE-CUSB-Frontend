import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';

interface ErrorMessageProps {
  message?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="flex items-center gap-2 text-red-500 text-sm mt-1">
      <FiAlertCircle className="w-4 h-4 shrink-0" />
      <span>{message}</span>
    </div>
  );
};
