package com.grpc.service;

import com.grpc.config.JwtValidator;
import com.grpc.model.AuthException;
import com.ideaboard.service.UserService;
import io.grpc.stub.StreamObserver;
import jakarta.transaction.Transactional;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.lognet.springboot.grpc.GRpcService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import proto.auth.AuthResponse;
import proto.auth.AuthServiceGrpc;
import proto.auth.UserDTO;

import java.util.Optional;

@Slf4j
@GRpcService
public class AuthServiceImpl extends AuthServiceGrpc.AuthServiceImplBase {

    private final UserService userService;

    public AuthServiceImpl(UserService userService) {
        this.userService = userService;
    }

    @SneakyThrows
    @Override
    public void register(UserDTO request, StreamObserver<AuthResponse> responseObserver) {
        System.out.println("You are in the register method or the register service");
        String username = request.getUsername();
        String password = request.getPassword();

        String uid = userService.createUser(username, password);
        String jwt = JwtValidator.signJwt(uid);
        AuthResponse response = AuthResponse.newBuilder()
                .setUserId(uid)
                .setToken(jwt)
                .build();

        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }

    @SneakyThrows
    @Override
    public void login(UserDTO request, StreamObserver<AuthResponse> responseObserver) {
        System.out.println("You are in the login method or the login service");
        String username = request.getUsername();
        String password = request.getPassword();

        Optional<String> uid = userService.findUser(username, password);
        if (uid.isEmpty()) {
            throw new AuthException();
        }
        String jwt = JwtValidator.signJwt(uid.get());
        AuthResponse response = AuthResponse.newBuilder()
                .setUserId(uid.get())
                .setToken(jwt)
                .build();

        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }
}