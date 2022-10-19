package com.elysium.metagods.service.mapper;

import com.elysium.metagods.domain.GodQuestResult;
import com.elysium.metagods.service.dto.entity.GodQuestResultDTO;
import com.elysium.metagods.service.dto.response.GodQuestResultResponse;
import org.mapstruct.Mapper;

/**
 * Mapper for the entity {@link GodQuestResult} and its DTO {@link GodQuestResultDTO}.
 */
@Mapper(componentModel = "spring")
public interface GodQuestResultMapper extends EntityMapper<GodQuestResultDTO, GodQuestResult> {

    GodQuestResultResponse toResponseDto(GodQuestResult s);

}
