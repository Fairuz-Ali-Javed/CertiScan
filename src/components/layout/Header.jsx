import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, ShieldCheck, Bell, Search } from 'lucide-react';
import { ProfileDropdown } from './ProfileDropdown';

export const Header = ({ onToggleSidebar }) => {
  return (
    <header className="sticky top-0 z-40 h-16 sm:h-20 bg-[#f4f7fe]/95 backdrop-blur-md border-b border-slate-200/80 px-3.5 sm:px-8 flex items-center justify-between gap-3 font-sans">
      {/* Left: Mobile Toggle & Brand Indicator */}
      <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
        <button
          onClick={onToggleSidebar}
          className="p-2 sm:p-2.5 rounded-xl text-slate-600 hover:bg-white hover:shadow-xs transition-all lg:hidden border border-slate-200/80"
          aria-label="Toggle navigation sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <Link to="/dashboard" className="flex items-center gap-2 sm:gap-3 group shrink-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-700 to-indigo-800 text-white flex items-center justify-center font-bold shadow-md shadow-blue-900/20 group-hover:scale-105 transition-all shrink-0">
            <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-blue-300" />
          </div>
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight font-heading flex items-center gap-1.5 leading-none">
              CertiScan
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/80">
                Portal
              </span>
            </span>
            <span className="text-[10px] text-slate-400 font-medium hidden md:inline-block mt-0.5">
              Secure Document Verification Gateway
            </span>
          </div>
        </Link>
      </div>

      {/* Middle: Horizon UI Rounded Floating Search Bar */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search documents, verification reports..."
            className="w-full pl-11 pr-4 py-2.5 rounded-full bg-white border border-slate-200/90 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 shadow-subtle transition-all"
          />
        </div>
      </div>

      {/* Right: Notification Icon & Profile Dropdown */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <button
          className="relative p-2 sm:p-2.5 rounded-full bg-white border border-slate-200/90 text-slate-500 hover:text-blue-600 hover:shadow-subtle transition-all"
          aria-label="View notifications"
        >
          <Bell className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white animate-pulse" />
        </button>

        <div className="h-6 w-px bg-slate-200/90 hidden sm:block" />

        <ProfileDropdown />
      </div>
    </header>
  );
};
