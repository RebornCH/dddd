import { Zap, Shield, RefreshCw, FileText, Bell, Lock, Server, GitBranch } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Instant Webhook Processing',
    description: 'Responds to Shopify customers/redact webhooks in under 2 seconds with HMAC verification and deduplication.',
    color: 'emerald',
  },
  {
    icon: RefreshCw,
    title: 'Multi-App Erasure Engine',
    description: 'Triggers native deletion APIs across Klaviyo, Gorgias, ReCharge, and more — all in parallel.',
    color: 'cyan',
  },
  {
    icon: Shield,
    title: 'GDPR & CCPA Compliant',
    description: 'Full compliance with Article 17 (Right to Erasure) and CCPA deletion requirements out of the box.',
    color: 'blue',
  },
  {
    icon: GitBranch,
    title: 'Exponential Backoff Retries',
    description: 'Smart retry logic (1m → 5m → 15m → 1h) via QStash queue for resilient API failure handling.',
    color: 'purple',
  },
  {
    icon: FileText,
    title: 'Immutable Audit Logs',
    description: 'Every erasure action is logged with SHA-256 hashed identifiers. Download CSV reports for auditors.',
    color: 'amber',
  },
  {
    icon: Bell,
    title: 'Instant Failure Alerts',
    description: 'Get notified via email immediately when an erasure fails permanently — no silent failures.',
    color: 'red',
  },
  {
    icon: Lock,
    title: 'Encrypted Credentials',
    description: 'All API keys stored with AES-256 encryption. Zero PII stored in plaintext. SOC 2 ready.',
    color: 'teal',
  },
  {
    icon: Server,
    title: 'Zero-Infrastructure',
    description: 'Built on Cloudflare Workers + Supabase free tiers. No servers to manage. 100K requests/day included.',
    color: 'indigo',
  },
];

const colorMap: Record<string, string> = {
  emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  red: 'bg-red-500/10 text-red-400 border-red-500/20',
  teal: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
  indigo: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
};

export default function Features() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Everything You Need for
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Zero-Touch Compliance
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Built for solo founders who need enterprise-grade privacy compliance without enterprise complexity.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-xl bg-slate-900/50 border border-slate-800/50 p-6 hover:border-slate-700/50 hover:bg-slate-900/80 transition-all duration-300"
            >
              <div className={`w-10 h-10 rounded-lg border flex items-center justify-center mb-4 ${colorMap[feature.color]}`}>
                <feature.icon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
