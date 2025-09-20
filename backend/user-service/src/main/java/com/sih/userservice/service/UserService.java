package com.sih.userservice.service;

import com.sih.userservice.dto.CreateUserRequest;
import com.sih.userservice.dto.UserResponse;
import com.sih.userservice.entity.User;
import com.sih.userservice.entity.User.Role;
import com.sih.userservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserResponse createStudent(CreateUserRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already in use");
        }
        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setUsername(request.getEmail().split("@")[0]);
        user.setRole(Role.STUDENT);
        user.setEnabled(true); // students via signup are enabled

        return mapToResponse(userRepository.save(user));
    }

    public UserResponse createByAdmin(CreateUserRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already in use");
        }
        // Admin can create any role, including STUDENT


        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setUsername(request.getEmail().split("@")[0]);
        user.setRole(Role.valueOf(request.getRole()));
        user.setEnabled(true); // admin-created accounts are enabled

        return mapToResponse(userRepository.save(user));
    }

    public UserResponse createWithRole(CreateUserRequest request) {
        String roleStr = request.getRole();
        if (roleStr == null) {
            throw new IllegalArgumentException("Role is required");
        }
        String normalized = roleStr.trim().toUpperCase(); // accepts Student/Teacher/Ambassador
        if (normalized.equals("STUDENT")) {
            return createStudent(request);
        }
        // Signup flow for non-students (TEACHER, AMBASSADOR): enabled=false
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already in use");
        }
        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setUsername(request.getEmail().split("@")[0]);
        user.setRole(Role.valueOf(normalized));
        user.setEnabled(false);
        return mapToResponse(userRepository.save(user));
    }

    public UserResponse enableUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setEnabled(true);
        return mapToResponse(userRepository.save(user));
    }

    public UserResponse validateUser(String email, String rawPassword) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(rawPassword, user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        return mapToResponse(user);
    }

    public UserResponse getByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return mapToResponse(user);
    }

    private UserResponse mapToResponse(User user) {
        UserResponse res = new UserResponse();
        res.setId(user.getId());
        res.setEmail(user.getEmail());
        res.setUsername(user.getUsername());
        res.setFirstName(user.getFirstName());
        res.setLastName(user.getLastName());
        res.setRole(user.getRole());
        res.setEnabled(user.isEnabled());
        return res;
    }
}
