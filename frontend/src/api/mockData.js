// Initial seed state mirroring the MySQL / Spring Boot database

export const INITIAL_STUDENTS = [
  {
    id: 1,
    userId: 1,
    rollNumber: "21CS084",
    name: "Arjun Sharma",
    email: "arjun.sharma@university.edu",
    phone: "+91 98765 43210",
    department: "Computer Science & Engineering",
    semester: 7,
    batchYear: 2025,
    cgpa: 8.90,
    backlogs: 0,
    skills: "Java, Spring Boot, React, MySQL, Docker, Kubernetes, Microservices, Python, Git",
    resumeUrl: "https://university.edu/resumes/21CS084_Arjun.pdf",
    githubUrl: "https://github.com/arjunsharma-dev",
    linkedinUrl: "https://linkedin.com/in/arjunsharma-cs",
    placementStatus: "OFFER_RECEIVED",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
  }
];

export const INITIAL_COURSES = [
  {
    id: 1,
    courseCode: "CS401",
    title: "Cloud Architecture & Microservices",
    description: "In-depth study of distributed systems, cloud computing patterns (AWS/GCP), container orchestration with Docker/K8s, and event-driven architectures with Kafka.",
    instructor: "Dr. Sarah Jenkins",
    department: "Computer Science",
    credits: 4,
    semester: 7,
    capacity: 60,
    enrolledCount: 48,
    schedule: "Mon, Wed 10:00 - 11:30 AM",
    room: "Tech Tower C-204",
    category: "Core Elective",
    syllabus: [
      "Module 1: 12-Factor Apps & Cloud Native Archetypes",
      "Module 2: Containerization with Docker & Podman",
      "Module 3: Kubernetes Deployments, Services & Ingress",
      "Module 4: Event Streams with Apache Kafka",
      "Module 5: Observability with Prometheus & Grafana"
    ]
  },
  {
    id: 2,
    courseCode: "CS402",
    title: "Applied Machine Learning & Deep Neural Nets",
    description: "Practical implementations of Transformers, PyTorch, computer vision, and NLP pipelines with real-world enterprise deployments.",
    instructor: "Prof. David Vance",
    department: "Computer Science",
    credits: 4,
    semester: 7,
    capacity: 50,
    enrolledCount: 45,
    schedule: "Tue, Thu 02:00 - 03:30 PM",
    room: "AI Lab Room 102",
    category: "Specialization",
    syllabus: [
      "Module 1: Gradient Descent & Loss Optimization",
      "Module 2: Convolutional Neural Networks for Vision",
      "Module 3: Attention Mechanism & Transformer Models",
      "Module 4: LLM Fine-Tuning & Quantization",
      "Module 5: MLOps with MLflow & TorchServe"
    ]
  },
  {
    id: 3,
    courseCode: "CS403",
    title: "Enterprise Full Stack Engineering",
    description: "Architecting robust enterprise web applications using Spring Boot 3, React, Tailwind CSS, JPA/Hibernate, and secure RESTful design principles.",
    instructor: "Dr. Meera Swaminathan",
    department: "Computer Science",
    credits: 3,
    semester: 7,
    capacity: 70,
    enrolledCount: 62,
    schedule: "Fri 09:00 - 12:00 PM",
    room: "Software Lab 3",
    category: "Practical Lab",
    syllabus: [
      "Module 1: Spring Framework Internals & IoC",
      "Module 2: Spring Data JPA, Hibernate Caching & MySQL",
      "Module 3: Modern React Hooks, State & Context APIs",
      "Module 4: JWT Authentication & Role-Based Access",
      "Module 5: CI/CD Pipelines with GitHub Actions"
    ]
  },
  {
    id: 4,
    courseCode: "CS404",
    title: "System Design & High-Scalability Systems",
    description: "Preparation for Tier-1 engineering interviews covering load balancing, caching tiers (Redis), database sharding, CAP theorem, and rate limiters.",
    instructor: "Er. Rohit Singhal",
    department: "Computer Science",
    credits: 3,
    semester: 7,
    capacity: 80,
    enrolledCount: 75,
    schedule: "Wed, Fri 04:00 - 05:30 PM",
    room: "Auditorium 2",
    category: "Core Elective",
    syllabus: [
      "Module 1: Horizontal vs Vertical Scaling & Microservices",
      "Module 2: Distributed Caching with Redis & Memcached",
      "Module 3: Sharding, Replication & Consistent Hashing",
      "Module 4: Designing Netflix, Twitter & Uber Systems",
      "Module 5: Concurrency & Fault-Tolerance Patterns"
    ]
  },
  {
    id: 5,
    courseCode: "IT405",
    title: "Cybersecurity & Ethical Defense Operations",
    description: "Principles of zero-trust architecture, threat modeling, OWASP top 10 vulnerabilities, penetration testing, and modern cryptographic protocols.",
    instructor: "Dr. Alan Morales",
    department: "Information Technology",
    credits: 3,
    semester: 7,
    capacity: 50,
    enrolledCount: 38,
    schedule: "Tue 10:00 - 01:00 PM",
    room: "CyberSec Lab B",
    category: "Elective",
    syllabus: [
      "Module 1: Network Protocols & Packet Inspection",
      "Module 2: Cryptographic Primitives (RSA, ECC, AES)",
      "Module 3: OWASP Top 10 Web Exploits & Remediation",
      "Module 4: Privilege Escalation & Memory Corruptions",
      "Module 5: Threat Hunting & SIEM Analytics"
    ]
  },
  {
    id: 6,
    courseCode: "EC406",
    title: "IoT Embedded Systems & Edge Computing",
    description: "Interfacing microcontrollers (ESP32/STM32) with cloud IoT gateways, MQTT protocol, low-power telemetry, and hardware debugging.",
    instructor: "Dr. Raja Rajeshwari K.",
    department: "Electronics & Comm",
    credits: 3,
    semester: 7,
    capacity: 45,
    enrolledCount: 29,
    schedule: "Mon, Thu 03:00 - 04:30 PM",
    room: "VLSI & IoT Lab",
    category: "Interdisciplinary",
    syllabus: [
      "Module 1: Embedded C & ARM Cortex-M Architecture",
      "Module 2: Sensors, Actuators & SPI/I2C Protocols",
      "Module 3: MQTT & CoAP Communication Stacks",
      "Module 4: TinyML on Microcontrollers",
      "Module 5: Cloud Gateways (AWS IoT Core)"
    ]
  }
];

export const INITIAL_ENROLLMENTS = [
  { id: 1, studentId: 1, courseId: 1, enrolledAt: "2026-08-10T09:30:00", status: "ENROLLED", attendancePct: 94.5, grade: "A+" },
  { id: 2, studentId: 1, courseId: 2, enrolledAt: "2026-08-10T09:32:00", status: "ENROLLED", attendancePct: 88.0, grade: "A" },
  { id: 3, studentId: 1, courseId: 3, enrolledAt: "2026-08-10T09:35:00", status: "ENROLLED", attendancePct: 96.0, grade: "A+" },
  { id: 4, studentId: 1, courseId: 4, enrolledAt: "2026-08-10T09:40:00", status: "ENROLLED", attendancePct: 91.5, grade: "A" },
];

export const INITIAL_COMPANIES = [
  { id: 1, name: "Google", industry: "Cloud & AI Platforms", website: "https://careers.google.com", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg", location: "Bangalore / Hyderabad", tier: "SUPER_DREAM" },
  { id: 2, name: "Microsoft", industry: "Software & Cloud Services", website: "https://careers.microsoft.com", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg", location: "Hyderabad / Bangalore", tier: "SUPER_DREAM" },
  { id: 3, name: "Amazon", industry: "E-Commerce & AWS Cloud", website: "https://amazon.jobs", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg", location: "Bangalore / Chennai", tier: "TIER_1_DREAM" },
  { id: 4, name: "Atlassian", industry: "Developer Productivity Tools", website: "https://www.atlassian.com/company/careers", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/01/Atlassian-Logo.svg", location: "Bangalore", tier: "SUPER_DREAM" },
  { id: 5, name: "Cisco Systems", industry: "Networking & Cyber Security", website: "https://jobs.cisco.com", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg", location: "Bangalore", tier: "TIER_1_DREAM" },
  { id: 6, name: "Deloitte USI", industry: "Consulting & Digital Solutions", website: "https://careers.deloitte.com", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/5/56/Deloitte.svg", location: "Hyderabad / Mumbai", tier: "REGULAR" }
];

export const INITIAL_DRIVES = [
  {
    id: 1,
    companyId: 1,
    company: INITIAL_COMPANIES[0],
    jobTitle: "Software Engineer (Campus Hire)",
    jobDescription: "Build planet-scale distributed infrastructure, search systems, and machine intelligence models for billions of users.",
    ctcPackage: "₹34.5 LPA",
    packageLpa: 34.5,
    jobLocation: "Bangalore",
    jobType: "Full-Time SDE-1",
    eligibilityCgpa: 8.5,
    maxBacklogs: 0,
    eligibleDepartments: "CSE, IT, ECE",
    registrationDeadline: "2026-11-15T23:59:00",
    driveDate: "2026-11-20T09:00:00",
    roundsInfo: "1. Online Assessment | 2. DSA & Problem Solving | 3. System Design | 4. Googliness & Fit",
    status: "OPEN"
  },
  {
    id: 2,
    companyId: 2,
    company: INITIAL_COMPANIES[1],
    jobTitle: "Software Development Engineer",
    jobDescription: "Join Azure Cloud, Microsoft 365, or Developer Tools engineering teams creating next-generation generative AI workflows.",
    ctcPackage: "₹42.0 LPA",
    packageLpa: 42.0,
    jobLocation: "Hyderabad",
    jobType: "Full-Time + 6M Intern",
    eligibilityCgpa: 8.0,
    maxBacklogs: 0,
    eligibleDepartments: "CSE, IT",
    registrationDeadline: "2026-11-10T23:59:00",
    driveDate: "2026-11-14T09:30:00",
    roundsInfo: "1. Codility Assessment | 2. Algorithms & DS | 3. Object-Oriented Design | 4. Techno-Managerial",
    status: "OPEN"
  },
  {
    id: 3,
    companyId: 3,
    company: INITIAL_COMPANIES[2],
    jobTitle: "SDE - Cloud Services (AWS)",
    jobDescription: "Design ultra-high throughput microservices powering Amazon Web Services compute, storage, and serverless architectures.",
    ctcPackage: "₹28.5 LPA",
    packageLpa: 28.5,
    jobLocation: "Bangalore",
    jobType: "Full-Time SDE",
    eligibilityCgpa: 7.5,
    maxBacklogs: 0,
    eligibleDepartments: "CSE, IT, ECE",
    registrationDeadline: "2026-11-05T18:00:00",
    driveDate: "2026-11-08T10:00:00",
    roundsInfo: "1. Debugging & Work Simulation | 2. Technical 1 | 3. Technical 2 | 4. Bar Raiser",
    status: "IN_PROGRESS"
  },
  {
    id: 4,
    companyId: 4,
    company: INITIAL_COMPANIES[3],
    jobTitle: "Associate Software Engineer",
    jobDescription: "Work on Jira, Confluence, and Bitbucket cloud distributed backends with modern Java, Kotlin, React, and GraphQL.",
    ctcPackage: "₹31.0 LPA",
    packageLpa: 31.0,
    jobLocation: "Bangalore (Hybrid)",
    jobType: "Full-Time ASE",
    eligibilityCgpa: 8.25,
    maxBacklogs: 0,
    eligibleDepartments: "CSE, IT",
    registrationDeadline: "2026-11-25T23:59:00",
    driveDate: "2026-11-30T09:00:00",
    roundsInfo: "1. Hackerrank Coding | 2. System Architecture | 3. Values Interview",
    status: "UPCOMING"
  },
  {
    id: 5,
    companyId: 5,
    company: INITIAL_COMPANIES[4],
    jobTitle: "Network & Systems Engineer",
    jobDescription: "Develop high-performance networking stacks, SD-WAN, and zero-trust cybersecurity protocols for enterprise clients.",
    ctcPackage: "₹18.0 LPA",
    packageLpa: 18.0,
    jobLocation: "Bangalore",
    jobType: "Full-Time",
    eligibilityCgpa: 7.0,
    maxBacklogs: 1,
    eligibleDepartments: "CSE, IT, ECE, EEE",
    registrationDeadline: "2026-11-18T20:00:00",
    driveDate: "2026-11-22T10:00:00",
    roundsInfo: "1. Aptitude & Technical MCQs | 2. Coding Round | 3. Cisco Panel Interview",
    status: "OPEN"
  }
];

export const INITIAL_APPLICATIONS = [
  {
    id: 1,
    driveId: 3,
    drive: INITIAL_DRIVES[2],
    studentId: 1,
    student: INITIAL_STUDENTS[0],
    appliedAt: "2026-10-18T11:20:00",
    status: "OFFERED",
    currentRound: "Final Bar Raiser Cleared",
    interviewTime: "Completed on 2026-10-22",
    notes: "Exceptional performance in Distributed Systems and AWS questions.",
    offerCtc: "₹28.5 LPA"
  },
  {
    id: 2,
    driveId: 2,
    drive: INITIAL_DRIVES[1],
    studentId: 1,
    student: INITIAL_STUDENTS[0],
    appliedAt: "2026-10-20T14:15:00",
    status: "INTERVIEW_SCHEDULED",
    currentRound: "Round 2 - Algorithms & Data Structures",
    interviewTime: "2026-11-04 14:00 PM via Microsoft Teams",
    notes: "Online assessment cleared with 100% score (3/3 test cases passed).",
    offerCtc: null
  },
  {
    id: 3,
    driveId: 1,
    drive: INITIAL_DRIVES[0],
    studentId: 1,
    student: INITIAL_STUDENTS[0],
    appliedAt: "2026-10-23T09:45:00",
    status: "APPLIED",
    currentRound: "Application Screening & Resume Match",
    interviewTime: "Awaiting OA shortlist release",
    notes: "Profile meets 8.5 CGPA criterion (Current CGPA: 8.85).",
    offerCtc: null
  }
];
