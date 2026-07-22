import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
    IoSearchOutline,
    IoLocationOutline,
    IoBriefcaseOutline,
    IoArrowForward,
} from 'react-icons/io5'

const INDUSTRIES = ['All industries', 'Engineering', 'Design', 'Finance', 'Marketing', 'Healthcare']

const COMPANIES = [
    { name: 'Northwind Systems', industry: 'Engineering', location: 'Austin, TX', openRoles: 18 },
    { name: 'Cedar & Finch', industry: 'Design', location: 'Remote (US)', openRoles: 6 },
    { name: 'Fernweh Studio', industry: 'Marketing', location: 'Remote (Global)', openRoles: 9 },
    { name: 'Harbor Analytics', industry: 'Finance', location: 'Chicago, IL', openRoles: 4 },
    { name: 'Basalt Robotics', industry: 'Engineering', location: 'Remote (EU)', openRoles: 12 },
    { name: 'Anchorpoint Labs', industry: 'Healthcare', location: 'Denver, CO', openRoles: 7 },
    { name: 'Vale & Holt', industry: 'Finance', location: 'New York, NY', openRoles: 5 },
    { name: 'Lumen Grid', industry: 'Engineering', location: 'Remote (US)', openRoles: 15 },
    { name: 'Fieldstone Health', industry: 'Healthcare', location: 'Boston, MA', openRoles: 3 },
]

const CompanyCard = ({ company }) => {
    const initial = company.name.charAt(0).toUpperCase()
    return (
        <div className="group rounded-xl border border-slate-800 bg-slate-900/40 p-6 transition-colors hover:border-amber-400/40">
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-amber-400 font-display text-lg font-semibold text-slate-950">
                        {initial}
                    </span>
                    <div>
                        <h3 className="font-display text-base font-semibold text-slate-50">{company.name}</h3>
                        <p className="font-mono-ui text-xs text-slate-500">{company.industry}</p>
                    </div>
                </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 font-mono-ui text-xs text-slate-500">
                <span className="flex items-center gap-1">
                    <IoLocationOutline className="h-3.5 w-3.5" />
                    {company.location}
                </span>
                <span className="flex items-center gap-1 text-emerald-400">
                    <IoBriefcaseOutline className="h-3.5 w-3.5" />
                    {company.openRoles} open roles
                </span>
            </div>

            <Link
                to={`/jobs?company=${encodeURIComponent(company.name)}`}
                className="mt-5 flex items-center gap-1.5 font-mono-ui text-sm font-medium text-amber-400 transition-colors group-hover:text-amber-300"
            >
                View open roles <IoArrowForward className="h-3.5 w-3.5" />
            </Link>
        </div>
    )
}

const Companies = () => {
    const [query, setQuery] = useState('')
    const [industry, setIndustry] = useState(INDUSTRIES[0])

    const filtered = COMPANIES.filter((c) => {
        const matchesQuery = c.name.toLowerCase().includes(query.toLowerCase())
        const matchesIndustry = industry === INDUSTRIES[0] || c.industry === industry
        return matchesQuery && matchesIndustry
    })

    return (
        <div className="min-h-screen bg-slate-950 font-body text-slate-200">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500;600;700&display=swap');
        .font-display { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; }
        .font-mono-ui { font-family: 'IBM Plex Mono', ui-monospace, monospace; }
        .font-body { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
      `}</style>

            {/* ------------------------------------------------------------ HERO */}
            <section className="border-b border-slate-800/80">
                <div className="mx-auto max-w-3xl px-6 py-20 text-center lg:px-8">
                    <span className="font-mono-ui text-xs uppercase tracking-widest text-amber-400">Companies</span>
                    <h1 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight text-slate-50 sm:text-5xl">
                        Companies hiring right now.
                    </h1>
                    <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-400">
                        {COMPANIES.length} teams are actively posting on the board — browse who's hiring and jump straight to their open roles.
                    </p>
                </div>
            </section>

            <section className="border-b border-slate-800/80 py-8">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <div className="relative flex-1">
                            <IoSearchOutline className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search companies"
                                className="w-full rounded-lg border border-slate-800 bg-slate-900 py-2.5 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-600 outline-none transition-colors focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                            />
                        </div>

                        <select
                            value={industry}
                            onChange={(e) => setIndustry(e.target.value)}
                            className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-2.5 text-sm text-slate-100 outline-none transition-colors focus:border-amber-400 focus:ring-1 focus:ring-amber-400 sm:w-56"
                        >
                            {INDUSTRIES.map((i) => <option key={i} value={i}>{i}</option>)}
                        </select>
                    </div>
                </div>
            </section>

            <section className="py-14">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    {filtered.length === 0 ? (
                        <div className="flex flex-col items-center rounded-xl border border-dashed border-slate-800 py-20 text-center">
                            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-900">
                                <IoSearchOutline className="h-5 w-5 text-slate-500" />
                            </span>
                            <h3 className="mt-4 font-display text-base font-semibold text-slate-200">No companies match your search</h3>
                            <p className="mt-1.5 max-w-xs text-sm text-slate-500">Try a different name or clear the industry filter.</p>
                        </div>
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {filtered.map((company) => (
                                <CompanyCard key={company.name} company={company} />
                            ))}
                        </div>
                    )}
                </div>
            </section>
            <section className="border-t border-slate-800/80 py-20">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="flex flex-col items-center gap-6 rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 px-8 py-16 text-center">
                        <h2 className="font-display text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">Hiring? Get on the board.</h2>
                        <p className="max-w-md text-slate-400">Post a role and reach candidates who are actually looking, not just browsing.</p>
                        <Link
                            to="/post-job"
                            className="rounded-md bg-amber-400 px-6 py-3 font-mono-ui text-sm font-medium text-slate-950 transition-colors hover:bg-amber-300"
                        >
                            Post a role
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Companies