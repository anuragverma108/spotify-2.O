import React, { useState, useEffect } from 'react';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80';

const MusicImage = ({ src, alt, className, style, ...props }) => {
  // Use fallback if src is missing, empty, or only whitespace
  const getValidSrc = (s) => (s && typeof s === 'string' && s.trim() ? s : FALLBACK_IMAGE);
  const [imgSrc, setImgSrc] = useState(getValidSrc(src));

  useEffect(() => {
    setImgSrc(getValidSrc(src));
  }, [src]);

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      style={style}
      onError={() => {
        if (imgSrc !== FALLBACK_IMAGE) setImgSrc(FALLBACK_IMAGE);
      }}
      {...props}
    />
  );
};

export default MusicImage; 