package com.portal.repository;

import com.portal.entity.StudentProfile;
import com.portal.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface StudentProfileRepository extends JpaRepository<StudentProfile, Long> {
    Optional<StudentProfile> findByUser(User user);
    Optional<StudentProfile> findByRollNumber(String rollNumber);
    Optional<StudentProfile> findByUserId(Long userId);
    List<StudentProfile> findByDepartment(String department);
    List<StudentProfile> findByPlacementStatus(String placementStatus);
}
