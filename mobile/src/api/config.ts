import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';

// Get API base URL from app config
const API_BASE_URL = Constants.expoConfig?.extra?.apiBaseUrl || 'http://localhost:5000';

interface ApiError {
  message: string;
  status?: number;
}

class ApiError extends Error {
  status?: number;
  
  constructor(message: string, status?: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

// Generic API fetch wrapper with authentication
export async function apiFetch<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Get stored token
  const token = await SecureStore.getItemAsync('authToken');
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    // Handle non-JSON responses (like 204 No Content)
    if (response.status === 204) {
      return {} as T;
    }
    
    let data;
    try {
      data = await response.json();
    } catch (e) {
      // If response isn't JSON, throw error with status
      throw new ApiError(`Network error: ${response.statusText}`, response.status);
    }

    if (!response.ok) {
      throw new ApiError(
        data.message || data.error || `HTTP ${response.status}`,
        response.status
      );
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    // Network or other errors
    throw new ApiError(
      error instanceof Error ? error.message : 'Network request failed'
    );
  }
}

// Helper for GET requests
export function apiGet<T = any>(endpoint: string): Promise<T> {
  return apiFetch<T>(endpoint, { method: 'GET' });
}

// Helper for POST requests
export function apiPost<T = any>(endpoint: string, data?: any): Promise<T> {
  return apiFetch<T>(endpoint, {
    method: 'POST',
    body: data ? JSON.stringify(data) : undefined,
  });
}

// Helper for PUT requests
export function apiPut<T = any>(endpoint: string, data?: any): Promise<T> {
  return apiFetch<T>(endpoint, {
    method: 'PUT',
    body: data ? JSON.stringify(data) : undefined,
  });
}

// Helper for DELETE requests
export function apiDelete<T = any>(endpoint: string): Promise<T> {
  return apiFetch<T>(endpoint, { method: 'DELETE' });
}

export { API_BASE_URL, ApiError };