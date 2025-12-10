// API Configuration
const API_BASE_URL = 'http://localhost:8080/api';

// Task Interface
export interface Task {
  id?: number;
  title: string;
  description: string;
  aiPriority?:;
  aiCategory?: string;
  isCompleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// API Service
export const taskAPI = {
  // Get all tasks
  getAllTasks: async (): Promise<Task[]> => {
    const response = await fetch(`${API_BASE_URL}/tasks`);
    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }
    return response.json();
  },

  // Get task by ID
  getTaskById: async (id: number): Promise<Task> => {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch task');
    }
    return response.json();
  },

  // Create new task
  createTask: async (task: Omit<Task, 'id'>): Promise<Task> => {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      throw new Error('Failed to create task');
    }
    return response.json();
  },

  // Update task
  updateTask: async (id: number, task: Task): Promise<Task> => {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      throw new Error('Failed to update task');
    }
    return response.json();
  },

  // Delete task
  deleteTask: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete task');
    }
  },

  // Get tasks by status
  getTasksByStatus: async (isCompleted: boolean): Promise<Task[]> => {
    const response = await fetch(`${API_BASE_URL}/tasks/status/${isCompleted}`);
    if (!response.ok) {
      throw new Error('Failed to fetch tasks by status');
    }
    return response.json();
  },

  // Get tasks by priority
  getTasksByPriority: async (priority: string): Promise<Task[]> => {
    const response = await fetch(`${API_BASE_URL}/tasks/priority/${priority}`);
    if (!response.ok) {
      throw new Error('Failed to fetch tasks by priority');
    }
    return response.json();
  },
};