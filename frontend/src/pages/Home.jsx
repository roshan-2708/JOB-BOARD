import React, { useEffect, useState } from 'react'
import {
  Search,
  MapPin,
  Code2,
  Palette,
  Compass,
  Megaphone,
  LineChart,
  Settings2,
  ArrowRight,
  ArrowUpRight,
  PlaneTakeoff,
  Star,
  Clock,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const BOARD_ROWS = [
  { role: 'Senior Product Designer', company: 'Cedar & Finch', loc: 'Remote (US)', status: 'OPEN' },
  { role: 'Backend Engineer, Payments', company: 'Northwind Systems', loc: 'Austin, TX', status: 'OPEN' },
  { role: 'Growth Marketing Lead', company: 'Fernweh Studio', loc: 'Remote (Global)', status: 'OPEN' },
  { role: 'Data Analyst, Operations', company: 'Harbor Analytics', loc: 'Chicago, IL', status: 'OPEN' },
  { role: 'Staff Frontend Engineer', company: 'Basalt Robotics', loc: 'Remote (EU)', status: 'FEW SEATS' },
  { role: 'Support Team Lead', company: 'Anchorpoint Labs', loc: 'Denver, CO', status: 'OPEN' },
  { role: 'Account Executive', company: 'Vale & Holt', loc: 'New York, NY', status: 'OPEN' },
  { role: 'ML Research Engineer', company: 'Lumen Grid', loc: 'Remote (US)', status: 'FEW SEATS' },
]

const CATEGORIES = [
  { name: 'Engineering', count: '2,140', Icon: Code2 },
  { name: 'Design', count: '640', Icon: Palette },
  { name: 'Product', count: '410', Icon: Compass },
  { name: 'Marketing', count: '780', Icon: Megaphone },
  { name: 'Sales', count: '920', Icon: LineChart },
  { name: 'Operations', count: '560', Icon: Settings2 },
]

const FEATURED_JOBS = [
  {
    role: 'Senior Product Designer',
    company: 'Cedar & Finch',
    loc: 'Remote (US)',
    pay: '$130k – $160k',
    type: 'Full-time',
    tags: ['Design systems', 'B2B SaaS'],
  },
  {
    role: 'Backend Engineer, Payments',
    company: 'Northwind Systems',
    loc: 'Austin, TX',
    pay: '$145k – $175k',
    type: 'Full-time',
    tags: ['Go', 'Distributed systems'],
  },
  {
    role: 'Growth Marketing Lead',
    company: 'Fernweh Studio',
    loc: 'Remote (Global)',
    pay: '$95k – $120k',
    type: 'Full-time',
    tags: ['Lifecycle', 'Paid social'],
  },
  {
    role: 'Data Analyst, Operations',
    company: 'Harbor Analytics',
    loc: 'Chicago, IL',
    pay: '$85k – $105k',
    type: 'Full-time',
    tags: ['SQL', 'Forecasting'],
  },
]

const STEPS = [
  {
    gate: 'GATE 01',
    title: 'Search',
    copy: 'Filter by role, pay band, and location until every result actually fits — no wading through noise.',
  },
  {
    gate: 'GATE 02',
    title: 'Apply',
    copy: 'Build one profile and send it to every role you board. No re-typing your history for the tenth time.',
  },
  {
    gate: 'GATE 03',
    title: 'Board',
    copy: 'Interview, get the offer, and start the next chapter — we clear the gate the moment you accept.',
  },
]

// ---------------------------------------------------------------------------
// Small building blocks
// ---------------------------------------------------------------------------

const LiveDot = ({ tone = 'emerald' }) => (
  <span className="relative flex h-2 w-2">
    <span
      className={`motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full opacity-60 ${tone === 'emerald' ? 'bg-emerald-400' : 'bg-amber-400'
        }`}
    />
    <span
      className={`relative inline-flex h-2 w-2 rounded-full ${tone === 'emerald' ? 'bg-emerald-400' : 'bg-amber-400'
        }`}
    />
  </span>
)

// ---------------------------------------------------------------------------
// Home
// ---------------------------------------------------------------------------

const Home = () => {
  const [offset, setOffset] = useState(0)
  const [secondsAgo, setSecondsAgo] = useState(0)

  const visibleRows = Array.from({ length: 5 }, (_, i) => BOARD_ROWS[(offset + i) % BOARD_ROWS.length])

  useEffect(() => {
    const rotate = setInterval(() => {
      setOffset((o) => (o + 1) % BOARD_ROWS.length)
      setSecondsAgo(0)
    }, 3400)
    return () => clearInterval(rotate)
  }, [])

  useEffect(() => {
    const tick = setInterval(() => setSecondsAgo((s) => s + 1), 1000)
    return () => clearInterval(tick)
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-body antialiased">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500;600;700&display=swap');
        .font-display { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; }
        .font-mono-ui { font-family: 'IBM Plex Mono', ui-monospace, monospace; }
        .font-body { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }

        @keyframes flapIn {
          0% { opacity: 0; transform: translateY(-8px) scaleY(0.85); }
          60% { opacity: 1; }
          100% { opacity: 1; transform: translateY(0) scaleY(1); }
        }
        .flap-row { animation: flapIn 420ms ease-out; transform-origin: top; }
        @media (prefers-reduced-motion: reduce) {
          .flap-row { animation: none; }
        }

        .ticket-notch::before,
        .ticket-notch::after {
          content: '';
          position: absolute;
          top: 50%;
          width: 16px;
          height: 16px;
          background: #020617;
          border-radius: 9999px;
          transform: translateY(-50%);
        }
        .ticket-notch::before { left: -8px; }
        .ticket-notch::after { right: -8px; }
      `}</style>

      {/* ----------------------------------------------------------- HERO */}
      <section className="relative overflow-hidden border-b border-slate-800/80">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 py-20 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-28">
          {/* Left: copy + search */}
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-3 py-1">
              <LiveDot />
              <span className="font-mono-ui text-xs uppercase tracking-widest text-slate-400">Live board — updated hourly</span>
            </div>

            <h1 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight text-slate-50 sm:text-5xl lg:text-6xl">
              Your next role
              <br />
              is <span className="text-amber-400">boarding.</span>
            </h1>

            <p className="mt-6 max-w-md text-lg leading-relaxed text-slate-400">
              Track open roles the way you'd track a flight — who's hiring, what it pays, and how many seats are left, updated in real time.
            </p>

            <form className="mt-9 rounded-xl border border-slate-800 bg-slate-900/60 p-2 sm:flex sm:items-center sm:gap-2">
              <label className="sr-only" htmlFor="role">Role or keyword</label>
              <div className="flex flex-1 items-center gap-2 rounded-lg px-3 py-2.5">
                <Search className="h-4 w-4 shrink-0 text-slate-500" />
                <input
                  id="role"
                  type="text"
                  placeholder="Job title or keyword"
                  className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
                />
              </div>
              <div className="hidden h-6 w-px bg-slate-800 sm:block" />
              <div className="flex flex-1 items-center gap-2 rounded-lg px-3 py-2.5">
                <MapPin className="h-4 w-4 shrink-0 text-slate-500" />
                <input
                  id="loc"
                  type="text"
                  placeholder="City or 'Remote'"
                  className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="mt-2 w-full shrink-0 rounded-lg bg-amber-400 px-5 py-2.5 font-mono-ui text-sm font-medium text-slate-950 transition hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 sm:mt-0 sm:w-auto"
              >
                Search roles
              </button>
            </form>

            <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-slate-800 pt-8">
              <div>
                <dt className="font-display text-2xl font-semibold text-slate-50">12,400</dt>
                <dd className="mt-1 font-mono-ui text-xs uppercase tracking-wide text-slate-500">Open roles</dd>
              </div>
              <div>
                <dt className="font-display text-2xl font-semibold text-slate-50">3,200</dt>
                <dd className="mt-1 font-mono-ui text-xs uppercase tracking-wide text-slate-500">Companies hiring</dd>
              </div>
              <div>
                <dt className="font-display text-2xl font-semibold text-slate-50">48hr</dt>
                <dd className="mt-1 font-mono-ui text-xs uppercase tracking-wide text-slate-500">Avg. first reply</dd>
              </div>
            </dl>
          </div>

          {/* Right: departures board */}
          <div className="relative">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 shadow-2xl shadow-black/40">
              <div className="flex items-center justify-between border-b border-slate-800 px-5 py-3.5">
                <span className="font-mono-ui text-xs uppercase tracking-widest text-slate-500">Departures — Open Roles</span>
                <span className="flex items-center gap-1.5 font-mono-ui text-xs text-slate-600">
                  <Clock className="h-3 w-3" />
                  {secondsAgo}s ago
                </span>
              </div>

              <div className="grid grid-cols-[1fr_auto] gap-x-4 px-5 pt-4 font-mono-ui text-[11px] uppercase tracking-widest text-slate-600">
                <span>Role / Company</span>
                <span>Status</span>
              </div>

              <div className="divide-y divide-slate-800/80 px-5 pb-5 pt-2">
                {visibleRows.map((row, i) => (
                  <div
                    key={`${row.role}-${offset}-${i}`}
                    className="flap-row flex items-center justify-between gap-4 py-3"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-mono-ui text-sm text-slate-100">{row.role}</p>
                      <p className="truncate font-mono-ui text-xs text-slate-500">{row.company} · {row.loc}</p>
                    </div>
                    <span
                      className={`shrink-0 rounded px-2 py-1 font-mono-ui text-[10px] font-medium tracking-wide ${row.status === 'OPEN'
                          ? 'bg-emerald-400/10 text-emerald-400'
                          : 'bg-amber-400/10 text-amber-400'
                        }`}
                    >
                      {row.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-amber-400/5 blur-2xl" />
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- TRUSTED BY */}
      <section className="border-b border-slate-800/80 py-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="mb-6 text-center font-mono-ui text-xs uppercase tracking-widest text-slate-600">Hiring teams currently on the board</p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 opacity-70 grayscale">
            {['Northwind Systems', 'Cedar & Finch', 'Vale & Holt', 'Anchorpoint Labs', 'Basalt Robotics', 'Harbor Analytics'].map((name) => (
              <span key={name} className="font-display text-sm font-medium tracking-tight text-slate-400">{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- CATEGORIES */}
      <section id="categories" className="border-b border-slate-800/80 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 max-w-xl">
            <span className="font-mono-ui text-xs uppercase tracking-widest text-amber-400">Browse by gate</span>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
              Pick a terminal.
            </h2>
            <p className="mt-3 text-slate-400">Every category below is a live count, not a placeholder — refreshed every hour with the board.</p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {CATEGORIES.map(({ name, count, Icon }) => (
              <a
                key={name}
                href="#"
                className="group rounded-xl border border-slate-800 bg-slate-900/40 p-5 transition hover:-translate-y-1 hover:border-amber-400/40 hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                <Icon className="h-5 w-5 text-amber-400" strokeWidth={1.75} />
                <p className="mt-4 font-display text-sm font-medium text-slate-100">{name}</p>
                <p className="mt-1 font-mono-ui text-xs text-slate-500">{count} roles</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------- FEATURED */}
      <section id="roles" className="border-b border-slate-800/80 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="font-mono-ui text-xs uppercase tracking-widest text-amber-400">Now boarding</span>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">Featured roles this week.</h2>
            </div>
            <a href="#" className="flex items-center gap-1.5 font-mono-ui text-sm text-slate-300 transition hover:text-amber-400">
              View all 12,400 roles <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {FEATURED_JOBS.map((job) => (
              <div
                key={job.role}
                className="ticket-notch relative flex flex-col justify-between overflow-visible rounded-xl border border-dashed border-slate-700 bg-slate-900/50 p-6 transition hover:border-amber-400/50"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-lg font-semibold text-slate-50">{job.role}</h3>
                      <p className="mt-1 font-mono-ui text-sm text-slate-500">{job.company}</p>
                    </div>
                    <span className="rounded bg-emerald-400/10 px-2 py-1 font-mono-ui text-[10px] font-medium tracking-wide text-emerald-400">OPEN</span>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 font-mono-ui text-xs text-slate-500">
                    <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {job.loc}</span>
                    <span>{job.pay}</span>
                    <span>{job.type}</span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {job.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-slate-700 px-2.5 py-1 font-mono-ui text-[11px] text-slate-400">{tag}</span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-dashed border-slate-700 pt-4">
                  <span className="font-mono-ui text-[11px] uppercase tracking-widest text-slate-600">Boarding pass · Seat open</span>
                  <a href="#" className="flex items-center gap-1 font-mono-ui text-sm font-medium text-amber-400 transition hover:text-amber-300">
                    Apply <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- HOW IT WORKS */}
      <section id="how" className="border-b border-slate-800/80 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 max-w-xl">
            <span className="font-mono-ui text-xs uppercase tracking-widest text-amber-400">Clearing the gate</span>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">Three gates. No detours.</h2>
          </div>

          <div className="grid gap-px overflow-hidden rounded-xl border border-slate-800 bg-slate-800 md:grid-cols-3">
            {STEPS.map((step) => (
              <div key={step.gate} className="bg-slate-950 p-8">
                <span className="font-mono-ui text-xs tracking-widest text-amber-400">{step.gate}</span>
                <h3 className="mt-3 font-display text-xl font-semibold text-slate-50">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{step.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ TESTIMONIAL */}
      <section className="border-b border-slate-800/80 py-20">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <div className="mb-5 flex justify-center gap-1 text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
          </div>
          <p className="font-display text-2xl font-medium leading-snug text-slate-100 sm:text-3xl">
            "I stopped scrolling ten job sites and just watched one board. Three weeks later, I was signing an offer."
          </p>
          <p className="mt-6 font-mono-ui text-sm text-slate-500">Priya N. — hired as Senior Engineer via OpenBoard</p>
        </div>
      </section>

      {/* ------------------------------------------------------------ CTA */}
      <section className="border-b border-slate-800/80 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col items-center gap-6 rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 px-8 py-16 text-center">
            <PlaneTakeoff className="h-8 w-8 text-amber-400" />
            <h2 className="font-display text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">Ready for takeoff?</h2>
            <p className="max-w-md text-slate-400">Set an alert and we'll tell you the second a matching role opens its gate.</p>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <a href="#roles" className="rounded-md bg-amber-400 px-6 py-3 font-mono-ui text-sm font-medium text-slate-950 transition hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300">
                Browse open roles
              </a>
              <a href="#" className="rounded-md border border-slate-700 px-6 py-3 font-mono-ui text-sm font-medium text-slate-200 transition hover:border-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300">
                Post a role — free for 14 days
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Home