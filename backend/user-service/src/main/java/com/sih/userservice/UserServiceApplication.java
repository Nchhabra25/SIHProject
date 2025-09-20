package com.sih.userservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.sih.userservice.repository.UserRepository;
import com.sih.userservice.entity.User;

@SpringBootApplication
public class UserServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(UserServiceApplication.class, args);
	}

    @Bean
    CommandLineRunner seedDefaultAdmin(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            String adminEmail = "admin@ecoquest.local";
            if (userRepository.findByEmail(adminEmail).isEmpty()) {
                User admin = new User();
                admin.setFirstName("Admin");
                admin.setLastName("User");
                admin.setEmail(adminEmail);
                admin.setUsername("admin");
                admin.setPassword(passwordEncoder.encode("admin123"));
                admin.setRole(User.Role.ADMIN);
                admin.setEnabled(true);
                userRepository.save(admin);
            }
        };
    }
}
