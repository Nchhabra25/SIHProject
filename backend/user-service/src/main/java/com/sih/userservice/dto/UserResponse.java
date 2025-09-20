package com.sih.userservice.dto;

import com.sih.userservice.entity.User.Role;
import lombok.Data;

@Data
public class UserResponse {
    private Long id;
    private String email;
    private String username;
    private String firstName;
    private String lastName;
    private Role role;
    private boolean enabled;
}
