package com.ideaboard.service;

import com.ideaboard.model.dto.MessageDto;

import java.util.List;
import java.util.UUID;

public interface MessageService {

    List<MessageDto> findAllMessagesByChat(UUID chatId);

    void createMessage(MessageDto messageDto);
}
