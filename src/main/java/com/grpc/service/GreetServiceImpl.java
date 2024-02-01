package com.grpc.service;

import io.grpc.stub.StreamObserver;
import org.lognet.springboot.grpc.GRpcService;
import proto.greet.GreetRequest;
import proto.greet.GreetResponse;
import proto.greet.GreetServiceGrpc;
import proto.greet.Greeting;

@GRpcService
public class GreetServiceImpl extends GreetServiceGrpc.GreetServiceImplBase {

    @Override
    public void greet(GreetRequest request, StreamObserver<GreetResponse> responseObserver) {
        System.out.println("You are in the greet method or the greet service");
        Greeting greeting = request.getGreeting();
        String result = String.format("Hello %s %s", greeting.getFirstName(), greeting.getLastName());
        GreetResponse response = GreetResponse.newBuilder()
                .setResult(result)
                .build();

        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }
}
