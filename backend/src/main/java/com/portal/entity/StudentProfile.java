package com.portal.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "student_profiles")
public class StudentProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(nullable = false, unique = true, length = 30, name = "roll_number")
    private String rollNumber;

    @Column(nullable = false, length = 80)
    private String department;

    @Column(nullable = false)
    private Integer semester = 7;

    @Column(nullable = false, name = "batch_year")
    private Integer batchYear = 2025;

    @Column(nullable = false)
    private Double cgpa = 0.0;

    @Column(nullable = false)
    private Integer backlogs = 0;

    @Column(columnDefinition = "TEXT")
    private String skills;

    @Column(length = 500, name = "resume_url")
    private String resumeUrl;

    @Column(name = "github_url")
    private String githubUrl;

    @Column(name = "linkedin_url")
    private String linkedinUrl;

    @Column(nullable = false, length = 30, name = "placement_status")
    private String placementStatus = "UNPLACED"; // UNPLACED, IN_PROCESS, OFFER_RECEIVED, PLACED

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    public StudentProfile() {
        this.createdAt = LocalDateTime.now();
    }

    public StudentProfile(User user, String rollNumber, String department, Integer semester, Integer batchYear, Double cgpa, Integer backlogs, String skills, String resumeUrl, String githubUrl, String linkedinUrl, String placementStatus) {
        this();
        this.user = user;
        this.rollNumber = rollNumber;
        this.department = department;
        this.semester = semester;
        this.batchYear = batchYear;
        this.cgpa = cgpa;
        this.backlogs = backlogs;
        this.skills = skills;
        this.resumeUrl = resumeUrl;
        this.githubUrl = githubUrl;
        this.linkedinUrl = linkedinUrl;
        this.placementStatus = placementStatus != null ? placementStatus : "UNPLACED";
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getRollNumber() { return rollNumber; }
    public void setRollNumber(String rollNumber) { this.rollNumber = rollNumber; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public Integer getSemester() { return semester; }
    public void setSemester(Integer semester) { this.semester = semester; }

    public Integer getBatchYear() { return batchYear; }
    public void setBatchYear(Integer batchYear) { this.batchYear = batchYear; }

    public Double getCgpa() { return cgpa; }
    public void setCgpa(Double cgpa) { this.cgpa = cgpa; }

    public Integer getBacklogs() { return backlogs; }
    public void setBacklogs(Integer backlogs) { this.backlogs = backlogs; }

    public String getSkills() { return skills; }
    public void setSkills(String skills) { this.skills = skills; }

    public String getResumeUrl() { return resumeUrl; }
    public void setResumeUrl(String resumeUrl) { this.resumeUrl = resumeUrl; }

    public String getGithubUrl() { return githubUrl; }
    public void setGithubUrl(String githubUrl) { this.githubUrl = githubUrl; }

    public String getLinkedinUrl() { return linkedinUrl; }
    public void setLinkedinUrl(String linkedinUrl) { this.linkedinUrl = linkedinUrl; }

    public String getPlacementStatus() { return placementStatus; }
    public void setPlacementStatus(String placementStatus) { this.placementStatus = placementStatus; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
