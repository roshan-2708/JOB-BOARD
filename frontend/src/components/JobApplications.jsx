import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom'
import { getJobApplication } from '../connector/apiController';
import {
  IoDocumentTextOutline,
  IoMailOutline,
  IoOpenOutline,
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
  IoHourglassOutline,
  IoPeopleOutline,
} from 'react-icons/io5'

const STATUS_STYLES = {
  pending: { label: 'Pending', className: 'bg-amber-400/10 text-amber-400', Icon: IoHourglassOutline },
  accepted: { label: 'Accepted', className: 'bg-emerald-400/10 text-emerald-400', Icon: IoCheckmarkCircleOutline },
  hired: { label: 'Hired', className: 'bg-emerald-400/10 text-emerald-400', Icon: IoCheckmarkCircleOutline },
  rejected: { label: 'Rejected', className: 'bg-rose-400/10 text-rose-400', Icon: IoCloseCircleOutline },
}

const StatusBadge = ({ status }) => {
  const style = STATUS_STYLES[status?.toLowerCase()] || STATUS_STYLES.pending
  const { className, Icon } = style
  return (
    <span className={`flex items-center gap-1 rounded px-2 py-1 font-mono-ui text-[11px] font-medium ${className}`}>
      <Icon className="h-3.5 w-3.5" />
      {status || 'Pending'}
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

    useEffect(() => {
        const fetchJobApplication = async () => {
            try {
                const response = await getJobApplication(jobId);

                const applicationsArray = response?.data?.data || response?.data || response || [];
                setApplications(applicationsArray);

            } catch (error) {
                console.error(error);
                toast.error(error.response?.data?.message || "Failed to fetch job applications");
            } finally {
                setLoading(false);
            }
        }

        if (jobId) {
            fetchJobApplication();
        }
    }, [jobId]);

        const handleViewResume = (resumeUrl) => {
            if (!resumeUrl) {
                toast.error("Resume not available");
                return;
            }
            const googleViewUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(resumeUrl)}&embedded=true`;
            window.open(googleViewUrl, "_blank");
        }

    return (
        <div className="min-h-screen bg-slate-950 py-12 font-body text-slate-200">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500;600;700&display=swap');
                .font-display { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; }
                .font-mono-ui { font-family: 'IBM Plex Mono', ui-monospace, monospace; }
                .font-body { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
            `}</style>

            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <span className="font-mono-ui text-xs uppercase tracking-widest text-amber-400">Applicants</span>
                    <h1 className="mt-2 font-display text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
                        Applications for this job
                    </h1>
                </div>

                {loading ? (
                    <div className="space-y-3">
                        <SkeletonRow />
                        <SkeletonRow />
                        <SkeletonRow />
                    </div>
                ) : (!applications || applications.length === 0) ? (
                    <div className="flex flex-col items-center rounded-xl border border-dashed border-slate-800 py-16 text-center">
                        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-900">
                            <IoPeopleOutline className="h-5 w-5 text-slate-500" />
                        </span>
                        <h3 className="mt-4 font-display text-base font-semibold text-slate-200">No applications received yet</h3>
                        <p className="mt-1.5 max-w-xs text-sm text-slate-500">
                            Once candidates apply to this role, they'll show up here.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {applications.map((app) => {
                            const initial = (app.candidate?.name || app.candidate?.email || 'U').charAt(0).toUpperCase();
                            return (
                                <div
                                    key={app._id}
                                    className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-900/40 p-5 transition-colors hover:border-slate-700"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-400 font-mono-ui text-sm font-semibold text-slate-950">
                                            {initial}
                                        </span>
                                        <div className="min-w-0">
                                            <p className="truncate font-display text-sm font-semibold text-slate-50">
                                                {app.candidate?.name || 'Unnamed candidate'}
                                            </p>
                                            <p className="mt-0.5 flex items-center gap-1.5 truncate font-mono-ui text-xs text-slate-500">
                                                <IoMailOutline className="h-3.5 w-3.5 shrink-0" />
                                                {app.candidate?.email || '—'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <StatusBadge status={app.status} />
                                        <button
                                            onClick={() => handleViewResume(app.resumeUrl)}
                                            className="flex items-center gap-1.5 rounded-md bg-amber-400 px-3 py-2 font-mono-ui text-xs font-medium text-slate-950 transition-colors hover:bg-amber-300"
                                        >
                                            <IoDocumentTextOutline className="h-3.5 w-3.5" />
                                            Resume
                                            <IoOpenOutline className="h-3.5 w-3.5" />
                                        </button>
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