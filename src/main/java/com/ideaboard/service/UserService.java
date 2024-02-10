package com.ideaboard.service;

import com.ideaboard.model.dto.UserDto;

import java.util.Optional;

public interface UserService {
    void createUser(UserDto userDto);

    Optional<UserDto> findUser(UserDto userDto);
}
