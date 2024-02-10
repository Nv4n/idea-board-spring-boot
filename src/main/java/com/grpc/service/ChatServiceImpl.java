package com.grpc.service;

import com.google.protobuf.Timestamp;
import io.grpc.stub.StreamObserver;
import org.lognet.springboot.grpc.GRpcService;
import proto.chat.Message;
import proto.chat.MessageRequest;
import proto.chat.MessageResponse;
import proto.chat.MessageServiceGrpc;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@GRpcService
public class ChatServiceImpl extends MessageServiceGrpc.MessageServiceImplBase {
    @Override
    public void getAllMessages(MessageRequest request, StreamObserver<MessageResponse> responseObserver) {
        System.out.println("You are in the chat method or the chat service");
        String chatRoom = request.getChatRoom();
        List<Message> messageList = new ArrayList<>();
        Date date = new Date();
        messageList.add(Message.newBuilder()
                .setSenderId("USER")
                .setMessageId("MSG")
                .setContent("TEST")
                .setCreatedAt(Timestamp.newBuilder()
                        .setNanos(date.toInstant().getNano())
                        .setSeconds(date.toInstant().getEpochSecond())
                        .build())
                .build());
        Integer messageCount = request.getRequestedChunkSize();
        MessageResponse response = MessageResponse.newBuilder()
                .addAllMessages(messageList)
                .build();

        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }
}
