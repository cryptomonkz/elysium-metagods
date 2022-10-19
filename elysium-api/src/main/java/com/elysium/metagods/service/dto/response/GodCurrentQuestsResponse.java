package com.elysium.metagods.service.dto.response;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import com.elysium.metagods.domain.enumeration.GodQuestStatus;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class GodCurrentQuestsResponse {

    private List<GodQuestResponse> currentQuests = new ArrayList<>();

    private List<GodQuestResponse> assignableQuests = new ArrayList<>();

    private List<GodQuestResponse> previousQuests = new ArrayList<>();

    public GodCurrentQuestsResponse(List<GodQuestResponse> godQuests) {
        this.currentQuests = filterQuestsByStatus(godQuests, GodQuestStatus.ASSIGNED);
        this.assignableQuests = filterQuestsByStatus(godQuests, GodQuestStatus.ASSIGNABLE);
        this.previousQuests = filterQuestsByStatus(godQuests, GodQuestStatus.FINISHED)
            .stream()
            .sorted(Comparator.comparing(GodQuestResponse::getPeriodNumber).reversed())
            .collect(Collectors.toList());
    }

    private List<GodQuestResponse> filterQuestsByStatus(List<GodQuestResponse> godQuests, GodQuestStatus assigned) {
        return godQuests.stream()
                        .filter(godQuest -> assigned.equals(godQuest.getStatus()))
                        .collect(Collectors.toList());
    }
}
