package com.grpc.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Encoders;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.security.KeyFactory;
import java.security.NoSuchAlgorithmException;
import java.security.PrivateKey;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.PKCS8EncodedKeySpec;
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
    private PrivateKey getPrivateKey() throws NoSuchAlgorithmException, InvalidKeySpecException {
        String privateKey = System.getenv("PRIVATE_JWT_KEY");
        String base64Private = Encoders.BASE64.encode(privateKey.getBytes());

        KeyFactory keyFactory = KeyFactory.getInstance("RSA");
        PKCS8EncodedKeySpec pkcs8EncodedKeySpec = new PKCS8EncodedKeySpec(Base64.getDecoder().decode(base64Private));

        return (PrivateKey) keyFactory.generatePrivate(pkcs8EncodedKeySpec);
    }

    public String signJwt(String uid) throws NoSuchAlgorithmException, InvalidKeySpecException {
        PrivateKey privateKey = getPrivateKey();

        return Jwts.builder()
                .claim("uid", uid)
                .signWith(privateKey)
                .issuedAt(Date.from(Instant.now()))
                .expiration(Date.from(Instant.now().plus(1L, ChronoUnit.HOURS)))
                .compact();
    }

    public Boolean verifyJwt(String jws) throws NoSuchAlgorithmException, InvalidKeySpecException {
        PrivateKey privateKey = getPrivateKey();
        try {
            Jws<Claims> something = Jwts.parser()
                    .verifyWith((SecretKey) privateKey)
                    .build()
                    .parseSignedClaims(jws);
        } catch (JwtException ignored) {
            return false;
        }
        return true;
    }
}
