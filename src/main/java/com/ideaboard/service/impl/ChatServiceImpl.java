package com.ideaboard.service.impl;

import com.ideaboard.dao.ChatRepo;
import com.ideaboard.model.entity.Chat;
import com.ideaboard.model.entity.IdeaBoard;
import com.ideaboard.service.ChatService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class ChatServiceImpl implements ChatService {
    ChatRepo chatRepo;

    @Autowired
    public ChatServiceImpl(ChatRepo chatRepo) {
        this.chatRepo = chatRepo;
    }

    @Transactional
    @Override
    public Chat createChat(IdeaBoard board) {
        Chat chat = new Chat();
        chat.setBoard(board);
        return chatRepo.save(chat);
    }


    @Override
    public Optional<Chat> findById(UUID uuid) {
        return chatRepo.findById(uuid);
    }
}
