Project Rules & Guidelines
🏛️ Governance & Decision Making
1. Authority Structure
text
Project Architect (Final Technical Decisions)
│
├── UI/UX Specialist (Design Authority)
├── Backend Engineer (API/Security Authority)
├── Database Engineer (Data Architecture Authority)
├── AI Specialist (AI/ML Implementation Authority)
├── Payment Specialist (Financial Systems Authority)
├── Admin Dashboard Developer (Admin Systems Authority)
└── DevOps Engineer (Infrastructure/Deployment Authority)
2. Decision Matrix
Unanimous Required: Security changes, Architecture changes

Majority (5/8): Feature prioritization, Technology adoption

Individual Authority: Role-specific implementation details

📁 Code Management Rules
1. Git Workflow
bash
# Branch Naming Convention
feature/feature-name-issue#      # New features
bugfix/bug-description-issue#     # Bug fixes
hotfix/critical-issue-description # Emergency fixes
release/v1.0.0                    # Release branches
docs/documentation-update         # Documentation updates

# Commit Message Format
[type]: [description] [issue#]

Types:
✨ feat:      New feature
🐛 fix:       Bug fix
📚 docs:      Documentation
🎨 style:     Formatting, missing semi colons, etc
♻️ refactor:  Code refactoring
⚡ perf:      Performance improvements
✅ test:      Adding or updating tests
🔧 chore:     Build process or tooling changes
🌐 i18n:      Internationalization/Localization
🔒 security:  Security-related changes

Example:
✨ feat: add user registration with validation #123
🌐 i18n: add Arabic translation for dashboard #456
2. Pull Request Requirements
MUST HAVE:

✅ Linked issue number

✅ Passing all tests

✅ No security vulnerabilities flagged

✅ Bilingual support (English + Arabic)

✅ Documentation updated

✅ At least 2 approvals from different roles

✅ No merge conflicts

Review Checklist:

Code follows project standards

No hardcoded secrets

RTL support for Arabic

Performance impact considered

Error handling implemented

Logging added where needed

Security review completed

🏗️ Development Standards
1. Code Style & Quality
javascript
// JavaScript/Node.js Rules
module.exports = {
  "extends": ["airbnb", "prettier"],
  "rules": {
    "max-lines": ["error", 300],        // Max 300 lines per file
    "complexity": ["error", 10],        // Max cyclomatic complexity 10
    "no-console": "error",              // No console.log in production
    "camelcase": ["error", {"properties": "always"}],
    "consistent-return": "error",
    "eqeqeq": ["error", "always"],
    "no-magic-numbers": ["error", {"ignore": [0, 1, 7, 24, 30, 365]}]
  }
};
2. File Structure Convention
text
src/
├── backend/
│   ├── config/           # Configuration files
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Custom middleware
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   ├── utils/           # Helper functions
│   └── validators/      # Input validation
├── frontend/
│   ├── assets/
│   │   ├── images/
│   │   ├── fonts/       # Arabic/English fonts
│   │   └── styles/      # SCSS/CSS files
│   ├── components/
│   │   ├── common/      # Reusable components
│   │   ├── forms/       # Form components
│   │   └── layout/      # Layout components
│   ├── hooks/           # Custom React hooks
│   ├── i18n/            # Translation files
│   │   ├── ar/
│   │   └── en/
│   ├── pages/           # Page components
│   ├── services/        # API services
│   └── utils/           # Frontend utilities
3. Naming Conventions
typescript
// Variables & Functions
camelCase       // Variables, functions, methods
PascalCase      // Classes, Components, Interfaces
UPPER_SNAKE_CASE // Constants
kebab-case      // File names, CSS classes, URLs

// Database
snake_case      // Table and column names
prefix_table_   // Related tables (user_accounts, user_sessions)

// API Endpoints
/api/v1/        // Version 1 API
/resources      // Plural resource names
/resources/{id} // Specific resource
/resources/{id}/sub-resource // Nested resources
🛡️ Security Rules
1. Mandatory Security Practices
text
1. NEVER commit secrets to version control
2. All API endpoints must have rate limiting
3. Input validation on ALL user inputs
4. SQL parameterized queries ONLY
5. XSS protection enabled by default
6. CORS configured explicitly
7. HTTPS enforced everywhere
8. Regular dependency vulnerability scanning
2. Password & Authentication
javascript
// Minimum requirements
password: {
  minLength: 12,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: true,
  maxAge: 90, // days
  history: 5  // remember last 5 passwords
}

// JWT Configuration
jwt: {
  algorithm: 'RS256',  // Asymmetric encryption
  expiresIn: '7d',
  refreshTokenExpiry: '30d'
}
🌐 Bilingual Implementation Rules
1. Internationalization Standards
json
// Translation file structure
locales/
├── en/
│   └── common.json
│   └── dashboard.json
│   └── errors.json
└── ar/
    └── common.json
    └── dashboard.json
    └── errors.json

// Keys must be consistent
{
  "welcome": "Welcome to Saleem Hotel System",
  "welcome_ar": "مرحباً بكم في نظام فندق سليم"
}
2. RTL/LTR Implementation
css
/* CSS Rules for RTL support */
[dir="rtl"] {
  text-align: right;
  margin-left: 0;
  margin-right: auto;
}

/* Use logical properties */
.element {
  margin-inline-start: 1rem;  /* Works for both LTR and RTL */
  padding-inline-end: 1rem;
}
🧪 Testing Rules
1. Testing Requirements
text
Coverage Minimums:
- Unit Tests: 80%
- Integration Tests: 70%
- Critical Paths: 100%

Required Test Categories:
1. Authentication flows
2. Payment processing
3. Data isolation (multi-tenancy)
4. Arabic text rendering
5. RTL layout
6. Security vulnerabilities
7. Performance benchmarks
2. Test Structure
javascript
describe('User Registration', () => {
  beforeEach(() => {
    // Setup
  });

  it('should register user with valid data', () => {
    // Arrange, Act, Assert
  });

  it('should reject registration with missing email', () => {
    // Test validation
  });

  it('should store password as hash only', () => {
    // Security test
  });

  it('should support Arabic company names', () => {
    // Bilingual test
  });
});
🚀 Deployment Rules
1. Environment Management
yaml
# Three environments required
Development:
  - Auto-deploy on feature merge
  - Mock data enabled
  - Debug mode ON

Staging:
  - Manual deployment approval
  - Mirrors production config
  - Real payment sandbox

Production:
  - Manual deployment approval
  - Super Admin approval required
  - Zero downtime deployment
2. Deployment Checklist
markdown
## Pre-deployment
- [ ] All tests passing
- [ ] Security scan completed
- [ ] Performance test passed
- [ ] Database migration tested
- [ ] Rollback plan documented

## During deployment
- [ ] Notify team
- [ ] Deploy to 10% traffic first
- [ ] Monitor error rates
- [ ] Verify critical functionality

## Post-deployment
- [ ] Verify all services running
- [ ] Check Arabic text rendering
- [ ] Test payment flow
- [ ] Update deployment log
💬 Communication Rules
1. Daily Standup Format
markdown
**Date**: 2024-02-08
**Agent**: [Role]

**Yesterday**:
- Completed user registration backend #123
- Fixed Arabic text alignment in dashboard #456

**Today**:
- Implement payment gateway integration #789
- Write tests for subscription logic #101

**Blockers**:
- Need API keys from Payment Specialist for USDT testing
- Waiting on Arabic translations for error messages

**Help Needed**:
- Review PR #45 for security concerns
2. Meeting Rules
text
Daily Standup: 9:00 AM UTC (15 minutes)
Weekly Sync: Monday 10:00 AM UTC (30 minutes)
Retrospective: Every 2 weeks, Friday 3:00 PM UTC (60 minutes)
Emergency: Anytime, tag @all in #urgent channel

Meeting Etiquette:
1. Come prepared with updates
2. Stay on topic
3. Respect time limits
4. Document decisions
5. Assign action items
📊 Documentation Rules
1. Required Documentation
text
MUST HAVE:
1. API Documentation (OpenAPI/Swagger)
2. Database Schema Documentation
3. Deployment Guide
4. Security Protocol Document
5. Bilingual Implementation Guide
6. Testing Strategy Document
7. Disaster Recovery Plan

SHOULD HAVE:
1. Architecture Decision Records (ADRs)
2. Component Library Documentation
3. Performance Tuning Guide
4. Monitoring and Alerting Guide
2. Documentation Standards
markdown
# Title

## Purpose
[Why this document exists]

## Scope
[What is covered]

## Implementation
[How to implement]

## Examples
```code
// Code examples
Related Documents
[Link to related docs]

Version History
Date	Author	Changes
2024-02-08	AI Agent	Initial version
text

## **🔧 Tooling & Automation Rules**

### **1. Required Tools**
Version Control: Git + GitHub
CI/CD: GitHub Actions
Code Quality: ESLint, Prettier, SonarQube
Testing: Jest, Cypress, Supertest
Security: Snyk, OWASP ZAP
Monitoring: Sentry, New Relic
Documentation: Swagger, MkDocs
Project Management: GitHub Projects
Communication: Slack/Discord

text

### **2. Automation Requirements**
```yaml
# GitHub Actions required workflows
workflows:
  - test-and-lint: Run on every PR
  - security-scan: Daily automated scan
  - performance-test: Weekly on staging
  - dependency-update: Weekly check
  - i18n-consistency: Check translation files
  - build-and-deploy: On merge to main
⚖️ Conflict Resolution
1. Escalation Path
text
Level 1: Direct discussion between agents
Level 2: Project Architect mediation
Level 3: Team vote (majority rules)
Level 4: External arbitration (if needed)
2. Decision Log
markdown
## Decision Log Entry
**Date**: 2024-02-08
**Issue**: Database choice - PostgreSQL vs MySQL
**Options**:
1. PostgreSQL with JSONB support
2. MySQL with better Arabic collation

**Decision**: PostgreSQL
**Reason**: Better JSON support for flexible hotel data
**Vote**: 6-2 in favor
**Documented By**: Database Engineer
📈 Quality Metrics & SLA
1. Performance SLAs
text
Page Load: < 3 seconds
API Response: < 200ms (95th percentile)
Uptime: 99.9%
Data Freshness: Real-time (max 5 seconds delay)
Backup Recovery: < 1 hour
Security Patch: < 24 hours for critical
Bug Fix: < 48 hours for critical
Feature Request: 2-week turnaround
2. Quality Gates
yaml
quality_gates:
  code_coverage:
    minimum: 80%
    critical_paths: 100%
  
  security:
    vulnerabilities: 0 critical
    dependencies: < 5% outdated
  
  performance:
    lighthouse_score: > 90
    api_response: < 200ms
  
  accessibility:
    wcag_compliance: AA level
    rtl_support: 100%
🧹 Cleanup & Maintenance Rules
1. Code Cleanup
text
- Remove unused code weekly
- Update dependencies monthly
- Archive old branches quarterly
- Review and update documentation monthly
- Performance audit monthly
- Security audit bi-weekly
2. Data Management
sql
-- Data retention policy
demo_users: DELETE after 30 days of expiry
user_logs: Archive after 90 days, delete after 365 days
payment_logs: Keep for 7 years (legal requirement)
chat_messages: Delete after 180 days
backups: Keep daily for 30 days, monthly for 1 year
🎯 Success Metrics Tracking
1. Key Metrics Dashboard
json
{
  "technical": {
    "uptime": "99.9%",
    "response_time": "<200ms",
    "error_rate": "<0.1%",
    "coverage": ">80%"
  },
  "business": {
    "user_registration": "daily_count",
    "conversion_rate": "demo_to_paid",
    "revenue": "monthly_recurring",
    "churn_rate": "<5%"
  },
  "user_satisfaction": {
    "nps_score": ">50",
    "support_tickets": "<10/week",
    "feature_requests": "tracked"
  }
}
📋 Immediate Next Actions After Rules Review
Each Agent: Acknowledge understanding of rules

Project Architect: Set up rule enforcement tools

DevOps Engineer: Configure CI/CD with quality gates

All Agents: Begin implementation per assigned tasks

First Checkpoint: Rules compliance review in 3 days

These rules are binding for all team members. Violations should be reported immediately. Rules will be reviewed and updated bi-weekly during retrospectives.
