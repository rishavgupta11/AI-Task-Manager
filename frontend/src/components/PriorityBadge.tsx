import { motion } from 'framer-motion';
import type { Priority } from '@/types/task';

interface PriorityBadgeProps {
  priority: Priority;
}

const priorityConfig = {
  HIGH: { icon: '🚨', label: 'High', className: 'badge-high' },
  MEDIUM: { icon: '⚠️', label: 'Medium', className: 'badge-medium' },
  LOW: { icon: '✅', label: 'Low', className: 'badge-low' },
};

const PriorityBadge = ({ priority }: PriorityBadgeProps) => {
  const config = priorityConfig[priority];

  return (
    <motion.span
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.className}`}
    >
      <motion.span
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        {config.icon}
      </motion.span>
      {config.label}
    </motion.span>
  );
};

export default PriorityBadge;
