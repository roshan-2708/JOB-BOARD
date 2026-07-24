import React, { useEffect, useState } from 'react';
import { useSearchParams, useParams, useNavigate, Link } from 'react-router-dom';
import { verifyEmailApi } from '../connector/apiController';
import { toast } from 'react-hot-toast';
import { IoCheckmarkCircleOutline, IoAlertCircleOutline, IoMailUnreadOutline, IoArrowForwardOutline, IoHomeOutline } from 'react-icons/io5';

const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
    const { token: paramToken } = useParams();
    const navigate = useNavigate();

    const token = paramToken || searchParams.get('token');

    const [status, setStatus] = useState('loading'); // 'loading' | 'success' | 'error'
    const [message, setMessage] = useState('Verifying your email address...');

    useEffect(() => {
        if (!token) {
            setStatus('error');
            setMessage('Verification token is missing or invalid. Please check your email link.');
            return;
        }

        let isMounted = true;

        const verifyToken = async () => {
            try {
                const response = await verifyEmailApi(token);
                if (isMounted) {
                    setStatus('success');
                    setMessage(response?.message || 'Email verified successfully!');
                    toast.success('Email verified successfully!');
                }
            } catch (err) {
                if (isMounted) {
                    setStatus('error');
                    const errMsg = err?.response?.data?.message || 'Verification link is invalid or has expired.';
                    setMessage(errMsg);
                    toast.error(errMsg);
                }
            }
        };

        verifyToken();

        return () => {
            isMounted = false;
        };
    }, [token]);

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center py-16 px-4 font-body text-slate-200">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500;600;700&display=swap');
                .font-display { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; }
                .font-mono-ui { font-family: 'IBM Plex Mono', ui-monospace, monospace; }
                .font-body { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
            `}</style>

            <div className="w-full max-w-md bg-slate-900/60 border border-slate-800/80 rounded-2xl p-8 shadow-2xl backdrop-blur-xl text-center">
                {status === 'loading' && (
                    <div className="flex flex-col items-center py-6">
                        <div className="relative flex items-center justify-center w-20 h-20 mb-6">
                            <div className="absolute inset-0 rounded-full border-4 border-amber-400/20 border-t-amber-400 animate-spin"></div>
                            <IoMailUnreadOutline className="w-8 h-8 text-amber-400 animate-pulse" />
                        </div>
                        <h2 className="font-display text-2xl font-bold text-slate-100 mb-2">Verifying Email</h2>
                        <p className="font-body text-sm text-slate-400 max-w-xs">{message}</p>
                    </div>
                )}

                {status === 'success' && (
                    <div className="flex flex-col items-center py-4">
                        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-6 shadow-lg shadow-emerald-500/5">
                            <IoCheckmarkCircleOutline className="w-12 h-12" />
                        </div>
                        <h2 className="font-display text-2xl font-bold text-slate-100 mb-2">Email Verified!</h2>
                        <p className="font-body text-sm text-slate-300 mb-8 max-w-xs leading-relaxed">
                            {message} Your account is now active and ready to use.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
                            <Link
                                to="/"
                                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-mono-ui font-semibold text-sm transition-all shadow-lg shadow-amber-400/10 hover:shadow-amber-400/20"
                            >
                                Continue to Platform
                                <IoArrowForwardOutline className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                )}

                {status === 'error' && (
                    <div className="flex flex-col items-center py-4">
                        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 mb-6 shadow-lg shadow-rose-500/5">
                            <IoAlertCircleOutline className="w-12 h-12" />
                        </div>
                        <h2 className="font-display text-2xl font-bold text-slate-100 mb-2">Verification Failed</h2>
                        <p className="font-body text-sm text-rose-300/90 mb-8 max-w-xs leading-relaxed">
                            {message}
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
                            <Link
                                to="/"
                                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-slate-800 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white font-mono-ui font-medium text-sm transition-all"
                            >
                                <IoHomeOutline className="w-4 h-4" />
                                Return to Home
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VerifyEmail;
