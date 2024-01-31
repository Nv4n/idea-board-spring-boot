package com.ideaboard;

import com.grpc.server.ServerImpl;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class IdeaBoardSpringBootApplication {

    public static void main(String[] args) throws Exception {
        SpringApplication.run(IdeaBoardSpringBootApplication.class, args);
        ServerImpl.main(args);
    }

}
