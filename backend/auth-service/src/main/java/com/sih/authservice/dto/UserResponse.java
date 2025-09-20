package com.sih.authservice.dto;

import lombok.Data;

@Data
public class UserResponse {
    private Long id;
    private String email;
    private String username;
    private String firstName;
    private String lastName;
    private String role;
    private boolean enabled;
}
