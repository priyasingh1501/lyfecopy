/** @type {import('jest').Config} */
module.exports = {
  preset: 'expo',
  
  // Transform configuration
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  
  // Test environment setup
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.tsx'],
  
  // Test file patterns
  testMatch: [
    '**/__tests__/**/*.test.(js|jsx|ts|tsx)',
    '**/?(*.)+(spec|test).(js|jsx|ts|tsx)',
  ],
  
  // Module name mapping for path aliases
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@api/(.*)$': '<rootDir>/src/api/$1',
    '^@features/(.*)$': '<rootDir>/src/features/$1',
    '^@navigation/(.*)$': '<rootDir>/src/navigation/$1',
    '^@stores/(.*)$': '<rootDir>/src/stores/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
  },
  
  // File extensions Jest will look for
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  
  // Ignore patterns
  testPathIgnorePatterns: [
    '/node_modules/',
    '/.expo/',
    '/dist/',
    '/build/',
  ],
  
  // Coverage configuration
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/test/**/*',
    '!src/**/__tests__/**/*',
  ],
  
  coverageDirectory: 'coverage',
  
  coverageReporters: [
    'text',
    'lcov',
    'html',
    'json',
  ],
  
  // Coverage thresholds (can be adjusted based on team standards)
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  
  // Clear mocks between tests
  clearMocks: true,
  
  // Verbose output during test runs
  verbose: true,
};