package com.spring.boot.ideaboard;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import proto.greet.Greet;
import proto.greet.GreetRequest;
import proto.greet.GreetResponse;

@SpringBootApplication
public class IdeaBoardSpringBootApplication {

    public static void main(String[] args) {
        SpringApplication.run(IdeaBoardSpringBootApplication.class, args);
    }

}
