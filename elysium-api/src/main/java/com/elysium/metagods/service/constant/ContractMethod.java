package com.elysium.metagods.service.constant;

public class ContractMethod {

    protected ContractMethod() { }

    public static class ERC721Method {
        public static final String IS_OWNER_OF_BATCH = "isOwnerOfBatch";

        public static final String TOKENS_OF_OWNER = "tokensOfOwner";
    }

    public static class ERCCommon {
        public static final String BALANCE_OF = "balanceOf";
    }

    public static class MintPassStakingMethod {
        public static final long MINTPASS_TOKEN_ID = 0L;
        public static final String NUMBER_OF_STAKED_PASSES_BY_WALLET = "numberOfStakedPassesByWallet";
    }

}
