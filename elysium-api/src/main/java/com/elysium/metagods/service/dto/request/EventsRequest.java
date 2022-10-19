package com.elysium.metagods.service.dto.request;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@Accessors(chain = true)
public class EventsRequest {
    @NotNull
    private Long fromBlock;
}
