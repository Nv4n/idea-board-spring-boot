package com.ideaboard;

import com.corundumstudio.socketio.Configuration;
import com.corundumstudio.socketio.SocketIOServer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class IdeaBoardSpringBootApplication {

    public static void main(String[] args) throws Exception {
        SpringApplication.run(IdeaBoardSpringBootApplication.class, args);
    }
}
