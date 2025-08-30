import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import TasksScreen from '../../features/tasks/TasksScreen';
import TaskDetailScreen from '../../features/tasks/TaskDetailScreen';
import EditTaskScreen from '../../features/tasks/EditTaskScreen';

export type TasksStackParamList = {
  TasksList: undefined;
  TaskDetail: { taskId: string };
  EditTask: { taskId?: string };
};

const Stack = createStackNavigator<TasksStackParamList>();

export default function TasksStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#3B82F6',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="TasksList" 
        component={TasksScreen} 
        options={{ title: 'Tasks' }}
      />
      <Stack.Screen 
        name="TaskDetail" 
        component={TaskDetailScreen} 
        options={{ title: 'Task Details' }}
      />
      <Stack.Screen 
        name="EditTask" 
        component={EditTaskScreen} 
        options={({ route }) => ({ 
          title: route.params?.taskId ? 'Edit Task' : 'New Task' 
        })}
      />
    </Stack.Navigator>
  );
}