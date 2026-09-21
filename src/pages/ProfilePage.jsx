import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { PageHeader } from '../components/common/PageHeader';
import { CheckCircle2 } from 'lucide-react';

export const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6 font-sans max-w-4xl mx-auto">
      <PageHeader
        title="User Profile & Verification Identity"
        subtitle="Manage your registered candidate credentials and institutional metadata."
        breadcrumbItems={[
          { label: 'Dashboard', path: '/dashboard' },
          { label: 'My Profile' }
        ]}
      />

      {/* User Card */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-card flex flex-col sm:flex-row items-center gap-6">
        <img
          src={user?.avatarUrl}
          alt={user?.fullName}
          className="w-24 h-24 rounded-full object-cover border-4 border-blue-50 shadow-md"
        />
        <div className="space-y-1 text-center sm:text-left flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900">{user?.fullName}</h2>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 w-fit mx-auto sm:mx-0">
              <CheckCircle2 className="w-3.5 h-3.5" /> Identity Verified
            </span>
          </div>
          <p className="text-xs text-slate-500">{user?.role === 'ADMIN' ? 'Administrator' : 'Applicant Portal Account'}</p>
          <p className="text-xs font-mono text-slate-400">ID: {user?.id || 'USR-101'}</p>
        </div>
      </div>

      {/* Identity Details Grid */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-card space-y-4">
        <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
          Registered Information
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-slate-400 font-medium">Candidate Name:</span>
            <p className="text-sm font-semibold text-slate-900 mt-1">{user?.fullName}</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-slate-400 font-medium">Email Address:</span>
            <p className="text-sm font-semibold text-slate-900 mt-1">{user?.email}</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-slate-400 font-medium">Registration ID:</span>
            <p className="text-sm font-semibold text-slate-900 mt-1">{user?.id || 'USR-101'}</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-slate-400 font-medium">Identity Credential Status:</span>
            <p className="text-sm font-semibold text-emerald-700 mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Active & Validated
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
