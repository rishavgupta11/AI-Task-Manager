package com.taskmanager.repository;

import com.taskmanager.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    // Spring Data JPA auto-implements these methods!
    List<Task> findByIsCompleted(Boolean isCompleted);
    List<Task> findByAiPriority(String priority);
    List<Task> findByAiCategory(String category);
}