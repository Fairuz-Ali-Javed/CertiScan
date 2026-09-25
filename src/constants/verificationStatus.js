export const VERIFICATION_STATUS = {
  VERIFIED: {
    key: 'VERIFIED',
    label: 'Verified & Approved',
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    dotClass: 'bg-emerald-500',
    description: 'Document details matched official database records successfully.'
  },
  FLAGGED: {
    key: 'FLAGGED',
    label: 'Action Required',
    badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
    dotClass: 'bg-amber-500',
    description: 'Mismatched values detected between extracted document text and registration records.'
  },
  PENDING: {
    key: 'PENDING',
    label: 'Documents Received',
    badgeClass: 'bg-sky-50 text-sky-700 border-sky-200',
    dotClass: 'bg-sky-500',
    description: 'Document batch uploaded and queued for processing.'
  },
  IN_REVIEW: {
    key: 'IN_REVIEW',
    label: 'Under Review',
    badgeClass: 'bg-blue-50 text-blue-700 border-blue-200',
    dotClass: 'bg-blue-500',
    description: 'Under review by an authorized verification officer.'
  },
  REJECTED: {
    key: 'REJECTED',
    label: 'Verification Declined',
    badgeClass: 'bg-rose-50 text-rose-700 border-rose-200',
    dotClass: 'bg-rose-500',
    description: 'Document rejected due to clarity issues or invalid documentation.'
  }
};
