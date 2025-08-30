import '@testing-library/jest-native/extend-expect';

// Extend Jest matchers for React Native testing
import { configure } from '@testing-library/react-native';

// Configure testing library defaults
configure({
  // Increase timeout for async queries (useful for React Query tests)
  asyncUtilTimeout: 5000,
});

// Mock React Native modules that might not be available in test environment
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Mock Expo modules that might cause issues in tests
jest.mock('expo-constants', () => ({
  default: {
    expoConfig: {
      extra: {
        apiBaseUrl: 'http://localhost:5000',
      },
    },
  },
}));

jest.mock('expo-secure-store', () => ({
  getItemAsync: jest.fn(),
  setItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}));

// Mock React Navigation if needed
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
      dispatch: jest.fn(),
    }),
    useRoute: () => ({
      params: {},
    }),
  };
});

// Silence console.warn in tests unless explicitly needed
const originalWarn = console.warn;
beforeAll(() => {
  console.warn = (...args: any[]) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render is no longer supported')
    ) {
      return;
    }
    originalWarn.call(console, ...args);
  };
});

afterAll(() => {
  console.warn = originalWarn;
});