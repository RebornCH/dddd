import { useState } from 'react';
import { Shield, Menu, X } from 'lucide-react';

interface NavbarProps {
  onShowDashboard: () => void;
}

export default function Navbar({ onShowDashboard }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
              <Shield className="w-5 h-5 text-slate-900" />
            </div>
            <span className="text-xl font-bold text-white">PrivacySync</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-slate-300 hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm text-slate-300 hover:text-white transition-colors">How It Works</a>
            <a href="#integrations" className="text-sm text-slate-300 hover:text-white transition-colors">Integrations</a>
            <a href="#architecture" className="text-sm text-slate-300 hover:text-white transition-colors">Architecture</a>
            <a href="#pricing" className="text-sm text-slate-300 hover:text-white transition-colors">Pricing</a>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onShowDashboard}
              className="text-sm text-slate-300 hover:text-white transition-colors px-3 py-1.5"
            >
              Live Demo
            </button>
            <a
              href="#pricing"
              className="text-sm font-medium bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-900 px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
            >
              Start Free Trial
            </a>
          </div>

          <button
            className="md:hidden text-slate-300"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 py-4 space-y-3">
          <a href="#features" className="block text-sm text-slate-300 hover:text-white">Features</a>
          <a href="#how-it-works" className="block text-sm text-slate-300 hover:text-white">How It Works</a>
          <a href="#integrations" className="block text-sm text-slate-300 hover:text-white">Integrations</a>
          <a href="#architecture" className="block text-sm text-slate-300 hover:text-white">Architecture</a>
          <a href="#pricing" className="block text-sm text-slate-300 hover:text-white">Pricing</a>
          <button
            onClick={() => { onShowDashboard(); setMobileOpen(false); }}
            className="block text-sm text-emerald-400 hover:text-emerald-300"
          >
            Live Demo Dashboard
          </button>
          <a
            href="#pricing"
            className="block text-center text-sm font-medium bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-900 px-4 py-2 rounded-lg"
          >
            Start Free Trial
          </a>
        </div>
      )}
    </nav>
  );
}
