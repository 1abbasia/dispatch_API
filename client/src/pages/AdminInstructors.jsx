import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Users, LayoutDashboard, ClipboardList, Settings,
  LogOut, ChevronRight, Calendar, ShieldCheck, ShieldOff,
  UserCircle2, Briefcase,
} from 'lucide-react';
import api from '../api';
import { useAuth } from '../context/AuthContext';

const DAY_ABBR = {
  monday: 'Mon', tuesday: 'Tue', wednesday: 'Wed',
  thursday: 'Thu', friday: 'Fri', saturday: 'Sat', sunday: 'Sun',
};

const SPECIALTY_COLORS = {
  Robotics:    'bg-violet-50 text-violet-700 border-violet-200',
  Coding:      'bg-blue-50 text-blue-700 border-blue-200',
  Engineering: 'bg-amber-50 text-amber-700 border-amber-200',
  Math:        'bg-emerald-50 text-emerald-700 border-emerald-200',
  Science:     'bg-cyan-50 text-cyan-700 border-cyan-200',
  Administration: 'bg-slate-100 text-slate-600 border-slate-200',
};

const AVATAR_COLORS = [
  'bg-indigo-500', 'bg-violet-500', 'bg-emerald-500',
  'bg-amber-500', 'bg-rose-500', 'bg-cyan-500',
];

function getAvailableDays(availability) {
  if (!availability) return [];
  return Object.entries(availability)
    .filter(([, slots]) => Array.isArray(slots) && slots.length > 0)
    .map(([day]) => DAY_ABBR[day] ?? day);
}

function InstructorCard({ instructor, index }) {
  const days = getAvailableDays(instructor?.availability);
  const specialtyClass = SPECIALTY_COLORS[instructor?.specialty] ?? 'bg-slate-100 text-slate-600 border-slate-200';
  const avatarColor = AVATAR_COLORS[index % AVATAR_COLORS.length];
  const initials = instructor?.name
    ? instructor.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    : '?';

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all p-6 flex flex-col gap-4">
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-xl ${avatarColor} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-slate-900 truncate">{instructor?.name ?? '—'}</h3>
          <p className="text-xs text-slate-400 truncate mt-0.5">{instructor?.email ?? ''}</p>
        </div>
        {instructor?.isFingerprinted ? (
          <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" title="Fingerprinted" />
        ) : (
          <ShieldOff className="w-4 h-4 text-slate-300 flex-shrink-0 mt-0.5" title="Not fingerprinted" />
        )}
      </div>

      {instructor?.specialty && (
        <span className={`self-start inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${specialtyClass}`}>
          {instructor.specialty}
        </span>
      )}

      {instructor?.bio && (
        <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">{instructor.bio}</p>
      )}

      {days.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <Calendar className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
          {days.map(d => (
            <span key={d} className="text-xs font-medium text-slate-600 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-md">
              {d}
            </span>
          ))}
        </div>
      )}

      {instructor?.boroughs?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1 border-t border-slate-100">
          {instructor.boroughs.map(b => (
            <span key={b} className="text-xs text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-full">
              {b}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

const NAV = [
  { icon: LayoutDashboard, label: 'Dashboard',   path: '/admin' },
  { icon: ClipboardList,   label: 'Assignments',  path: null },
  { icon: Users,           label: 'Instructors',  path: '/admin/instructors' },
  { icon: Settings,        label: 'Settings',     path: null },
];

export default function AdminInstructors() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState('');

  useEffect(() => {
    api.get('/instructors')
      .then(res => setInstructors(Array.isArray(res.data) ? res.data : []))
      .catch(() => setInstructors([]))
      .finally(() => setLoading(false));
  }, []);

  function handleLogout() { logout(); navigate('/login'); }

  function handleNav(path, label) {
    if (path) { navigate(path); return; }
    setToast(`${label} — Coming Soon`);
    setTimeout(() => setToast(''), 3000);
  }

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-800 text-white text-sm font-medium px-5 py-3 rounded-xl shadow-lg">
          {toast}
        </div>
      )}

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
          {NAV.map(({ icon: Icon, label, path }) => {
            const active = path && location.pathname === path;
            return (
              <button
                key={label}
                onClick={() => handleNav(path, label)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
                {active && <ChevronRight className="w-3 h-3 ml-auto opacity-60" />}
              </button>
            );
          })}
        </nav>

        <div className="px-3 py-4 border-t border-slate-800">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-indigo-700 flex items-center justify-center text-white text-xs font-bold uppercase">
              {user?.email?.[0] ?? 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-medium truncate">{user?.email ?? 'Admin'}</p>
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
        <div className="px-8 py-8 max-w-6xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Instructor Directory</h1>
              <p className="text-slate-500 text-sm mt-1">
                {loading ? 'Loading…' : `${instructors.length} active instructor${instructors.length !== 1 ? 's' : ''}`}
              </p>
            </div>
            <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-xl px-4 py-2">
              <Briefcase className="w-4 h-4 text-indigo-600" />
              <span className="text-sm font-semibold text-indigo-700 tabular-nums">
                {loading ? '—' : instructors.length}
              </span>
              <span className="text-xs text-indigo-500">total</span>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[0,1,2,3,4,5].map(i => (
                <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6 h-52 animate-pulse">
                  <div className="flex gap-3 mb-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl" />
                    <div className="flex-1 space-y-2 pt-1">
                      <div className="h-4 bg-slate-100 rounded w-2/3" />
                      <div className="h-3 bg-slate-100 rounded w-1/2" />
                    </div>
                  </div>
                  <div className="h-3 bg-slate-100 rounded w-1/3 mb-3" />
                  <div className="space-y-2">
                    <div className="h-3 bg-slate-100 rounded w-full" />
                    <div className="h-3 bg-slate-100 rounded w-4/5" />
                  </div>
                </div>
              ))}
            </div>
          ) : instructors.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
                <UserCircle2 className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="font-semibold text-slate-700 text-lg">No instructors found</h3>
              <p className="text-slate-400 text-sm mt-1">Active instructors will appear here once added.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {instructors.map((inst, i) => (
                <InstructorCard key={inst?._id ?? i} instructor={inst} index={i} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
