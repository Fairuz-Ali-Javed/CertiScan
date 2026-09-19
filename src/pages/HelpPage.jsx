import React from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { FileCheck2, AlertCircle, CheckCircle2 } from 'lucide-react';

export const HelpPage = () => {
  return (
    <div className="space-y-6 font-sans max-w-4xl mx-auto">
      <PageHeader
        title="Help Desk & Verification Guidelines"
        subtitle="Troubleshooting, document specifications, and scan clarity rules."
        breadcrumbItems={[
          { label: 'Dashboard', path: '/dashboard' },
          { label: 'Help' }
        ]}
      />

      {/* Guidelines Card */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-card space-y-4">
        <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
          <FileCheck2 className="w-5 h-5 text-blue-600" />
          Document Quality & Upload Rules
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5 text-emerald-700">
              <CheckCircle2 className="w-4 h-4" /> Allowed Format Specs
            </h4>
            <p className="text-slate-600">• PDF, PNG, JPG, or JPEG formats only.</p>
            <p className="text-slate-600">• Maximum file size limit: 2.0 MB per document.</p>
            <p className="text-slate-600">• Minimum resolution: 300 DPI for clear text extraction.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5 text-rose-700">
              <AlertCircle className="w-4 h-4" /> Common OCR Rejection Reasons
            </h4>
            <p className="text-slate-600">• Blurry or cropped corners hiding registration numbers.</p>
            <p className="text-slate-600">• Severe glare or watermarks obscuring marksheet scores.</p>
            <p className="text-slate-600">• Digital tampering or modified file headers.</p>
          </div>
        </div>
      </div>

      {/* FAQ Accordion Section */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-card space-y-4">
        <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
          Frequently Asked Questions
        </h3>

        <div className="space-y-3 text-xs">
          {[
            {
              q: 'What should I do if my document is flagged with a discrepancy?',
              a: 'Click on "Inspect & Fix Discrepancy" from your dashboard or status page. You will see which field failed cross-checking and can re-upload a replacement document.'
            },
            {
              q: 'How long does automated OCR verification take?',
              a: 'Verification is typically completed within seconds. In rare cases requiring manual administrator audit, it takes up to 24 hours.'
            },
            {
              q: 'Is my uploaded data secure?',
              a: 'Yes. CertiScan utilizes zero-cost local pipeline encryption. Your files are processed locally on institutional servers without being sent to external cloud APIs.'
            }
          ].map((faq, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <p className="font-bold text-slate-900 mb-1">Q: {faq.q}</p>
              <p className="text-slate-600 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
