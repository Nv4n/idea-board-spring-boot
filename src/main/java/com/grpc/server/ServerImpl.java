package com.grpc.server;

import com.grpc.service.GreetServiceImpl;
import io.grpc.Server;
import io.grpc.ServerBuilder;

public class ServerImpl {
    public static void main(String[] args) throws Exception {
        final int PORT = 9090;

        Server server = ServerBuilder.forPort(PORT)
                .addService(new GreetServiceImpl())
                .build();

        server.start();
        System.out.println("Server started...");
        server.awaitTermination();
    }
}
