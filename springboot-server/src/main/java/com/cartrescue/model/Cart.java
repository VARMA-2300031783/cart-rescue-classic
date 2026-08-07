package com.cartrescue.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "carts")
public class Cart {

    @Id
    private String id;
    
    private String customerName;
    private String customerEmail;
    private String customerPhone;
    private Double totalValue;
    private String status; // abandoned, rescued
    private LocalDateTime abandonedAt;
    private LocalDateTime rescuedAt;
    private String lastNotificationSent;
    private Integer discountApplied;

    public Cart() {}

    public Cart(String id, String customerName, String customerEmail, String customerPhone, Double totalValue, String status) {
        this.id = id;
        this.customerName = customerName;
        this.customerEmail = customerEmail;
        this.customerPhone = customerPhone;
        this.totalValue = totalValue;
        this.status = status;
        this.abandonedAt = LocalDateTime.now();
        this.discountApplied = 0;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }

    public String getCustomerEmail() { return customerEmail; }
    public void setCustomerEmail(String customerEmail) { this.customerEmail = customerEmail; }

    public String getCustomerPhone() { return customerPhone; }
    public void setCustomerPhone(String customerPhone) { this.customerPhone = customerPhone; }

    public Double getTotalValue() { return totalValue; }
    public void setTotalValue(Double totalValue) { this.totalValue = totalValue; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getAbandonedAt() { return abandonedAt; }
    public void setAbandonedAt(LocalDateTime abandonedAt) { this.abandonedAt = abandonedAt; }

    public LocalDateTime getRescuedAt() { return rescuedAt; }
    public void setRescuedAt(LocalDateTime rescuedAt) { this.rescuedAt = rescuedAt; }

    public String getLastNotificationSent() { return lastNotificationSent; }
    public void setLastNotificationSent(String lastNotificationSent) { this.lastNotificationSent = lastNotificationSent; }

    public Integer getDiscountApplied() { return discountApplied; }
    public void setDiscountApplied(Integer discountApplied) { this.discountApplied = discountApplied; }
}
