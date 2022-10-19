package com.elysium.metagods.service.mapper;

import com.elysium.metagods.domain.StakedToken;
import com.elysium.metagods.service.dto.entity.StakedTokenDTO;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

/**
 * Mapper for the entity {@link StakedToken} and its DTO {@link StakedTokenDTO}.
 */
@Mapper(componentModel = "spring")
public interface StakedTokenMapper extends EntityMapper<StakedTokenDTO, StakedToken> {
    @Mapping(target = "pairedToken", source = "pairedToken", qualifiedByName = "stakedTokenId")
    StakedTokenDTO toDto(StakedToken s);

    @Named("stakedTokenId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    StakedTokenDTO toDtoStakedTokenId(StakedToken stakedToken);

}
