export default {
    preset: 'ts-jest',
    testEnvironment: "jest-environment-jsdom",
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest'
    },
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy"
  }
  };
  