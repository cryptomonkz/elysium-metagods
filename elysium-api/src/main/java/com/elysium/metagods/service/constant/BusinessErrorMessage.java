package com.elysium.metagods.service.constant;

public enum  BusinessErrorMessage {
    ;

    public static final String GOD_ALREADY_ENROLLED_ERROR_MESSAGE = "God %d is already enrolled";

    public static final String TOURNAMENT_NOT_OPEN_FOR_ENROLLMENT = "Tournament %d is not open for enrollment";

    public static final String COULD_NOT_CONFIRM_THE_OWNERSHIP_OF_TOKENS_MESSAGE =
        "Could not confirm the ownership of %s tokens";

    public static final String NOT_ENOUGH_FUNDS_ERROR_MESSAGE = "Not enough funds";

    public static final String INSUFFICIENT_AMOUNT_ERROR_MESSAGE = "Insufficient amount owned";

    public static final String OUT_OF_STOCK_ERROR_MESSAGE = "Out of stock";

    public static final String GIVEN_QUEST_NOT_ASSIGNABLE = "The given quest is not assignable";

    public static final String RECIPIENT_ADDRESS_DOES_NOT_HAVE_A_VALID_FORMAT_MESSAGE =
            "Recipient address does not have a valid format";

    public static final String MINIMUM_TRANSFER_AMOUNT_MESSAGE = "The minimum amount is 1 $GOD token";
}
