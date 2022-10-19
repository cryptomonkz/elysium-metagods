package com.elysium.metagods.service.dto.request;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@NoArgsConstructor
@Accessors(chain = true)
public class RecoverSignatureRequest {
    private Object data;
    private String signature;
}
