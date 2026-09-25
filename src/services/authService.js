/**
 * CertiScan Authentication Service Layer
 * Bridges frontend Auth Context with teammate FastAPI backend auth endpoints (or mock fallback).
 */

import { apiRequest } from './api';
import { currentUser, adminUser } from '../data/mockData';

export const authService = {
  /**
   * Login user with credentials or role selection
   */
  async login({ role, fullName, email, phone }) {
    try {
      // Attempt backend auth endpoint if available
      const data = await apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ role, fullName, email, phone }),
      });
      return { success: true, user: data.user };
    } catch {
      // Clean fallback for prototype/standalone development
      const selected = role === 'ADMIN' ? adminUser : {
        ...currentUser,
        fullName: fullName || currentUser.fullName,
        email: email || currentUser.email,
        phone: phone || currentUser.phone,
      };
      return { success: true, user: selected };
    }
  },

  /**
   * Register new applicant profile
   */
  async register(regData) {
    try {
      const data = await apiRequest('/auth/register', {
        method: 'POST',
        body: JSON.stringify(regData),
      });
      return { success: true, user: data.user };
    } catch {
      const newApplicant = {
        ...currentUser,
        fullName: regData.fullName || currentUser.fullName,
        email: regData.email || currentUser.email,
        phone: regData.phone || currentUser.phone,
      };
      return { success: true, user: newApplicant };
    }
  },

  /**
   * Logout current user
   */
  async logout() {
    try {
      await apiRequest('/auth/logout', { method: 'POST' });
    } catch {
      // Local clean logout
    }
    return { success: true };
  }
};
