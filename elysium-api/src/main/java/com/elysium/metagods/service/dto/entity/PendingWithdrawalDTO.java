package com.elysium.metagods.service.dto.entity;

import com.elysium.metagods.domain.PendingTokenSpending;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.io.Serializable;
import java.time.Instant;

/**
 * A DTO for the {@link PendingTokenSpending} entity.
 */
@Data
@ToString
@EqualsAndHashCode(of = "id")
public class PendingWithdrawalDTO implements Serializable {

    private Long id;

    private Instant generationDate;

    private BlockedAmountDTO blockedAmount;

}
