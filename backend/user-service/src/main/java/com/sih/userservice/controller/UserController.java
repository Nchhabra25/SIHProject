package com.sih.userservice.controller;

import com.sih.userservice.dto.CreateUserRequest;
import com.sih.userservice.dto.UserResponse;
import com.sih.userservice.service.UserService;
import com.sih.userservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;

    @PostMapping("/student")
    public UserResponse registerStudent(@RequestBody CreateUserRequest request) {
        return userService.createStudent(request);
    }

    @PostMapping("/admin")
    public UserResponse createByAdmin(@RequestBody CreateUserRequest request) {
        return userService.createByAdmin(request);
    }

    @PostMapping
    public UserResponse createWithRole(@RequestBody CreateUserRequest request) {
        return userService.createWithRole(request);
    }

    @PutMapping("/{id}/enable")
    public UserResponse enableUser(@PathVariable Long id) {
        return userService.enableUser(id);
    }

    @PostMapping("/validate")
    public UserResponse validateUser(@RequestParam String email,
                                     @RequestParam String password) {
        return userService.validateUser(email, password);
    }

    @GetMapping
    public UserResponse getByEmail(@RequestParam String email) {
        return userService.getByEmail(email);
    }

    @GetMapping("/pending")
    public java.util.List<UserResponse> listPending() {
        return userRepository.findAllPending().stream().map(u -> {
            UserResponse r = new UserResponse();
            r.setId(u.getId());
            r.setEmail(u.getEmail());
            r.setUsername(u.getUsername());
            r.setFirstName(u.getFirstName());
            r.setLastName(u.getLastName());
            r.setRole(u.getRole());
            r.setEnabled(u.isEnabled());
            return r;
        }).toList();
    }

    @PutMapping("/{id}/approve")
    public UserResponse approve(@PathVariable Long id) {
        return userService.enableUser(id);
    }

    @DeleteMapping("/{id}")
    public void reject(@PathVariable Long id) {
        userRepository.deleteById(id);
    }
}
