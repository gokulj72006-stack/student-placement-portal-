-- ========================================================
-- Realistic Seed Data for Student Course & Placement Portal
-- ========================================================

USE student_placement_db;

-- Clear previous data in correct foreign key order if re-running
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE placement_applications;
TRUNCATE TABLE placement_drives;
TRUNCATE TABLE companies;
TRUNCATE TABLE enrollments;
TRUNCATE TABLE courses;
TRUNCATE TABLE student_profiles;
TRUNCATE TABLE users;
SET FOREIGN_KEY_CHECKS = 1;

-- 1. Users
INSERT INTO users (id, username, password_hash, full_name, email, phone, role, avatar_url) VALUES
(1, 'student_arjun', 'password123', 'Arjun Sharma', 'arjun.sharma@university.edu', '+91 98765 43210', 'ROLE_STUDENT', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'),
(2, 'admin_tnp', 'admin123', 'Dr. K. Ramanathan', 'tnp.head@university.edu', '+91 98410 12345', 'ROLE_ADMIN', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'),
(3, 'recruiter_google', 'recruiter123', 'Priya Nandakumar', 'priya.n@google.com', '+91 91234 56789', 'ROLE_RECRUITER', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80');

-- 2. Student Profile (for Arjun)
INSERT INTO student_profiles (id, user_id, roll_number, department, semester, batch_year, cgpa, backlogs, skills, resume_url, github_url, linkedin_url, placement_status) VALUES
(1, 1, '21CS084', 'Computer Science & Engineering', 7, 2025, 8.85, 0, 'Java, Spring Boot, React, MySQL, Docker, Kubernetes, Microservices, Python, Git', 'https://university.edu/resumes/21CS084_Arjun.pdf', 'https://github.com/arjunsharma-dev', 'https://linkedin.com/in/arjunsharma-cs', 'OFFER_RECEIVED');

-- 3. Courses
INSERT INTO courses (id, course_code, title, description, instructor, department, credits, semester, capacity, enrolled_count, schedule, room, category) VALUES
(1, 'CS401', 'Cloud Architecture & Microservices', 'In-depth study of distributed systems, cloud computing patterns (AWS/GCP), container orchestration with Docker/K8s, and event-driven architectures with Kafka.', 'Dr. Sarah Jenkins', 'Computer Science', 4, 7, 60, 48, 'Mon, Wed 10:00 - 11:30 AM', 'Tech Tower C-204', 'Core Elective'),
(2, 'CS402', 'Applied Machine Learning & Deep Neural Nets', 'Practical implementations of Transformers, PyTorch, computer vision, and NLP pipelines with real-world enterprise deployments.', 'Prof. David Vance', 'Computer Science', 4, 7, 50, 45, 'Tue, Thu 02:00 - 03:30 PM', 'AI Lab Room 102', 'Specialization'),
(3, 'CS403', 'Enterprise Full Stack Engineering', 'Architecting robust enterprise web applications using Spring Boot 3, React, Tailwind CSS, JPA/Hibernate, and secure RESTful design principles.', 'Dr. Meera Swaminathan', 'Computer Science', 3, 7, 70, 62, 'Fri 09:00 - 12:00 PM', 'Software Lab 3', 'Practical Lab'),
(4, 'CS404', 'System Design & High-Scalability Systems', 'Preparation for Tier-1 engineering interviews covering load balancing, caching tiers (Redis), database sharding, CAP theorem, and rate limiters.', 'Er. Rohit Singhal', 'Computer Science', 3, 7, 80, 75, 'Wed, Fri 04:00 - 05:30 PM', 'Auditorium 2', 'Core Elective'),
(5, 'IT405', 'Cybersecurity & Ethical Defense Operations', 'Principles of zero-trust architecture, threat modeling, OWASP top 10 vulnerabilities, penetration testing, and modern cryptographic protocols.', 'Dr. Alan Morales', 'Information Technology', 3, 7, 50, 38, 'Tue 10:00 - 01:00 PM', 'CyberSec Lab B', 'Elective'),
(6, 'EC406', 'IoT Embedded Systems & Edge Computing', 'Interfacing microcontrollers (ESP32/STM32) with cloud IoT gateways, MQTT protocol, low-power telemetry, and hardware debugging.', 'Dr. Rajeshwari K.', 'Electronics & Comm', 3, 7, 45, 29, 'Mon, Thu 03:00 - 04:30 PM', 'VLSI & IoT Lab', 'Interdisciplinary');

-- 4. Enrollments (Arjun's registered courses)
INSERT INTO enrollments (id, student_id, course_id, enrolled_at, status, attendance_pct, grade) VALUES
(1, 1, 1, '2026-08-10 09:30:00', 'ENROLLED', 94.50, 'A+'),
(2, 1, 2, '2026-08-10 09:32:00', 'ENROLLED', 88.00, 'A'),
(3, 1, 3, '2026-08-10 09:35:00', 'ENROLLED', 96.00, 'A+'),
(4, 1, 4, '2026-08-10 09:40:00', 'ENROLLED', 91.50, 'A');

-- 5. Companies
INSERT INTO companies (id, name, industry, website, logo_url, location, tier) VALUES
(1, 'Google', 'Cloud & AI Platforms', 'https://careers.google.com', 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg', 'Bangalore / Hyderabad', 'SUPER_DREAM'),
(2, 'Microsoft', 'Software & Cloud Services', 'https://careers.microsoft.com', 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg', 'Hyderabad / Bangalore / Noida', 'SUPER_DREAM'),
(3, 'Amazon', 'E-Commerce & AWS Cloud', 'https://amazon.jobs', 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg', 'Bangalore / Chennai', 'TIER_1_DREAM'),
(4, 'Atlassian', 'Developer Productivity Tools', 'https://www.atlassian.com/company/careers', 'https://upload.wikimedia.org/wikipedia/commons/0/01/Atlassian-Logo.svg', 'Bangalore (Remote Friendly)', 'SUPER_DREAM'),
(5, 'Cisco Systems', 'Networking & Cyber Security', 'https://jobs.cisco.com', 'https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg', 'Bangalore', 'TIER_1_DREAM'),
(6, 'Deloitte USI', 'Consulting & Digital Solutions', 'https://careers.deloitte.com', 'https://upload.wikimedia.org/wikipedia/commons/5/56/Deloitte.svg', 'Hyderabad / Mumbai / Bangalore', 'REGULAR');

-- 6. Placement Drives
INSERT INTO placement_drives (id, company_id, job_title, job_description, ctc_package, package_lpa, job_location, job_type, eligibility_cgpa, max_backlogs, eligible_departments, registration_deadline, drive_date, rounds_info, status) VALUES
(1, 1, 'Software Engineer (Campus Hire)', 'Build planet-scale distributed infrastructure, search systems, and machine intelligence models for billions of users.', '₹34.5 LPA', 34.50, 'Bangalore', 'Full-Time SDE-1', 8.50, 0, 'CSE, IT, ECE', '2026-11-15 23:59:00', '2026-11-20 09:00:00', '1. Online Assessment | 2. DSA & Problem Solving | 3. System Design | 4. Googliness & Fit', 'OPEN'),
(2, 2, 'Software Development Engineer', 'Join Azure Cloud, Microsoft 365, or Developer Tools engineering teams creating next-generation generative AI workflows.', '₹42.0 LPA', 42.00, 'Hyderabad', 'Full-Time + 6M Intern', 8.00, 0, 'CSE, IT', '2026-11-10 23:59:00', '2026-11-14 09:30:00', '1. Codility Assessment | 2. Algorithms & DS | 3. Object-Oriented Design | 4. Techno-Managerial', 'OPEN'),
(3, 3, 'SDE - Cloud Services (AWS)', 'Design ultra-high throughput microservices powering Amazon Web Services compute, storage, and serverless architectures.', '₹28.5 LPA', 28.50, 'Bangalore', 'Full-Time SDE', 7.50, 0, 'CSE, IT, ECE', '2026-11-05 18:00:00', '2026-11-08 10:00:00', '1. Debugging & Work Simulation | 2. Technical Interview 1 | 3. Technical Interview 2 | 4. Bar Raiser', 'IN_PROGRESS'),
(4, 4, 'Associate Software Engineer', 'Work on Jira, Confluence, and Bitbucket cloud distributed backends with modern Java, Kotlin, React, and GraphQL.', '₹31.0 LPA', 31.00, 'Bangalore (Hybrid)', 'Full-Time ASE', 8.25, 0, 'CSE, IT', '2026-11-25 23:59:00', '2026-11-30 09:00:00', '1. Hackerrank Coding | 2. System Architecture | 3. Values Interview', 'UPCOMING'),
(5, 5, 'Network & Systems Engineer', 'Develop high-performance networking stacks, SD-WAN, and zero-trust cybersecurity protocols for enterprise clients.', '₹18.0 LPA', 18.00, 'Bangalore', 'Full-Time', 7.00, 1, 'CSE, IT, ECE, EEE', '2026-11-18 20:00:00', '2026-11-22 10:00:00', '1. Aptitude & Technical MCQs | 2. Coding Round | 3. Cisco Panel Interview', 'OPEN'),
(6, 6, 'Associate Analyst - Software Development', 'Deliver cutting-edge cloud modernization, ERP transformations, and full-stack solutions for Fortune 500 enterprises.', '₹10.5 LPA', 10.50, 'Hyderabad', 'Full-Time', 6.50, 2, 'All Engineering Branches', '2026-11-02 23:59:00', '2026-11-06 09:00:00', '1. Cognitive & Verbal Assessment | 2. Versant Test | 3. Tech & HR Interview', 'IN_PROGRESS');

-- 7. Placement Applications (Arjun's application history)
INSERT INTO placement_applications (id, drive_id, student_id, applied_at, status, current_round, interview_time, notes, offer_ctc) VALUES
(1, 3, 1, '2026-10-18 11:20:00', 'OFFERED', 'Final Bar Raiser Cleared', 'Completed on 2026-10-22', 'Exceptional performance in Distributed Systems and AWS questions.', '₹28.5 LPA'),
(2, 2, 1, '2026-10-20 14:15:00', 'INTERVIEW_SCHEDULED', 'Round 2 - Algorithms & Data Structures', '2026-10-28 14:00 PM via Microsoft Teams', 'Online assessment cleared with 100% score (3/3 test cases passed).', NULL),
(3, 1, 1, '2026-10-23 09:45:00', 'APPLIED', 'Application Screening & Resume Match', 'Awaiting OA shortlist release', 'Profile meets 8.5 CGPA criterion (Current CGPA: 8.85).', NULL);
