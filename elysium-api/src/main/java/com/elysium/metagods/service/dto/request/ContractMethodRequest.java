package com.elysium.metagods.service.dto.request;

import javax.validation.constraints.NotNull;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
public class ContractMethodRequest {

    @NotNull
    private String methodName;

    @NotNull
    private List methodArgs;

}
