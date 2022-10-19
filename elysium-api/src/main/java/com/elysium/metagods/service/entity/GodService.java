package com.elysium.metagods.service.entity;

import com.elysium.metagods.domain.God;
import com.elysium.metagods.exception.NotFoundException;
import com.elysium.metagods.repository.GodRepository;
import com.elysium.metagods.service.query.GodQueryService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link God}.
 */
@Slf4j
@Service
@Transactional
@AllArgsConstructor
public class GodService {

    private final GodRepository godRepository;
    private final GodQueryService godQueryService;

    public God findByIdOrThrow(Long id) {
        return godRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Could not find God with id " + id));
    }

    public List<God> findForOwner(@NotNull String owner) {
        return godQueryService.findForOwner(owner);
    }

    public List<God> findUnstakedForOwner(@NotNull String owner) {
        return findForOwner(owner).stream()
            .filter(god -> Objects.isNull(god.getStakeData()))
            .collect(Collectors.toList());
    }

    public List<God> findByIdIn(List<Long> godIds) {
        return godRepository.findAllById(godIds);
    }

    public God save(God god) {
        return godRepository.save(god);
    }

    public List<God> saveAll(List<God> gods) {
        return godRepository.saveAll(gods);
    }

    public void resetTokensOwner(String address) {
        saveAll(
            findForOwner(address).stream()
                                 .map(god -> god.setOwner(null))
                                 .collect(Collectors.toList())
        );
    }
}
