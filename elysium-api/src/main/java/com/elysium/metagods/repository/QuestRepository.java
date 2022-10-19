package com.elysium.metagods.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.elysium.metagods.domain.Quest;

/**
 * Spring Data SQL repository for the Quest entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QuestRepository extends JpaRepository<Quest, Long>, JpaSpecificationExecutor<Quest> {}
