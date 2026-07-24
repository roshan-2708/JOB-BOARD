import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
    IoSearchOutline,
    IoLocationOutline,
    IoBriefcaseOutline,
    IoArrowForward,
    IoTrendingUpOutline,
    IoSparklesOutline,
    IoBusinessOutline,
} from 'react-icons/io5'

const INDUSTRIES = ['All industries', 'Engineering', 'Design', 'Finance', 'Marketing', 'Healthcare']

const COMPANIES = [
    { name: 'Northwind Systems', industry: 'Engineering', location: 'Austin, TX', openRoles: 18, founded: 2014, size: '210–500', hiringVelocity: 'high' },
    { name: 'Cedar & Finch', industry: 'Design', location: 'Remote (US)', openRoles: 6, founded: 2019, size: '11–50', hiringVelocity: 'steady' },
    { name: 'Fernweh Studio', industry: 'Marketing', location: 'Remote (Global)', openRoles: 9, founded: 2017, size: '51–200', hiringVelocity: 'high' },
    { name: 'Harbor Analytics', industry: 'Finance', location: 'Chicago, IL', openRoles: 4, founded: 2012, size: '210–500', hiringVelocity: 'steady' },
    { name: 'Basalt Robotics', industry: 'Engineering', location: 'Remote (EU)', openRoles: 12, founded: 2020, size: '51–200', hiringVelocity: 'high' },
    { name: 'Anchorpoint Labs', industry: 'Healthcare', location: 'Denver, CO', openRoles: 7, founded: 2016, size: '210–500', hiringVelocity: 'steady' },
    { name: 'Vale & Holt', industry: 'Finance', location: 'New York, NY', openRoles: 5, founded: 2009, size: '500+', hiringVelocity: 'steady' },
    { name: 'Lumen Grid', industry: 'Engineering', location: 'Remote (US)', openRoles: 15, founded: 2018, size: '210–500', hiringVelocity: 'high' },
    { name: 'Fieldstone Health', industry: 'Healthcare', location: 'Boston, MA', openRoles: 3, founded: 2015, size: '51–200', hiringVelocity: 'quiet' },
]

const FEATURED = COMPANIES.reduce((a, b) => (b.openRoles > a.openRoles ? b : a))

const totalOpenRoles = COMPANIES.reduce((sum, c) => sum + c.openRoles, 0)
const industryCounts = INDUSTRIES.slice(1).map((name) => ({
    name,
    count: COMPANIES.filter((c) => c.industry === name).length,
}))
const maxIndustryCount = Math.max(...industryCounts.map((i) => i.count))

const velocityStyles = {
    high: 'bg-emerald-400/10 text-emerald-400',
    steady: 'bg-amber-400/10 text-amber-400',
    quiet: 'bg-slate-500/10 text-slate-400',
}
const velocityLabel = {
    high: 'Hiring fast',
    steady: 'Hiring steadily',
    quiet: 'Selective hiring',
}

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
                        <p className="font-mono-ui text-xs text-slate-500">{company.industry} &middot; est. {company.founded}</p>
                    </div>
                </div>
                <span className={`shrink-0 rounded-full px-2.5 py-1 font-mono-ui text-[10px] uppercase tracking-wide ${velocityStyles[company.hiringVelocity]}`}>
                    {velocityLabel[company.hiringVelocity]}
                </span>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 font-mono-ui text-xs text-slate-500">
                <span className="flex items-center gap-1">
                    <IoLocationOutline className="h-3.5 w-3.5" />
                    {company.location}
                </span>
                <span className="flex items-center gap-1">
                    <IoBusinessOutline className="h-3.5 w-3.5" />
                    {company.size} people
                </span>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-slate-800/80 pt-4">
                <span className="font-mono-ui text-xs text-emerald-400">{company.openRoles} open roles</span>
                <Link
                    to={`/jobs?company=${encodeURIComponent(company.name)}`}
                    className="flex items-center gap-1.5 font-mono-ui text-sm font-medium text-amber-400 transition-colors group-hover:text-amber-300"
                >
                    View roles <IoArrowForward className="h-3.5 w-3.5" />
                </Link>
            </div>
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
                        Know who you'd actually work for.
                    </h1>
                    <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-400">
                        Team size, hiring pace, industry — the context that doesn't fit in a job listing. Browse {COMPANIES.length} companies before you browse their roles.
                    </p>
                </div>
            </section>

            {/* ------------------------------------------------------------ STATS STRIP */}
            <section className="border-b border-slate-800/80 bg-slate-900/30">
                <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-10 sm:grid-cols-4 lg:px-8">
                    {[
                        { label: 'Companies on the board', value: COMPANIES.length },
                        { label: 'Combined open roles', value: totalOpenRoles },
                        { label: 'Industries represented', value: INDUSTRIES.length - 1 },
                        { label: 'Hiring fast right now', value: COMPANIES.filter((c) => c.hiringVelocity === 'high').length },
                    ].map((stat) => (
                        <div key={stat.label}>
                            <p className="font-display text-3xl font-semibold text-slate-50">{stat.value}</p>
                            <p className="mt-1 font-mono-ui text-xs text-slate-500">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ------------------------------------------------------------ INDUSTRY BREAKDOWN */}
            <section className="border-b border-slate-800/80 py-14">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="flex items-center gap-2">
                        <IoTrendingUpOutline className="h-4 w-4 text-amber-400" />
                        <h2 className="font-mono-ui text-xs uppercase tracking-widest text-slate-500">Where the hiring is</h2>
                    </div>
                    <div className="mt-6 space-y-3">
                        {industryCounts.map((row) => (
                            <div key={row.name} className="flex items-center gap-4">
                                <span className="w-28 shrink-0 font-mono-ui text-xs text-slate-400">{row.name}</span>
                                <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-900">
                                    <div
                                        className="h-full rounded-full bg-amber-400"
                                        style={{ width: `${(row.count / maxIndustryCount) * 100}%` }}
                                    />
                                </div>
                                <span className="w-6 shrink-0 text-right font-mono-ui text-xs text-slate-500">{row.count}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ------------------------------------------------------------ FEATURED SPOTLIGHT */}
            <section className="border-b border-slate-800/80 py-14">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="flex items-center gap-2">
                        <IoSparklesOutline className="h-4 w-4 text-amber-400" />
                        <h2 className="font-mono-ui text-xs uppercase tracking-widest text-slate-500">Spotlight</h2>
                    </div>
                    <div className="mt-6 flex flex-col gap-8 rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-8 sm:flex-row sm:items-center lg:p-12">
                        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-amber-400 font-display text-2xl font-semibold text-slate-950">
                            {FEATURED.name.charAt(0)}
                        </span>
                        <div className="flex-1">
                            <h3 className="font-display text-2xl font-semibold text-slate-50">{FEATURED.name}</h3>
                            <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-400">
                                {FEATURED.industry} team of {FEATURED.size}, founded {FEATURED.founded} — currently the most active employer on the board with {FEATURED.openRoles} roles open across {FEATURED.location}.
                            </p>
                        </div>
                        <Link
                            to={`/jobs?company=${encodeURIComponent(FEATURED.name)}`}
                            className="flex shrink-0 items-center gap-1.5 rounded-md bg-amber-400 px-5 py-2.5 font-mono-ui text-sm font-medium text-slate-950 transition-colors hover:bg-amber-300"
                        >
                            View open roles <IoArrowForward className="h-3.5 w-3.5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ------------------------------------------------------------ DIRECTORY */}
            <section className="py-14">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <h2 className="font-mono-ui text-xs uppercase tracking-widest text-slate-500">Directory</h2>
                            <p className="mt-2 font-display text-xl font-semibold text-slate-50">Every company on the board</p>
                        </div>
                        <div className="flex flex-col gap-3 sm:flex-row">
                            <div className="relative">
                                <IoSearchOutline className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search companies"
                                    className="w-full rounded-lg border border-slate-800 bg-slate-900 py-2.5 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-600 outline-none transition-colors focus:border-amber-400 focus:ring-1 focus:ring-amber-400 sm:w-56"
                                />
                            </div>
                            <select
                                value={industry}
                                onChange={(e) => setIndustry(e.target.value)}
                                className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-2.5 text-sm text-slate-100 outline-none transition-colors focus:border-amber-400 focus:ring-1 focus:ring-amber-400 sm:w-48"
                            >
                                {INDUSTRIES.map((i) => <option key={i} value={i}>{i}</option>)}
                            </select>
                        </div>
                    </div>

                    {filtered.length === 0 ? (
                        <div className="mt-10 flex flex-col items-center rounded-xl border border-dashed border-slate-800 py-20 text-center">
                            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-900">
                                <IoSearchOutline className="h-5 w-5 text-slate-500" />
                            </span>
                            <h3 className="mt-4 font-display text-base font-semibold text-slate-200">No companies match your search</h3>
                            <p className="mt-1.5 max-w-xs text-sm text-slate-500">Try a different name or clear the industry filter.</p>
                        </div>
                    ) : (
                        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {filtered.map((company) => (
                                <CompanyCard key={company.name} company={company} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* ------------------------------------------------------------ CULTURE QUOTE */}
            <section className="border-y border-slate-800/80 bg-slate-900/30 py-16">
                <div className="mx-auto max-w-2xl px-6 text-center lg:px-8">
                    <p className="font-display text-xl font-medium leading-relaxed text-slate-100 sm:text-2xl">
                        "The teams that hire well here aren't the biggest — they're the ones who post honestly about what the job actually is."
                    </p>
                    <p className="mt-4 font-mono-ui text-xs uppercase tracking-widest text-slate-500">Hiring lead, Basalt Robotics</p>
                </div>
            </section>

            {/* ------------------------------------------------------------ CTA */}
            <section className="py-20">
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