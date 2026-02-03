# Translation Guidelines

## Overview
Saleem Hotel Management System is fully bilingual (English/Arabic). All user-facing text must be internationalized.

## Library
We use **i18next** and **react-i18next** for frontend translations.

## Adding New Translations

1. Open `src/frontend/src/i18n/i18n.js`.
2. Locate the `resources` object.
3. Add the key-value pair to **BOTH** `en` (English) and `ar` (Arabic) sections.

### Example
To add a "Save" button:

**In `en`:**
```javascript
"saveButton": "Save Changes"
```

**In `ar`:**
```javascript
"saveButton": "حفظ التغييرات"
```

## Usage in React Components

```javascript
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation();
  return <button>{t('saveButton')}</button>;
};
```

## Validation
Run the validation script to ensure no keys are missing:

```bash
node src/frontend/scripts/test-i18n.js
```
*This script checks that every key in English exists in Arabic and vice versa.*

## RTL Support
- The application automatically switches layout direction based on language.
- Use logical CSS properties (e.g., `margin-inline-start` instead of `margin-left`) where possible.
- The `dir` attribute is set on the `<html>` tag automatically.
