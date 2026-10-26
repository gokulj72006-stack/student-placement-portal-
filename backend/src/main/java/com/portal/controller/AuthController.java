package com.portal.controller;

import com.portal.dto.AuthRequest;
import com.portal.dto.AuthResponse;
import com.portal.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        AuthResponse response = authService.login(request);
        if (response.getToken() == null) {
            return ResponseEntity.status(401).body(response);
        }
        return ResponseEntity.ok(response);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<AuthResponse> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(authService.getUserById(id));
    }
}
