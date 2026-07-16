import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Link } from 'react-router-dom'

import AuthModal from './AuthModals'
import LogoutModal from './AuthLogoutModal'

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false) 
    
    const { user } = useContext(AuthContext);

    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [authView, setAuthView] = useState('login'); 
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const navLinks = [
        { label: 'About', to: '/about' },
        { label: 'Find Jobs', to: '/jobs' },
        { label: 'Category', to: '/category' },
        { label: 'Companies', to: '/companies' },
        { label: 'Contact', to: '/contact' },
    ]

    const openLogin = () => {
        setAuthView('login');
        setIsAuthModalOpen(true);
    };

    const openRegister = () => {
        setAuthView('register');
        setIsAuthModalOpen(true);
    };

    return (
        <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="flex items-center gap-2 shrink-0">
                        <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-amber-500 text-white">
                        </span>
                        <span className="text-lg font-bold text-slate-900 tracking-tight">
                            Job<span className="text-amber-500">Lane</span>
                        </span>
                    </Link>

                    <nav className="hidden lg:flex">
                        <ul className="flex items-center gap-8">
                            {navLinks.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        to={link.to}
                                        className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="hidden lg:flex items-center gap-3">
                        {
                            user ? (
                                <div className="flex items-center gap-3">
                                    <Link to="/dashboard" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors px-3 py-2">
                                        Dashboard
                                    </Link>
                                    <button
                                        onClick={() => setIsLogoutModalOpen(true)}
                                        className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors px-3 py-2">
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={openLogin}
                                        className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors px-3 py-2"
                                    >
                                        Login
                                    </button>
                                    <button
                                        onClick={openRegister}
                                        className="text-sm font-medium text-slate-700 border border-slate-300 rounded-lg px-4 py-2 hover:border-slate-400 hover:bg-slate-50 transition-colors"
                                    >
                                        Register
                                    </button>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>

            <AuthModal 
                isOpen={isAuthModalOpen} 
                onClose={() => setIsAuthModalOpen(false)} 
                initialView={authView} 
            />
            
            <LogoutModal 
                isOpen={isLogoutModalOpen} 
                onClose={() => setIsLogoutModalOpen(false)} 
            />

        </header>
    )
}

export default NavBar