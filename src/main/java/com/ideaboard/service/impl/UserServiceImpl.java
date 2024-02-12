package com.ideaboard.service.impl;

import com.ideaboard.dao.UserRepo;
import com.ideaboard.model.dto.UserDto;
import com.ideaboard.model.entity.User;
import com.ideaboard.service.UserService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {
    private UserRepo userRepo;

    @Autowired
    public UserServiceImpl(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    @Transactional
    public String createUser(String username, String password) {
        User user = new User();
        user.setUsername(username);
        user.setPassword(password);
        User createdEntity = userRepo.save(user);
        return createdEntity.getId().toString();
    }


    @Override
    public Optional<String> findUser(String username, String password) {
        Optional<User> user = userRepo.findUserByUsernameAndPassword(username, password);
        return user.map(value -> value.getId().toString());
    }

    @Override
    public Optional<User> findById(UUID uuid) {
        return userRepo.findById(uuid);
    }
}
