module.exports = {
	setupFilesAfterEnv: ['jest-rut'],
	testEnvironment: 'jsdom',
	testPathIgnorePatterns: ['test.js'],
	timers: 'legacy',
};
