/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/**/*.test.ts'], // Only run tests in files ending with .test.ts
  verbose: true,
  forceExit: true, // Force Jest to exit after tests complete
  //clearMocks: true, // Automatically clear mock calls and instances between every test
};