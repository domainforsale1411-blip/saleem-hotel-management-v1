
## Testing

This project includes a comprehensive testing suite for backend logic, API routes, and bilingual support.

### Running Tests

**Backend Tests (Unit & Integration)**
```bash
cd src/backend
npm install
npm test
```

**i18n Validation (English/Arabic Parity)**
```bash
node src/frontend/scripts/test-i18n.js
```

**Load Testing**
```bash
node src/backend/scripts/load-test.js
```

See [docs/QA_STRATEGY.md](docs/QA_STRATEGY.md) for detailed QA strategy.
