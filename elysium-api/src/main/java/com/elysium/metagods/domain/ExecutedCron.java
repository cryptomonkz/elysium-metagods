package com.elysium.metagods.domain;

import com.elysium.metagods.domain.enumeration.CronType;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import lombok.experimental.Accessors;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.Instant;

/**
 * A ExecutedCron.
 */
@Entity
@Table(name = "executed_cron")
@Data
@Accessors(chain = true)
@ToString(of = {"id", "cronType", "startBlock", "endBlock", "jobStartedAt", "jobEndedAt"})
@EqualsAndHashCode(of = "id")
public class ExecutedCron implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "executedCronSequenceGenerator")
    @SequenceGenerator(
        name = "executedCronSequenceGenerator",
        sequenceName = "executed_cron_sequence_generator",
        allocationSize = 1
    )
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "cron_type", nullable = false)
    private CronType cronType;

    @NotNull
    @Column(name = "start_block", nullable = false)
    private Long startBlock;

    @NotNull
    @Column(name = "end_block", nullable = false)
    private Long endBlock;

    @NotNull
    @Column(name = "job_started_at", nullable = false)
    private Instant jobStartedAt;

    @NotNull
    @Column(name = "job_ended_at", nullable = false)
    private Instant jobEndedAt;

}
