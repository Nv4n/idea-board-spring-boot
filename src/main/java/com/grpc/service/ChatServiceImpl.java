package com.grpc.service;

import com.google.protobuf.Timestamp;
import com.grpc.model.TimestampConverter;
import com.ideaboard.model.dto.MessageDto;
import com.ideaboard.service.ChatService;
import com.ideaboard.service.MessageService;
import io.grpc.stub.StreamObserver;
import lombok.extern.slf4j.Slf4j;
import org.lognet.springboot.grpc.GRpcService;
import org.springframework.stereotype.Service;
import proto.chat.ChatRequest;
import proto.chat.ChatResponse;
import proto.chat.ChatServiceGrpc;
import proto.chat.Message;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;


@Slf4j
@GRpcService
public class ChatServiceImpl extends ChatServiceGrpc.ChatServiceImplBase {
    MessageService messageService;

    public ChatServiceImpl(MessageService messageService) {
        this.messageService = messageService;
    }

    @Override
    public void getAllMessages(ChatRequest request, StreamObserver<ChatResponse> responseObserver) {
        System.out.println("You are in the chat method or the chat service");
        String chatRoom = request.getChatRoom();

        Date date = new Date();
        List<MessageDto> messageList = messageService.findAllMessagesByChat(UUID.fromString(chatRoom));

        List<Message> result = messageList.stream().map(msg -> {
            return Message.newBuilder()
                    .setMessageId(msg.getId())
                    .setSenderId(msg.getSenderId())
                    .setContent(msg.getContent())
                    .setCreatedAt(TimestampConverter.convertDateToTimestamp(msg.getCreatedAt()))
                    .build();
        }).toList();


        Integer messageCount = request.getRequestedChunkSize();
        ChatResponse response = ChatResponse.newBuilder()
                .addAllMessages(result)
                .build();

        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }


}