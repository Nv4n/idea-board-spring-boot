package com.grpc.config;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.security.Key;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Base64;
import java.util.Date;

@Component
public class JwtValidator {
    //    public void SignJWT() throws JOSEException {
//        JWTClaimsSet claims = new JWTClaimsSet.Builder()
//                .claim("uid", "saljdalskfljsaljc")
//                .claim("sid", "lzxknvlvknalfda")
//                .claim("iss", "localhost:5173")
//                .build();
//
//        JWSHeader header = new JWSHeader.Builder(JWSAlgorithm.HS256).build();
//        SignedJWT signedJWT = new SignedJWT(header, claims);
//
//        String secret = "yourSecret";
//        byte[] secretKey = secret.getBytes(StandardCharsets.UTF_8);
//        JWSSigner signer = new MACSigner(secretKey);
//
//        signedJWT.sign(signer);
//    }
    private static SecretKey getPrivateKey() throws NoSuchAlgorithmException, InvalidKeySpecException {
        String privateKey = "YourBase64EncodedSecretKeyString";
        return Keys.hmacShaKeyFor(Base64.getEncoder().encode(privateKey.getBytes()));
    }

    public static String signJwt(String uid) throws NoSuchAlgorithmException, InvalidKeySpecException {
        Key privateKey = getPrivateKey();

        return Jwts.builder()
                .claim("uid", uid)
                .signWith(privateKey)
                .issuedAt(Date.from(Instant.now()))
                .expiration(Date.from(Instant.now().plus(10L, ChronoUnit.SECONDS)))
                .compact();
    }

    public static Boolean verifyJwt(String jws) throws NoSuchAlgorithmException, InvalidKeySpecException {
        SecretKey privateKey = getPrivateKey();

        try {
            Jws<Claims> something = Jwts.parser()
                    .verifyWith(privateKey)
                    .build()
                    .parseSignedClaims(jws);
        } catch (JwtException ignored) {
            return false;
        }
        return true;
    }
}
