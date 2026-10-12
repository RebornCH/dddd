import { ArrowRight, Shield, Zap, Clock } from 'lucide-react';

interface HeroProps {
  onShowDashboard: () => void;
}

export default function Hero({ onShowDashboard }: HeroProps) {
  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-8">
          <Shield className="w-4 h-4" />
          <span>GDPR & CCPA Compliant</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight text-white mb-6 leading-tight">
          Automated Privacy
          <br />
          <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Compliance for Shopify
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
          Set it and forget it. Automatically sync customer data erasure requests across your entire 
          marketing and operational app stack — Klaviyo, Gorgias, ReCharge & more — in under 60 seconds.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#pricing"
            className="group flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-900 font-semibold px-8 py-4 rounded-xl text-lg hover:opacity-90 transition-all shadow-lg shadow-emerald-500/20"
          >
            Start 7-Day Free Trial
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <button
            onClick={onShowDashboard}
            className="flex items-center gap-2 border border-slate-700 text-slate-300 font-medium px-8 py-4 rounded-xl text-lg hover:bg-slate-800/50 hover:border-slate-600 transition-all"
          >
            <Zap className="w-5 h-5 text-emerald-400" />
            View Live Demo
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
          <div className="flex flex-col items-center p-4 rounded-xl bg-slate-900/50 border border-slate-800/50">
            <Clock className="w-6 h-6 text-emerald-400 mb-2" />
            <span className="text-2xl font-bold text-white">&lt;60s</span>
            <span className="text-sm text-slate-400">Avg. Erasure Time</span>
          </div>
          <div className="flex flex-col items-center p-4 rounded-xl bg-slate-900/50 border border-slate-800/50">
            <Shield className="w-6 h-6 text-cyan-400 mb-2" />
            <span className="text-2xl font-bold text-white">100%</span>
            <span className="text-sm text-slate-400">Compliance Coverage</span>
          </div>
          <div className="flex flex-col items-center p-4 rounded-xl bg-slate-900/50 border border-slate-800/50">
            <Zap className="w-6 h-6 text-blue-400 mb-2" />
            <span className="text-2xl font-bold text-white">$0</span>
            <span className="text-sm text-slate-400">Setup Cost</span>
          </div>
        </div>

        {/* Code snippet preview */}
        <div className="mt-16 max-w-3xl mx-auto">
          <div className="rounded-xl bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl shadow-black/50">
            <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/50 border-b border-slate-700/50">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-2 text-xs text-slate-500 font-mono">webhook → customers/redact</span>
            </div>
            <div className="p-6 text-left font-mono text-sm overflow-x-auto">
              <div className="text-slate-500">// Shopify sends webhook → PrivacySync handles the rest</div>
              <div className="mt-2">
                <span className="text-purple-400">POST</span>
                <span className="text-slate-300"> /api/webhooks/shopify/privacy/redact</span>
              </div>
              <div className="mt-1">
                <span className="text-slate-500">// ✓ HMAC verified</span>
                <span className="text-slate-500 ml-4">// ✓ Deduplicated</span>
              </div>
              <div className="mt-1">
                <span className="text-emerald-400">→ 200 OK</span>
                <span className="text-slate-400"> returned to Shopify in {'<'}2000ms</span>
              </div>
              <div className="mt-3 text-slate-500">// Async: triggering erasure across 4 integrations...</div>
              <div className="mt-1">
                <span className="text-cyan-400">  ✓ Klaviyo</span>
                <span className="text-slate-400"> — data-privacy-erasure-tasks</span>
              </div>
              <div className="mt-1">
                <span className="text-cyan-400">  ✓ Gorgias</span>
                <span className="text-slate-400"> — DELETE /api/customers/&#123;id&#125;</span>
              </div>
              <div className="mt-1">
                <span className="text-cyan-400">  ✓ ReCharge</span>
                <span className="text-slate-400"> — POST /v1/customers/anonimizer</span>
              </div>
              <div className="mt-1">
                <span className="text-yellow-400">  ⚡ Smile.io</span>
                <span className="text-slate-400"> — email dispatched to privacy@smile.io</span>
              </div>
              <div className="mt-3">
                <span className="text-emerald-400">✓ Audit log created</span>
                <span className="text-slate-400"> — status: SUCCESS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
