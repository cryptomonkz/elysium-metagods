package com.elysium.metagods.service.entity;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.elysium.metagods.domain.GodQuestResult;
import com.elysium.metagods.repository.GodQuestResultRepository;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
public class GodQuestResultService {

    private final GodQuestResultRepository godQuestResultRepository;


    public GodQuestResultService(GodQuestResultRepository godQuestResultRepository) {
        this.godQuestResultRepository = godQuestResultRepository;
    }

    public GodQuestResult save(GodQuestResult result) {
        return godQuestResultRepository.save(result);
    }
}
