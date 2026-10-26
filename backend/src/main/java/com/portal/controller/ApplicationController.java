package com.portal.controller;

import com.portal.dto.ApplicationRequestDto;
import com.portal.dto.StatusUpdateDto;
import com.portal.entity.PlacementApplication;
import com.portal.service.PlacementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "*")
public class ApplicationController {

    @Autowired private PlacementService placementService;

    @GetMapping
    public ResponseEntity<List<PlacementApplication>> getAllApplications() {
        return ResponseEntity.ok(placementService.getAllApplications());
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<PlacementApplication>> getApplicationsByStudent(@PathVariable Long studentId) {
        return ResponseEntity.ok(placementService.getApplicationsByStudent(studentId));
    }

    @GetMapping("/drive/{driveId}")
    public ResponseEntity<List<PlacementApplication>> getApplicationsByDrive(@PathVariable Long driveId) {
        return ResponseEntity.ok(placementService.getApplicationsByDrive(driveId));
    }

    @PostMapping("/apply")
    public ResponseEntity<?> applyForDrive(@RequestBody ApplicationRequestDto dto) {
        try {
            PlacementApplication app = placementService.applyForDrive(dto);
            return ResponseEntity.ok(app);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateApplicationStatus(@PathVariable Long id, @RequestBody StatusUpdateDto statusDto) {
        try {
            PlacementApplication updated = placementService.updateApplicationStatus(id, statusDto);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
