module.exports = {
  preset: 'react-native',
  testEnvironment: 'jsdom',
  globals: {
    'ts-jest': {
      diagnostics: false,
      babelConfig: true,
    },
    atob: true,
  },
  moduleDirectories: ['node_modules', 'src'],
  testPathIgnorePatterns: ['\\.snap$', '<rootDir>/node_modules/'],
  coveragePathIgnorePatterns: [
    'node_modules',
    'test-config',
    '<rootDir>/src/assets/',
    '<rootDir>/src/tests-utils/',
  ],
  modulePathIgnorePatterns: ['<rootDir>/lib/'],
  moduleNameMapper: {
    '^@theme/(.*)': '<rootDir>/src/theme/$1',
  },
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node', '.js.map'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native/*|d3-shape|d3-path|react-native-screens|@react-navigation/bottom-tabs|@react-native-community|@react-navigation|react-native-paper|react-native-vector-icons|react-native-paper|react-native-reanimated|react-native-safe-area-view|react-native-gesture-handler)/)',
  ],
  verbose: true,
  bail: true,
  setupFiles: ['./jest/setup.ts'],
  cacheDirectory: '.jest/cache',
};
