import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import { VERIFICATION_PURPOSES } from '../constants/documentTypes';
import { PageHeader } from '../components/common/PageHeader';
import { UploadCard } from '../components/upload/UploadCard';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import {
  User,
  Mail,
  Phone,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  GraduationCap,
  Award,
  Building2,
  Briefcase,
  Landmark,
  FileText,
  Layers
} from 'lucide-react';

const purposeIconMap = {
  GraduationCap,
  Award,
  Building2,
  Briefcase,
  Landmark,
  FileText
};

export const UploadPage = () => {
  const { user } = useAuth();
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Selected Purpose (Default: College Admission)
  const [selectedPurposeId, setSelectedPurposeId] = useState('college_admission');

  // Applicant Details
  const [personalInfo, setPersonalInfo] = useState({
    fullName: user?.fullName || 'Alex Johnson',
    email: user?.email || 'alex.johnson@example.com',
    phone: user?.phone || '+1 (555) 019-2831',
  });

  // Dynamic Upload Cards state
  const [uploadedFiles, setUploadedFiles] = useState({});

  // Active Purpose Configuration
  const currentPurpose =
    VERIFICATION_PURPOSES.find((p) => p.id === selectedPurposeId) ||
    VERIFICATION_PURPOSES[0];

  const requiredDocList = currentPurpose.documents;

  const handleFileSelect = (docTypeId, file) => {
    setUploadedFiles((prev) => ({ ...prev, [docTypeId]: file }));
  };

  const handleFileRemove = (docTypeId) => {
    setUploadedFiles((prev) => {
      const copy = { ...prev };
      delete copy[docTypeId];
      return copy;
    });
  };

  // Check required docs uploaded
  const mandatoryDocIds = requiredDocList
    .filter((d) => d.isRequired)
    .map((d) => d.id);
  const hasAllMandatoryDocs = mandatoryDocIds.every((id) => uploadedFiles[id]);

  const handleNextStep = () => {
    if (step === 1) {
      if (!personalInfo.fullName || !personalInfo.email) {
        showError('Please fill in applicant details.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!hasAllMandatoryDocs) {
        showError('Please upload all mandatory document files for your selected purpose.');
        return;
      }
      setStep(3);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      showSuccess(`Verification application for ${currentPurpose.title} submitted successfully!`);
      setIsSubmitting(false);
      navigate('/status/CS-2026-9041');
    }, 600);
  };

  return (
    <div className="space-y-6 font-sans">
      <PageHeader
        title="Document Upload Portal"
        subtitle="Select your verification purpose to load only the required document upload cards."
        breadcrumbItems={[
          { label: 'Dashboard', path: '/dashboard' },
          { label: 'Upload Portal' }
        ]}
      />

      {/* Stepper Header */}
      <div className="p-4 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-card">
        <div className="flex items-center justify-between max-w-3xl mx-auto">
          {[
            { num: 1, title: 'Purpose & Info' },
            { num: 2, title: 'Upload Required Cards' },
            { num: 3, title: 'Review & Submit' }
          ].map((s, idx) => (
            <React.Fragment key={s.num}>
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    step === s.num
                      ? 'bg-blue-600 text-white shadow-sm ring-4 ring-blue-100'
                      : step > s.num
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {step > s.num ? '✓' : s.num}
                </div>
                <span
                  className={`text-xs font-semibold hidden sm:inline-block ${
                    step === s.num ? 'text-slate-900 font-heading' : 'text-slate-500'
                  }`}
                >
                  {s.title}
                </span>
              </div>
              {idx < 2 && <div className="flex-1 h-0.5 bg-slate-200 mx-3 hidden sm:block" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* STEP 1: VERIFICATION PURPOSE SELECTION & IDENTITY INFO */}
      {step === 1 && (
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-card max-w-4xl mx-auto space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-base font-bold text-slate-900 font-heading">
              1. Select Verification Purpose
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Selecting a purpose automatically loads only the exact documents required by your organization.
            </p>
          </div>

          {/* Purpose Choice Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {VERIFICATION_PURPOSES.map((purpose) => {
              const IconComp = purposeIconMap[purpose.icon] || Layers;
              const isSelected = selectedPurposeId === purpose.id;

              return (
                <div
                  key={purpose.id}
                  onClick={() => {
                    setSelectedPurposeId(purpose.id);
                    setUploadedFiles({});
                  }}
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/40 ring-2 ring-blue-100 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-slate-50/40 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start gap-3 mb-2">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border ${
                        isSelected
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-slate-600 border-slate-200'
                      }`}
                    >
                      <IconComp className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 font-heading">{purpose.title}</h4>
                      <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5 leading-relaxed">
                        {purpose.description}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-blue-700 mt-2 block">
                    {purpose.documents.length} Required Documents →
                  </span>
                </div>
              );
            })}
          </div>

          <div className="border-t border-slate-100 pt-6 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-heading">
              Applicant Details
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                label="Full Name"
                value={personalInfo.fullName}
                onChange={(e) => setPersonalInfo({ ...personalInfo, fullName: e.target.value })}
                icon={User}
                required
              />

              <Input
                label="Email Address"
                type="email"
                value={personalInfo.email}
                onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                icon={Mail}
                required
              />

              <Input
                label="Mobile Number"
                value={personalInfo.phone}
                onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                icon={Phone}
                required
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <Button variant="primary" size="md" onClick={handleNextStep} icon={ArrowRight} iconPosition="right">
              Proceed to Upload Required Cards
            </Button>
          </div>
        </div>
      )}

      {/* STEP 2: DYNAMIC PURPOSE-BASED UPLOAD CARDS */}
      {step === 2 && (
        <div className="space-y-6 max-w-5xl mx-auto">
          <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100 flex items-center justify-between text-xs text-blue-900 font-medium">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              Purpose: <strong className="text-blue-950 font-bold">{currentPurpose.title}</strong> • Uploading {requiredDocList.length} Document Cards
            </span>
            <span className="font-bold text-blue-700">
              {Object.keys(uploadedFiles).length} / {requiredDocList.length} Selected
            </span>
          </div>

          {/* Dynamic Grid of Cards matching purpose config */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {requiredDocList.map((docType) => (
              <UploadCard
                key={docType.id}
                docType={docType}
                file={uploadedFiles[docType.id]}
                onFileSelect={handleFileSelect}
                onFileRemove={handleFileRemove}
              />
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            <Button variant="outline" size="md" onClick={() => setStep(1)} icon={ArrowLeft}>
              Change Purpose & Details
            </Button>

            <Button
              variant="primary"
              size="md"
              onClick={handleNextStep}
              disabled={!hasAllMandatoryDocs}
              icon={ArrowRight}
              iconPosition="right"
            >
              Review Application
            </Button>
          </div>
        </div>
      )}

      {/* STEP 3: REVIEW & SUBMIT */}
      {step === 3 && (
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-card max-w-3xl mx-auto space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-base font-bold text-slate-900 font-heading">Step 3: Review Application & Declaration</h3>
            <p className="text-xs text-slate-500 mt-1">
              Verify applicant details and document uploads for <strong className="text-slate-800">{currentPurpose.title}</strong>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Verification Purpose:</span>
              <span className="font-bold text-blue-700">{currentPurpose.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Applicant Name:</span>
              <span className="font-semibold text-slate-900">{personalInfo.fullName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Email Address:</span>
              <span className="font-semibold text-slate-900">{personalInfo.email}</span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-heading">
              Uploaded Document Cards ({Object.keys(uploadedFiles).length})
            </h4>
            {Object.entries(uploadedFiles).map(([id, file]) => {
              const docInfo = requiredDocList.find((d) => d.id === id);
              return (
                <div key={id} className="p-3 rounded-lg border border-slate-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span className="font-semibold text-slate-800">{docInfo?.title || id}:</span>
                    <span className="text-slate-600 truncate">{file.name}</span>
                  </div>
                  <span className="text-slate-400">{(file.size / 1024).toFixed(1)} KB</span>
                </div>
              );
            })}
          </div>

          <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100">
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
              <span className="text-xs text-slate-700 leading-relaxed">
                I hereby confirm that all submitted document files are authentic, clear, unedited copies of my official credentials for {currentPurpose.title}.
              </span>
            </label>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <Button variant="outline" size="md" onClick={() => setStep(2)} icon={ArrowLeft}>
              Modify Uploads
            </Button>

            <Button
              variant="primary"
              size="md"
              isLoading={isSubmitting}
              onClick={handleSubmit}
              icon={CheckCircle2}
            >
              Submit Application
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
