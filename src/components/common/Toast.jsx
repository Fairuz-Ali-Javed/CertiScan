import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { cn } from '../../utils/cn';

export const Toast = ({ message, type = 'info', duration = 4000, onClose }) => {
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const styles = {
    success: 'bg-emerald-900 text-white border-emerald-700',
    error: 'bg-rose-900 text-white border-rose-700',
    warning: 'bg-amber-900 text-white border-amber-700',
    info: 'bg-slate-900 text-white border-slate-700',
  };

  const icons = {
    success: CheckCircle2,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  };

  const Icon = icons[type] || Info;

  return (
    <div
      className={cn(
        'flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl border text-xs font-medium transition-all duration-300 transform translate-y-0',
        styles[type]
      )}
    >
      <Icon className="w-4 h-4 shrink-0 text-current" />
      <span className="flex-1">{message}</span>
      <button
        onClick={onClose}
        className="p-1 rounded-md hover:bg-white/10 transition-colors text-white/70 hover:text-white"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
