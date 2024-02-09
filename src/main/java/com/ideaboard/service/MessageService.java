package com.ideaboard.service;

import com.ideaboard.dto.MessageDto;
import com.ideaboard.model.Message;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

public interface MessageService {
    List<MessageDto> findAllMessagesByChat(UUID chatId);
//    void createMessage()
}
