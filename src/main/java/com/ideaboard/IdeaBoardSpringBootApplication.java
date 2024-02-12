package com.ideaboard;

import com.grpc.service.AuthServiceImpl;
import com.grpc.service.BoardServiceImpl;
import com.grpc.service.ChatServiceImpl;
import com.ideaboard.service.IdeaBoardService;
import com.ideaboard.service.MessageService;
import com.ideaboard.service.NoteService;
import com.ideaboard.service.UserService;
import io.grpc.Server;
import io.grpc.ServerBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class IdeaBoardSpringBootApplication {
    private static UserService userService;
    private static IdeaBoardService ideaBoardService;
    private static MessageService messageService;
    private static NoteService noteService;

    @Autowired
    public IdeaBoardSpringBootApplication(NoteService noteService, UserService userService, IdeaBoardService ideaBoardService, MessageService messageService) {
        IdeaBoardSpringBootApplication.userService = userService;
        IdeaBoardSpringBootApplication.ideaBoardService = ideaBoardService;
        IdeaBoardSpringBootApplication.messageService = messageService;
        IdeaBoardSpringBootApplication.noteService = noteService;
    }

    public static void main(String[] args) throws Exception {
        SpringApplication.run(IdeaBoardSpringBootApplication.class, args);
        final int PORT = 9090;

        // Create a new server to listen on port 9090
        Server server = ServerBuilder.forPort(PORT)
                .addService(new ChatServiceImpl(messageService))
                .addService(new AuthServiceImpl(userService))
                .addService(new BoardServiceImpl(ideaBoardService, noteService))
                .build();

        // Start the server
        server.start();

        // Server threads are running in the background.
        System.out.println("Server started...");
        // Don't exit the main thread. Wait until server is terminated.
        server.awaitTermination();
    }
}
