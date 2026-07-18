import React, { useState, useContext, useEffect } from 'react';
import Modal from './Modal';
import api from '../utils/apiConnection'; // Axios instance
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { Mail, Lock, User, Eye, EyeOff, Loader2, UserSearch, Building2 } from 'lucide-react';

const AuthModal = ({ isOpen, onClose, initialView = 'login' }) => {
    const { login } = useContext(AuthContext);
    const [view, setView] = useState(initialView);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

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
        setShowPassword(false);
    }, [initialView, isOpen]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const selectRole = (role) => {
        setFormData((prev) => ({ ...prev, role }));
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

    const inputClass =
        "w-full rounded-lg border border-slate-800 bg-slate-900 py-2.5 pl-10 pr-4 font-body text-sm text-slate-100 placeholder-slate-600 outline-none transition-colors focus:border-amber-400 focus:ring-1 focus:ring-amber-400";

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="w-full">
                <div className="mb-6 text-center">
                    <span className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-amber-400/10">
                        <Lock className="h-5 w-5 text-amber-400" strokeWidth={2} />
                    </span>
                    <h2 className="font-display text-xl font-semibold text-slate-50">
                        {view === 'login' ? 'Welcome back' : 'Create your account'}
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                        {view === 'login'
                            ? 'Log in to manage your jobs and applications.'
                            : 'Join to find or post your next open role.'}
                    </p>
                </div>

                {/* Toggle Buttons */}
                <div className="mb-6 flex rounded-lg border border-slate-800 bg-slate-900 p-1">
                    <button
                        type="button"
                        onClick={() => setView('login')}
                        className={`flex-1 rounded-md py-2 font-mono-ui text-sm font-medium transition-all ${
                            view === 'login' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-slate-100'
                        }`}
                    >
                        Login
                    </button>
                    <button
                        type="button"
                        onClick={() => setView('register')}
                        className={`flex-1 rounded-md py-2 font-mono-ui text-sm font-medium transition-all ${
                            view === 'register' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-slate-100'
                        }`}
                    >
                        Register
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {view === 'register' && (
                        <div>
                            <label className="mb-1 block text-left text-xs font-medium uppercase tracking-wide text-slate-500">
                                Full name
                            </label>
                            <div className="relative">
                                <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required={view === 'register'}
                                    className={inputClass}
                                    placeholder="Roshan Patra"
                                />
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="mb-1 block text-left text-xs font-medium uppercase tracking-wide text-slate-500">
                            Email address
                        </label>
                        <div className="relative">
                            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className={inputClass}
                                placeholder="you@example.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-1 block text-left text-xs font-medium uppercase tracking-wide text-slate-500">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                minLength={6}
                                className={`${inputClass} pr-10`}
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((s) => !s)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition-colors hover:text-slate-300"
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>
                        {view === 'register' && (
                            <p className="mt-1 text-xs text-slate-600">At least 6 characters.</p>
                        )}
                    </div>

                    {view === 'register' && (
                        <div>
                            <label className="mb-1 block text-left text-xs font-medium uppercase tracking-wide text-slate-500">
                                I am a...
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => selectRole('candidate')}
                                    className={`flex flex-col items-center gap-1.5 rounded-lg border px-3 py-3 transition-colors ${
                                        formData.role === 'candidate'
                                            ? 'border-amber-400 bg-amber-400/10 text-amber-400'
                                            : 'border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700'
                                    }`}
                                >
                                    <UserSearch className="h-4.5 w-4.5" />
                                    <span className="font-mono-ui text-xs">Candidate</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => selectRole('employer')}
                                    className={`flex flex-col items-center gap-1.5 rounded-lg border px-3 py-3 transition-colors ${
                                        formData.role === 'employer'
                                            ? 'border-amber-400 bg-amber-400/10 text-amber-400'
                                            : 'border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700'
                                    }`}
                                >
                                    <Building2 className="h-4.5 w-4.5" />
                                    <span className="font-mono-ui text-xs">Employer</span>
                                </button>
                            </div>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-amber-400 py-2.5 font-mono-ui text-sm font-semibold text-slate-950 transition-colors hover:bg-amber-300 disabled:cursor-not-allowed disabled:bg-amber-400/50"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Processing...
                            </>
                        ) : view === 'login' ? (
                            'Login to account'
                        ) : (
                            'Create account'
                        )}
                    </button>
                </form>
            </div>
        </Modal>
    );
};

export default AuthModal;