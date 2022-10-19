package com.elysium.metagods.web.entity;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.elysium.metagods.service.LootBoxManagementService;
import com.elysium.metagods.service.dto.LootBoxResultDTO;
import com.elysium.metagods.service.dto.LootBoxRewardClaimResponse;
import com.elysium.metagods.service.dto.entity.LootBoxRewardHistoryBaseDTO;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("/api/loot-box")
public class LootBoxController {

    private final LootBoxManagementService lootBoxManagementService;

    @PostMapping("/bundles/{bundleId}/buy")
    public void buyBundle(@PathVariable Long bundleId) {
        lootBoxManagementService.buyBundle(bundleId);
    }

    @PostMapping("/{lootBoxId}/open")
    public ResponseEntity<LootBoxResultDTO> openLootBox(@PathVariable Long lootBoxId) {
        return ResponseEntity.ok(lootBoxManagementService.openLootBox(lootBoxId));
    }

    @GetMapping("/reward/{rewardId}")
    public ResponseEntity<LootBoxRewardClaimResponse> getRewardClaimData(@PathVariable Long rewardId) {
        LootBoxRewardClaimResponse rewardClaimSigning = lootBoxManagementService.getRewardClaimData(rewardId);
        return ResponseEntity.ok(rewardClaimSigning);
    }

}
