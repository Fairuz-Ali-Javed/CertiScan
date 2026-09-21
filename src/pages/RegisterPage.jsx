import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import { ShieldCheck, User, Mail, Phone, ArrowRight } from 'lucide-react';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';

export const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 019-2831',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await register(formData);
      if (res.success) {
        showSuccess('Profile created! Choose your verification purpose.');
        navigate('/upload');
      }
    } catch {
      showError('Registration failed. Please check details.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 font-sans">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* Left Info Column */}
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white p-8 flex flex-col justify-between">
          <div>
            <Link to="/" className="flex items-center gap-2.5 mb-8">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5 text-blue-100" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white font-heading">CertiScan</span>
            </Link>

            <h2 className="text-2xl font-bold tracking-tight mb-3 font-heading">
              Create Your Profile
            </h2>
            <p className="text-xs text-blue-200 leading-relaxed mb-6">
              Set up your profile to select a verification purpose and upload the required document cards.
            </p>

            <div className="p-4 rounded-xl bg-blue-900/60 border border-blue-700/60 space-y-2">
              <h4 className="text-xs font-bold text-white font-heading">Quick & Easy Uploads</h4>
              <p className="text-[11px] text-blue-200 leading-relaxed">
                You will only be asked to upload the exact documents required for your selected verification purpose.
              </p>
            </div>
          </div>

          <div className="pt-8 text-[11px] text-blue-300 border-t border-blue-800/80">
            CertiScan Secure Document Verification Gateway
          </div>
        </div>

        {/* Right Form Column */}
        <div className="p-8 flex flex-col justify-between">
          <div>
            <div className="mb-6">
              <h3 className="text-lg font-bold text-slate-900 font-heading">Applicant Profile</h3>
              <p className="text-xs text-slate-500 mt-1">
                Enter your details to get started.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Full Name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="e.g. Alex Johnson"
                icon={User}
                required
              />

              <Input
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="e.g. alex@example.com"
                icon={Mail}
                required
              />

              <Input
                label="Mobile Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
                className="w-full mt-4"
              >
                Continue to Verification Purpose
              </Button>
            </form>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
            Already have a profile?{' '}
            <Link to="/login" className="text-blue-600 font-semibold hover:underline">
              Sign In Here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
