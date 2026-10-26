package com.portal.service;

import com.portal.entity.*;
import com.portal.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class DataInitializationService implements CommandLineRunner {

    @Autowired private UserRepository userRepository;
    @Autowired private StudentProfileRepository studentProfileRepository;
    @Autowired private CourseRepository courseRepository;
    @Autowired private EnrollmentRepository enrollmentRepository;
    @Autowired private CompanyRepository companyRepository;
    @Autowired private PlacementDriveRepository placementDriveRepository;
    @Autowired private PlacementApplicationRepository placementApplicationRepository;

    @Override
    public void run(String... args) {
        if (userRepository.count() > 0) {
            return; // Data already exists
        }

        // 1. Users
        User studentUser = new User("student_arjun", "password123", "Arjun Sharma", "arjun.sharma@university.edu", "+91 98765 43210", "ROLE_STUDENT", "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80");
        User adminUser = new User("admin_tnp", "admin123", "Dr. K. Ramanathan", "tnp.head@university.edu", "+91 98410 12345", "ROLE_ADMIN", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80");
        User recruiterUser = new User("recruiter_google", "recruiter123", "Priya Nandakumar", "priya.n@google.com", "+91 91234 56789", "ROLE_RECRUITER", "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80");

        userRepository.save(studentUser);
        userRepository.save(adminUser);
        userRepository.save(recruiterUser);

        // 2. Student Profile
        StudentProfile arjun = new StudentProfile(
                studentUser, "21CS084", "Computer Science & Engineering", 7, 2025, 8.85, 0,
                "Java, Spring Boot, React, MySQL, Docker, Kubernetes, Microservices, Python, Git",
                "https://university.edu/resumes/21CS084_Arjun.pdf",
                "https://github.com/arjunsharma-dev",
                "https://linkedin.com/in/arjunsharma-cs",
                "OFFER_RECEIVED"
        );
        studentProfileRepository.save(arjun);

        // 3. Courses
        Course c1 = new Course("CS401", "Cloud Architecture & Microservices", "In-depth study of distributed systems, cloud computing patterns (AWS/GCP), container orchestration with Docker/K8s, and event-driven architectures with Kafka.", "Dr. Sarah Jenkins", "Computer Science", 4, 7, 60, 48, "Mon, Wed 10:00 - 11:30 AM", "Tech Tower C-204", "Core Elective");
        Course c2 = new Course("CS402", "Applied Machine Learning & Deep Neural Nets", "Practical implementations of Transformers, PyTorch, computer vision, and NLP pipelines with real-world enterprise deployments.", "Prof. David Vance", "Computer Science", 4, 7, 50, 45, "Tue, Thu 02:00 - 03:30 PM", "AI Lab Room 102", "Specialization");
        Course c3 = new Course("CS403", "Enterprise Full Stack Engineering", "Architecting robust enterprise web applications using Spring Boot 3, React, Tailwind CSS, JPA/Hibernate, and secure RESTful design principles.", "Dr. Meera Swaminathan", "Computer Science", 3, 7, 70, 62, "Fri 09:00 - 12:00 PM", "Software Lab 3", "Practical Lab");
        Course c4 = new Course("CS404", "System Design & High-Scalability Systems", "Preparation for Tier-1 engineering interviews covering load balancing, caching tiers (Redis), database sharding, CAP theorem, and rate limiters.", "Er. Rohit Singhal", "Computer Science", 3, 7, 80, 75, "Wed, Fri 04:00 - 05:30 PM", "Auditorium 2", "Core Elective");
        Course c5 = new Course("IT405", "Cybersecurity & Ethical Defense Operations", "Principles of zero-trust architecture, threat modeling, OWASP top 10 vulnerabilities, penetration testing, and modern cryptographic protocols.", "Dr. Alan Morales", "Information Technology", 3, 7, 50, 38, "Tue 10:00 - 01:00 PM", "CyberSec Lab B", "Elective");
        Course c6 = new Course("EC406", "IoT Embedded Systems & Edge Computing", "Interfacing microcontrollers (ESP32/STM32) with cloud IoT gateways, MQTT protocol, low-power telemetry, and hardware debugging.", "Dr. Rajeshwari K.", "Electronics & Comm", 3, 7, 45, 29, "Mon, Thu 03:00 - 04:30 PM", "VLSI & IoT Lab", "Interdisciplinary");

        courseRepository.save(c1);
        courseRepository.save(c2);
        courseRepository.save(c3);
        courseRepository.save(c4);
        courseRepository.save(c5);
        courseRepository.save(c6);

        // 4. Enrollments
        enrollmentRepository.save(new Enrollment(arjun, c1, "ENROLLED", 94.5, "A+"));
        enrollmentRepository.save(new Enrollment(arjun, c2, "ENROLLED", 88.0, "A"));
        enrollmentRepository.save(new Enrollment(arjun, c3, "ENROLLED", 96.0, "A+"));
        enrollmentRepository.save(new Enrollment(arjun, c4, "ENROLLED", 91.5, "A"));

        // 5. Companies
        Company g = new Company("Google", "Cloud & AI Platforms", "https://careers.google.com", "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg", "Bangalore / Hyderabad", "SUPER_DREAM");
        Company ms = new Company("Microsoft", "Software & Cloud Services", "https://careers.microsoft.com", "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg", "Hyderabad / Bangalore", "SUPER_DREAM");
        Company amz = new Company("Amazon", "E-Commerce & AWS Cloud", "https://amazon.jobs", "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg", "Bangalore / Chennai", "TIER_1_DREAM");
        Company atl = new Company("Atlassian", "Developer Productivity Tools", "https://www.atlassian.com/company/careers", "https://upload.wikimedia.org/wikipedia/commons/0/01/Atlassian-Logo.svg", "Bangalore", "SUPER_DREAM");
        Company cisco = new Company("Cisco Systems", "Networking & Cyber Security", "https://jobs.cisco.com", "https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg", "Bangalore", "TIER_1_DREAM");
        Company deloitte = new Company("Deloitte USI", "Consulting & Digital Solutions", "https://careers.deloitte.com", "https://upload.wikimedia.org/wikipedia/commons/5/56/Deloitte.svg", "Hyderabad / Mumbai", "REGULAR");

        companyRepository.save(g);
        companyRepository.save(ms);
        companyRepository.save(amz);
        companyRepository.save(atl);
        companyRepository.save(cisco);
        companyRepository.save(deloitte);

        // 6. Placement Drives
        PlacementDrive d1 = new PlacementDrive(g, "Software Engineer (Campus Hire)", "Build planet-scale distributed infrastructure, search systems, and machine intelligence models for billions of users.", "₹34.5 LPA", 34.5, "Bangalore", "Full-Time SDE-1", 8.5, 0, "CSE, IT, ECE", LocalDateTime.now().plusDays(20), LocalDateTime.now().plusDays(25), "1. OA | 2. DSA | 3. System Design | 4. Googliness", "OPEN");
        PlacementDrive d2 = new PlacementDrive(ms, "Software Development Engineer", "Join Azure Cloud, Microsoft 365, or Developer Tools engineering teams creating next-generation generative AI workflows.", "₹42.0 LPA", 42.0, "Hyderabad", "Full-Time + 6M Intern", 8.0, 0, "CSE, IT", LocalDateTime.now().plusDays(15), LocalDateTime.now().plusDays(19), "1. Codility OA | 2. Algorithms | 3. System Design | 4. Fit", "OPEN");
        PlacementDrive d3 = new PlacementDrive(amz, "SDE - Cloud Services (AWS)", "Design ultra-high throughput microservices powering Amazon Web Services compute, storage, and serverless architectures.", "₹28.5 LPA", 28.5, "Bangalore", "Full-Time SDE", 7.5, 0, "CSE, IT, ECE", LocalDateTime.now().plusDays(10), LocalDateTime.now().plusDays(13), "1. Work Simulation | 2. Tech 1 | 3. Tech 2 | 4. Bar Raiser", "IN_PROGRESS");
        PlacementDrive d4 = new PlacementDrive(atl, "Associate Software Engineer", "Work on Jira, Confluence, and Bitbucket cloud distributed backends with modern Java, Kotlin, React, and GraphQL.", "₹31.0 LPA", 31.0, "Bangalore (Hybrid)", "Full-Time ASE", 8.25, 0, "CSE, IT", LocalDateTime.now().plusDays(30), LocalDateTime.now().plusDays(35), "1. Hackerrank Coding | 2. System Architecture | 3. Values", "UPCOMING");
        PlacementDrive d5 = new PlacementDrive(cisco, "Network & Systems Engineer", "Develop high-performance networking stacks, SD-WAN, and zero-trust cybersecurity protocols for enterprise clients.", "₹18.0 LPA", 18.0, "Bangalore", "Full-Time", 7.0, 1, "CSE, IT, ECE, EEE", LocalDateTime.now().plusDays(22), LocalDateTime.now().plusDays(26), "1. MCQs | 2. Coding Round | 3. Cisco Panel", "OPEN");

        placementDriveRepository.save(d1);
        placementDriveRepository.save(d2);
        placementDriveRepository.save(d3);
        placementDriveRepository.save(d4);
        placementDriveRepository.save(d5);

        // 7. Placement Applications
        placementApplicationRepository.save(new PlacementApplication(d3, arjun, "OFFERED", "Final Bar Raiser Cleared", "Completed on 2026-10-22", "Exceptional performance in Distributed Systems and AWS questions.", "₹28.5 LPA"));
        placementApplicationRepository.save(new PlacementApplication(d2, arjun, "INTERVIEW_SCHEDULED", "Round 2 - Algorithms & Data Structures", "2026-11-04 14:00 PM via Microsoft Teams", "Online assessment cleared with 100% score (3/3 test cases passed).", null));
        placementApplicationRepository.save(new PlacementApplication(d1, arjun, "APPLIED", "Application Screening & Resume Match", "Awaiting OA shortlist release", "Profile meets 8.5 CGPA criterion (Current CGPA: 8.85).", null));
    }
}
