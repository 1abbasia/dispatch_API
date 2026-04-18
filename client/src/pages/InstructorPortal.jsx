import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapPin, DollarSign, Calendar, Clock, CheckCircle,
  Briefcase, LogOut, Loader2, GraduationCap,
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

function Toast({ msg, type = 'success', onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 3500); return () => clearTimeout(t); }, [onDone]);
  const colors = type === 'error'
    ? 'bg-red-600 text-white'
    : 'bg-emerald-600 text-white';
  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3.5 rounded-xl shadow-xl text-sm font-medium ${colors}`}>
      {type === 'success' && <CheckCircle className="w-4 h-4 flex-shrink-0" />}
      {msg}
    </div>
  );
}

function JobCard({ job, onClaim }) {
  const [claiming, setClaiming] = useState(false);

  async function handleClaim() {
    setClaiming(true);
    await onClaim(job._id);
    setClaiming(false);
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all p-6 flex flex-col gap-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0">
            <GraduationCap className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 leading-tight">{job.schoolName}</h3>
            <span className="text-xs text-slate-400 font-medium">Assignment</span>
          </div>
        </div>
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 flex-shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5" />
          Open
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
          <span>{job.borough}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Calendar className="w-4 h-4 text-slate-400 flex-shrink-0" />
          <span className="capitalize">{job.dayOfWeek}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Clock className="w-4 h-4 text-slate-400 flex-shrink-0" />
          <span className="tabular-nums">{formatTime(job.startTime)} – {formatTime(job.endTime)}</span>
        </div>
        <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700">
          <DollarSign className="w-4 h-4 text-emerald-500 flex-shrink-0" />
          <span className="tabular-nums">${job.revenueValue?.toLocaleString() || '0'}</span>
        </div>
      </div>

      <button
        onClick={handleClaim}
        disabled={claiming}
        className="mt-auto w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-medium py-2.5 rounded-xl text-sm transition-colors"
      >
        {claiming ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> Claiming…</>
        ) : (
          <><CheckCircle className="w-4 h-4" /> Claim Job</>
        )}
      </button>
    </div>
  );
}

export default function InstructorPortal() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    api.get('/assignments/open')
      .then(res => setJobs(Array.isArray(res.data) ? res.data : []))
      .catch(() => setJobs([]))
      .finally(() => setLoading(false));
  }, []);

  const handleClaim = useCallback(async (id) => {
    try {
      await api.patch(`/assignments/claim/${id}`);
      setJobs(prev => prev.filter(j => j._id !== id));
      setToast({ msg: 'Job claimed successfully!', type: 'success' });
    } catch (err) {
      const msg = err.response?.data?.msg || 'Failed to claim job.';
      setToast({ msg, type: 'error' });
    }
  }, []);

  function handleLogout() {
    logout();
    navigate('/login');
  }

  const instructorName = user?.email?.split('@')[0] ?? 'Instructor';

  return (
    <div className="min-h-screen bg-slate-50">
      {toast && (
        <Toast msg={toast.msg} type={toast.type} onDone={() => setToast(null)} />
      )}

      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Briefcase className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-slate-900 font-semibold text-sm">Instructor Portal</p>
              <p className="text-slate-400 text-xs">Welcome back, {instructorName}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-slate-700">{user?.email}</p>
              <p className="text-xs text-indigo-600 font-medium capitalize">{user?.role}</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 text-xs font-bold uppercase">
              {user?.email?.[0] || 'I'}
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 font-medium transition-colors ml-2"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-slate-900">Available Assignments</h1>
            <p className="text-slate-500 text-sm mt-0.5">
              {loading ? 'Loading…' : `${jobs.length} open job${jobs.length !== 1 ? 's' : ''} available`}
            </p>
          </div>
          <div className="bg-indigo-50 border border-indigo-100 rounded-xl px-4 py-2 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-semibold text-indigo-700 tabular-nums">{loading ? '—' : jobs.length}</span>
            <span className="text-xs text-indigo-500">open</span>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[0, 1, 2, 3, 4, 5].map(i => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6 h-56 animate-pulse">
                <div className="h-4 bg-slate-100 rounded w-2/3 mb-3" />
                <div className="h-3 bg-slate-100 rounded w-1/2 mb-6" />
                <div className="space-y-2">
                  <div className="h-3 bg-slate-100 rounded w-3/4" />
                  <div className="h-3 bg-slate-100 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
              <Briefcase className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="font-semibold text-slate-700 text-lg">No open assignments</h3>
            <p className="text-slate-400 text-sm mt-1">Check back soon — new jobs are posted regularly.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {jobs.map(job => (
              <JobCard key={job._id} job={job} onClaim={handleClaim} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
