import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getJobById } from '../connector/apiController';
import { AuthContext } from '../context/AuthContext';
import ApplicationModal from '../components/ApllicationModal';
import {
    IoArrowBackOutline,
    IoLocationOutline,
    IoCashOutline,
    IoTimeOutline,
    IoBriefcaseOutline,
    IoCalendarOutline,
} from 'react-icons/io5'

const JobDetails = () => {
    const [loading, setLoading] = useState(true);
    const [jobDetails, setJobDetails] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useContext(AuthContext);
    const { jobId, id } = useParams();
    const targetId = jobId || id;
    const navigate = useNavigate();

    const handleApplyClick = () => {
        if (!user) {
            toast.error("Please log in to apply for this job.");
            return;
        }
        if (user.role && user.role !== 'candidate') {
            toast.error("Only candidates can apply for jobs.");
            return;
        }
        setIsModalOpen(true);
    };

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const response = await getJobById(targetId);
                if (response?.success) {
                    const jobData = response.data;
                    setJobDetails({
                        title: jobData?.title || '',
                        description: jobData?.description || '',
                        location: jobData?.location || '',
                        salary: jobData?.salary || '',
                        currency: jobData?.currency || 'INR',
                        requirements: jobData?.requirements || '',
                        type: jobData?.type || 'Full-time',
                        experience: jobData?.experience || '',
                        tags: jobData?.tags || [],
                        skills: jobData?.skills || [],
                        startingDate: jobData?.startingDate ? String(jobData.startingDate).split('T')[0] : '',
                        closingDate: jobData?.closingDate ? String(jobData.closingDate).split('T')[0] : '',
                    });
                }
            } catch (error) {
                console.error("Error in fetching job details :", error);
                toast.error("Failed to fetch job details");
            } finally {
                setLoading(false);
            }
        };
        if (targetId) {
            fetchSingleJob();
        } else {
            setLoading(false);
        }
    }, [targetId]);

    const fontStyles = (
        <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500;600;700&display=swap');
            .font-display { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; }
            .font-mono-ui { font-family: 'IBM Plex Mono', ui-monospace, monospace; }
            .font-body { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
        `}</style>
    );

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-950 font-body text-sm text-slate-500">
                {fontStyles}
                Loading job details...
            </div>
        );
    }

    if (!jobDetails) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-950 font-body text-sm text-slate-500">
                {fontStyles}
                Job not found.
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 py-12 font-body text-slate-200">
            {fontStyles}

            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                {/* Back button */}
                <button
                    onClick={() => navigate(-1)}
                    className="mb-6 flex items-center gap-1.5 font-mono-ui text-xs uppercase tracking-wide text-slate-500 transition-colors hover:text-amber-400"
                >
                    <IoArrowBackOutline className="h-3.5 w-3.5" />
                    Back to jobs
                </button>

                <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8">
                    {/* Header */}
                    <div className="border-b border-slate-800 pb-8">
                        <span className="font-mono-ui text-xs uppercase tracking-widest text-amber-400">
                            {jobDetails.type}
                        </span>
                        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-slate-50">
                            {jobDetails.title}
                        </h1>
                        <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-500">
                            <IoLocationOutline className="h-4 w-4 text-amber-400/70" />
                            {jobDetails.location}
                        </p>

                        <div className="mt-5 flex flex-wrap gap-4 font-mono-ui text-xs text-slate-500">
                            <p className="flex items-center gap-1.5">
                                <IoCashOutline className="h-3.5 w-3.5 text-amber-400/70" />
                                {jobDetails.currency === 'INR' ? '₹' : jobDetails.currency} {jobDetails.salary}
                            </p>
                            <p className="flex items-center gap-1.5">
                                <IoTimeOutline className="h-3.5 w-3.5 text-amber-400/70" />
                                {jobDetails.experience}
                            </p>
                            <p className="flex items-center gap-1.5">
                                <IoBriefcaseOutline className="h-3.5 w-3.5 text-amber-400/70" />
                                {jobDetails.type}
                            </p>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mt-8">
                        <p className="font-mono-ui text-xs font-medium uppercase tracking-wide text-slate-500">Description</p>
                        <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-slate-300">
                            {jobDetails.description}
                        </p>
                    </div>

                    {/* Requirements */}
                    <div className="mt-8">
                        <p className="font-mono-ui text-xs font-medium uppercase tracking-wide text-slate-500">Requirements</p>
                        <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-slate-300">
                            {jobDetails.requirements}
                        </p>
                    </div>

                    {/* Skills */}
                    {jobDetails.skills.length > 0 && (
                        <div className="mt-8">
                            <p className="font-mono-ui text-xs font-medium uppercase tracking-wide text-slate-500">Skills required</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                {jobDetails.skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="rounded-md bg-slate-800 px-3 py-1.5 text-xs text-slate-300"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Tags */}
                    {jobDetails.tags.length > 0 && (
                        <div className="mt-6">
                            <p className="font-mono-ui text-xs font-medium uppercase tracking-wide text-slate-500">Tags</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                {jobDetails.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-400"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Dates */}
                    <div className="mt-10 flex flex-col gap-4 rounded-xl border border-slate-800 bg-slate-900/60 p-5 sm:flex-row sm:justify-between">
                        <div className="flex items-center gap-2.5">
                            <IoCalendarOutline className="h-4 w-4 text-amber-400/70" />
                            <div>
                                <p className="font-mono-ui text-[11px] uppercase tracking-wide text-slate-500">Starting date</p>
                                <p className="mt-0.5 text-sm font-medium text-slate-200">{jobDetails.startingDate}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2.5">
                            <IoCalendarOutline className="h-4 w-4 text-amber-400/70" />
                            <div>
                                <p className="font-mono-ui text-[11px] uppercase tracking-wide text-slate-500">Closing date</p>
                                <p className="mt-0.5 text-sm font-medium text-slate-200">{jobDetails.closingDate}</p>
                            </div>
                        </div>
                    </div>

                    {/* Apply button */}
                    <div className="mt-10">
                        <button 
                            onClick={handleApplyClick}
                            className="w-full rounded-lg bg-amber-400 py-3.5 font-mono-ui text-sm font-semibold text-slate-950 transition-colors hover:bg-amber-300 focus:outline-none focus:ring-1 focus:ring-amber-400 sm:w-auto sm:px-8"
                        >
                            Apply now
                        </button>
                    </div>
                </div>
            </div>

            {/* Application Modal */}
            <ApplicationModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                jobId={targetId}
            />
        </div>
    );
};

export default JobDetails;