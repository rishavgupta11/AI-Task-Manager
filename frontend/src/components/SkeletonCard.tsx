import { motion } from 'framer-motion';

const SkeletonCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="glass-card"
    >
      <div className="flex flex-col gap-4">
        {/* Title skeleton */}
        <div className="h-6 w-3/4 rounded-lg bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%] animate-shimmer" />
        
        {/* Description skeleton */}
        <div className="space-y-2">
          <div className="h-4 w-full rounded-md bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%] animate-shimmer" />
          <div className="h-4 w-2/3 rounded-md bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%] animate-shimmer" />
        </div>
        
        {/* Badges skeleton */}
        <div className="flex gap-2">
          <div className="h-7 w-20 rounded-full bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%] animate-shimmer" />
          <div className="h-7 w-24 rounded-full bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%] animate-shimmer" />
        </div>
      </div>
    </motion.div>
  );
};

export default SkeletonCard;
