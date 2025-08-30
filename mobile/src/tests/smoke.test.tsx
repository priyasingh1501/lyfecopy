/**
 * Basic smoke tests to verify mobile app structure
 * These tests verify that all main components can be imported and have correct structure
 */

// Import all main components to check for compilation errors
import App from '../App';
import DashboardScreen from '../features/dashboard/DashboardScreen';
import TasksScreen from '../features/tasks/TasksScreen';
import TaskDetailScreen from '../features/tasks/TaskDetailScreen';
import EditTaskScreen from '../features/tasks/EditTaskScreen';
import HealthHomeScreen from '../features/health/HealthHomeScreen';
import LogWorkoutScreen from '../features/health/LogWorkoutScreen';
import LogMealScreen from '../features/health/LogMealScreen';
import SettingsScreen from '../features/settings/SettingsScreen';

// Import utilities and stores
import { useUIStore } from '../stores/uiStore';
import { formatDate, isToday, getRelativeTime } from '../utils/date';

// Test that all components export properly
describe('Mobile App Component Structure', () => {
  test('All main components should be importable', () => {
    expect(App).toBeDefined();
    expect(DashboardScreen).toBeDefined();
    expect(TasksScreen).toBeDefined();
    expect(TaskDetailScreen).toBeDefined();
    expect(EditTaskScreen).toBeDefined();
    expect(HealthHomeScreen).toBeDefined();
    expect(LogWorkoutScreen).toBeDefined();
    expect(LogMealScreen).toBeDefined();
    expect(SettingsScreen).toBeDefined();
  });

  test('Utility functions should work correctly', () => {
    const now = new Date();
    
    // Test date formatting
    expect(typeof formatDate(now)).toBe('string');
    expect(formatDate(now)).toMatch(/\w+/); // Should contain text
    
    // Test date checking
    expect(isToday(now)).toBe(true);
    expect(typeof getRelativeTime(now)).toBe('string');
    expect(getRelativeTime(now)).toBe('now');
  });

  test('UI store should initialize correctly', () => {
    const store = useUIStore.getState();
    
    expect(typeof store.darkMode).toBe('boolean');
    expect(typeof store.isOnline).toBe('boolean');
    expect(typeof store.activeTab).toBe('string');
    expect(typeof store.toggleDarkMode).toBe('function');
    expect(typeof store.setOnlineStatus).toBe('function');
    expect(typeof store.setActiveTab).toBe('function');
  });
});