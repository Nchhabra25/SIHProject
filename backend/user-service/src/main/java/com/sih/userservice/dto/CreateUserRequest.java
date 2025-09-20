package com.sih.userservice.dto;

import lombok.Data;

@Data
public class CreateUserRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String password; // hashed by auth-service
    private String role; // validated by user-service
}
