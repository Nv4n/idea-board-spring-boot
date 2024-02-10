package com.ideaboard.model.socket.chat;


import lombok.Data;

@Data
public class ChatError {
    private ChatMessageType type;
    private String error;
    private String room;

    public ChatError() {
    }

    public ChatError(ChatMessageType type, String error) {
        this.type = type;
        this.error = error;
    }
}

