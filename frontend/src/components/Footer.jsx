import React from 'react'
import { Link } from 'react-router-dom'
import { PlaneTakeoff, ArrowRight } from 'lucide-react'
import { FiTwitter, FiLinkedin, FiGithub } from 'react-icons/fi'

const FOOTER_LINKS = {
    Product: [
        { label: 'Find jobs', to: '/jobs' },
        { label: 'Browse companies', to: '/companies' },
        { label: 'Browse categories', to: '/category' },
        { label: 'Post a role', to: '/post-job' },
    ],
    Company: [
        { label: 'About', to: '/about' },
        { label: 'Contact', to: '/contact' },
        { label: 'Careers', to: '/careers' },
    ],
    Resources: [
        { label: 'Salary guide', to: '/resources/salary-guide' },
        { label: 'Resume tips', to: '/resources/resume-tips' },
        { label: 'Help center', to: '/help' },
    ],
}

const SOCIALS = [
    { label: 'Twitter', href: 'https://twitter.com', Icon: FiTwitter },
    { label: 'LinkedIn', href: 'https://linkedin.com', Icon: FiLinkedin },
    { label: 'GitHub', href: 'https://github.com', Icon: FiGithub },
]

const Footer = () => {
    return (
        <footer className="border-t border-slate-800/80 bg-slate-950 font-body">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500;600;700&display=swap');
                .font-display { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; }
                .font-mono-ui { font-family: 'IBM Plex Mono', ui-monospace, monospace; }
                .font-body { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
            `}</style>

            <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
                <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr_1.3fr]">
                    {/* Brand + blurb */}
                    <div>
                        <Link to="/" className="flex items-center gap-2.5">
                            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-amber-400 text-slate-950">
                                <PlaneTakeoff className="h-4 w-4" strokeWidth={2.5} />
                            </span>
                            <span className="font-display text-lg tracking-tight text-slate-50">
                                Job<span className="text-amber-400">Lane</span>
                            </span>
                        </Link>
                        <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-500">
                            A live board of real openings — updated hourly, no dead listings, no noise.
                        </p>

                        <div className="mt-6 flex items-center gap-2">
                            {SOCIALS.map(({ label, href, Icon }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="flex h-9 w-9 items-center justify-center rounded-md border border-slate-800 text-slate-500 transition-colors hover:border-amber-400/40 hover:text-amber-400"
                                >
                                    <Icon className="h-4 w-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link columns */}
                    {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
                        <div key={heading}>
                            <h4 className="font-mono-ui text-xs uppercase tracking-widest text-slate-500">{heading}</h4>
                            <ul className="mt-4 space-y-3 text-sm">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        <Link to={link.to} className="text-slate-400 transition-colors hover:text-slate-50">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Newsletter */}
                    <div>
                        <h4 className="font-mono-ui text-xs uppercase tracking-widest text-slate-500">Get new roles by email</h4>
                        <p className="mt-4 text-sm text-slate-500">One email a week. Unsubscribe anytime.</p>
                        <form
                            onSubmit={(e) => e.preventDefault()}
                            className="mt-4 flex overflow-hidden rounded-md border border-slate-800 focus-within:border-amber-400"
                        >
                            <label htmlFor="footer-newsletter" className="sr-only">Email address</label>
                            <input
                                id="footer-newsletter"
                                type="email"
                                required
                                placeholder="you@email.com"
                                className="w-full bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder-slate-600 outline-none"
                            />
                            <button
                                type="submit"
                                aria-label="Subscribe"
                                className="shrink-0 bg-amber-400 px-3 text-slate-950 transition-colors hover:bg-amber-300"
                            >
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 text-xs text-slate-600 sm:flex-row">
                    <p>© {new Date().getFullYear()} JobLane, Inc. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link to="/privacy" className="hover:text-slate-300">Privacy</Link>
                        <Link to="/terms" className="hover:text-slate-300">Terms</Link>
                        <Link to="/cookies" className="hover:text-slate-300">Cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer