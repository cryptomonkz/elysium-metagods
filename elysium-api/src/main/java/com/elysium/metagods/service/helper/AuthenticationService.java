package com.elysium.metagods.service.helper;

import com.elysium.metagods.config.ApplicationConfigurationProperties;
import com.elysium.metagods.domain.Wallet;
import com.elysium.metagods.exception.InvalidRequestException;
import com.elysium.metagods.helper.RandomHelper;
import com.elysium.metagods.service.connector.Web3ServiceConnector;
import com.elysium.metagods.service.entity.WalletService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.validation.constraints.NotNull;
import java.security.SecureRandom;
import java.time.Instant;
import java.util.Optional;

@Slf4j
@Service
@AllArgsConstructor
public class AuthenticationService {

    private static final SecureRandom SECURE_RANDOM = RandomHelper.getInitializedSecureRandom();

    private final WalletService walletService;
    private final Web3ServiceConnector serviceConnector;
    private final ApplicationConfigurationProperties properties;

    public long generateNonce(@NotNull String walletAddress) {
        long nonce = RandomHelper.generateNonce(SECURE_RANDOM);
        walletService.saveNonce(walletAddress, nonce);
        return nonce;
    }

    private boolean isNonceExpired(@NotNull Wallet wallet) {
        return Optional.ofNullable(wallet.getNonceGenerationDate())
            .map(generationDate -> generationDate.plusSeconds(properties.getAuthentication().getNonceLifetimeSeconds()))
            .map(expirationDate -> expirationDate.isBefore(Instant.now()))
            .orElse(Boolean.TRUE);
    }

    private Long extractExpectedNonce(@NotNull String walletAddress) {
        return walletService.findOne(walletAddress)
            .filter(wallet -> !isNonceExpired(wallet))
            .map(Wallet::getNonce)
            .orElseThrow(InvalidRequestException::new);
    }

    public boolean isSignatureValid(@NotNull String walletAddress, @NotNull String signature) {
        long expectedNonce = extractExpectedNonce(walletAddress);
        walletService.resetNonceStatus(walletAddress);
        String signerAddress = serviceConnector.recoverPersonalSignature(expectedNonce, signature)
            .orElseThrow(InvalidRequestException::new);
        return Optional.ofNullable(walletAddress).map(signerAddress::equalsIgnoreCase).orElse(Boolean.FALSE);
    }

}
