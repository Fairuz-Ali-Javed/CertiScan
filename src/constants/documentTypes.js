/**
 * CertiScan Purpose-Driven Document Requirements Configuration
 * Fully configurable mock schema for purpose-driven document ingestion.
 * Backend developers can replace this configuration with real API payload schemes later.
 */

export const DOCUMENT_CATALOG = {
  GOVT_ID: {
    id: 'govt_id',
    title: 'Government Identity Proof',
    subtitle: 'Aadhar Card, Passport, Voter ID, or National Identity Card',
    isRequired: true,
    allowedFormats: ['.pdf', '.png', '.jpg', '.jpeg'],
    maxSizeMB: 2
  },
  TEN_MARKSHEET: {
    id: '10th_marksheet',
    title: '10th Marksheet / Secondary Record',
    subtitle: 'Secondary School Certificate (CBSE / ICSE / State Board)',
    isRequired: true,
    allowedFormats: ['.pdf', '.png', '.jpg', '.jpeg'],
    maxSizeMB: 2
  },
  TWELVE_MARKSHEET: {
    id: '12th_marksheet',
    title: '12th Marksheet / Higher Secondary',
    subtitle: 'Higher Secondary Certificate or Diploma Transcript',
    isRequired: true,
    allowedFormats: ['.pdf', '.png', '.jpg', '.jpeg'],
    maxSizeMB: 2
  },
  HIGHEST_QUALIFICATION: {
    id: 'highest_qualification',
    title: 'Highest Qualification Degree',
    subtitle: 'Bachelor / Master Degree Transcript or Final Certificate',
    isRequired: true,
    allowedFormats: ['.pdf', '.png', '.jpg', '.jpeg'],
    maxSizeMB: 2
  },
  INCOME_PROOF: {
    id: 'income_proof',
    title: 'Income / EWS Certificate',
    subtitle: 'Annual Income Certificate or EWS Eligibility Proof',
    isRequired: true,
    allowedFormats: ['.pdf', '.png', '.jpg', '.jpeg'],
    maxSizeMB: 2
  },
  CASTE_CERTIFICATE: {
    id: 'caste_certificate',
    title: 'Caste / Category Credential',
    subtitle: 'OBC / SC / ST Category Certificate (if applicable)',
    isRequired: false,
    allowedFormats: ['.pdf', '.png', '.jpg', '.jpeg'],
    maxSizeMB: 2
  },
  EXPERIENCE_CERTIFICATE: {
    id: 'experience_certificate',
    title: 'Work Experience Certificate',
    subtitle: 'Relieving Letter or Experience Proof (if applicable)',
    isRequired: false,
    allowedFormats: ['.pdf', '.png', '.jpg', '.jpeg'],
    maxSizeMB: 2
  },
  PAN_CARD: {
    id: 'pan_card',
    title: 'PAN Card',
    subtitle: 'Permanent Account Number Card for Financial Verification',
    isRequired: true,
    allowedFormats: ['.pdf', '.png', '.jpg', '.jpeg'],
    maxSizeMB: 2
  },
  ADDRESS_PROOF: {
    id: 'address_proof',
    title: 'Address / Residence Proof',
    subtitle: 'Electricity Bill, Rent Agreement, or Utility Statement',
    isRequired: true,
    allowedFormats: ['.pdf', '.png', '.jpg', '.jpeg'],
    maxSizeMB: 2
  }
};

export const VERIFICATION_PURPOSES = [
  {
    id: 'college_admission',
    title: 'College Admission',
    description: 'Academic document verification for university & college enrollment.',
    icon: 'GraduationCap',
    documents: [
      DOCUMENT_CATALOG.GOVT_ID,
      DOCUMENT_CATALOG.TEN_MARKSHEET,
      DOCUMENT_CATALOG.TWELVE_MARKSHEET,
      { ...DOCUMENT_CATALOG.INCOME_PROOF, isRequired: false }
    ]
  },
  {
    id: 'scholarship',
    title: 'Scholarship Application',
    description: 'Financial & merit verification for state/institutional scholarships.',
    icon: 'Award',
    documents: [
      DOCUMENT_CATALOG.GOVT_ID,
      DOCUMENT_CATALOG.INCOME_PROOF,
      DOCUMENT_CATALOG.HIGHEST_QUALIFICATION,
      DOCUMENT_CATALOG.CASTE_CERTIFICATE
    ]
  },
  {
    id: 'govt_recruitment',
    title: 'Government Recruitment',
    description: 'Official credential verification for public service hiring.',
    icon: 'Building2',
    documents: [
      DOCUMENT_CATALOG.GOVT_ID,
      DOCUMENT_CATALOG.HIGHEST_QUALIFICATION,
      DOCUMENT_CATALOG.CASTE_CERTIFICATE,
      DOCUMENT_CATALOG.EXPERIENCE_CERTIFICATE
    ]
  },
  {
    id: 'job_verification',
    title: 'Job / Employment Background Check',
    description: 'Corporate background verification for new candidate onboarding.',
    icon: 'Briefcase',
    documents: [
      DOCUMENT_CATALOG.GOVT_ID,
      DOCUMENT_CATALOG.HIGHEST_QUALIFICATION,
      DOCUMENT_CATALOG.EXPERIENCE_CERTIFICATE
    ]
  },
  {
    id: 'loan_application',
    title: 'Loan / Financial Verification',
    description: 'Identity & financial document verification for banking applications.',
    icon: 'Landmark',
    documents: [
      DOCUMENT_CATALOG.GOVT_ID,
      DOCUMENT_CATALOG.PAN_CARD,
      DOCUMENT_CATALOG.INCOME_PROOF,
      DOCUMENT_CATALOG.ADDRESS_PROOF
    ]
  },
  {
    id: 'other_general',
    title: 'Other / General Purpose',
    description: 'General credential verification for custom institutional services.',
    icon: 'FileText',
    documents: [
      DOCUMENT_CATALOG.GOVT_ID,
      DOCUMENT_CATALOG.HIGHEST_QUALIFICATION,
      { ...DOCUMENT_CATALOG.INCOME_PROOF, isRequired: false }
    ]
  }
];

// Fallback compatibility alias for static references
export const DOCUMENT_TYPES = {
  IDENTITY_PROOF: DOCUMENT_CATALOG.GOVT_ID,
  QUALIFICATION_CERTIFICATE: DOCUMENT_CATALOG.HIGHEST_QUALIFICATION,
  CATEGORY_CREDENTIAL: DOCUMENT_CATALOG.CASTE_CERTIFICATE,
  ADDRESS_INCOME_PROOF: DOCUMENT_CATALOG.INCOME_PROOF
};
