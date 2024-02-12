package com.grpc.config;

import com.grpc.model.AuthException;
import io.grpc.Metadata;
import io.grpc.Status;
import org.lognet.springboot.grpc.recovery.GRpcExceptionHandler;
import org.lognet.springboot.grpc.recovery.GRpcExceptionScope;
import org.lognet.springboot.grpc.recovery.GRpcServiceAdvice;
import org.springframework.dao.DataIntegrityViolationException;

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

    @GRpcExceptionHandler
    public Status handle(DataIntegrityViolationException exc, GRpcExceptionScope scope) {
        scope.getResponseHeaders().put(
                Metadata.Key.of("CreateError", Metadata.ASCII_STRING_MARSHALLER),
                "400");
        return Status.ALREADY_EXISTS;
    }

    @GRpcExceptionHandler
    public Status handle(Exception exc, GRpcExceptionScope scope) {
        scope.getResponseHeaders().put(
                Metadata.Key.of("Error", Metadata.ASCII_STRING_MARSHALLER),
                "500");
        return Status.INTERNAL;
    }
}
