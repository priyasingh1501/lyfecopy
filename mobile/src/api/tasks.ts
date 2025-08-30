import { z } from 'zod';
import { apiGet, apiPost, apiPut, apiDelete } from './config';

// Task schema for validation
const TaskSchema = z.object({
  _id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
  status: z.enum(['todo', 'in-progress', 'completed']).default('todo'),
  category: z.string().optional(),
  dueDate: z.string().optional(),
  energyLevel: z.enum(['low', 'medium', 'high']).optional(),
  tags: z.array(z.string()).default([]),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// Task list response schema
const TasksResponseSchema = z.object({
  tasks: z.array(TaskSchema),
  total: z.number().optional(),
  page: z.number().optional(),
  totalPages: z.number().optional(),
});

export type Task = z.infer<typeof TaskSchema>;
export type TasksResponse = z.infer<typeof TasksResponseSchema>;

// Task creation/update data
export interface CreateTaskData {
  title: string;
  description?: string;
  priority?: 'low' | 'medium' | 'high';
  status?: 'todo' | 'in-progress' | 'completed';
  category?: string;
  dueDate?: string;
  energyLevel?: 'low' | 'medium' | 'high';
  tags?: string[];
}

export interface UpdateTaskData extends Partial<CreateTaskData> {
  id: string;
}

/**
 * Fetch all tasks with optional filtering
 */
export async function fetchTasks(params: {
  page?: number;
  limit?: number;
  status?: string;
  priority?: string;
  category?: string;
  search?: string;
} = {}): Promise<TasksResponse> {
  const queryParams = new URLSearchParams();
  
  // Add non-empty parameters
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      queryParams.append(key, value.toString());
    }
  });

  const queryString = queryParams.toString();
  const endpoint = `/api/tasks${queryString ? `?${queryString}` : ''}`;
  
  const response = await apiGet(endpoint);
  
  // Validate response structure
  return TasksResponseSchema.parse(response);
}

/**
 * Fetch a single task by ID
 */
export async function fetchTask(taskId: string): Promise<Task> {
  const response = await apiGet(`/api/tasks/${taskId}`);
  
  // Validate task data
  return TaskSchema.parse(response.task || response);
}

/**
 * Create a new task
 */
export async function createTask(taskData: CreateTaskData): Promise<Task> {
  const response = await apiPost('/api/tasks', taskData);
  
  // Validate created task
  return TaskSchema.parse(response.task || response);
}

/**
 * Update an existing task
 */
export async function updateTask(taskId: string, updates: Partial<CreateTaskData>): Promise<Task> {
  const response = await apiPut(`/api/tasks/${taskId}`, updates);
  
  // Validate updated task
  return TaskSchema.parse(response.task || response);
}

/**
 * Delete a task
 */
export async function deleteTask(taskId: string): Promise<void> {
  await apiDelete(`/api/tasks/${taskId}`);
}

/**
 * Toggle task completion status
 */
export async function toggleTaskStatus(taskId: string): Promise<Task> {
  const response = await apiPost(`/api/tasks/${taskId}/toggle`, {});
  
  // Validate updated task
  return TaskSchema.parse(response.task || response);
}

/**
 * Get task statistics/summary
 */
export async function getTaskStats(): Promise<{
  total: number;
  completed: number;
  pending: number;
  overdue: number;
}> {
  const response = await apiGet('/api/tasks/stats');
  
  return {
    total: response.total || 0,
    completed: response.completed || 0,
    pending: response.pending || 0,
    overdue: response.overdue || 0,
  };
}