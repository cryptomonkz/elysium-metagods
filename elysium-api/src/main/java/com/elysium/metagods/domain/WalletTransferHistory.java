package com.elysium.metagods.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import java.io.Serializable;

import lombok.Data;
import lombok.experimental.Accessors;

/**
 * A WalletTransferHistory.
 */
@Data
@Entity
@Accessors(chain = true)
@Table(name = "wallet_transfer_history")
public class WalletTransferHistory implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "walletTransferHistorySequenceGenerator")
    @SequenceGenerator(
        name = "walletTransferHistorySequenceGenerator",
        sequenceName = "wallet_transfer_history_sequence_generator",
        allocationSize = 1
    )
    private Long id;

    @Column(name = "from_address")
    private String fromAddress;

    @Column(name = "to_address")
    private String toAddress;

    @Column(name = "amount")
    private Long amount;

    // jhipster-needle-entity-add-field - JHipster will add fields here

}
