import { motion } from 'framer-motion';
import type { Category } from '@/types/task';

interface CategoryBadgeProps {
  category: Category;
}

const categoryConfig: Record<Category, { icon: string; label: string }> = {
  WORK: { icon: '💼', label: 'Work' },
  PERSONAL: { icon: '🏠', label: 'Personal' },
  HEALTH: { icon: '🩺', label: 'Health' },
  FINANCE: { icon: '💰', label: 'Finance' },
  SHOPPING: { icon: '🛒', label: 'Shopping' },
  URGENT: { icon: '🔥', label: 'Urgent' },
};

const CategoryBadge = ({ category }: CategoryBadgeProps) => {
  const config = categoryConfig[category];

  return (
    <motion.span
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.1 }}
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border/50"
    >
      <motion.span
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        {config.icon}
      </motion.span>
      {config.label}
    </motion.span>
  );
};

export default CategoryBadge;
