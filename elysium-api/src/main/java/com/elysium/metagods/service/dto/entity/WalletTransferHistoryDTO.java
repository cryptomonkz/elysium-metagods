package com.elysium.metagods.service.dto.entity;

import java.io.Serializable;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class WalletTransferHistoryDTO implements Serializable {

    private Long id;

    private String fromAddress;

    private String toAddress;

    private Long amount;

}
