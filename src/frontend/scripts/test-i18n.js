const fs = require('fs');
const path = require('path');

// Read the i18n file content
// Since i18n.js is an ES module or uses import/export, we might need to parse it or just read the file as text and extract JSON.
// However, the i18n.js likely contains the resources object directly.
// Let's try to require it if it's CommonJS, or read it if it's ESM.
// The project uses Vite, so it's likely ESM.

const i18nPath = path.join(__dirname, '../src/i18n/i18n.js');
const content = fs.readFileSync(i18nPath, 'utf8');

// Regex to extract the resources object
// looking for: const resources = { ... };
const resourcesMatch = content.match(/const\s+resources\s*=\s*({[\s\S]*?});/);

if (!resourcesMatch) {
  console.error('Could not find resources object in i18n.js');
  process.exit(1);
}

// This is a quick and dirty way to parse the JS object from text.
// It assumes the object is valid JSON-like structure (keys might not be quoted).
// A safer way is to use a parser or just check keys manually via regex.

console.log('Validating i18n keys...');

// Let's extract English and Arabic translation blocks from the MATCHED content, not the whole file, to be safer,
// or just search the whole file since keys are unique enough.
const enMatch = content.match(/en:\s*{\s*translation:\s*({[\s\S]*?})\s*}/);
const arMatch = content.match(/ar:\s*{\s*translation:\s*({[\s\S]*?})\s*}/);

if (!enMatch || !arMatch) {
  console.error('Could not find en or ar translation blocks');
  process.exit(1);
}

// Helper to parse simple JS object string to keys
const getKeys = (str) => {
  return str.split('\n')
    .map(line => line.trim())
    .filter(line => line.includes(':'))
    .map(line => line.split(':')[0].trim().replace(/['"]/g, ''));
};

const enKeys = getKeys(enMatch[1]);
const arKeys = getKeys(arMatch[1]);

const missingInAr = enKeys.filter(key => !arKeys.includes(key));
const missingInEn = arKeys.filter(key => !enKeys.includes(key));

if (missingInAr.length > 0) {
  console.error('Keys missing in Arabic:', missingInAr);
}

if (missingInEn.length > 0) {
  console.error('Keys missing in English:', missingInEn);
}

if (missingInAr.length === 0 && missingInEn.length === 0) {
  console.log('✅ All keys match between English and Arabic!');
} else {
  console.log('❌ Translation mismatch found.');
  process.exit(1);
}
