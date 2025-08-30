import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const workoutTypes = [
  'Cardio',
  'Strength Training',
  'Yoga',
  'Pilates',
  'Running',
  'Cycling',
  'Swimming',
  'Walking',
  'HIIT',
  'Sports',
  'Other',
];

const intensityLevels = ['Light', 'Moderate', 'Vigorous'];

export default function LogWorkoutScreen() {
  const navigation = useNavigation();
  
  const [workoutData, setWorkoutData] = useState({
    type: '',
    duration: '',
    intensity: 'Moderate',
    calories: '',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = async () => {
    if (!workoutData.type.trim() || !workoutData.duration.trim()) {
      Alert.alert('Error', 'Please fill in workout type and duration');
      return;
    }

    if (isNaN(Number(workoutData.duration)) || Number(workoutData.duration) <= 0) {
      Alert.alert('Error', 'Duration must be a valid positive number');
      return;
    }

    if (workoutData.calories && (isNaN(Number(workoutData.calories)) || Number(workoutData.calories) < 0)) {
      Alert.alert('Error', 'Calories must be a valid non-negative number');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // TODO: Implement API call to save workout
      console.log('Saving workout:', workoutData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      Alert.alert(
        'Success',
        'Workout logged successfully!',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to log workout. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.content}>
        {/* Workout Type */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Workout Type *</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.typeScrollView}
          >
            {workoutTypes.map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.typeChip,
                  workoutData.type === type && styles.selectedTypeChip,
                ]}
                onPress={() => setWorkoutData(prev => ({ ...prev, type }))}
              >
                <Text
                  style={[
                    styles.typeChipText,
                    workoutData.type === type && styles.selectedTypeChipText,
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          
          {/* Custom workout type input */}
          <TextInput
            style={styles.input}
            value={workoutData.type}
            onChangeText={(text) => setWorkoutData(prev => ({ ...prev, type: text }))}
            placeholder="Or enter custom workout type"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Duration */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Duration (minutes) *</Text>
          <TextInput
            style={styles.input}
            value={workoutData.duration}
            onChangeText={(text) => setWorkoutData(prev => ({ ...prev, duration: text }))}
            placeholder="Enter duration in minutes"
            placeholderTextColor="#9CA3AF"
            keyboardType="numeric"
          />
        </View>

        {/* Intensity */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Intensity Level</Text>
          <View style={styles.intensityRow}>
            {intensityLevels.map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.intensityButton,
                  workoutData.intensity === level && styles.selectedIntensityButton,
                ]}
                onPress={() => setWorkoutData(prev => ({ ...prev, intensity: level }))}
              >
                <Text
                  style={[
                    styles.intensityButtonText,
                    workoutData.intensity === level && styles.selectedIntensityButtonText,
                  ]}
                >
                  {level}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Calories (Optional) */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Calories Burned (optional)</Text>
          <TextInput
            style={styles.input}
            value={workoutData.calories}
            onChangeText={(text) => setWorkoutData(prev => ({ ...prev, calories: text }))}
            placeholder="Estimated calories burned"
            placeholderTextColor="#9CA3AF"
            keyboardType="numeric"
          />
        </View>

        {/* Notes */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Notes (optional)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={workoutData.notes}
            onChangeText={(text) => setWorkoutData(prev => ({ ...prev, notes: text }))}
            placeholder="How did the workout feel? Any specific exercises?"
            placeholderTextColor="#9CA3AF"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* Workout Summary */}
        {(workoutData.type && workoutData.duration) && (
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryTitle}>Workout Summary</Text>
            <View style={styles.summaryContent}>
              <View style={styles.summaryItem}>
                <Ionicons name="fitness-outline" size={20} color="#10B981" />
                <Text style={styles.summaryText}>
                  {workoutData.type} • {workoutData.duration} min
                </Text>
              </View>
              <View style={styles.summaryItem}>
                <Ionicons name="speedometer-outline" size={20} color="#F59E0B" />
                <Text style={styles.summaryText}>
                  {workoutData.intensity} intensity
                </Text>
              </View>
              {workoutData.calories && (
                <View style={styles.summaryItem}>
                  <Ionicons name="flame-outline" size={20} color="#EF4444" />
                  <Text style={styles.summaryText}>
                    {workoutData.calories} calories
                  </Text>
                </View>
              )}
            </View>
          </View>
        )}
      </ScrollView>

      {/* Save Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[styles.saveButton, isSubmitting && styles.disabledButton]}
          onPress={handleSave}
          disabled={isSubmitting}
        >
          <Text style={styles.saveButtonText}>
            {isSubmitting ? 'Logging Workout...' : 'Log Workout'}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollContainer: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 100, // Space for bottom button
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  typeScrollView: {
    marginBottom: 12,
  },
  typeChip: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  },
  selectedTypeChip: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  typeChipText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  selectedTypeChipText: {
    color: 'white',
  },
  intensityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  intensityButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    marginHorizontal: 4,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  selectedIntensityButton: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  intensityButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  selectedIntensityButtonText: {
    color: 'white',
  },
  summaryContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  summaryContent: {
    gap: 8,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
    fontWeight: '500',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  saveButton: {
    backgroundColor: '#10B981',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#9CA3AF',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});