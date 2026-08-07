package com.cartrescue.repository;

import com.cartrescue.model.AbandonedCart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AbandonedCartRepository extends JpaRepository<AbandonedCart, String> {
}
