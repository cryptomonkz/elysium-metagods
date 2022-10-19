package com.elysium.metagods.service.mapper;

import com.elysium.metagods.domain.TournamentLeaderboard;
import com.elysium.metagods.service.dto.TournamentLeaderboardDTO;
import org.mapstruct.Mapper;

/**
 * Mapper for the entity {@link TournamentLeaderboard} and its DTO {@link TournamentLeaderboardDTO}.
 */
@Mapper(componentModel = "spring")
public interface TournamentLeaderboardMapper extends EntityMapper<TournamentLeaderboardDTO, TournamentLeaderboard> {}
