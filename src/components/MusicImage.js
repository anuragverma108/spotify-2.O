import React, { useState, useEffect } from 'react';

const FALLBACK_IMAGE = 'https://via.placeholder.com/300x300?text=No+Image';

const MusicImage = ({ src, alt, className, style, ...props }) => {
  const [imgSrc, setImgSrc] = useState(src || FALLBACK_IMAGE);

  useEffect(() => {
    setImgSrc(src || FALLBACK_IMAGE);
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