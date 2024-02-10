package com.ideaboard.service.impl;

import com.ideaboard.dao.MessageRepo;
import com.ideaboard.model.dto.MessageDto;
import com.ideaboard.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class MessageServiceImpl implements MessageService {

    private MessageRepo messageRepo;

    @Autowired
    public MessageServiceImpl(MessageRepo messageRepo) {
        this.messageRepo = messageRepo;
    }

    @Override
    public List<MessageDto> findAllMessagesByChat(UUID chatId) {
        return messageRepo.findAllByChatId(chatId).stream().map(msg -> {
            MessageDto messageDto = new MessageDto();
            messageDto.setId(msg.getId().toString());
            messageDto.setContent(msg.getContent());
            messageDto.setCreatedAt(msg.getCreatedAt());
            messageDto.setSenderId(msg.getSender().getId().toString());
            return messageDto;
        }).toList();
    }

    @Override
    public void createMessage(MessageDto messageDto) {

    }
}
