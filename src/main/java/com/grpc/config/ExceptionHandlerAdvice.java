package com.grpc.config;

import com.grpc.model.AuthException;
import io.grpc.Metadata;
import io.grpc.Status;
import org.lognet.springboot.grpc.recovery.GRpcExceptionHandler;
import org.lognet.springboot.grpc.recovery.GRpcExceptionScope;
import org.lognet.springboot.grpc.recovery.GRpcServiceAdvice;

import java.util.Optional;

@GRpcServiceAdvice
public class ExceptionHandlerAdvice {
    @GRpcExceptionHandler
    public Status handle(AuthException exc, GRpcExceptionScope scope) {
        Optional<String> hint = scope.getHintAs(String.class);
        scope.getResponseHeaders().put(
                Metadata.Key.of("AuthError", Metadata.ASCII_STRING_MARSHALLER),
                hint.orElseGet(() -> "401"));
        return Status.UNAUTHENTICATED;
    }
}
