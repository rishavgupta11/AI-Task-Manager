export type Priority = 'HIGH' | 'MEDIUM' | 'LOW';
export type Category = 'WORK' | 'PERSONAL' | 'HEALTH' | 'FINANCE' | 'SHOPPING' | 'URGENT';

export interface Task {
  id: string;
  title: string;
  description: string;
  aiPriority: Priority;
  aiCategory: Category;
}

export interface CreateTaskInput {
  title: string;
  description: string;
}
