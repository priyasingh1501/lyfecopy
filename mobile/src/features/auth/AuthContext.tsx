import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import { 
  login as apiLogin, 
  register as apiRegister,
  logout as apiLogout,
  getCurrentUser,
  refreshToken as apiRefreshToken,
  getStoredToken,
  User,
  LoginCredentials,
  RegisterData 
} from '../../api/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>;
  register: (userData: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state on app load
  useEffect(() => {
    initializeAuth();
  }, []);

  // Auto-refresh token every 12 minutes (placeholder for future refinement)
  useEffect(() => {
    if (user) {
      const interval = setInterval(() => {
        refreshToken();
      }, 12 * 60 * 1000); // 12 minutes

      return () => clearInterval(interval);
    }
  }, [user]);

  const initializeAuth = async () => {
    try {
      const token = await getStoredToken();
      
      if (token) {
        // Validate token by fetching user profile
        const userData = await getCurrentUser();
        setUser(userData);
      }
    } catch (error) {
      // Token might be invalid, clear it
      await apiLogout();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await apiLogin(credentials);
      setUser(response.user);
      return { success: true };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      return { success: false, error: message };
    }
  };

  const register = async (userData: RegisterData) => {
    try {
      const response = await apiRegister(userData);
      setUser(response.user);
      return { success: true };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Registration failed';
      return { success: false, error: message };
    }
  };

  const logout = async () => {
    try {
      await apiLogout();
      setUser(null);
    } catch (error) {
      // Even if logout fails, clear user state
      setUser(null);
    }
  };

  const refreshToken = async () => {
    try {
      await apiRefreshToken();
      return { success: true };
    } catch (error) {
      // If refresh fails, log out user
      await logout();
      const message = error instanceof Error ? error.message : 'Token refresh failed';
      return { success: false, error: message };
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    refreshToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}