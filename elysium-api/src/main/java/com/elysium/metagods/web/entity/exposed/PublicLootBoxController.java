package com.elysium.metagods.web.entity.exposed;

import com.elysium.metagods.service.LootBoxManagementService;
import com.elysium.metagods.service.dto.entity.LootBoxBundleDTO;
import com.elysium.metagods.service.dto.entity.LootBoxOwnedDTO;
import com.elysium.metagods.service.dto.entity.LootBoxRewardHistoryBaseDTO;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotNull;
import java.util.List;

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("/api/public/loot-box")
public class PublicLootBoxController {

    private final LootBoxManagementService lootBoxManagementService;

    @GetMapping("/bundles")
    public ResponseEntity<List<LootBoxBundleDTO>> getBundles() {
        return ResponseEntity.ok(lootBoxManagementService.getBundles());
    }

    @GetMapping("/owned/{address}")
    public ResponseEntity<List<LootBoxOwnedDTO>> getOwnedBoxes(@NotNull @PathVariable String address) {
        return ResponseEntity.ok(lootBoxManagementService.getOwnedBoxes(address));
    }

    @GetMapping("/reward-history/{address}")
    public ResponseEntity<Page<LootBoxRewardHistoryBaseDTO>> getRewardHistory(
        @NotNull @PathVariable String address,
        @PageableDefault(sort = {"openedOn"}, direction = Sort.Direction.DESC) Pageable pageable
    ) {
        return ResponseEntity.ok(lootBoxManagementService.getRewardHistory(address, pageable));
    }

}
