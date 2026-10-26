package com.portal.controller;

import com.portal.dto.EnrollmentRequestDto;
import com.portal.entity.Enrollment;
import com.portal.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/enrollments")
@CrossOrigin(origins = "*")
public class EnrollmentController {

    @Autowired private CourseService courseService;

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Enrollment>> getStudentEnrollments(@PathVariable Long studentId) {
        return ResponseEntity.ok(courseService.getStudentEnrollments(studentId));
    }

    @PostMapping("/enroll")
    public ResponseEntity<?> enrollStudent(@RequestBody EnrollmentRequestDto dto) {
        try {
            Enrollment enrollment = courseService.enrollStudent(dto);
            return ResponseEntity.ok(enrollment);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/drop")
    public ResponseEntity<?> dropEnrollment(@RequestParam Long studentId, @RequestParam Long courseId) {
        try {
            courseService.dropEnrollment(studentId, courseId);
            return ResponseEntity.ok(Map.of("message", "Course successfully dropped"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
