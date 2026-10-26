package com.portal.controller;

import com.portal.entity.Company;
import com.portal.entity.PlacementDrive;
import com.portal.service.PlacementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/drives")
@CrossOrigin(origins = "*")
public class PlacementDriveController {

    @Autowired private PlacementService placementService;

    @GetMapping
    public ResponseEntity<List<PlacementDrive>> getAllDrives() {
        return ResponseEntity.ok(placementService.getAllDrives());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PlacementDrive> getDriveById(@PathVariable Long id) {
        return placementService.getDriveById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<PlacementDrive> createDrive(@RequestBody PlacementDrive drive) {
        return ResponseEntity.ok(placementService.createDrive(drive));
    }

    @GetMapping("/companies")
    public ResponseEntity<List<Company>> getAllCompanies() {
        return ResponseEntity.ok(placementService.getAllCompanies());
    }
}
