package com.sih.authservice.controller;

import com.sih.authservice.dto.LoginRequest;
import com.sih.authservice.dto.SignUpRequest;
import com.sih.authservice.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup")
    public String signup(@RequestBody SignUpRequest request) {
        return authService.registerStudent(request);
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }
}
