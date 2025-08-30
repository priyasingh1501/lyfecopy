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

const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

const commonFoods = [
  'Chicken Breast', 'Rice', 'Vegetables', 'Eggs', 'Oatmeal',
  'Salmon', 'Avocado', 'Greek Yogurt', 'Quinoa', 'Sweet Potato',
  'Spinach', 'Banana', 'Apple', 'Almonds', 'Broccoli',
];

interface FoodItem {
  name: string;
  quantity: string;
  calories: string;
}

export default function LogMealScreen() {
  const navigation = useNavigation();
  
  const [mealData, setMealData] = useState({
    type: 'Breakfast',
    foods: [] as FoodItem[],
    notes: '',
  });

  const [currentFood, setCurrentFood] = useState<FoodItem>({
    name: '',
    quantity: '',
    calories: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const addFood = () => {
    if (!currentFood.name.trim()) {
      Alert.alert('Error', 'Please enter a food name');
      return;
    }

    if (currentFood.calories && (isNaN(Number(currentFood.calories)) || Number(currentFood.calories) < 0)) {
      Alert.alert('Error', 'Calories must be a valid non-negative number');
      return;
    }

    setMealData(prev => ({
      ...prev,
      foods: [...prev.foods, currentFood],
    }));

    setCurrentFood({ name: '', quantity: '', calories: '' });
  };

  const removeFood = (index: number) => {
    setMealData(prev => ({
      ...prev,
      foods: prev.foods.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async () => {
    if (mealData.foods.length === 0) {
      Alert.alert('Error', 'Please add at least one food item');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // TODO: Implement API call to save meal
      console.log('Saving meal:', mealData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      Alert.alert(
        'Success',
        'Meal logged successfully!',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to log meal. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalCalories = mealData.foods.reduce((sum, food) => {
    const calories = Number(food.calories) || 0;
    return sum + calories;
  }, 0);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.content}>
        {/* Meal Type */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Meal Type</Text>
          <View style={styles.mealTypeRow}>
            {mealTypes.map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.mealTypeButton,
                  mealData.type === type && styles.selectedMealTypeButton,
                ]}
                onPress={() => setMealData(prev => ({ ...prev, type }))}
              >
                <Text
                  style={[
                    styles.mealTypeButtonText,
                    mealData.type === type && styles.selectedMealTypeButtonText,
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Add Food Section */}
        <View style={styles.addFoodContainer}>
          <Text style={styles.sectionTitle}>Add Food Items</Text>
          
          {/* Quick Select Common Foods */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Quick Select</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.foodScrollView}
            >
              {commonFoods.map((food) => (
                <TouchableOpacity
                  key={food}
                  style={styles.foodChip}
                  onPress={() => setCurrentFood(prev => ({ ...prev, name: food }))}
                >
                  <Text style={styles.foodChipText}>{food}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Food Name Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Food Name</Text>
            <TextInput
              style={styles.input}
              value={currentFood.name}
              onChangeText={(text) => setCurrentFood(prev => ({ ...prev, name: text }))}
              placeholder="Enter food name"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* Quantity and Calories */}
          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.label}>Quantity (optional)</Text>
              <TextInput
                style={styles.input}
                value={currentFood.quantity}
                onChangeText={(text) => setCurrentFood(prev => ({ ...prev, quantity: text }))}
                placeholder="1 cup, 100g, etc."
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
              <Text style={styles.label}>Calories (optional)</Text>
              <TextInput
                style={styles.input}
                value={currentFood.calories}
                onChangeText={(text) => setCurrentFood(prev => ({ ...prev, calories: text }))}
                placeholder="0"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
              />
            </View>
          </View>

          {/* Add Food Button */}
          <TouchableOpacity style={styles.addFoodButton} onPress={addFood}>
            <Ionicons name="add" size={20} color="white" />
            <Text style={styles.addFoodButtonText}>Add Food</Text>
          </TouchableOpacity>
        </View>

        {/* Added Foods List */}
        {mealData.foods.length > 0 && (
          <View style={styles.foodListContainer}>
            <Text style={styles.sectionTitle}>
              Added Foods ({mealData.foods.length})
            </Text>
            
            {mealData.foods.map((food, index) => (
              <View key={index} style={styles.foodItem}>
                <View style={styles.foodItemContent}>
                  <Text style={styles.foodItemName}>{food.name}</Text>
                  <View style={styles.foodItemDetails}>
                    {food.quantity && (
                      <Text style={styles.foodItemDetail}>{food.quantity}</Text>
                    )}
                    {food.calories && (
                      <Text style={styles.foodItemDetail}>{food.calories} cal</Text>
                    )}
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.removeFoodButton}
                  onPress={() => removeFood(index)}
                >
                  <Ionicons name="trash-outline" size={16} color="#EF4444" />
                </TouchableOpacity>
              </View>
            ))}

            {/* Total Calories */}
            {totalCalories > 0 && (
              <View style={styles.totalCaloriesContainer}>
                <Text style={styles.totalCaloriesText}>
                  Total: {totalCalories} calories
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Notes */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Notes (optional)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={mealData.notes}
            onChangeText={(text) => setMealData(prev => ({ ...prev, notes: text }))}
            placeholder="How did you feel after the meal? Any specific preparation?"
            placeholderTextColor="#9CA3AF"
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
        </View>
      </ScrollView>

      {/* Save Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[styles.saveButton, isSubmitting && styles.disabledButton]}
          onPress={handleSave}
          disabled={isSubmitting}
        >
          <Text style={styles.saveButtonText}>
            {isSubmitting ? 'Logging Meal...' : 'Log Meal'}
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
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 16,
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
    height: 80,
    textAlignVertical: 'top',
  },
  mealTypeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mealTypeButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    marginHorizontal: 2,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  selectedMealTypeButton: {
    backgroundColor: '#F59E0B',
    borderColor: '#F59E0B',
  },
  mealTypeButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
  },
  selectedMealTypeButtonText: {
    color: 'white',
  },
  addFoodContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  foodScrollView: {
    marginBottom: 8,
  },
  foodChip: {
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
  },
  foodChipText: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
  },
  addFoodButton: {
    backgroundColor: '#F59E0B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  addFoodButtonText: {
    color: 'white',
    fontWeight: '600',
    marginLeft: 8,
  },
  foodListContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  foodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  foodItemContent: {
    flex: 1,
  },
  foodItemName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  foodItemDetails: {
    flexDirection: 'row',
    gap: 12,
  },
  foodItemDetail: {
    fontSize: 12,
    color: '#6B7280',
  },
  removeFoodButton: {
    padding: 8,
  },
  totalCaloriesContainer: {
    borderTopWidth: 2,
    borderTopColor: '#F59E0B',
    paddingTop: 12,
    marginTop: 8,
    alignItems: 'center',
  },
  totalCaloriesText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F59E0B',
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
    backgroundColor: '#F59E0B',
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