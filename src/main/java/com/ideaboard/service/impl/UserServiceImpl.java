package com.ideaboard.service.impl;

import com.ideaboard.model.dto.UserDto;
import com.ideaboard.service.UserService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    @Override
    public void createUser(UserDto userDto) {

    }

    @Override
    public Optional<UserDto> findUser(UserDto userDto) {
        return Optional.empty();
    }
}
