package com.elysium.metagods.domain;

import com.elysium.metagods.domain.enumeration.BlockedAmountReason;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import lombok.experimental.Accessors;

import javax.persistence.*;
import java.io.Serializable;

/**
 * A BlockedAmount.
 */
@Entity
@Table(name = "blocked_amount")
@Data
@Accessors(chain = true)
@ToString(of = {"id", "amount", "reason"})
@EqualsAndHashCode(of = "id")
public class BlockedAmount implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "blockedAmountSequenceGenerator")
    @SequenceGenerator(
        name = "blockedAmountSequenceGenerator",
        sequenceName = "blocked_amount_sequence_generator",
        allocationSize = 1
    )
    private Long id;

    @Column(name = "amount")
    private Double amount;

    @Enumerated(EnumType.STRING)
    @Column(name = "reason")
    private BlockedAmountReason reason;

    @ManyToOne
    @JsonIgnoreProperties(value = { "gods", "weapons" }, allowSetters = true)
    private Wallet wallet;

}
