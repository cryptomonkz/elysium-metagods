package com.elysium.metagods.service.query;

import com.elysium.metagods.domain.*;
import com.elysium.metagods.service.criteria.*;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.From;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Root;
import java.util.function.Function;

import static com.elysium.metagods.helper.JoinHelper.join;

@SuppressWarnings({"java:S2259", "java:S119", "java:S3776"})
public abstract class SpecificationService<ENTITY> extends CustomQueryService<ENTITY> {

    protected <T> Specification<ENTITY> buildGodSpecification(
        Function<Root<ENTITY>, From<T, God>> pathExtractor, GodCriteria criteria
    ) {
        Specification<ENTITY> specification = Specification.where(null);
        if (criteria == null) {
            return specification;
        }
        if (criteria.getDistinct() != null) {
            specification = specification.and(distinct(criteria.getDistinct()));
        }
        if (criteria.getId() != null) {
            specification = specification.and(buildSpecification(
                criteria.getId(), root -> pathExtractor.apply(root).get(God_.id)
            ));
        }
        if (criteria.getTrait() != null) {
            specification = specification.and(buildSpecification(
                criteria.getTrait(), root -> pathExtractor.apply(root).get(God_.trait)
            ));
        }
        return specification;
    }

    protected <T> Specification<ENTITY> buildGodSpecificationWithDependencies(
        Function<Root<ENTITY>, From<T, God>> pathExtractor, GodCriteria criteria
    ) {
        Specification<ENTITY> specification = buildGodSpecification(pathExtractor, criteria);
        if (criteria == null) {
            return specification;
        }
        if (criteria.getStakeData() != null) {
            specification = specification.and(buildStakedTokenSpecification(
                root -> join(pathExtractor.apply(root), God_.stakeData, JoinType.INNER),
                criteria.getStakeData()
            ));
        }
        if (criteria.getOwner() != null) {
            specification = specification.and(buildWalletSpecification(
                root -> join(pathExtractor.apply(root), God_.owner, JoinType.INNER),
                criteria.getOwner()
            ));
        }
        return specification;
    }

    protected <T> Specification<ENTITY> buildWeaponSpecification(
        Function<Root<ENTITY>, From<T, Weapon>> pathExtractor, WeaponCriteria criteria
    ) {
        Specification<ENTITY> specification = Specification.where(null);
        if (criteria == null) {
            return specification;
        }
        if (criteria.getDistinct() != null) {
            specification = specification.and(distinct(criteria.getDistinct()));
        }
        if (criteria.getId() != null) {
            specification = specification.and(buildSpecification(
                criteria.getId(), root -> pathExtractor.apply(root).get(Weapon_.id)
            ));
        }
        if (criteria.getTrait() != null) {
            specification = specification.and(buildSpecification(
                criteria.getTrait(), root -> pathExtractor.apply(root).get(Weapon_.trait)
            ));
        }
        return specification;
    }

    protected <T> Specification<ENTITY> buildWeaponSpecificationWithDependencies(
        Function<Root<ENTITY>, From<T, Weapon>> pathExtractor, WeaponCriteria criteria
    ) {
        Specification<ENTITY> specification = buildWeaponSpecification(pathExtractor, criteria);
        if (criteria == null) {
            return specification;
        }
        if (criteria.getStakeData() != null) {
            specification = specification.and(buildStakedTokenSpecification(
                root -> join(pathExtractor.apply(root), Weapon_.stakeData, JoinType.INNER),
                criteria.getStakeData()
            ));
        }
        if (criteria.getOwner() != null) {
            specification = specification.and(buildWalletSpecification(
                root -> join(pathExtractor.apply(root), Weapon_.owner, JoinType.INNER),
                criteria.getOwner()
            ));
        }
        return specification;
    }

    protected <T> Specification<ENTITY> buildWalletSpecification(
        Function<Root<ENTITY>, From<T, Wallet>> pathExtractor, WalletCriteria criteria
    ) {
        Specification<ENTITY> specification = Specification.where(null);
        if (criteria == null) {
            return specification;
        }
        if (criteria.getDistinct() != null) {
            specification = specification.and(distinct(criteria.getDistinct()));
        }
        if (criteria.getId() != null) {
            specification = specification.and(buildSpecification(
                criteria.getId(), root -> pathExtractor.apply(root).get(Wallet_.id)
            ));
        }
        if (criteria.getAddress() != null) {
            specification = specification.and(buildSpecification(
                criteria.getAddress(), root -> pathExtractor.apply(root).get(Wallet_.address)
            ));
        }
        if (criteria.getNickname() != null) {
            specification = specification.and(buildSpecification(
                criteria.getNickname(), root -> pathExtractor.apply(root).get(Wallet_.nickname)
            ));
        }
        if (criteria.getTokenBalance() != null) {
            specification = specification.and(buildSpecification(
                criteria.getTokenBalance(), root -> pathExtractor.apply(root).get(Wallet_.tokenBalance)
            ));
        }
        if (criteria.getNonce() != null) {
            specification = specification.and(buildSpecification(
                criteria.getNonce(), root -> pathExtractor.apply(root).get(Wallet_.nonce)
            ));
        }
        if (criteria.getNonceGenerationDate() != null) {
            specification = specification.and(buildSpecification(
                criteria.getNonceGenerationDate(), root -> pathExtractor.apply(root).get(Wallet_.nonceGenerationDate)
            ));
        }
        return specification;
    }

    protected <T> Specification<ENTITY> buildStakedTokenSpecification(
        Function<Root<ENTITY>, From<T, StakedToken>> pathExtractor, StakedTokenCriteria criteria
    ) {
        Specification<ENTITY> specification = Specification.where(null);
        if (criteria == null) {
            return specification;
        }
        if (criteria.getDistinct() != null) {
            specification = specification.and(distinct(criteria.getDistinct()));
        }
        if (criteria.getId() != null) {
            specification = specification.and(buildSpecification(
                criteria.getId(), root -> pathExtractor.apply(root).get(StakedToken_.id)
            ));
        }
        if (criteria.getMode() != null) {
            specification = specification.and(buildSpecification(
                criteria.getMode(), root -> pathExtractor.apply(root).get(StakedToken_.mode)
            ));
        }
        if (criteria.getLastClaimedOn() != null) {
            specification = specification.and(buildSpecification(
                criteria.getLastClaimedOn(), root -> pathExtractor.apply(root).get(StakedToken_.lastClaimedOn)
            ));
        }
        return specification;
    }

    protected <T> Specification<ENTITY> buildBlockedAmountSpecification(
        Function<Root<ENTITY>, From<T, BlockedAmount>> pathExtractor, BlockedAmountCriteria criteria
    ) {
        Specification<ENTITY> specification = Specification.where(null);
        if (criteria == null) {
            return specification;
        }
        if (criteria.getDistinct() != null) {
            specification = specification.and(distinct(criteria.getDistinct()));
        }
        if (criteria.getId() != null) {
            specification = specification.and(buildSpecification(
                criteria.getId(), root -> pathExtractor.apply(root).get(BlockedAmount_.id)
            ));
        }
        if (criteria.getAmount() != null) {
            specification = specification.and(buildSpecification(
                criteria.getAmount(), root -> pathExtractor.apply(root).get(BlockedAmount_.amount)
            ));
        }
        if (criteria.getReason() != null) {
            specification = specification.and(buildSpecification(
                criteria.getReason(), root -> pathExtractor.apply(root).get(BlockedAmount_.reason)
            ));
        }
        return specification;
    }

    protected <T> Specification<ENTITY> buildPendingWithdrawalSpecification(
            Function<Root<ENTITY>, From<T, PendingTokenSpending>> pathExtractor, PendingTokenSpendingCriteria criteria
    ) {
        Specification<ENTITY> specification = Specification.where(null);
        if (criteria == null) {
            return specification;
        }
        if (criteria.getDistinct() != null) {
            specification = specification.and(distinct(criteria.getDistinct()));
        }
        if (criteria.getId() != null) {
            specification = specification.and(buildSpecification(
                criteria.getId(), root -> pathExtractor.apply(root).get(PendingTokenSpending_.id)
            ));
        }
        if (criteria.getGenerationDate() != null) {
            specification = specification.and(buildSpecification(
                criteria.getGenerationDate(), root -> pathExtractor.apply(root).get(PendingTokenSpending_.generationDate)
            ));
        }
        return specification;
    }

    protected <T> Specification<ENTITY> buildExecutedCronSpecification(
        Function<Root<ENTITY>, From<T, ExecutedCron>> pathExtractor, ExecutedCronCriteria criteria
    ) {
        Specification<ENTITY> specification = Specification.where(null);
        if (criteria == null) {
            return specification;
        }
        if (criteria.getDistinct() != null) {
            specification = specification.and(distinct(criteria.getDistinct()));
        }
        if (criteria.getId() != null) {
            specification = specification.and(buildSpecification(
                criteria.getId(), root -> pathExtractor.apply(root).get(ExecutedCron_.id)
            ));
        }
        if (criteria.getCronType() != null) {
            specification = specification.and(buildSpecification(
                criteria.getCronType(), root -> pathExtractor.apply(root).get(ExecutedCron_.cronType)
            ));
        }
        if (criteria.getStartBlock() != null) {
            specification = specification.and(buildSpecification(
                criteria.getStartBlock(), root -> pathExtractor.apply(root).get(ExecutedCron_.startBlock)
            ));
        }
        if (criteria.getEndBlock() != null) {
            specification = specification.and(buildSpecification(
                criteria.getEndBlock(), root -> pathExtractor.apply(root).get(ExecutedCron_.endBlock)
            ));
        }
        if (criteria.getJobStartedAt() != null) {
            specification = specification.and(buildSpecification(
                criteria.getJobStartedAt(), root -> pathExtractor.apply(root).get(ExecutedCron_.jobStartedAt)
            ));
        }
        if (criteria.getJobEndedAt() != null) {
            specification = specification.and(buildSpecification(
                criteria.getJobEndedAt(), root -> pathExtractor.apply(root).get(ExecutedCron_.jobEndedAt)
            ));
        }
        return specification;
    }

    protected <T> Specification<ENTITY> buildProcessedTransactionSpecification(
        Function<Root<ENTITY>, From<T, ProcessedTransaction>> pathExtractor,
        ProcessedTransactionCriteria criteria
    ) {
        Specification<ENTITY> specification = Specification.where(null);
        if (criteria == null) {
            return specification;
        }
        if (criteria.getDistinct() != null) {
            specification = specification.and(distinct(criteria.getDistinct()));
        }
        if (criteria.getId() != null) {
            specification = specification.and(buildSpecification(
                criteria.getId(), root -> pathExtractor.apply(root).get(ProcessedTransaction_.id)
            ));
        }
        if (criteria.getProcessingType() != null) {
            specification = specification.and(buildSpecification(
                criteria.getProcessingType(), root -> pathExtractor.apply(root).get(ProcessedTransaction_.processingType)
            ));
        }
        if (criteria.getTxnHash() != null) {
            specification = specification.and(buildSpecification(
                criteria.getTxnHash(), root -> pathExtractor.apply(root).get(ProcessedTransaction_.txnHash)
            ));
        }
        return specification;
    }


    protected <T> Specification<ENTITY> buildGodTournamentEnrollmentSpecification(
        Function<Root<ENTITY>, From<T, GodTournamentEnrollment>> pathExtractor,
        GodTournamentEnrollmentCriteria criteria
    ) {
        Specification<ENTITY> specification = Specification.where(null);
        if (criteria == null) {
            return specification;
        }
        if (criteria.getDistinct() != null) {
            specification = specification.and(distinct(criteria.getDistinct()));
        }
        if (criteria.getId() != null) {
            specification = specification.and(
                buildSpecification(
                    criteria.getId(),
                    root -> pathExtractor.apply(root).get(GodTournamentEnrollment_.id)
                )
            );
        }
        if (criteria.getTotalPoints() != null) {
            specification = specification.and(
                buildSpecification(
                    criteria.getId(),
                    root -> pathExtractor.apply(root).get(GodTournamentEnrollment_.totalPoints)
                )
            );
        }

        return specification;
    }

    protected <T> Specification<ENTITY> buildGodTournamentEnrollmentSpecificationWithDependencies(
        Function<Root<ENTITY>, From<T, GodTournamentEnrollment>> pathExtractor,
        GodTournamentEnrollmentCriteria criteria
    ) {
        Specification<ENTITY> specification = buildGodTournamentEnrollmentSpecification(pathExtractor, criteria);
        if (criteria != null) {
            if (criteria.getGod() != null) {
                specification = specification.and(buildGodSpecificationWithDependencies(
                    root -> join(pathExtractor.apply(root), GodTournamentEnrollment_.god, JoinType.INNER),
                    criteria.getGod()
                ));
            }
            if (criteria.getTournament() != null) {
                specification = specification.and(buildTournamentSpecification(
                    root -> join(pathExtractor.apply(root), GodTournamentEnrollment_.tournament, JoinType.INNER),
                    criteria.getTournament()
                ));
            }
        }
        return specification;
    }

    protected <T> Specification<ENTITY> buildTournamentSpecification(
        Function<Root<ENTITY>, From<T, Tournament>> pathExtractor,
        TournamentCriteria criteria
    ) {
        Specification<ENTITY> specification = Specification.where(null);
        if (criteria == null) {
            return specification;
        }
        // This has to be called first, because the distinct method returns null
        if (criteria.getDistinct() != null) {
            specification = specification.and(distinct(criteria.getDistinct()));
        }
        if (criteria.getId() != null) {
            specification = specification.and(
                buildSpecification(
                    criteria.getId(),
                    root -> pathExtractor.apply(root).get(Tournament_.id)
                )
            );
        }
        if (criteria.getEnrollmentStartTime() != null) {
            specification = specification.and(
                buildSpecification(
                    criteria.getEnrollmentStartTime(),
                    root -> pathExtractor.apply(root).get(Tournament_.enrollmentStartTime)
                )
            );
        }
        if (criteria.getEnrollmentEndTime() != null) {
            specification = specification.and(
                buildSpecification(
                    criteria.getEnrollmentEndTime(),
                    root -> pathExtractor.apply(root).get(Tournament_.enrollmentEndTime)
                )
            );
        }
        if (criteria.getTournamentStartTime() != null) {
            specification = specification.and(
                buildSpecification(
                    criteria.getTournamentStartTime(),
                    root -> pathExtractor.apply(root).get(Tournament_.tournamentStartTime)
                )
            );
        }
        if (criteria.getTournamentEndTime() != null) {
            specification = specification.and(
                buildSpecification(
                    criteria.getTournamentEndTime(),
                    root -> pathExtractor.apply(root).get(Tournament_.tournamentEndTime)
                )
            );
        }
        if (criteria.getEnrollmentFee() != null) {
            specification = specification.and(
                buildSpecification(
                    criteria.getEnrollmentFee(),
                    root -> pathExtractor.apply(root).get(Tournament_.enrollmentFee)
                )
            );
        }
        if (criteria.getTotalFeesCollected() != null) {
            specification = specification.and(
                buildSpecification(
                    criteria.getTotalFeesCollected(),
                    root -> pathExtractor.apply(root).get(Tournament_.totalFeesCollected)
                )
            );
        }
        return specification;
    }


    protected <T> Specification<ENTITY> buildGodQuestSpecification(
        Function<Root<ENTITY>, From<T, GodQuest>> pathExtractor,
        GodQuestCriteria criteria
    ) {
        Specification<ENTITY> specification = Specification.where(null);
        if (criteria == null) {
            return specification;
        }
        if (criteria.getDistinct() != null) {
            specification = specification.and(distinct(criteria.getDistinct()));
        }
        if (criteria.getId() != null) {
            specification = specification.and(
                buildSpecification(
                    criteria.getId(),
                    root -> pathExtractor.apply(root).get(GodQuest_.id)
                )
            );
        }
        if (criteria.getStatus() != null) {
            specification = specification.and(
                buildSpecification(
                    criteria.getStatus(),
                    root -> pathExtractor.apply(root).get(GodQuest_.status)
                )
            );
        }
        if (criteria.getPeriodNumber() != null) {
            specification = specification.and(
                buildSpecification(
                    criteria.getPeriodNumber(),
                    root -> pathExtractor.apply(root).get(GodQuest_.periodNumber)
                )
            );
        }
        if (criteria.getResultId() != null) {
            specification = specification.and(
                buildSpecification(
                    criteria.getResultId(),
                    root -> join(pathExtractor.apply(root), GodQuest_.result, JoinType.INNER).get(GodQuestResult_.id)
                )
            );
        }
        if (criteria.getQuestId() != null) {
            specification = specification.and(
                buildSpecification(
                    criteria.getQuestId(),
                    root -> join(pathExtractor.apply(root), GodQuest_.quest, JoinType.INNER).get(Quest_.id)
                )
            );
        }
        return specification;
    }

    protected <T> Specification<ENTITY> buildLootBoxOwnedSpecification(
        Function<Root<ENTITY>, From<T, LootBoxOwned>> pathExtractor,
        LootBoxOwnedCriteria criteria
    ) {
        Specification<ENTITY> specification = Specification.where(null);
        if (criteria == null) {
            return specification;
        }
        if (criteria.getDistinct() != null) {
            specification = specification.and(distinct(criteria.getDistinct()));
        }
        if (criteria.getId() != null) {
            specification = specification.and(
                buildSpecification(
                    criteria.getId(),
                    root -> pathExtractor.apply(root).get(LootBoxOwned_.id)
                )
            );
        }
        if (criteria.getAmount() != null) {
            specification = specification.and(
                buildSpecification(
                    criteria.getAmount(),
                    root -> pathExtractor.apply(root).get(LootBoxOwned_.amount)
                )
            );
        }
        if (criteria.getLootBoxId() != null) {
            specification =
                specification.and(
                    buildSpecification(
                        criteria.getLootBoxId(),
                        root -> join(pathExtractor.apply(root), LootBoxOwned_.lootBox, JoinType.INNER).get(LootBox_.id)
                    )
                );
        }
        if (criteria.getOwner() != null) {
            specification = specification.and(buildWalletSpecification(
                root -> join(pathExtractor.apply(root), LootBoxOwned_.owner, JoinType.INNER),
                criteria.getOwner()
            ));
        }
        return specification;
    }

}
