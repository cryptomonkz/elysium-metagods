package com.elysium.metagods.repository;

import com.elysium.metagods.domain.Weapon;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Weapon entity.
 */
@Repository
public interface WeaponRepository extends JpaRepository<Weapon, Long>, JpaSpecificationExecutor<Weapon> {}
