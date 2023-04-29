import React, { useEffect } from 'react';

export function Modal({ data, onClose }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const onOverlayClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const { src, alt } = data;

  return (
    <div className="overlay" onClick={onOverlayClick}>
      <div className="modal">
        <img src={src} alt={alt} />
      </div>
    </div>
  );
}
