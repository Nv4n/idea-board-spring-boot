package com.grpc.service;

import com.ideaboard.service.UserService;
import io.grpc.stub.StreamObserver;
import org.lognet.springboot.grpc.GRpcService;
import org.springframework.beans.factory.annotation.Autowired;
import proto.auth.AuthResponse;
import proto.auth.AuthServiceGrpc;
import proto.auth.UserDTO;


@GRpcService
public class AuthServiceImpl extends AuthServiceGrpc.AuthServiceImplBase {
    @Autowired
    private UserService userService;

    @Override
    public void register(UserDTO request, StreamObserver<AuthResponse> responseObserver) {
        System.out.println("You are in the register method or the register service");
        String username = request.getUsername();
        String password = request.getPassword();

        AuthResponse response = AuthResponse.newBuilder()
                .setToken("test-token")
                .build();

        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }

    @Override
    public void login(UserDTO request, StreamObserver<AuthResponse> responseObserver) {
        System.out.println("You are in the login method or the login service");
        String username = request.getUsername();
        String password = request.getPassword();

        AuthResponse response = AuthResponse.newBuilder()
                .setToken("test-token")
                .build();

        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }
}
