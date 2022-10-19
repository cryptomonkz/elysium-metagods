package com.elysium.metagods.service.dto.response;

import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import com.elysium.metagods.domain.God;
import com.elysium.metagods.domain.StakedToken;
import com.elysium.metagods.service.dto.StakedTokenDetails;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@NoArgsConstructor
@Accessors(chain = true)
public class TournamentEnrollmentStatusResponse {

    private List<StakedTokenDetails> availableGods;

    private List<StakedTokenDetails> enrolledGods;

    public TournamentEnrollmentStatusResponse(
        @NotNull List<StakedToken> availableGods,
        @NotNull Set<God> enrolledGods
    ) {
        this.availableGods = StakedTokenDetails.fromStakedTokens(availableGods);
        this.enrolledGods = StakedTokenDetails.fromTokenWithTrait(new ArrayList<>(enrolledGods));
    }
}
