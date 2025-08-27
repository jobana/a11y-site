const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  
  // Test environment
  testEnvironment: 'jsdom',
  
  // Module name mapping for absolute imports
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@/tests/(.*)$': '<rootDir>/tests/$1',
  },
  
  // Test patterns
  testMatch: [
    '<rootDir>/tests/**/*.test.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.test.{js,jsx,ts,tsx}',
  ],
  
  // Coverage configuration
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!src/**/index.{js,jsx,ts,tsx}',
  ],
  
  // Coverage thresholds
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  
  // Test timeout for accessibility tests (they can be slower)
  testTimeout: 10000,
  
  // Transform configuration
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  
  // Module file extensions
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  
  // Ignore patterns
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  
  // Transform ignore patterns
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  
  // Global setup and teardown
  globalSetup: undefined,
  globalTeardown: undefined,
  
  // Reporter configuration for accessibility tests
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        publicPath: './test-reports',
        filename: 'accessibility-test-report.html',
        expand: true,
        hideIcon: false,
        pageTitle: 'Accessibility Test Results',
        logoImgPath: undefined,
        inlineSource: false,
      },
    ],
  ],
  
  // Clear mocks between tests
  clearMocks: true,
  
  // Collect coverage from accessibility-specific files
  collectCoverageFrom: [
    'src/components/accessibility/**/*.{ts,tsx}',
    'src/components/ui/**/*.{ts,tsx}',
    'src/components/navigation/**/*.{ts,tsx}',
    'src/lib/**/*.{ts,tsx}',
    '!**/*.stories.{ts,tsx}',
    '!**/*.d.ts',
  ],
  
  // Coverage output directory
  coverageDirectory: 'coverage',
  
  // Coverage reporters
  coverageReporters: ['text', 'lcov', 'html', 'json-summary'],
  
  // Verbose output for debugging
  verbose: true,
  
  // Automatically restore mock state between every test
  restoreMocks: true,
  
  // Automatically clear mock calls and instances between every test
  clearMocks: true,
  
  // Reset the module registry before running each individual test
  resetModules: true,
  
  // Custom environment variables for testing
  setupFiles: ['<rootDir>/tests/env.setup.js'],
}

// Create and export the Jest configuration
module.exports = createJestConfig(customJestConfig)

