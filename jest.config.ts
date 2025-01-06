import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.module\\.(css|scss|sass)$': 'identity-obj-proxy', // Mock CSS/SCSS modules
    '\\.(css|scss|sass)$': '<rootDir>/__mocks__/styleMock.ts', // Mock global styles
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.ts',
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Use ts-jest for TypeScript files
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Optional: Add custom Jest setup
  testPathIgnorePatterns: ['/node_modules/', '/dist/'], // Ignore build directories
};

export default config;