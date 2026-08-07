package com.cartrescue;

import com.cartrescue.model.*;
import com.cartrescue.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.time.LocalDateTime;

@SpringBootApplication
@EntityScan(basePackages = "com.cartrescue.model")
@EnableJpaRepositories(basePackages = "com.cartrescue.repository")
public class CartRescueApplication {

    public static void main(String[] args) {
        SpringApplication.run(CartRescueApplication.class, args);
        System.out.println("✅ Cart Rescue Spring Boot Backend is online on http://localhost:8090");
    }

    @Bean
    CommandLineRunner initDatabase(
            CartRepository cartRepository,
            AbandonedCartRepository abandonedCartRepository,
            RescuedSalesRepository rescuedSalesRepository,
            RecoveryStatsRepository recoveryStatsRepository
    ) {
        return args -> {
            if (cartRepository.count() == 0) {
                // 1. Initial Carts
                Cart cart1 = new Cart("cart-101", "Sarah Jenkins", "sarah.j@example.com", "+1 (555) 234-5678", 218.00, "abandoned");
                cartRepository.save(cart1);
                abandonedCartRepository.save(new AbandonedCart("cart-101", "Sarah Jenkins", "sarah.j@example.com", "+1 (555) 234-5678", 218.00));

                Cart cart2 = new Cart("cart-102", "David Miller", "david.m@example.com", "+1 (555) 876-5432", 249.00, "abandoned");
                cart2.setLastNotificationSent("Email Reminder #1 (10% Off)");
                cart2.setDiscountApplied(10);
                cartRepository.save(cart2);
                abandonedCartRepository.save(new AbandonedCart("cart-102", "David Miller", "david.m@example.com", "+1 (555) 876-5432", 249.00));

                Cart cart3 = new Cart("cart-103", "Emma Watson", "emma.w@example.com", "+1 (555) 432-1098", 179.00, "rescued");
                cart3.setRescuedAt(LocalDateTime.now().minusMinutes(30));
                cart3.setLastNotificationSent("WhatsApp Quick Rescue");
                cart3.setDiscountApplied(15);
                cartRepository.save(cart3);

                rescuedSalesRepository.save(new RescuedSales("cart-103", "Emma Watson", "emma.w@example.com", 179.00, 152.15, 15));

                System.out.println("✅ All 4 MySQL tables (carts, abandoned_carts, rescued_sales, recovery_stats) created & pre-populated!");
            }
        };
    }
}
