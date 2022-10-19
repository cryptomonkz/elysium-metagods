package com.elysium.metagods.web.trigger.exposed;

import com.elysium.metagods.service.dto.request.DepositRequest;
import com.elysium.metagods.service.dto.request.SpendingFinishedRequest;
import com.elysium.metagods.service.entity.PendingTokenSpendingService;
import com.elysium.metagods.service.entity.WalletService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
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
@RequestMapping("/api/public/websocket")
@ConditionalOnProperty(prefix = "application.instance", value = "with-triggers", havingValue = "true")
public class WebsocketController {

    private WalletService walletService;
    private PendingTokenSpendingService pendingTokenSpendingService;

    @PostMapping("/handle-withdraw")
    public ResponseEntity<Void> handleWithdrawRequest(
        @Valid @RequestBody @NotNull SpendingFinishedRequest request
    ) {
        try {
            log.info(
                "A withdrawal request with success status <{}> was received for identifier <{}>. Wallet address: <{}>.",
                request.getWasRequestSuccessful(), request.getRequestIdentifier(), request.getWalletAddress()
            );
            pendingTokenSpendingService.handleWithdrawRequest(request);
            log.info(
                "Withdrawal with identifier <{}> handled successfully for wallet address <{}>.",
                request.getRequestIdentifier(), request.getWalletAddress()
            );
            return ResponseEntity.ok().build();
        } catch (Exception exception) {
            log.error("Withdrawal handling failed for identifier <{}>", request.getRequestIdentifier(), exception);
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/handle-mint-weapons")
    public ResponseEntity<Void> handleMintWeaponsRequest(
        @Valid @RequestBody @NotNull SpendingFinishedRequest request
    ) {
        try {
            log.info(
                "A mint weapons request with success status <{}> was received for identifier <{}>. Wallet address: <{}>.",
                request.getWasRequestSuccessful(), request.getRequestIdentifier(), request.getWalletAddress()
            );
            pendingTokenSpendingService.handleMintWeaponsRequest(request);
            log.info(
                "Mint weapons request with identifier <{}> handled successfully for wallet address <{}>.",
                request.getRequestIdentifier(), request.getWalletAddress()
            );
            return ResponseEntity.ok().build();
        } catch (Exception exception) {
            log.error("Mint weapons handling failed for identifier <{}>", request.getRequestIdentifier(), exception);
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/handle-deposit")
    public ResponseEntity<Void> handleDeposit(
        @Valid @RequestBody @NotNull DepositRequest request
    ) {
        try {
            log.info(
                "A deposit request was received for the amount of <{}>. Wallet address: <{}>.",
                request.getAmount(), request.getWalletAddress()
            );
            walletService.handleDepositRequest(request);
            log.info(
                "Deposit to <{}> finished successfully for amount <{}>",
                request.getWalletAddress(), request.getAmount()
            );
            return ResponseEntity.ok().build();
        } catch (Exception exception) {
            log.error("Deposit handling failed for address <{}>", request.getWalletAddress(), exception);
            return ResponseEntity.internalServerError().build();
        }
    }

}
