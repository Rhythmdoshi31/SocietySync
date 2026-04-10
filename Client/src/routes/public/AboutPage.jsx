import React from 'react';
import Card from '../../components/ui/Card';
import Section from '../../components/ui/Section';

const AboutPage = () => {
  return (
    <Section
      tone="ethereal"
      eyebrow="About"
      title="Infrastructure for community living"
      subtitle="We build software that respects how societies actually operate — calm surfaces, firm process."
    >
      <div className="grid gap-5 md:grid-cols-3">
        <Card tone="ethereal" title="Vision" description="Digitize society management without drowning teams in tools." />
        <Card tone="ethereal" title="Tension we solve" description="Scattered updates, slow handoffs, and unclear ownership." />
        <Card tone="ethereal" title="Principle" description="One product voice — distinct roles, shared context." />
      </div>
    </Section>
  );
};

export default AboutPage;
