package com.elysium.metagods.domain;

import java.io.Serializable;

import com.elysium.metagods.service.dto.TournamentLeaderboardDTO;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TournamentRewardWinner implements Serializable {

    private Long rank;

    private Long godId;

    private String walletAddress;

    private Long amountWon;

    public TournamentRewardWinner(TournamentLeaderboardDTO dto) {
        this.rank = dto.getRank();
        this.godId = dto.getGodId();
        this.walletAddress = dto.getWalletAddress();
        this.amountWon = dto.getReward();
    }
}
