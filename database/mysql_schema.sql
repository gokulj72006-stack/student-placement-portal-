-- ========================================================
-- Student Course & Placement Management System
-- MySQL Schema Definition
-- Database: student_placement_db
-- ========================================================

CREATE DATABASE IF NOT EXISTS student_placement_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE student_placement_db;

-- 1. Users Table (Authentication & Core Identity)
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(60) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(120) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    phone VARCHAR(20),
    role VARCHAR(30) NOT NULL DEFAULT 'ROLE_STUDENT', -- ROLE_STUDENT, ROLE_RECRUITER, ROLE_ADMIN
    avatar_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 2. Student Profiles Table
CREATE TABLE IF NOT EXISTS student_profiles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE,
    roll_number VARCHAR(30) NOT NULL UNIQUE,
    department VARCHAR(80) NOT NULL,
    semester INT NOT NULL DEFAULT 7,
    batch_year INT NOT NULL DEFAULT 2025,
    cgpa DECIMAL(4,2) NOT NULL DEFAULT 0.00,
    backlogs INT NOT NULL DEFAULT 0,
    skills TEXT,
    resume_url VARCHAR(500),
    github_url VARCHAR(255),
    linkedin_url VARCHAR(255),
    placement_status VARCHAR(30) NOT NULL DEFAULT 'UNPLACED', -- UNPLACED, IN_PROCESS, OFFER_RECEIVED, PLACED
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_student_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 3. Courses Table
CREATE TABLE IF NOT EXISTS courses (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    course_code VARCHAR(30) NOT NULL UNIQUE,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    instructor VARCHAR(100) NOT NULL,
    department VARCHAR(80) NOT NULL,
    credits INT NOT NULL DEFAULT 3,
    semester INT NOT NULL DEFAULT 7,
    capacity INT NOT NULL DEFAULT 60,
    enrolled_count INT NOT NULL DEFAULT 0,
    schedule VARCHAR(120),
    room VARCHAR(60),
    category VARCHAR(50) DEFAULT 'Core Elective',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 4. Course Enrollments Table
CREATE TABLE IF NOT EXISTS enrollments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT NOT NULL,
    course_id BIGINT NOT NULL,
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(30) NOT NULL DEFAULT 'ENROLLED', -- ENROLLED, COMPLETED, DROPPED
    attendance_pct DECIMAL(5,2) DEFAULT 90.00,
    grade VARCHAR(10) DEFAULT 'Pending',
    CONSTRAINT fk_enrollment_student FOREIGN KEY (student_id) REFERENCES student_profiles(id) ON DELETE CASCADE,
    CONSTRAINT fk_enrollment_course FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    CONSTRAINT uq_student_course UNIQUE (student_id, course_id)
) ENGINE=InnoDB;

-- 5. Companies Table
CREATE TABLE IF NOT EXISTS companies (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(120) NOT NULL UNIQUE,
    industry VARCHAR(100) NOT NULL,
    website VARCHAR(255),
    logo_url VARCHAR(500),
    location VARCHAR(120) NOT NULL,
    tier VARCHAR(30) NOT NULL DEFAULT 'TIER_1_DREAM', -- SUPER_DREAM, TIER_1_DREAM, REGULAR
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 6. Placement Drives Table
CREATE TABLE IF NOT EXISTS placement_drives (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    company_id BIGINT NOT NULL,
    job_title VARCHAR(150) NOT NULL,
    job_description TEXT,
    ctc_package VARCHAR(50) NOT NULL, -- e.g. "28.5 LPA"
    package_lpa DECIMAL(5,2) NOT NULL, -- e.g. 28.50
    job_location VARCHAR(120) NOT NULL,
    job_type VARCHAR(60) NOT NULL DEFAULT 'Full-Time + Internship',
    eligibility_cgpa DECIMAL(4,2) NOT NULL DEFAULT 7.00,
    max_backlogs INT NOT NULL DEFAULT 0,
    eligible_departments VARCHAR(255) NOT NULL DEFAULT 'CSE, IT, ECE',
    registration_deadline DATETIME NOT NULL,
    drive_date DATETIME NOT NULL,
    rounds_info VARCHAR(255) DEFAULT 'Online Test, Technical Round, HR Round',
    status VARCHAR(30) NOT NULL DEFAULT 'OPEN', -- UPCOMING, OPEN, IN_PROGRESS, CLOSED
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_drive_company FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 7. Placement Applications Table
CREATE TABLE IF NOT EXISTS placement_applications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    drive_id BIGINT NOT NULL,
    student_id BIGINT NOT NULL,
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(40) NOT NULL DEFAULT 'APPLIED', -- APPLIED, SHORTLISTED, OA_CLEARED, INTERVIEW_SCHEDULED, OFFERED, REJECTED
    current_round VARCHAR(80) DEFAULT 'Application Review',
    interview_time VARCHAR(100),
    notes TEXT,
    offer_ctc VARCHAR(50),
    CONSTRAINT fk_application_drive FOREIGN KEY (drive_id) REFERENCES placement_drives(id) ON DELETE CASCADE,
    CONSTRAINT fk_application_student FOREIGN KEY (student_id) REFERENCES student_profiles(id) ON DELETE CASCADE,
    CONSTRAINT uq_student_drive UNIQUE (student_id, drive_id)
) ENGINE=InnoDB;

-- Indexes for lightning fast lookups
CREATE INDEX idx_student_cgpa ON student_profiles(cgpa);
CREATE INDEX idx_course_dept ON courses(department);
CREATE INDEX idx_drive_status ON placement_drives(status);
CREATE INDEX idx_app_status ON placement_applications(status);
