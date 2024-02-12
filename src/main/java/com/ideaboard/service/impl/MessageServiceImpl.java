package com.ideaboard.service.impl;

import com.ideaboard.dao.ChatRepo;
import com.ideaboard.dao.MessageRepo;
import com.ideaboard.dao.UserRepo;
import com.ideaboard.model.dto.MessageDto;
import com.ideaboard.model.entity.Chat;
import com.ideaboard.model.entity.Message;
import com.ideaboard.model.entity.User;
import com.ideaboard.service.ChatService;
import com.ideaboard.service.MessageService;
import com.ideaboard.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class MessageServiceImpl implements MessageService {

    private MessageRepo messageRepo;
    private ChatService chatService;
    private UserService userService;

    @Autowired
    public MessageServiceImpl(MessageRepo messageRepo, ChatRepo chatRepo, ChatService chatService, UserService userService) {
        this.messageRepo = messageRepo;
        this.chatService = chatService;
        this.userService = userService;
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
    public Optional<MessageDto> createMessage(String room, MessageDto messageDto) {

        Optional<Chat> chat = chatService.findById(UUID.fromString(room));
        if (chat.isEmpty()) {
            return Optional.empty();
        }
        Optional<User> user = userService.findById(UUID.fromString(messageDto.getSenderId()));
        if (user.isEmpty()) {
            return Optional.empty();
        }

        Message messageEntity = new Message();
        messageEntity.setChat(chat.get());
        messageEntity.setSender(user.get());
        messageEntity.setContent(messageDto.getContent());
        messageEntity.setCreatedAt(messageDto.getCreatedAt());

        Message createdEntity = messageRepo.save(messageEntity);
        MessageDto returnMessageDto = new MessageDto();
        returnMessageDto.setContent(createdEntity.getContent());
        returnMessageDto.setCreatedAt(createdEntity.getCreatedAt());
        returnMessageDto.setId(createdEntity.getId().toString());
        returnMessageDto.setSenderId(user.get().getId().toString());
        return Optional.of(returnMessageDto);
    }
}
