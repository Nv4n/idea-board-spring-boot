package com.ideaboard.model.socket.chat;


import lombok.Data;

@Data
public class ChatMessage {
    private ChatMessageType type;
    private String message;
    private String room;

    public ChatMessage() {
    }

    public ChatMessage(ChatMessageType type, String message) {
        this.type = type;
        this.message = message;
    }
}

