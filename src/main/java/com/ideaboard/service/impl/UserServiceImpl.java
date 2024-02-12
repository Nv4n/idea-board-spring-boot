package com.ideaboard.service.impl;

import com.ideaboard.dao.UserRepo;
import com.ideaboard.model.dto.UserDto;
import com.ideaboard.model.entity.User;
import com.ideaboard.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    private UserRepo userRepo;

    @Autowired
    public UserServiceImpl(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    public void createUser(UserDto userDto) {

    }

    @Override
    public Optional<UserDto> findUser(UserDto userDto) {
        return Optional.empty();
    }

    public Optional<String> findUser(String username, String password) {
        Optional<User> user = userRepo.findUserByUsernameAndPassword(username, password);
        if (user.isEmpty()) {
            return Optional.empty();
        }
        return Optional.of(user.get().getId().toString());
    }
}
