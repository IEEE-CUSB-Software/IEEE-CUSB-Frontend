import { useState } from 'react';
import { User } from 'lucide-react';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';

interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: AvatarSize;
  className?: string;
  fallbackColor?: string;
  onError?: () => void;
}

const Avatar = ({
  src,
  alt = '',
  name = '',
  size = 'md',
  className = '',
  fallbackColor,
  onError,
}: AvatarProps) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const sizes: Record<AvatarSize, string> = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
    '2xl': 'w-20 h-20 text-2xl',
    '3xl': 'w-24 h-24 text-3xl',
    '4xl': 'w-32 h-32 text-4xl',
  };

  const iconSizes: Record<AvatarSize, string> = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8',
    '2xl': 'w-10 h-10',
    '3xl': 'w-12 h-12',
    '4xl': 'w-16 h-16',
  };

  const getInitials = (name: string): string => {
    if (!name) return '';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0]?.charAt(0).toUpperCase() || '';
    return (
      (parts[0]?.charAt(0) || '') + (parts[parts.length - 1]?.charAt(0) || '')
    ).toUpperCase();
  };

  const getColorFromName = (name: string): string => {
    if (fallbackColor) return fallbackColor;
    if (!name) return 'bg-gray-400';

    const colors = [
      'bg-red-500',
      'bg-orange-500',
      'bg-amber-500',
      'bg-yellow-500',
      'bg-lime-500',
      'bg-green-500',
      'bg-emerald-500',
      'bg-teal-500',
      'bg-cyan-500',
      'bg-sky-500',
      'bg-blue-500',
      'bg-indigo-500',
      'bg-violet-500',
      'bg-purple-500',
      'bg-fuchsia-500',
      'bg-pink-500',
      'bg-rose-500',
    ];

    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length] || 'bg-gray-400';
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
    onError?.();
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const initials = getInitials(name || alt);
  const bgColor = getColorFromName(name || alt);
  const sizeClass = sizes[size] || sizes.md;
  const iconSize = iconSizes[size] || iconSizes.md;

  const shouldShowImage = src && !imageError;
  const shouldShowInitials = !shouldShowImage && initials;
  const shouldShowIcon = !shouldShowImage && !initials;

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-full overflow-hidden shrink-0 ${sizeClass} ${className}`}
      role="img"
      aria-label={alt || name || 'Avatar'}
    >
      {shouldShowImage && (
        <>
          <img
            src={src}
            alt={alt || name}
            onError={handleImageError}
            onLoad={handleImageLoad}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imageLoading ? 'opacity-0' : 'opacity-100'
            }`}
            draggable="false"
          />
          {imageLoading && (
            <div className={`absolute inset-0 ${bgColor} animate-pulse`} />
          )}
        </>
      )}

      {shouldShowInitials && (
        <div
          className={`w-full h-full flex items-center justify-center ${bgColor} text-white font-semibold select-none`}
        >
          {initials}
        </div>
      )}

      {shouldShowIcon && (
        <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-600">
          <User className={iconSize} />
        </div>
      )}
    </div>
  );
};

export default Avatar;
