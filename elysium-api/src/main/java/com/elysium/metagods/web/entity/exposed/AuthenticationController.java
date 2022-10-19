package com.elysium.metagods.web.entity.exposed;

import com.elysium.metagods.exception.ForbiddenRequestException;
import com.elysium.metagods.security.jwt.TokenProvider;
import com.elysium.metagods.service.dto.request.AuthenticationRequest;
import com.elysium.metagods.service.dto.request.NonceRequest;
import com.elysium.metagods.service.dto.response.AuthenticationResponse;
import com.elysium.metagods.service.dto.response.NonceResponse;
import com.elysium.metagods.service.helper.AuthenticationService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("/api/public/authorize")
@ConditionalOnProperty(prefix = "application.instance", value = "with-entities", havingValue = "true")
public class AuthenticationController {

    private final TokenProvider tokenProvider;
    private final AuthenticationService authenticationService;

    @PostMapping("/get-nonce")
    public ResponseEntity<NonceResponse> generateNonce(@Valid @RequestBody NonceRequest nonceRequest) {
        log.info("A nonce request was received for the address <{}>", nonceRequest.getWalletAddress());
        long nonce = authenticationService.generateNonce(nonceRequest.getWalletAddress());
        return ResponseEntity.ok(new NonceResponse().setNonce(nonce));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authorize(@Valid @RequestBody AuthenticationRequest loginPayload) {
        try {
            log.info("An authentication request was received for the address <{}>", loginPayload.getWalletAddress());
            boolean isSignatureValid = authenticationService
                .isSignatureValid(loginPayload.getWalletAddress(), loginPayload.getSignature());
            if (!isSignatureValid) {
                throw new ForbiddenRequestException();
            }
            return ResponseEntity.ok(tokenProvider.createToken(loginPayload.getWalletAddress()));
        } catch (Exception e) {
            log.error("Failed to authenticate user {}", loginPayload.getWalletAddress(), e);
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

}
