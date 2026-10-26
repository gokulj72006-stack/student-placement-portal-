package com.portal.service;

import com.portal.dto.EnrollmentRequestDto;
import com.portal.entity.Course;
import com.portal.entity.Enrollment;
import com.portal.entity.StudentProfile;
import com.portal.repository.CourseRepository;
import com.portal.repository.EnrollmentRepository;
import com.portal.repository.StudentProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class CourseService {

    @Autowired private CourseRepository courseRepository;
    @Autowired private EnrollmentRepository enrollmentRepository;
    @Autowired private StudentProfileRepository studentProfileRepository;

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public Optional<Course> getCourseById(Long id) {
        return courseRepository.findById(id);
    }

    public Course createCourse(Course course) {
        return courseRepository.save(course);
    }

    public Course updateCourse(Long id, Course courseDetails) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found with id: " + id));
        course.setTitle(courseDetails.getTitle());
        course.setDescription(courseDetails.getDescription());
        course.setInstructor(courseDetails.getInstructor());
        course.setDepartment(courseDetails.getDepartment());
        course.setCredits(courseDetails.getCredits());
        course.setCapacity(courseDetails.getCapacity());
        course.setSchedule(courseDetails.getSchedule());
        course.setRoom(courseDetails.getRoom());
        course.setCategory(courseDetails.getCategory());
        return courseRepository.save(course);
    }

    public void deleteCourse(Long id) {
        courseRepository.deleteById(id);
    }

    public List<Enrollment> getStudentEnrollments(Long studentId) {
        return enrollmentRepository.findByStudentId(studentId);
    }

    @Transactional
    public Enrollment enrollStudent(EnrollmentRequestDto dto) {
        if (enrollmentRepository.existsByStudentIdAndCourseId(dto.getStudentId(), dto.getCourseId())) {
            throw new RuntimeException("Student is already enrolled in this course");
        }

        StudentProfile student = studentProfileRepository.findById(dto.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student profile not found"));
        Course course = courseRepository.findById(dto.getCourseId())
                .orElseThrow(() -> new RuntimeException("Course not found"));

        if (course.getEnrolledCount() >= course.getCapacity()) {
            throw new RuntimeException("Course capacity reached! Cannot enroll.");
        }

        course.setEnrolledCount(course.getEnrolledCount() + 1);
        courseRepository.save(course);

        Enrollment enrollment = new Enrollment(student, course, "ENROLLED", 100.0, "In-Progress");
        return enrollmentRepository.save(enrollment);
    }

    @Transactional
    public void dropEnrollment(Long studentId, Long courseId) {
        Enrollment enrollment = enrollmentRepository.findByStudentIdAndCourseId(studentId, courseId)
                .orElseThrow(() -> new RuntimeException("Enrollment not found"));

        Course course = enrollment.getCourse();
        if (course.getEnrolledCount() > 0) {
            course.setEnrolledCount(course.getEnrolledCount() - 1);
            courseRepository.save(course);
        }

        enrollmentRepository.delete(enrollment);
    }
}
