import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useAuth } from '../auth/AuthContext';
import { useUIStore } from '../../stores/uiStore';

export default function SettingsScreen() {
  const { user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useUIStore();
  
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [dataSync, setDataSync] = useState(true);

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
            } catch (error) {
              Alert.alert('Error', 'Failed to sign out. Please try again.');
            }
          },
        },
      ],
    );
  };

  const handleComingSoon = (feature: string) => {
    Alert.alert('Coming Soon', `${feature} will be available in a future update.`);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Profile Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profile</Text>
        
        <TouchableOpacity 
          style={styles.settingItem}
          onPress={() => handleComingSoon('Profile editing')}
        >
          <View style={styles.settingLeft}>
            <View style={styles.iconContainer}>
              <Ionicons name="person-outline" size={24} color="#6B7280" />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>
                {user?.name || 'User'}
              </Text>
              <Text style={styles.settingDescription}>
                {user?.email || 'user@example.com'}
              </Text>
            </View>
          </View>
          <Ionicons name="chevron-forward-outline" size={20} color="#9CA3AF" />
        </TouchableOpacity>
      </View>

      {/* App Preferences */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Preferences</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <View style={styles.iconContainer}>
              <Ionicons 
                name={darkMode ? "moon" : "sunny-outline"} 
                size={24} 
                color="#6B7280" 
              />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Dark Mode</Text>
              <Text style={styles.settingDescription}>
                Toggle between light and dark theme
              </Text>
            </View>
          </View>
          <Switch
            value={darkMode}
            onValueChange={toggleDarkMode}
            trackColor={{ false: '#D1D5DB', true: '#3B82F6' }}
            thumbColor={darkMode ? '#FFFFFF' : '#FFFFFF'}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <View style={styles.iconContainer}>
              <Ionicons name="notifications-outline" size={24} color="#6B7280" />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Push Notifications</Text>
              <Text style={styles.settingDescription}>
                Receive reminders and updates
              </Text>
            </View>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={(value) => {
              setNotificationsEnabled(value);
              if (value) {
                handleComingSoon('Push notifications');
                setNotificationsEnabled(false);
              }
            }}
            trackColor={{ false: '#D1D5DB', true: '#3B82F6' }}
            thumbColor={notificationsEnabled ? '#FFFFFF' : '#FFFFFF'}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <View style={styles.iconContainer}>
              <Ionicons name="sync-outline" size={24} color="#6B7280" />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Auto Sync</Text>
              <Text style={styles.settingDescription}>
                Automatically sync data when online
              </Text>
            </View>
          </View>
          <Switch
            value={dataSync}
            onValueChange={setDataSync}
            trackColor={{ false: '#D1D5DB', true: '#3B82F6' }}
            thumbColor={dataSync ? '#FFFFFF' : '#FFFFFF'}
          />
        </View>
      </View>

      {/* Data & Privacy */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Data & Privacy</Text>
        
        <TouchableOpacity 
          style={styles.settingItem}
          onPress={() => handleComingSoon('Data export')}
        >
          <View style={styles.settingLeft}>
            <View style={styles.iconContainer}>
              <Ionicons name="download-outline" size={24} color="#6B7280" />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Export Data</Text>
              <Text style={styles.settingDescription}>
                Download your data as CSV or JSON
              </Text>
            </View>
          </View>
          <Ionicons name="chevron-forward-outline" size={20} color="#9CA3AF" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.settingItem}
          onPress={() => handleComingSoon('Privacy settings')}
        >
          <View style={styles.settingLeft}>
            <View style={styles.iconContainer}>
              <Ionicons name="shield-outline" size={24} color="#6B7280" />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Privacy Settings</Text>
              <Text style={styles.settingDescription}>
                Manage your privacy preferences
              </Text>
            </View>
          </View>
          <Ionicons name="chevron-forward-outline" size={20} color="#9CA3AF" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.settingItem}
          onPress={() => handleComingSoon('Data deletion')}
        >
          <View style={styles.settingLeft}>
            <View style={styles.iconContainer}>
              <Ionicons name="trash-outline" size={24} color="#EF4444" />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Delete Account</Text>
              <Text style={styles.settingDescription}>
                Permanently delete your account and data
              </Text>
            </View>
          </View>
          <Ionicons name="chevron-forward-outline" size={20} color="#9CA3AF" />
        </TouchableOpacity>
      </View>

      {/* Support */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        
        <TouchableOpacity 
          style={styles.settingItem}
          onPress={() => handleComingSoon('Help center')}
        >
          <View style={styles.settingLeft}>
            <View style={styles.iconContainer}>
              <Ionicons name="help-circle-outline" size={24} color="#6B7280" />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Help Center</Text>
              <Text style={styles.settingDescription}>
                Get help and find answers
              </Text>
            </View>
          </View>
          <Ionicons name="chevron-forward-outline" size={20} color="#9CA3AF" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.settingItem}
          onPress={() => handleComingSoon('Feedback')}
        >
          <View style={styles.settingLeft}>
            <View style={styles.iconContainer}>
              <Ionicons name="chatbubble-outline" size={24} color="#6B7280" />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Send Feedback</Text>
              <Text style={styles.settingDescription}>
                Share your thoughts and suggestions
              </Text>
            </View>
          </View>
          <Ionicons name="chevron-forward-outline" size={20} color="#9CA3AF" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.settingItem}
          onPress={() => handleComingSoon('About page')}
        >
          <View style={styles.settingLeft}>
            <View style={styles.iconContainer}>
              <Ionicons name="information-circle-outline" size={24} color="#6B7280" />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>About Lyfe</Text>
              <Text style={styles.settingDescription}>
                Version 1.0.0 • Terms & Privacy
              </Text>
            </View>
          </View>
          <Ionicons name="chevron-forward-outline" size={20} color="#9CA3AF" />
        </TouchableOpacity>
      </View>

      {/* Sign Out */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="#EF4444" />
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>

      {/* App Version */}
      <View style={styles.versionContainer}>
        <Text style={styles.versionText}>Lyfe Mobile v1.0.0</Text>
        <Text style={styles.versionSubtext}>Built with React Native & Expo</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  settingItem: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 18,
  },
  logoutButton: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EF4444',
    marginLeft: 8,
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  versionText: {
    fontSize: 14,
    color: '#9CA3AF',
    fontWeight: '500',
    marginBottom: 4,
  },
  versionSubtext: {
    fontSize: 12,
    color: '#D1D5DB',
  },
});