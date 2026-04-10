import React from 'react';
import Card from '../../components/ui/Card';
import Section from '../../components/ui/Section';

const sections = [
  {
    title: 'Admin Dashboard',
    description: 'Central command center for end-to-end society operations.',
    bullets: ['Operational visibility', 'Role and access control', 'Incident and emergency monitoring'],
  },
  {
    title: 'Resident Features',
    description: 'A resident-first experience designed for convenience.',
    bullets: ['Complaints with status', 'Service requests', 'Rent and maintenance touchpoints'],
  },
  {
    title: 'Worker Panel',
    description: 'A focused workflow interface for field execution.',
    bullets: ['Task queue', 'Status updates', 'Completion history'],
  },
  {
    title: 'Smart Assignment System',
    description: 'Distribution of requests to available workers.',
    bullets: ['Priority-aware routing', 'Shorter response loops', 'Clear accountability'],
  },
  {
    title: 'Security & Visitor Management',
    description: 'Control and monitor access across the society premises.',
    bullets: ['Visitor and delivery checks', 'Security camera hooks', 'Emergency escalation'],
  },
];

const FeaturesPage = () => {
  return (
    <Section
      tone="ethereal"
      eyebrow="Features"
      title="Capability, spelled out"
      subtitle="The same modules you see on the landing page — here with a little more detail."
    >
      <div className="space-y-5">
        {sections.map((section) => (
          <Card key={section.title} tone="ethereal" title={section.title} description={section.description}>
            <ul className="mt-5 space-y-2.5 text-sm text-[#8a8884]">
              {section.bullets.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-2 h-px w-6 shrink-0 bg-[#c4c2bc]/25" />
                  {point}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </Section>
  );
};

export default FeaturesPage;
