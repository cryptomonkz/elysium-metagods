package com.elysium.metagods.service.dto;

import java.io.Serializable;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TournamentLeaderboardDTO implements Serializable {

    private Long rank;

    private Long godId;

    private String godName;

    private String walletAddress;

    private String walletNickname;

    private Long totalPoints;

    private Long reward;

}
