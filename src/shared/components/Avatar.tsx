import React from 'react';

interface AvatarProps {
  src?: string;
  fallback?: string;
  size?: number;
  backgroundColor?: string;
  textColor?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  fallback = '?',
  size = 40,
  backgroundColor = '#e5e7eb',
  textColor = '#374151',
}) => {
  const style = {
    width: size,
    height: size,
    borderRadius: '50%',
    backgroundColor: src ? 'transparent' : backgroundColor,
    color: textColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: size * 0.4,
    fontWeight: 'bold',
    overflow: 'hidden',
  };

  if (src) {
    return (
      <div style={style}>
        <img
          src={src}
          alt="Avatar"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
    );
  }

  return <div style={style}>{fallback.charAt(0).toUpperCase()}</div>;
};

export default Avatar;
