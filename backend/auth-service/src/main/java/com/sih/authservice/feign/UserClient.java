package com.sih.authservice.feign;

import com.sih.authservice.dto.SignUpRequest;
import com.sih.authservice.dto.UserResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

@FeignClient(name = "user-service", url = "${user.service.url}")
public interface UserClient {

    @PostMapping("/users")
    UserResponse createWithRole(@RequestBody SignUpRequest request);

    @PostMapping("/users/validate")
    UserResponse validateUser(@RequestParam("email") String email,
                              @RequestParam("password") String password);
}
