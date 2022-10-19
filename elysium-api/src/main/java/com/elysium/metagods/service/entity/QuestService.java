package com.elysium.metagods.service.entity;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.elysium.metagods.domain.Quest;
import com.elysium.metagods.repository.QuestRepository;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
public class QuestService {

    private final QuestRepository questRepository;

    public QuestService(QuestRepository questRepository) {
        this.questRepository = questRepository;
    }

    public List<Quest> findAll() {
        return questRepository.findAll();
    }
}
