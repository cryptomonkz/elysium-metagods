package com.elysium.metagods.service.dto.entity;

import com.elysium.metagods.domain.enumeration.BlockedAmountReason;
import com.elysium.metagods.service.dto.entity.WalletDTO;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.io.Serializable;

/**
 * A DTO for the {@link com.elysium.metagods.domain.BlockedAmount} entity.
 */
@Data
@ToString
@EqualsAndHashCode(of = "id")
public class BlockedAmountDTO implements Serializable {

    private Long id;

    private Double amount;

    private BlockedAmountReason reason;

    private WalletDTO wallet;

}
