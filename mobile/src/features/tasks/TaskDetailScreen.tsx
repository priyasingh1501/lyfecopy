import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import { TasksStackParamList } from '../../navigation/stacks/TasksStack';
import { useTask, useToggleTaskStatus, useDeleteTask } from './useTasks';
import { formatDate } from '../../utils/date';

type TaskDetailRouteProp = RouteProp<TasksStackParamList, 'TaskDetail'>;
type TaskDetailNavigationProp = StackNavigationProp<TasksStackParamList, 'TaskDetail'>;

export default function TaskDetailScreen() {
  const route = useRoute<TaskDetailRouteProp>();
  const navigation = useNavigation<TaskDetailNavigationProp>();
  const { taskId } = route.params;

  const { data: task, isLoading, error } = useTask(taskId);
  const toggleStatusMutation = useToggleTaskStatus();
  const deleteTaskMutation = useDeleteTask();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.navigate('EditTask', { taskId })}
        >
          <Ionicons name="create-outline" size={24} color="white" />
        </TouchableOpacity>
      ),
    });
  }, [navigation, taskId]);

  const handleToggleStatus = async () => {
    if (!task) return;
    
    try {
      await toggleStatusMutation.mutateAsync(taskId);
    } catch (error) {
      Alert.alert('Error', 'Failed to update task status');
    }
  };

  const handleDeleteTask = () => {
    if (!task) return;

    Alert.alert(
      'Delete Task',
      `Are you sure you want to delete "${task.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteTaskMutation.mutateAsync(taskId);
              navigation.goBack();
            } catch (error) {
              Alert.alert('Error', 'Failed to delete task');
            }
          },
        },
      ]
    );
  };

  if (isLoading) {
    return (
      <View style={styles.center}>
        <Text>Loading task details...</Text>
      </View>
    );
  }

  if (error || !task) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Failed to load task details</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Status and Priority Header */}
      <View style={styles.statusContainer}>
        <TouchableOpacity
          style={[styles.statusButton, getStatusStyle(task.status)]}
          onPress={handleToggleStatus}
        >
          <Ionicons
            name={task.status === 'completed' ? 'checkmark-circle' : 'ellipse-outline'}
            size={20}
            color="white"
          />
          <Text style={styles.statusText}>
            {task.status === 'completed' ? 'Completed' : 'Mark Complete'}
          </Text>
        </TouchableOpacity>
        
        <View style={[styles.priorityBadge, getPriorityStyle(task.priority)]}>
          <Text style={[styles.priorityText, getPriorityTextStyle(task.priority)]}>
            {task.priority} Priority
          </Text>
        </View>
      </View>

      {/* Task Title */}
      <Text style={[styles.title, task.status === 'completed' && styles.completedTitle]}>
        {task.title}
      </Text>

      {/* Task Description */}
      {task.description && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{task.description}</Text>
        </View>
      )}

      {/* Task Metadata */}
      <View style={styles.metadataContainer}>
        {task.category && (
          <View style={styles.metadataItem}>
            <Ionicons name="folder-outline" size={20} color="#6B7280" />
            <Text style={styles.metadataLabel}>Category</Text>
            <Text style={styles.metadataValue}>{task.category}</Text>
          </View>
        )}

        {task.energyLevel && (
          <View style={styles.metadataItem}>
            <Ionicons name="flash-outline" size={20} color="#6B7280" />
            <Text style={styles.metadataLabel}>Energy Level</Text>
            <Text style={styles.metadataValue}>{task.energyLevel}</Text>
          </View>
        )}

        {task.dueDate && (
          <View style={styles.metadataItem}>
            <Ionicons name="calendar-outline" size={20} color="#6B7280" />
            <Text style={styles.metadataLabel}>Due Date</Text>
            <Text style={styles.metadataValue}>
              {formatDate(task.dueDate)}
            </Text>
          </View>
        )}

        <View style={styles.metadataItem}>
          <Ionicons name="time-outline" size={20} color="#6B7280" />
          <Text style={styles.metadataLabel}>Created</Text>
          <Text style={styles.metadataValue}>
            {formatDate(task.createdAt)}
          </Text>
        </View>

        {task.updatedAt !== task.createdAt && (
          <View style={styles.metadataItem}>
            <Ionicons name="refresh-outline" size={20} color="#6B7280" />
            <Text style={styles.metadataLabel}>Updated</Text>
            <Text style={styles.metadataValue}>
              {formatDate(task.updatedAt)}
            </Text>
          </View>
        )}
      </View>

      {/* Tags */}
      {task.tags && task.tags.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tags</Text>
          <View style={styles.tagsContainer}>
            {task.tags.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Actions */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('EditTask', { taskId })}
        >
          <Ionicons name="create-outline" size={20} color="white" />
          <Text style={styles.editButtonText}>Edit Task</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDeleteTask}
        >
          <Ionicons name="trash-outline" size={20} color="white" />
          <Text style={styles.deleteButtonText}>Delete Task</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function getStatusStyle(status: string) {
  return status === 'completed' 
    ? { backgroundColor: '#10B981' } 
    : { backgroundColor: '#6B7280' };
}

function getPriorityStyle(priority: string) {
  switch (priority) {
    case 'high':
      return { backgroundColor: '#FEE2E2', borderColor: '#EF4444' };
    case 'medium':
      return { backgroundColor: '#FEF3C7', borderColor: '#F59E0B' };
    case 'low':
      return { backgroundColor: '#DBEAFE', borderColor: '#3B82F6' };
    default:
      return { backgroundColor: '#F3F4F6', borderColor: '#9CA3AF' };
  }
}

function getPriorityTextStyle(priority: string) {
  switch (priority) {
    case 'high':
      return { color: '#DC2626' };
    case 'medium':
      return { color: '#D97706' };
    case 'low':
      return { color: '#2563EB' };
    default:
      return { color: '#6B7280' };
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  headerButton: {
    marginRight: 16,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  statusButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
    marginRight: 12,
  },
  statusText: {
    color: 'white',
    fontWeight: '600',
    marginLeft: 8,
  },
  priorityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 20,
    lineHeight: 32,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: '#6B7280',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 24,
  },
  metadataContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  metadataItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  metadataLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
    flex: 1,
  },
  metadataValue: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#E5E7EB',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '500',
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  editButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    borderRadius: 8,
  },
  editButtonText: {
    color: 'white',
    fontWeight: '600',
    marginLeft: 8,
  },
  deleteButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EF4444',
    paddingVertical: 12,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: '600',
    marginLeft: 8,
  },
  errorText: {
    fontSize: 16,
    color: '#EF4444',
    textAlign: 'center',
    marginBottom: 20,
  },
  backButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#3B82F6',
    borderRadius: 8,
  },
  backButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});