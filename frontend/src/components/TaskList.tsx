import { AnimatePresence, motion } from 'framer-motion';
import { ListTodo } from 'lucide-react';
import type { Task } from '@/types/task';
import TaskCard from './TaskCard';
import SkeletonCard from './SkeletonCard';

interface TaskListProps {
  tasks: Task[];
  isLoading: boolean;
  onDelete: (id: string) => void;
}

const TaskList = ({ tasks, isLoading, onDelete }: TaskListProps) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card text-center py-12"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4"
        >
          <ListTodo className="w-8 h-8 text-primary" />
        </motion.div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No tasks yet</h3>
        <p className="text-muted-foreground text-sm">
          Create your first task and let AI categorize it for you!
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onDelete={onDelete} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;
