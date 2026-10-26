package com.portal.controller;

import com.portal.entity.StudentProfile;
import com.portal.repository.StudentProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "*")
public class StudentController {

    @Autowired private StudentProfileRepository studentProfileRepository;

    @GetMapping
    public ResponseEntity<List<StudentProfile>> getAllStudents() {
        return ResponseEntity.ok(studentProfileRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<StudentProfile> getStudentById(@PathVariable Long id) {
        return studentProfileRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<StudentProfile> getStudentByUserId(@PathVariable Long userId) {
        return studentProfileRepository.findByUserId(userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<StudentProfile> updateProfile(@PathVariable Long id, @RequestBody StudentProfile updated) {
        return studentProfileRepository.findById(id)
                .map(existing -> {
                    existing.setSkills(updated.getSkills());
                    existing.setGithubUrl(updated.getGithubUrl());
                    existing.setLinkedinUrl(updated.getLinkedinUrl());
                    existing.setResumeUrl(updated.getResumeUrl());
                    if (updated.getCgpa() != null) existing.setCgpa(updated.getCgpa());
                    if (updated.getBacklogs() != null) existing.setBacklogs(updated.getBacklogs());
                    return ResponseEntity.ok(studentProfileRepository.save(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
