package com.elysium.metagods.service;

import javax.validation.Valid;
import java.security.SecureRandom;
import java.time.Instant;
import java.util.Comparator;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.elysium.metagods.config.ApplicationConfigurationConstant.TOURNAMENT_NUMBER_OF_ASSIGNABLE_QUESTS;
import static com.elysium.metagods.config.ApplicationConfigurationConstant.TOURNAMENT_QUEST_STREAK_BONUS_PERCENTAGE;
import static com.elysium.metagods.service.entity.ExecutedCronService.Job.PROCESS_TOURNAMENT_QUESTS;

import com.elysium.metagods.domain.God;
import com.elysium.metagods.domain.GodQuest;
import com.elysium.metagods.domain.GodQuestResult;
import com.elysium.metagods.domain.GodQuestResultBreakdown;
import com.elysium.metagods.domain.GodTournamentEnrollment;
import com.elysium.metagods.domain.Quest;
import com.elysium.metagods.domain.Tournament;
import com.elysium.metagods.domain.enumeration.GodQuestStatus;
import com.elysium.metagods.domain.enumeration.StakingMode;
import com.elysium.metagods.exception.InvalidRequestException;
import com.elysium.metagods.exception.QuestNotAssignableException;
import com.elysium.metagods.exception.ServerErrorException;
import com.elysium.metagods.helper.RandomHelper;
import com.elysium.metagods.service.criteria.GodQuestCriteria;
import com.elysium.metagods.service.dto.request.AssignQuestToGodRequest;
import com.elysium.metagods.service.dto.response.GodCurrentQuestsResponse;
import com.elysium.metagods.service.dto.response.GodQuestResponse;
import com.elysium.metagods.service.dto.response.TournamentNextQuestsAssignationResponse;
import com.elysium.metagods.service.entity.GodQuestService;
import com.elysium.metagods.service.entity.GodTournamentEnrollmentService;
import com.elysium.metagods.service.entity.QuestService;
import com.elysium.metagods.service.entity.TournamentService;
import com.elysium.metagods.service.mapper.GodQuestMapper;
import com.elysium.metagods.service.query.GodQuestQueryService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@AllArgsConstructor
public class TournamentQuestService {

    private static final SecureRandom QUEST_RESULT_SECURE_RANDOM = RandomHelper.getInitializedSecureRandom();

    private static final SecureRandom QUEST_ASSIGNABLE_SECURE_RANDOM = RandomHelper.getInitializedSecureRandom();

    private static final SecureRandom QUEST_SUCCESS_CHANCE_SECURE_RANDOM = RandomHelper.getInitializedSecureRandom();

    private final TournamentService tournamentService;

    private final GodQuestService godQuestService;

    private final GodQuestMapper godQuestMapper;

    private final GodQuestQueryService godQuestQueryService;

    private final GodTournamentEnrollmentService godTournamentEnrollmentService;

    private final QuestService questService;


    @Transactional(readOnly = true)
    public GodCurrentQuestsResponse getGodQuests(Long godId) {

        Tournament tournament = tournamentService.findActiveTournamentOrThrow();

        GodQuestCriteria currentQuestsCriteria = GodQuestQueryService
            .getCurrentGodQuestsCriteria(godId, tournament.getId());

        List<GodQuestResponse> quests = godQuestQueryService
            .findByCriteria(currentQuestsCriteria)
            .stream()
            .map(godQuestMapper::toResponseDto)
            .collect(Collectors.toList());

        return new GodCurrentQuestsResponse(quests);
    }

    public void assignQuest(@Valid AssignQuestToGodRequest body) {

        Tournament tournament = tournamentService.findActiveTournamentOrThrow();

        GodQuestCriteria currentQuestsCriteria = GodQuestQueryService
            .getCurrentAssignableGodQuestsCriteria(body.getGodId(), tournament.getId());

        List<GodQuest> assignableQuests = godQuestQueryService.findByCriteria(currentQuestsCriteria);

        GodQuest chosenQuest = assignableQuests.stream()
                        .filter(godQuest -> body.getQuestId().equals(godQuest.getId()))
                        .findFirst()
                        .orElseThrow(QuestNotAssignableException::new);

        if (!chosenQuest.getPeriodNumber().equals(tournament.getCurrentQuestPeriodNumber())) {
            log.error(
                "The quest cannot be assigned due to period number. GodQuest {} with period {}, Current {}",
                chosenQuest.getId(),
                chosenQuest.getPeriodNumber(),
                tournament.getCurrentQuestPeriodNumber()
            );
            throw new InvalidRequestException("The quest cannot be assigned anymore");
        }

        chosenQuest.setStatus(GodQuestStatus.ASSIGNED);

        assignableQuests.stream()
                        .filter(godQuest -> !body.getQuestId().equals(godQuest.getId()))
                        .forEach(godQuest -> godQuest.setStatus(GodQuestStatus.DISMISSED));

        godQuestService.saveAll(assignableQuests);
    }

    public void processQuestResultsBeforePeriodNumber(Long tournamentId, long currentQuestPeriodNumber) {
        GodQuestCriteria criteria =
            GodQuestQueryService.getAssignedQuestsBeforePeriodNumber(tournamentId, currentQuestPeriodNumber);

        List<GodQuest> questsToBeProcessed = godQuestQueryService.findByCriteria(criteria);

        log.info("{}: There are {} quests to be processed", PROCESS_TOURNAMENT_QUESTS, questsToBeProcessed.size());

        for (GodQuest godQuest : questsToBeProcessed) {
            processGodQuestResult(godQuest);
        }
    }

    public void distributeNewQuestsForPeriodNumber(Long tournamentId, long currentQuestPeriodNumber) {
        List<GodTournamentEnrollment> enrolledGodsStillStaked = godTournamentEnrollmentService
            .findAllByTournamentId(tournamentId)
            .stream()
            .filter(godTournamentEnrollment -> godTournamentEnrollment.getGod().isStaked())
            .collect(Collectors.toList());

        log.info("{}: Distributing quests for {} gods", PROCESS_TOURNAMENT_QUESTS, enrolledGodsStillStaked.size());

        Map<StakingMode, List<Quest>> questPoolByStakingMode = questService
            .findAll()
            .stream()
            .collect(Collectors.groupingBy(Quest::getStakingMode));

        for (GodTournamentEnrollment enrolledGod : enrolledGodsStillStaked) {
            StakingMode stakingMode = enrolledGod.getGod().getStakeData().getMode();
            List<Quest> questPoolForGod = Optional
                .ofNullable(questPoolByStakingMode.get(stakingMode))
                .orElseThrow(() -> new ServerErrorException(
                    "Could not find assignable quests for staking mode " + stakingMode
                ));
            giveAssignableQuests(
                enrolledGod,
                currentQuestPeriodNumber,
                questPoolForGod
            );
        }
    }

    public TournamentNextQuestsAssignationResponse getNextQuestAssignation() {
        Tournament tournament = tournamentService.findActiveTournamentOrThrow();

        Instant nextQuestsAssignation = tournament
            .getTournamentStartTime()
            .plusSeconds(
                tournament.getQuestsAssigningFrequency().getSeconds() *
                (tournament.getCurrentQuestPeriodNumber())
            );

        boolean currentQuestsDistributed;
        if (Instant.now().isBefore(tournament.getTournamentEndTime())) {
            long numberOfQuestsDistributedForCurrentPeriodNumber =
                godQuestService.countQuestsByTournamentAndPeriodNumber(
                    tournament,
                    tournament.getCurrentQuestPeriodNumber()
                );
            currentQuestsDistributed = numberOfQuestsDistributedForCurrentPeriodNumber > 0;
        } else {
            long numberOfQuestsStillAssigned = godQuestService
                .countQuestsByTournamentAndStatusIn(
                    tournament,
                    List.of(GodQuestStatus.ASSIGNED, GodQuestStatus.ASSIGNABLE)
                );
            currentQuestsDistributed = numberOfQuestsStillAssigned == 0;
        }

        return new TournamentNextQuestsAssignationResponse(nextQuestsAssignation, currentQuestsDistributed);
    }

    private void giveAssignableQuests(
        GodTournamentEnrollment enrolledGod,
        long currentQuestPeriodNumber,
        List<Quest> questPool
    ) {
        Set<Integer> pickedQuestsIndexes = RandomHelper.getAssignableQuestsIndexes(
            QUEST_ASSIGNABLE_SECURE_RANDOM,
            TOURNAMENT_NUMBER_OF_ASSIGNABLE_QUESTS,
            questPool.size()
        );

        List<Quest> pickedQuests = pickedQuestsIndexes
            .stream()
            .map(questPool::get)
            .collect(Collectors.toList());

        List<GodQuest> newAssignableQuests = pickedQuests
            .stream()
            .map(quest -> createNewGodQuest(enrolledGod, currentQuestPeriodNumber, quest))
            .collect(Collectors.toList());

        godQuestService.saveAll(newAssignableQuests);
    }

    private GodQuest createNewGodQuest(
        GodTournamentEnrollment enrolledGod,
        long currentQuestPeriodNumber,
        Quest quest
    ) {
        return new GodQuest()
            .setQuest(quest)
            .setStatus(GodQuestStatus.ASSIGNABLE)
            .setPeriodNumber(currentQuestPeriodNumber)
            .setGodEnrolled(enrolledGod)
            .setSuccessChance(
                RandomHelper.getQuestSuccessChance(
                    QUEST_SUCCESS_CHANCE_SECURE_RANDOM,
                    quest.getStakingMode().getQuestSuccessChanceInterval()
                )
            );
    }

    private void processGodQuestResult(GodQuest godQuest) {
        boolean isQuestSuccessful = RandomHelper.isQuestSuccessful(
            QUEST_RESULT_SECURE_RANDOM,
            godQuest.getSuccessChance().longValue()
        );

        GodQuestResult godQuestResult = new GodQuestResult()
            .setId(godQuest.getId())
            .setIsSuccessful(isQuestSuccessful);
        if(isQuestSuccessful) {
            GodQuestResultBreakdown resultBreakdown = calculateGodQuestResultBreakdown(godQuest);
            godQuestResult.setPointsBreakdown(resultBreakdown);
            godQuestResult.setPointsGained(resultBreakdown.getTotal());
            godTournamentEnrollmentService.addPoints(
                godQuest.getGodEnrolled().getId(),
                resultBreakdown.getTotal()
            );
        } else {
            godQuestResult.setPointsGained(0L);
        }
        godQuest.setResult(godQuestResult);
        godQuest.setStatus(GodQuestStatus.FINISHED);

        godQuestService.save(godQuest);
    }

    private GodQuestResultBreakdown calculateGodQuestResultBreakdown(GodQuest godQuest) {
        GodQuestResultBreakdown godQuestResultBreakdown = new GodQuestResultBreakdown();
        godQuestResultBreakdown.setBasePoints(godQuest.getGodEnrolled().getTournament().getBaseQuestPointsReward());
        godQuestResultBreakdown.setRelicBonus(godQuest.getGodEnrolled().getGod().getTrait().getGodQuestBonus());
        godQuestResultBreakdown.setSuitedGodBonus(calculateSuitedBonus(godQuest));
        godQuestResultBreakdown.setSuccessChainBonus(calculateSuccessChainBonus(godQuest));
        godQuestResultBreakdown.setRiskBonus(calculateRiskBonus(godQuest));
        godQuestResultBreakdown.setWeaponBonus(calculateWeaponBonus(godQuest));
        godQuestResultBreakdown.setPrimordialBonus(calculatePrimordialBonus(godQuest));
        return godQuestResultBreakdown;
    }

    private Long calculateSuitedBonus(GodQuest godQuest) {
        Tournament tournament = godQuest.getGodEnrolled().getTournament();
        long bonusPercentage = 0;
        if (godQuest.getQuest().isWellSuited(godQuest.getGodEnrolled().getGod())) {
            bonusPercentage = tournament.getQuestWellSuitedGodBonusPercentage();
        } else if (godQuest.getQuest().isPartiallySuited(godQuest.getGodEnrolled().getGod())) {
            bonusPercentage = tournament.getQuestPartiallySuitedGodBonusPercentage();
        }
        return tournament.getBaseQuestPointsReward() * bonusPercentage / 100;
    }

    private Long calculateSuccessChainBonus(GodQuest godQuest) {
        List<GodQuest> previousQuests = godQuest
            .getGodEnrolled()
            .getQuestsAssigned()
            .stream()
            .filter(gq -> GodQuestStatus.FINISHED.equals(gq.getStatus()))
            .filter(gq -> gq.getPeriodNumber() < godQuest.getPeriodNumber())
            .sorted(Comparator.comparing(GodQuest::getPeriodNumber).reversed())
            .collect(Collectors.toList());

        int numberOfSuccessfulQuestsStreak = 0;
        Iterator<GodQuest> previousQuestsIterator = previousQuests.iterator();
        while(previousQuestsIterator.hasNext() && previousQuestsIterator.next().getResult().getIsSuccessful()) {
            numberOfSuccessfulQuestsStreak++;
        }

        long successQuestStreakBonusPercentage = numberOfSuccessfulQuestsStreak *
                                                 TOURNAMENT_QUEST_STREAK_BONUS_PERCENTAGE;
        return godQuest.getGodEnrolled().getTournament().getBaseQuestPointsReward()
               * successQuestStreakBonusPercentage
               / 100;
    }

    private Long calculateRiskBonus(GodQuest godQuest) {
        return godQuest.getGodEnrolled().getTournament().getBaseQuestPointsReward() * godQuest.getRiskBonus() / 100;
    }

    private Long calculateWeaponBonus(GodQuest godQuest) {
        God god = godQuest.getGodEnrolled().getGod();
        if (god.isStaked() && god.getStakeData().isPaired()) {
            return godQuest.getGodEnrolled().getTournament().getBaseQuestPointsReward() *
                   god.getStakeData().getPairedToken().getWeapon().getQuestBonus() /
                   100;
        }
        return 0L;
    }

    private Long calculatePrimordialBonus(GodQuest godQuest) {
        if(godQuest.getGodEnrolled().getGod().getOwner().getPrimordial()) {
            return godQuest.getGodEnrolled().getTournament().getQuestPrimordialBonus();
        }
        return 0L;
    }
}
