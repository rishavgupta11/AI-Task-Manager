package com.taskmanager.service;

import com.taskmanager.model.Task;
import com.taskmanager.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.management.ManagementPermission;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private AIService aiService;

    // Create task with AI analysis
    public Task createTask(Task task) {
        // Get AI suggestions -> returns priority + category
        Map<String, String> result = aiService.analyzeBoth(task.getDescription());

        task.setAiPriority(result.get("priority"));
        task.setAiCategory(result.get("category"));

        return taskRepository.save(task);
    }

    // Get all tasks
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    // Get task by ID
    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }

    // Update task
    public Task updateTask(Long id, Task taskDetails) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setTitle(taskDetails.getTitle());
        task.setDescription(taskDetails.getDescription());
        task.setIsCompleted(taskDetails.getIsCompleted());

        // Re-analyze with AI if description changed
        Map<String, String> result  = aiService.analyzeBoth(taskDetails.getDescription());
        task.setAiPriority(result.get("priority"));
        task.setAiPriority(result.get("category"));

        return taskRepository.save(task);
    }

    // Delete task
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    // Get tasks by completion status
    public List<Task> getTasksByStatus(Boolean isCompleted) {
        return taskRepository.findByIsCompleted(isCompleted);
    }

    // Get tasks by priority
    public List<Task> getTasksByPriority(String priority) {
        return taskRepository.findByAiPriority(priority);
    }
}
