import React, { useEffect, useState } from 'react';

const Toast = ({ message, duration = 2000, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!message) return;
    setVisible(true);
    const t = setTimeout(() => {
      setVisible(false);
      onClose && onClose();
    }, duration);
    return () => clearTimeout(t);
  }, [message]);

  if (!message) return null;

  return (
    <div className={`fixed bottom-6 right-6 bg-black/80 text-white px-4 py-2 rounded transition-opacity ${visible ? 'opacity-100' : 'opacity-0'}`}>
      {message}
    </div>
  );
};

export default Toast;
