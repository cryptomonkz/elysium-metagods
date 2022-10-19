package com.elysium.metagods.web.entity;

import com.elysium.metagods.security.SecurityUtils;
import com.elysium.metagods.service.dto.MintWeaponsSignedResponse;
import com.elysium.metagods.service.dto.TokenSpendingSignedResponse;
import com.elysium.metagods.service.dto.request.GodTokenTransferRequest;
import com.elysium.metagods.service.TokenService;
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
import javax.validation.constraints.NotNull;

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("/api/wallet")
@ConditionalOnProperty(prefix = "application.instance", value = "with-entities", havingValue = "true")
public class WalletController {

    private final TokenService tokenService;

//    TODO withdrawals are temporary disabled
//    @PostMapping("/sign-withdraw-request")
    public ResponseEntity<TokenSpendingSignedResponse> signWithdrawRequest(
        @Valid @RequestBody @NotNull Long amount
    ) {
        try {
            log.info(
                "A withdraw request for address <{}> was received for the amount of <{}>",
                SecurityUtils.getCurrentUserAddressStrict(), amount
            );
            return ResponseEntity.ok(tokenService.signWithdrawRequest(amount));
        } catch (Exception e) {
            log.error(
                "Failed to generate a signature for the wallet {} for the withdrawal request of {}",
                SecurityUtils.getCurrentUserAddressStrict(), amount, e
            );
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PostMapping("/sign-mint-weapons-request")
    public ResponseEntity<MintWeaponsSignedResponse> signMintWeaponsRequest(
        @Valid @RequestBody @NotNull Long amount
    ) {
        try {
            log.info(
                "A mint weapons request for address <{}> was received for the amount of <{}>",
                SecurityUtils.getCurrentUserAddressStrict(), amount
            );
            return ResponseEntity.ok(tokenService.signMintWeaponsRequest(amount));
        } catch (Exception e) {
            log.error(
                "Failed to generate a signature for the wallet {} for the mint weapons request of {}",
                SecurityUtils.getCurrentUserAddressStrict(), amount, e
            );
            throw e;
        }
    }

    @PostMapping("/transfer")
    public ResponseEntity<TokenSpendingSignedResponse> transferGodToken(
        @Valid @RequestBody GodTokenTransferRequest transferRequest
    ) {
        log.info(
            "A transfer request from <{}> to <{}> was received for the amount of <{}>",
            SecurityUtils.getCurrentUserAddressStrict(),
            transferRequest.getRecipient(),
            transferRequest.getAmount()
        );
        tokenService.transferGodToken(transferRequest);
        log.info(
            "The transfer request from <{}> to <{}> for the amount of <{}> was successful",
            SecurityUtils.getCurrentUserAddressStrict(),
            transferRequest.getRecipient(),
            transferRequest.getAmount()
        );
        return ResponseEntity.ok().build();
    }

}
