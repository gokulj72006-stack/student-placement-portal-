package com.portal.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "placement_drives")
public class PlacementDrive {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @Column(nullable = false, length = 150, name = "job_title")
    private String jobTitle;

    @Column(columnDefinition = "TEXT", name = "job_description")
    private String jobDescription;

    @Column(nullable = false, length = 50, name = "ctc_package")
    private String ctcPackage;

    @Column(nullable = false, name = "package_lpa")
    private Double packageLpa;

    @Column(nullable = false, length = 120, name = "job_location")
    private String jobLocation;

    @Column(nullable = false, length = 60, name = "job_type")
    private String jobType = "Full-Time + Internship";

    @Column(nullable = false, name = "eligibility_cgpa")
    private Double eligibilityCgpa = 7.0;

    @Column(nullable = false, name = "max_backlogs")
    private Integer maxBacklogs = 0;

    @Column(nullable = false, length = 255, name = "eligible_departments")
    private String eligibleDepartments = "CSE, IT, ECE";

    @Column(nullable = false, name = "registration_deadline")
    private LocalDateTime registrationDeadline;

    @Column(nullable = false, name = "drive_date")
    private LocalDateTime driveDate;

    @Column(length = 255, name = "rounds_info")
    private String roundsInfo = "Online Assessment, Technical Round, HR Round";

    @Column(nullable = false, length = 30)
    private String status = "OPEN"; // UPCOMING, OPEN, IN_PROGRESS, CLOSED

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    public PlacementDrive() {
        this.createdAt = LocalDateTime.now();
    }

    public PlacementDrive(Company company, String jobTitle, String jobDescription, String ctcPackage, Double packageLpa, String jobLocation, String jobType, Double eligibilityCgpa, Integer maxBacklogs, String eligibleDepartments, LocalDateTime registrationDeadline, LocalDateTime driveDate, String roundsInfo, String status) {
        this();
        this.company = company;
        this.jobTitle = jobTitle;
        this.jobDescription = jobDescription;
        this.ctcPackage = ctcPackage;
        this.packageLpa = packageLpa;
        this.jobLocation = jobLocation;
        this.jobType = jobType != null ? jobType : "Full-Time + Internship";
        this.eligibilityCgpa = eligibilityCgpa != null ? eligibilityCgpa : 7.0;
        this.maxBacklogs = maxBacklogs != null ? maxBacklogs : 0;
        this.eligibleDepartments = eligibleDepartments != null ? eligibleDepartments : "CSE, IT, ECE";
        this.registrationDeadline = registrationDeadline;
        this.driveDate = driveDate;
        this.roundsInfo = roundsInfo;
        this.status = status != null ? status : "OPEN";
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Company getCompany() { return company; }
    public void setCompany(Company company) { this.company = company; }

    public String getJobTitle() { return jobTitle; }
    public void setJobTitle(String jobTitle) { this.jobTitle = jobTitle; }

    public String getJobDescription() { return jobDescription; }
    public void setJobDescription(String jobDescription) { this.jobDescription = jobDescription; }

    public String getCtcPackage() { return ctcPackage; }
    public void setCtcPackage(String ctcPackage) { this.ctcPackage = ctcPackage; }

    public Double getPackageLpa() { return packageLpa; }
    public void setPackageLpa(Double packageLpa) { this.packageLpa = packageLpa; }

    public String getJobLocation() { return jobLocation; }
    public void setJobLocation(String jobLocation) { this.jobLocation = jobLocation; }

    public String getJobType() { return jobType; }
    public void setJobType(String jobType) { this.jobType = jobType; }

    public Double getEligibilityCgpa() { return eligibilityCgpa; }
    public void setEligibilityCgpa(Double eligibilityCgpa) { this.eligibilityCgpa = eligibilityCgpa; }

    public Integer getMaxBacklogs() { return maxBacklogs; }
    public void setMaxBacklogs(Integer maxBacklogs) { this.maxBacklogs = maxBacklogs; }

    public String getEligibleDepartments() { return eligibleDepartments; }
    public void setEligibleDepartments(String eligibleDepartments) { this.eligibleDepartments = eligibleDepartments; }

    public LocalDateTime getRegistrationDeadline() { return registrationDeadline; }
    public void setRegistrationDeadline(LocalDateTime registrationDeadline) { this.registrationDeadline = registrationDeadline; }

    public LocalDateTime getDriveDate() { return driveDate; }
    public void setDriveDate(LocalDateTime driveDate) { this.driveDate = driveDate; }

    public String getRoundsInfo() { return roundsInfo; }
    public void setRoundsInfo(String roundsInfo) { this.roundsInfo = roundsInfo; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
