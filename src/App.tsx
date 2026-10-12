import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Integrations from './components/Integrations';
import Architecture from './components/Architecture';
import Dashboard from './components/Dashboard';
import Pricing from './components/Pricing';
import Footer from './components/Footer';

export default function App() {
  const [showDashboard, setShowDashboard] = useState(false);

  if (showDashboard) {
    return <Dashboard onBack={() => setShowDashboard(false)} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      <Navbar onShowDashboard={() => setShowDashboard(true)} />
      <Hero onShowDashboard={() => setShowDashboard(true)} />
      <Problem />
      <Features />
      <HowItWorks />
      <Integrations />
      <Architecture />
      <Pricing />
      <Footer />
    </div>
  );
}
