package com.portal.service;

import com.portal.dto.AuthRequest;
import com.portal.dto.AuthResponse;
import com.portal.entity.StudentProfile;
import com.portal.entity.User;
import com.portal.repository.StudentProfileRepository;
import com.portal.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired private UserRepository userRepository;
    @Autowired private StudentProfileRepository studentProfileRepository;

    public AuthResponse login(AuthRequest request) {
        Optional<User> userOpt = userRepository.findByUsername(request.getUsername());
        if (userOpt.isEmpty()) {
            return new AuthResponse(null, null, null, "Invalid username or password");
        }
        User user = userOpt.get();
        if (!user.getPassword().equals(request.getPassword())) {
            return new AuthResponse(null, null, null, "Invalid username or password");
        }

        StudentProfile profile = studentProfileRepository.findByUser(user).orElse(null);
        String mockJwt = "token_jwt_" + user.getUsername() + "_" + System.currentTimeMillis();

        return new AuthResponse(mockJwt, user, profile, "Login successful");
    }

    public AuthResponse getUserById(Long id) {
        Optional<User> userOpt = userRepository.findById(id);
        if (userOpt.isEmpty()) return new AuthResponse(null, null, null, "User not found");
        User user = userOpt.get();
        StudentProfile profile = studentProfileRepository.findByUser(user).orElse(null);
        return new AuthResponse("token_active", user, profile, "User found");
    }
}
