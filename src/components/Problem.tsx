import { AlertTriangle, Mail, Clock, DollarSign } from 'lucide-react';

export default function Problem() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            The <span className="text-red-400">Hidden Compliance Risk</span> in Your Shopify Stack
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Every customer deletion request exposes you to legal risk across your entire app ecosystem.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* The Problem */}
          <div className="rounded-2xl bg-gradient-to-br from-red-950/30 to-slate-900 border border-red-900/30 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-white">The Problem</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <Mail className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-slate-300">Customer requests data erasure via GDPR/CCPA</p>
                  <p className="text-sm text-slate-500 mt-1">Shopify sends a webhook to your store</p>
                </div>
              </li>
              <li className="flex gap-3">
                <Clock className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-slate-300">PII exists in 5-10 third-party apps</p>
                  <p className="text-sm text-slate-500 mt-1">Klaviyo, Gorgias, ReCharge, Smile.io, Yotpo...</p>
                </div>
              </li>
              <li className="flex gap-3">
                <Mail className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-slate-300">Manual emails to each vendor's privacy team</p>
                  <p className="text-sm text-slate-500 mt-1">Slow, error-prone, no proof of compliance</p>
                </div>
              </li>
              <li className="flex gap-3">
                <DollarSign className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-slate-300">Fines up to 4% of annual global turnover</p>
                  <p className="text-sm text-slate-500 mt-1">Under GDPR — or $7,500/violation under CCPA</p>
                </div>
              </li>
            </ul>
          </div>

          {/* The Solution */}
          <div className="rounded-2xl bg-gradient-to-br from-emerald-950/30 to-slate-900 border border-emerald-900/30 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <span className="text-emerald-400 text-xl">✓</span>
              </div>
              <h3 className="text-xl font-bold text-white">PrivacySync Solution</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="text-emerald-400 mt-0.5 shrink-0">①</span>
                <div>
                  <p className="text-slate-300">Listens to Shopify privacy webhooks automatically</p>
                  <p className="text-sm text-slate-500 mt-1">HMAC-verified, deduplicated, instant response</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-400 mt-0.5 shrink-0">②</span>
                <div>
                  <p className="text-slate-300">Triggers native erasure APIs across all connected apps</p>
                  <p className="text-sm text-slate-500 mt-1">Klaviyo, Gorgias, ReCharge — via direct API calls</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-400 mt-0.5 shrink-0">③</span>
                <div>
                  <p className="text-slate-300">Auto-sends compliant deletion emails for apps without APIs</p>
                  <p className="text-sm text-slate-500 mt-1">Legally formatted, tracked, and logged</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-400 mt-0.5 shrink-0">④</span>
                <div>
                  <p className="text-slate-300">Immutable audit trail with downloadable CSV reports</p>
                  <p className="text-sm text-slate-500 mt-1">Ready for GDPR auditors at any time</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
