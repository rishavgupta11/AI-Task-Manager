package com.taskmanager.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class AIService {

    private static final Logger logger = LoggerFactory.getLogger(AIService.class);

    @Value("${huggingface.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper mapper = new ObjectMapper();

    // Fast MNLI model
    private static final String HF_URL =
            "https://router.huggingface.co/hf-inference/models/typeform/distilbert-base-uncased-mnli";

    // PUBLIC ENTRY – one call, returns both fields
    public Map<String, String> analyzeBoth(String text) {
        logger.info("🤖 Running AI classification (ONE request)…");

        // NOTE: priority labels are explicit
        List<String> allLabels = List.of(
                "HIGH PRIORITY", "MEDIUM PRIORITY", "LOW PRIORITY",
                "WORK", "PERSONAL", "HEALTH", "FINANCE", "SHOPPING", "URGENT"
        );

        JsonNode json = classifyAll(text, allLabels);

        if (json == null || !json.isArray() || json.size() == 0) {
            return Map.of("priority", "UNKNOWN", "category", "UNKNOWN");
        }

        String bestPriorityRaw = null;
        double bestPriorityScore = -1;

        String bestCategory = null;
        double bestCategoryScore = -1;

        for (JsonNode node : json) {
            String label = node.get("label").asText().toUpperCase();
            double score = node.get("score").asDouble();

            // PRIORITY LABELS => end with "PRIORITY"
            if (label.endsWith("PRIORITY")) {
                if (score > bestPriorityScore) {
                    bestPriorityScore = score;
                    bestPriorityRaw = label; // e.g. "HIGH PRIORITY"
                }
            } else { // CATEGORY
                if (score > bestCategoryScore) {
                    bestCategoryScore = score;
                    bestCategory = label; // e.g. "HEALTH"
                }
            }
        }

        // Normalize "HIGH PRIORITY" -> "HIGH"
        String normalizedPriority = "UNKNOWN";
        if (bestPriorityRaw != null) {
            if (bestPriorityRaw.startsWith("HIGH")) normalizedPriority = "HIGH";
            else if (bestPriorityRaw.startsWith("MEDIUM")) normalizedPriority = "MEDIUM";
            else if (bestPriorityRaw.startsWith("LOW")) normalizedPriority = "LOW";
        }

        String finalCategory = (bestCategory == null) ? "UNKNOWN" : bestCategory;

        normalizedPriority = tweakPriorityWithRules(text, normalizedPriority, finalCategory);

        logger.info("🔥 Priority = {}", normalizedPriority);
        logger.info("🔥 Category = {}", finalCategory);

        return Map.of(
                "priority", normalizedPriority,
                "category", finalCategory
        );
    }

    // ---- HuggingFace call ----
    private JsonNode classifyAll(String text, List<String> candidateLabels) {
        try {
            logger.info("📡 Calling Hugging Face API (distilbert MNLI)…");

            Map<String, Object> body = new HashMap<>();
            body.put("inputs", text);
            body.put("parameters", Map.of(
                    "candidate_labels", candidateLabels,
                    "multi_label", true
            ));

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(apiKey);
            headers.set("Accept", "application/json");

            HttpEntity<String> entity =
                    new HttpEntity<>(mapper.writeValueAsString(body), headers);

            ResponseEntity<String> response =
                    restTemplate.exchange(HF_URL, HttpMethod.POST, entity, String.class);

            logger.info("📡 HF Response Status: {}", response.getStatusCode());

            return mapper.readTree(response.getBody());

        } catch (Exception e) {
            logger.error("❌ HF error: {}", e.getMessage());
            return null;
        }
    }

    // ---- STEP 2 stuff lives here (rules) ----
    private String tweakPriorityWithRules(String text, String priority, String category) {
        String desc = text.toLowerCase();

        // If clearly shopping, push to LOW
        if (category.equals("SHOPPING") ||
                desc.contains("buy ") || desc.contains("purchase") || desc.contains("groceries")) {
            return "LOW";
        }

        // Health tasks should usually be MEDIUM by default
        if (category.equals("HEALTH") && priority.equals("HIGH")) {
            return "MEDIUM";
        }

        // Hard work-urgent language -> HIGH
        if (category.equals("WORK") &&
                (desc.contains("production bug") ||
                        desc.contains("prod bug") ||
                        desc.contains("deadline") ||
                        desc.contains("urgent") ||
                        desc.contains("critical"))) {
            return "HIGH";
        }

        return priority;
    }
}
