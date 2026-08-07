package com.cartrescue.repository;

import com.cartrescue.model.RecoveryStats;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecoveryStatsRepository extends JpaRepository<RecoveryStats, Long> {
}
