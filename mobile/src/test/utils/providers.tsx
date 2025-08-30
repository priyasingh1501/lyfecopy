import type { ReactElement, ReactNode } from 'react';
import React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, RenderOptions } from '@testing-library/react-native';

// Mock AuthProvider (placeholder until real auth is implemented)
interface MockAuthContextValue {
  user: null;
  isLoading: false;
  login: jest.Mock;
  logout: jest.Mock;
  refreshToken: jest.Mock;
}

const MockAuthContext = React.createContext<MockAuthContextValue | undefined>(undefined);

const MockAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const mockValue: MockAuthContextValue = {
    user: null,
    isLoading: false,
    login: jest.fn(),
    logout: jest.fn(),
    refreshToken: jest.fn(),
  };

  return <MockAuthContext.Provider value={mockValue}>{children}</MockAuthContext.Provider>;
};

// Mock ThemeProvider (placeholder until theming PR)
const MockThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // This will be a no-op until theming is implemented
  return <>{children}</>;
};

interface AllProvidersProps {
  children: ReactNode;
  queryClient?: QueryClient;
}

const AllProviders: React.FC<AllProvidersProps> = ({ 
  children, 
  queryClient 
}) => {
  // Create a fresh QueryClient for each test to avoid cache pollution
  const testQueryClient = queryClient || new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // Disable retries in tests
        staleTime: Infinity, // Prevent background refetching
      },
      mutations: {
        retry: false,
      },
    },
    logger: {
      log: () => {}, // Silence QueryClient logs in tests
      warn: () => {},
      error: () => {},
    },
  });

  return (
    <QueryClientProvider client={testQueryClient}>
      <MockAuthProvider>
        <MockThemeProvider>
          {children}
        </MockThemeProvider>
      </MockAuthProvider>
    </QueryClientProvider>
  );
};

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  queryClient?: QueryClient;
}

/**
 * Custom render function that wraps components with necessary providers
 * Use this instead of @testing-library/react-native's render in tests
 */
export const renderWithProviders = (
  ui: ReactElement,
  options: CustomRenderOptions = {}
) => {
  const { queryClient, ...renderOptions } = options;

  const Wrapper: React.FC<{ children: ReactNode }> = ({ children }) => (
    <AllProviders queryClient={queryClient}>{children}</AllProviders>
  );

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

// Export everything from testing-library/react-native for convenience
export * from '@testing-library/react-native';

// Export the custom render as the default render
export { renderWithProviders as render };

// Export the mock context for use in tests that need to check auth state
export { MockAuthContext };