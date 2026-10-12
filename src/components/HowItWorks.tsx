import { Webhook, Database, Send, FileCheck } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Webhook,
    title: 'Webhook Ingestion',
    subtitle: '< 2 seconds',
    description: 'Shopify sends customers/redact webhook. PrivacySync verifies HMAC-SHA256, deduplicates by webhook ID, and responds 200 OK immediately.',
    details: ['HMAC SHA-256 verification', 'Webhook ID deduplication', 'HTTP 200 in <2000ms', 'Payload queued to Upstash QStash'],
    color: 'emerald',
  },
  {
    number: '02',
    icon: Database,
    title: 'Integration Lookup',
    subtitle: 'Async processing',
    description: 'Background worker queries the store\'s enabled integrations from Supabase and prepares parallel API calls to each connected service.',
    details: ['Fetches encrypted API keys', 'Resolves provider endpoints', 'Builds parallel execution plan', 'Creates audit log entry'],
    color: 'cyan',
  },
  {
    number: '03',
    icon: Send,
    title: 'Multi-App Erasure',
    subtitle: 'Parallel execution',
    description: 'Triggers native erasure APIs across all connected apps simultaneously. For apps without APIs, dispatches legally compliant deletion emails.',
    details: ['Klaviyo: data-privacy-erasure-tasks', 'Gorgias: DELETE /api/customers/{id}', 'ReCharge: POST /v1/customers/anonimizer', 'Fallback: Resend email to vendor'],
    color: 'blue',
  },
  {
    number: '04',
    icon: FileCheck,
    title: 'Audit & Reporting',
    subtitle: 'Immutable trail',
    description: 'Every action is logged with SHA-256 hashed identifiers. Failed erasures trigger exponential backoff retries and merchant alert emails.',
    details: ['Immutable erasure_logs table', 'SHA-256 hashed customer IDs', 'CSV export for auditors', 'Email alerts on permanent failure'],
    color: 'purple',
  },
];

const colorStyles: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30', glow: 'shadow-emerald-500/20' },
  cyan: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/30', glow: 'shadow-cyan-500/20' },
  blue: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30', glow: 'shadow-blue-500/20' },
  purple: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/30', glow: 'shadow-purple-500/20' },
};

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            How PrivacySync Works
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            From webhook to full erasure in four automated steps — no human intervention required.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {steps.map((step) => {
            const style = colorStyles[step.color];
            return (
              <div
                key={step.number}
                className={`relative rounded-2xl bg-slate-900/50 border border-slate-800/50 p-8 hover:border-slate-700/50 transition-all duration-300`}
              >
                {/* Step number */}
                <div className="absolute -top-4 -left-2 text-6xl font-black text-slate-800/50 select-none">
                  {step.number}
                </div>

                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-lg ${style.bg} ${style.border} border flex items-center justify-center`}>
                      <step.icon className={`w-5 h-5 ${style.text}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{step.title}</h3>
                      <span className={`text-xs font-medium ${style.text}`}>{step.subtitle}</span>
                    </div>
                  </div>

                  <p className="text-sm text-slate-400 mb-4 leading-relaxed">{step.description}</p>

                  <div className="space-y-2">
                    {step.details.map((detail) => (
                      <div key={detail} className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${style.text}`} />
                        <span className="text-xs text-slate-500 font-mono">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Flow connector */}
        <div className="hidden md:flex items-center justify-center mt-8 gap-2">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-emerald-500/50" />
          <span className="text-xs text-slate-500 font-mono">customers/redact → verify → queue → execute → audit</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-purple-500/50" />
        </div>
      </div>
    </section>
  );
}
