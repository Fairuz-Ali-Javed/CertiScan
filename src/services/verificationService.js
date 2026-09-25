/**
 * CertiScan Verification Service Layer
 * Centralizes document verification application lifecycle, history, status, and re-uploads.
 */

import { apiRequest } from './api';
import { initialSubmissions, initialAdminQueue } from '../data/mockData';

export const verificationService = {
  /**
   * Submit complete purpose-driven verification application package
   */
  async createVerification({ purposeId, personalInfo, uploadedFiles }) {
    try {
      const formData = new FormData();
      formData.append('purpose_id', purposeId);
      formData.append('personal_info', JSON.stringify(personalInfo));

      Object.entries(uploadedFiles).forEach(([docTypeId, file]) => {
        formData.append(`file_${docTypeId}`, file);
      });

      const response = await apiRequest('/verification/submit', {
        method: 'POST',
        body: formData,
      });

      return { success: true, verification: response };
    } catch {
      // Prototype mock fallback
      const mockRefId = `CS-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      return {
        success: true,
        referenceId: mockRefId,
        redirectUrl: `/status/${mockRefId}`,
        isMock: true
      };
    }
  },

  /**
   * Retrieve verification application status by ID
   */
  async getVerificationStatus(id) {
    try {
      const data = await apiRequest(`/verification/status/${id}`);
      return { success: true, submission: data };
    } catch {
      const sub = initialSubmissions.find((s) => s.id === id || s.referenceId === id) || initialSubmissions[0];
      return { success: true, submission: sub, isMock: true };
    }
  },

  /**
   * Get all verification application history for logged-in candidate
   */
  async getHistory() {
    try {
      const data = await apiRequest('/verification/history');
      return { success: true, history: data };
    } catch {
      return { success: true, history: initialSubmissions, isMock: true };
    }
  },

  /**
   * Get admin verification audit queue
   */
  async getAdminQueue() {
    try {
      const data = await apiRequest('/admin/queue');
      return { success: true, queue: data };
    } catch {
      return { success: true, queue: initialAdminQueue, isMock: true };
    }
  },

  /**
   * Re-upload document file for flagged discrepancy item
   */
  async reuploadDocument(docId, replacementFile) {
    try {
      const formData = new FormData();
      formData.append('file', replacementFile);
      const data = await apiRequest(`/verification/reupload/${docId}`, {
        method: 'POST',
        body: formData,
      });
      return { success: true, updatedDocument: data };
    } catch {
      return {
        success: true,
        updatedDocument: { id: docId, status: 'VERIFIED', fileName: replacementFile.name },
        isMock: true
      };
    }
  }
};
