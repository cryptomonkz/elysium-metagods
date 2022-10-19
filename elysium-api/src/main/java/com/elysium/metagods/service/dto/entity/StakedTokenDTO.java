package com.elysium.metagods.service.dto.entity;

import com.elysium.metagods.domain.enumeration.StakingMode;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.io.Serializable;

/**
 * A DTO for the {@link com.elysium.metagods.domain.StakedToken} entity.
 */
@Data
@ToString
@EqualsAndHashCode(of = "id")
public class StakedTokenDTO implements Serializable {

    private Long id;

    private StakingMode mode;

    private Long lastClaimedOn;

    private StakedTokenDTO pairedToken;

}
