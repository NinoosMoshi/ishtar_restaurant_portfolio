package com.ninos.dto.security;
import lombok.AllArgsConstructor;
import lombok.Data;
@Data
@AllArgsConstructor
public class LoginResponse {
    private String email;
    private String token;
}
