# 🛒 Cart Rescue - Abandoned Cart Recovery System

An e-commerce Abandoned Cart Recovery system featuring a classic visual design, clear simple English text, React + Vite frontend, Spring Boot Java REST backend, and MySQL database integration.

---

## 📌 Project Overview
**Cart Rescue** helps online merchants automatically track abandoned shopping carts, recover lost revenue with 1-click personalized discount reminders (Email/SMS/WhatsApp), and monitor recovery conversion metrics in real-time.

---

## 📐 System Architecture Diagram

```mermaid
graph TD
    subgraph Frontend ["Frontend Layer (React + Vite)"]
        UI["Classic Storefront & Cart Drawer"]
        Dashboard["Merchant Recovery Dashboard"]
        LiveFeed["Live Cart Activity Feed"]
        ExitPopup["Exit-Intent Discount Modal"]
    end

    subgraph Backend ["Backend API Layer (Spring Boot Java / Express)"]
        Controller["Cart REST Controller (/api/carts)"]
        Service["AI Rescue Copy Engine"]
        JPA["Spring Data JPA Repositories"]
    end

    subgraph Database ["Database Layer (MySQL)"]
        CartsTB[("carts Table")]
        AbandonedTB[("abandoned_carts Table")]
        RescuedTB[("rescued_sales Table")]
        StatsTB[("recovery_stats Table")]
    end

    UI -->|1. Abandon Cart Event| Controller
    ExitPopup -->|Apply Promo RESCUE10| UI
    Dashboard -->|2. Send Email/SMS Rescue| Controller
    Dashboard -->|3. Fetch Metrics| Controller
    Controller --> Service
    Controller --> JPA
    JPA --> CartsTB
    JPA --> AbandonedTB
    JPA --> RescuedTB
    JPA --> StatsTB
```

---

## 🔄 Cart Recovery Sequence Workflow

```mermaid
sequenceDiagram
    autonumber
    actor Customer
    participant Frontend as React Storefront
    participant Backend as Spring Boot API
    participant MySQL as MySQL Database
    actor Merchant

    Customer->>Frontend: Selects products & clicks "Simulate Abandoning Cart"
    Frontend->>Backend: POST /api/carts/abandon (Customer Name & Items)
    Backend->>MySQL: INSERT INTO abandoned_carts & carts
    MySQL-->>Backend: Row created
    Backend-->>Frontend: 200 OK (Cart Saved)

    Merchant->>Frontend: Views Merchant Dashboard
    Frontend->>Backend: GET /api/carts & GET /api/stats
    Backend-->>Frontend: Returns pending abandoned carts & revenue stats

    Merchant->>Frontend: Clicks "Send Email Rescue (10% Off)"
    Frontend->>Backend: POST /api/carts/{id}/rescue
    Backend-->>Merchant: Reminder dispatched

    Merchant->>Frontend: Clicks "Mark Rescued"
    Frontend->>Backend: POST /api/carts/{id}/complete
    Backend->>MySQL: MOVE cart from abandoned_carts -> rescued_sales
    Backend-->>Frontend: Revenue saved updated!
```

---

## 🗄️ Database Entity Relationship (ER) Diagram

```mermaid
erDiagram
    CARTS {
        string id PK
        string customer_name
        string customer_email
        string customer_phone
        double total_value
        string status
        timestamp abandoned_at
        timestamp rescued_at
        string last_notification_sent
        int discount_applied
    }

    ABANDONED_CARTS {
        string id PK
        string customer_name
        string customer_email
        string customer_phone
        double total_value
        string status
        timestamp abandoned_at
    }

    RESCUED_SALES {
        string id PK
        string customer_name
        string customer_email
        double original_value
        double rescued_amount
        int discount_percent
        timestamp rescued_at
    }

    RECOVERY_STATS {
        bigint id PK
        double total_revenue_rescued
        bigint active_abandoned_count
        bigint total_rescued_count
        string recovery_rate
    }

    CARTS ||--o| ABANDONED_CARTS : synchronizes
    CARTS ||--o| RESCUED_SALES : converts
```

---

## ✨ Features
1. **Classic E-Commerce Storefront**: Product catalog with editable Customer Name, Email, and Phone fields + Quick Name Preset buttons (`Robert Fox`, `Emily Clark`, `Michael Scott`, `Alex Morgan`).
2. **Merchant Recovery Dashboard**: Real-time cards for Total Sales Rescued ($), Active Abandoned Carts (#), and Recovery Rate (%).
3. **1-Click Rescue Dispatch**: Send instant Email or SMS reminders with custom discount incentives.
4. **AI Simple English Recovery Copy Generator**: Built-in generator for warm, persuasive recovery messaging.
5. **Live Cart Activity Stream**: Filterable list of all active abandoned and rescued carts.
6. **Exit-Intent Discount Overlay**: Pop-up offering promo code `RESCUE10` before customers leave.

---

## 🛠️ Tech Stack
- **Frontend**: React 18, Vite, Lucide Icons, Canvas Confetti, Custom Vanilla CSS
- **Backend**: Spring Boot 3.2 (Java 17), Maven, Express.js (Node.js alternative)
- **Database**: MySQL 8.0, Spring Data JPA / Hibernate, H2 Database (Fallback)

---

## 🚀 How to Run the Project

### 1. Frontend Setup (VS Code)
```bash
cd cart-rescue-classic
npm install
npm run dev
```
Open browser at: **`http://localhost:5176`**

### 2. Backend Setup (Eclipse IDE)
1. Import `springboot-server` as **Existing Maven Project** in Eclipse.
2. Run [`CartRescueApplication.java`](file:///C:/Users/srini/.gemini/antigravity/scratch/cart-rescue-classic/springboot-server/src/main/java/com/cartrescue/CartRescueApplication.java) as **Spring Boot App**.
3. Backend runs on: **`http://localhost:8090`**

### 3. MySQL Database Configuration
Configuration file: `springboot-server/src/main/resources/application.properties`
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/cart_rescue_db?createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=2300031783
```

---

## 📄 License
Distributed under the MIT License.
