# Quality Assurance Strategy

## Overview
This document outlines the testing strategy for the Saleem Hotel Management System (Phase 6).

## Test Categories

### 1. Unit Tests (Backend)
- **Framework**: Jest
- **Location**: `src/backend/tests/unit`
- **Scope**: Controllers, Utils
- **Current Coverage**:
  - `auth.controller.js`: Registration logic, Mock data generation trigger.
  - `chat.controller.js`: Bilingual response logic.

### 2. Integration Tests (Backend)
- **Framework**: Jest + Supertest
- **Location**: `src/backend/tests/integration`
- **Scope**: API Routes, Middleware
- **Current Coverage**:
  - `auth.routes.js`: Login endpoint validation.
  - `security.test.js`: Helmet security headers verification.

### 3. Frontend/Language Tests
- **Framework**: Custom Node Script
- **Location**: `src/frontend/scripts/test-i18n.js`
- **Scope**: Verifies parity between English and Arabic translation keys.
- **Execution**: `node src/frontend/scripts/test-i18n.js`

### 4. Performance Tests
- **Tool**: Custom Node Script (Native `http` module)
- **Location**: `src/backend/scripts/load-test.js`
- **Scope**: Basic load testing of the API root endpoint.
- **Execution**: `node src/backend/scripts/load-test.js`

## Running Tests

### Backend Tests
```bash
cd src/backend
npm test
```

### i18n Validation
```bash
node src/frontend/scripts/test-i18n.js
```

### Load Test
```bash
node src/backend/scripts/load-test.js
```

## Future QA Improvements
- Implement frontend unit tests with Vitest/Jest.
- Add End-to-End (E2E) tests with Cypress or Playwright.
- Integrate tests into GitHub Actions CI pipeline.
