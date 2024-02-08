package com.ideaboard;

import com.corundumstudio.socketio.Configuration;
import com.corundumstudio.socketio.SocketIOServer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class IdeaBoardSpringBootApplication {
    @Value("${ws-server.host}")
    private String host;

    @Value("${ws-server.port}")
    private Integer port;

    @Bean
    public SocketIOServer socketIOServer() {
        Configuration config = new Configuration();
        config.setHostname("localhost");
        config.setPort(9092);
        final SocketIOServer server = new SocketIOServer(config);
        server.start();
        return server;
    }

    public static void main(String[] args) throws Exception {
        SpringApplication.run(IdeaBoardSpringBootApplication.class, args);
        Configuration config = new Configuration();
        config.setHostname("localhost");
        config.setPort(9092);
        final SocketIOServer server = new SocketIOServer(config);
        server.start();
    }
}
