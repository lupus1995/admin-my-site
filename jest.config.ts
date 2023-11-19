import nextJest from "next/jest";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  testEnvironment: "jest-environment-jsdom",
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.json",
      transform: {
        "^.+\\.(js)$": "<rootDir>/node_modules/babel-jest",
        "\\.(ts|tsx)$": "<rootDir>/node_modules/ts-jest/preprocessor.js",
      },
    },
  },
  testMatch: ["**/__tests__/**/*.spec.(ts|js|tsx|jsx)"],
  moduleFileExtensions: ["ts", "js", "jsx", "tsx"],
  moduleNameMapper: {
    "^utils(.*)$": "<rootDir>/src/utils$1",
    "^commons(.*)$": "<rootDir>/src/commons$1",
    "^components(.*)$": "<rootDir>/src/components$1",
    "^pages(.*)$": "<rootDir>/src/pages$1",
    "^store(.*)$": "<rootDir>/store$1",
    "^websockets(.*)$": "<rootDir>/websockets$1",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
