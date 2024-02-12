package com.ideaboard.service;

import com.ideaboard.model.entity.User;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public interface UserService {

    String createUser(String username, String password);


    Optional<String> findUser(@Param("username") String username, @Param("password") String password);

    Optional<User> findById(UUID uuid);
}
