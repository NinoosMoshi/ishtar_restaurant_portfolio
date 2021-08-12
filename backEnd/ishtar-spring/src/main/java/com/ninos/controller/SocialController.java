package com.ninos.controller;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;

import com.ninos.dto.security.LoginResponse;
import com.ninos.dto.security.TokenDto;
import com.ninos.model.security.Authorities;
import com.ninos.service.security.AuthoritiesService;
import com.ninos.service.security.UserService;
import com.ninos.springSecurity.jwt.JwtAuthenticationFilter;
import com.ninos.springSecurity.jwt.JwtLogin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.social.facebook.api.Facebook;
import org.springframework.social.facebook.api.User;
import org.springframework.social.facebook.api.impl.FacebookTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.Collections;
import java.util.List;


@RestController
@RequestMapping("/social")
public class SocialController {

    @Value("google.id")
    private String idClient;

    @Value("mySecret.password")
    private String privatePassword;

    private UserService userService;
    private AuthoritiesService authoritiesService;
    private JwtAuthenticationFilter jwtAuthenticationFilter;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public SocialController(UserService userService, AuthoritiesService authoritiesService, JwtAuthenticationFilter jwtAuthenticationFilter, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.authoritiesService = authoritiesService;
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.passwordEncoder = passwordEncoder;
    }

    //http://localhost:8080/social/google
    @PostMapping("/google")
    public LoginResponse loginWithGoogle(@RequestBody TokenDto tokenDto) throws IOException {
        NetHttpTransport transport = new NetHttpTransport();
        JacksonFactory factory = JacksonFactory.getDefaultInstance();
        GoogleIdTokenVerifier.Builder ver =
                new GoogleIdTokenVerifier.Builder(transport,factory)
                        .setAudience(Collections.singleton(idClient));
        GoogleIdToken googleIdToken = GoogleIdToken.parse(ver.getJsonFactory(),tokenDto.getToken());
        GoogleIdToken.Payload payload = googleIdToken.getPayload();

        boolean result = userService.emailExists(payload.getEmail());
        LoginResponse loginResponse;
        if (!result){
            com.ninos.model.security.User user = new com.ninos.model.security.User();
            user.setEmail(payload.getEmail());
            user.setPassword(passwordEncoder.encode(privatePassword));
            user.setActive(1);
            List<Authorities> authorities = authoritiesService.getAllAuthorities();
            user.getAuthorities().add(authorities.get(0));
            userService.addUser(user);
        }

        JwtLogin jwtLogin = new JwtLogin();
        jwtLogin.setEmail(payload.getEmail());
        jwtLogin.setPassword(privatePassword);
        loginResponse = jwtAuthenticationFilter.login(jwtLogin);
        return loginResponse;
    }



    //http://localhost:8080/social/facebook
    @PostMapping("/facebook")
    public ResponseEntity<?> loginWithFacebook(@RequestBody TokenDto tokenDto){
        Facebook facebook = new FacebookTemplate(tokenDto.getToken());
        String [] data = {"email","name","picture"};
        User user = facebook.fetchObject("me",User.class,data);
        return new ResponseEntity<>(user,HttpStatus.OK);
    }

}
