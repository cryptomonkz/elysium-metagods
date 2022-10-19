package com.elysium.metagods.service.mapper;

import com.elysium.metagods.domain.Tournament;
import com.elysium.metagods.service.dto.entity.TournamentDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Tournament} and its DTO {@link TournamentDTO}.
 */
@Mapper(componentModel = "spring")
public interface TournamentMapper extends EntityMapper<TournamentDTO, Tournament> {}
