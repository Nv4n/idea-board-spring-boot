package com.grpc.config;

import io.grpc.Metadata;
import io.grpc.ServerCall;
import io.grpc.ServerCallHandler;
import io.grpc.ServerInterceptor;
import org.springframework.stereotype.Component;

@Component
public class AuthorizationInterceptor implements ServerInterceptor {
    private final String RSA_PUBLIC_KEY = System.getenv("PUBLIC_JWT_KEY");


    private final String RSA_PRIVATE_KEY = System.getenv("PRIVATE_JWT_KEY");

    @Override
    public <ReqT, RespT> ServerCall.Listener<ReqT> interceptCall(ServerCall<ReqT, RespT> call, Metadata headers, ServerCallHandler<ReqT, RespT> next) {

        return null;
    }
}
