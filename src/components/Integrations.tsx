const integrations = [
  {
    name: 'Klaviyo',
    category: 'Email Marketing',
    method: 'Native API',
    endpoint: 'POST /api/data-privacy-erasure-tasks/',
    status: 'active',
    color: '#1FCC6B',
  },
  {
    name: 'Gorgias',
    category: 'Help Desk',
    method: 'Native API',
    endpoint: 'DELETE /api/customers/{id}',
    status: 'active',
    color: '#6B4EFF',
  },
  {
    name: 'ReCharge',
    category: 'Subscriptions',
    method: 'Native API',
    endpoint: 'POST /v1/customers/anonimizer',
    status: 'active',
    color: '#FF6B35',
  },
  {
    name: 'Smile.io',
    category: 'Loyalty',
    method: 'Email Fallback',
    endpoint: 'privacy@smile.io',
    status: 'active',
    color: '#FFB800',
  },
  {
    name: 'Yotpo',
    category: 'Reviews',
    method: 'Email Fallback',
    endpoint: 'privacy@yotpo.com',
    status: 'active',
    color: '#2196F3',
  },
  {
    name: 'Attentive',
    category: 'SMS Marketing',
    method: 'Native API',
    endpoint: 'DELETE /v1/subscribers/unsubscribe',
    status: 'active',
    color: '#00C4B3',
  },
  {
    name: 'Omnisend',
    category: 'Email Marketing',
    method: 'Native API',
    endpoint: 'DELETE /v3/customers/{id}',
    status: 'coming_soon',
    color: '#E63B2E',
  },
  {
    name: 'Judge.me',
    category: 'Reviews',
    method: 'Email Fallback',
    endpoint: 'privacy@judge.me',
    status: 'coming_soon',
    color: '#FF5722',
  },
];

export default function Integrations() {
  return (
    <section id="integrations" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Pre-Built Integrations
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Native API erasure for major apps. Automatic email fallback for the rest. Covers your entire Shopify stack.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {integrations.map((integration) => (
            <div
              key={integration.name}
              className="group rounded-xl bg-slate-900/50 border border-slate-800/50 p-5 hover:border-slate-700/50 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                  style={{ backgroundColor: integration.color + '20', color: integration.color }}
                >
                  {integration.name[0]}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">{integration.name}</h3>
                  <p className="text-xs text-slate-500">{integration.category}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${
                    integration.method === 'Native API'
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : 'bg-amber-500/10 text-amber-400'
                  }`}>
                    {integration.method}
                  </span>
                  <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${
                    integration.status === 'active'
                      ? 'bg-blue-500/10 text-blue-400'
                      : 'bg-slate-500/10 text-slate-400'
                  }`}>
                    {integration.status === 'active' ? 'Live' : 'Soon'}
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-mono truncate">{integration.endpoint}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500">
            Need a custom integration? PrivacySync supports any app with a REST API or email-based deletion process.
          </p>
        </div>
      </div>
    </section>
  );
}
