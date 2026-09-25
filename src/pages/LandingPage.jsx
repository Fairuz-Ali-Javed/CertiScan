import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Lock,
  ArrowRight,
  CheckCircle2,
  Building2,
  FileText,
  UserCheck,
  Check,
  Award,
  Sparkles
} from 'lucide-react';
import { Button } from '../components/common/Button';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-900 to-blue-800 text-white flex items-center justify-center font-bold shadow-sm group-hover:scale-105 transition-all">
              <ShieldCheck className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <span className="text-lg font-bold text-slate-900 tracking-tight font-heading flex items-center gap-1.5">
                CertiScan
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                  Portal
                </span>
              </span>
              <p className="text-[11px] text-slate-500 font-medium">Document Authenticity Gateway</p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="primary" size="sm" icon={ArrowRight} iconPosition="right">
                Start Verification
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Two-Column Hero Section with Ambient Mesh Background */}
      <section className="relative py-16 lg:py-24 px-6 bg-mesh-pattern border-b border-slate-200/80 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Modern Copy & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold shadow-xs">
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Enterprise Document Verification Gateway</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15] font-heading">
              Universal Document Verification & <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600">
                Authenticity Portal
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed font-normal">
              CertiScan enables secure credential ingestion, document authentication, and validation tracking for government services, recruitment boards, universities, banks, and corporate compliance administration.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <Link to="/upload" className="w-full sm:w-auto">
                <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right" className="w-full sm:w-auto">
                  Submit Documents Now
                </Button>
              </Link>
              <Link to="/login" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" icon={Building2} className="w-full sm:w-auto">
                  Administrator Access
                </Button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-slate-200/80 flex flex-wrap items-center gap-6 text-xs font-semibold text-slate-600">
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" /> 256-Bit File Isolation
              </span>
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" /> Multi-Format Ingestion
              </span>
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" /> Field-Level Validation
              </span>
            </div>
          </div>

          {/* RIGHT COLUMN: Premium 3D Visual Composition */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Ambient Background Glow Circles */}
            <div className="absolute w-72 h-72 bg-blue-400/20 rounded-full blur-3xl -top-10 -right-10 pointer-events-none" />
            <div className="absolute w-60 h-60 bg-indigo-400/15 rounded-full blur-3xl -bottom-10 -left-10 pointer-events-none" />

            {/* Main Visual Composition Shell */}
            <div className="relative w-full max-w-md bg-white/90 backdrop-blur-md rounded-3xl border border-slate-200/90 shadow-2xl p-6 space-y-5 animate-float">
              
              {/* Card Header Shield Seal */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-900 text-white flex items-center justify-center font-bold shadow-md">
                    <ShieldCheck className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 font-heading">CertiScan Seal</h3>
                    <p className="text-[11px] text-slate-400 font-medium">Official Authenticity Gateway</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                </span>
              </div>

              {/* Floating Preview Document Card 1 */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-bold text-slate-800">National Identity Credential</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                    PDF Document
                  </span>
                </div>
                <div className="w-full bg-slate-200/80 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-full rounded-full" />
                </div>
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>ID-9283-4019-2831</span>
                  <span className="text-emerald-600 font-semibold">Matched 100%</span>
                </div>
              </div>

              {/* Floating Preview Document Card 2 */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-indigo-600" />
                    <span className="text-xs font-bold text-slate-800">Qualification Record</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    Approved
                  </span>
                </div>
                <div className="w-full bg-slate-200/80 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-full rounded-full" />
                </div>
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>REG-2026-8841</span>
                  <span className="text-emerald-600 font-semibold">Validated</span>
                </div>
              </div>

              {/* Badge Footer */}
              <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                <span className="flex items-center gap-1.5 text-slate-600">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" /> Encrypted Session
                </span>
                <span className="font-mono text-slate-400">REF-CS-2026-9041</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-2 font-heading">
            Streamlined Verification Workflow
          </h2>
          <p className="text-sm text-slate-500">
            From drag & drop document upload to validation reporting.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card hover:shadow-card-hover transition-all">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold mb-4 border border-blue-100">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-base font-semibold text-slate-900 mb-2 font-heading">1. Secure Ingestion</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Applicants upload required identity credentials, educational transcripts, and official certificates via intuitive drag & drop cards.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card hover:shadow-card-hover transition-all">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold mb-4 border border-indigo-100">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-base font-semibold text-slate-900 mb-2 font-heading">2. Credential Verification</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Documents are processed securely, verifying field integrity, file metadata, and registration parameters against expected database records.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card hover:shadow-card-hover transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold mb-4 border border-emerald-100">
              <UserCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-semibold text-slate-900 mb-2 font-heading">3. Verification Report</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Generates instant status reports, providing applicants with real-time updates and flagging items requiring self-correction.
            </p>
          </div>
        </div>
      </section>

      {/* Supported Credentials Grid */}
      <section className="py-16 px-6 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-2 font-heading">
              Supported Document Categories
            </h2>
            <p className="text-sm text-slate-500">
              Verifies official identity proofs, educational records, and compliance certificates.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'National Identity Proof', desc: 'Government ID Cards, Passport, or Aadhar Record', tag: 'Identity Verification' },
              { title: 'Educational Qualification', desc: 'Degrees, Diplomas, Board Records, & Transcripts', tag: 'Academic & Professional' },
              { title: 'Category Credential', desc: 'Special Category, Ex-Serviceman, or Reservation Record', tag: 'Compliance Credential' },
              { title: 'Address & Financial Record', desc: 'Income Certificates, Utility Statements, or Residence Proof', tag: 'Financial & Residence' },
            ].map((card, idx) => (
              <div key={idx} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors shadow-xs hover:shadow-card">
                <CheckCircle2 className="w-5 h-5 text-blue-600 mb-2" />
                <h4 className="text-sm font-semibold text-slate-900 font-heading">{card.title}</h4>
                <p className="text-xs text-slate-500 mt-1">{card.desc}</p>
                <span className="inline-block mt-3 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                  {card.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-8 px-6 bg-slate-900 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-400" />
            <span className="text-white font-semibold">CertiScan Verification Portal</span>
          </div>
          <p>© 2026 Enterprise Document Authenticity Gateway. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
