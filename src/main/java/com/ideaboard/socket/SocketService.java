package com.ideaboard.socket;


import com.corundumstudio.socketio.SocketIOClient;
import com.ideaboard.model.dto.MessageDto;
import com.ideaboard.model.socket.chat.ChatError;
import com.ideaboard.model.socket.chat.ChatMessage;
import com.ideaboard.model.socket.chat.ChatMessageType;
import com.ideaboard.service.MessageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
public class SocketService {

    MessageService messageService;

    @Autowired
    public SocketService(MessageService messageService) {
        this.messageService = messageService;
    }

    public void sendMessage(String room, String eventName, SocketIOClient senderClient, MessageDto messageDto) {
        for (
                SocketIOClient client : senderClient.getNamespace().getRoomOperations(room).getClients()) {
            if (client.getSessionId().equals(senderClient.getSessionId())) {
                log.info("EVENT: {}, MSG: {}", eventName, messageDto);
                Optional<MessageDto> createdMessage = messageService.createMessage(room, messageDto);
                if (createdMessage.isEmpty()) {
                    client.sendEvent("error_chat", new ChatError(ChatMessageType.SERVER, "Couldn't send message"));
                    continue;
                }

                client.sendEvent(eventName,
                        new ChatMessage(ChatMessageType.SERVER, messageDto));
            }
        }
    }

}