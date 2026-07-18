import React from 'react'
import { Link } from 'react-router-dom'
import {
  IoAirplaneOutline,
  IoPulseOutline,
  IoFlashOutline,
  IoShieldCheckmarkOutline,
  IoPeopleOutline,
  IoArrowForward,
} from 'react-icons/io5'

const VALUES = [
  {
    title: 'Signal over noise',
    copy: 'Every listing on the board is a real, open role. No expired postings, no recruiter bait — if it says open, it is.',
    Icon: IoPulseOutline,
  },
  {
    title: 'Speed matters',
    copy: 'A slow reply is the same as no reply. We push companies toward a 48-hour first response, and we track it publicly.',
    Icon: IoFlashOutline,
  },
  {
    title: 'Trust is the product',
    copy: 'Salary ranges, seat counts, and company info are verified before a role ever hits the board.',
    Icon: IoShieldCheckmarkOutline,
  },
  {
    title: 'Built by job seekers',
    copy: 'Every person on this team has sent an application into a black hole. We built the board we wished existed.',
    Icon: IoPeopleOutline,
  },
]

const STORY = [
  {
    year: '2023',
    title: 'The idea',
    copy: 'Frustrated by dead listings and week-long silences, a small team started tracking open roles the way you\'d track a departures board — live, and gone the moment the seat fills.',
  },
  {
    year: '2024',
    title: 'First 1,000 roles',
    copy: 'JobLane opened to the public with a simple rule: nothing goes on the board unless it\'s actually open right now.',
  },
  {
    year: '2026',
    title: 'Today',
    copy: 'Thousands of companies post directly to the board, and every listing still passes the same test it always has.',
  },
]

const STATS = [
  { value: '12,400', label: 'Open roles' },
  { value: '3,200', label: 'Companies hiring' },
  { value: '48hr', label: 'Avg. first reply' },
]

const About = () => {
  return (
    <div className="bg-slate-950 font-body text-slate-200">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500;600;700&display=swap');
        .font-display { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; }
        .font-mono-ui { font-family: 'IBM Plex Mono', ui-monospace, monospace; }
        .font-body { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
      `}</style>

      {/* ------------------------------------------------------------ HERO */}
      <section className="border-b border-slate-800/80">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center lg:px-8">
          <span className="mx-auto mb-6 flex h-11 w-11 items-center justify-center rounded-full bg-amber-400/10">
            <IoAirplaneOutline className="h-5 w-5 text-amber-400" />
          </span>
          <span className="font-mono-ui text-xs uppercase tracking-widest text-amber-400">About JobLane</span>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight text-slate-50 sm:text-5xl">
            We built the board we wished existed.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-400">
            Most job sites are a graveyard of listings nobody bothered to take down. JobLane only shows what's actually open, right now — updated hourly, not seasonally.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------ STATS */}
      <section className="border-b border-slate-800/80 py-14">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <dt className="font-display text-3xl font-semibold text-slate-50 sm:text-4xl">{stat.value}</dt>
                <dd className="mt-2 font-mono-ui text-xs uppercase tracking-widest text-slate-500">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ------------------------------------------------------------ STORY */}
      <section className="border-b border-slate-800/80 py-20">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="font-mono-ui text-xs uppercase tracking-widest text-amber-400">How we got here</span>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">The short version.</h2>
          </div>

          <div className="space-y-10 border-l border-slate-800 pl-8">
            {STORY.map((item) => (
              <div key={item.year} className="relative">
                <span className="absolute -left-[38.5px] top-1 flex h-3 w-3 items-center justify-center rounded-full border-2 border-slate-950 bg-amber-400" />
                <span className="font-mono-ui text-xs uppercase tracking-widest text-amber-400">{item.year}</span>
                <h3 className="mt-2 font-display text-xl font-semibold text-slate-50">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ VALUES */}
      <section className="border-b border-slate-800/80 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 max-w-xl">
            <span className="font-mono-ui text-xs uppercase tracking-widest text-amber-400">What we hold to</span>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">Four rules we don't bend.</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {VALUES.map(({ title, copy, Icon }) => (
              <div key={title} className="rounded-xl border border-slate-800 bg-slate-900/40 p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-400/10">
                  <Icon className="h-5 w-5 text-amber-400" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-slate-50">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col items-center gap-6 rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 px-8 py-16 text-center">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">Come see the board.</h2>
            <p className="max-w-md text-slate-400">Twelve thousand open roles, updated hourly. No dead listings, no noise.</p>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/jobs"
                className="flex items-center justify-center gap-1.5 rounded-md bg-amber-400 px-6 py-3 font-mono-ui text-sm font-medium text-slate-950 transition-colors hover:bg-amber-300"
              >
                Browse open roles <IoArrowForward className="h-4 w-4" />
              </Link>
              <Link
                to="/post-job"
                className="rounded-md border border-slate-700 px-6 py-3 font-mono-ui text-sm font-medium text-slate-200 transition-colors hover:border-slate-500"
              >
                Post a role
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About