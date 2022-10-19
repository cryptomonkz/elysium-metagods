package com.elysium.metagods.service.mapper;

import com.elysium.metagods.domain.GodTournamentEnrollment;
import com.elysium.metagods.service.dto.entity.GodTournamentEnrollmentDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * Mapper for the entity {@link GodTournamentEnrollment} and its DTO {@link GodTournamentEnrollmentDTO}.
 */
@Mapper(componentModel = "spring")
public interface GodTournamentEnrollmentMapper extends EntityMapper<GodTournamentEnrollmentDTO, GodTournamentEnrollment> {

    GodTournamentEnrollmentDTO toDto(GodTournamentEnrollment s);
}
