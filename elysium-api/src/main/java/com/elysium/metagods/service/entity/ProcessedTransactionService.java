package com.elysium.metagods.service.entity;

import com.elysium.metagods.domain.ProcessedTransaction;
import com.elysium.metagods.domain.enumeration.ProcessingType;
import com.elysium.metagods.repository.ProcessedTransactionRepository;
import com.elysium.metagods.service.dto.request.RequestWithBlockDetails;
import com.elysium.metagods.service.query.ProcessedTransactionQueryService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.constraints.NotNull;
import java.util.function.Consumer;

/**
 * Service Implementation for managing {@link ProcessedTransaction}.
 */
@Slf4j
@Service
@Transactional
@AllArgsConstructor
public class ProcessedTransactionService {

    private final ProcessedTransactionRepository repository;
    private final ProcessedTransactionQueryService queryService;

    public <T extends RequestWithBlockDetails> void processTransactionIfNecessary(
        @NotNull ProcessingType type, @NotNull T request, @NotNull Consumer<T> executor
        ) {
        if (queryService.findProcessedTransaction(type, request.getTxnHash()).isEmpty()) {
            executor.accept(request);
            repository.save(new ProcessedTransaction().setProcessingType(type).setTxnHash(request.getTxnHash()));
        }
    }

}
