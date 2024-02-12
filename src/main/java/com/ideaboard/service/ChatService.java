package com.ideaboard.service;

import com.ideaboard.model.entity.Chat;
import com.ideaboard.model.entity.IdeaBoard;
import jakarta.transaction.Transactional;

import java.util.Optional;
import java.util.UUID;

public interface ChatService {
    Chat createChat(IdeaBoard ideaBoard);


    Optional<Chat> findById(UUID uuid);
}
