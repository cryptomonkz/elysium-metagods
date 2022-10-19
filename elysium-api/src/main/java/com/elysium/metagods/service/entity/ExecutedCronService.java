package com.elysium.metagods.service.entity;

import com.elysium.metagods.domain.ExecutedCron;
import com.elysium.metagods.domain.enumeration.BlockedAmountReason;
import com.elysium.metagods.domain.enumeration.CronType;
import com.elysium.metagods.repository.ExecutedCronRepository;
import com.elysium.metagods.service.connector.Web3ServiceConnector;
import com.elysium.metagods.service.dto.request.RequestWithBlockDetails;
import com.elysium.metagods.service.query.ExecutedCronQueryService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.constraints.NotNull;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.function.Consumer;
import java.util.function.Function;

/**
 * Service Implementation for managing {@link ExecutedCron}.
 */
@Slf4j
@Service
@AllArgsConstructor
public class ExecutedCronService {

    public enum Job {
        DEPOSIT_RECONCILIATION,
        WITHDRAW_RECONCILIATION,
        MINT_WEAPONS_RECONCILIATION,
        PROCESS_TOURNAMENT_QUESTS,
    }

    private final Web3ServiceConnector web3ServiceConnector;
    private final WalletService walletService;
    private final PendingTokenSpendingService withdrawalService;
    private final ExecutedCronRepository executedCronRepository;
    private final ExecutedCronQueryService executedCronQueryService;
    private final PendingTokenSpendingService pendingTokenSpendingService;

    private Long getNextBlockToQuery(@NotNull CronType cronType) {
        return executedCronQueryService
            .findLatestCron(cronType).map(ExecutedCron::getEndBlock)
            .map(endBlock -> endBlock + 1).orElse(0L);
    }

    private <T extends RequestWithBlockDetails> Optional<Long> getLastQueriedBlock(@NotNull List<T> requests) {
        return requests.stream().map(RequestWithBlockDetails::getBlockNumber).max(Long::compareTo);
    }

    private <T extends RequestWithBlockDetails> void executeJob(
        @NotNull CronType cronType,
        @NotNull Function<Long, List<T>> eventsFetcher,
        @NotNull Consumer<T> eventConsumer
    ) {
        Instant jobStartTime = Instant.now();
        Long retrieveEventsFromBlock = getNextBlockToQuery(cronType);
        List<T> requests = eventsFetcher.apply(retrieveEventsFromBlock);
        requests.forEach(eventConsumer);
        getLastQueriedBlock(requests).ifPresent(latestBlock -> executedCronRepository.save(new ExecutedCron()
            .setCronType(cronType)
            .setJobStartedAt(jobStartTime)
            .setJobEndedAt(Instant.now())
            .setStartBlock(retrieveEventsFromBlock)
            .setEndBlock(latestBlock)));
    }

    @Transactional
    public void triggerDepositReconciliation() {
        executeJob(
            CronType.DEPOSIT,
            web3ServiceConnector::getDepositRequests,
            walletService::handleDepositRequest
        );
    }

    @Transactional
    public void triggerWithdrawReconciliation() {
        executeJob(
            CronType.WITHDRAW,
            web3ServiceConnector::getWithdrawRequests,
            withdrawalService::handleWithdrawRequest
        );
        pendingTokenSpendingService.cancelExpiredSpendingRequests(BlockedAmountReason.WITHDRAW);
    }

    @Transactional
    public void triggerMintWeaponsReconciliation() {
        executeJob(
            CronType.MINT_WEAPONS,
            web3ServiceConnector::getMintWeaponsRequests,
            withdrawalService::handleMintWeaponsRequest
        );
        pendingTokenSpendingService.cancelExpiredSpendingRequests(BlockedAmountReason.MINT_WEAPONS);
    }

    @Async
    public void executeJobAsync(@NotNull Job job, @NotNull Runnable executor) {
        try {
            log.info("The {} job has started at {}", job.name(), Instant.now());
            executor.run();
            log.info("The {} job has ended at {}", job.name(), Instant.now());
        } catch (Exception exception) {
            log.error("The {} job encountered issues", job.name(), exception);
        }
    }

}
