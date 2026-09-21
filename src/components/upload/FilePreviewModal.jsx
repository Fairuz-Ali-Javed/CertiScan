import React from 'react';
import { Modal } from '../common/Modal';
import { FileText, Download } from 'lucide-react';
import { Button } from '../common/Button';

export const FilePreviewModal = ({ isOpen, onClose, file }) => {
  if (!file) return null;

  const isImage = file.type?.startsWith('image/') || (typeof file.url === 'string' && file.url.match(/\.(jpeg|jpg|gif|png)$/i));

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Document Preview — ${file.name || file.fileName || 'Uploaded File'}`} maxWidth="max-w-2xl">
      <div className="flex flex-col items-center gap-4">
        {isImage && (file.previewUrl || file.fileUrl) ? (
          <img
            src={file.previewUrl || file.fileUrl}
            alt="Document preview"
            className="max-h-[60vh] object-contain rounded-lg border border-slate-200 shadow-sm"
          />
        ) : (
          <div className="w-full py-16 px-8 flex flex-col items-center justify-center bg-slate-50 border border-slate-200 rounded-xl">
            <FileText className="w-16 h-16 text-blue-600 mb-3" />
            <h4 className="text-sm font-semibold text-slate-800">{file.name || file.fileName}</h4>
            <p className="text-xs text-slate-500 mt-1">PDF Document Format</p>
          </div>
        )}

        <div className="w-full flex items-center justify-between pt-4 border-t border-slate-200">
          <div className="text-xs text-slate-500">
            <span className="font-semibold text-slate-700">Status: </span> Ready for verification check
          </div>
          <Button variant="outline" size="sm" icon={Download} onClick={onClose}>
            Download Copy
          </Button>
        </div>
      </div>
    </Modal>
  );
};
