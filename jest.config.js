const { createDefaultPreset } = require('ts-jest');

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.[jt]sx?$': ['ts-jest', {
            tsconfig: './tsconfig.jest.json',
        }],
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '\\.module\\.(css|scss)$': 'identity-obj-proxy',
        '\\.(css|scss)$': '<rootDir>/__mocks__/styleMock.js',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    testMatch: ['**/*.test.(ts|tsx)'],
};
