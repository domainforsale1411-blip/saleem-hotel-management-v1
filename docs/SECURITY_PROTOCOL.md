# Security Protocol

## Authentication & Authorization
- **JWT (JSON Web Tokens)**: Used for stateless authentication.
  - Expiration: 7 days.
  - Storage: Client-side (LocalStorage/HttpOnly Cookie).
- **Password Hashing**: Bcrypt with salt rounds = 10.
- **Role-Based Access Control (RBAC)**:
  - `super_admin`: Full system access.
  - `hotel_admin`: Manage own hotel and staff.
  - `staff`: Limited operational access.

## Network Security
- **Helmet**: Middleware applied to set secure HTTP headers (HSTS, X-Frame-Options, etc.).
- **CORS**: Configured to allow requests only from trusted origins.
- **Rate Limiting**:
  - API Global: 100 requests per 15 minutes.
  - Login Endpoint: 5 requests per hour (to prevent brute force).

## Data Protection
- **Input Validation**: All API inputs should be validated (currently basic validation in models).
- **Parameter Pollution**: Prevented via `hpp` (recommended addition).
- **SQL Injection**: Prevented by using Sequelize ORM parameterized queries.

## Subscription Enforcement
- Middleware `checkSubscription.js` validates:
  - Active status.
  - Expiration date.
  - Plan limits (e.g., max hotels allowed).

## Incident Response
1. **Detection**: Monitor logs for 401/403 spikes or 500 errors.
2. **Containment**: Revoke suspicious JWT tokens (requires blacklist implementation) or block IP.
3. **Remediation**: Patch vulnerability and deploy hotfix.
