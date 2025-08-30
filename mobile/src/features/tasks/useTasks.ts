import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchTasks,
  fetchTask,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskStatus,
  getTaskStats,
  Task,
  CreateTaskData,
  TasksResponse,
} from '../api/tasks';

// Query keys for consistent caching
export const taskKeys = {
  all: ['tasks'] as const,
  lists: () => [...taskKeys.all, 'list'] as const,
  list: (filters: Record<string, any>) => [...taskKeys.lists(), filters] as const,
  details: () => [...taskKeys.all, 'detail'] as const,
  detail: (id: string) => [...taskKeys.details(), id] as const,
  stats: () => [...taskKeys.all, 'stats'] as const,
};

/**
 * Hook to fetch tasks with optional filtering
 */
export function useTasks(filters: {
  page?: number;
  limit?: number;
  status?: string;
  priority?: string;
  category?: string;
  search?: string;
} = {}) {
  return useQuery({
    queryKey: taskKeys.list(filters),
    queryFn: () => fetchTasks(filters),
    staleTime: 30000, // 30 seconds
  });
}

/**
 * Hook to fetch a single task
 */
export function useTask(taskId: string) {
  return useQuery({
    queryKey: taskKeys.detail(taskId),
    queryFn: () => fetchTask(taskId),
    enabled: !!taskId,
    staleTime: 60000, // 1 minute
  });
}

/**
 * Hook to fetch task statistics
 */
export function useTaskStats() {
  return useQuery({
    queryKey: taskKeys.stats(),
    queryFn: getTaskStats,
    staleTime: 60000, // 1 minute
  });
}

/**
 * Hook to create a new task
 */
export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTask,
    onSuccess: (newTask) => {
      // Invalidate and refetch task lists
      queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
      queryClient.invalidateQueries({ queryKey: taskKeys.stats() });

      // Add the new task to the cache
      queryClient.setQueryData(taskKeys.detail(newTask._id), newTask);
    },
    onError: (error) => {
      console.error('Failed to create task:', error);
    },
  });
}

/**
 * Hook to update an existing task
 */
export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId, updates }: { taskId: string; updates: Partial<CreateTaskData> }) =>
      updateTask(taskId, updates),
    onSuccess: (updatedTask) => {
      // Update the specific task in cache
      queryClient.setQueryData(taskKeys.detail(updatedTask._id), updatedTask);

      // Invalidate lists to ensure consistency
      queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
      queryClient.invalidateQueries({ queryKey: taskKeys.stats() });
    },
    onError: (error) => {
      console.error('Failed to update task:', error);
    },
  });
}

/**
 * Hook to delete a task
 */
export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTask,
    onSuccess: (_, taskId) => {
      // Remove the task from cache
      queryClient.removeQueries({ queryKey: taskKeys.detail(taskId) });

      // Invalidate lists and stats
      queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
      queryClient.invalidateQueries({ queryKey: taskKeys.stats() });
    },
    onError: (error) => {
      console.error('Failed to delete task:', error);
    },
  });
}

/**
 * Hook to toggle task completion status
 */
export function useToggleTaskStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleTaskStatus,
    onMutate: async (taskId: string) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: taskKeys.detail(taskId) });

      // Snapshot previous value
      const previousTask = queryClient.getQueryData<Task>(taskKeys.detail(taskId));

      // Optimistically update the task status
      if (previousTask) {
        const optimisticTask = {
          ...previousTask,
          status: previousTask.status === 'completed' ? 'todo' as const : 'completed' as const,
        };
        queryClient.setQueryData(taskKeys.detail(taskId), optimisticTask);
      }

      return { previousTask };
    },
    onSuccess: (updatedTask) => {
      // Update with server response
      queryClient.setQueryData(taskKeys.detail(updatedTask._id), updatedTask);
      queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
      queryClient.invalidateQueries({ queryKey: taskKeys.stats() });
    },
    onError: (error, taskId, context) => {
      // Revert optimistic update on error
      if (context?.previousTask) {
        queryClient.setQueryData(taskKeys.detail(taskId), context.previousTask);
      }
      console.error('Failed to toggle task status:', error);
    },
  });
}