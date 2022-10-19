package com.elysium.metagods.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.springframework.util.CollectionUtils;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.experimental.Accessors;

/**
 * A LootBox.
 */
@Entity
@Data
@Accessors(chain = true)
@Table(name = "loot_box")
@ToString(exclude = {"bundles", "items"})
@EqualsAndHashCode(exclude = {"bundles", "items"})
public class LootBox implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "lootBoxSequenceGenerator")
    @SequenceGenerator(
        name = "lootBoxSequenceGenerator",
        sequenceName = "loot_box_sequence_generator",
        allocationSize = 1
    )
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "image_url")
    private String imageUrl;

    @OneToMany(mappedBy = "lootBox")
    @JsonIgnoreProperties(value = { "lootBox" }, allowSetters = true)
    private Set<LootBoxBundle> bundles = new HashSet<>();

    @OneToMany(mappedBy = "lootBox")
    @JsonIgnoreProperties(value = { "erc20Item", "erc721Item", "erc1155Item", "lootBox" }, allowSetters = true)
    private Set<LootBoxItem> items = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Set<LootBoxItem> getAvailableItems() {
        if (CollectionUtils.isEmpty(items)) {
            return Collections.emptySet();
        }
        return items.stream()
                    .filter(item -> item.getAmountAvailable() > 0)
                    .collect(Collectors.toSet());
    }

}
