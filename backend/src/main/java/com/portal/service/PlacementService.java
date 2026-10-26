package com.portal.service;

import com.portal.dto.ApplicationRequestDto;
import com.portal.dto.StatusUpdateDto;
import com.portal.entity.Company;
import com.portal.entity.PlacementApplication;
import com.portal.entity.PlacementDrive;
import com.portal.entity.StudentProfile;
import com.portal.repository.CompanyRepository;
import com.portal.repository.PlacementApplicationRepository;
import com.portal.repository.PlacementDriveRepository;
import com.portal.repository.StudentProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class PlacementService {

    @Autowired private PlacementDriveRepository placementDriveRepository;
    @Autowired private PlacementApplicationRepository applicationRepository;
    @Autowired private StudentProfileRepository studentProfileRepository;
    @Autowired private CompanyRepository companyRepository;

    public List<PlacementDrive> getAllDrives() {
        return placementDriveRepository.findAll();
    }

    public Optional<PlacementDrive> getDriveById(Long id) {
        return placementDriveRepository.findById(id);
    }

    public PlacementDrive createDrive(PlacementDrive drive) {
        if (drive.getCompany() != null && drive.getCompany().getId() != null) {
            Company company = companyRepository.findById(drive.getCompany().getId())
                    .orElseThrow(() -> new RuntimeException("Company not found"));
            drive.setCompany(company);
        }
        return placementDriveRepository.save(drive);
    }

    public List<PlacementApplication> getAllApplications() {
        return applicationRepository.findAll();
    }

    public List<PlacementApplication> getApplicationsByStudent(Long studentId) {
        return applicationRepository.findByStudentId(studentId);
    }

    public List<PlacementApplication> getApplicationsByDrive(Long driveId) {
        return applicationRepository.findByDriveId(driveId);
    }

    @Transactional
    public PlacementApplication applyForDrive(ApplicationRequestDto dto) {
        if (applicationRepository.existsByStudentIdAndDriveId(dto.getStudentId(), dto.getDriveId())) {
            throw new RuntimeException("You have already applied for this placement drive.");
        }

        StudentProfile student = studentProfileRepository.findById(dto.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student profile not found"));
        PlacementDrive drive = placementDriveRepository.findById(dto.getDriveId())
                .orElseThrow(() -> new RuntimeException("Placement drive not found"));

        // CGPA Eligibility Verification
        if (student.getCgpa() < drive.getEligibilityCgpa()) {
            throw new RuntimeException("Ineligible: Your CGPA (" + student.getCgpa() + ") is below the requirement (" + drive.getEligibilityCgpa() + ")");
        }

        if (student.getBacklogs() > drive.getMaxBacklogs()) {
            throw new RuntimeException("Ineligible: Your active backlogs (" + student.getBacklogs() + ") exceed allowed maximum (" + drive.getMaxBacklogs() + ")");
        }

        PlacementApplication app = new PlacementApplication(
                drive, student, "APPLIED", "Application Submitted & Screening", null, dto.getNotes(), null
        );

        if ("UNPLACED".equalsIgnoreCase(student.getPlacementStatus())) {
            student.setPlacementStatus("IN_PROCESS");
            studentProfileRepository.save(student);
        }

        return applicationRepository.save(app);
    }

    @Transactional
    public PlacementApplication updateApplicationStatus(Long applicationId, StatusUpdateDto updateDto) {
        PlacementApplication app = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        if (updateDto.getStatus() != null) app.setStatus(updateDto.getStatus());
        if (updateDto.getCurrentRound() != null) app.setCurrentRound(updateDto.getCurrentRound());
        if (updateDto.getInterviewTime() != null) app.setInterviewTime(updateDto.getInterviewTime());
        if (updateDto.getNotes() != null) app.setNotes(updateDto.getNotes());
        if (updateDto.getOfferCtc() != null) {
            app.setOfferCtc(updateDto.getOfferCtc());
            // Update student placement status to OFFER_RECEIVED
            StudentProfile student = app.getStudent();
            student.setPlacementStatus("OFFER_RECEIVED");
            studentProfileRepository.save(student);
        }

        return applicationRepository.save(app);
    }

    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }
}
