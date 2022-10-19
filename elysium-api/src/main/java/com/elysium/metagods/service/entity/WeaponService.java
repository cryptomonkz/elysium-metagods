package com.elysium.metagods.service.entity;

import com.elysium.metagods.domain.Weapon;
import com.elysium.metagods.exception.NotFoundException;
import com.elysium.metagods.repository.WeaponRepository;
import com.elysium.metagods.service.query.WeaponQueryService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Weapon}.
 */
@Slf4j
@Service
@Transactional
@AllArgsConstructor
public class WeaponService {

    private final WeaponRepository weaponRepository;
    private final WeaponQueryService weaponQueryService;

    public Weapon findByIdOrThrow(Long id) {
        return weaponRepository.findById(id)
                               .orElseThrow(() -> new NotFoundException("Could not find Weapon with id " + id));
    }

    public List<Weapon> findForOwner(@NotNull String owner) {
        return weaponQueryService.findForOwner(owner);
    }

    public List<Weapon> findUnstakedForOwner(@NotNull String owner) {
        return findForOwner(owner).stream()
            .filter(god -> Objects.isNull(god.getStakeData()))
            .collect(Collectors.toList());
    }

    public List<Weapon> findByIdIn(List<Long> weaponIds) {
        return weaponRepository.findAllById(weaponIds);
    }

    public Weapon save(Weapon weapon) {
        return weaponRepository.save(weapon);
    }

    public List<Weapon> saveAll(List<Weapon> weapons) {
        return weaponRepository.saveAll(weapons);
    }

    public void resetTokensOwner(String address) {
        saveAll(
            findForOwner(address).stream()
                                 .map(weapon -> weapon.setOwner(null))
                                 .collect(Collectors.toList())
        );
    }
}
