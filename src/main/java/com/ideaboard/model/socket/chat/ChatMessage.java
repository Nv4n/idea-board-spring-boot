package com.ideaboard.model.socket.chat;


import com.ideaboard.model.dto.MessageDto;
import lombok.Data;

@Data
public class ChatMessage {
    private ChatMessageType type;
    private MessageDto messageDto;
    private String room;

    public ChatMessage() {
    }

    public ChatMessage(ChatMessageType type, MessageDto messageDto) {
        this.type = type;
        this.messageDto = messageDto;
    }
}

