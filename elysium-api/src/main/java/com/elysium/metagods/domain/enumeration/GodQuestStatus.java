package com.elysium.metagods.domain.enumeration;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * The GodQuestStatus enumeration.
 */
@Getter
@AllArgsConstructor
public enum GodQuestStatus {
    ASSIGNABLE(true),
    ASSIGNED(true),
    DISMISSED(false),
    FINISHED(true);

    private final boolean displayableOnReport;

    public static List<GodQuestStatus> getDisplayableQuests() {
        return Arrays.stream(GodQuestStatus.values())
                     .filter(GodQuestStatus::isDisplayableOnReport)
                     .collect(Collectors.toList());
    }
}
