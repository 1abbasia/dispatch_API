import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DollarSign, Briefcase, Users, LayoutDashboard,
  ClipboardList, Settings, LogOut, TrendingUp, ChevronRight,
} from 'lucide-react';
import api from '../api';
import { useAuth } from '../context/AuthContext';

function formatTime(num) {
  const h = Math.floor(num / 100);
  const m = num % 100;
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, '0')} ${ampm}`;
}

function Toast({ msg, onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 3000); return () => clearTimeout(t); }, [onDone]);
  return (
    <div className="fixed bottom-6 right-6 z-50 bg-slate-800 text-white text-sm font-medium px-5 py-3 rounded-xl shadow-lg animate-fade-in">
      {msg}
    </div>
  );
}

function KpiCard({ icon: Icon, label, value, valueClass = 'text-slate-900', sub, accent }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-500">{label}</span>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${accent}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
      <div>
        <p className={`text-3xl font-bold tracking-tight ${valueClass}`}>{value}</p>
        {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
      </div>
      <div className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
        <TrendingUp className="w-3 h-3" />
        Live data
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const cfg = {
    Open: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Staffed: 'bg-blue-50 text-blue-700 border-blue-200',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${cfg[status] || 'bg-slate-100 text-slate-600 border-slate-200'}`}>
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${status === 'Open' ? 'bg-emerald-500' : 'bg-blue-500'}`} />
      {status}
    </span>
  );
}

const NAV = [
  { icon: LayoutDashboard, label: 'Dashboard', key: 'dashboard' },
  { icon: ClipboardList, label: 'Assignments', key: 'assignments' },
  { icon: Users, label: 'Instructors', key: 'instructors' },
  { icon: Settings, label: 'Settings', key: 'settings' },
];

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeNav, setActiveNav] = useState('dashboard');
  const [toast, setToast] = useState('');

  useEffect(() => {
    Promise.all([
      api.get('/instructors/stats'),
      api.get('/assignments/open'),
    ]).then(([statsRes, jobsRes]) => {
      setStats(statsRes.data ?? null);
      setJobs(Array.isArray(jobsRes.data) ? jobsRes.data : []);
    }).catch(() => {
      setStats(null);
      setJobs([]);
    }).finally(() => setLoading(false));
  }, []);

  function handleLogout() {
    logout();
    navigate('/login');
  }

  function handleNavClick(key) {
    if (key === 'dashboard') { setActiveNav('dashboard'); return; }
    setToast(`${key.charAt(0).toUpperCase() + key.slice(1)} — Coming Soon`);
  }

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      {toast && <Toast msg={toast} onDone={() => setToast('')} />}

      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-slate-900 flex flex-col">
        <div className="px-6 py-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <LayoutDashboard className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">STEM Dispatch</p>
              <p className="text-slate-500 text-xs">Admin Console</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {NAV.map(({ icon: Icon, label, key }) => (
            <button
              key={key}
              onClick={() => handleNavClick(key)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeNav === key
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
              {activeNav === key && <ChevronRight className="w-3 h-3 ml-auto opacity-60" />}
            </button>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-slate-800">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-indigo-700 flex items-center justify-center text-white text-xs font-bold uppercase">
              {user?.email?.[0] || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-medium truncate">{user?.email || 'Admin'}</p>
              <p className="text-slate-500 text-xs capitalize">{user?.role}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        <div className="px-8 py-8 max-w-6xl mx-auto space-y-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Overview</h1>
            <p className="text-slate-500 text-sm mt-1">Real-time operational metrics</p>
          </div>

          {loading ? (
            <div className="grid grid-cols-3 gap-5">
              {[0, 1, 2].map(i => (
                <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6 h-36 animate-pulse">
                  <div className="h-4 bg-slate-100 rounded w-1/2 mb-4" />
                  <div className="h-8 bg-slate-100 rounded w-1/3" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-5">
              <KpiCard
                icon={DollarSign}
                label="Revenue at Risk"
                value={stats?.revenueAtRisk != null ? `$${stats.revenueAtRisk.toLocaleString()}` : '--'}
                valueClass="text-red-600"
                sub="Unstaffed open assignments"
                accent="bg-red-500"
              />
              <KpiCard
                icon={Briefcase}
                label="Total Open Jobs"
                value={stats?.unstaffedCount != null ? stats.unstaffedCount.toLocaleString() : '--'}
                sub="Awaiting instructor assignment"
                accent="bg-indigo-600"
              />
              <KpiCard
                icon={Users}
                label="Active Instructors"
                value={stats?.activeInstructorCount != null ? stats.activeInstructorCount.toLocaleString() : '--'}
                sub="Registered & active"
                accent="bg-violet-600"
              />
            </div>
          )}

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-slate-900">Assignment Master List</h2>
                <p className="text-xs text-slate-400 mt-0.5">{jobs.length} total records</p>
              </div>
              <span className="text-xs font-medium bg-indigo-50 text-indigo-600 border border-indigo-100 px-3 py-1 rounded-full">
                Live
              </span>
            </div>

            {loading ? (
              <div className="p-6 space-y-3">
                {[0, 1, 2, 3].map(i => (
                  <div key={i} className="h-12 bg-slate-50 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">School</th>
                      <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Borough</th>
                      <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Day</th>
                      <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Time</th>
                      <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Revenue</th>
                      <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {jobs.map((job) => (
                      <tr key={job._id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-slate-900">{job.schoolName}</td>
                        <td className="px-6 py-4 text-slate-600">{job.borough}</td>
                        <td className="px-6 py-4 text-slate-600 capitalize">{job.dayOfWeek}</td>
                        <td className="px-6 py-4 text-slate-600 tabular-nums">
                          {formatTime(job.startTime)} – {formatTime(job.endTime)}
                        </td>
                        <td className="px-6 py-4 font-semibold text-slate-900 tabular-nums">
                          ${job.revenueValue?.toLocaleString() || '0'}
                        </td>
                        <td className="px-6 py-4">
                          <StatusBadge status={job.status} />
                        </td>
                      </tr>
                    ))}
                    {jobs.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-slate-400 text-sm">
                          No open assignments found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
