package com.elysium.metagods.service.mapper;

import com.elysium.metagods.domain.GodQuest;
import com.elysium.metagods.domain.GodQuestResult;
import com.elysium.metagods.domain.GodTournamentEnrollment;
import com.elysium.metagods.domain.Quest;
import com.elysium.metagods.service.dto.entity.GodQuestDTO;
import com.elysium.metagods.service.dto.entity.GodQuestResultDTO;
import com.elysium.metagods.service.dto.entity.GodTournamentEnrollmentDTO;
import com.elysium.metagods.service.dto.entity.QuestDTO;
import com.elysium.metagods.service.dto.response.GodQuestResponse;
import org.mapstruct.*;

@Mapper(
    componentModel = "spring",
    uses = {QuestMapper.class, GodQuestResultMapper.class}
)
public interface GodQuestMapper extends EntityMapper<GodQuestDTO, GodQuest> {
    @Mapping(target = "result", source = "result", qualifiedByName = "godQuestResultId")
    @Mapping(target = "quest", source = "quest", qualifiedByName = "questId")
    @Mapping(target = "godEnrolled", source = "godEnrolled", qualifiedByName = "godTournamentEnrollmentId")
    GodQuestDTO toDto(GodQuest s);

    GodQuestResponse toResponseDto(GodQuest s);

    @Named("godQuestResultId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    GodQuestResultDTO toDtoGodQuestResultId(GodQuestResult godQuestResult);

    @Named("questId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    QuestDTO toDtoQuestId(Quest quest);

    @Named("godTournamentEnrollmentId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    GodTournamentEnrollmentDTO toDtoGodTournamentEnrollmentId(GodTournamentEnrollment godTournamentEnrollment);
}
