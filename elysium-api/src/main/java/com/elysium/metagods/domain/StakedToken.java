package com.elysium.metagods.domain;

import com.elysium.metagods.domain.common.TokenWithTrait;
import com.elysium.metagods.domain.enumeration.StakingMode;
import com.elysium.metagods.exception.InvalidRequestException;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import lombok.experimental.Accessors;

import javax.persistence.*;
import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A StakedToken.
 */
@Entity
@Table(name = "staked_token")
@Data
@Accessors(chain = true)
@ToString(of = {"id", "mode"})
@EqualsAndHashCode(of = "id")
public class StakedToken implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "stakedTokenSequenceGenerator")
    @SequenceGenerator(
        name = "stakedTokenSequenceGenerator",
        sequenceName = "staked_token_sequence_generator",
        allocationSize = 1
    )
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "mode")
    private StakingMode mode;

    @Column(name = "last_claimed_on")
    private Long lastClaimedOn;

    @JsonIgnoreProperties(value = { "pairedToken", "god", "weapon", "reversePairedToken" }, allowSetters = true)
    @OneToOne
    @JoinColumn(unique = true)
    private StakedToken pairedToken;

    @JsonIgnoreProperties(value = { "stakeData", "owner" }, allowSetters = true)
    @OneToOne(mappedBy = "stakeData")
    private God god;

    @JsonIgnoreProperties(value = { "stakeData", "owner" }, allowSetters = true)
    @OneToOne(mappedBy = "stakeData")
    private Weapon weapon;

    @JsonIgnoreProperties(value = { "pairedToken", "god", "weapon", "reversePairedToken" }, allowSetters = true)
    @OneToOne(mappedBy = "pairedToken")
    private StakedToken reversePairedToken;

    public static StakedToken getNewStakedToken() {
        return new StakedToken().setLastClaimedOn(Instant.now().getEpochSecond());
    }

    public boolean isPaired() {
        return pairedToken != null || reversePairedToken != null;
    }

    public void unpair() {
        if (pairedToken != null) {
            pairedToken.setReversePairedToken(null);
            pairedToken = null;
        }
        if (reversePairedToken != null) {
            reversePairedToken.setPairedToken(null);
            reversePairedToken = null;
        }
    }

    public StakedToken setGod(God god) {
        if (this.god != null) {
            this.god.setStakeData(null);
        }
        if (god != null) {
            god.setStakeData(this);
        }
        this.god = god;
        return this;
    }

    public StakedToken setWeapon(Weapon weapon) {
        if (this.weapon != null) {
            this.weapon.setStakeData(null);
        }
        if (weapon != null) {
            weapon.setStakeData(this);
        }
        this.weapon = weapon;
        return this;
    }

    public void setReversePairedToken(StakedToken stakedToken) {
        if (this.reversePairedToken != null) {
            this.reversePairedToken.setPairedToken(null);
        }
        if (stakedToken != null) {
            stakedToken.setPairedToken(this);
        }
        this.reversePairedToken = stakedToken;
    }

    public TokenWithTrait extractStakedToken() {
        if (!Objects.isNull(this.god)) {
            return this.god;
        }
        if (!Objects.isNull(this.weapon)) {
            return this.weapon;
        }
        throw new InvalidRequestException("No token found for the staked data.");
    }

    public void setPair(StakedToken stakeData) {
        if(this.god != null) {
            this.pairedToken = stakeData;
            stakeData.setReversePairedToken(this);
        } else if (this.weapon != null) {
            this.reversePairedToken = stakeData;
            stakeData.setPairedToken(this);
        }
    }
}
