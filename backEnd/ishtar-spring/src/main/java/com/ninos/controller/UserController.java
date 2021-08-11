package com.ninos.controller;

import com.ninos.dto.mail.RestaurantMail;
import com.ninos.dto.security.ActiveAccount;
import com.ninos.dto.security.LoginResponse;
import com.ninos.dto.security.NewPassword;
import com.ninos.dto.security.UserActive;
import com.ninos.model.security.Code;
import com.ninos.model.security.User;
import com.ninos.repository.AuthoritiesRepository;
import com.ninos.service.mail.MailService;
import com.ninos.service.security.AccountResponse;
import com.ninos.service.security.AuthoritiesService;
import com.ninos.service.security.UserService;
import com.ninos.springSecurity.jwt.JwtAuthenticationFilter;
import com.ninos.springSecurity.jwt.JwtLogin;
import com.ninos.util.UserCode;
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
    private MailService mailService;
    private UserCode userCode = new UserCode();

    @Autowired
    public UserController(JwtAuthenticationFilter jwtAuthenticationFilter, UserService userService, AuthoritiesRepository authoritiesRepository, PasswordEncoder passwordEncoder, AuthoritiesService authoritiesService, MailService mailService) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.userService = userService;
        this.authoritiesRepository = authoritiesRepository;
        this.passwordEncoder = passwordEncoder;
        this.authoritiesService = authoritiesService;
        this.mailService = mailService;
    }

    // http://localhost:8080/signin
    @PostMapping("/signin")
    public LoginResponse logIn(@RequestBody JwtLogin jwtLogin){
        return jwtAuthenticationFilter.login(jwtLogin);
    }


    // http://localhost:8080/signup
    @PostMapping("/signup")
    public AccountResponse createUser(@RequestBody JwtLogin jwtLogin){
        AccountResponse accountResponse = new AccountResponse();
        boolean result = userService.emailExists(jwtLogin.getEmail());
        if(result){
            accountResponse.setResult(0);    // email is exists in database
        }else{
            String myCode = userCode.getCode();
            User user = new User();
            user.setEmail(jwtLogin.getEmail());
            user.setPassword(passwordEncoder.encode(jwtLogin.getPassword()));
            user.setActive(0);
            user.getAuthorities().add(authoritiesService.getAllAuthorities().get(0));

            RestaurantMail restaurantMail = new RestaurantMail(jwtLogin.getEmail(), myCode);
            mailService.sendCodeByMail(restaurantMail);
            Code code = new Code();
            code.setCode(myCode);
            user.setCode(code);
            userService.addUser(user);
            accountResponse.setResult(1);  // email is not exists in database, therefore will create new account
        }
        return accountResponse;
    }




    //http://localhost:8080/active
    @PostMapping("/active")
    public UserActive getActiveUser(@RequestBody JwtLogin jwtLogin){
        String enPassword = userService.getPasswordByEmail(jwtLogin.getEmail());
        boolean result = passwordEncoder.matches(jwtLogin.getPassword(),enPassword);
        UserActive userActive = new UserActive();
        if(result){
            int act = userService.getUserActive(jwtLogin.getEmail());
            if(act == 0){   // mean it's not active
                String code = UserCode.getCode();
                RestaurantMail restaurantMail = new RestaurantMail(jwtLogin.getEmail(), code);
                mailService.sendCodeByMail(restaurantMail);
                User user = userService.getUserByMail(jwtLogin.getEmail());
                user.getCode().setCode(code);
                userService.editUser(user);
            }
            userActive.setActive(act);
        }else{
            userActive.setActive(-1); // -1 meaning the password that user entered is not correct
        }
        return userActive;
    }



    //http://localhost:8080/activated
    @PostMapping("/activated")
    public AccountResponse activeAccount(@RequestBody ActiveAccount activeAccount){
         User user = userService.getUserByMail(activeAccount.getEmail());
         AccountResponse accountResponse = new AccountResponse();
         if (user.getCode().getCode().equals(activeAccount.getCode())){
             user.setActive(1);
             userService.editUser(user);
              accountResponse.setResult(1);
         }else {
              accountResponse.setResult(0);
         }
         return  accountResponse;
    }


    //http://localhost:8080/check-email
    @PostMapping("/check-email")
    public AccountResponse resetPasswordEmail(@RequestBody LoginResponse loginResponse){
        AccountResponse accountResponse = new AccountResponse();
        User user = userService.getUserByMail(loginResponse.getEmail());
        if (user != null){
            String code = UserCode.getCode();
            RestaurantMail restaurantMail = new RestaurantMail(loginResponse.getEmail(), code);
            mailService.sendCodeByMail(restaurantMail);
            user.getCode().setCode(code);
            userService.editUser(user);
            accountResponse.setResult(1);
        }else{
            accountResponse.setResult(0);
        }
        return accountResponse;
    }


    @PostMapping("/resetPassword")
    public AccountResponse resetPassword(@RequestBody NewPassword newPassword){
        AccountResponse accountResponse = new AccountResponse();
        User user = userService.getUserByMail(newPassword.getEmail());
        if(user != null){
            if(user.getCode().getCode().equals(newPassword.getCode())){
                user.setPassword(passwordEncoder.encode(newPassword.getPassword()));
                userService.editUser(user);
                accountResponse.setResult(1);
            }else {
                accountResponse.setResult(0);
            }
        }else{
            accountResponse.setResult(0);
        }
          return accountResponse;
    }


}
