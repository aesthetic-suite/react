module.exports = {
	setupFilesAfterEnv: ['jest-rut', '<rootDir>/tests/setup.ts'],
	testEnvironment: 'jsdom',
	testPathIgnorePatterns: ['test.js'],
	timers: 'legacy',
};
