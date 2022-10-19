package com.elysium.metagods.domain;

import com.elysium.metagods.domain.enumeration.ProcessingType;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import lombok.experimental.Accessors;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

/**
 * A ProcessedTransaction.
 */
@Entity
@Table(name = "processed_transaction")
@Data
@Accessors(chain = true)
@ToString(of = {"id", "processingType", "txnHash"})
@EqualsAndHashCode(of = "id")
public class ProcessedTransaction implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "processedTransactionSequenceGenerator")
    @SequenceGenerator(
        name = "processedTransactionSequenceGenerator",
        sequenceName = "processed_transaction_sequence_generator",
        allocationSize = 1
    )
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "processing_type", nullable = false)
    private ProcessingType processingType;

    @NotNull
    @Column(name = "txn_hash", nullable = false)
    private String txnHash;

}
