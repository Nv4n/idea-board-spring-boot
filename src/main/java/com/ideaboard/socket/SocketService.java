package com.ideaboard.socket;


import com.corundumstudio.socketio.SocketIOClient;
import com.ideaboard.model.dto.MessageDto;
import com.ideaboard.model.socket.chat.ChatMessage;
import com.ideaboard.model.socket.chat.ChatMessageType;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class SocketService {

    public void sendMessage(String room, String eventName, SocketIOClient senderClient, MessageDto messageDto) {
        for (
                SocketIOClient client : senderClient.getNamespace().getRoomOperations(room).getClients()) {
            if (client.getSessionId().equals(senderClient.getSessionId())) {
                log.info("EVENT: {}, MSG: {}", eventName, messageDto);
                client.sendEvent(eventName,
                        new ChatMessage(ChatMessageType.SERVER, messageDto));
            }
        }
    }

}