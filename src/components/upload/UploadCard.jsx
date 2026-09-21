import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, CheckCircle2, AlertCircle, Eye, Trash2, RefreshCw } from 'lucide-react';
import { cn } from '../../utils/cn';
import { formatFileSize } from '../../utils/formatters';
import { validateFile } from '../../utils/validators';
import { FilePreviewModal } from './FilePreviewModal';

export const UploadCard = ({
  docType,
  file,
  onFileSelect,
  onFileRemove,
  disabled = false
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    if (disabled) return;
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const processFile = (selectedFile) => {
    if (!selectedFile) return;
    setError(null);

    const validation = validateFile(selectedFile, ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'], docType.maxSizeMB || 2);
    if (!validation.isValid) {
      setError(validation.message);
      return;
    }

    setIsUploading(true);
    setUploadProgress(15);
    const timer = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsUploading(false);
          if (selectedFile.type.startsWith('image/')) {
            selectedFile.previewUrl = URL.createObjectURL(selectedFile);
          }
          onFileSelect(docType.id, selectedFile);
          return 100;
        }
        return prev + 25;
      });
    }, 100);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (disabled) return;
    const droppedFile = e.dataTransfer.files[0];
    processFile(droppedFile);
  };

  const handleInputChange = (e) => {
    const selectedFile = e.target.files[0];
    processFile(selectedFile);
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    setError(null);
    setUploadProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = '';
    onFileRemove(docType.id);
  };

  return (
    <>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !file && !isUploading && fileInputRef.current?.click()}
        className={cn(
          'relative flex flex-col justify-between p-6 rounded-2xl border-2 transition-all duration-200 bg-white font-sans select-none',
          file
            ? 'border-emerald-300/80 bg-emerald-50/10 shadow-xs'
            : isDragOver
            ? 'border-blue-500 bg-blue-50/40 ring-4 ring-blue-100 scale-[1.01]'
            : error
            ? 'border-rose-300 bg-rose-50/20'
            : 'border-dashed border-slate-300/90 hover:border-blue-500 hover:bg-blue-50/20 cursor-pointer shadow-subtle hover:shadow-card-hover'
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={docType.allowedFormats.join(',')}
          onChange={handleInputChange}
          className="hidden"
          disabled={disabled}
        />

        {/* Card Header Info */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                'w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border transition-colors',
                file
                  ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
                  : error
                  ? 'bg-rose-100 text-rose-700 border-rose-200'
                  : 'bg-blue-50 text-blue-600 border-blue-100'
              )}
            >
              {file ? (
                <CheckCircle2 className="w-5.5 h-5.5" />
              ) : (
                <FileText className="w-5.5 h-5.5" />
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-slate-900 font-heading">{docType.title}</h4>
                {docType.isRequired ? (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-100 text-rose-700">
                    Required
                  </span>
                ) : (
                  <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                    Optional
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{docType.subtitle}</p>
            </div>
          </div>
        </div>

        {/* Upload State / Body */}
        {isUploading ? (
          <div className="py-4 flex flex-col gap-2">
            <div className="flex justify-between text-xs font-medium text-slate-600">
              <span className="flex items-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-600" />
                Encrypting & Ingesting...
              </span>
              <span className="font-mono font-bold text-blue-700">{uploadProgress}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-150 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        ) : file ? (
          <div className="py-3 px-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-800 shrink-0">
                {file.name?.split('.').pop() || 'PDF'}
              </span>
              <div className="truncate">
                <p className="text-xs font-semibold text-slate-800 truncate">{file.name}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{formatFileSize(file.size)}</p>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => setIsPreviewOpen(true)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                title="Preview document"
              >
                <Eye className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleRemove}
                className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                title="Remove file"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="py-5 flex flex-col items-center justify-center text-center border border-dashed border-slate-200 rounded-xl bg-slate-50/50 hover:bg-white transition-colors">
            <UploadCloud className="w-7 h-7 text-slate-400 mb-2" />
            <p className="text-xs font-medium text-slate-700">
              Drag & drop file here or <span className="text-blue-600 underline underline-offset-2 font-semibold">browse</span>
            </p>
            <p className="text-[11px] text-slate-400 mt-1">
              Supports PDF, PNG, JPG (Max {docType.maxSizeMB || 2}MB)
            </p>
          </div>
        )}

        {/* Error Validation Hint */}
        {error && (
          <div className="mt-2.5 flex items-center gap-1.5 text-xs text-rose-600 font-medium">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {file && (
        <FilePreviewModal
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          file={file}
        />
      )}
    </>
  );
};
