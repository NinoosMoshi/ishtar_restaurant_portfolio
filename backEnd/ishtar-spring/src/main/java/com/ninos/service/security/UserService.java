package com.ninos.service.security;

import com.ninos.dto.security.UserPrincipal;
import com.ninos.model.security.User;
import com.ninos.repository.AuthoritiesRepository;
import com.ninos.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService implements UserDetailsService {

    private UserRepository userRepository;


    @Autowired
    public UserService(UserRepository userRepository, AuthoritiesRepository authoritiesRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findUserByEmail(email);
        UserPrincipal userPrincipal = new UserPrincipal(user);
        return userPrincipal;
    }


    @Transactional
    public void addUser(User user){
        userRepository.save(user);
    }


    public boolean emailExists(String email){
        return userRepository.existsByEmail(email);
    }



}
