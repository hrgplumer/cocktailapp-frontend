const tsJestPreset = require('jest-preset-angular/jest-preset').globals['ts-jest'];

module.exports = {
    preset: "jest-preset-angular",
    roots: ['src'],
    setupTestFrameworkScriptFile: "./src/setup-jest.ts",
    globals: {
        'ts-jest': {
          ...tsJestPreset,
          tsConfig: 'tsconfig.spec.json'
        }
      }
  }