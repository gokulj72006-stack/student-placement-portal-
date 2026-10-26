package com.portal.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "enrollments", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"student_id", "course_id"})
})
public class Enrollment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "student_id", nullable = false)
    private StudentProfile student;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @Column(name = "enrolled_at", updatable = false)
    private LocalDateTime enrolledAt;

    @Column(nullable = false, length = 30)
    private String status = "ENROLLED"; // ENROLLED, COMPLETED, DROPPED

    @Column(name = "attendance_pct")
    private Double attendancePct = 90.0;

    @Column(length = 10)
    private String grade = "Pending";

    public Enrollment() {
        this.enrolledAt = LocalDateTime.now();
    }

    public Enrollment(StudentProfile student, Course course, String status, Double attendancePct, String grade) {
        this();
        this.student = student;
        this.course = course;
        this.status = status != null ? status : "ENROLLED";
        this.attendancePct = attendancePct != null ? attendancePct : 90.0;
        this.grade = grade != null ? grade : "Pending";
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public StudentProfile getStudent() { return student; }
    public void setStudent(StudentProfile student) { this.student = student; }

    public Course getCourse() { return course; }
    public void setCourse(Course course) { this.course = course; }

    public LocalDateTime getEnrolledAt() { return enrolledAt; }
    public void setEnrolledAt(LocalDateTime enrolledAt) { this.enrolledAt = enrolledAt; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Double getAttendancePct() { return attendancePct; }
    public void setAttendancePct(Double attendancePct) { this.attendancePct = attendancePct; }

    public String getGrade() { return grade; }
    public void setGrade(String grade) { this.grade = grade; }
}
