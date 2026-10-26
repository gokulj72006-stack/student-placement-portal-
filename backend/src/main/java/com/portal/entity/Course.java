package com.portal.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "courses")
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 30, name = "course_code")
    private String courseCode;

    @Column(nullable = false, length = 150)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false, length = 100)
    private String instructor;

    @Column(nullable = false, length = 80)
    private String department;

    @Column(nullable = false)
    private Integer credits = 3;

    @Column(nullable = false)
    private Integer semester = 7;

    @Column(nullable = false)
    private Integer capacity = 60;

    @Column(nullable = false, name = "enrolled_count")
    private Integer enrolledCount = 0;

    @Column(length = 120)
    private String schedule;

    @Column(length = 60)
    private String room;

    @Column(length = 50)
    private String category = "Core Elective";

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    public Course() {
        this.createdAt = LocalDateTime.now();
    }

    public Course(String courseCode, String title, String description, String instructor, String department, Integer credits, Integer semester, Integer capacity, Integer enrolledCount, String schedule, String room, String category) {
        this();
        this.courseCode = courseCode;
        this.title = title;
        this.description = description;
        this.instructor = instructor;
        this.department = department;
        this.credits = credits;
        this.semester = semester;
        this.capacity = capacity;
        this.enrolledCount = enrolledCount;
        this.schedule = schedule;
        this.room = room;
        this.category = category;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCourseCode() { return courseCode; }
    public void setCourseCode(String courseCode) { this.courseCode = courseCode; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getInstructor() { return instructor; }
    public void setInstructor(String instructor) { this.instructor = instructor; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public Integer getCredits() { return credits; }
    public void setCredits(Integer credits) { this.credits = credits; }

    public Integer getSemester() { return semester; }
    public void setSemester(Integer semester) { this.semester = semester; }

    public Integer getCapacity() { return capacity; }
    public void setCapacity(Integer capacity) { this.capacity = capacity; }

    public Integer getEnrolledCount() { return enrolledCount; }
    public void setEnrolledCount(Integer enrolledCount) { this.enrolledCount = enrolledCount; }

    public String getSchedule() { return schedule; }
    public void setSchedule(String schedule) { this.schedule = schedule; }

    public String getRoom() { return room; }
    public void setRoom(String room) { this.room = room; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
