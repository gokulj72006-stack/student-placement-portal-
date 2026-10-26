package com.portal.repository;

import com.portal.entity.PlacementApplication;
import com.portal.entity.PlacementDrive;
import com.portal.entity.StudentProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface PlacementApplicationRepository extends JpaRepository<PlacementApplication, Long> {
    List<PlacementApplication> findByStudent(StudentProfile student);
    List<PlacementApplication> findByStudentId(Long studentId);
    List<PlacementApplication> findByDrive(PlacementDrive drive);
    List<PlacementApplication> findByDriveId(Long driveId);
    List<PlacementApplication> findByStatus(String status);
    Optional<PlacementApplication> findByStudentIdAndDriveId(Long studentId, Long driveId);
    boolean existsByStudentIdAndDriveId(Long studentId, Long driveId);
}
