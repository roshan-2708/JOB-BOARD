import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom'
import { getJobById, updateJob } from '../connector/apiController';
import {
    IoBriefcaseOutline,
    IoLocationOutline,
    IoCashOutline,
    IoTimeOutline,
    IoPricetagOutline,
    IoBuildOutline,
} from 'react-icons/io5'

const JOB_TYPES = ['Full-time', 'Part-time', 'Contract', 'Internship'];
const CURRENCIES = ['INR', 'USD', 'EUR'];

const UpdateJob = () => {
    const { jobId } = useParams();
    const navigate = useNavigate();

    const [pageLoading, setPageLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        salary: '',
        currency: 'INR',
        requirements: '',
        type: 'Full-time',
        experience: '',
        tags: '',
        skills: '',
        startingDate: '',
        closingDate: '',
    });

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const response = await getJobById(jobId);
                console.log(jobId);
                console.log("Full Response:", response);
                
                if (response?.success) {
                    const jobData = response.data;
                    setFormData({
                        title: jobData?.title || '',
                        description: jobData?.description || '',
                        location: jobData?.location || '',
                        salary: jobData?.salary || '',
                        currency: jobData?.currency || 'INR',
                        requirements: jobData?.requirements || '',
                        type: jobData?.type || 'Full-time',
                        experience: jobData?.experience || '',
                        tags: jobData?.tags?.join(", ") || '',
                        skills: jobData?.skills?.join(", ") || '',
                        startingDate: jobData?.startingDate ? jobData.startingDate.split('T')[0] : '',
                        closingDate: jobData?.closingDate ? jobData.closingDate.split('T')[0] : '',
                    });
                }
            } catch (error) {
                console.error("Error in fetching job details :", error);
                toast.error("Failed to fetch job details");
            } finally {
                setPageLoading(false);
            }
        }
        if (jobId) fetchSingleJob();
    }, [jobId]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            setSaving(true);
            const formattedData = {
                ...formData,
                tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ""),
                skills: formData.skills.split(',').map(skill => skill.trim()).filter(skill => skill !== "")
            };

            const response = await updateJob(jobId, formattedData);

            if (response?.success) {
                toast.success(response.message || "Job updated successfully");
                navigate("/dashboard/");
            }
        } catch (error) {
            console.error("Error in update job", error);
            toast.error(error.response?.data?.message || "Failed to update job");
        } finally {
            setSaving(false);
        }
    }

    const inputClass =
        "w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2.5 font-body text-sm text-slate-100 placeholder-slate-600 outline-none transition-colors focus:border-amber-400 focus:ring-1 focus:ring-amber-400";
    const labelClass = "mb-1.5 block text-left text-xs font-medium uppercase tracking-wide text-slate-500";

    if (pageLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-950 font-body text-slate-400">
                <style>{`
                    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500;600;700&display=swap');
                `}</style>
                Loading job details...
            </div>
        );
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
                <div className="mb-8 text-center">
                    <span className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-amber-400/10">
                        <IoBriefcaseOutline className="h-5 w-5 text-amber-400" />
                    </span>
                    <span className="font-mono-ui text-xs uppercase tracking-widest text-amber-400">Edit listing</span>
                    <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-slate-50">
                        Update job
                    </h1>
                    <p className="mt-2 text-sm text-slate-500">
                        Make your changes below — they'll go live on the board as soon as you save.
                    </p>
                </div>

                <form
                    onSubmit={handleUpdate}
                    className="space-y-6 rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8"
                >
                    {/* Title */}
                    <div>
                        <label htmlFor="title" className={labelClass}>Job title</label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            placeholder="Frontend Developer"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className={inputClass}
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="description" className={labelClass}>Description</label>
                        <textarea
                            name="description"
                            id="description"
                            rows={5}
                            value={formData.description}
                            onChange={handleChange}
                            required
                            placeholder="What will this role actually do day to day?"
                            className={`${inputClass} resize-none`}
                        />
                    </div>

                    {/* Location + Experience */}
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label htmlFor="location" className={labelClass}>Location</label>
                            <div className="relative">
                                <IoLocationOutline className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                                <input
                                    type="text"
                                    name="location"
                                    id="location"
                                    placeholder="Delhi, or 'Remote'"
                                    value={formData.location}
                                    onChange={handleChange}
                                    required
                                    className={`${inputClass} pl-10`}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="experience" className={labelClass}>Experience</label>
                            <div className="relative">
                                <IoTimeOutline className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                                <input
                                    type="text"
                                    name="experience"
                                    id="experience"
                                    placeholder="2-3 years"
                                    value={formData.experience}
                                    onChange={handleChange}
                                    required
                                    className={`${inputClass} pl-10`}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Salary + Currency + Type */}
                    <div className="grid gap-4 sm:grid-cols-3">
                        <div className="sm:col-span-1">
                            <label htmlFor="salary" className={labelClass}>Salary</label>
                            <div className="relative">
                                <IoCashOutline className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                                <input
                                    type="text"
                                    name="salary"
                                    id="salary"
                                    placeholder="50000"
                                    value={formData.salary}
                                    onChange={handleChange}
                                    required
                                    className={`${inputClass} pl-10`}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="currency" className={labelClass}>Currency</label>
                            <select
                                name="currency"
                                id="currency"
                                value={formData.currency}
                                onChange={handleChange}
                                className={inputClass}
                            >
                                {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="type" className={labelClass}>Job type</label>
                            <select
                                name="type"
                                id="type"
                                value={formData.type}
                                onChange={handleChange}
                                className={inputClass}
                            >
                                {JOB_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* Requirements */}
                    <div>
                        <label htmlFor="requirements" className={labelClass}>Requirements</label>
                        <textarea
                            name="requirements"
                            id="requirements"
                            rows={3}
                            value={formData.requirements}
                            onChange={handleChange}
                            placeholder="Anything a candidate must have to be considered"
                            className={`${inputClass} resize-none`}
                        />
                    </div>

                    {/* Tags + Skills */}
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label htmlFor="tags" className={labelClass}>Tags</label>
                            <div className="relative">
                                <IoPricetagOutline className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                                <input
                                    type="text"
                                    name="tags"
                                    id="tags"
                                    placeholder="React, Node, Express"
                                    value={formData.tags}
                                    onChange={handleChange}
                                    required
                                    className={`${inputClass} pl-10`}
                                />
                            </div>
                            <p className="mt-1 text-xs text-slate-600">Comma-separated.</p>
                        </div>

                        <div>
                            <label htmlFor="skills" className={labelClass}>Skills</label>
                            <div className="relative">
                                <IoBuildOutline className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                                <input
                                    type="text"
                                    name="skills"
                                    id="skills"
                                    placeholder="React, Node, Express"
                                    value={formData.skills}
                                    onChange={handleChange}
                                    required
                                    className={`${inputClass} pl-10`}
                                />
                            </div>
                            <p className="mt-1 text-xs text-slate-600">Comma-separated.</p>
                        </div>
                    </div>

                    {/* Dates */}
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label htmlFor="startingDate" className={labelClass}>Starting date</label>
                            <input
                                type="date"
                                name="startingDate"
                                id="startingDate"
                                value={formData.startingDate}
                                onChange={handleChange}
                                required
                                className={inputClass}
                            />
                        </div>
                        <div>
                            <label htmlFor="closingDate" className={labelClass}>Closing date</label>
                            <input
                                type="date"
                                name="closingDate"
                                id="closingDate"
                                value={formData.closingDate}
                                onChange={handleChange}
                                required
                                className={inputClass}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={saving}
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-amber-400 py-3 font-mono-ui text-sm font-semibold text-slate-950 transition-colors hover:bg-amber-300 disabled:cursor-not-allowed disabled:bg-amber-400/50"
                    >
                        {saving ? 'Saving...' : 'Save changes'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default UpdateJob;