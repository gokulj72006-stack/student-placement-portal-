package com.portal.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "placement_applications", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"student_id", "drive_id"})
})
public class PlacementApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "drive_id", nullable = false)
    private PlacementDrive drive;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "student_id", nullable = false)
    private StudentProfile student;

    @Column(name = "applied_at", updatable = false)
    private LocalDateTime appliedAt;

    @Column(nullable = false, length = 40)
    private String status = "APPLIED"; // APPLIED, SHORTLISTED, OA_CLEARED, INTERVIEW_SCHEDULED, OFFERED, REJECTED

    @Column(length = 80, name = "current_round")
    private String currentRound = "Application Review";

    @Column(length = 100, name = "interview_time")
    private String interviewTime;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column(length = 50, name = "offer_ctc")
    private String offerCtc;

    public PlacementApplication() {
        this.appliedAt = LocalDateTime.now();
    }

    public PlacementApplication(PlacementDrive drive, StudentProfile student, String status, String currentRound, String interviewTime, String notes, String offerCtc) {
        this();
        this.drive = drive;
        this.student = student;
        this.status = status != null ? status : "APPLIED";
        this.currentRound = currentRound != null ? currentRound : "Application Review";
        this.interviewTime = interviewTime;
        this.notes = notes;
        this.offerCtc = offerCtc;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public PlacementDrive getDrive() { return drive; }
    public void setDrive(PlacementDrive drive) { this.drive = drive; }

    public StudentProfile getStudent() { return student; }
    public void setStudent(StudentProfile student) { this.student = student; }

    public LocalDateTime getAppliedAt() { return appliedAt; }
    public void setAppliedAt(LocalDateTime appliedAt) { this.appliedAt = appliedAt; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getCurrentRound() { return currentRound; }
    public void setCurrentRound(String currentRound) { this.currentRound = currentRound; }

    public String getInterviewTime() { return interviewTime; }
    public void setInterviewTime(String interviewTime) { this.interviewTime = interviewTime; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public String getOfferCtc() { return offerCtc; }
    public void setOfferCtc(String offerCtc) { this.offerCtc = offerCtc; }
}
