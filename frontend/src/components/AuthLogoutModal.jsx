import React, { useContext } from 'react';
import Modal from './Modal';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const LogoutModal = ({ isOpen, onClose }) => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        onClose();
        toast.success("Logged out successfully");
        navigate('/');
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="text-center py-4">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                    <span className="text-red-600 text-2xl font-bold">!</span>
                </div>
                <h3 className="text-lg leading-6 font-bold text-slate-900 mb-2">Ready to Leave?</h3>
                <p className="text-sm text-slate-500 mb-6">
                    Are you sure you want to log out of your account? You will need to login again to apply or post jobs.
                </p>

                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleLogout}
                        className="flex-1 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
                    >
                        Yes, Logout
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default LogoutModal;