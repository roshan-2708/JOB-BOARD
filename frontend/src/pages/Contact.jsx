import React, { useState } from 'react'
import {
    IoMailOutline,
    IoTimeOutline,
    IoChatbubbleEllipsesOutline,
    IoLogoTwitter,
    IoLogoLinkedin,
    IoSendOutline,
    IoPersonOutline,
} from 'react-icons/io5'

const CONTACT_CARDS = [
    {
        title: 'Email us',
        detail: 'support@joblane.com',
        copy: 'For account issues, billing, or anything else.',
        Icon: IoMailOutline,
    },
    {
        title: 'Response time',
        detail: 'Under 24 hours',
        copy: 'Real people read every message, in order received.',
        Icon: IoTimeOutline,
    },
    {
        title: 'For hiring teams',
        detail: 'sales@joblane.com',
        copy: 'Questions about posting roles or bulk plans.',
        Icon: IoChatbubbleEllipsesOutline,
    },
]

const TOPICS = ['General question', 'Account & billing', 'Report a listing', 'Posting a role', 'Something else']

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', topic: TOPICS[0], message: '' })
    const [submitted, setSubmitted] = useState(false)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Wire this up to your API — left as a stub for now.
        setSubmitted(true)
    }

    const inputClass =
        'w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2.5 font-body text-sm text-slate-100 placeholder-slate-600 outline-none transition-colors focus:border-amber-400 focus:ring-1 focus:ring-amber-400'

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
                <div className="mx-auto max-w-3xl px-6 py-20 text-center lg:px-8">
                    <span className="font-mono-ui text-xs uppercase tracking-widest text-amber-400">Get in touch</span>
                    <h1 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight text-slate-50 sm:text-5xl">
                        Talk to a human, not a ticket queue.
                    </h1>
                    <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-400">
                        Question about your account, a listing, or hiring on JobLane? Send it over — someone actually reads these.
                    </p>
                </div>
            </section>

            {/* ------------------------------------------------------------ CARDS */}
            <section className="border-b border-slate-800/80 py-14">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid gap-6 sm:grid-cols-3">
                        {CONTACT_CARDS.map(({ title, detail, copy, Icon }) => (
                            <div key={title} className="rounded-xl border border-slate-800 bg-slate-900/40 p-6">
                                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-400/10">
                                    <Icon className="h-5 w-5 text-amber-400" />
                                </span>
                                <h3 className="mt-4 font-display text-base font-semibold text-slate-50">{title}</h3>
                                <p className="mt-1 font-mono-ui text-sm text-amber-400">{detail}</p>
                                <p className="mt-2 text-sm leading-relaxed text-slate-500">{copy}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ------------------------------------------------------------ FORM */}
            <section className="py-20">
                <div className="mx-auto grid max-w-5xl gap-12 px-6 lg:grid-cols-[1fr_1.3fr] lg:px-8">
                    {/* Left: context + socials */}
                    <div>
                        <h2 className="font-display text-2xl font-semibold tracking-tight text-slate-50">Send a message.</h2>
                        <p className="mt-3 text-sm leading-relaxed text-slate-400">
                            Fill out the form and we'll route it to the right person. For urgent account or payment issues, email us directly for the fastest response.
                        </p>

                        <div className="mt-8 flex items-center gap-2">
                            <span className="font-mono-ui text-xs uppercase tracking-widest text-slate-500">Follow along</span>
                        </div>
                        <div className="mt-3 flex gap-2">
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Twitter"
                                className="flex h-9 w-9 items-center justify-center rounded-md border border-slate-800 text-slate-500 transition-colors hover:border-amber-400/40 hover:text-amber-400"
                            >
                                <IoLogoTwitter className="h-4 w-4" />
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                                className="flex h-9 w-9 items-center justify-center rounded-md border border-slate-800 text-slate-500 transition-colors hover:border-amber-400/40 hover:text-amber-400"
                            >
                                <IoLogoLinkedin className="h-4 w-4" />
                            </a>
                        </div>
                    </div>

                    {/* Right: form */}
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8">
                        {submitted ? (
                            <div className="flex flex-col items-center py-10 text-center">
                                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-400/10">
                                    <IoSendOutline className="h-5 w-5 text-amber-400" />
                                </span>
                                <h3 className="mt-4 font-display text-lg font-semibold text-slate-50">Message sent.</h3>
                                <p className="mt-2 max-w-xs text-sm text-slate-400">
                                    Thanks — we'll get back to you within 24 hours.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div>
                                        <label className="mb-1 block text-left text-xs font-medium uppercase tracking-wide text-slate-500">
                                            Name
                                        </label>
                                        <div className="relative">
                                            <IoPersonOutline className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className={`${inputClass} pl-10`}
                                                placeholder="Your name"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-left text-xs font-medium uppercase tracking-wide text-slate-500">
                                            Email
                                        </label>
                                        <div className="relative">
                                            <IoMailOutline className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className={`${inputClass} pl-10`}
                                                placeholder="you@example.com"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-1 block text-left text-xs font-medium uppercase tracking-wide text-slate-500">
                                        Topic
                                    </label>
                                    <select
                                        name="topic"
                                        value={formData.topic}
                                        onChange={handleChange}
                                        className={`${inputClass} bg-slate-900`}
                                    >
                                        {TOPICS.map((topic) => (
                                            <option key={topic} value={topic}>{topic}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="mb-1 block text-left text-xs font-medium uppercase tracking-wide text-slate-500">
                                        Message
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        className={`${inputClass} resize-none`}
                                        placeholder="How can we help?"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-amber-400 py-2.5 font-mono-ui text-sm font-semibold text-slate-950 transition-colors hover:bg-amber-300"
                                >
                                    Send message
                                    <IoSendOutline className="h-4 w-4" />
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Contact