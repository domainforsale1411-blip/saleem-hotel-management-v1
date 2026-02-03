# Database Schema Documentation

## Overview
The Saleem Hotel Management System uses PostgreSQL as its primary data store. The schema is managed via Sequelize ORM.

## Models

### 1. User (`users`)
Stores account information for system administrators and hotel staff.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PK, Default: UUIDV4 | Unique identifier |
| `full_name` | VARCHAR | Not Null | User's full name |
| `email` | VARCHAR | Not Null, Unique | User's email address |
| `password_hash` | VARCHAR | Not Null | Bcrypt hashed password |
| `company_name` | VARCHAR | Nullable | Organization name |
| `role` | ENUM | Default: 'hotel_admin' | `super_admin`, `hotel_admin`, `staff` |
| `is_verified` | BOOLEAN | Default: false | Email verification status |
| `created_at` | TIMESTAMP | | Record creation time |
| `updated_at` | TIMESTAMP | | Record update time |

### 2. Subscription (`subscriptions`)
Manages billing cycles, plan tiers, and account status.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PK, Default: UUIDV4 | Unique identifier |
| `user_id` | UUID | FK -> Users | Owner of the subscription |
| `plan_id` | INTEGER | Not Null | 1=Starter, 2=Pro, 3=Enterprise |
| `status` | ENUM | Default: 'trial' | `active`, `expired`, `trial`, `cancelled` |
| `start_date` | TIMESTAMP | Default: NOW | Subscription start |
| `end_date` | TIMESTAMP | Nullable | Subscription expiration |
| `is_demo` | BOOLEAN | Default: true | Flag for trial/demo accounts |

### 3. Hotel (`hotels`)
Represents a hotel property managed by a user.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PK, Default: UUIDV4 | Unique identifier |
| `user_id` | FK -> Users | Owner of the hotel |
| `name_en` | VARCHAR | Not Null | Hotel name in English |
| `name_ar` | VARCHAR | Nullable | Hotel name in Arabic |
| `address` | TEXT | Nullable | Physical address |
| `city` | VARCHAR | Nullable | City |
| `country` | VARCHAR | Nullable | Country |

## Relationships
- **User has One Subscription**: `User.hasOne(Subscription)`
- **User has Many Hotels**: `User.hasMany(Hotel)`
- **Hotel belongs to User**: `Hotel.belongsTo(User)`
