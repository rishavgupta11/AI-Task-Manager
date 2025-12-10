import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';
import ThemeToggle from '@/components/ThemeToggle';
import CreateTaskCard from '@/components/CreateTaskCard';
import TaskList from '@/components/TaskList';
import { useTasks } from '@/hooks/useTasks';

const Index = () => {
  const { tasks, isLoading, createTask, isCreating, deleteTask } = useTasks();

  return (
    <>
      <AnimatedBackground />
      
      <div className="min-h-screen">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="sticky top-0 z-50 backdrop-blur-xl bg-background/60 border-b border-border/50"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="p-2.5 rounded-xl bg-primary/10"
              >
                <Brain className="w-6 h-6 text-primary" />
              </motion.div>
              <div>
                <h1 className="text-xl font-bold gradient-text">AI Task Manager</h1>
                <p className="text-xs text-muted-foreground hidden sm:block">Intelligent task organization</p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
          {/* Create Task Section */}
          <section>
            <CreateTaskCard onSubmit={createTask} isLoading={isCreating} />
          </section>

          {/* Tasks List Section */}
          <section>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-between mb-6"
            >
              <h2 className="text-lg font-semibold text-foreground">Your Tasks</h2>
              {tasks.length > 0 && (
                <motion.span
                  key={tasks.length}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground"
                >
                  {tasks.length} task{tasks.length !== 1 ? 's' : ''}
                </motion.span>
              )}
            </motion.div>
            <TaskList 
              tasks={tasks} 
              isLoading={isLoading} 
              onDelete={deleteTask} 
            />
          </section>
        </main>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center py-8 text-sm text-muted-foreground"
        >
          <p>© Copyright 2025-2026, Rishav Gupta❤️✨.</p>
          <p>All rights reserved.</p>
        </motion.footer>
      </div>
    </>
  );
};

export default Index;
