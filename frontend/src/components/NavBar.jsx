import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Link, NavLink } from 'react-router-dom'
import { PlaneTakeoff, Menu, X, LayoutDashboard, LogOut } from 'lucide-react'

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
        setIsOpen(false);
    };

    const openRegister = () => {
        setAuthView('register');
        setIsAuthModalOpen(true);
        setIsOpen(false);
    };

    const initial = (user?.name || user?.email || 'U').charAt(0).toUpperCase();

    const navLinkClass = ({ isActive }) =>
        `relative font-mono-ui text-sm transition-colors ${isActive ? 'text-amber-400' : 'text-slate-400 hover:text-slate-50'
        } after:absolute after:-bottom-[21px] after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-amber-400 after:transition-transform after:duration-200 ${isActive ? 'after:scale-x-100' : 'after:scale-x-0'
        }`

    return (
        <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
                .font-display { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; }
                .font-mono-ui { font-family: 'IBM Plex Mono', ui-monospace, monospace; }
            `}</style>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex shrink-0 items-center gap-2.5">
                        <span className="flex h-8 w-8 items-center justify-center rounded-md bg-amber-400 text-slate-950">
                            <PlaneTakeoff className="h-4 w-4" strokeWidth={2.5} />
                        </span>
                        <span className="font-display text-lg tracking-tight text-slate-50">
                            Job<span className="text-amber-400">Lane</span>
                        </span>
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden lg:flex">
                        <ul className="flex items-center gap-8">
                            {navLinks.map((link) => (
                                <li key={link.label}>
                                    <NavLink to={link.to} className={navLinkClass}>
                                        {link.label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Desktop auth area */}
                    <div className="hidden lg:flex lg:items-center lg:gap-3">
                        {user ? (
                            <div className="flex items-center gap-2">
                                <Link
                                    to="/dashboard"
                                    className="flex items-center gap-1.5 rounded-md px-3 py-2 font-mono-ui text-sm text-slate-400 transition-colors hover:bg-slate-900 hover:text-slate-50"
                                >
                                    <LayoutDashboard className="h-4 w-4" />
                                    Dashboard
                                </Link>
                                <button
                                    onClick={() => setIsLogoutModalOpen(true)}
                                    className="flex items-center gap-1.5 rounded-md px-3 py-2 font-mono-ui text-sm text-slate-400 transition-colors hover:bg-slate-900 hover:text-slate-50"
                                >
                                    <LogOut className="h-4 w-4" />
                                    Logout
                                </button>
                                <span className="ml-1 flex h-9 w-9 items-center justify-center rounded-full bg-amber-400 font-mono-ui text-sm font-semibold text-slate-950">
                                    {initial}
                                </span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={openLogin}
                                    className="px-3 py-2 font-mono-ui text-sm text-slate-300 transition-colors hover:text-slate-50"
                                >
                                    Login
                                </button>
                                <button
                                    onClick={openRegister}
                                    className="rounded-md bg-amber-400 px-4 py-2 font-mono-ui text-sm font-medium text-slate-950 transition-colors hover:bg-amber-300"
                                >
                                    Register
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Mobile toggle */}
                    <button
                        onClick={() => setIsOpen((o) => !o)}
                        className="flex h-9 w-9 items-center justify-center rounded-md text-slate-300 hover:bg-slate-900 lg:hidden"
                        aria-label="Toggle menu"
                        aria-expanded={isOpen}
                    >
                        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            <div
                className={`overflow-hidden border-t border-slate-800 bg-slate-950 transition-[max-height] duration-300 ease-in-out lg:hidden ${isOpen ? 'max-h-[26rem]' : 'max-h-0 border-t-0'
                    }`}
            >
                <nav className="flex flex-col px-4 py-4 sm:px-6">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.label}
                            to={link.to}
                            onClick={() => setIsOpen(false)}
                            className={({ isActive }) =>
                                `rounded-md px-3 py-2.5 font-mono-ui text-sm transition-colors ${isActive ? 'bg-amber-400/10 text-amber-400' : 'text-slate-400 hover:bg-slate-900 hover:text-slate-50'
                                }`
                            }
                        >
                            {link.label}
                        </NavLink>
                    ))}

                    <div className="mt-3 flex flex-col gap-2 border-t border-slate-800 pt-3">
                        {user ? (
                            <>
                                <Link
                                    to="/dashboard"
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-2 rounded-md px-3 py-2.5 font-mono-ui text-sm text-slate-400 hover:bg-slate-900 hover:text-slate-50"
                                >
                                    <LayoutDashboard className="h-4 w-4" />
                                    Dashboard
                                </Link>
                                <button
                                    onClick={() => {
                                        setIsOpen(false);
                                        setIsLogoutModalOpen(true);
                                    }}
                                    className="flex items-center gap-2 rounded-md px-3 py-2.5 text-left font-mono-ui text-sm text-slate-400 hover:bg-slate-900 hover:text-slate-50"
                                >
                                    <LogOut className="h-4 w-4" />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={openLogin}
                                    className="rounded-md px-3 py-2.5 text-left font-mono-ui text-sm text-slate-300 hover:bg-slate-900 hover:text-slate-50"
                                >
                                    Login
                                </button>
                                <button
                                    onClick={openRegister}
                                    className="rounded-md bg-amber-400 px-3 py-2.5 font-mono-ui text-sm font-medium text-slate-950 hover:bg-amber-300"
                                >
                                    Register
                                </button>
                            </>
                        )}
                    </div>
                </nav>
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