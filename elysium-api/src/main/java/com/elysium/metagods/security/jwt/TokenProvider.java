package com.elysium.metagods.security.jwt;

import com.elysium.metagods.exception.InvalidRequestException;
import com.elysium.metagods.service.dto.response.AuthenticationResponse;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;
import tech.jhipster.config.JHipsterProperties;

import javax.validation.constraints.NotNull;
import java.security.Key;
import java.time.Instant;
import java.util.Collections;
import java.util.Date;
import java.util.Optional;

import static com.elysium.metagods.security.jwt.JWTFilter.AUTHORIZATION_HEADER_PREFIX;

@Slf4j
@Component
public class TokenProvider {

    private final Key key;
    private final JwtParser jwtParser;
    private final long tokenValidityInSeconds;

    public TokenProvider(JHipsterProperties jHipsterProperties) {
        byte[] keyBytes = Optional
            .ofNullable(jHipsterProperties).map(JHipsterProperties::getSecurity)
            .map(JHipsterProperties.Security::getAuthentication)
            .map(JHipsterProperties.Security.Authentication::getJwt)
            .map(JHipsterProperties.Security.Authentication.Jwt::getBase64Secret)
            .map(Decoders.BASE64::decode).orElseThrow(InvalidRequestException::new);
        this.key = Keys.hmacShaKeyFor(keyBytes);
        jwtParser = Jwts.parserBuilder().setSigningKey(key).build();
        this.tokenValidityInSeconds = jHipsterProperties
            .getSecurity().getAuthentication().getJwt().getTokenValidityInSeconds();
    }

    public AuthenticationResponse createToken(@NotNull String walletAddress) {
        Instant expiration = Instant.now().plusSeconds(this.tokenValidityInSeconds);
        String jwtToken = Jwts.builder().setSubject(walletAddress).signWith(key, SignatureAlgorithm.HS512)
            .setExpiration(Date.from(expiration)).compact();
        return new AuthenticationResponse()
            .setJwtToken(AUTHORIZATION_HEADER_PREFIX + jwtToken).setTokenExpiration(expiration);
    }

    public Optional<Authentication> getAuthentication(String token) {
        try {
            Claims claims = jwtParser.parseClaimsJws(token).getBody();
            User principal = new User(claims.getSubject(), StringUtils.EMPTY, Collections.emptyList());
            return Optional.of(new UsernamePasswordAuthenticationToken(principal, token, Collections.emptyList()));
        } catch (Exception exception) {
            log.error("Invalid JWT token {}", token, exception);
            return Optional.empty();
        }
    }

}
