package com.sih.userservice.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "users", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"email"})
})
@Data
public class User {

    public enum Role {
        STUDENT, TEACHER, AMBASSADOR, ADMIN
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String username; // extracted from email

    @Enumerated(EnumType.STRING)
    private Role role;

    private boolean enabled = true; // for approval logic

    // getters and setters
}
