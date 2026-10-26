package com.portal.dto;

import com.portal.entity.StudentProfile;
import com.portal.entity.User;

public class AuthResponse {
    private String token;
    private User user;
    private StudentProfile studentProfile;
    private String message;

    public AuthResponse() {}
    public AuthResponse(String token, User user, StudentProfile studentProfile, String message) {
        this.token = token;
        this.user = user;
        this.studentProfile = studentProfile;
        this.message = message;
    }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public StudentProfile getStudentProfile() { return studentProfile; }
    public void setStudentProfile(StudentProfile studentProfile) { this.studentProfile = studentProfile; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}
