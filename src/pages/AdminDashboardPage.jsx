import React, { useState } from 'react';
import { initialAdminQueue } from '../data/mockData';
import { useToast } from '../hooks/useToast';
import { PageHeader } from '../components/common/PageHeader';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import {
  ShieldCheck,
  FileCheck2,
  AlertTriangle,
  Eye,
  CheckCircle2,
  XCircle,
  FileText
} from 'lucide-react';

export const AdminDashboardPage = () => {
  const { showSuccess } = useToast();
  const [queue, setQueue] = useState(initialAdminQueue);
  const [selectedAudit, setSelectedAudit] = useState(null);

  const handleAuditAction = (action) => {
    if (!selectedAudit) return;
    setQueue((prev) => prev.filter((item) => item.id !== selectedAudit.id));
    showSuccess(`Verification ${action === 'APPROVE' ? 'Approved' : 'Declined'} successfully.`);
    setSelectedAudit(null);
  };

  return (
    <div className="space-y-6 font-sans">
      <PageHeader
        title="Administrator Dashboard"
        subtitle="Verification & Compliance Unit • Audit Queue & Review Console"
        breadcrumbItems={[
          { label: 'Admin Portal' },
          { label: 'Audit Dashboard' }
        ]}
      />

      {/* Admin Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-card flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase text-slate-500">Submitted Batches</p>
            <h3 className="text-2xl font-extrabold text-slate-900 mt-1">24</h3>
            <p className="text-[11px] text-slate-400 mt-1">Total Ingested Applications</p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
            <FileText className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-card flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase text-slate-500">Approved Documents</p>
            <h3 className="text-2xl font-extrabold text-emerald-600 mt-1">21</h3>
            <p className="text-[11px] text-slate-400 mt-1">Validated & Confirmed</p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
            <FileCheck2 className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-card flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase text-slate-500">Pending Review Queue</p>
            <h3 className="text-2xl font-extrabold text-amber-600 mt-1">{queue.length}</h3>
            <p className="text-[11px] text-slate-400 mt-1">Needs Officer Audit</p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-card flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase text-slate-500">Audit Status</p>
            <h3 className="text-2xl font-extrabold text-slate-900 mt-1">Active</h3>
            <p className="text-[11px] text-slate-400 mt-1">Review Queue Online</p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Review Queue Table */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-card space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Pending Document Review Queue</h3>
            <p className="text-xs text-slate-500 mt-0.5">Submissions flagged for administrative approval.</p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800">
            {queue.length} Queue Items
          </span>
        </div>

        {queue.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-500">
            ✓ All flagged submissions have been reviewed and resolved!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3.5">Ref ID</th>
                  <th className="p-3.5">Applicant Name</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Flagged Credential</th>
                  <th className="p-3.5">Discrepancy Summary</th>
                  <th className="p-3.5 text-right">Audit Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {queue.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 font-bold text-slate-900">{item.id}</td>
                    <td className="p-3.5 font-semibold text-slate-800">{item.candidateName}</td>
                    <td className="p-3.5 text-slate-500">{item.category}</td>
                    <td className="p-3.5">
                      <span className="font-semibold text-slate-900">{item.flaggedDocument}</span>
                    </td>
                    <td className="p-3.5 text-rose-600 font-medium max-w-xs truncate">
                      {item.discrepancySummary}
                    </td>
                    <td className="p-3.5 text-right">
                      <Button
                        variant="primary"
                        size="sm"
                        icon={Eye}
                        onClick={() => setSelectedAudit(item)}
                      >
                        Inspect Document
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Document Inspector Modal */}
      {selectedAudit && (
        <Modal
          isOpen={!!selectedAudit}
          onClose={() => setSelectedAudit(null)}
          title={`Document Inspector — ${selectedAudit.candidateName} (${selectedAudit.id})`}
          maxWidth="max-w-3xl"
        >
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
              <p className="font-bold flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                Flagged Item Details:
              </p>
              <p className="text-amber-800 pl-5.5 font-medium">{selectedAudit.discrepancySummary}</p>
            </div>

            {/* Split Inspection View */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Document Image Mock */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col items-center justify-center text-center min-h-[200px]">
                <FileText className="w-12 h-12 text-blue-600 mb-2" />
                <p className="text-xs font-bold text-slate-800">{selectedAudit.flaggedDocument}</p>
                <p className="text-[11px] text-slate-400 mt-1">Uploaded PDF Scan Preview</p>
              </div>

              {/* Data Comparison */}
              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-3 text-xs">
                <h4 className="font-bold text-slate-900 border-b border-slate-100 pb-2">
                  Field Comparison Matrix
                </h4>
                <div className="space-y-2">
                  <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200">
                    <span className="text-rose-500 font-semibold block text-[10px] uppercase">Document Text</span>
                    <span className="font-mono font-bold text-rose-700 text-sm">Alex Morgon</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200">
                    <span className="text-emerald-500 font-semibold block text-[10px] uppercase">Registry Record</span>
                    <span className="font-mono font-bold text-emerald-700 text-sm">Alex Morgan</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <Button
                variant="outline"
                size="sm"
                icon={XCircle}
                onClick={() => handleAuditAction('REJECT')}
                className="text-rose-600 border-rose-200 hover:bg-rose-50"
              >
                Decline & Request Re-upload
              </Button>

              <Button
                variant="primary"
                size="sm"
                icon={CheckCircle2}
                onClick={() => handleAuditAction('APPROVE')}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                Manually Approve Document
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
