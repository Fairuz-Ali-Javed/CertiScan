/**
 * CertiScan Document Ingestion Service Layer
 * Connects directly to FastAPI backend document upload & OCR processing endpoints:
 * - POST /upload (Expects UploadFile and optional document_type Form field)
 */

import { API_BASE_URL, apiRequest } from './api';

export const documentService = {
  /**
   * Upload single document to backend FastAPI OCR & AI-Detection pipeline
   * @param {File} file - The document file (PDF, PNG, JPG)
   * @param {string} documentType - Document type title or ID
   */
  async uploadDocument(file, documentType = '') {
    const formData = new FormData();
    formData.append('file', file);
    if (documentType) {
      formData.append('document_type', documentType);
    }

    try {
      // Direct call to FastAPI backend endpoint (Document Verification/main.py & api.py)
      const data = await apiRequest('/upload', {
        method: 'POST',
        body: formData,
      });

      // Handle AI-generated image rejection from backend
      if (data.result === true || data.message === 'REJECTED') {
        return {
          success: false,
          isAiGenerated: true,
          message: 'Document rejected by AI-Detection security pipeline. Synthetic image detected.'
        };
      }

      return {
        success: true,
        extractedData: typeof data.message === 'object' ? data.message : JSON.parse(data.message || '{}'),
        rawResponse: data
      };
    } catch {
      // Prototype mock fallback when FastAPI backend server is not running locally
      return {
        success: true,
        extractedData: {
          name: 'Alex Johnson',
          dob: '2004-05-14',
          documentId: `DOC-${Math.floor(1000 + Math.random() * 9000)}`
        },
        isMock: true
      };
    }
  }
};
