import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Section from '../../components/ui/Section';

const demoCredentials = {
  email: 'demo@societysync.com',
  password: 'demo123',
};

const mirrorFeatures = [
  { title: 'Multi-role dashboards', hint: 'As on the homepage — one surface, three perspectives.' },
  { title: 'Smart assignment', hint: 'Requests land with clear owners.' },
  { title: 'Complaints & services', hint: 'Track from open to done.' },
  { title: 'Visitor & security', hint: 'Gate flows without friction.' },
  { title: 'Emergency', hint: 'A fast path when it matters.' },
];

const ProductFrame = () => (
  <div className="overflow-hidden rounded-xl border border-white/[0.1] bg-[#0c0c0d] shadow-[0_24px_80px_-24px_rgba(0,0,0,0.8)]">
    <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
      <span className="h-2 w-2 rounded-full bg-[#3d3c3a]" />
      <span className="h-2 w-2 rounded-full bg-[#3d3c3a]" />
      <span className="h-2 w-2 rounded-full bg-[#3d3c3a]" />
      <span className="ml-4 text-[0.65rem] tracking-widest text-[#4a4846]">SOCIETYSYNC — PREVIEW</span>
    </div>
    <div className="grid gap-px bg-white/[0.04] md:grid-cols-[1fr_2fr]">
      <aside className="bg-[#080809] p-4">
        <div className="space-y-2">
          {['Dashboard', 'Events', 'Complaints', 'Services'].map((item, i) => (
            <div
              key={item}
              className={`rounded-lg px-3 py-2 text-[0.7rem] tracking-wide ${i === 0 ? 'bg-white/[0.06] text-[#e8e6e3]' : 'text-[#5c5a57]'}`}
            >
              {item}
            </div>
          ))}
        </div>
      </aside>
      <main className="min-h-[200px] bg-gradient-to-br from-[#0a0a0b] to-[#060608] p-6">
        <div className="h-2 w-1/3 rounded-full bg-white/[0.06]" />
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="h-20 rounded-lg border border-white/[0.06] bg-white/[0.02]" />
          <div className="h-20 rounded-lg border border-white/[0.06] bg-white/[0.02]" />
          <div className="col-span-2 h-14 rounded-lg border border-white/[0.06] bg-white/[0.02]" />
        </div>
      </main>
    </div>
  </div>
);

const DemoPage = () => {
  const navigate = useNavigate();

  const handleDemoLogin = () => {
    navigate('/login', { state: { demoCredentials } });
  };

  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pb-6 pt-16 md:px-8 md:pt-20">
        <p className="text-[0.65rem] font-medium uppercase tracking-[0.35em] text-[#6b6965]">Demo</p>
        <h1 className="font-display mt-5 max-w-2xl text-4xl font-normal text-[#f5f3f0] md:text-5xl">
          The same story as the landing page — inside the product.
        </h1>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-[#8a8884]">
          Below is a static preview of the layout you will see after login, plus the feature set we promise on the homepage.
        </p>
      </section>

      <Section tone="ethereal" className="!pt-0" eyebrow="Interface" title="Product silhouette" subtitle="">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <ProductFrame />
          <div className="space-y-6">
            <p className="text-sm leading-relaxed text-[#6b6965]">
              This mock mirrors the dashboard shell: sidebar navigation, content canvas, and the calm density we use in marketing.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button onClick={handleDemoLogin} variant="etherealSolid" className="!rounded-lg">
                Login as demo user
              </Button>
              <Button as={Link} to="/login" variant="ethereal" className="!rounded-lg">
                Go to login
              </Button>
            </div>
          </div>
        </div>
      </Section>

      <Section
        tone="ethereal"
        eyebrow="Parity"
        title="What the homepage promises — you will find here"
        subtitle="Each card matches a capability called out on the landing page."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mirrorFeatures.map((f) => (
            <Card key={f.title} tone="ethereal" title={f.title}>
              <p className="mt-3 text-xs tracking-wide text-[#5c5a57]">{f.hint}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="ethereal" eyebrow="Access" title="Demo credentials" subtitle="">
        <Card tone="ethereal" className="max-w-xl">
          <div className="space-y-3 rounded-xl border border-white/[0.08] bg-[#080809] p-5 font-mono text-sm text-[#c4c2bc]">
            <p>
              <span className="text-[#5c5a57]">email</span> {demoCredentials.email}
            </p>
            <p>
              <span className="text-[#5c5a57]">password</span> {demoCredentials.password}
            </p>
          </div>
          <p className="mt-4 text-xs text-[#5c5a57]">Use the button above to auto-fill and jump to login.</p>
        </Card>
      </Section>
    </>
  );
};

export default DemoPage;
