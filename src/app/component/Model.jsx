'use client';

import { useEffect,useState, useRef } from 'react';

export default function Modal({ isOpen, onClose, children }) {
  const modalRef = useRef();
  
  // Close when clicking outside the modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;
 
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000091] bg-opacity-50" >
      <div
        ref={modalRef}
        className="bg-white  md:w-[700px] h-[auto] sm:w-[500px] w-[90%]  overflow-auto rounded-2xl p-6  shadow-lg relative"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
