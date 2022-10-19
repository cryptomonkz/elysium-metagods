package com.elysium.metagods.web.entity.exposed;

import com.elysium.metagods.service.AggregationService;
import com.elysium.metagods.service.OwnerSyncService;
import com.elysium.metagods.service.dto.response.ClaimStatusResponse;
import com.elysium.metagods.service.dto.response.StakingStatusResponse;
import com.elysium.metagods.service.dto.response.VaultStatusResponse;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.NotNull;

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("/api/public/wallet")
@ConditionalOnProperty(prefix = "application.instance", value = "with-entities", havingValue = "true")
public class PublicWalletController {

    private final AggregationService aggregationService;

    private final OwnerSyncService ownerSyncService;

    @GetMapping("/staking/{address}")
    public ResponseEntity<StakingStatusResponse> getStakingStatus(@NotNull @PathVariable String address) {
        ownerSyncService.syncTokensOfOwner(address);
        return ResponseEntity.ok(aggregationService.getStakingStatus(address));
    }

    @GetMapping("/claims/{address}")
    public ResponseEntity<ClaimStatusResponse> getClaimsStatus(@NotNull @PathVariable String address) {
        ownerSyncService.syncTokensOfOwner(address);
        return ResponseEntity.ok(aggregationService.getClaimStatus(address));
    }

    @GetMapping("/vault/{address}")
    public ResponseEntity<VaultStatusResponse> getVaultStatus(@NotNull @PathVariable String address) {
        ownerSyncService.syncTokensOfOwner(address);
        return ResponseEntity.ok(aggregationService.getVaultStatus(address));
    }

}
