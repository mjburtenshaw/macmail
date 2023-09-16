import type { Config } from 'jest';

const config: Config = {
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 85,
      statements: 0,
    },
  },
  coveragePathIgnorePatterns: ['\\.letter\\.tsx$', '\\.constants\\.ts$'],
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  preset: 'ts-jest',
  setupFiles: ['./jest.setup.ts'],
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/src/letter/__tests__/.*\\.letter\\..*',
  ],
};

export default config;
