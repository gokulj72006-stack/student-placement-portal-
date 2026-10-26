import { 
  INITIAL_STUDENTS, 
  INITIAL_COURSES, 
  INITIAL_ENROLLMENTS, 
  INITIAL_DRIVES, 
  INITIAL_APPLICATIONS, 
  INITIAL_COMPANIES 
} from './mockData';

const BASE_URL = 'http://localhost:8080/api';

// Helper to check if backend is online
let isBackendLive = false;

export const checkBackendHealth = async () => {
  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 1200);
    const res = await fetch(`${BASE_URL}/courses`, { signal: controller.signal });
    clearTimeout(id);
    isBackendLive = res.ok;
    return isBackendLive;
  } catch (e) {
    isBackendLive = false;
    return false;
  }
};

// Local storage persistent fallback state
const getStored = (key, fallback) => {
  const val = localStorage.getItem(`nexportal_${key}`);
  if (val) {
    try { return JSON.parse(val); } catch (e) {}
  }
  return fallback;
};

const setStored = (key, data) => {
  localStorage.setItem(`nexportal_${key}`, JSON.stringify(data));
};

// Initialize fallback state if not set
if (!localStorage.getItem('nexportal_courses')) setStored('courses', INITIAL_COURSES);
if (!localStorage.getItem('nexportal_enrollments')) setStored('enrollments', INITIAL_ENROLLMENTS);
if (!localStorage.getItem('nexportal_drives')) setStored('drives', INITIAL_DRIVES);
if (!localStorage.getItem('nexportal_applications')) setStored('applications', INITIAL_APPLICATIONS);
if (!localStorage.getItem('nexportal_students')) setStored('students', INITIAL_STUDENTS);

export const api = {
  // Course APIs
  async getCourses() {
    try {
      const res = await fetch(`${BASE_URL}/courses`);
      if (res.ok) return await res.json();
    } catch (e) {}
    return getStored('courses', INITIAL_COURSES);
  },

  async enrollCourse(studentId, courseId) {
    try {
      const res = await fetch(`${BASE_URL}/enrollments/enroll`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, courseId })
      });
      if (res.ok) return await res.json();
    } catch (e) {}

    // Fallback local logic
    const enrollments = getStored('enrollments', INITIAL_ENROLLMENTS);
    const courses = getStored('courses', INITIAL_COURSES);
    
    if (enrollments.some(e => e.studentId === studentId && e.courseId === courseId)) {
      throw new Error("Student is already registered in this course");
    }

    const courseIndex = courses.findIndex(c => c.id === courseId);
    if (courseIndex !== -1) {
      courses[courseIndex].enrolledCount += 1;
      setStored('courses', courses);
    }

    const newEnrollment = {
      id: Date.now(),
      studentId,
      courseId,
      enrolledAt: new Date().toISOString(),
      status: "ENROLLED",
      attendancePct: 100.0,
      grade: "In-Progress"
    };

    enrollments.push(newEnrollment);
    setStored('enrollments', enrollments);
    return newEnrollment;
  },

  async dropCourse(studentId, courseId) {
    try {
      const res = await fetch(`${BASE_URL}/enrollments/drop?studentId=${studentId}&courseId=${courseId}`, {
        method: 'DELETE'
      });
      if (res.ok) return true;
    } catch (e) {}

    const enrollments = getStored('enrollments', INITIAL_ENROLLMENTS);
    const filtered = enrollments.filter(e => !(e.studentId === studentId && e.courseId === courseId));
    setStored('enrollments', filtered);

    const courses = getStored('courses', INITIAL_COURSES);
    const courseIndex = courses.findIndex(c => c.id === courseId);
    if (courseIndex !== -1 && courses[courseIndex].enrolledCount > 0) {
      courses[courseIndex].enrolledCount -= 1;
      setStored('courses', courses);
    }
    return true;
  },

  async getStudentEnrollments(studentId) {
    try {
      const res = await fetch(`${BASE_URL}/enrollments/student/${studentId}`);
      if (res.ok) return await res.json();
    } catch (e) {}
    const enrollments = getStored('enrollments', INITIAL_ENROLLMENTS);
    return enrollments.filter(e => e.studentId === studentId);
  },

  // Placement Drive APIs
  async getDrives() {
    try {
      const res = await fetch(`${BASE_URL}/drives`);
      if (res.ok) return await res.json();
    } catch (e) {}
    return getStored('drives', INITIAL_DRIVES);
  },

  async createDrive(driveData) {
    try {
      const res = await fetch(`${BASE_URL}/drives`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(driveData)
      });
      if (res.ok) return await res.json();
    } catch (e) {}

    const drives = getStored('drives', INITIAL_DRIVES);
    const newDrive = {
      id: Date.now(),
      ...driveData,
      company: INITIAL_COMPANIES.find(c => c.id === Number(driveData.companyId)) || {
        name: driveData.companyName || "Partner Tech",
        tier: "TIER_1_DREAM",
        location: driveData.jobLocation
      },
      status: "OPEN"
    };
    drives.unshift(newDrive);
    setStored('drives', drives);
    return newDrive;
  },

  // Application APIs
  async getStudentApplications(studentId) {
    try {
      const res = await fetch(`${BASE_URL}/applications/student/${studentId}`);
      if (res.ok) return await res.json();
    } catch (e) {}
    const apps = getStored('applications', INITIAL_APPLICATIONS);
    return apps.filter(a => a.studentId === studentId);
  },

  async getAllApplications() {
    try {
      const res = await fetch(`${BASE_URL}/applications`);
      if (res.ok) return await res.json();
    } catch (e) {}
    return getStored('applications', INITIAL_APPLICATIONS);
  },

  async applyForDrive(studentId, driveId, notes) {
    try {
      const res = await fetch(`${BASE_URL}/applications/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, driveId, notes })
      });
      if (res.ok) return await res.json();
    } catch (e) {}

    const apps = getStored('applications', INITIAL_APPLICATIONS);
    if (apps.some(a => a.studentId === studentId && a.driveId === driveId)) {
      throw new Error("You have already applied for this placement drive.");
    }

    const drives = getStored('drives', INITIAL_DRIVES);
    const drive = drives.find(d => d.id === driveId);
    const students = getStored('students', INITIAL_STUDENTS);
    const student = students.find(s => s.id === studentId);

    const newApp = {
      id: Date.now(),
      driveId,
      drive,
      studentId,
      student,
      appliedAt: new Date().toISOString(),
      status: "APPLIED",
      currentRound: "Application Submitted & Screening",
      interviewTime: "Awaiting Schedule",
      notes: notes || "Applied with primary profile",
      offerCtc: null
    };

    apps.unshift(newApp);
    setStored('applications', apps);
    return newApp;
  },

  async updateApplicationStatus(appId, updateData) {
    try {
      const res = await fetch(`${BASE_URL}/applications/${appId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData)
      });
      if (res.ok) return await res.json();
    } catch (e) {}

    const apps = getStored('applications', INITIAL_APPLICATIONS);
    const idx = apps.findIndex(a => a.id === appId);
    if (idx !== -1) {
      apps[idx] = { ...apps[idx], ...updateData };
      setStored('applications', apps);
      return apps[idx];
    }
    throw new Error("Application not found");
  },

  // Student Profile APIs
  async getStudentProfile(id) {
    try {
      const res = await fetch(`${BASE_URL}/students/${id}`);
      if (res.ok) return await res.json();
    } catch (e) {}
    const students = getStored('students', INITIAL_STUDENTS);
    return students.find(s => s.id === id) || INITIAL_STUDENTS[0];
  },

  async updateStudentProfile(id, profileData) {
    try {
      const res = await fetch(`${BASE_URL}/students/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData)
      });
      if (res.ok) return await res.json();
    } catch (e) {}

    const students = getStored('students', INITIAL_STUDENTS);
    const idx = students.findIndex(s => s.id === id);
    if (idx !== -1) {
      students[idx] = { ...students[idx], ...profileData };
      setStored('students', students);
      return students[idx];
    }
    return profileData;
  },

  // Analytics API
  async getDashboardStats() {
    try {
      const res = await fetch(`${BASE_URL}/analytics/dashboard`);
      if (res.ok) return await res.json();
    } catch (e) {}

    return {
      totalStudents: 420,
      totalCourses: 6,
      totalDrives: 5,
      totalApplications: 148,
      offersExtended: 368,
      highestCtcLpa: 42.0,
      averageCtcLpa: 16.8,
      placementRatePct: 88.4,
      departmentPlacements: {
        "Computer Science": 142,
        "Information Technology": 98,
        "Electronics & Comm": 84,
        "Data Science & AI": 46
      },
      tierDistribution: {
        "Super Dream (> ₹25 LPA)": 34,
        "Tier-1 Dream (₹15-25 LPA)": 112,
        "Regular (₹6-14 LPA)": 222
      }
    };
  }
};
