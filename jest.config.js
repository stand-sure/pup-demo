// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
    coverageDirectory: "coverage",
    globals: {
        "ts-jest": {
            tsConfig: "./tsconfig.json",
            babelConfig: {
                presets: ["@babel/env"],
            },
        },
    },
    preset: "jest-puppeteer",
    modulePathIgnorePatterns: ["<rootDir>/.*/test-helpers/"],
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec|steps))\\.(j|t)sx?$",
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
};
