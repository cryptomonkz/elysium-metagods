package com.elysium.metagods.helper;

import javax.validation.constraints.NotNull;
import java.security.SecureRandom;
import java.util.HashSet;
import java.util.Set;

import com.elysium.metagods.domain.enumeration.StakingMode;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class RandomHelper {

    public static SecureRandom getInitializedSecureRandom() {
        SecureRandom random = new SecureRandom();
        random.nextBytes(new byte[64]);
        return random;
    }

    public static long generateNonce(@NotNull SecureRandom secureRandom) {
        return getRandomNumber(secureRandom, 8);
    }

    public static boolean didGodWin(@NotNull SecureRandom secureRandom) {
        Long randomDigit = getRandomNumber(secureRandom, 1);
        return randomDigit % 2 == 0;
    }

    public static boolean isQuestSuccessful(
        @NotNull SecureRandom secureRandom,
        @NotNull Long successChance
    ) {
        Long randomNumber = getRandomNumber(secureRandom, 8);
        return randomNumber % 100 < successChance;
    }

    public static Set<Integer> getAssignableQuestsIndexes(
        SecureRandom secureRandom,
        int numberOfQuestsNecessary,
        int totalNumberOfQuests
    ) {
        if(numberOfQuestsNecessary > totalNumberOfQuests) {
            throw new IllegalArgumentException();
        }
        Set<Integer> chosenQuestsIndexes = new HashSet<>();
        while(chosenQuestsIndexes.size() < numberOfQuestsNecessary) {
            long newRandomIndex = getRandomNumber(secureRandom, 8) % totalNumberOfQuests;
            chosenQuestsIndexes.add((int) newRandomIndex);
        }
        return chosenQuestsIndexes;
    }

    public static Integer getQuestSuccessChance(
        SecureRandom secureRandom,
        StakingMode.QuestSuccessChanceInterval questSuccessChanceInterval
    ) {
        return getRandomNumberBetweenInterval(
            secureRandom,
            questSuccessChanceInterval.getMin(),
            questSuccessChanceInterval.getMax()
        );
    }

    private static Integer getRandomNumberBetweenInterval(SecureRandom secureRandom, Integer min, Integer max) {
        Long randomNumber = getRandomNumber(secureRandom, 8);
        long toBeAdded = randomNumber % (max - min + 1);
        return min + (int) toBeAdded;
    }

    public static Integer getRandomNumberBetweenInterval(Integer min, Integer max) {
        return getRandomNumberBetweenInterval(getInitializedSecureRandom(), min, max);
    }

    private static Long getRandomNumber(@NotNull SecureRandom secureRandom, int numberOfDigits) {
        return Long.parseLong(
            RandomStringUtils.random(
                numberOfDigits, 0, 0, false, true, null, secureRandom
            )
        );
    }
}
