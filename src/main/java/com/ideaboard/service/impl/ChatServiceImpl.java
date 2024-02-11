package com.ideaboard.service.impl;

import com.ideaboard.model.entity.Chat;
import com.ideaboard.service.ChatService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ChatServiceImpl implements ChatService {
    @Override
    public Optional<Chat> createChat() {

        return Optional.empty();
    }
}
