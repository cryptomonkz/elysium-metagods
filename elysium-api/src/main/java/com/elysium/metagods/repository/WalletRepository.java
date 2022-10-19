package com.elysium.metagods.repository;

import java.util.Optional;

import com.elysium.metagods.domain.Wallet;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Wallet entity.
 */
@Repository
public interface WalletRepository extends JpaRepository<Wallet, Long>, JpaSpecificationExecutor<Wallet> {
    Optional<Wallet> findByAddressIgnoreCase(String walletAddress);

    @Modifying
    @Query("UPDATE Wallet SET tokenBalance = tokenBalance + :amount WHERE id = :id")
    void addAmountToWallet(Long id, Double amount);

    @Modifying
    @Query("UPDATE Wallet SET tokenBalance = tokenBalance - :amount WHERE id = :id")
    void subtractAmountFromWallet(Long id, Double amount);
}
