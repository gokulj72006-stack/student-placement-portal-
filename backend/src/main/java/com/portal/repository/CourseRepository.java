package com.portal.repository;

import com.portal.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    Optional<Course> findByCourseCode(String courseCode);
    List<Course> findByDepartment(String department);
    List<Course> findBySemester(Integer semester);
    List<Course> findByCategory(String category);
}
