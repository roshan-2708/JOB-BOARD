import React, { useState, useContext, useEffect } from 'react';
import Modal from './Modal';
import api from '../utils/apiConnection'; // Axios instance
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

const AuthModal = ({ isOpen, onClose, initialView = 'login' }) => {
    const { login } = useContext(AuthContext);
    const [view, setView] = useState(initialView);
    const [loading, setLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'candidate' // default role
    });

    // Modal khulte hi view update karne ke liye
    useEffect(() => {
        setView(initialView);
    }, [initialView, isOpen]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (view === 'register') {
                // Register API Call
                const { data } = await api.post('/auth/register', formData);
                login(data.data, data.token); // Context state update
                toast.success("Account created successfully!");
            } else {
                // Login API Call (Sirf email aur password bhejna hai)
                const { data } = await api.post('/auth/login', {
                    email: formData.email,
                    password: formData.password
                });
                login(data.data, data.token); // Context state update
                toast.success(`Welcome back, ${data.data.name}!`);
            }
            onClose(); // Success par modal close kar do
            
        } catch (error) {
            console.error("Auth Error:", error);
            // Backend se aane wala exact error message dikhao
            const errorMessage = error.response?.data?.message || "Something went wrong!";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-slate-800">
                    {view === 'login' ? 'Welcome Back!' : 'Create an Account'}
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                    {view === 'login' 
                        ? 'Login to manage your jobs and applications.' 
                        : 'Join us to find or post the best jobs.'}
                </p>
            </div>

            {/* Toggle Buttons */}
            <div className="flex bg-slate-100 p-1 rounded-lg mb-6">
                <button
                    type="button"
                    onClick={() => setView('login')}
                    className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${
                        view === 'login' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                    }`}
                >
                    Login
                </button>
                <button
                    type="button"
                    onClick={() => setView('register')}
                    className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${
                        view === 'register' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                    }`}
                >
                    Register
                </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                {view === 'register' && (
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1 text-left">Full Name</label>
                        <input 
                            type="text" 
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required={view === 'register'}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                            placeholder="Roshan Patra"
                        />
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1 text-left">Email Address</label>
                    <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                        placeholder="you@example.com"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1 text-left">Password</label>
                    <input 
                        type="password" 
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        minLength={6}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                        placeholder="••••••••"
                    />
                </div>

                {view === 'register' && (
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1 text-left">I am a...</label>
                        <select 
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
                        >
                            <option value="candidate">Candidate (Looking for jobs)</option>
                            <option value="employer">Employer (Hiring)</option>
                        </select>
                    </div>
                )}

                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 transition-colors mt-2 disabled:bg-blue-400 disabled:cursor-not-allowed"
                >
                    {loading ? 'Processing...' : (view === 'login' ? 'Login to Account' : 'Create Account')}
                </button>
            </form>
        </Modal>
    );
};

export default AuthModal;