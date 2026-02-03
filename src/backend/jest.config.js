module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/*.test.js'],
  coverageDirectory: './coverage',
  collectCoverageFrom: [
    'controllers/**/*.js',
    'models/**/*.js',
    'routes/**/*.js',
    'middleware/**/*.js'
  ],
  setupFilesAfterEnv: ['./tests/setup.js']
};
