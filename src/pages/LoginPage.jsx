import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import { ShieldCheck, User, Mail, Phone, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';

export const LoginPage = () => {
  const [role, setRole] = useState('APPLICANT'); // 'APPLICANT' | 'ADMIN'
  const [fullName, setFullName] = useState('Alex Johnson');
  const [email, setEmail] = useState('alex.johnson@example.com');
  const [phone, setPhone] = useState('+1 (555) 019-2831');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await login({ role: role === 'ADMIN' ? 'ADMIN' : 'APPLICANT', fullName, email, phone });
      if (res.success) {
        showSuccess(`Welcome back, ${fullName}!`);
        navigate(role === 'ADMIN' ? '/admin' : '/dashboard');
      }
    } catch {
      showError('Unable to sign in. Please check your details.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 font-sans">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* Left Side: Welcoming Dark Navy Gradient Panel */}
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white p-8 flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <Link to="/" className="flex items-center gap-2.5 mb-8 group">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-md group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-5 h-5 text-blue-100" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white font-heading">CertiScan</span>
            </Link>

            <h2 className="text-2xl font-bold tracking-tight mb-3 font-heading">
              Sign In to Your Portal
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed mb-6">
              Access your document verification applications, check status updates, or submit replacement documents.
            </p>

            {/* Checklist */}
            <div className="space-y-3 border-t border-slate-800 pt-6">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-heading">
                Portal Features
              </p>
              <div className="flex items-center gap-2.5 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Purpose-Driven Document Selection</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Drag & Drop File Uploads</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Real-Time Status Tracking</span>
              </div>
            </div>
          </div>

          <div className="pt-8 text-[11px] text-slate-500 border-t border-slate-800/80">
            CertiScan Secure Document Verification Gateway
          </div>
        </div>

        {/* Right Side: Simple Clean Form */}
        <div className="p-8 flex flex-col justify-between">
          <div>
            {/* Role Switcher Tabs */}
            <div className="flex rounded-2xl bg-slate-100 p-1 mb-6 border border-slate-200/80">
              <button
                type="button"
                onClick={() => {
                  setRole('APPLICANT');
                  setFullName('Alex Johnson');
                  setEmail('alex.johnson@example.com');
                }}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  role === 'APPLICANT'
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-200 font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Applicant</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setRole('ADMIN');
                  setFullName('Sarah Jenkins');
                  setEmail('s.jenkins@certiscan.org');
                }}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  role === 'ADMIN'
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-200 font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Administrator</span>
              </button>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-bold text-slate-900 font-heading">
                {role === 'ADMIN' ? 'Administrator Sign In' : 'Welcome to CertiScan'}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Enter your details to access the verification portal.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Alex Johnson"
                icon={User}
                required
              />

              <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. alex@example.com"
                icon={Mail}
                required
              />

              <Input
                label="Mobile Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. +1 (555) 019-2831"
                icon={Phone}
                required
              />

              <Button
                type="submit"
                variant="primary"
                size="md"
                isLoading={isLoading}
                icon={ArrowRight}
                iconPosition="right"
                className="w-full mt-2"
              >
                Continue to Portal
              </Button>
            </form>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
            Need to setup an account?{' '}
            <Link to="/register" className="text-blue-600 font-semibold hover:underline">
              Register Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
