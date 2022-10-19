package com.elysium.metagods.service.dto;

import javax.validation.constraints.NotNull;

import com.elysium.metagods.domain.God;
import com.elysium.metagods.domain.GodTournamentEnrollment;
import com.elysium.metagods.domain.enumeration.GodTournamentStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
public class EnrolledGodDetails extends StakedTokenDetails {

    private Long totalPoints;

    private Long position;

    private Long successfulQuests;

    private Long weaponQuestBonus;

    private GodTournamentStatus godTournamentStatus;

    public static EnrolledGodDetails fromGodTournamentEnrollment(
        GodTournamentEnrollment godTournamentEnrollment,
        Long rank
    ) {
        @NotNull God god = godTournamentEnrollment.getGod();
        EnrolledGodDetails enrolledGodDetails = new EnrolledGodDetails();
        enrolledGodDetails.setFields(god);
        enrolledGodDetails.setTotalPoints(godTournamentEnrollment.getTotalPoints());
        enrolledGodDetails.setSuccessfulQuests(godTournamentEnrollment.getNumOfSuccessfulQuests());
        enrolledGodDetails.setGodTournamentStatus(godTournamentEnrollment.getGodTournamentStatus());
        enrolledGodDetails.setPosition(rank);
        if(god.isStaked() && god.getStakeData().isPaired()) {
            enrolledGodDetails.setWeaponQuestBonus(god.getStakeData().getPairedToken().getWeapon().getQuestBonus());
        }
        return enrolledGodDetails;
    }
}
