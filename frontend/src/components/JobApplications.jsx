import React, { useState, useEffect, useMemo, useCallback } from 'react'
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom'
import { getJobApplication, updateApplicationStatus } from '../connector/apiController';
import {
    IoDocumentTextOutline,
    IoMailOutline,
    IoOpenOutline,
    IoCheckmarkCircleOutline,
    IoCloseCircleOutline,
    IoHourglassOutline,
    IoPeopleOutline,
    IoSearchOutline,
    IoRefreshOutline,
    IoAlertCircleOutline,
} from 'react-icons/io5'

const STATUS_STYLES = {
    pending: { label: 'Pending', className: 'bg-amber-400/10 text-amber-400', Icon: IoHourglassOutline },
    reviewed: { label: 'Reviewed', className: 'bg-blue-400/10 text-blue-400', Icon: IoCheckmarkCircleOutline },
    shortlisted: { label: 'Shortlisted', className: 'bg-orange-400/10 text-orange-400', Icon: IoCheckmarkCircleOutline },
    accepted: { label: 'Accepted', className: 'bg-emerald-400/10 text-emerald-400', Icon: IoCheckmarkCircleOutline },
    hired: { label: 'Hired', className: 'bg-emerald-400/10 text-emerald-400', Icon: IoCheckmarkCircleOutline },
    rejected: { label: 'Rejected', className: 'bg-rose-400/10 text-rose-400', Icon: IoCloseCircleOutline },
}

const STATUS_FILTERS = ['all', 'pending', 'shortlisted', 'accepted', 'rejected']

const formatDate = (value) => {
    if (!value) return null
    const d = new Date(value)
    if (Number.isNaN(d.getTime())) return null
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
}

const StatusBadge = ({ status }) => {
    const style = STATUS_STYLES[status?.toLowerCase()] || STATUS_STYLES.pending
    const { className, Icon } = style
    return (
        <span className={`flex items-center gap-1 rounded px-2 py-1 font-mono-ui text-[11px] font-medium ${className}`}>
            <Icon className="h-3.5 w-3.5" aria-hidden="true" />
            {style.label}
        </span>
    )
}

const SkeletonRow = () => (
    <div className="animate-pulse rounded-xl border border-slate-800 bg-slate-900/40 p-5">
        <div className="h-4 w-1/3 rounded bg-slate-800" />
        <div className="mt-3 h-3 w-1/4 rounded bg-slate-800" />
    </div>
)

const JobApplications = () => {
    const { jobId } = useParams();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(null);
    const [updatingId, setUpdatingId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const fetchJobApplication = useCallback(async () => {
        setLoading(true);
        setLoadError(null);
        try {
            const response = await getJobApplication(jobId);
            const applicationsArray = response?.data?.data || response?.data || response || [];
            setApplications(Array.isArray(applicationsArray) ? applicationsArray : []);
        } catch (error) {
            console.error(error);
            const message = error.response?.data?.message || "Failed to fetch job applications";
            setLoadError(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    }, [jobId]);

    useEffect(() => {
        if (jobId) {
            fetchJobApplication();
        }
    }, [jobId, fetchJobApplication]);

    const handleViewResume = (resumeUrl) => {
        if (!resumeUrl) {
            toast.error("Resume not available");
            return;
        }
        const googleViewUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(resumeUrl)}&embedded=true`;
        window.open(googleViewUrl, "_blank", "noopener,noreferrer");
    }

    const handleUpdateStatus = async (applicationId, newStatus) => {
        if (updatingId) return; // avoid overlapping updates
        const previous = applications;
        setUpdatingId(applicationId);
        // optimistic update
        setApplications((prev) =>
            prev.map((app) => (app._id === applicationId ? { ...app, status: newStatus } : app))
        );
        try {
            const response = await updateApplicationStatus(applicationId, newStatus);
            toast.success(response?.data?.message || "Status updated successfully!");
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to update status");
            setApplications(previous); // roll back on failure
        } finally {
            setUpdatingId(null);
        }
    };

    const filteredApplications = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();
        return applications.filter((app) => {
            const matchesStatus =
                statusFilter === 'all' || (app.status || 'pending').toLowerCase() === statusFilter;
            if (!matchesStatus) return false;
            if (!term) return true;
            const name = app.candidate?.name?.toLowerCase() || '';
            const email = app.candidate?.email?.toLowerCase() || '';
            return name.includes(term) || email.includes(term);
        });
    }, [applications, searchTerm, statusFilter]);

    return (
        <div className="min-h-screen bg-slate-950 py-12 font-body text-slate-200">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500;600;700&display=swap');
                .font-display { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; }
                .font-mono-ui { font-family: 'IBM Plex Mono', ui-monospace, monospace; }
                .font-body { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
                .focus-ring:focus-visible { outline: 2px solid rgb(251 191 36); outline-offset: 2px; }
                @media (prefers-reduced-motion: reduce) {
                    .animate-pulse { animation: none; }
                }
            `}</style>

            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <span className="font-mono-ui text-xs uppercase tracking-widest text-amber-400">Applicants</span>
                        <h1 className="mt-2 font-display text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
                            Applications for this job
                        </h1>
                        {!loading && !loadError && (
                            <p className="mt-1.5 font-mono-ui text-xs text-slate-500">
                                {applications.length} {applications.length === 1 ? 'application' : 'applications'} received
                            </p>
                        )}
                    </div>
                </div>

                {!loading && !loadError && applications.length > 0 && (
                    <div className="mb-6 flex flex-wrap items-center gap-3">
                        <div className="relative flex-1 min-w-[200px]">
                            <IoSearchOutline className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" aria-hidden="true" />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search by name or email"
                                aria-label="Search applicants by name or email"
                                className="focus-ring w-full rounded-md border border-slate-800 bg-slate-900/40 py-2 pl-9 pr-3 font-body text-sm text-slate-200 placeholder:text-slate-500"
                            />
                        </div>
                        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by status">
                            {STATUS_FILTERS.map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setStatusFilter(status)}
                                    aria-pressed={statusFilter === status}
                                    className={`focus-ring rounded-md px-2.5 py-1.5 font-mono-ui text-xs font-medium capitalize transition-colors ${statusFilter === status
                                            ? 'bg-amber-400 text-slate-950'
                                            : 'bg-slate-900/40 text-slate-400 hover:text-slate-200'
                                        }`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {loading ? (
                    <div className="space-y-3">
                        <SkeletonRow />
                        <SkeletonRow />
                        <SkeletonRow />
                    </div>
                ) : loadError ? (
                    <div className="flex flex-col items-center rounded-xl border border-dashed border-rose-900/60 py-16 text-center">
                        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-rose-500/10">
                            <IoAlertCircleOutline className="h-5 w-5 text-rose-400" aria-hidden="true" />
                        </span>
                        <h3 className="mt-4 font-display text-base font-semibold text-slate-200">Couldn't load applications</h3>
                        <p className="mt-1.5 max-w-xs text-sm text-slate-500">{loadError}</p>
                        <button
                            onClick={fetchJobApplication}
                            className="focus-ring mt-5 flex items-center gap-1.5 rounded-md bg-amber-400 px-3 py-2 font-mono-ui text-xs font-medium text-slate-950 transition-colors hover:bg-amber-300"
                        >
                            <IoRefreshOutline className="h-3.5 w-3.5" aria-hidden="true" />
                            Try again
                        </button>
                    </div>
                ) : applications.length === 0 ? (
                    <div className="flex flex-col items-center rounded-xl border border-dashed border-slate-800 py-16 text-center">
                        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-900">
                            <IoPeopleOutline className="h-5 w-5 text-slate-500" aria-hidden="true" />
                        </span>
                        <h3 className="mt-4 font-display text-base font-semibold text-slate-200">No applications received yet</h3>
                        <p className="mt-1.5 max-w-xs text-sm text-slate-500">
                            Once candidates apply to this role, they'll show up here.
                        </p>
                    </div>
                ) : filteredApplications.length === 0 ? (
                    <div className="flex flex-col items-center rounded-xl border border-dashed border-slate-800 py-16 text-center">
                        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-900">
                            <IoSearchOutline className="h-5 w-5 text-slate-500" aria-hidden="true" />
                        </span>
                        <h3 className="mt-4 font-display text-base font-semibold text-slate-200">No matches</h3>
                        <p className="mt-1.5 max-w-xs text-sm text-slate-500">
                            Try a different search term or clear the status filter.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {filteredApplications.map((app) => {
                            const initial = (app.candidate?.name || app.candidate?.email || 'U').charAt(0).toUpperCase();
                            const isUpdating = updatingId === app._id;
                            const appliedDate = formatDate(app.createdAt);
                            const currentStatus = (app.status || 'pending').toLowerCase();
                            return (
                                <div
                                    key={app._id}
                                    className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-900/40 p-5 transition-colors hover:border-slate-700"
                                >
                                    <div className="flex items-center gap-3">
                                        <span
                                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-400 font-mono-ui text-sm font-semibold text-slate-950"
                                            aria-hidden="true"
                                        >
                                            {initial}
                                        </span>
                                        <div className="min-w-0">
                                            <p className="truncate font-display text-sm font-semibold text-slate-50">
                                                {app.candidate?.name || 'Unnamed candidate'}
                                            </p>
                                            <p className="mt-0.5 flex items-center gap-1.5 truncate font-mono-ui text-xs text-slate-500">
                                                <IoMailOutline className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                                                {app.candidate?.email || '—'}
                                            </p>
                                            {appliedDate && (
                                                <p className="mt-0.5 font-mono-ui text-[11px] text-slate-600">
                                                    Applied {appliedDate}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <StatusBadge status={app.status} />
                                        <button
                                            onClick={() => handleViewResume(app.resumeUrl)}
                                            disabled={!app.resumeUrl}
                                            aria-label={`View resume for ${app.candidate?.name || 'candidate'}`}
                                            className="focus-ring flex items-center gap-1.5 rounded-md bg-amber-400 px-3 py-2 font-mono-ui text-xs font-medium text-slate-950 transition-colors hover:bg-amber-300 disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-slate-500"
                                        >
                                            <IoDocumentTextOutline className="h-3.5 w-3.5" aria-hidden="true" />
                                            Resume
                                            <IoOpenOutline className="h-3.5 w-3.5" aria-hidden="true" />
                                        </button>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-2">
                                        {currentStatus !== 'accepted' && (
                                            <button
                                                onClick={() => handleUpdateStatus(app._id, 'accepted')}
                                                disabled={isUpdating}
                                                aria-label={`Accept ${app.candidate?.name || 'candidate'}`}
                                                className="focus-ring rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 font-mono-ui text-xs font-medium text-emerald-400 transition-colors hover:bg-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                {isUpdating ? '…' : 'Accept'}
                                            </button>
                                        )}
                                        {currentStatus !== 'shortlisted' && (
                                            <button
                                                onClick={() => handleUpdateStatus(app._id, 'shortlisted')}
                                                disabled={isUpdating}
                                                aria-label={`Shortlist ${app.candidate?.name || 'candidate'}`}
                                                className="focus-ring rounded-md border border-orange-500/30 bg-orange-500/10 px-3 py-1.5 font-mono-ui text-xs font-medium text-orange-400 transition-colors hover:bg-orange-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                {isUpdating ? '…' : 'Shortlist'}
                                            </button>
                                        )}
                                        {currentStatus !== 'rejected' && (
                                            <button
                                                onClick={() => {
                                                    if (window.confirm(`Reject ${app.candidate?.name || 'this candidate'}?`)) {
                                                        handleUpdateStatus(app._id, 'rejected');
                                                    }
                                                }}
                                                disabled={isUpdating}
                                                aria-label={`Reject ${app.candidate?.name || 'candidate'}`}
                                                className="focus-ring rounded-md border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 font-mono-ui text-xs font-medium text-rose-400 transition-colors hover:bg-rose-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                {isUpdating ? '…' : 'Reject'}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}

export default JobApplications;