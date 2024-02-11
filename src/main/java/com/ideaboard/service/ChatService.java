package com.ideaboard.service;

import com.ideaboard.model.entity.Chat;

import java.util.Optional;

public interface ChatService {
    Optional<Chat> createChat();

}
