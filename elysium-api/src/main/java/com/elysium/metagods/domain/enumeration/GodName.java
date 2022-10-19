package com.elysium.metagods.domain.enumeration;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum GodName {
    APHRODITE("Aphrodite"),
    APOLLO("Apollo"),
    ARES("Ares"),
    ARTEMIS("Artemis"),
    ATHENA("Athena"),
    DEMETER("Demeter"),
    HADES("Hades"),
    HEPHAESTUS("Hephaestus"),
    HERA("Hera"),
    HERMES("Hermes"),
    POSEIDON("Poseidon"),
    ZEUS("Zeus"),
    UNKNOWN("Unknown");

    private final String displayName;
}
