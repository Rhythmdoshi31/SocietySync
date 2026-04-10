import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Section from '../../components/ui/Section';

const plans = [
  {
    name: 'Community',
    price: '\u20B92,499',
    period: '/ society / month',
    blurb: 'For smaller layouts getting organized.',
    features: ['Up to 120 units', 'Resident & admin apps', 'Complaints & services', 'Email support'],
    cta: 'Start trial',
    href: '/demo',
    highlight: false,
  },
  {
    name: 'Estate',
    price: '\u20B95,900',
    period: '/ society / month',
    blurb: 'For active societies with security and vendors.',
    features: [
      'Everything in Community',
      'Worker assignments & routing',
      'Visitor & delivery flows',
      'Priority support',
    ],
    cta: 'Talk to us',
    href: 'mailto:hello@societysync.com',
    highlight: true,
  },
  {
    name: 'Portfolio',
    price: 'Custom',
    period: '',
    blurb: 'Builders and facility managers across multiple sites.',
    features: ['Multi-society rollouts', 'SSO & audit options', 'Dedicated success', 'Custom integrations'],
    cta: 'Contact sales',
    href: 'mailto:hello@societysync.com',
    highlight: false,
  },
];

const PricingPage = () => {
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pb-8 pt-16 md:px-8 md:pt-20">
        <p className="text-[0.65rem] font-medium uppercase tracking-[0.35em] text-[#6b6965]">Pricing</p>
        <h1 className="font-display mt-5 max-w-2xl text-4xl font-normal text-[#f5f3f0] md:text-5xl">Clear tiers. No theatrics.</h1>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-[#8a8884]">
          Choose a lane that matches how your society runs today. You can move up when operations grow.
        </p>
      </section>

      <Section tone="ethereal" className="!pt-0" contentClassName="!mt-0">
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border p-8 transition-all duration-500 ${
                plan.highlight
                  ? 'border-white/[0.14] bg-gradient-to-b from-white/[0.07] to-white/[0.02] shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset]'
                  : 'border-white/[0.08] bg-white/[0.02] hover:border-white/[0.11]'
              }`}
            >
              {plan.highlight ? (
                <span className="absolute -top-3 left-8 rounded-full border border-white/10 bg-[#0a0a0b] px-3 py-0.5 text-[0.6rem] font-medium uppercase tracking-[0.2em] text-[#c4c2bc]">
                  Most chosen
                </span>
              ) : null}
              <p className="font-display text-2xl text-[#f0eeeb]">{plan.name}</p>
              <p className="mt-2 text-sm text-[#6b6965]">{plan.blurb}</p>
              <div className="mt-8 flex items-baseline gap-1">
                <span className="font-display text-4xl text-[#e8e6e3]">{plan.price}</span>
                {plan.period ? <span className="text-sm text-[#5c5a57]">{plan.period}</span> : null}
              </div>
              <ul className="mt-8 flex-1 space-y-3 border-t border-white/[0.06] pt-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-3 text-sm text-[#a8a6a1]">
                    <span className="mt-2 h-px w-4 shrink-0 bg-[#c4c2bc]/30" aria-hidden />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                {plan.href.startsWith('mailto') ? (
                  <Button as="a" href={plan.href} variant={plan.highlight ? 'etherealSolid' : 'ethereal'} className="w-full !rounded-lg">
                    {plan.cta}
                  </Button>
                ) : (
                  <Button as={Link} to={plan.href} variant={plan.highlight ? 'etherealSolid' : 'ethereal'} className="w-full !rounded-lg">
                    {plan.cta}
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <section className="mx-auto max-w-6xl px-6 pb-24 md:px-8">
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] px-8 py-10 md:flex md:items-center md:justify-between md:px-12">
          <div>
            <p className="font-display text-xl text-[#e8e6e3]">Questions before you commit?</p>
            <p className="mt-2 text-sm text-[#6b6965]">We reply within one business day.</p>
          </div>
          <a
            href="mailto:hello@societysync.com"
            className="mt-6 inline-block text-sm text-[#c4c2bc] underline decoration-white/15 underline-offset-4 transition-colors hover:text-[#f0eeeb] md:mt-0"
          >
            hello@societysync.com
          </a>
        </div>
      </section>
    </>
  );
};

export default PricingPage;
