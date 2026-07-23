import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import { getAllJobs } from '../connector/apiController';
import {
    IoBriefcaseOutline,
    IoLocationOutline,
    IoCashOutline,
    IoTimeOutline,
    IoSearchOutline,
    IoGridOutline,
} from 'react-icons/io5'

const CATEGORY_ALL = 'All';

const FindJobs = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [jobs, setJobs] = useState([]);
    const [activeCategory, setActiveCategory] = useState(CATEGORY_ALL);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setLoading(true);
        const fetchJobs = async () => {
            try {
                const response = await getAllJobs();
                if (response.success) {
                    setJobs(response.data || []);
                } else {
                    toast.error(response.message);
                }
            } catch (error) {
                console.error("Error in get all jobs", error);
                toast.error("Failed to load all jobs");
            } finally {
                setLoading(false);
            }
        }
        fetchJobs();
    }, []);

    const categories = useMemo(() => {
        const unique = Array.from(new Set(jobs.map((job) => job.type).filter(Boolean)));
        return [CATEGORY_ALL, ...unique];
    }, [jobs]);

    const filteredJobs = useMemo(() => {
        return jobs.filter((job) => {
            const matchesCategory = activeCategory === CATEGORY_ALL || job.type === activeCategory;
            const term = searchTerm.trim().toLowerCase();
            const matchesSearch =
                term === '' ||
                job.title?.toLowerCase().includes(term) ||
                job.location?.toLowerCase().includes(term) ||
                job.skills?.some((skill) => skill.toLowerCase().includes(term)) ||
                job.tags?.some((tag) => tag.toLowerCase().includes(term));
            return matchesCategory && matchesSearch;
        });
    }, [jobs, activeCategory, searchTerm]);

    const inputClass =
        "w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2.5 font-body text-sm text-slate-100 placeholder-slate-600 outline-none transition-colors focus:border-amber-400 focus:ring-1 focus:ring-amber-400";

    return (
        <div className="min-h-screen bg-slate-950 py-12 font-body text-slate-200">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500;600;700&display=swap');
                .font-display { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; }
                .font-mono-ui { font-family: 'IBM Plex Mono', ui-monospace, monospace; }
                .font-body { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
            `}</style>

            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8 text-center">
                    <span className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-amber-400/10">
                        <IoGridOutline className="h-5 w-5 text-amber-400" />
                    </span>
                    <span className="font-mono-ui text-xs uppercase tracking-widest text-amber-400">Browse by category</span>
                    <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-slate-50">
                        Find your next role
                    </h1>
                    <p className="mt-2 text-sm text-slate-500">
                        Filter by job type or search across every open listing on the board.
                    </p>
                </div>

                {/* Search */}
                <div className="relative mb-6">
                    <IoSearchOutline className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                    <input
                        type="text"
                        placeholder="Search by title, location, or skill"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={`${inputClass} pl-10`}
                    />
                </div>

                {/* Category chips */}
                <div className="mb-8 flex flex-wrap gap-2">
                    {categories.map((category) => {
                        const isActive = category === activeCategory;
                        return (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`rounded-full border px-4 py-1.5 font-mono-ui text-xs font-medium uppercase tracking-wide transition-colors ${isActive
                                        ? 'border-amber-400 bg-amber-400 text-slate-950'
                                        : 'border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                                    }`}
                            >
                                {category}
                            </button>
                        );
                    })}
                </div>

                {/* Results count */}
                {!loading && (
                    <p className="mb-4 font-mono-ui text-xs uppercase tracking-wide text-slate-600">
                        {filteredJobs.length} {filteredJobs.length === 1 ? 'listing' : 'listings'}
                    </p>
                )}

                {/* Job grid */}
                {loading ? (
                    <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-10 text-center text-sm text-slate-500">
                        Loading jobs...
                    </div>
                ) : filteredJobs.length === 0 ? (
                    <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-10 text-center">
                        <IoBriefcaseOutline className="mx-auto mb-3 h-6 w-6 text-slate-600" />
                        <p className="text-sm text-slate-500">No jobs match your filters. Try a different category or search term.</p>
                    </div>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2">
                        {filteredJobs.map((job) => (
                            <div
                                key={job._id}
                                onClick={() => navigate(`/job/${job._id}`)}
                                className="group flex cursor-pointer flex-col gap-3 rounded-xl border border-slate-800 bg-slate-900/40 p-5 transition-colors hover:border-amber-400/40"
                            >
                                <div className="flex items-start justify-between gap-2">
                                    <p className="font-display text-base font-semibold text-slate-50">
                                        {job.title}
                                    </p>
                                    <span className="shrink-0 rounded-full border border-slate-700 bg-slate-800 px-2.5 py-1 font-mono-ui text-[10px] font-medium uppercase tracking-wide text-slate-400">
                                        {job.type}
                                    </span>
                                </div>

                                <p className="line-clamp-2 text-sm text-slate-400">
                                    {job.description}
                                </p>

                                <div className="flex flex-wrap items-center gap-4 font-mono-ui text-xs text-slate-500">
                                    <p className="flex items-center gap-1.5">
                                        <IoLocationOutline className="h-3.5 w-3.5 text-amber-400/70" />
                                        {job.location}
                                    </p>
                                    <p className="flex items-center gap-1.5">
                                        <IoCashOutline className="h-3.5 w-3.5 text-amber-400/70" />
                                        {job.currency} {job.salary}
                                    </p>
                                    {job.experience && (
                                        <p className="flex items-center gap-1.5">
                                            <IoTimeOutline className="h-3.5 w-3.5 text-amber-400/70" />
                                            {job.experience}
                                        </p>
                                    )}
                                </div>

                                {job.skills?.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5">
                                        {job.skills.slice(0, 4).map((skill) => (
                                            <span
                                                key={skill}
                                                className="rounded-md bg-slate-800 px-2 py-1 text-[11px] text-slate-400"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {job.employer?.name && (
                                    <p className="border-t border-slate-800 pt-3 text-xs text-slate-600">
                                        Posted by {job.employer.name}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default FindJobs