package com.sih.authservice.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import jakarta.annotation.PostConstruct;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtProvider {

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration}")
    private Long jwtExpiration;

    private SecretKey signingKey;

    @PostConstruct
    public void init() {
        byte[] keyBytes = jwtSecret.getBytes(StandardCharsets.UTF_8);
        // HS512 needs a sufficiently long key; user must supply a strong secret in config
        this.signingKey = Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateToken(String email, String role) {
        return Jwts.builder()
                .setSubject(email)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpiration))
                .signWith(signingKey, SignatureAlgorithm.HS512)
                .compact();
    }

    public String generateToken(String email, String role, String firstName, String lastName) {
        return Jwts.builder()
                .setSubject(email)
                .claim("role", role)
                .claim("firstName", firstName)
                .claim("lastName", lastName)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpiration))
                .signWith(signingKey, SignatureAlgorithm.HS512)
                .compact();
    }

    public String generateToken(String email, String role, String firstName, String lastName, Long userId) {
        return Jwts.builder()
                .setSubject(email)
                .claim("role", role)
                .claim("firstName", firstName)
                .claim("lastName", lastName)
                .claim("userId", userId)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpiration))
                .signWith(signingKey, SignatureAlgorithm.HS512)
                .compact();
    }

    public Claims parseClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(signingKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
