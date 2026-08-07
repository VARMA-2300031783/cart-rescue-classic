package com.cartrescue.model;

import jakarta.persistence.*;

@Entity
@Table(name = "recovery_stats")
public class RecoveryStats {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double totalRevenueRescued;
    private Long activeAbandonedCount;
    private Long totalRescuedCount;
    private String recoveryRate;

    public RecoveryStats() {}

    public RecoveryStats(Double totalRevenueRescued, Long activeAbandonedCount, Long totalRescuedCount, String recoveryRate) {
        this.totalRevenueRescued = totalRevenueRescued;
        this.activeAbandonedCount = activeAbandonedCount;
        this.totalRescuedCount = totalRescuedCount;
        this.recoveryRate = recoveryRate;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Double getTotalRevenueRescued() { return totalRevenueRescued; }
    public void setTotalRevenueRescued(Double totalRevenueRescued) { this.totalRevenueRescued = totalRevenueRescued; }

    public Long getActiveAbandonedCount() { return activeAbandonedCount; }
    public void setActiveAbandonedCount(Long activeAbandonedCount) { this.activeAbandonedCount = activeAbandonedCount; }

    public Long getTotalRescuedCount() { return totalRescuedCount; }
    public void setTotalRescuedCount(Long totalRescuedCount) { this.totalRescuedCount = totalRescuedCount; }

    public String getRecoveryRate() { return recoveryRate; }
    public void setRecoveryRate(String recoveryRate) { this.recoveryRate = recoveryRate; }
}
