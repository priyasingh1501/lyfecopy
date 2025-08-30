import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HealthHomeScreen from '../../features/health/HealthHomeScreen';
import LogWorkoutScreen from '../../features/health/LogWorkoutScreen';
import LogMealScreen from '../../features/health/LogMealScreen';

export type HealthStackParamList = {
  HealthHome: undefined;
  LogWorkout: undefined;
  LogMeal: undefined;
};

const Stack = createStackNavigator<HealthStackParamList>();

export default function HealthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#10B981',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="HealthHome" 
        component={HealthHomeScreen} 
        options={{ title: 'Health' }}
      />
      <Stack.Screen 
        name="LogWorkout" 
        component={LogWorkoutScreen} 
        options={{ title: 'Log Workout' }}
      />
      <Stack.Screen 
        name="LogMeal" 
        component={LogMealScreen} 
        options={{ title: 'Log Meal' }}
      />
    </Stack.Navigator>
  );
}