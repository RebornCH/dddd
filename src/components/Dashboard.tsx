import { useState } from 'react';
import {
  Shield, ArrowLeft, CheckCircle2, XCircle, Clock, AlertTriangle,
  Download, Search, Filter, RefreshCw, Eye, BarChart3,
} from 'lucide-react';

interface DashboardProps {
  onBack: () => void;
}

const mockLogs = [
  {
    id: 'log-001',
    timestamp: '2024-03-15 14:32:01',
    customerHash: 'a3f2c8d...e91b',
    status: 'SUCCESS',
    apps: ['Klaviyo', 'Gorgias', 'ReCharge'],
    duration: '4.2s',
  },
  {
    id: 'log-002',
    timestamp: '2024-03-15 13:18:45',
    customerHash: 'b7e4d1f...c23a',
    status: 'SUCCESS',
    apps: ['Klaviyo', 'Smile.io', 'Yotpo'],
    duration: '12.8s',
  },
  {
    id: 'log-003',
    timestamp: '2024-03-15 11:05:22',
    customerHash: 'c9d3e7a...f45b',
    status: 'PARTIAL_FAILURE',
    apps: ['Klaviyo', 'Gorgias'],
    duration: '45.1s',
    error: 'Gorgias: HTTP 429 rate limited (retry scheduled)',
  },
  {
    id: 'log-004',
    timestamp: '2024-03-14 22:47:10',
    customerHash: 'd2f8b4c...a67e',
    status: 'SUCCESS',
    apps: ['Klaviyo', 'ReCharge', 'Attentive'],
    duration: '6.7s',
  },
  {
    id: 'log-005',
    timestamp: '2024-03-14 18:22:33',
    customerHash: 'e5a1c9d...b82f',
    status: 'FAILED',
    apps: ['Klaviyo'],
    duration: '1h 15m',
    error: 'Klaviyo: HTTP 403 — Invalid API key',
  },
  {
    id: 'log-006',
    timestamp: '2024-03-14 15:10:08',
    customerHash: 'f3b7e2a...c94d',
    status: 'PROCESSING',
    apps: ['Klaviyo', 'Gorgias', 'ReCharge', 'Smile.io'],
    duration: '—',
  },
];

const stats = [
  { label: 'Total Erasures', value: '1,247', change: '+23 this week', icon: BarChart3, colorClass: 'text-emerald-400' },
  { label: 'Success Rate', value: '98.4%', change: '+0.2% from last month', icon: CheckCircle2, colorClass: 'text-cyan-400' },
  { label: 'Avg. Duration', value: '8.3s', change: '-1.2s improvement', icon: Clock, colorClass: 'text-blue-400' },
  { label: 'Failed (Alerted)', value: '3', change: 'All merchants notified', icon: AlertTriangle, colorClass: 'text-amber-400' },
];

const statusColors: Record<string, string> = {
  SUCCESS: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  PARTIAL_FAILURE: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  FAILED: 'bg-red-500/10 text-red-400 border-red-500/30',
  PROCESSING: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
};

const statusIcons: Record<string, typeof CheckCircle2> = {
  SUCCESS: CheckCircle2,
  PARTIAL_FAILURE: AlertTriangle,
  FAILED: XCircle,
  PROCESSING: RefreshCw,
};

export default function Dashboard({ onBack }: DashboardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const filteredLogs = mockLogs.filter((log) => {
    const matchesSearch = log.customerHash.includes(searchTerm) || log.id.includes(searchTerm);
    const matchesFilter = filterStatus === 'ALL' || log.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Top bar */}
      <div className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              <button
                onClick={onBack}
                className="flex items-center gap-1 text-sm text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to site
              </button>
              <div className="w-px h-6 bg-slate-800" />
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-slate-900" />
                </div>
                <span className="font-semibold text-sm">PrivacySync Dashboard</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500 hidden sm:block">mystore.myshopify.com</span>
              <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center">
                <span className="text-xs font-medium text-slate-400">JD</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-xl bg-slate-900/50 border border-slate-800/50 p-5">
              <div className="flex items-center justify-between mb-3">
                <stat.icon className={`w-5 h-5 ${stat.colorClass}`} />
                <span className="text-xs text-slate-500">{stat.change}</span>
              </div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-slate-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Integrations Status */}
        <div className="rounded-xl bg-slate-900/50 border border-slate-800/50 p-5 mb-8">
          <h3 className="text-sm font-semibold text-white mb-4">Connected Integrations</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { name: 'Klaviyo', status: 'connected', color: '#1FCC6B' },
              { name: 'Gorgias', status: 'connected', color: '#6B4EFF' },
              { name: 'ReCharge', status: 'connected', color: '#FF6B35' },
              { name: 'Smile.io', status: 'connected', color: '#FFB800' },
              { name: 'Yotpo', status: 'connected', color: '#2196F3' },
              { name: 'Attentive', status: 'disconnected', color: '#00C4B3' },
            ].map((app) => (
              <div key={app.name} className="flex items-center gap-2 p-2 rounded-lg bg-slate-800/50">
                <div
                  className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold"
                  style={{ backgroundColor: app.color + '20', color: app.color }}
                >
                  {app.name[0]}
                </div>
                <div>
                  <div className="text-xs font-medium text-white">{app.name}</div>
                  <div className={`text-xs ${app.status === 'connected' ? 'text-emerald-400' : 'text-slate-500'}`}>
                    {app.status === 'connected' ? '● Connected' : '○ Setup'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Erasure Logs Table */}
        <div className="rounded-xl bg-slate-900/50 border border-slate-800/50 overflow-hidden">
          <div className="p-5 border-b border-slate-800/50">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h3 className="text-sm font-semibold text-white">Erasure Audit Logs</h3>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search logs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 pr-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 w-48"
                  />
                </div>
                <div className="relative">
                  <Filter className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="pl-9 pr-8 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-sm text-white appearance-none focus:outline-none focus:border-emerald-500/50"
                  >
                    <option value="ALL">All Status</option>
                    <option value="SUCCESS">Success</option>
                    <option value="PARTIAL_FAILURE">Partial</option>
                    <option value="FAILED">Failed</option>
                    <option value="PROCESSING">Processing</option>
                  </select>
                </div>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium hover:bg-emerald-500/20 transition-colors">
                  <Download className="w-3.5 h-3.5" />
                  Export CSV
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800/50">
                  <th className="text-left text-xs font-medium text-slate-500 px-5 py-3">Timestamp</th>
                  <th className="text-left text-xs font-medium text-slate-500 px-5 py-3">Customer Hash</th>
                  <th className="text-left text-xs font-medium text-slate-500 px-5 py-3">Status</th>
                  <th className="text-left text-xs font-medium text-slate-500 px-5 py-3">Apps</th>
                  <th className="text-left text-xs font-medium text-slate-500 px-5 py-3">Duration</th>
                  <th className="text-left text-xs font-medium text-slate-500 px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map((log) => {
                  const StatusIcon = statusIcons[log.status];
                  return (
                    <tr key={log.id} className="border-b border-slate-800/30 hover:bg-slate-800/20 transition-colors">
                      <td className="px-5 py-3">
                        <span className="text-xs text-slate-400 font-mono">{log.timestamp}</span>
                      </td>
                      <td className="px-5 py-3">
                        <span className="text-xs text-slate-300 font-mono">{log.customerHash}</span>
                      </td>
                      <td className="px-5 py-3">
                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium border ${statusColors[log.status]}`}>
                          <StatusIcon className="w-3 h-3" />
                          {log.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex flex-wrap gap-1">
                          {log.apps.map((app) => (
                            <span key={app} className="px-1.5 py-0.5 rounded bg-slate-800 text-xs text-slate-400">
                              {app}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <span className="text-xs text-slate-400 font-mono">{log.duration}</span>
                      </td>
                      <td className="px-5 py-3">
                        <button className="text-slate-500 hover:text-white transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredLogs.length === 0 && (
            <div className="p-8 text-center text-sm text-slate-500">
              No logs match your search criteria.
            </div>
          )}
        </div>

        {/* Demo notice */}
        <div className="mt-6 p-4 rounded-xl bg-blue-500/5 border border-blue-500/20 text-center">
          <p className="text-xs text-blue-400">
            🎮 This is an interactive demo. In production, this dashboard would be embedded in the Shopify Admin via App Bridge 3.0.
          </p>
        </div>
      </div>
    </div>
  );
}
