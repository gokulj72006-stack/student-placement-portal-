package com.portal.repository;

import com.portal.entity.Course;
import com.portal.entity.Enrollment;
import com.portal.entity.StudentProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    List<Enrollment> findByStudent(StudentProfile student);
    List<Enrollment> findByStudentId(Long studentId);
    List<Enrollment> findByCourse(Course course);
    Optional<Enrollment> findByStudentIdAndCourseId(Long studentId, Long courseId);
    boolean existsByStudentIdAndCourseId(Long studentId, Long courseId);
}
