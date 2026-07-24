import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { applyForJob } from '../connector/apiController';

const ApplicationModal = ({ isOpen, onClose, jobId: propJobId }) => {
    const { jobId: paramJobId, id: paramId } = useParams(); 
    const activeJobId = propJobId || paramJobId || paramId;
    const navigate = useNavigate();
    
    const [loading, setLoading] = useState(false);
    const [resume, setResume] = useState(null);

    if (!isOpen) return null;

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        
        if (file && (file.type === "application/pdf" || file.type.includes("word") || file.name.endsWith('.pdf') || file.name.endsWith('.doc') || file.name.endsWith('.docx'))) {
            setResume(file);
        } else {
            toast.error("Please upload a valid PDF or Word document.");
            e.target.value = null;
            setResume(null);
        }
    };

    const handleClose = () => {
        setResume(null);
        onClose();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!activeJobId) {
            toast.error("Job ID is missing.");
            return;
        }

        if (!resume) {
            toast.error("Please select a resume file first.");
            return;
        }

        try {
            setLoading(true);

            const formData = new FormData();
            formData.append("resume", resume);
            
            const response = await applyForJob(activeJobId, formData);
            
            if (response?.success) {
                toast.success(response.message || "Application submitted successfully!");
                setResume(null);
                onClose();
            } else {
                toast.error(response?.message || "Failed to apply for this job.");
            }
            
        } catch (error) {
            console.error("Application Submission Error:", error);
            const errorMsg = error.response?.data?.message || error.message || "Failed to apply for this job.";
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            
            <div className="relative w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
                
                <button 
                    onClick={handleClose}
                    className="absolute right-4 top-4 text-slate-400 hover:text-white"
                >
                    ✕
                </button>

                <h2 className="mb-2 text-2xl font-bold text-slate-50">Apply for Job</h2>
                <p className="mb-6 text-sm text-slate-400">
                    Please upload your latest resume to complete your application.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    
                    {/* File Upload Box */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-slate-300">
                            Upload Resume (PDF, DOCX) <span className="text-red-500">*</span>
                        </label>
                        <div className="flex w-full items-center justify-center rounded-xl border-2 border-dashed border-slate-700 bg-slate-800/50 p-6 transition-colors hover:border-blue-500/50">
                            <input 
                                type="file" 
                                accept=".pdf,.doc,.docx"
                                onChange={handleFileChange}
                                className="w-full text-sm text-slate-400 file:mr-4 file:rounded-full file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-blue-700 cursor-pointer"
                            />
                        </div>
                        {resume && (
                            <p className="mt-1 text-sm text-emerald-400">
                                ✓ Selected: {resume.name}
                            </p>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-4 flex items-center justify-end gap-3">
                        <button 
                            type="button" 
                            onClick={handleClose}
                            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            disabled={loading || !resume}
                            className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Submitting..." : "Submit Application"}
                        </button>
                    </div>
                    
                </form>
            </div>
        </div>
    );
};

export default ApplicationModal;