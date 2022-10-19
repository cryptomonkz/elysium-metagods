package com.elysium.metagods.service.entity;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.elysium.metagods.domain.LootBoxRewardHistoryPool;
import com.elysium.metagods.repository.LootBoxRewardHistoryPoolRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@AllArgsConstructor
public class LootBoxRewardHistoryPoolService {

    private final LootBoxRewardHistoryPoolRepository lootBoxRewardHistoryPoolRepository;

    public LootBoxRewardHistoryPool saveEntity(LootBoxRewardHistoryPool lootBoxRewardHistoryPool) {
        return lootBoxRewardHistoryPoolRepository.save(lootBoxRewardHistoryPool);
    }
}
