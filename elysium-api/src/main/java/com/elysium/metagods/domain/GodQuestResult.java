package com.elysium.metagods.domain;

import java.io.Serializable;
import javax.persistence.*;

import com.vladmihalcea.hibernate.type.json.JsonBinaryType;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

/**
 * A GodQuestResult.
 */
@Entity
@Table(name = "god_quest_result")
@Data
@Accessors(chain = true)
@EqualsAndHashCode(of = "id")
@TypeDef(name = "jsonb", typeClass = JsonBinaryType.class)
public class GodQuestResult implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private Long id;

    @Column(name = "is_successful", nullable = false)
    private Boolean isSuccessful;

    @Column(name = "points_gained", nullable = false)
    private Long pointsGained;

    @Type(type = "jsonb")
    @Column(name = "points_breakdown", columnDefinition = "jsonb")
    private GodQuestResultBreakdown pointsBreakdown;

    // jhipster-needle-entity-add-field - JHipster will add fields here

}
