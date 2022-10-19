package com.elysium.metagods.web.entity;

import com.elysium.metagods.service.StakingService;
import com.elysium.metagods.service.dto.*;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("/api/staking")
@ConditionalOnProperty(prefix = "application.instance", value = "with-entities", havingValue = "true")
public class StakingController {

    private final StakingService stakingService;

    @PostMapping("/stake")
    public ResponseEntity<List<ClaimResultDTO>> stake(
        @Valid @RequestBody StakeActionDTO stakeActionDTO
    ) {
        List<ClaimResultDTO> claimResultDTOS = stakingService.stakeTokens(stakeActionDTO);

        return ResponseEntity.ok(claimResultDTOS);
    }

    @PostMapping("/unstake")
    public ResponseEntity<List<ClaimResultDTO>> unstake(
        @Valid @RequestBody UnstakeActionDTO unstakeActionDTO
    ) {
        List<ClaimResultDTO> claimResultDTOS = stakingService.unstakeTokens(unstakeActionDTO);

        return ResponseEntity.ok(claimResultDTOS);
    }

    @PostMapping("/change-pairings")
    public ResponseEntity<List<ClaimResultDTO>> changePairings(
        @Valid @RequestBody ChangePairingActionDTO changePairingActionDTO
    ) {
        List<ClaimResultDTO> claimResultDTOS = stakingService.changePairings(changePairingActionDTO);

        return ResponseEntity.ok(claimResultDTOS);
    }

    @PostMapping("/change-stake-type")
    public ResponseEntity<List<ClaimResultDTO>> changeStakeType(
        @Valid @RequestBody ChangeStakeTypeActionDTO changeStakeTypeActionDTO
    ) {
        List<ClaimResultDTO> claimResultDTOS = stakingService.changeStakeType(changeStakeTypeActionDTO);

        return ResponseEntity.ok(claimResultDTOS);
    }

    @PostMapping("/claim-yield")
    public ResponseEntity<List<ClaimResultDTO>> claimYield(
        @Valid @RequestBody ClaimActionDTO claimActionDTO
    ) {
        List<ClaimResultDTO> claimResultDTOS = stakingService.claimYield(claimActionDTO);

        return ResponseEntity.ok(claimResultDTOS);
    }

    @PostMapping("/claim-yield-for-all")
    public ResponseEntity<List<ClaimResultDTO>> claimYield() {
        List<ClaimResultDTO> claimResultDTOS = stakingService.claimYieldForAll();

        return ResponseEntity.ok(claimResultDTOS);
    }
}
