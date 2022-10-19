package com.elysium.metagods.service.dto.entity;

import com.elysium.metagods.domain.enumeration.Gemstone;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.io.Serializable;

/**
 * A DTO for the {@link com.elysium.metagods.domain.God} entity.
 */
@Data
@ToString
@EqualsAndHashCode(of = "id")
public class GodDTO implements Serializable {

    private Long id;

    private Gemstone trait;

    private StakedTokenDTO stakeData;

    private WalletDTO owner;

}
