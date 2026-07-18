import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { IoClose } from 'react-icons/io5';

const Modal = ({ isOpen, onClose, children }) => {
    // Lock background scroll while the modal is open
    useEffect(() => {
        if (!isOpen) return;
        const original = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = original;
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 p-4 backdrop-blur-sm transition-opacity"
            onClick={onClose}
        >
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500;600&display=swap');
                .font-display { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; }
                .font-mono-ui { font-family: 'IBM Plex Mono', ui-monospace, monospace; }
                .font-body { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
            `}</style>

            {/* Centering frame: min-h-full instead of h-full lets the frame grow
               taller than the viewport, so overflow-y-auto on the parent can
               actually scroll to it rather than clipping it off-screen. */}
            <div className="flex min-h-full items-center justify-center">
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="relative my-8 w-full max-w-md scale-100 transform rounded-2xl border border-slate-800 bg-slate-950 p-6 font-body shadow-2xl shadow-black/50 transition-all"
                >
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 rounded-full p-1 text-slate-500 transition-colors hover:bg-slate-900 hover:text-amber-400"
                        aria-label="Close"
                    >
                        <IoClose size={24} />
                    </button>
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
};

export default Modal;