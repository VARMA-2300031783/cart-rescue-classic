package com.cartrescue.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "rescued_sales")
public class RescuedSales {

    @Id
    private String id;

    private String customerName;
    private String customerEmail;
    private Double originalValue;
    private Double rescuedAmount;
    private Integer discountPercent;
    private LocalDateTime rescuedAt;

    public RescuedSales() {}

    public RescuedSales(String id, String customerName, String customerEmail, Double originalValue, Double rescuedAmount, Integer discountPercent) {
        this.id = id;
        this.customerName = customerName;
        this.customerEmail = customerEmail;
        this.originalValue = originalValue;
        this.rescuedAmount = rescuedAmount;
        this.discountPercent = discountPercent;
        this.rescuedAt = LocalDateTime.now();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }

    public String getCustomerEmail() { return customerEmail; }
    public void setCustomerEmail(String customerEmail) { this.customerEmail = customerEmail; }

    public Double getOriginalValue() { return originalValue; }
    public void setOriginalValue(Double originalValue) { this.originalValue = originalValue; }

    public Double getRescuedAmount() { return rescuedAmount; }
    public void setRescuedAmount(Double rescuedAmount) { this.rescuedAmount = rescuedAmount; }

    public Integer getDiscountPercent() { return discountPercent; }
    public void setDiscountPercent(Integer discountPercent) { this.discountPercent = discountPercent; }

    public LocalDateTime getRescuedAt() { return rescuedAt; }
    public void setRescuedAt(LocalDateTime rescuedAt) { this.rescuedAt = rescuedAt; }
}
