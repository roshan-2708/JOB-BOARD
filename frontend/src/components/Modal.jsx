import React from 'react';
import { IoClose } from 'react-icons/io5'; 

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
           
            <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 transform transition-all scale-100">
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                >
                    <IoClose size={24} />
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;