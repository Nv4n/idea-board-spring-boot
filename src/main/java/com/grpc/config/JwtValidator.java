package com.grpc.config;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.JWSSigner;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;

@Service
public class JwtValidator {
    public void SignJWT() throws JOSEException {
        JWTClaimsSet claims = new JWTClaimsSet.Builder()
                .claim("uid", "saljdalskfljsaljc")
                .claim("sid", "lzxknvlvknalfda")
                .claim("iss", "localhost:5173")
                .build();

        JWSHeader header = new JWSHeader.Builder(JWSAlgorithm.RS256).build();
        SignedJWT signedJWT = new SignedJWT(header, claims);

        String secret = "yourSecret";
        byte[] secretKey = secret.getBytes(StandardCharsets.UTF_8);
        JWSSigner signer = new MACSigner(secretKey);
        signedJWT.sign(signer);
    }
}
