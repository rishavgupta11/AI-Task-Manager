import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import type { Task } from '@/types/task';
import PriorityBadge from './PriorityBadge';
import CategoryBadge from './CategoryBadge';

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
}

const priorityBorderClass = {
  HIGH: 'priority-border-high',
  MEDIUM: 'priority-border-medium',
  LOW: 'priority-border-low',
};

const TaskCard = ({ task, onDelete }: TaskCardProps) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, y: -10 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className={`glass-card ${priorityBorderClass[task.aiPriority]} group`}
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-foreground mb-2 truncate">
            {task.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
            {task.description}
          </p>
          <div className="flex flex-wrap gap-2">
            <PriorityBadge priority={task.aiPriority} />
            <CategoryBadge category={task.aiCategory} />
          </div>
        </div>
        
        <motion.button
          onClick={() => onDelete(task.id)}
          className="self-start p-2.5 rounded-xl bg-destructive/10 text-destructive opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-destructive/20"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Delete task"
        >
          <Trash2 className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default TaskCard;
