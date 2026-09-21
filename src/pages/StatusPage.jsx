import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { initialSubmissions } from '../data/mockData';
import { useToast } from '../hooks/useToast';
import { PageHeader } from '../components/common/PageHeader';
import { StatusBadge } from '../components/common/StatusBadge';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { formatDate } from '../utils/formatters';
import {
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  FileText,
  UploadCloud,
  ArrowLeft
} from 'lucide-react';

export const StatusPage = () => {
  const { id } = useParams();
  const { showSuccess, showError } = useToast();
  
  const [submissions, setSubmissions] = useState(initialSubmissions);
  const [reuploadDoc, setReuploadDoc] = useState(null);
  const [reuploadFile, setReuploadFile] = useState(null);
  const [isReuploading, setIsReuploading] = useState(false);

  const submission = submissions.find((s) => s.id === id || s.referenceId === id) || submissions[0];
  const flaggedDocuments = submission.documents.filter((d) => d.status === 'FLAGGED');

  const handleReuploadSubmit = () => {
    if (!reuploadFile) {
      showError('Please select a replacement document file.');
      return;
    }
    setIsReuploading(true);
    setTimeout(() => {
      setSubmissions((prev) =>
        prev.map((sub) => {
          if (sub.id === submission.id) {
            const updatedDocs = sub.documents.map((doc) => {
              if (doc.id === reuploadDoc.id) {
                return { ...doc, status: 'VERIFIED', discrepancies: [], fileName: reuploadFile.name };
              }
              return doc;
            });
            const hasRemainingFlags = updatedDocs.some((d) => d.status === 'FLAGGED');
            return {
              ...sub,
              documents: updatedDocs,
              overallStatus: hasRemainingFlags ? 'FLAGGED' : 'VERIFIED',
              verifiedCount: updatedDocs.filter((d) => d.status === 'VERIFIED').length,
              flaggedCount: updatedDocs.filter((d) => d.status === 'FLAGGED').length,
            };
          }
          return sub;
        })
      );
      showSuccess('Document re-uploaded successfully. Re-verification passed.');
      setReuploadDoc(null);
      setReuploadFile(null);
      setIsReuploading(false);
    }, 600);
  };

  return (
    <div className="space-y-6 font-sans">
      <PageHeader
        title={`Verification Report — ${submission.purposeTitle}`}
        subtitle={`Submitted on ${formatDate(submission.submittedAt)} • Candidate: ${submission.candidateName}`}
        breadcrumbItems={[
          { label: 'Dashboard', path: '/dashboard' },
          { label: 'Verification History', path: '/history' },
          { label: submission.purposeTitle }
        ]}
        action={
          <Link to="/history">
            <Button variant="outline" size="sm" icon={ArrowLeft}>
              Back to History
            </Button>
          </Link>
        }
      />

      {/* Dynamic Status Banner */}
      <div
        className={`p-6 rounded-2xl border shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
          submission.overallStatus === 'VERIFIED'
            ? 'bg-emerald-50 border-emerald-200'
            : 'bg-amber-50 border-amber-200'
        }`}
      >
        <div className="flex items-start gap-4">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${
              submission.overallStatus === 'VERIFIED'
                ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
                : 'bg-amber-100 text-amber-700 border-amber-200'
            }`}
          >
            {submission.overallStatus === 'VERIFIED' ? (
              <CheckCircle2 className="w-6 h-6" />
            ) : (
              <AlertTriangle className="w-6 h-6" />
            )}
          </div>

          <div>
            <div className="flex items-center gap-3">
              <h3 className="text-base font-bold text-slate-900 font-heading">
                {submission.overallStatus === 'VERIFIED'
                  ? 'Verification Complete — All Documents Approved'
                  : `${flaggedDocuments.length} Action Required Item Flagged`}
              </h3>
              <StatusBadge statusKey={submission.overallStatus} />
            </div>
            <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
              {submission.overallStatus === 'VERIFIED'
                ? 'All document fields matched expected registry records. Metadata checks passed.'
                : 'A minor text mismatch was flagged during verification. Click "Re-upload Document" on the item below to resolve this item.'}
            </p>
          </div>
        </div>
      </div>

      {/* Progress Steps: Submitted → Under Review → Verified → Completed */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-card space-y-4">
        <h3 className="text-sm font-bold text-slate-900 font-heading border-b border-slate-100 pb-3">
          Verification Progress Lifecycle
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {[
            { step: '1. Submitted', label: 'Documents Ingested', active: true },
            { step: '2. Under Review', label: 'Record Cross-Check', active: true },
            { step: '3. Verified', label: submission.overallStatus === 'VERIFIED' ? 'Validation Passed' : '1 Item Flagged', active: true },
            { step: '4. Completed', label: 'Final Report Issued', active: submission.overallStatus === 'VERIFIED' },
          ].map((s, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-1 font-heading">
                <span>{s.step}</span>
                <span className={s.active && (idx < 2 || submission.overallStatus === 'VERIFIED') ? 'text-emerald-600' : 'text-amber-600'}>
                  ✓
                </span>
              </div>
              <p className="text-[11px] text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Document Validation Matrix Table */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-card space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h3 className="text-base font-bold text-slate-900 font-heading">Document Validation Matrix</h3>
          <span className="text-xs font-semibold text-slate-500">
            Applicant: {submission.candidateName}
          </span>
        </div>

        <div className="space-y-6">
          {submission.documents.map((doc) => (
            <div key={doc.id} className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-blue-600 shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 font-heading">{doc.title}</h4>
                    <p className="text-xs text-slate-500">{doc.fileName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <StatusBadge statusKey={doc.status} />
                  {doc.status === 'FLAGGED' && (
                    <Button
                      variant="danger"
                      size="sm"
                      icon={RefreshCw}
                      onClick={() => setReuploadDoc(doc)}
                    >
                      Re-upload Document
                    </Button>
                  )}
                </div>
              </div>

              {/* Field Comparison Grid */}
              {doc.extractedData && (
                <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-slate-100/70 text-slate-600 font-semibold border-b border-slate-200 uppercase tracking-wider text-[10px] font-heading">
                      <tr>
                        <th className="p-3">Field Name</th>
                        <th className="p-3">Document Value</th>
                        <th className="p-3">Registry Record</th>
                        <th className="p-3">Verification Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {Object.keys(doc.extractedData).map((fieldKey) => {
                        const extractedVal = doc.extractedData[fieldKey];
                        const dbVal = doc.matchedDatabaseData?.[fieldKey] || extractedVal;
                        const isMatch = extractedVal === dbVal;

                        return (
                          <tr key={fieldKey} className="hover:bg-slate-50">
                            <td className="p-3 font-semibold text-slate-800 capitalize">
                              {fieldKey.replace(/([A-Z])/g, ' $1')}
                            </td>
                            <td className={`p-3 font-mono ${!isMatch ? 'text-rose-600 font-bold bg-rose-50' : ''}`}>
                              {extractedVal}
                            </td>
                            <td className="p-3 font-mono text-slate-800">{dbVal}</td>
                            <td className="p-3">
                              {isMatch ? (
                                <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold text-[11px]">
                                  <CheckCircle2 className="w-3.5 h-3.5" /> Exact Match
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-rose-600 font-semibold text-[11px]">
                                  <AlertTriangle className="w-3.5 h-3.5" /> Discrepancy
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Discrepancy Alert Hint */}
              {doc.discrepancies?.length > 0 && (
                <div className="p-3.5 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-800 space-y-1">
                  <p className="font-bold flex items-center gap-1.5 font-heading">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                    Mismatch Reason:
                  </p>
                  {doc.discrepancies.map((d, i) => (
                    <p key={i} className="text-rose-700 pl-5">
                      • {d.reason}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Re-upload Modal for Discrepancy Correction */}
      {reuploadDoc && (
        <Modal
          isOpen={!!reuploadDoc}
          onClose={() => setReuploadDoc(null)}
          title={`Re-upload Document — ${reuploadDoc.title}`}
        >
          <div className="space-y-4">
            <p className="text-xs text-slate-600">
              Select a clearer, high-resolution copy of your {reuploadDoc.title} to trigger re-verification.
            </p>

            <div className="p-4 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 text-center">
              <input
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={(e) => setReuploadFile(e.target.files[0])}
                className="hidden"
                id="reupload-file-input"
              />
              <label htmlFor="reupload-file-input" className="cursor-pointer block">
                <UploadCloud className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <span className="text-xs font-semibold text-blue-600">
                  {reuploadFile ? reuploadFile.name : 'Choose Replacement File'}
                </span>
                <p className="text-[11px] text-slate-400 mt-1">PDF or PNG (Max 2MB)</p>
              </label>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <Button variant="ghost" size="sm" onClick={() => setReuploadDoc(null)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                isLoading={isReuploading}
                onClick={handleReuploadSubmit}
                icon={RefreshCw}
              >
                Submit Replacement
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
