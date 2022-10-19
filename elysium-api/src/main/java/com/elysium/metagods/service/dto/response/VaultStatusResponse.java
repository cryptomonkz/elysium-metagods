package com.elysium.metagods.service.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
public class VaultStatusResponse {

    private Long godsCount;
    private Long stakedGodsCount;
    private Long stakedWeaponsCount;
    private Double inGameBalance;
    private Double blockedBalance;
    private Double claimableBalance;

}
