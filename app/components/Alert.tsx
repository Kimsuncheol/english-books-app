import React from 'react';

interface AlertProps {
  message: string | null;
  isVisible: boolean;
}

const Alert: React.FC<AlertProps> = ({ message, isVisible }) => {
  if (!message) return null;

  return (
    <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
      bg-black bg-opacity-75 text-white px-4 py-2 rounded-lg z-50
      transition-opacity duration-500 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {message}
    </div>
  );
};

export default Alert;
