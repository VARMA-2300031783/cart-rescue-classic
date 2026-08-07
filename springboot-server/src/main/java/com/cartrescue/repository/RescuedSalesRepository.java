package com.cartrescue.repository;

import com.cartrescue.model.RescuedSales;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RescuedSalesRepository extends JpaRepository<RescuedSales, String> {
}
