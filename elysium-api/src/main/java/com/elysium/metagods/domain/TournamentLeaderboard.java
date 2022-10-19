package com.elysium.metagods.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;
import java.time.Instant;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;
import org.hibernate.annotations.Immutable;

@Entity
@Immutable
@Table(name = "tournament_leaderboard")
@Getter
@ToString
@EqualsAndHashCode
public class TournamentLeaderboard implements Serializable {

    @Column(name = "rank")
    private Long rank;

    @Id
    @Column(name = "god_id")
    private Long godId;

    @Column(name = "god_name")
    private String godName;

    @Column(name = "wallet_address")
    private String walletAddress;

    @Column(name = "wallet_nickname")
    private String walletNickname;

    @Column(name = "total_points")
    private Long totalPoints;

    @Column(name = "enrollment_date_time")
    private Instant enrollmentDateTime;

}
