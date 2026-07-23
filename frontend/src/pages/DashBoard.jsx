import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { getEmpJobs, getMyApplication } from '../connector/apiController';
import {
  IoPersonOutline,
  IoAddCircleOutline,
  IoBriefcaseOutline,
  IoDocumentTextOutline,
  IoCashOutline,
  IoTimeOutline,
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
  IoHourglassOutline,
  IoSearchOutline,
  IoCalendarOutline,
} from 'react-icons/io5'
import PostJob from '../components/PostJob';
import { useNavigate } from 'react-router-dom'

const STATUS_STYLES = {
  pending: { label: 'Pending', className: 'bg-amber-400/10 text-amber-400', Icon: IoHourglassOutline },
  accepted: { label: 'Accepted', className: 'bg-emerald-400/10 text-emerald-400', Icon: IoCheckmarkCircleOutline },
  hired: { label: 'Hired', className: 'bg-emerald-400/10 text-emerald-400', Icon: IoCheckmarkCircleOutline },
  rejected: { label: 'Rejected', className: 'bg-rose-400/10 text-rose-400', Icon: IoCloseCircleOutline },
}

const StatusBadge = ({ status }) => {
  const style = STATUS_STYLES[status?.toLowerCase()] || STATUS_STYLES.pending
  const { label, className, Icon } = style
  return (
    <span className={`flex items-center gap-1 rounded px-2 py-1 font-mono-ui text-[11px] font-medium ${className}`}>
      <Icon className="h-3.5 w-3.5" />
      {status || label}
    </span>
  )
}

const SkeletonRow = () => (
  <div className="animate-pulse rounded-xl border border-slate-800 bg-slate-900/40 p-5">
    <div className="h-4 w-1/3 rounded bg-slate-800" />
    <div className="mt-3 h-3 w-1/4 rounded bg-slate-800" />
  </div>
)

const EmptyState = ({ Icon, title, copy }) => (
  <div className="flex flex-col items-center rounded-xl border border-dashed border-slate-800 py-16 text-center">
    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-900">
      <Icon className="h-5 w-5 text-slate-500" />
    </span>
    <h3 className="mt-4 font-display text-base font-semibold text-slate-200">{title}</h3>
    <p className="mt-1.5 max-w-xs text-sm text-slate-500">{copy}</p>
  </div>
)

const DasBoard = () => {
  const { user, loading: authLoading } = useContext(AuthContext);

  const [activeTab, setActiveTab] = useState('profile');
  const [dashboard, setDashboard] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);



  useEffect(() => {
    if (!user) return;

    const fetchDashboardData = async () => {
      setDataLoading(true);
      try {
        if (user.role === 'employer' && activeTab === 'my-jobs') {
          const { data } = await getEmpJobs();
          setDashboard(data);
        } else if (user.role === 'candidate' && activeTab === 'my-applications') {
          const { data } = await getMyApplication();
          setDashboard(data);
        }
      } catch (error) {
        console.error("Dashboard Data Error : ", error);
      } finally {
        setDataLoading(false);
      }
    }
    if (activeTab !== 'profile' && activeTab !== 'post-job') {
      fetchDashboardData();
    }
  }, [activeTab, user]);

  const jobStatus = (startingDateString, closingDateString) => {
    if (!startingDateString || !closingDateString) return "Open";
    const now = new Date();
    const startDate = new Date(startingDateString);
    const closeDate = new Date(closingDateString);

    if (now < startDate) return "Coming Soon";
    else if (now > closeDate) return "Closed";
    else return "Open";
  }

  const getStatusOrder = (status) => {
    switch (status) {
      case "Open":
        return "bg-emerald-400/10 text-emerald-400";
      case "Coming Soon":
        return "bg-amber-400/10 text-amber-400";
      case "Closed":
        return "bg-red-400/10 text-red-400";
      default:
        return "bg-slate-400/10 text-slate-400";
    }
  }

  const initial = (user?.name || user?.email || 'U').charAt(0).toUpperCase();

  const employerTabs = [
    { id: 'profile', label: 'My Profile', Icon: IoPersonOutline },
    { id: 'post-job', label: 'Post a Job', Icon: IoAddCircleOutline },
    { id: 'my-jobs', label: 'My Posted Jobs', Icon: IoBriefcaseOutline },
  ];

  const candidateTabs = [
    { id: 'profile', label: 'My Profile', Icon: IoPersonOutline },
    { id: 'my-applications', label: 'My Applications', Icon: IoDocumentTextOutline },
  ];

  const tabs = user?.role === 'employer' ? employerTabs : candidateTabs;

  const TAB_TITLES = {
    'profile': 'My Profile',
    'post-job': 'Post a Job',
    'my-jobs': 'My Posted Jobs',
    'my-applications': 'My Applications',
    'applications': 'Candidate Applications',
  };

  const navigate = useNavigate();

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";

    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',   // 1, 2, 31
      month: 'short',   // Jan, Feb, Aug
      year: 'numeric'   // 2026
    });
  };

  if (authLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-slate-950">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-700 border-t-amber-400" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-2 bg-slate-950 text-center">
        <p className="font-display text-lg text-slate-200">You're not signed in.</p>
        <p className="text-sm text-slate-500">Log in to view your dashboard.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 font-body text-slate-200">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500;600;700&display=swap');
        .font-display { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; }
        .font-mono-ui { font-family: 'IBM Plex Mono', ui-monospace, monospace; }
        .font-body { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
      `}</style>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Greeting */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="font-mono-ui text-xs uppercase tracking-widest text-amber-400">Dashboard</span>
            <h1 className="mt-1 font-display text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
              Welcome back, {user.name?.split(' ')[0] || 'there'}.
            </h1>
          </div>
          <span className="rounded-full border border-slate-800 bg-slate-900/60 px-3 py-1 font-mono-ui text-xs capitalize text-slate-400">
            {user.role}
          </span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
          <aside>
            <nav className="flex gap-2 overflow-x-auto pb-2 lg:hidden">
              {tabs.map(({ id, label, Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 font-mono-ui text-sm transition-colors ${activeTab === id
                    ? 'bg-amber-400 text-slate-950'
                    : 'border border-slate-800 text-slate-400 hover:text-slate-100'
                    }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </button>
              ))}
            </nav>

            <nav className="hidden flex-col gap-1 rounded-xl border border-slate-800 bg-slate-900/40 p-2 lg:flex">
              <div className="flex items-center gap-3 border-b border-slate-800 px-3 py-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-400 font-mono-ui text-sm font-semibold text-slate-950">
                  {initial}
                </span>
                <div className="min-w-0">
                  <p className="truncate font-display text-sm font-semibold text-slate-50">{user.name || 'Unnamed'}</p>
                  <p className="truncate text-xs text-slate-500">{user.email}</p>
                </div>
              </div>

              <div className="flex flex-col gap-1 p-1 pt-3">
                {tabs.map(({ id, label, Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-left font-mono-ui text-sm transition-colors ${activeTab === id
                      ? 'bg-amber-400/10 text-amber-400'
                      : 'text-slate-400 hover:bg-slate-900 hover:text-slate-100'
                      }`}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </button>
                ))}
              </div>
            </nav>
          </aside>

          <main>
            <div className="mb-6">
              <h2 className="font-display text-xl font-semibold text-slate-50">{TAB_TITLES[activeTab]}</h2>
            </div>

            {/* 1. Profile */}
            {activeTab === 'profile' && (
              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8">
                <div className="flex items-center gap-4 border-b border-slate-800 pb-6">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-400 font-display text-xl font-semibold text-slate-950">
                    {initial}
                  </span>
                  <div>
                    <p className="font-display text-lg font-semibold text-slate-50">{user.name}</p>
                    <p className="text-sm text-slate-500">{user.email}</p>
                  </div>
                </div>

                <dl className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div>
                    <dt className="font-mono-ui text-xs uppercase tracking-widest text-slate-500">Full name</dt>
                    <dd className="mt-1 text-sm text-slate-200">{user.name || '—'}</dd>
                  </div>
                  <div>
                    <dt className="font-mono-ui text-xs uppercase tracking-widest text-slate-500">Email address</dt>
                    <dd className="mt-1 text-sm text-slate-200">{user.email || '—'}</dd>
                  </div>
                  <div>
                    <dt className="font-mono-ui text-xs uppercase tracking-widest text-slate-500">Account type</dt>
                    <dd className="mt-1 text-sm capitalize text-slate-200">{user.role || '—'}</dd>
                  </div>
                </dl>

                <button className="mt-8 rounded-lg border border-slate-700 px-4 py-2 font-mono-ui text-sm text-slate-200 transition-colors hover:border-slate-500">
                  Edit profile
                </button>
              </div>
            )}

            {/* 2. Post a Job */}
            {activeTab === 'post-job' && user.role === 'employer' && (
              <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-800 py-20 text-center">
                <PostJob />
              </div>
            )}

            {/* 3. My Posted Jobs */}
            {activeTab === 'my-jobs' && user.role === 'employer' && (
              <div className="space-y-3">
                {dataLoading ? (
                  <>
                    <SkeletonRow />
                    <SkeletonRow />
                    <SkeletonRow />
                  </>
                ) : dashboard.length === 0 ? (
                  <EmptyState
                    Icon={IoBriefcaseOutline}
                    title="No jobs posted yet"
                    copy="Once you post a role, it'll show up here so you can track it."
                  />
                ) : (
                  dashboard.map((job) => {
                    const status = jobStatus(job.startingDate, job.closingDate);
                    return (
                      <div
                        key={job._id}
                        onClick={() => navigate(`/employer/job/${job._id}/applications`)}
                        className="group flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-900/40 p-5 transition-colors hover:border-amber-400/40 cursor-pointer"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="font-display text-base font-semibold text-slate-50 truncate">
                            {job.title}
                          </p>
                          <div className="mt-2 flex flex-wrap items-center gap-4 text-xs font-mono-ui text-slate-500">
                            <p className="flex items-center gap-1.5">
                              <IoCashOutline className="h-3.5 w-3.5 text-amber-400/70" />
                              {job.salary}
                            </p>
                            <p className="flex items-center gap-1.5">
                              <IoCalendarOutline className="h-3.5 w-3.5 text-amber-400/70" />
                              {formatDate(job.startingDate)} - {formatDate(job.closingDate)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span
                            className={`rounded-full border px-3 py-1 font-mono-ui text-[11px] font-medium uppercase tracking-wide ${getStatusOrder(status)}`}
                          >
                            {status}
                          </span>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/employer/job/update/${job._id}`);
                            }}
                            className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 font-mono-ui text-xs font-semibold uppercase tracking-wide text-slate-300 transition-colors hover:border-amber-400 hover:bg-amber-400 hover:text-slate-950"
                          >
                            Update
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}



            {/* 4. My Applications */}
            {activeTab === 'my-applications' && user.role === 'candidate' && (
              <div className="space-y-3">
                {dataLoading ? (
                  <>
                    <SkeletonRow />
                    <SkeletonRow />
                    <SkeletonRow />
                  </>
                ) : dashboard.length === 0 ? (
                  <EmptyState
                    Icon={IoSearchOutline}
                    title="No applications yet"
                    copy="Roles you apply to will show up here so you can track their status."
                  />
                ) : (
                  dashboard.map((app) => (
                    <div
                      key={app._id}
                      className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-900/40 p-5 transition-colors hover:border-slate-700"
                    >
                      <div>
                        <p className="font-display text-base font-semibold text-slate-50">{app.job?.title || 'Untitled role'}</p>
                        <p className="mt-1 flex items-center gap-1.5 font-mono-ui text-xs text-slate-500">
                          <IoTimeOutline className="h-3.5 w-3.5" />
                          Applied recently
                        </p>
                      </div>
                      <StatusBadge status={app.status} />
                    </div>
                  ))
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

export default DasBoard