package com.elysium.metagods.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import lombok.experimental.Accessors;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.Instant;

/**
 * A PendingTokenSpending.
 */
@Entity
@Table(name = "pending_withdrawal")
@Data
@Accessors(chain = true)
@ToString(of = {"id", "generationDate"})
@EqualsAndHashCode(of = "id")
public class PendingTokenSpending implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "pendingWithdrawalSequenceGenerator")
    @SequenceGenerator(
        name = "pendingWithdrawalSequenceGenerator",
        sequenceName = "pending_withdrawal_sequence_generator",
        allocationSize = 1
    )
    private Long id;

    @NotNull
    @Column(name = "generation_date")
    private Instant generationDate;

    @JsonIgnoreProperties(value = { "wallet" }, allowSetters = true)
    @OneToOne(optional = false)
    @NotNull
    @MapsId
    @JoinColumn(name = "id")
    private BlockedAmount blockedAmount;

}
