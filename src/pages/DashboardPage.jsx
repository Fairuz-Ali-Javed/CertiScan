import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { initialSubmissions } from '../data/mockData';
import { StatusBadge } from '../components/common/StatusBadge';
import { Button } from '../components/common/Button';
import { formatDate } from '../utils/formatters';
import { VERIFICATION_PURPOSES } from '../constants/documentTypes';
import {
  FileCheck2,
  AlertTriangle,
  UploadCloud,
  Clock,
  ArrowRight,
  FileText,
  ChevronRight,
  ShieldCheck,
  Lock,
  Sparkles,
  XCircle,
  ExternalLink,
  GraduationCap,
  Award,
  Building2,
  Briefcase,
  Landmark,
  Layers
} from 'lucide-react';

const purposeIconMap = {
  GraduationCap,
  Award,
  Building2,
  Briefcase,
  Landmark,
  FileText
};

export const DashboardPage = () => {
  const { user } = useAuth();
  const [submissions] = useState(initialSubmissions);

  const latestSubmission = submissions[0];
  const flaggedDoc = latestSubmission?.documents?.find((d) => d.status === 'FLAGGED');

  return (
    <div className="space-y-6 sm:space-y-8 font-sans">
      {/* Horizon UI Hero Welcome Widget */}
      <div className="relative p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-950 text-white shadow-xl border border-slate-800 overflow-hidden">
        {/* Glow Spheres */}
        <div className="absolute w-72 h-72 bg-blue-500/20 rounded-full blur-3xl -top-10 -right-10 pointer-events-none" />
        <div className="absolute w-60 h-60 bg-indigo-500/15 rounded-full blur-3xl -bottom-10 -left-10 pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Horizon Document Authenticity Gateway</span>
            </div>

            <h1 className="text-xl sm:text-4xl font-extrabold text-white tracking-tight font-heading leading-snug">
              Welcome back, {user?.fullName || 'Alex Johnson'}
            </h1>
            <p className="text-xs sm:text-sm text-blue-200/90 max-w-xl leading-relaxed">
              Select your verification purpose, submit required document cards, and monitor application progress in real time.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link to="/upload" className="w-full sm:w-auto">
                <Button variant="primary" size="md" icon={UploadCloud} className="w-full sm:w-auto">
                  Start Verification
                </Button>
              </Link>
              <Link to="/history" className="w-full sm:w-auto">
                <Button variant="outline" size="md" className="w-full sm:w-auto bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-800">
                  View Archive
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4 hidden lg:flex justify-end">
            <div className="p-4.5 rounded-2xl bg-slate-800/70 backdrop-blur-md border border-slate-700/80 shadow-xl space-y-3 w-64 animate-float">
              <div className="flex items-center gap-2.5 border-b border-slate-700/80 pb-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-md">
                  <ShieldCheck className="w-5.5 h-5.5 text-blue-200" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white font-heading">CertiScan Seal</h4>
                  <p className="text-[10px] text-slate-400">Authenticity Verified</p>
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-300 flex items-center justify-between">
                <span>Active Status</span>
                <span className="text-emerald-400 font-bold">✓ Validated</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Banner (If Action Required) */}
      {flaggedDoc && (
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/90 border border-amber-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 border border-amber-200">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="text-xs sm:text-sm font-bold text-amber-900 font-heading">
                  Action Required: Mismatch Flagged in {flaggedDoc.title}
                </h4>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-200 text-amber-800">
                  {latestSubmission.purposeTitle}
                </span>
              </div>
              <p className="text-xs text-amber-700 mt-1 max-w-2xl">
                A minor mismatch was flagged during verification. Re-uploading a clearer PDF copy will resolve this item.
              </p>
            </div>
          </div>

          <Link to={`/status/${latestSubmission.id}`} className="shrink-0 w-full md:w-auto">
            <Button variant="danger" size="sm" icon={ArrowRight} iconPosition="right" className="w-full md:w-auto bg-amber-600 hover:bg-amber-700 border-none">
              Inspect & Fix Item
            </Button>
          </Link>
        </div>
      )}

      {/* 4 Horizon Floating Category Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
        <div className="horizon-card p-4.5 sm:p-6 flex items-center justify-between">
          <div>
            <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-400 font-heading">
              Pending Applications
            </p>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-amber-600 mt-1 font-heading">
              1
            </h3>
            <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5">Awaiting Re-upload</p>
          </div>
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100 shadow-2xs shrink-0">
            <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        </div>

        <div className="horizon-card p-4.5 sm:p-6 flex items-center justify-between">
          <div>
            <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-400 font-heading">
              Under Review
            </p>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-blue-600 mt-1 font-heading">
              0
            </h3>
            <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5">In Processing Queue</p>
          </div>
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shadow-2xs shrink-0">
            <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        </div>

        <div className="horizon-card p-4.5 sm:p-6 flex items-center justify-between">
          <div>
            <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-400 font-heading">
              Approved
            </p>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-emerald-600 mt-1 font-heading">
              1
            </h3>
            <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5">Fully Validated</p>
          </div>
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shadow-2xs shrink-0">
            <FileCheck2 className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        </div>

        <div className="horizon-card p-4.5 sm:p-6 flex items-center justify-between">
          <div>
            <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-400 font-heading">
              Rejected
            </p>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-400 mt-1 font-heading">
              0
            </h3>
            <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5">Declined Batches</p>
          </div>
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-slate-100 text-slate-500 flex items-center justify-center border border-slate-200 shadow-2xs shrink-0">
            <XCircle className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        </div>
      </div>

      {/* Centerpiece: Start Verification Purpose Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 font-heading">
            Choose Verification Purpose
          </h2>
          <Link to="/upload" className="text-xs font-semibold text-blue-600 hover:underline">
            View All Purposes →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
          {VERIFICATION_PURPOSES.map((purpose) => {
            const IconComp = purposeIconMap[purpose.icon] || Layers;

            return (
              <Link key={purpose.id} to="/upload" className="group">
                <div className="horizon-card p-4.5 sm:p-5 space-y-3 h-full flex flex-col justify-between">
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <IconComp className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-900 font-heading group-hover:text-blue-600 transition-colors">
                        {purpose.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5 leading-relaxed">
                        {purpose.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] text-blue-600 font-semibold">
                    <span>{purpose.documents.length} Required Cards</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Active Application Stepper + Right Horizon Trust Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 Cols */}
        <div className="lg:col-span-8 space-y-6">
          {latestSubmission && (
            <div className="horizon-card p-4.5 sm:p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 font-heading">
                      Active Application: {latestSubmission.purposeTitle}
                    </h3>
                    <StatusBadge statusKey={latestSubmission.overallStatus} />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Submitted on {formatDate(latestSubmission.submittedAt)} • Candidate: {latestSubmission.candidateName}
                  </p>
                </div>

                <Link to={`/status/${latestSubmission.id}`}>
                  <Button variant="outline" size="sm" icon={ExternalLink} iconPosition="right">
                    View Full Details
                  </Button>
                </Link>
              </div>

              {/* Horizon Horizontal Progress Stepper */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                {[
                  { title: 'Submitted', desc: 'Documents uploaded', isDone: true },
                  { title: 'Under Review', desc: 'Record cross-checking', isDone: true },
                  { title: 'Verified', desc: latestSubmission.overallStatus === 'VERIFIED' ? 'Validation complete' : '1 item flagged', isDone: latestSubmission.overallStatus === 'VERIFIED' },
                  { title: 'Completed', desc: 'Final report issued', isDone: latestSubmission.overallStatus === 'VERIFIED' },
                ].map((step, idx) => (
                  <div key={idx} className="p-3 sm:p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-800 mb-1 font-heading">
                      <span>{step.title}</span>
                      <span className={step.isDone ? 'text-emerald-600 font-bold' : 'text-slate-400'}>
                        {step.isDone ? '✓' : '•'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">{step.desc}</p>
                  </div>
                ))}
              </div>

              {/* Submitted Document Cards */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 font-heading">
                  Submitted Document Cards ({latestSubmission.documents.length})
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {latestSubmission.documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="p-3 sm:p-3.5 rounded-2xl border border-slate-200 bg-white flex items-center justify-between gap-3 hover:border-blue-200 transition-colors shadow-xs"
                    >
                      <div className="truncate">
                        <p className="text-xs font-medium text-slate-800 truncate font-heading">{doc.title}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{doc.fileName}</p>
                      </div>
                      <StatusBadge statusKey={doc.status} className="scale-90" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Recent Applications Cards */}
          <div className="horizon-card p-4.5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 font-heading">Recent Applications</h3>
              <Link to="/history" className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1">
                View All History <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {submissions.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 sm:p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-blue-200 hover:shadow-card transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                      <FileText className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 font-heading">{item.purposeTitle}</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Submitted {formatDate(item.submittedAt)} • {item.documents.length} Document Cards
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4">
                    <StatusBadge statusKey={item.overallStatus} />
                    <Link to={`/status/${item.id}`} className="text-xs font-semibold text-blue-600 hover:underline">
                      Inspect →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Horizon Floating Security Widget */}
        <div className="lg:col-span-4 space-y-6">
          <div className="horizon-card p-5 sm:p-6 space-y-4">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-blue-900 text-white flex items-center justify-center font-bold shadow-md">
              <Lock className="w-5.5 h-5.5 sm:w-6 sm:h-6 text-blue-300" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-heading">
              Enterprise Document Security
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              CertiScan uses 256-bit isolation protocols to safeguard all uploaded identity credentials and qualification records.
            </p>
            <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600 font-medium">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Multi-format support (PDF, PNG, JPG)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Zero backend data leaks</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Configurable API payload scheme</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
