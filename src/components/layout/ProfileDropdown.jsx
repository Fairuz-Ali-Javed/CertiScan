import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { User, Settings, LogOut, ShieldCheck, ChevronDown, Check } from 'lucide-react';

export const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, switchRole } = useAuth();
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setIsOpen(false);
    await logout();
    navigate('/login');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-100"
      >
        <img
          src={user?.avatarUrl || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'}
          alt={user?.fullName}
          className="w-8 h-8 rounded-full object-cover border border-slate-300 shadow-xs"
        />
        <div className="hidden sm:flex flex-col text-left">
          <span className="text-xs font-semibold text-slate-800 line-clamp-1">
            {user?.fullName}
          </span>
          <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">
            {user?.role === 'ADMIN' ? 'ADMINISTRATOR' : 'APPLICANT'}
          </span>
        </div>
        <ChevronDown className="w-4 h-4 text-slate-400 hidden sm:block" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-dropdown border border-slate-200 py-1.5 z-50 animate-fade-in">
          {/* User Overview */}
          <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50">
            <p className="text-xs font-semibold text-slate-900">{user?.fullName}</p>
            <p className="text-[11px] text-slate-500 truncate">{user?.email}</p>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                {user?.role === 'ADMIN' ? 'Administrator Account' : 'Applicant Account'}
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="py-1">
            <Link
              to="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
            >
              <User className="w-4 h-4 text-slate-400" />
              <span>Profile Settings</span>
            </Link>
            <Link
              to="/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
            >
              <Settings className="w-4 h-4 text-slate-400" />
              <span>Account Preferences</span>
            </Link>
          </div>

          {/* Demo Role Switcher */}
          <div className="border-t border-slate-100 py-1">
            <div className="px-4 py-1 text-[10px] font-bold uppercase text-slate-400">
              Demo Portal Role
            </div>
            <button
              onClick={() => {
                switchRole('APPLICANT');
                setIsOpen(false);
                navigate('/dashboard');
              }}
              className="w-full flex items-center justify-between px-4 py-1.5 text-xs text-slate-700 hover:bg-slate-50"
            >
              <span className="flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-blue-600" />
                Applicant View
              </span>
              {user?.role !== 'ADMIN' && <Check className="w-3.5 h-3.5 text-blue-600" />}
            </button>

            <button
              onClick={() => {
                switchRole('ADMIN');
                setIsOpen(false);
                navigate('/admin');
              }}
              className="w-full flex items-center justify-between px-4 py-1.5 text-xs text-slate-700 hover:bg-slate-50"
            >
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                Administrator View
              </span>
              {user?.role === 'ADMIN' && <Check className="w-3.5 h-3.5 text-indigo-600" />}
            </button>
          </div>

          {/* Logout */}
          <div className="border-t border-slate-100 pt-1">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors"
            >
              <LogOut className="w-4 h-4 text-rose-500" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
