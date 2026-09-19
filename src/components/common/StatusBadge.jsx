import React from 'react';
import { cn } from '../../utils/cn';
import { VERIFICATION_STATUS } from '../../constants/verificationStatus';
import { CheckCircle2, AlertTriangle, Clock, XCircle, FileText } from 'lucide-react';

export const StatusBadge = ({ statusKey = 'PENDING', className }) => {
  const config = VERIFICATION_STATUS[statusKey] || VERIFICATION_STATUS.PENDING;

  const icons = {
    VERIFIED: CheckCircle2,
    FLAGGED: AlertTriangle,
    PENDING: Clock,
    IN_REVIEW: FileText,
    REJECTED: XCircle,
  };

  const Icon = icons[statusKey] || Clock;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-colors select-none',
        config.badgeClass,
        className
      )}
    >
      <Icon className="w-3.5 h-3.5 shrink-0" />
      <span>{config.label}</span>
    </span>
  );
};
