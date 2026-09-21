import React from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { Button } from '../components/common/Button';
import { useToast } from '../hooks/useToast';
import { Bell } from 'lucide-react';

export const SettingsPage = () => {
  const { showSuccess } = useToast();

  return (
    <div className="space-y-6 font-sans max-w-4xl mx-auto">
      <PageHeader
        title="Account & Portal Settings"
        subtitle="Manage privacy controls, mismatch alerts, and security preferences."
        breadcrumbItems={[
          { label: 'Dashboard', path: '/dashboard' },
          { label: 'Settings' }
        ]}
      />

      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-card space-y-6">
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <Bell className="w-4 h-4 text-blue-600" />
            Discrepancy & Alert Notifications
          </h3>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 cursor-pointer">
              <div>
                <p className="text-xs font-semibold text-slate-900">Email Discrepancy Alerts</p>
                <p className="text-[11px] text-slate-500">Receive instant email notifications when an OCR discrepancy is flagged.</p>
              </div>
              <input type="checkbox" defaultChecked className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4" />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 cursor-pointer">
              <div>
                <p className="text-xs font-semibold text-slate-900">SMS Verification Notifications</p>
                <p className="text-[11px] text-slate-500">Receive text alerts when document verification completes.</p>
              </div>
              <input type="checkbox" defaultChecked className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4" />
            </label>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <Button variant="primary" size="sm" onClick={() => showSuccess('Settings saved successfully!')}>
            Save Preferences
          </Button>
        </div>
      </div>
    </div>
  );
};
