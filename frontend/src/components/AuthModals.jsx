import React, { useState } from 'react';
import Modal from './Modal';

const AuthModal = ({ isOpen, onClose, initialView = 'login' }) => {
    const [view, setView] = useState(initialView);

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

            <div className="flex bg-slate-100 p-1 rounded-lg mb-6">
                <button
                    onClick={() => setView('login')}
                    className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${
                        view === 'login' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                    }`}
                >
                    Login
                </button>
                <button
                    onClick={() => setView('register')}
                    className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${
                        view === 'register' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                    }`}
                >
                    Register
                </button>
            </div>

            <form className="space-y-4">
                {view === 'register' && (
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1 text-left">Full Name</label>
                        <input 
                            type="text" 
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                            placeholder="Roshan Patra"
                        />
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1 text-left">Email Address</label>
                    <input 
                        type="email" 
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                        placeholder="you@example.com"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1 text-left">Password</label>
                    <input 
                        type="password" 
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                        placeholder="••••••••"
                    />
                </div>

                {view === 'register' && (
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1 text-left">I am a...</label>
                        <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white">
                            <option value="candidate">Candidate (Looking for jobs)</option>
                            <option value="employer">Employer (Hiring)</option>
                        </select>
                    </div>
                )}

                <button 
                    type="submit" 
                    className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 transition-colors mt-2"
                >
                    {view === 'login' ? 'Login to Account' : 'Create Account'}
                </button>
            </form>
        </Modal>
    );
};

export default AuthModal;