package com.ideaboard.service;

import com.ideaboard.model.dto.MessageDto;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface MessageService {

    List<MessageDto> findAllMessagesByChat(UUID chatId);
    
    Optional<MessageDto> createMessage(String room, MessageDto messageDto);
}
