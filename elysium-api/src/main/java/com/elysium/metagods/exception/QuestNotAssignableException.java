package com.elysium.metagods.exception;

import static com.elysium.metagods.service.constant.BusinessErrorMessage.GIVEN_QUEST_NOT_ASSIGNABLE;

@SuppressWarnings("unused")
public class QuestNotAssignableException extends InvalidRequestException {

    public QuestNotAssignableException() {
        super(GIVEN_QUEST_NOT_ASSIGNABLE);
    }
}

