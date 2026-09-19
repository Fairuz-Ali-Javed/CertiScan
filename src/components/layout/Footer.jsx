import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="mt-auto border-t border-slate-200/80 bg-white py-6 px-4 sm:px-6 text-slate-500">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-blue-700" />
          <span>© 2026 CertiScan Verification Portal. All rights reserved.</span>
        </div>

        <div className="flex items-center gap-6">
          <Link to="/help" className="hover:text-slate-900 transition-colors">
            Help Desk & Guidelines
          </Link>
          <Link to="/settings" className="hover:text-slate-900 transition-colors">
            Privacy & Security
          </Link>
          <span className="text-slate-400">Enterprise Document Authenticity Platform</span>
        </div>
      </div>
    </footer>
  );
};
