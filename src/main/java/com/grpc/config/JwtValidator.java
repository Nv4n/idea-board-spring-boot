package com.grpc.config;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.RSASSAVerifier;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;

@Component
public class JwtValidator {
    public void SignJWT() throws JOSEException {
        JWTClaimsSet claims = new JWTClaimsSet.Builder()
                .claim("uid", "saljdalskfljsaljc")
                .claim("sid", "lzxknvlvknalfda")
                .claim("iss", "localhost:5173")
                .build();

        JWSHeader header = new JWSHeader.Builder(JWSAlgorithm.HS256).build();
        SignedJWT signedJWT = new SignedJWT(header, claims);

        String secret = "yourSecret";
        byte[] secretKey = secret.getBytes(StandardCharsets.UTF_8);
        JWSSigner signer = new MACSigner(secretKey);

        signedJWT.sign(signer);
    }
}
