package com.elysium.metagods.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.Accessors;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * A Wallet.
 */
@Entity
@NoArgsConstructor
@Table(name = "wallet")
@Data
@Accessors(chain = true)
@ToString(of = {"id", "address", "nickname", "tokenBalance"})
@EqualsAndHashCode(of = "id")
public class Wallet implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "walletSequenceGenerator")
    @SequenceGenerator(
        name = "walletSequenceGenerator",
        sequenceName = "wallet_sequence_generator",
        allocationSize = 1
    )
    private Long id;

    @NotNull
    @Column(name = "address", nullable = false, unique = true)
    private String address;

    @Column(name = "nickname")
    private String nickname;

    @Column(name = "primordial")
    private Boolean primordial;

    @NotNull
    @Column(name = "token_balance")
    private Double tokenBalance = 0.;

    @Column(name = "nonce")
    private Long nonce;

    @Column(name = "nonce_generation_date")
    private Instant nonceGenerationDate;

    @Column(name = "last_tokens_sync")
    private Instant lastTokensSync;

    @OneToMany(mappedBy = "owner")
    @JsonIgnoreProperties(value = { "stakeData", "owner" }, allowSetters = true)
    private Set<God> gods = new HashSet<>();

    @OneToMany(mappedBy = "owner")
    @JsonIgnoreProperties(value = { "stakeData", "owner" }, allowSetters = true)
    private Set<Weapon> weapons = new HashSet<>();

    @OneToMany(mappedBy = "wallet")
    @JsonIgnoreProperties(value = { "wallet" }, allowSetters = true)
    private Set<BlockedAmount> blockedAmounts = new HashSet<>();

    public Boolean getPrimordial() {
        return Boolean.TRUE.equals(primordial);
    }

    public void setGods(Set<God> gods) {
        if (this.gods != null) {
            this.gods.forEach(i -> i.setOwner(null));
        }
        if (gods != null) {
            gods.forEach(i -> i.setOwner(this));
        }
        this.gods = gods;
    }

    public Wallet addGods(God god) {
        this.gods.add(god);
        god.setOwner(this);
        return this;
    }

    public Wallet removeGods(God god) {
        this.gods.remove(god);
        god.setOwner(null);
        return this;
    }

    public void setWeapons(Set<Weapon> weapons) {
        if (this.weapons != null) {
            this.weapons.forEach(i -> i.setOwner(null));
        }
        if (weapons != null) {
            weapons.forEach(i -> i.setOwner(this));
        }
        this.weapons = weapons;
    }

    public Wallet addWeapons(Weapon weapon) {
        this.weapons.add(weapon);
        weapon.setOwner(this);
        return this;
    }

    public Wallet removeWeapons(Weapon weapon) {
        this.weapons.remove(weapon);
        weapon.setOwner(null);
        return this;
    }

}
