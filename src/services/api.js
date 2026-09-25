/**
 * CertiScan Central API Service Layer Configuration
 * Base HTTP client for communicating with teammate FastAPI backend services.
 */

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

/**
 * Generic fetch wrapper for JSON requests
 */
export async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
  
  const defaultHeaders = {
    'Accept': 'application/json',
  };

  if (!(options.body instanceof FormData)) {
    defaultHeaders['Content-Type'] = 'application/json';
  }

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || errorData.message || `API Request failed with status ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.warn(`[CertiScan API Layer] Request to ${url} failed or offline. Error:`, error.message);
    throw error;
  }
}
