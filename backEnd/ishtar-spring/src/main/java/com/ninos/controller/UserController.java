package com.ninos.controller;

import com.ninos.dto.security.LoginResponse;
import com.ninos.model.security.User;
import com.ninos.repository.AuthoritiesRepository;
import com.ninos.service.security.AuthoritiesService;
import com.ninos.service.security.UserService;
import com.ninos.springSecurity.jwt.JwtAuthenticationFilter;
import com.ninos.springSecurity.jwt.JwtLogin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    private JwtAuthenticationFilter jwtAuthenticationFilter;
    private UserService userService;
    private AuthoritiesRepository authoritiesRepository;
    private PasswordEncoder passwordEncoder;
    private AuthoritiesService authoritiesService;

    @Autowired
    public UserController(JwtAuthenticationFilter jwtAuthenticationFilter, UserService userService, AuthoritiesRepository authoritiesRepository, PasswordEncoder passwordEncoder, AuthoritiesService authoritiesService) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.userService = userService;
        this.authoritiesRepository = authoritiesRepository;
        this.passwordEncoder = passwordEncoder;
        this.authoritiesService = authoritiesService;
    }

    // http://localhost:8080/signin
    @PostMapping("/signin")
    public LoginResponse logIn(@RequestBody JwtLogin jwtLogin){
        return jwtAuthenticationFilter.login(jwtLogin);
    }


    // http://localhost:8080/signup
    @PostMapping("/signup")
    public void createUser(@RequestBody JwtLogin jwtLogin){
        User user = new User();
        user.setEmail(jwtLogin.getEmail());
        user.setPassword(passwordEncoder.encode(jwtLogin.getPassword()));
        user.setActive(1);
        user.getAuthorities().add(authoritiesService.getAllAuthorities().get(0));
        userService.addUser(user);
    }



}
