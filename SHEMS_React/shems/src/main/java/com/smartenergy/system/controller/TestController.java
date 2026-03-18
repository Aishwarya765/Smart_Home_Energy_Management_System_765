package com.smartenergy.system.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
public class TestController {

    @Autowired
    private MongoTemplate mongoTemplate;  // Removed required=false

    @GetMapping("/mongodb")
    public Map<String, Object> testMongoDB() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            String dbName = mongoTemplate.getDb().getName();
            Set<String> collections = mongoTemplate.getCollectionNames();
            
            response.put("success", true);
            response.put("message", "✅ Connected to MongoDB successfully!");
            response.put("database", dbName);
            response.put("collections", collections);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "❌ Failed to connect to MongoDB");
            response.put("error", e.getMessage());
        }
        
        return response;
    }

    @GetMapping("/hello")
    public String hello() {
        return "Test controller is working!";
    }
}