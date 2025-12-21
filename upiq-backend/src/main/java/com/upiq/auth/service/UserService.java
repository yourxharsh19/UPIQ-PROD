package com.upiq.auth.service;

import com.upiq.auth.model.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import java.util.Optional;
import java.util.List;

public interface UserService extends UserDetailsService {
    User saveUser(User user);

    Optional<User> getUserByEmail(String email);

    Optional<User> getUserByUsername(String username);

    List<User> getAllUsers();
}
