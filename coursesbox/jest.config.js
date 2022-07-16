const nextJest = require("next/jest")

const createJestConfig = nextJest({
    // Provide tha path to your Next.js app to load next.config.jad and .env files in your test environment
    dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
    // Add more setup options before each test is run
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    // moduleNameMapper: {
    //     "^@/(.*)$": "<rootDir>/$1",
    // },
    // if using Typescript with a baseUrl st to the root directory then you need the below for aliases to work
    moduleDirectories: ["node_modules", "<rootDir>/"],
    testEnvironment: "jest-environment-jsdom",
};

// createJestConfig is exported this wat to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
