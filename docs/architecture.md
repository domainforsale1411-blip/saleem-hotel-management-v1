# System Architecture

## Overview
The Saleem Hotel Management System is a microservices-inspired monolithic architecture designed for scalability, security, and bilingual support.

## Architecture Diagram

```mermaid
graph TD
    User[User (Hotel Staff/Admin)] -->|HTTPS| CDN[CDN / Load Balancer]
    CDN --> Frontend[Frontend (React SPA)]
    
    subgraph "Application Layer"
        Frontend -->|REST API| API[Backend API (Node.js/Express)]
        Frontend -->|WebSocket| Chat[AI Chat Service]
    end
    
    subgraph "Data Layer"
        API -->|Read/Write| DB[(PostgreSQL Primary)]
        API -->|Cache| Redis[(Redis Cache)]
        Chat -->|Context| VectorDB[(Vector Store/Embeddings)]
    end
    
    subgraph "External Services"
        API -->|Payment| Binance[Binance Pay API]
        Chat -->|Inference| OpenAI[OpenAI GPT-4]
        API -->|Email| SMTP[SMTP Service]
    end
```

## Directory Structure & Responsibilities

| Service | Technology | Responsibility |
|---------|------------|----------------|
| **Frontend** | React, Vite, i18next | UI, State Management, Bilingual Rendering |
| **Backend** | Node.js, Express, Sequelize | Business Logic, API, Auth, Data Validation |
| **Database** | PostgreSQL | Persistent Data Storage (Users, Hotels, Bookings) |
| **AI Integration** | OpenAI API | Chatbot Logic, Context Management |
| **DevOps** | Docker, GitHub Actions | CI/CD, Containerization, Deployment |

## API Structure

### V1 Endpoints
- `/api/v1/auth/*` - Authentication (Register, Login, Refresh Token)
- `/api/v1/users/*` - User Management
- `/api/v1/hotels/*` - Hotel Profile & Settings
- `/api/v1/subscriptions/*` - Billing & Plans
- `/api/v1/chat/*` - AI Assistant Interaction

## Security Architecture
1. **SSL/TLS**: All traffic encrypted.
2. **JWT**: Stateless authentication with short-lived access tokens and secure refresh tokens.
3. **WAF**: Protection against common web attacks (SQLi, XSS).
4. **Data Isolation**: Logic-based multi-tenancy enforcing `hotel_id` checks on every query.
