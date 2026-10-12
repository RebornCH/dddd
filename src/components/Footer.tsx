import { Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
                <Shield className="w-4 h-4 text-slate-900" />
              </div>
              <span className="text-lg font-bold text-white">PrivacySync</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Automated GDPR/CCPA compliance for Shopify stores. Protect your brand from legal fines with zero-effort data erasure.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="text-sm text-slate-400 hover:text-white transition-colors">Features</a></li>
              <li><a href="#integrations" className="text-sm text-slate-400 hover:text-white transition-colors">Integrations</a></li>
              <li><a href="#pricing" className="text-sm text-slate-400 hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#architecture" className="text-sm text-slate-400 hover:text-white transition-colors">Architecture</a></li>
              <li><span className="text-sm text-slate-400 hover:text-white transition-colors cursor-pointer">Changelog</span></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><span className="text-sm text-slate-400 hover:text-white transition-colors cursor-pointer">Privacy Policy</span></li>
              <li><span className="text-sm text-slate-400 hover:text-white transition-colors cursor-pointer">Terms of Service</span></li>
              <li><span className="text-sm text-slate-400 hover:text-white transition-colors cursor-pointer">GDPR Compliance</span></li>
              <li><span className="text-sm text-slate-400 hover:text-white transition-colors cursor-pointer">Data Processing Agreement</span></li>
              <li><span className="text-sm text-slate-400 hover:text-white transition-colors cursor-pointer">Security</span></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><span className="text-sm text-slate-400 hover:text-white transition-colors cursor-pointer">Documentation</span></li>
              <li><span className="text-sm text-slate-400 hover:text-white transition-colors cursor-pointer">API Reference</span></li>
              <li><span className="text-sm text-slate-400 hover:text-white transition-colors cursor-pointer">Support</span></li>
              <li><span className="text-sm text-slate-400 hover:text-white transition-colors cursor-pointer">Status Page</span></li>
              <li><span className="text-sm text-slate-400 hover:text-white transition-colors cursor-pointer">Blog</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-slate-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © 2024 PrivacySync. All rights reserved. Not affiliated with Shopify Inc.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-600">Built with</span>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-xs text-slate-500 bg-slate-800/50 border border-slate-700/50">Cloudflare</span>
              <span className="px-2 py-0.5 rounded text-xs text-slate-500 bg-slate-800/50 border border-slate-700/50">Supabase</span>
              <span className="px-2 py-0.5 rounded text-xs text-slate-500 bg-slate-800/50 border border-slate-700/50">Remix</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
