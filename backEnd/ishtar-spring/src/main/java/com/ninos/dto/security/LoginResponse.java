package com.ninos.dto.security;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponse {
    private String email;
    private String token;


    public LoginResponse(String email) {
        this.email = email;
    }
}
