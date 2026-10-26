package com.portal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class StudentPlacementPortalApplication {

    public static void main(String[] args) {
        SpringApplication.run(StudentPlacementPortalApplication.class, args);
        System.out.println("==================================================================");
        System.out.println("🚀 Student Course & Placement Portal Backend started successfully!");
        System.out.println("🔗 REST API Endpoint: http://localhost:8080/api");
        System.out.println("==================================================================");
    }
}
