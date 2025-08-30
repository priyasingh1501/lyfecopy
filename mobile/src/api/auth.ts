import { z } from 'zod';
import * as SecureStore from 'expo-secure-store';
import { apiPost, apiFetch } from './config';

// User schema for validation
const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().optional(),
  createdAt: z.string(),
});

// Auth response schema
const AuthResponseSchema = z.object({
  token: z.string(),
  user: UserSchema,
});

export type User = z.infer<typeof UserSchema>;
export type AuthResponse = z.infer<typeof AuthResponseSchema>;

// Login credentials
export interface LoginCredentials {
  email: string;
  password: string;
}

// Registration data
export interface RegisterData {
  email: string;
  password: string;
  name?: string;
}

/**
 * Authenticate user with email and password
 */
export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  const response = await apiPost('/api/auth/login', credentials);
  
  // Validate response structure
  const validatedResponse = AuthResponseSchema.parse(response);
  
  // Store token securely
  await SecureStore.setItemAsync('authToken', validatedResponse.token);
  
  return validatedResponse;
}

/**
 * Register new user account
 */
export async function register(userData: RegisterData): Promise<AuthResponse> {
  const response = await apiPost('/api/auth/register', userData);
  
  // Validate response structure
  const validatedResponse = AuthResponseSchema.parse(response);
  
  // Store token securely
  await SecureStore.setItemAsync('authToken', validatedResponse.token);
  
  return validatedResponse;
}

/**
 * Refresh authentication token
 */
export async function refreshToken(): Promise<{ token: string }> {
  const currentToken = await SecureStore.getItemAsync('authToken');
  
  if (!currentToken) {
    throw new Error('No token available to refresh');
  }

  const response = await apiFetch('/api/auth/refresh', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${currentToken}`,
    },
  });

  // Validate and store new token
  if (response.token) {
    await SecureStore.setItemAsync('authToken', response.token);
    return { token: response.token };
  }

  throw new Error('Failed to refresh token');
}

/**
 * Get current user profile
 */
export async function getCurrentUser(): Promise<User> {
  const response = await apiFetch('/api/auth/profile', {
    method: 'GET',
  });
  
  // Validate user data
  return UserSchema.parse(response.user || response);
}

/**
 * Logout user (clear stored token)
 */
export async function logout(): Promise<void> {
  await SecureStore.deleteItemAsync('authToken');
}

/**
 * Check if user has a valid stored token
 */
export async function getStoredToken(): Promise<string | null> {
  return await SecureStore.getItemAsync('authToken');
}

/**
 * Update user profile
 */
export async function updateProfile(updates: Partial<User>): Promise<User> {
  const response = await apiFetch('/api/auth/profile', {
    method: 'PUT',
    body: JSON.stringify(updates),
  });
  
  return UserSchema.parse(response.user || response);
}