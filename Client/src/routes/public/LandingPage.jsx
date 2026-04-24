import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Section from '../../components/ui/Section';

const features = [
  { title: 'Multi-role dashboards', hint: 'One surface, three perspectives.' },
  { title: 'Smart service assignment', hint: 'Work routes to the right hands.' },
  { title: 'Complaint management', hint: 'From report to resolution.' },
  { title: 'Visitor & security', hint: 'Gatekeeping without friction.' },
  { title: 'Emergency support', hint: 'When minutes matter.' },
];

const steps = [
  ['Onboard', 'Define admin, resident, and worker access in a single pass.'],
  ['Operate', 'Route services and complaints with visible ownership.'],
  ['Observe', 'See visitors, incidents, and daily rhythm in one place.'],
];

const HeroOrnament = () => (
  <svg
    className="mt-10 w-full max-w-md text-white/[0.14]"
    viewBox="0 0 400 120"
    fill="none"
    xmlns="https://www.w3.org/2000/svg"
    aria-hidden
  >
    <path
      d="M0 60 Q 100 20, 200 60 T 400 60"
      stroke="currentColor"
      strokeWidth="0.75"
      vectorEffect="non-scaling-stroke"
    />
    <path d="M48 95 L352 95" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 8" opacity="0.6" />
    <circle cx="200" cy="60" r="3" fill="currentColor" opacity="0.35" />
  </svg>
);

const LandingPage = () => {
  return (
    <>
      <section className="relative mx-auto max-w-6xl px-6 pb-24 pt-16 md:px-8 md:pt-24">
        <div className="animate-ethereal-fade-up max-w-3xl">
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.35em] text-[#6b6965]">Residential operations</p>
          <h1 className="font-display mt-6 text-5xl font-normal leading-[1.05] text-[#f5f3f0] md:text-7xl md:leading-[1.02]">
            SocietySync
          </h1>
          <p className="mt-8 max-w-lg text-lg font-light leading-relaxed text-[#a8a6a1]">
            Smart Society Management, Simplified
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button as={Link} to="/demo" variant="etherealSolid" className="!rounded-lg !tracking-wide">
              View demo
            </Button>
            <Button as={Link} to="/login" variant="ethereal" className="!rounded-lg !tracking-wide">
              Login
            </Button>
            <Link
              to="/pricing"
              className="ml-1 text-sm text-[#6b6965] underline decoration-white/10 underline-offset-4 transition-colors hover:text-[#a8a6a1]"
            >
              See pricing
            </Link>
          </div>
        </div>
        <HeroOrnament />

        <div className="mt-16 grid gap-6 md:grid-cols-12 md:gap-5">
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 md:col-span-7 md:p-10">
            <div className="pointer-events-none absolute -right-8 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full border border-white/[0.06]" />
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.3em] text-[#5c5a57]">Preview</p>
            <p className="font-display mt-4 text-2xl text-[#e8e6e3] md:text-3xl">A quiet command layer for your society.</p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-[#6b6965]">
              No clutter — only the flows your teams use every day: requests, assignments, and visibility.
            </p>
            <div className="mt-8 flex gap-3 border-t border-white/[0.06] pt-8">
              {['Dashboard', 'Requests', 'Visitors'].map((label) => (
                <span
                  key={label}
                  className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[0.7rem] tracking-wide text-[#8a8884]"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-between gap-5 md:col-span-5">
            <div className="rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.05] to-transparent p-6">
              <p className="font-display text-5xl font-light leading-none text-[#3d3c3a]">01</p>
              <p className="mt-4 text-sm text-[#8a8884]">Designed as a product — not a patchwork of screens.</p>
            </div>
            <div className="rounded-2xl border border-white/[0.06] p-6">
              <p className="font-display text-5xl font-light leading-none text-[#3d3c3a]">02</p>
              <p className="mt-4 text-sm text-[#8a8884]">Roles stay distinct; context stays shared.</p>
            </div>
          </div>
        </div>
      </section>

      <Section
        tone="ethereal"
        eyebrow="Capabilities"
        title="What the platform holds"
        subtitle="A small set of powerful surfaces — each one intentional."
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Card key={f.title} tone="ethereal" title={f.title} className={i === 0 ? 'sm:col-span-2 lg:col-span-1' : ''}>
              <p className="mt-3 text-xs tracking-wide text-[#5c5a57]">{f.hint}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="ethereal" eyebrow="Rhythm" title="How it comes together" subtitle="Three movements — from setup to steady state.">
        <div className="relative grid gap-10 md:grid-cols-3 md:gap-8">
          <div className="absolute left-[1.25rem] top-0 hidden h-full w-px bg-gradient-to-b from-white/[0.12] via-white/[0.06] to-transparent md:left-3 md:block" />
          {steps.map(([title, body], index) => (
            <div key={title} className="relative pl-0 md:pl-10">
              <span className="font-display absolute left-0 top-0 hidden text-3xl text-[#2a2928] md:block">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="flex items-start gap-4 md:block">
                <span className="mt-1 flex h-2 w-2 shrink-0 rounded-full bg-[#c4c2bc]/40 md:absolute md:-left-[0.2rem] md:top-2" />
                <div>
                  <h3 className="font-display text-xl text-[#e8e6e3]">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#6b6965]">{body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        tone="ethereal"
        eyebrow="People"
        title="Written for three kinds of hands"
        subtitle="Same truth, different lenses."
      >
        <div className="grid gap-5 md:grid-cols-3">
          <Card
            tone="ethereal"
            title="Admin"
            description="Orchestrate the society: incidents, assignments, and the pulse of daily work."
          />
          <Card
            tone="ethereal"
            title="Resident"
            description="Raise needs, follow progress, and stay aligned with what happens at the gate."
          />
          <Card
            tone="ethereal"
            title="Worker"
            description="Receive clear tasks, close the loop, and leave an audit trail without extra noise."
          />
        </div>
      </Section>

      <section className="mx-auto max-w-6xl px-6 pb-24 md:px-8">
        <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-r from-white/[0.04] via-transparent to-white/[0.02] px-8 py-14 text-center md:px-16">
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.35em] text-[#5c5a57]">Begin</p>
          <p className="font-display mx-auto mt-5 max-w-xl text-3xl text-[#f0eeeb] md:text-4xl">Step into the live product.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button as={Link} to="/demo" variant="etherealSolid" className="!rounded-lg">
              Open demo
            </Button>
            <Button as={Link} to="/pricing" variant="ethereal" className="!rounded-lg">
              Compare plans
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
