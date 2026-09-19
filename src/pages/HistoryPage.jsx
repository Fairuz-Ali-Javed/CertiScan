import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { initialSubmissions } from '../data/mockData';
import { PageHeader } from '../components/common/PageHeader';
import { StatusBadge } from '../components/common/StatusBadge';
import { SearchBar } from '../components/common/SearchBar';
import { Select } from '../components/common/Select';
import { EmptyState } from '../components/common/EmptyState';
import { Button } from '../components/common/Button';
import { formatDate } from '../utils/formatters';
import { Eye, UploadCloud } from 'lucide-react';

export const HistoryPage = () => {
  const [submissions] = useState(initialSubmissions);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filtered = submissions.filter((item) => {
    const matchesSearch =
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.candidateName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || item.overallStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 font-sans">
      <PageHeader
        title="Verification History"
        subtitle="Complete archive of all submitted credential batches."
        breadcrumbItems={[
          { label: 'Dashboard', path: '/dashboard' },
          { label: 'Verification History' }
        ]}
        action={
          <Link to="/upload">
            <Button variant="primary" size="sm" icon={UploadCloud}>
              New Submission
            </Button>
          </Link>
        }
      />

      {/* Filter Toolbar */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-card flex flex-col sm:flex-row items-center justify-between gap-4">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search by Reference ID or Candidate..."
          className="max-w-md"
        />

        <div className="w-full sm:w-auto flex items-center gap-3">
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={[
              { value: 'ALL', label: 'All Statuses' },
              { value: 'VERIFIED', label: 'Verified & Approved' },
              { value: 'FLAGGED', label: 'Discrepancy Flagged' },
              { value: 'PENDING', label: 'Pending Audit' }
            ]}
          />
        </div>
      </div>

      {/* Table */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-card">
        {filtered.length === 0 ? (
          <EmptyState
            title="No verification records found"
            description="Try adjusting your search query or filter settings."
            actionLabel="Clear Filters"
            onAction={() => {
              setSearchTerm('');
              setStatusFilter('ALL');
            }}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3.5">Reference ID</th>
                  <th className="p-3.5">Candidate Name</th>
                  <th className="p-3.5">Submission Date</th>
                  <th className="p-3.5">Documents</th>
                  <th className="p-3.5">Overall Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 font-bold text-slate-900">{item.id}</td>
                    <td className="p-3.5 font-medium">{item.candidateName}</td>
                    <td className="p-3.5 text-slate-500">{formatDate(item.submittedAt)}</td>
                    <td className="p-3.5">{item.documents.length} Files Attached</td>
                    <td className="p-3.5">
                      <StatusBadge statusKey={item.overallStatus} />
                    </td>
                    <td className="p-3.5 text-right">
                      <Link to={`/status/${item.id}`}>
                        <Button variant="outline" size="sm" icon={Eye}>
                          Inspect Matrix
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
