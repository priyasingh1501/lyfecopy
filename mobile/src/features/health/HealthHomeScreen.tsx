import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import { HealthStackParamList } from '../../navigation/stacks/HealthStack';

type HealthHomeNavigationProp = StackNavigationProp<HealthStackParamList, 'HealthHome'>;

export default function HealthHomeScreen() {
  const navigation = useNavigation<HealthHomeNavigationProp>();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Health & Wellness</Text>
        <Text style={styles.subtitle}>Track your fitness and nutrition journey</Text>
      </View>

      {/* Quick Stats Placeholder */}
      <View style={styles.statsContainer}>
        <Text style={styles.sectionTitle}>Today's Summary</Text>
        
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Ionicons name="footsteps-outline" size={32} color="#3B82F6" />
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Steps</Text>
          </View>

          <View style={styles.statCard}>
            <Ionicons name="flame-outline" size={32} color="#EF4444" />
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Calories</Text>
          </View>

          <View style={styles.statCard}>
            <Ionicons name="time-outline" size={32} color="#10B981" />
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Workout Minutes</Text>
          </View>

          <View style={styles.statCard}>
            <Ionicons name="water-outline" size={32} color="#06B6D4" />
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Glasses of Water</Text>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        <Text style={styles.sectionTitle}>Log Activity</Text>
        
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#DBEAFE' }]}
          onPress={() => navigation.navigate('LogWorkout')}
        >
          <View style={styles.actionContent}>
            <Ionicons name="fitness-outline" size={32} color="#3B82F6" />
            <View style={styles.actionText}>
              <Text style={styles.actionTitle}>Log Workout</Text>
              <Text style={styles.actionDescription}>
                Record your exercise session
              </Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={20} color="#6B7280" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#FEF3C7' }]}
          onPress={() => navigation.navigate('LogMeal')}
        >
          <View style={styles.actionContent}>
            <Ionicons name="restaurant-outline" size={32} color="#F59E0B" />
            <View style={styles.actionText}>
              <Text style={styles.actionTitle}>Log Meal</Text>
              <Text style={styles.actionDescription}>
                Track your food intake
              </Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={20} color="#6B7280" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Recent Activity Placeholder */}
      <View style={styles.recentContainer}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        
        <View style={styles.placeholderCard}>
          <Ionicons name="analytics-outline" size={48} color="#D1D5DB" />
          <Text style={styles.placeholderTitle}>No Activity Yet</Text>
          <Text style={styles.placeholderText}>
            Start logging your workouts and meals to see your progress here
          </Text>
        </View>
      </View>

      {/* Health Metrics Placeholder */}
      <View style={styles.metricsContainer}>
        <Text style={styles.sectionTitle}>Health Metrics</Text>
        
        <View style={styles.metricCard}>
          <Text style={styles.metricTitle}>Weight Tracking</Text>
          <Text style={styles.metricValue}>Coming Soon</Text>
          <Text style={styles.metricDescription}>
            Track your weight changes over time
          </Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricTitle}>Sleep Quality</Text>
          <Text style={styles.metricValue}>Coming Soon</Text>
          <Text style={styles.metricDescription}>
            Monitor your sleep patterns and quality
          </Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricTitle}>Mood Tracking</Text>
          <Text style={styles.metricValue}>Coming Soon</Text>
          <Text style={styles.metricDescription}>
            Log your daily mood and energy levels
          </Text>
        </View>
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
  header: {
    marginBottom: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  statsContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  statCard: {
    flex: 1,
    margin: 6,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
    textAlign: 'center',
  },
  actionsContainer: {
    marginBottom: 24,
  },
  actionButton: {
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  actionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  actionText: {
    flex: 1,
    marginLeft: 16,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  actionDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  recentContainer: {
    marginBottom: 24,
  },
  placeholderCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  placeholderTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#9CA3AF',
    marginTop: 12,
    marginBottom: 8,
  },
  placeholderText: {
    fontSize: 14,
    color: '#D1D5DB',
    textAlign: 'center',
    lineHeight: 20,
  },
  metricsContainer: {
    marginBottom: 24,
  },
  metricCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  metricTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 14,
    color: '#10B981',
    fontWeight: '500',
    marginBottom: 4,
  },
  metricDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
});