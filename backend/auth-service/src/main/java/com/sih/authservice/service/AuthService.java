package com.sih.authservice.service;

import com.sih.authservice.feign.UserClient;
import com.sih.authservice.dto.LoginRequest;
import com.sih.authservice.dto.SignUpRequest;
import com.sih.authservice.dto.UserResponse;
import com.sih.authservice.security.JwtProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserClient userClient;
    private final JwtProvider jwtProvider;

    public String registerStudent(SignUpRequest request) {
        UserResponse user = userClient.createWithRole(request);
        // Issue token only for enabled users (students or admin-created)
        if (!user.isEnabled()) {
            throw new RuntimeException("PENDING_APPROVAL");
        }
        return jwtProvider.generateToken(user.getEmail(), user.getRole(), user.getFirstName(), user.getLastName(), user.getId());
    }

    public String login(LoginRequest request) {
        UserResponse user = userClient.validateUser(request.getEmail(), request.getPassword());

        // Allow login only if user is enabled, except seeding/admin rules handled by user-service
        if (!user.isEnabled()) {
            throw new RuntimeException("Account not yet approved by Admin");
        }

        return jwtProvider.generateToken(user.getEmail(), user.getRole(), user.getFirstName(), user.getLastName(), user.getId());
    }
}
