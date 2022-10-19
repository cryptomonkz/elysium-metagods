package com.elysium.metagods.domain.common;

import com.elysium.metagods.domain.StakedToken;
import com.elysium.metagods.domain.Wallet;
import com.elysium.metagods.domain.enumeration.Gemstone;
import com.elysium.metagods.service.dto.request.ContractType;

public interface TokenWithTrait {

    Long getId();
    Wallet getOwner();
    String getDisplayName();
    Gemstone getTrait();
    ContractType getCollectionType();
    StakedToken getStakeData();

}
