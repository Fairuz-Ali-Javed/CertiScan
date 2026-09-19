/**
 * CertiScan Clean Mock Dataset
 * Purpose-driven placeholder records with clean, human-readable details.
 * Completely free of technical jargon, fake accuracy stats, or confusing IDs.
 */

export const currentUser = {
  id: "USR-101",
  fullName: "Alex Johnson",
  email: "alex.johnson@example.com",
  phone: "+1 (555) 019-2831",
  role: "APPLICANT", // "APPLICANT" | "ADMIN"
  avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
};

export const adminUser = {
  id: "ADM-201",
  fullName: "Sarah Jenkins",
  email: "s.jenkins@certiscan.org",
  phone: "+1 (555) 019-9022",
  department: "Verification Unit",
  role: "ADMIN",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
};

export const initialSubmissions = [
  {
    id: "CS-2026-9041",
    referenceId: "CS-2026-9041",
    candidateName: "Alex Johnson",
    email: "alex.johnson@example.com",
    purposeTitle: "College Admission",
    submittedAt: "2026-07-18T10:30:00Z",
    overallStatus: "FLAGGED", // "VERIFIED" | "FLAGGED" | "IN_REVIEW"
    totalDocuments: 4,
    verifiedCount: 3,
    flaggedCount: 1,
    documents: [
      {
        id: "DOC-101",
        title: "Government Identity Proof",
        fileName: "Identity_Proof_Alex.pdf",
        fileSize: 1420500,
        status: "VERIFIED",
        extractedData: {
          fullTitle: "Alex Johnson",
          issuingAuthority: "National Identity Authority",
          status: "Active & Validated"
        },
        matchedDatabaseData: {
          fullTitle: "Alex Johnson",
          issuingAuthority: "National Identity Authority",
          status: "Active & Validated"
        },
        discrepancies: []
      },
      {
        id: "DOC-102",
        title: "10th Marksheet / Secondary Record",
        fileName: "10th_Marksheet_Alex.pdf",
        fileSize: 1840000,
        status: "FLAGGED",
        extractedData: {
          fullTitle: "Alex Johson", // Minor spelling difference
          conferralYear: "2022",
          issuingBody: "Board of Secondary Education"
        },
        matchedDatabaseData: {
          fullTitle: "Alex Johnson",
          conferralYear: "2022",
          issuingBody: "Board of Secondary Education"
        },
        discrepancies: [
          {
            field: "fullTitle",
            label: "Full Name",
            extractedValue: "Alex Johson",
            dbValue: "Alex Johnson",
            severity: "MEDIUM",
            reason: "Name spelling mismatch in document copy. Re-uploading a clearer PDF copy will resolve this item."
          }
        ]
      },
      {
        id: "DOC-103",
        title: "12th Marksheet / Higher Secondary",
        fileName: "12th_Marksheet_Alex.pdf",
        fileSize: 980200,
        status: "VERIFIED",
        extractedData: {
          fullTitle: "Alex Johnson",
          conferralYear: "2024",
          issuingBody: "Higher Secondary Board"
        },
        matchedDatabaseData: {
          fullTitle: "Alex Johnson",
          conferralYear: "2024",
          issuingBody: "Higher Secondary Board"
        },
        discrepancies: []
      },
      {
        id: "DOC-104",
        title: "Income / EWS Certificate",
        fileName: "Income_Certificate_2025.pdf",
        fileSize: 1120000,
        status: "VERIFIED",
        extractedData: {
          fullTitle: "Alex Johnson",
          issuingAuthority: "Revenue Department",
          validityPeriod: "2025 – 2027"
        },
        matchedDatabaseData: {
          fullTitle: "Alex Johnson",
          issuingAuthority: "Revenue Department",
          validityPeriod: "2025 – 2027"
        },
        discrepancies: []
      }
    ]
  },
  {
    id: "CS-2026-7712",
    referenceId: "CS-2026-7712",
    candidateName: "Alex Johnson",
    email: "alex.johnson@example.com",
    purposeTitle: "Job / Employment Check",
    submittedAt: "2026-05-12T14:15:00Z",
    overallStatus: "VERIFIED",
    totalDocuments: 3,
    verifiedCount: 3,
    flaggedCount: 0,
    documents: [
      {
        id: "DOC-201",
        title: "Government Identity Proof",
        fileName: "Identity_Proof_Final.pdf",
        fileSize: 1350000,
        status: "VERIFIED"
      },
      {
        id: "DOC-202",
        title: "Highest Qualification Degree",
        fileName: "Degree_Certificate.pdf",
        fileSize: 1780000,
        status: "VERIFIED"
      },
      {
        id: "DOC-203",
        title: "Work Experience Certificate",
        fileName: "Experience_Letter.pdf",
        fileSize: 920000,
        status: "VERIFIED"
      }
    ]
  }
];

export const initialAdminQueue = [
  {
    id: "CS-2026-9041",
    candidateName: "Alex Johnson",
    email: "alex.johnson@example.com",
    category: "College Admission",
    submittedAt: "2026-07-18T10:30:00Z",
    flaggedDocument: "10th Marksheet / Secondary Record",
    discrepancySummary: "Name spelling mismatch ('Alex Johson' vs 'Alex Johnson')",
    severity: "MEDIUM"
  },
  {
    id: "CS-2026-8819",
    candidateName: "Jordan Lee",
    email: "jordan.lee@example.com",
    category: "Job / Employment Check",
    submittedAt: "2026-07-19T09:12:00Z",
    flaggedDocument: "Highest Qualification Degree",
    discrepancySummary: "Degree registration number requires manual verification",
    severity: "HIGH"
  },
  {
    id: "CS-2026-8790",
    candidateName: "Taylor Swift",
    email: "taylor.s@example.com",
    category: "Loan Application",
    submittedAt: "2026-07-19T08:45:00Z",
    flaggedDocument: "Address / Residence Proof",
    discrepancySummary: "Address document validity period requires review",
    severity: "LOW"
  }
];
