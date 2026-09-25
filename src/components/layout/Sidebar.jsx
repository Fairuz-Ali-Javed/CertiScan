import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { APPLICANT_NAV_ITEMS, ADMIN_NAV_ITEMS } from '../../constants/navigationLinks';
import {
  LayoutDashboard,
  UploadCloud,
  History,
  User,
  Settings,
  HelpCircle,
  ShieldCheck,
  FileText,
  X,
  Lock
} from 'lucide-react';
import { cn } from '../../utils/cn';

const iconMap = {
  LayoutDashboard,
  UploadCloud,
  History,
  User,
  Settings,
  HelpCircle,
  ShieldCheck,
  FileText,
};

export const Sidebar = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const navItems = user?.role === 'ADMIN' ? ADMIN_NAV_ITEMS : APPLICANT_NAV_ITEMS;

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 lg:hidden"
        />
      )}

      {/* Horizon UI Inspired Sidebar Panel */}
      <aside
        className={cn(
          'fixed lg:sticky top-16 sm:top-20 z-50 h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)] bg-white text-slate-700 border-r border-slate-200/80 transition-all duration-300 flex flex-col justify-between overflow-y-auto select-none font-sans',
          'w-64',
          isOpen ? 'left-0 shadow-2xl' : '-left-64 lg:left-0'
        )}
      >
        {/* Navigation Group */}
        <div className="p-4 space-y-6">
          {/* Mobile Header Close */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 lg:hidden">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-heading">
              Menu Navigation
            </span>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div>
            <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3 font-heading">
              Main Menu
            </p>
            <nav className="space-y-1.5">
              {navItems.map((item) => {
                const IconComponent = iconMap[item.icon] || FileText;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-3.5 px-3.5 py-3 rounded-2xl text-xs font-medium transition-all duration-200 group',
                        isActive
                          ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/25'
                          : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <div
                          className={cn(
                            'w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors',
                            isActive
                              ? 'bg-blue-700/60 text-white'
                              : 'bg-slate-100 text-slate-500 group-hover:text-slate-800 group-hover:bg-slate-200/80'
                          )}
                        >
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <span className="font-heading">{item.label}</span>
                      </>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>

          {/* Horizon UI Dark Floating Bottom Card */}
          <div className="p-4.5 rounded-3xl bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-900 text-white space-y-2 shadow-xl relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-blue-500/20 rounded-full blur-xl pointer-events-none" />
            
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-md">
              <Lock className="w-4 h-4 text-blue-200" />
            </div>

            <h4 className="text-xs font-bold text-white font-heading">
              Document Security
            </h4>
            <p className="text-[11px] text-blue-200/90 leading-relaxed">
              Every submitted record is isolated and protected with 256-bit encryption.
            </p>

            <NavLink
              to="/help"
              onClick={onClose}
              className="inline-block text-[11px] font-bold text-blue-300 hover:text-white underline pt-1"
            >
              View Guidelines →
            </NavLink>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
            <span>CertiScan Portal</span>
            <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Active
            </span>
          </div>
        </div>
      </aside>
    </>
  );
};
