package com.elysium.metagods.service.mapper;

import com.elysium.metagods.domain.Quest;
import com.elysium.metagods.service.dto.entity.QuestDTO;
import com.elysium.metagods.service.dto.response.QuestResponse;
import org.mapstruct.Mapper;

/**
 * Mapper for the entity {@link Quest} and its DTO {@link QuestDTO}.
 */
@Mapper(componentModel = "spring")
public interface QuestMapper extends EntityMapper<QuestDTO, Quest> {

    QuestResponse toResponseDto(Quest s);
}
