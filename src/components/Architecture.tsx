import { Server, Database, Mail, Cloud, Lock } from 'lucide-react';

export default function Architecture() {
  return (
    <section id="architecture" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Zero-Cost Technical Architecture
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Production-grade infrastructure on entirely free tiers. Built for solo founders scaling to thousands of stores.
          </p>
        </div>

        {/* Architecture Diagram */}
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl bg-slate-900/80 border border-slate-800/50 p-8 overflow-x-auto">
            <div className="min-w-[700px]">
              {/* Layer 1: Shopify */}
              <div className="flex items-center justify-center mb-6">
                <div className="px-6 py-3 rounded-xl bg-green-500/10 border border-green-500/30 text-center">
                  <div className="text-sm font-semibold text-green-400">Shopify Store</div>
                  <div className="text-xs text-slate-500 mt-1">customers/redact webhook</div>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center mb-6">
                <div className="flex flex-col items-center">
                  <div className="w-px h-8 bg-gradient-to-b from-green-500/50 to-emerald-500/50" />
                  <div className="text-xs text-slate-600 font-mono">HMAC verified</div>
                  <div className="w-px h-8 bg-gradient-to-b from-emerald-500/50 to-cyan-500/50" />
                </div>
              </div>

              {/* Layer 2: Cloudflare Workers */}
              <div className="rounded-xl bg-slate-800/50 border border-slate-700/50 p-6 mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <Cloud className="w-5 h-5 text-orange-400" />
                  <span className="text-sm font-semibold text-white">Cloudflare Workers (Free: 100K req/day)</span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="rounded-lg bg-slate-900/80 border border-slate-700/30 p-3 text-center">
                    <div className="text-xs font-medium text-emerald-400">Webhook Handler</div>
                    <div className="text-xs text-slate-500 mt-1">Verify + Queue</div>
                  </div>
                  <div className="rounded-lg bg-slate-900/80 border border-slate-700/30 p-3 text-center">
                    <div className="text-xs font-medium text-cyan-400">Erasure Worker</div>
                    <div className="text-xs text-slate-500 mt-1">Execute APIs</div>
                  </div>
                  <div className="rounded-lg bg-slate-900/80 border border-slate-700/30 p-3 text-center">
                    <div className="text-xs font-medium text-blue-400">Retry Scheduler</div>
                    <div className="text-xs text-slate-500 mt-1">Backoff logic</div>
                  </div>
                </div>
              </div>

              {/* Layer 3: Queue + DB */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="rounded-xl bg-slate-800/50 border border-slate-700/50 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Server className="w-4 h-4 text-purple-400" />
                    <span className="text-xs font-semibold text-white">Upstash QStash (Free: 10K/day)</span>
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs text-slate-400 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-400" />
                      Async job queue
                    </div>
                    <div className="text-xs text-slate-400 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-400" />
                      Delayed retries (1m/5m/15m/1h)
                    </div>
                    <div className="text-xs text-slate-400 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-400" />
                      Rate limit backoff
                    </div>
                  </div>
                </div>
                <div className="rounded-xl bg-slate-800/50 border border-slate-700/50 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Database className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-semibold text-white">Supabase PostgreSQL (Free: 500MB)</span>
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs text-slate-400 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      shops + integrations tables
                    </div>
                    <div className="text-xs text-slate-400 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      erasure_logs (immutable)
                    </div>
                    <div className="text-xs text-slate-400 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      RLS + encrypted credentials
                    </div>
                  </div>
                </div>
              </div>

              {/* Layer 4: Downstream */}
              <div className="rounded-xl bg-slate-800/50 border border-slate-700/50 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Lock className="w-4 h-4 text-amber-400" />
                  <span className="text-sm font-semibold text-white">Downstream Erasure Targets</span>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  <div className="rounded-lg bg-slate-900/80 border border-slate-700/30 p-2 text-center">
                    <div className="text-xs font-medium text-green-400">Klaviyo</div>
                    <div className="text-xs text-slate-600">API</div>
                  </div>
                  <div className="rounded-lg bg-slate-900/80 border border-slate-700/30 p-2 text-center">
                    <div className="text-xs font-medium text-purple-400">Gorgias</div>
                    <div className="text-xs text-slate-600">API</div>
                  </div>
                  <div className="rounded-lg bg-slate-900/80 border border-slate-700/30 p-2 text-center">
                    <div className="text-xs font-medium text-orange-400">ReCharge</div>
                    <div className="text-xs text-slate-600">API</div>
                  </div>
                  <div className="rounded-lg bg-slate-900/80 border border-slate-700/30 p-2 text-center">
                    <Mail className="w-4 h-4 text-amber-400 mx-auto" />
                    <div className="text-xs text-slate-600 mt-1">Email</div>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <Mail className="w-3 h-3 text-slate-500" />
                  <span className="text-xs text-slate-500">Resend (Free: 3K emails/mo) — Audit notifications & fallback emails</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Stack Badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          {[
            { name: 'Remix / Next.js', color: 'text-white bg-slate-800' },
            { name: 'Cloudflare Workers', color: 'text-orange-400 bg-orange-500/10' },
            { name: 'Supabase', color: 'text-emerald-400 bg-emerald-500/10' },
            { name: 'Upstash QStash', color: 'text-purple-400 bg-purple-500/10' },
            { name: 'Shopify App Bridge 3.0', color: 'text-green-400 bg-green-500/10' },
            { name: 'Resend', color: 'text-blue-400 bg-blue-500/10' },
            { name: 'Shopify Billing API', color: 'text-cyan-400 bg-cyan-500/10' },
          ].map((tech) => (
            <span key={tech.name} className={`px-3 py-1.5 rounded-full text-xs font-medium ${tech.color} border border-slate-700/50`}>
              {tech.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
