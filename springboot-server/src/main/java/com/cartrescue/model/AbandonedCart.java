package com.cartrescue.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "abandoned_carts")
public class AbandonedCart {

    @Id
    private String id;

    private String customerName;
    private String customerEmail;
    private String customerPhone;
    private Double totalValue;
    private LocalDateTime abandonedAt;
    private String status;

    public AbandonedCart() {}

    public AbandonedCart(String id, String customerName, String customerEmail, String customerPhone, Double totalValue) {
        this.id = id;
        this.customerName = customerName;
        this.customerEmail = customerEmail;
        this.customerPhone = customerPhone;
        this.totalValue = totalValue;
        this.abandonedAt = LocalDateTime.now();
        this.status = "abandoned";
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

    public LocalDateTime getAbandonedAt() { return abandonedAt; }
    public void setAbandonedAt(LocalDateTime abandonedAt) { this.abandonedAt = abandonedAt; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
