/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    globalSetup: "<rootDir>/jest-config-files/global-setup.ts",
    globalTeardown: "<rootDir>/jest-config-files/global-teardown.ts",

    setupFilesAfterEnv: ["<rootDir>/jest-config-files/setup-after-env.ts"],
    // testEnvironment: "node",
    coveragePathIgnorePatterns: ["/node_modules/"],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: -10,
        },
    },
    displayName: {
        name: "uppercaseStarter",
        color: "red",
    },
};
